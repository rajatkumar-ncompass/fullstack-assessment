import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ProductType {
  Phone = 'Phone',
  Tablet = 'Tablet',
}

@Entity()
export class Products {
  @PrimaryColumn({ name: 'PRODUCT_ID' })
  id: number;

  @Column({ name: 'PRODUCT_NAME', length: 200 })
  name: string;

  @Column({ name: 'PRODUCT_MODEL', length: 200 })
  model: string;

  @Column({ name: 'PRODUCT_AVAILABILTY' })
  availabilty: number;

  @Column({ name: 'PRODUCT_RATING' })
  rating: number;

  @Column({
    name: 'PRODUCT_TYPE',
  })
  type: string;

  @Column({ name: 'PRODUCT_PRICE' })
  price: number;

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
