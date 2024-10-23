import { Injectable } from '@nestjs/common';
import { StationRepository } from './station.repository';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class StationService {
  constructor(
    private readonly httpService: HttpService,
    private readonly stationRepository: StationRepository,
  ) {}

  async wipe() {
    await this.stationRepository.clear();
  }

  async scrape() {
    this.wipe();

    // implement SystemsStations table
  }
}
