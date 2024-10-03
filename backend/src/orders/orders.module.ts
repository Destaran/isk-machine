import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrdersRepository } from './orders.repository';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Order])],
  exports: [OrdersService],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
