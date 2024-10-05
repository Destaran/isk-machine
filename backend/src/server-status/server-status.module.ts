import { Module } from '@nestjs/common';
import { ServerStatusService } from './server-status.service';
import { ServerStatusController } from './server-status.controller';

@Module({
  providers: [ServerStatusService],
  controllers: [ServerStatusController]
})
export class ServerStatusModule {}
