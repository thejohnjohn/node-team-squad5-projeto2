import { ProductOrder } from '@modules/orders/infra/typeorm/models/ProductOrder';
import { IProduct } from '@modules/products/models/IProduct';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from '@modules/users/infra/typeorm/models/User';

@Entity('products')
class Product implements IProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, user => user)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column('varchar')
  name: string;

  @Column('varchar')
  description: string;

  @Column('integer')
  value: number;

  @Column('varchar')
  code: string;

  @Column('integer')
  quantity: number;

  @Column('varchar')
  category: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Product };
