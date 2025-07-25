import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/common/auth/AuthGuard';
import { Roles } from 'src/common/auth/AuthRoles';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { userPayloadType } from 'src/common/types/auth.types';
import { productParamDto } from './dto/productParam.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Roles('admin', 'user')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({
    type: CreateProductDto,
    description: 'Product details to create',
  })
  @Post()
  async create(
    @Req() req: Request,
    @Body() createProductDto: CreateProductDto
  ) {
    const user = req['user'] as userPayloadType;
    const product = await this.productService.create(createProductDto, user);
    return {
      success: true,
      data: product,
      message: 'Product created successfully',
    }
  }

  @ApiOperation({ summary: 'Get all products for the user' })
  @Get()
  async findAll(
    @Req() req: Request,
  ) {
    const user = req['user'] as userPayloadType;
    const products = await this.productService.findAll(+user.id);
    return {
      success: true,
      data: products,
      message: 'Products retrieved successfully',
    }
  }

  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Product ID' })
  @Get(':id')
  async findOne(@Param('id') p: productParamDto, @Req() req: Request) {
    const user = req['user'] as userPayloadType;
    const product = await this.productService.findOne(+p.id, +user.id);
    return {
      success: true,
      data: product,
      message: 'Product retrieved successfully',
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
