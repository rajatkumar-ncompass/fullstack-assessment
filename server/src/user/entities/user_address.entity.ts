import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { UserOrder } from './user_order.entity';

@Entity()
export class UserAddress {
  @Column({ name: 'USER_ID', length: 200 })
  user_id: string;

  @PrimaryColumn({ name: 'ADDRESS_ID', length: 200 })
  address_id: string;

  @Column({ name: 'STREET', length: 200 })
  street: string;

  @Column({ name: 'LOCALITY', length: 200 })
  locality: string;

  @Column({ name: 'STATE', length: 200 })
  state: string;

  @OneToOne(() => UserOrder, (order) => order.address)
  order: UserOrder;

  @Column({ name: 'COUNTRY', length: 200 })
  country: string;

  @Column({ name: 'CITY', length: 200 })
  city: string;

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
