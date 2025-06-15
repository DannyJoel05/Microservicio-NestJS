import { Controller, Get, Post, Body, Param, Inject, BadRequestException, Delete, Patch, Query, Logger, ParseUUIDPipe } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { StatusDto } from './dto';


@Controller('order')
export class OrderController {
  private looger = new Logger('MS-CORE-MAIN-OrderController');
  constructor(@Inject(OrderService) private readonly orderService: ClientProxy
  ) { }

  @Post()
  public async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      return await firstValueFrom(
        this.orderService.send({ cmd: 'createOrder' }, createOrderDto)
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  public async findAll(@Query() paginationDto: PaginationDto) {
    try {
      return await firstValueFrom(
        this.orderService.send({ cmd: 'listOrder' }, paginationDto)
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get('id/:id')
  public async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await firstValueFrom(
        this.orderService.send({ cmd: 'findOneOrder' }, { id })
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get('status/:status')
  public async findByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto
  ) {
    try {
      return await firstValueFrom(
        this.orderService.send({ cmd: 'findByStatus' }, { status: statusDto.status, ...paginationDto })
      );
    } catch (error) {
      throw new BadRequestException(error);
    }

  }


}
