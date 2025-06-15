import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from 'generated/prisma';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductService extends PrismaClient implements OnModuleInit {

  private readonly looger = new Logger('ProductService');

  onModuleInit() {
    this.$connect();
    this.looger.log("Base de datos conectado...");
  }

  public async create(createProductDto: CreateProductDto) {
    const created = await this.product.create({
      data: createProductDto
    });
    return created;
  }

  public async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const totalPage = await this.product.count({ where: { available: true } });
    const pageCount = Math.ceil(totalPage / limit);

    const listed = await this.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: { available: true }
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

  public async findOne(id: number) {
    const geted = await this.product.findUnique({
      where: { id, available: true }
    });
    if (!geted) throw new RpcException({
      message:`No existe el producto ${id}`,
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

  public async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id);
    const { id: __, ...data } = updateProductDto;
    const updated = await this.product.update({
      where: { id },
      data: data
    });
    return updated;
  }

  public async remove(id: number) {
    await this.findOne(id);
    /* const deleted = await this.product.delete({
      where: { id }
    });
    */
    // Solo se cambia el estado
    const deleted = await this.product.update({
      where: { id },
      data: {
        available: false
      }
    });
    return {
      data: deleted,
      meta: {
        pagination: {},
        error: null,
      },
    };
  }
}
