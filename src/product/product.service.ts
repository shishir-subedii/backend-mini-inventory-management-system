import { Injectable } from '@nestjs/common';
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
  ) {}

  create(createProductDto: CreateProductDto, user: userPayloadType) {
    const newProduct = {
      ...createProductDto,
      createdBy: user.id, 
    }
    const product = this.productRepository.create(newProduct);
    return this.productRepository.save(product);
  }

  async findAll(userId: number, page: number = 1, limit: number = 10) {
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

  findOne(id: number, userId: number) {
    return this.productRepository.findOne({
      where: { id, userId }
    })
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto);
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }
}
