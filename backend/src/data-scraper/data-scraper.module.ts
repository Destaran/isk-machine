import { Module } from '@nestjs/common';
import { DataScraperService } from './data-scraper.service';
import { HttpModule } from '@nestjs/axios';
import { DataScraperController } from './data-scraper.controller';
import { RegionModule } from 'src/region/region.module';
import { SystemModule } from 'src/system/system.module';
import { OrdersModule } from 'src/orders/orders.module';
import { TypesModule } from 'src/type/types.module';
import { MetadataModule } from 'src/metadata/metadata.module';

@Module({
  imports: [
    HttpModule,
    RegionModule,
    SystemModule,
    OrdersModule,
    TypesModule,
    MetadataModule,
  ],
  exports: [DataScraperService],
  providers: [DataScraperService],
  controllers: [DataScraperController],
})
export class DataScraperModule {}
