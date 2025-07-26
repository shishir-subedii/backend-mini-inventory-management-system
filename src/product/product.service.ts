import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { userPayloadType } from 'src/common/types/auth.types';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) { }

  async create(createProductDto: CreateProductDto, user: userPayloadType) {

    const newProduct = {
      ...createProductDto,
      userId: user.id
    }
    const product = this.productRepository.create(newProduct);
    return await this.productRepository.save(product);
  }

  async findAll(userId: string, page: number = 1, limit: number = 10) {
    const [data, totalCount] = await this.productRepository.findAndCount({
      where: { userId: userId },
      take: limit,
      skip: (page - 1) * limit
    });

    const totalPages = Math.ceil(totalCount / limit);

    return {
      data,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }

  async findOne(id: string, userId: string) {
    return await this.productRepository.findOne({
      where: { id, userId }
    })
  }

  async update(id: string, userId: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { id, userId } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return this.productRepository.update({ id, userId }, updateProductDto);
  }

  async remove(id: string, userId: string) {
    const product = await this.productRepository.findOne({ where: { id, userId } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return this.productRepository.delete({ id, userId });
  }

  async addQuantity(id: string, userId: string, quantity: number) {
    const product = await this.productRepository.findOne({ where: { id, userId } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return await this.productRepository.increment({ id, userId }, 'quantity', quantity);
  }

  async reduceQuantity(id: string, userId: string, quantity: number) {
    const product = await this.productRepository.findOne({ where: { id, userId } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return await this.productRepository.decrement({ id, userId }, 'quantity', quantity);
  }
}
