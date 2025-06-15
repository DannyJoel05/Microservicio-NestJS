import { Module } from '@nestjs/common';

import { OrderController } from './order.route';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, OrderService } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: OrderService,
        transport: Transport.TCP,
        options: {
          host: envs.order_ms_host,
          port: envs.order_ms_port
        }
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [],
})
export class OrderModule { }
