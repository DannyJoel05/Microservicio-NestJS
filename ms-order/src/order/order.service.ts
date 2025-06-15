import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PaginationDto } from 'src/common';
import { PrismaClient } from 'generated/prisma';
import { RpcException } from '@nestjs/microservices';
import { CustomPaginationDto } from './dto';

@Injectable()
export class OrderService extends PrismaClient implements OnModuleInit {
  private readonly looger = new Logger('OrderService');

  onModuleInit() {
    this.$connect();
    this.looger.log("Base de datos conectado...");
  }
  public async create(createOrderDto: CreateOrderDto) {
    const created = await this.order.create({
      data: createOrderDto
    });
    return created;
  }

  public async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const totalPage = await this.order.count();
    const pageCount = Math.ceil(totalPage / limit);

    const listed = await this.order.findMany({
      skip: (page - 1) * limit,
      take: limit
    });
    return {
      data: listed,
      meta: {
        pagination: {
          page: page,
          pageSize: limit,
          pageCount,
          total: totalPage
        }
      }
    };
  }

  public async findOne(id: string) {
    const geted = await this.order.findUnique({
      where: { id }
    });
    if (!geted) throw new RpcException({
      message: `No existe el producto ${id}`,
      status: HttpStatus.BAD_REQUEST
    });
    return {
      data: geted,
      meta: {
        pagination: {},
        error: null,
      },
    };
  }



  public async findByStatus(paginationDto: CustomPaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const totalPage = await this.order.count({ 
      where: { status: paginationDto.status } 
    });

    const listed = await this.order.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        status: paginationDto.status
      }
    });
    return {
      data: listed,
      meta: {
        pagination: {
          page: page,
          pageSize: limit,
          pageCount: Math.ceil(totalPage / limit),
          total: totalPage
        }
      }
    };
  }

  public async changeOrderStatus(id: number) {
    return `This action removes a #${id} order`;
  }
}
