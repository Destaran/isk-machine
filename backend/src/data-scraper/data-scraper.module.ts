import { Module } from '@nestjs/common';
import { DataScraperService } from './data-scraper.service';
import { HttpModule } from '@nestjs/axios';
import { DataScraperController } from './data-scraper.controller';

@Module({
  imports: [HttpModule],
  providers: [DataScraperService],
  controllers: [DataScraperController],
})
export class DataScraperModule {}
