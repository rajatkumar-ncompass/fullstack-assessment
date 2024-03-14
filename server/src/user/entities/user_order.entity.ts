import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './users.entity';
import { Products } from 'src/product/entities/product.entity';

export enum OrderStatus {
  PLACED = 'PLACED',
  ACCEPTED = 'ACCEPTED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
}

@Entity()
export class UserOrder {
  @PrimaryColumn({ name: 'ORDER_ID', length: 200 })
  order_id: string;

  @ManyToOne(() => User, (user) => user.order_details)
  @JoinColumn({ name: 'CUSTOMER_ID' })
  customer: User;

  @Column({ name: 'ADDRESS_DETAILS', type: 'json' })
  address: {
    street: string;
    locality: string;
    state: string;
    city: string;
    country: string;
  };

  @ManyToMany(() => Products)
  @JoinTable()
  product_details: Products[];

  @Column({ name: 'ORDER_AMOUNT' })
  amount: number;

  @Column({
    name: 'ORDER_STATUS',
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PLACED,
  })
  status: string;

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
