import { Injectable } from '@nestjs/common';
import { MetadataRepository } from './metadata.repository';
import { Metadata } from './metadata.entity';

@Injectable()
export class MetadataService {
  constructor(private readonly metadataRepository: MetadataRepository) {}

  async updateScrapeDate() {
    const metadata = new Metadata();
    metadata.id = 'scrapeDate';
    metadata.date = new Date();
    await this.metadataRepository.save(metadata);
  }

  async getScrapeDate() {
    const metadata = await this.metadataRepository.findOneBy({
      id: 'scrapeDate',
    });
    return metadata.date;
  }
}
