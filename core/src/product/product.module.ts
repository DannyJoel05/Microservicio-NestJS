import { Module } from '@nestjs/common';
import { ProductController } from './product.route';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, ProductService } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ProductService,
        transport: Transport.TCP,
        options: {
          host:envs.product_ms_host,
          port:envs.product_ms_port
        }
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [],
})
export class ProductModule { }
