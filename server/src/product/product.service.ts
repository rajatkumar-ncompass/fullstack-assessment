import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import { Repository } from 'typeorm';
import { customError } from 'src/utils/exceptionHandler';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Products) private productRepository: Repository<Products>,
  ) {}

  async getProducts(data) {
    try {
      const sortField = 'product_' + data?.sort?.split('_')[0];
      const sortOrder = data?.sort?.split('_')[1];

      const recordPerPage = 10;
      const offset = (data.page - 1) * recordPerPage;

      const queryBuilder = this.productRepository.createQueryBuilder();

      if (sortField && sortOrder) {
        queryBuilder.orderBy(`${sortField}`, sortOrder);
      }

      if (data.filter_price) {
        const priceRange = data.filter_price.split('-');
        queryBuilder.andWhere('product_price BETWEEN :minPrice AND :maxPrice', {
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
        });
      }

      if (data.filter_availabilty === 'true') {
        queryBuilder.andWhere(
          'product_availabilty > :checkProductAvailability',
          {
            checkProductAvailability: 0,
          },
        );
      }

      if (data.filter_rating) {
        queryBuilder.andWhere('product_rating >= :checkProductRating', {
          checkProductRating: data.filter_rating,
        });
      }

      const productResponse = await queryBuilder
        .limit(recordPerPage)
        .offset(offset)
        .getMany();

      return productResponse;
    } catch (error) {
      return new customError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Some Error Occured',
        error.message,
      );
    }
  }

  async getProductsById(id) {
    try {
      const productResponse = await this.productRepository
        .createQueryBuilder()
        .select()
        .where('product_id = :ID', { ID: id })
        .getOne();
      return productResponse;
    } catch (error) {
      return new customError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Some Error Occured',
        error.message,
      );
    }
  }
}
