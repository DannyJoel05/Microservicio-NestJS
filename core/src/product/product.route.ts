import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { ProductService } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@Controller('product')
export class ProductController {

  constructor(
    @Inject(ProductService) private readonly productMicroservice: ClientProxy
  ) { }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productMicroservice.send({ cmd: 'listProduct' }, paginationDto);
  }

  @Get(':id')
  public async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await firstValueFrom(
        this.productMicroservice.send({ cmd: 'getProduct' }, { id })
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post()
  public async create(@Body() createProductDto: CreateProductDto) {
    try {
      return await firstValueFrom(
        this.productMicroservice.send({ cmd: 'createProduct' }, createProductDto)
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }


  @Patch(':id')
  public async update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    try {
      return await firstValueFrom(
        this.productMicroservice.send({ cmd: 'updateProduct' }, { id, ...updateProductDto })
      );
    } catch (error) {
      throw new BadRequestException(error);
    } 
  }

  @Delete(':id')
  public async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return await firstValueFrom(
        this.productMicroservice.send({ cmd: 'deleteProduct' }, { id })
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
