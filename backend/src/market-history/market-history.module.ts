import { Module } from '@nestjs/common';
import { MarketHistoryRepository } from './market-history.repository';
import { MarketHistoryService } from './market-history.service';
import { DataScraper } from 'src/data-scraper/data-scraper';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketHistory } from './market-history.entity';
import { MarketHistoryController } from './market-history.controller';

@Module({
    imports: [HttpModule, TypeOrmModule.forFeature([MarketHistory])],
    exports: [MarketHistoryService],
    providers: [MarketHistoryService, MarketHistoryRepository, DataScraper],
    controllers: [MarketHistoryController],
})
export class MarketHistoryModule {}
