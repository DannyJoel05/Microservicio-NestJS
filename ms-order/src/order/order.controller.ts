import { Controller, Logger, ParseUUIDPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { PaginationDto } from 'src/common';
import { CustomPaginationDto } from './dto';


@Controller()
export class OrderController {
  private looger = new Logger('MS-ORDER-OrderController');
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern({ cmd: 'createOrder' })
  create(@Payload() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @MessagePattern({ cmd: 'listOrder' })
  findAll(@Payload() paginationDto: PaginationDto) {
    this.looger.log("*******************")
    return this.orderService.findAll(paginationDto);
  }

  @MessagePattern({ cmd: 'findOneOrder' })
  findOne(@Payload('id',ParseUUIDPipe) id: string) {
    return this.orderService.findOne(id);
  }
  @MessagePattern({ cmd: 'findByStatus' })
  findByStatus(@Payload() paginationDto: CustomPaginationDto) {
    return this.orderService.findByStatus(paginationDto);
  }

/*   @MessagePattern({ cmd: 'changeOrderStatus' })
  changeOrderStatus(@Payload() id: number) {
    return this.orderService.changeOrderStatus(id);
  } */
}
