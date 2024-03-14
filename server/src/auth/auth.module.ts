import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { User } from 'src/user/entities/users.entity';
import { UserCredential } from 'src/user/entities/user_credentials.entity';
import { UserService } from 'src/user/user.service';
import { jwtConfig } from 'src/utils/jwt-config';
import { UserAddress } from 'src/user/entities/user_address.entity';
import { UserOrder } from 'src/user/entities/user_order.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserCredential, User, UserAddress, UserOrder]),
    JwtModule.registerAsync(jwtConfig),
  ],
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
