import { UserAddress } from 'src/user/entities/user_address.entity';
import { UserCredential } from 'src/user/entities/user_credentials.entity';

export type createUserParams = {
  id: string;
  name: string;
  email: string;
  password: string;
  address_details: UserAddress;
  password_details: UserCredential;
};
