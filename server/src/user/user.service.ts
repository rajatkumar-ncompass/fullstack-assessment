import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/user/entities/users.entity';
import { customError } from 'src/utils/exceptionHandler';
import { UserCredential } from 'src/user/entities/user_credentials.entity';
import { UserAddress } from 'src/user/entities/user_address.entity';
import { createUserAddressParams } from './types/createUserAddressParams';
import { createUserPasswordParams } from './types/createUserPasswordParams';
import { createUserParams } from './types/createUserParams';
import { UserOrder } from './entities/user_order.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserCredential)
    private userCredentialRepository: Repository<UserCredential>,
    @InjectRepository(UserAddress)
    private userAddressRepository: Repository<UserAddress>,
    @InjectRepository(UserOrder)
    private userOrderRepository: Repository<UserOrder>,
  ) {}

  async createUser(
    userDetails: createUserParams,
    userPasswordDetails: createUserPasswordParams,
    userAddresssDetails: createUserAddressParams,
  ) {
    try {
      const checkUserExist = await this.findUserByEmail(userDetails.email);
      if (checkUserExist.length) {
        return new customError(
          HttpStatus.NOT_IMPLEMENTED,
          'Some Error Occured',
          'Invalid Details',
        );
      }

      const userCredential = this.userCredentialRepository.create({
        ...userPasswordDetails,
      });

      const userAddress = this.userAddressRepository.create({
        ...userAddresssDetails,
      });

      const createNewUserPasswordResponse =
        await this.userCredentialRepository.save(userCredential);

      const createNewUserAddressResponse =
        await this.userAddressRepository.save(userAddress);

      const createNewUserResponse = await this.userRepository.save({
        ...userDetails,
        address_details: createNewUserAddressResponse,
        password_details: createNewUserPasswordResponse,
      });

      return createNewUserResponse;
    } catch (error) {
      return new customError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Some Error Occured',
        error.message,
      );
    }
  }

  async findUserById(id: string) {
    try {
      const userProfileResponse = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.address_details', 'UserAddress')
        .leftJoinAndSelect('user.password_details', 'UserCredential')
        .where(`user.ID = :ID`, { ID: id })
        .getOne();
      return userProfileResponse;
    } catch (error) {
      return new customError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Some Error Occured',
        error.message,
      );
    }
  }

  async findUserByEmail(email: string) {
    try {
      const userProfileResponse = await this.userRepository
        .createQueryBuilder('user')
        .where(`user.EMAIL = :EMAIL`, { EMAIL: email })
        .execute();
      return userProfileResponse;
    } catch (error) {
      return new customError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Some Error Occured',
        error.message,
      );
    }
  }

  async findUserOrders(data) {
    try {
      const recordPerPage = 10;
      const offset = (data.page - 1) * recordPerPage;

      const sortField = data?.sort?.split('_')[0];
      const sortOrder = data?.sort?.split('_')[1];

      const queryBuilder = this.userOrderRepository
        .createQueryBuilder('userOrder')
        .select('userOrder')
        .leftJoinAndSelect('userOrder.product_details', 'Products')
        .where(`userOrder.customer.id = :ID`, { ID: data.id });

      if (sortField && sortOrder) {
        queryBuilder.orderBy(`userOrder.${sortField}`, sortOrder);
      }

      if (data.filter_status) {
        queryBuilder.andWhere('userOrder.status = :statusData', {
          statusData: data.filter_status,
        });
      }

      const userOrderResponse = await queryBuilder
        .limit(recordPerPage)
        .offset(offset)
        .getMany();

      return userOrderResponse;
    } catch (error) {
      return new customError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Some Error Occured',
        error.message,
      );
    }
  }

  async findOrderDetails(id) {
    try {
      const userOrderResponse = await this.userOrderRepository
        .createQueryBuilder('UserOrder')
        .leftJoinAndSelect('UserOrder.product_details', 'Products')
        .where(`UserOrder.order_id = :ID`, { ID: id })
        .getOne();

      return userOrderResponse;
    } catch (error) {
      return new customError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Some Error Occured',
        error.message,
      );
    }
  }
}
