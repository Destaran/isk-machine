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

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
