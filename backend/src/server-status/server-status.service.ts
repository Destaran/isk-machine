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

  async onModuleInit() {
    await this.fetchStatus();
    this.fetchInterval = setInterval(
      async () => {
        await this.fetchStatus();
      },
      5 * 60 * 5000,
    );
  }

  onModuleDestroy() {
    if (this.fetchInterval) {
      clearInterval(this.fetchInterval);
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async fetchStatus() {
    const url = 'https://esi.evetech.net/latest/status/?datasource=tranquility';
    let retryCount = 0;
    let request = await firstValueFrom(this.httpService.get(url));

    while (request.status !== 200 && request.status !== 304 && retryCount < 5) {
      if (request.headers['x-esi-error-limit-remain'] > 1) {
        retryCount++;
        request = await firstValueFrom(this.httpService.get(url));
      } else {
        const retryMs =
          Number(request.headers['x-esi-error-limit-reset']) * 1000;
        await this.sleep(retryMs);
        retryCount++;
        request = await firstValueFrom(this.httpService.get(url));
      }
    }

    if (retryCount >= 5) {
      console.log(`Failed to fetch server status after ${retryCount} retries.`);
      return;
    }

    const status = request.data;
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
