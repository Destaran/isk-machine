import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Structure } from './structure.entity';
import { StructureRepository } from './structure.repository';
import { In } from 'typeorm';

interface ScrapedStructure {
  structure_id: number;
  name: string;
  owner_id: number;
  system_id: number;
  type_id: number;
}

@Injectable()
export class StructureService {
  constructor(
    private readonly httpService: HttpService,
    private readonly structureRepository: StructureRepository,
  ) {}

  async wipe() {
    await this.structureRepository.clear();
  }

  async scrape() {
    this.wipe();
    const url = 'https://data.everef.net/structures/structures-latest.v2.json';
    const request = await firstValueFrom(this.httpService.get(url));
    if (!request.data) {
      return;
    }
    const scrapedStructures: ScrapedStructure[] = Object.values(request.data);
    const structuresToSave = [];

    for (const scrapedStructure of scrapedStructures) {
      const structure = new Structure();
      structure.id = scrapedStructure.structure_id;
      structure.name = scrapedStructure.name;
      structure.owner_id = scrapedStructure.owner_id;
      structure.system_id = scrapedStructure.system_id;
      structure.type_id = scrapedStructure.type_id;
      structuresToSave.push(structure);
    }

    this.structureRepository.save(structuresToSave);
    console.log(`Scraped ${structuresToSave.length} structures.`);
  }

  async getByIds(ids: number[]) {
    return await this.structureRepository.find({ where: { id: In(ids) } });
  }
}
