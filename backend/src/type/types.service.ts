import { Injectable } from '@nestjs/common';
import { TypesRepository } from './types.repository';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Type } from './type.entity';
import { DataScraper } from 'src/data-scraper/data-scraper';
import { SmartUrl } from 'src/data-scraper/smart-url';

@Injectable()
export class TypesService {
  constructor(
    private readonly typeRepository: TypesRepository,
    private readonly httpService: HttpService,
    private readonly dataScraper: DataScraper,
  ) {}

  async wipe() {
    await this.typeRepository.clear();
  }

  async scrapeTypeIdsByPage(pageNum: number) {
    let typeIdsUrl = `https://esi.evetech.net/latest/universe/types/?datasource=tranquility&page=${pageNum}`;

    const typeRequest = await firstValueFrom(
      this.httpService.get(typeIdsUrl, {
        validateStatus: (status) => {
          return (
            status === 200 || status === 404 || status === 504 || status === 500
          );
        },
        timeout: 15000,
      }),
    );

    typeIdsUrl = null;

    return typeRequest;
  }

  async scrapeType(typeId: number) {
    const typeUrl = `https://esi.evetech.net/latest/universe/types/${typeId}/?datasource=tranquility`;

    const typeRequest = await firstValueFrom(this.httpService.get(typeUrl));

    return typeRequest;
  }

  async scrape() {
    const smartUrl = new SmartUrl(
      'universe',
      'types',
      '?datasource=tranquility',
    );
    const ids = await this.dataScraper.fetchIdsFromAllPages(smartUrl);
    const idChunks = this.dataScraper.chunk(ids, 500);
    const all = [];
    for (const chunk of idChunks) {
      const types = await this.dataScraper.fetchEntities(smartUrl, chunk);
      const typeEntities = types.map((type) => Type.fromEntity(type));
      const saved = await this.typeRepository.upsert(typeEntities, ['id']);
      all.push(...saved.identifiers);
      console.log(`Scraped ${saved.identifiers.length} types`);
    }
    console.log(`Scraped ${all.length} types`);
  }

  async searchByName(name: string) {
    return this.typeRepository
      .createQueryBuilder('types')
      .where('types.name ILIKE :name', { name: `%${name}%` })
      .andWhere('types.market_group_id IS NOT NULL')
      .select(['types.id', 'types.name'])
      .getMany();
  }

  async getById(id: number) {
    return this.typeRepository.findOne({ where: { id } });
  }
}
