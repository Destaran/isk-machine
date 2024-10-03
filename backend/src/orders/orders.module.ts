import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrdersRepository } from './orders.repository';
import { RegionModule } from 'src/region/region.module';

@Module({
  imports: [HttpModule, RegionModule, TypeOrmModule.forFeature([Order])],
  exports: [OrdersService],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
