import { Injectable } from '@nestjs/common';
import { TypesRepository } from './types.repository';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Type } from './type.entity';

@Injectable()
export class TypesService {
  constructor(
    private readonly typeRepository: TypesRepository,
    private readonly httpService: HttpService,
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

    if (typeRequest.status === 200) {
      console.log(`Scraped type ${typeId}.`);
    }

    return typeRequest;
  }

  async scrapeAll() {
    let reachedMaxPages = false;
    let pageNum = 1;

    while (!reachedMaxPages) {
      const typeIdsRequest = await this.scrapeTypeIdsByPage(pageNum);

      if (typeIdsRequest.status === 404) {
        reachedMaxPages = true;
        console.log('Saved all type ids.');
      }

      if (typeIdsRequest.status === 504 || typeIdsRequest.status === 500) {
        console.log(
          `Server error ${typeIdsRequest.status}. Retrying in 2 seconds...`,
        );
        await new Promise((resolve) => setTimeout(resolve, 2000));
        continue;
      }

      const typeIds = typeIdsRequest.data;

      for (const typeId of typeIds) {
        const typeRequest = await this.scrapeType(typeId);

        if (typeRequest.status === 200 && typeRequest.data.published) {
          const scrapedType = typeRequest.data;
          const type = new Type();
          type.id = scrapedType.type_id;
          type.name = scrapedType.name;
          type.capacity = scrapedType.capacity;
          type.description = scrapedType.description;
          type.group_id = scrapedType.group_id;
          type.market_group_id = scrapedType.market_group_id;
          type.mass = scrapedType.mass;
          type.packaged_volume = scrapedType.packaged_volume;
          type.portion_size = scrapedType.portion_size;
          type.published = scrapedType.published;
          type.volume = scrapedType.volume;

          try {
            await this.typeRepository.save(type);
          } catch (error) {
            throw new Error(error);
          }
        }
      }

      pageNum++;
    }
    console.log('Saved all types.');
  }

  async searchByName(name: string) {
    return this.typeRepository
      .createQueryBuilder('types')
      .where('types.name ILIKE :name', { name: `%${name}%` })
      .select(['types.id', 'types.name'])
      .getMany();
  }
}
