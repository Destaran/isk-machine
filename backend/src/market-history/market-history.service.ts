import { Injectable } from '@nestjs/common';
import { MarketHistoryRepository } from './market-history.repository';
import { DateRange } from 'src/common/date-range.type';
import { In, Between } from 'typeorm';
import { DataScraper } from 'src/data-scraper/data-scraper';
// eslint-disable-next-line @typescript-eslint/no-require-imports
import { DateTime } from 'luxon';
import { SmartUrl } from 'src/data-scraper/smart-url';
import { MarketHistory } from './market-history.entity';

@Injectable()
export class MarketHistoryService {
  constructor(
    private readonly marketHistoryRepository: MarketHistoryRepository,
    private readonly dataScraper: DataScraper,
  ) {}

  async scrape(typeIds: number[], regionId: number): Promise<MarketHistory[]> {
    const chunkedIds = this.dataScraper.chunk(typeIds, 200);
    for (const chunk of chunkedIds) {
      const fetchPromises = chunk.map((typeId) => {
        const smartUrlforType = new SmartUrl(
          'markets',
          `${regionId}`,
          `history?typeId=${typeId}`,
        );
        return this.dataScraper.fetchEntity(smartUrlforType);
      });
      const results = await Promise.all(fetchPromises);
      const flatResults = results.flat();
      const savedResult = await this.marketHistoryRepository.upsert(flatResults, ['type_id', 'region_id', 'date']);
      console.log(`Saved ${savedResult.identifiers.length} market history records for region ${regionId}`);
      return this.marketHistoryRepository.find({
        where: {
          type_id: In(typeIds),
          region_id: regionId,
        },
      });
    }
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

    const scrapedEntities = await this.scrape(notFoundIds, regionId);
    const filterEntities = scrapedEntities.filter((entity) => entity.date >= dateRange.startDate && entity.date <= dateRange.endDate);
    return foundEntities.concat(filterEntities);
  }
}
