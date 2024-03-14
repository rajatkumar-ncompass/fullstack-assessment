import {
  Res,
  Next,
  Controller,
  Get,
  HttpStatus,
  Query,
  Param,
} from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { ProductService } from './product.service';
import { ApiResponse } from 'src/utils/apiResponse';
import { customError } from 'src/utils/exceptionHandler';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('')
  async getProducts(
    @Query('sort') sort: string,
    @Query('filter_price') filter_price: string,
    @Query('filter_availabilty') filter_availabilty: string,
    @Query('filter_rating') filter_rating: number,
    @Query('page') page: number,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const data = {
        sort: sort,
        filter_price: filter_price,
        filter_availabilty: filter_availabilty,
        filter_rating: filter_rating,
        page: page,
      };
      const getProductResponse = await this.productService.getProducts(data);
      if (getProductResponse instanceof customError) {
        throw getProductResponse;
      }
      return new ApiResponse(
        HttpStatus.OK,
        'Products Fetched Successfully',
        getProductResponse,
        res,
      );
    } catch (error) {
      next(error);
    }
  }

  @Get(':id')
  async getProductById(
    @Param('id') id: number,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const getProductResponse = await this.productService.getProductsById(id);
      if (getProductResponse instanceof customError) {
        throw getProductResponse;
      }
      return new ApiResponse(
        HttpStatus.OK,
        'Products Fetched Successfully',
        getProductResponse,
        res,
      );
    } catch (error) {
      next(error);
    }
  }
}
