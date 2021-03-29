import { BaseContext } from 'koa';
import { getManager, Repository } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { Order } from '../entity/order';
import { User } from '../entity/user';
import { Address } from '../entity/address';
import { Goods } from '../entity/goods';

export default class OrderController {

    public static async getOrders(ctx: BaseContext) {

        const orderRepository: Repository<Order> = getManager().getRepository(Order);
        const {
            page,
            pageSize
        } = ctx.request.body

        const {id, role} = ctx.user
        const where = {
            user: {
                id
            }
        }
        if(role == 2){
            delete where.user
        }
     
        const orders: Order[] = await orderRepository.find({
            relations: ['user', 'goods', 'address'],
            where,
            select: {
                user: {
                    id: true,
                    username: true
                }
            },
            order: {
                createdAt: "DESC"
            },
            skip: page || 0,
            take: pageSize || 10
        });

        ctx.body = {
            code: 0,
            data: orders
        };
    }

    public static async getOrderById(ctx: BaseContext) {

        const orderRepository: Repository<Order> = getManager().getRepository(Order);

        const order: Order = await orderRepository.findOne({
            relations: ['user', 'goods', 'address'],
            select: {
                user: {
                    id: true,
                    username: true
                }
            },
            where: {
                id: ctx.request.body.id
            }
        });

        ctx.body = {
            code: 0,
            data: order
        };
    }
    

    public static async createOrder(ctx: BaseContext) {
        const orderRepository: Repository<Order> = getManager().getRepository(Order);
        const userRepository: Repository<User> = getManager().getRepository(User);
        const addressRepository: Repository<Address> = getManager().getRepository(Address);
        const goodsRepository: Repository<Goods> = getManager().getRepository(Goods);

        const orderToBeSaved: Order = new Order();
  
        const {id} = ctx.user
        const { addressId, goodsId} = ctx.request.body
        orderToBeSaved.status = 0;

        orderToBeSaved.user = await userRepository.findOne({
            id
        });
        orderToBeSaved.address = await addressRepository.findOne({
            id: addressId
        });
        orderToBeSaved.goods = await goodsRepository.findOne({
            id: goodsId
        });
        const errors: ValidationError[] = await validate(orderToBeSaved);

        if (errors.length > 0) {
            ctx.body = {
                code: 1,
                msg: errors
            };
        } else {
            await orderRepository.save(orderToBeSaved);
            
            ctx.body = {
                code: 0
            };
        }
    }

    public static async updateOrder (ctx: BaseContext) {

        const orderRepository: Repository<Order> = getManager().getRepository(Order);

        const orderToBeUpdated: Order = new Order();
        const {status, id} = ctx.request.body
        orderToBeUpdated.id = id; 

        orderToBeUpdated.status = status;

        const errors: ValidationError[] = await validate(orderToBeUpdated); 

        if (errors.length > 0) {
            ctx.body = {
                code: 1,
                msg: errors
            };
        } else if ( !await orderRepository.findOne({
            id: orderToBeUpdated.id
        }) ) {
            ctx.body = {
                code: 1,
                msg: '数据不存在'
            };
        } else {
            await orderRepository.save(orderToBeUpdated);
            ctx.body = {
                code: 0
            }
        }

    }

}