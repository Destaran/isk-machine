import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appDataSourceConfig } from './data-source';
import { DataScraperModule } from './data-scraper/data-scraper.module';
import { Order } from './orders/order.entity';
import { MarketModule } from './market/market.module';
import { System } from './system/system.entity';
import { RegionModule } from './region/region.module';
import { SystemModule } from './system/system.module';
import { TypesModule } from './type/types.module';
import { OrdersModule } from './orders/orders.module';
import { ServerStatusModule } from './server-status/server-status.module';
import { MetadataModule } from './metadata/metadata.module';
import { StationModule } from './station/station.module';
import { StructureModule } from './structure/structure.module';
import { AxiosRetryModule } from 'nestjs-axios-retry';
import { MarketHistoryModule } from './market-history/market-history.module';
import axiosRetry from 'axios-retry';

@Module({
  imports: [
    AxiosRetryModule.forRoot({
      axiosRetryConfig: {
        retries: 5,
        retryDelay: axiosRetry.exponentialDelay,
        shouldResetTimeout: true,
        retryCondition: (error) =>
          error.response.status !== 200 && error.response.status !== 304,
        onRetry: (retryCount, error) => {
          console.log(error.message);
          console.log(`Retrying request attempt ${retryCount}`);
        },
      },
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          ...appDataSourceConfig,
          host: config.getOrThrow<string>('POSTGRES_HOST'),
          port: parseInt(config.get<string>('POSTGRES_PORT', '6543'), 10),
          username: config.getOrThrow<string>('POSTGRES_USER'),
          password: config.getOrThrow<string>('POSTGRES_PASSWORD'),
          database: config.getOrThrow<string>('POSTGRES_DATABASE'),
          autoLoadEntities: true,
          entities: [Order, System],
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    DataScraperModule,
    MarketModule,
    RegionModule,
    SystemModule,
    TypesModule,
    OrdersModule,
    ServerStatusModule,
    MetadataModule,
    StationModule,
    StructureModule,
    MarketHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
