import { Module } from '@nestjs/common';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';
import { HttpModule } from '@nestjs/axios';
import { RegionModule } from 'src/region/region.module';
import { SystemModule } from 'src/system/system.module';
import { OrdersModule } from 'src/orders/orders.module';
import { TypesModule } from 'src/type/types.module';
import { MetadataModule } from 'src/metadata/metadata.module';
import { StationModule } from 'src/station/station.module';

@Module({
  imports: [
    HttpModule,
    RegionModule,
    SystemModule,
    OrdersModule,
    TypesModule,
    MetadataModule,
    StationModule,
  ],
  providers: [MarketService],
  controllers: [MarketController],
})
export class MarketModule {}
