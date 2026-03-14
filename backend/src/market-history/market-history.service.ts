import { Injectable } from '@nestjs/common';
import { MarketHistoryRepository } from './market-history.repository';
import { DataScraper } from 'src/data-scraper/data-scraper';
import { SmartUrl } from 'src/data-scraper/smart-url';
import { MarketHistory } from './market-history.entity';
import { DateRange } from 'src/common/date-range.type';
import { DateTime } from 'luxon';
import { Between, In } from 'typeorm';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class MarketHistoryService {
  constructor(
    private readonly marketHistoryRepository: MarketHistoryRepository,
    private readonly dataScraper: DataScraper,
    private readonly ordersService: OrdersService,
  ) {}

  async scrape(typeId: number, regionId: number): Promise<MarketHistory[]> {
    const smartUrlforType = new SmartUrl(
      'markets',
      `${regionId}`,
      `history?type_id=${typeId}`,
    );
    const result = (await this.dataScraper.fetchEntity(smartUrlforType)) ?? [];

    const entities = result.map((item) =>
      MarketHistory.fromEntity(item, typeId, regionId),
    );

    const savedResult = await this.marketHistoryRepository.upsert(entities, {
      conflictPaths: ['type_id', 'region_id', 'date'],
      skipUpdateIfNoValuesChanged: true,
    });
    console.log(
      `Saved ${savedResult.identifiers.length} market history records for type ${typeId} in region ${regionId}`,
    );
    return savedResult.identifiers as MarketHistory[];
  }

  async scrapeByRegionId(regionId: number) {
    const typeIds = await this.ordersService.getTypesByRegionId(regionId);
    const chunkedTypeIds = this.dataScraper.chunk(typeIds, 1000);
    for (const chunk of chunkedTypeIds) {
      const requests = chunk.map((typeId) => this.scrape(typeId, regionId));
      const results = await Promise.allSettled(requests);
      const successCount = results.filter(
        (r) => r.status === 'fulfilled',
      ).length;
      console.log(
        `Scraped market history for ${successCount}/${results.length} types in region ${regionId}`,
      );
    }
    console.log(
      `Completed scraping market history for all types in region ${regionId}`,
    );
  }

  async getMarketHistories(
    typeIds: number[],
    regionId: number,
    dateRange: DateRange = {
      startDate: DateTime.now().minus({ days: 7 }).toJSDate(),
      endDate: new Date(),
    },
  ) {
    const foundEntities = await this.marketHistoryRepository.find({
      where: {
        type_id: In(typeIds),
        region_id: regionId,
        date: Between(dateRange.startDate, dateRange.endDate),
      },
    });

    const notFoundIds = typeIds.filter(
      (typeId) => !foundEntities.some((item) => item.type_id === typeId),
    );

    if (notFoundIds.length <= 0) {
      return foundEntities;
    }

    const scrapedEntities = notFoundIds.map((typeId) => {
      return this.scrape(typeId, regionId);
    });
    const scrapedResults = await Promise.all(scrapedEntities);
    const scrapedFlat = scrapedResults.flat();
    const filterEntities = scrapedFlat.filter(
      (entity) =>
        entity.date >= dateRange.startDate && entity.date <= dateRange.endDate,
    );
    return foundEntities.concat(filterEntities);
  }
}
