import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import Base from './base'
import {User} from './user'
import {Address} from './address'
import {Goods} from './goods'

/**
 * status 状态  1待发货 2已发货 3已完成 4已取消
 */
@Entity()
export class Order extends Base{
  @Column()
  status: number;

  @ManyToOne(type => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(type => Address)
  @JoinColumn({ name: "addressId" })
  address: Address;

  @ManyToOne(type => Goods)
  @JoinColumn({ name: "goodsId" })
  goods: Goods;
}