import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { UserAddress } from 'src/user/entities/user_address.entity';
import { UserCredential } from 'src/user/entities/user_credentials.entity';

export class createUserDto {
  id: string;

  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 5,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @IsString()
  street: string;

  @IsString()
  state: string;

  @IsString()
  locality: string;

  @IsString()
  country: string;

  @IsString()
  city: string;

  address_details: UserAddress;
  password_details: UserCredential;
}
