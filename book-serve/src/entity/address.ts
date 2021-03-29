import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import {IsNotEmpty} from "class-validator";
import Base from './base'
import {User} from './user'

/**
 * name 名字
 * address 收货地址
 * mobile 手机号
 */
@Entity()
export class Address extends Base{
  @Column({
    length: 80
  })
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  address: string;

  @Column({
    length: 11
  })
  mobile: string;

  @ManyToOne(type => User)
  @JoinColumn({ name: "userId" })
  user: User;

}