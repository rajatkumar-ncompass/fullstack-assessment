import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/user/entities/users.entity';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { UserAddress } from 'src/user/entities/user_address.entity';
import { UserCredential } from 'src/user/entities/user_credentials.entity';
import { UserOrder } from './entities/user_order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserAddress, UserCredential, UserOrder]),
  ],
  providers: [UserService, JwtService, JwtStrategy],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
