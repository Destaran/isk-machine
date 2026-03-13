import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axiosRetry from 'axios-retry';

@Injectable()
export class HttpRetryService implements OnModuleInit {
  constructor(private readonly httpService: HttpService) {}

  onModuleInit() {
    axiosRetry(this.httpService.axiosRef, {
      retries: 3,

      retryCondition: (error) => {
        const status = error?.response?.status;
        return !status || status >= 500;
      },

      retryDelay: (retryCount) => {
        const base = 1000 * 2 ** retryCount;
        const jitter = Math.random() * 500;
        return base + jitter;
      },
      onRetry: (retryCount, error) => {
        console.warn(
          `Request failed (attempt ${retryCount}). Retrying...`,
          error.message,
        );
      }
    });
  }
}