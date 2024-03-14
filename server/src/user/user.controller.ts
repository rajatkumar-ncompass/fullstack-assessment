import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Next,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { UserService } from './user.service';
import { ApiResponse } from 'src/utils/apiResponse';
import { customError } from 'src/utils/exceptionHandler';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { createUserDto } from './dtos/createUser.dto';
import { encrypt } from 'src/utils/encrypt';
import { createUserPasswordDetailsDto } from '../user/dtos/createUserPassword.dto';

import { createUserAddressDto } from '../user/dtos/createUserAddress.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async createUser(
    @Body() createUserDetails: createUserDto,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      createUserDetails['id'] = uuidv4();

      const encryptedPassword = encrypt(createUserDetails['password']);
      const createUserPassword: createUserPasswordDetailsDto = {
        id: createUserDetails.id,
        password: encryptedPassword,
      };

      const createUserAddress: createUserAddressDto = {
        user_id: createUserDetails.id,
        address_id: uuidv4(),
        street: createUserDetails.street,
        state: createUserDetails.state,
        locality: createUserDetails.locality,
        country: createUserDetails.country,
        city: createUserDetails.city,
      };
      delete createUserDetails.password;
      const createUserResponse = await this.userService.createUser(
        createUserDetails,
        createUserPassword,
        createUserAddress,
      );
      if (createUserResponse instanceof customError) {
        throw createUserResponse;
      }
      return new ApiResponse(
        HttpStatus.OK,
        'User Created Successfully',
        createUserResponse,
        res,
      );
    } catch (error) {
      next(error);
    }
  }

  @UseGuards(JwtGuard)
  @Post('orders')
  async getAllOrders(
    @Query('sort') sort: string,
    @Query('filter_amount') filter_amount: string,
    @Query('filter_status') filter_status: string,
    @Query('page') page: number,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const userId = req['user']['userId'];
      const data = {
        id: userId,
        sort: sort,
        filter_amount: filter_amount,
        filter_status: filter_status,
        page: page,
      };
      const findUserOrder = await this.userService.findUserOrders(data);
      if (findUserOrder instanceof customError) {
        throw findUserOrder;
      }
      return new ApiResponse(
        HttpStatus.OK,
        'Data Fetched Successfully',
        findUserOrder,
        res,
      );
    } catch (error) {
      next(error);
    }
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getProfile(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const userId = req['user']['userId'];
      if (userId != id) {
        throw new customError(
          HttpStatus.FORBIDDEN,
          'Some Error Occured',
          'Access Denied',
        );
      }
      const findAuthorByIdResponse = await this.userService.findUserById(id);
      if (findAuthorByIdResponse instanceof customError) {
        throw findAuthorByIdResponse;
      }
      return new ApiResponse(
        HttpStatus.OK,
        'Data Fetched Successfully',
        findAuthorByIdResponse,
        res,
      );
    } catch (error) {
      next(error);
    }
  }

  @UseGuards(JwtGuard)
  @Get(':custId/order/:id')
  async getOrders(
    @Param('id') id: string,
    @Param('custId') custId: string,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const userId = req['user']['userId'];
      if (userId != custId) {
        throw new customError(
          HttpStatus.FORBIDDEN,
          'Some Error Occured',
          'Access Denied',
        );
      }
      const findUserOrder = await this.userService.findOrderDetails(id);
      if (findUserOrder instanceof customError) {
        throw findUserOrder;
      }
      return new ApiResponse(
        HttpStatus.OK,
        'Data Fetched Successfully',
        findUserOrder,
        res,
      );
    } catch (error) {
      next(error);
    }
  }
}
