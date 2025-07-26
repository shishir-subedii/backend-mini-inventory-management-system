import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/common/auth/AuthGuard';
import { Roles } from 'src/common/auth/AuthRoles';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { userPayloadType } from 'src/common/types/auth.types';
import { productParamDto } from './dto/productParam.dto';
import { QuantityBodyDto } from './dto/QuantityBody.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Roles('admin', 'user')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({
    type: CreateProductDto
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
    const products = await this.productService.findAll(user.id);
    return {
      success: true,
      data: products,
      message: 'Products retrieved successfully',
    }
  }

  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Product ID' })
  @Get(':id')
  async findOne(@Param() p: productParamDto, @Req() req: Request) {
    const user = req['user'] as userPayloadType;
    const product = await this.productService.findOne(p.id, user.id);
    return {
      success: true,
      data: product,
      message: 'Product retrieved successfully',
    }
  }

  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Product ID' })
  @ApiBody({
    type: UpdateProductDto,
    description: 'Product details to update',
  })
  @Patch(':id')
  async update(
    @Param() p: productParamDto,
    @Body() updateProductDto: UpdateProductDto,
    @Req() req: Request
  ) {
    const user = req['user'] as userPayloadType;
    const product = await this.productService.update(p.id, user.id, updateProductDto);
    return {
      success: true,
      data: product,  
      message: 'Product updated successfully',
    }
  }

  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Product ID' })
  @Delete(':id')
  async remove(@Param() p: productParamDto, @Req() req: Request) {
    const user = req['user'] as userPayloadType;
    await this.productService.remove(p.id, user.id);
    return {
      success: true,
      message: 'Product deleted successfully',
    }
  }

  @ApiOperation({ summary: 'Increase Quantity of a Product' })
  @ApiParam({ name: 'id', type: String, description: 'Product ID' })
  @ApiBody({
    type: QuantityBodyDto,
    description: 'Quantity to increase',
  })
  @Patch(':id/increase-quantity')
  async increaseQuantity(
    @Param() p: productParamDto,
    @Body() quantityBody: QuantityBodyDto,
    @Req() req: Request
  ) {
    const user = req['user'] as userPayloadType;
    const product = await this.productService.addQuantity(p.id, user.id, quantityBody.quantity);
    return {
      success: true,
      data: product,
      message: 'Product quantity increased successfully',
    };
  }

  @ApiOperation({ summary: 'Decrease Quantity of a Product' })
  @ApiParam({ name: 'id', type: String, description: 'Product ID' })
  @ApiBody({
    type: QuantityBodyDto,
    description: 'Quantity to decrease',
  })
  @Patch(':id/decrease-quantity')
  async decreaseQuantity(
    @Param() p: productParamDto,
    @Body() quantityBody: QuantityBodyDto,
    @Req() req: Request
  ) {
    const user = req['user'] as userPayloadType;
    const product = await this.productService.reduceQuantity(p.id, user.id, quantityBody.quantity);
    return {
      success: true,
      data: product,
      message: 'Product quantity decreased successfully',
    };
  }
}

