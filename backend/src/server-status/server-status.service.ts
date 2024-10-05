import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ServerStatusService {
  private players: number | null = null;
  private serverVersion: string | null = null;
  private startTime: string | null = null;
  private fetchInterval: NodeJS.Timeout;

  constructor(private readonly httpService: HttpService) {}

  onModuleInit() {
    this.fetchStatus();
    this.fetchInterval = setInterval(
      () => {
        this.fetchStatus();
      },
      5 * 60 * 5000,
    );
  }

  onModuleDestroy() {
    if (this.fetchInterval) {
      clearInterval(this.fetchInterval);
    }
  }

  async fetchStatus() {
    const url = 'https://esi.evetech.net/latest/status/?datasource=tranquility';
    const response = await firstValueFrom(this.httpService.get(url));

    const status = response.data;
    this.players = status.players;
    this.serverVersion = status.server_version;
    this.startTime = status.start_time;
    console.log('Fetched server status.');
  }

  async getStatus() {
    return {
      players: this.players,
      serverVersion: this.serverVersion,
      startTime: this.startTime,
    };
  }
}
