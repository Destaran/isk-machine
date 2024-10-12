import { Injectable } from '@nestjs/common';
import { MetadataRepository } from './metadata.repository';
import { Metadata } from './metadata.entity';

@Injectable()
export class MetadataService {
  constructor(private readonly metadataRepository: MetadataRepository) {}

  async updateLastScrapeDate(date: Date) {
    const metadata = new Metadata();
    metadata.id = 'scrapeDate';
    metadata.date = date;
    await this.metadataRepository.save(metadata);
  }

  async getLastScrapeDate() {
    return this.metadataRepository.findOneBy({ id: 'scrapeDate' });
  }
}
