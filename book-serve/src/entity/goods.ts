import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import Base from './base'

import {Category} from './category'

/**
 * name 图书名字
 * price 售价
 * author 重量
 * publish 出版社
 * time 出版时间
 * word 字数
 * description 图书介绍
 * image 图片
 */
@Entity()
export class Goods extends Base{
  @Column({
    length: 80
  })
  name: string;

  @Column({
    length: 80
  })
  price: string;

  @Column({
    length: 80
  })
  author: string;

  @Column({
    length: 80
  })
  word: string;
  
  @Column({
    length: 80
  })
  publish: string;
  
  @Column()
  time: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @ManyToOne(type => Category)
  @JoinColumn({ name: "categoryId" })
  category: Category;
}