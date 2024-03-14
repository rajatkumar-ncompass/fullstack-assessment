import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserCredential } from './user_credentials.entity';
import { UserAddress } from './user_address.entity';
import { UserOrder } from './user_order.entity';

@Entity()
export class User {
  @PrimaryColumn({ name: 'ID', length: 200 })
  id: string;

  @Column({ name: 'NAME', length: 200 })
  name: string;

  @Column({ name: 'EMAIL', length: 200 })
  email: string;

  @OneToOne(() => UserCredential)
  @JoinColumn()
  password_details: UserCredential;

  @OneToMany(() => UserOrder, (order) => order.customer)
  order_details: UserOrder[];

  @OneToOne(() => UserAddress)
  @JoinColumn()
  address_details: UserAddress;

  @CreateDateColumn({
    name: 'CREATED_AT',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'UPDATED_AT',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
