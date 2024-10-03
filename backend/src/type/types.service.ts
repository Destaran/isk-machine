import { Injectable } from '@nestjs/common';
import { TypeRepository } from './types.repository';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TypeService {
  constructor(
    private readonly typeRepository: TypeRepository,
    private readonly httpService: HttpService,
  ) {}

  async wipe() {
    await this.typeRepository.clear();
  }

  async scrape() {
    const typeIdsUrl =
      'https://esi.evetech.net/latest/universe/types/?datasource=tranquility&page=1';

    const typeIdsRequest = await firstValueFrom(
      this.httpService.get(typeIdsUrl),
    );
  }
}
