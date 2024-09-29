import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DataScraperService {
  constructor(private readonly httpService: HttpService) {}

  async getRegions() {
    const url =
      'https://esi.evetech.net/latest/universe/regions/?datasource=tranquility';

    const response = await firstValueFrom(this.httpService.get(url));
    console.log(response.data);
  }
}
