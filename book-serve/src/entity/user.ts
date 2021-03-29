import {
  Entity,
  Column,
} from 'typeorm';
import Base from './base'


// 1买家  2管理员
@Entity()
export class User extends Base{
  @Column({
    length: 80
  })
  username: string;

  @Column({
    length: 80
  })
  password: string;

  @Column({
    default: 1
  })
  role: number;

  @Column({
    type: 'uuid',
    default: null
  })
  token: string;
}