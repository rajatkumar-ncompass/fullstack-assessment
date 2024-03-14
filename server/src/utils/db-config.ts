import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Products } from 'src/product/entities/product.entity';
import { UserAddress } from 'src/user/entities/user_address.entity';

import { UserCredential } from 'src/user/entities/user_credentials.entity';
import { UserOrder } from 'src/user/entities/user_order.entity';
import { User } from 'src/user/entities/users.entity';

export const dbConfig: TypeOrmModuleAsyncOptions = {
  useFactory: () => ({
    type: process.env.DB_TYPE as 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [UserCredential, User, UserAddress, Products, UserOrder],
    synchronize: true,
  }),
};
