import {
  Entity,
  Column
} from 'typeorm';

import Base from './base'

@Entity()
export class Category extends Base {
  @Column({
    length: 80
  })
  name: string;
}