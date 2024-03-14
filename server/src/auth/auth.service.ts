import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/user/entities/users.entity';
import { UserCredential } from 'src/user/entities/user_credentials.entity';
import { customError } from 'src/utils/exceptionHandler';
import { UserService } from 'src/user/user.service';
import { encrypt } from 'src/utils/encrypt';
import { UserAddress } from 'src/user/entities/user_address.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  @InjectRepository(User) private userRepository: Repository<User>;
  @InjectRepository(UserCredential)
  private userCredentialRepository: Repository<UserCredential>;
  @InjectRepository(UserAddress)
  private userAddressRepository: Repository<UserAddress>;

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user)
        return new customError(
          HttpStatus.UNAUTHORIZED,
          'Invalid Credentials',
          'User not found',
        );

      const passwordHash = encrypt(password);
      const userCredential = await this.userCredentialRepository.findOne({
        where: { id: user.id },
      });

      if (!userCredential || passwordHash !== userCredential.password)
        return new customError(
          HttpStatus.FORBIDDEN,
          'Invalid Credentials',
          'Password mismatch',
        );

      return user;
    } catch (error) {
      return new customError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Some Error Occured',
        error.message,
      );
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const user = await this.validateUser(email, password);
      if (user instanceof customError) {
        return user;
      }

      const rolesArray = await this.userService.findUserById(user.id);
      if (rolesArray instanceof customError) {
        return rolesArray;
      }
      const payload = {
        email: user.email,
        id: user.id,
        roles: rolesArray['roleArray'],
      };
      const token = await this.jwtService.signAsync(payload);
      return { token: token };
    } catch (error) {
      return new customError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Login Failed',
        error.message,
      );
    }
  }
}
