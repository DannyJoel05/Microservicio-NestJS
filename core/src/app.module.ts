import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [ProductModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
