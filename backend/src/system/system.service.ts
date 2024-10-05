import { Injectable } from '@nestjs/common';
import { SystemRepository } from './system.repository';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { System } from './system.entity';
import { FindManyOptions, FindOptionsWhere } from 'typeorm';

@Injectable()
export class SystemService {
  constructor(
    private readonly httpService: HttpService,
    private readonly systemRepository: SystemRepository,
  ) {}

  async wipe() {
    await this.systemRepository.clear();
  }

  async scrape() {
    this.wipe();
    const systemIdsUrl =
      'https://esi.evetech.net/latest/universe/systems/?datasource=tranquility';

    const systemIdsRequest = await firstValueFrom(
      this.httpService.get(systemIdsUrl),
    );

    const systemIds = systemIdsRequest.data;

    if (systemIdsRequest.status === 200) {
      console.log(`Scraped ${systemIds.length} system IDs.`);
    }

    for (const systemId of systemIds) {
      const systemUrl = `https://esi.evetech.net/latest/universe/systems/${systemId}/?datasource=tranquility`;

      const systemRequest = await firstValueFrom(
        this.httpService.get(systemUrl),
      );

      if (systemRequest.status === 200) {
        console.log(`Scraped system ${systemId}.`);
      }

      const scrapedSystem = systemRequest.data;

      const system = new System();
      system.id = scrapedSystem.system_id;
      system.name = scrapedSystem.name;
      system.security_status = Number(scrapedSystem.security_status);
      await this.systemRepository.save(system);
    }
    console.log(`Saved ${systemIds.length} systems.`);
  }

  async getOneBy(options: FindOptionsWhere<System>) {
    return await this.systemRepository.findOneBy(options);
  }

  async getManyBy(options: FindManyOptions<System>) {
    return await this.systemRepository.find(options);
  }
}
