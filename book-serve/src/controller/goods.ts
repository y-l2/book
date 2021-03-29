import { BaseContext } from 'koa';
import { getManager, Repository, Like } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { Goods } from '../entity/goods';
import { User } from '../entity/user';
import { Category } from '../entity/category';

export default class GoodsController {

    public static async getGoods(ctx: BaseContext) {

        const goodsRepository: Repository<Goods> = getManager().getRepository(Goods);

        const {
            name,
            categoryId,
            page,
            pageSize
        } = ctx.request.body

        const where = {
            name: Like(`%${name}%`),
            category: {
                id: categoryId
            },
        }


        if (!name) {
            delete where.name
        }

        if (!categoryId) {
            delete where.category
        }

        const [goods, total]: [Goods[], number] = await goodsRepository.findAndCount({
            order: {
                createdAt: "DESC"
            },
            relations: ['category'],
            select: {
                category: {
                    id: true,
                    name: true
                },
            },
            where,
            skip: page || 0,
            take: pageSize || 10
        });

        ctx.body = {
            code: 0,
            total,
            data: goods,
        };
    }
    
    public static async getGoodsById (ctx: BaseContext) {
        const goodsRepository: Repository<Goods> = getManager().getRepository(Goods);
        const goods: Goods = await goodsRepository.findOne({
            where: {
                id: ctx.request.body.id
            },
            relations: ['category'],
            select: {
                category: {
                    id: true,
                    name: true
                },
            },
        })

        if(goods){
            ctx.body = {
                code: 0,
                data: goods,
            };
        } else {
            ctx.body = {
                code: 1,
                msg: '数据不存在',
            };
        }
    }

    public static async createGoods(ctx: BaseContext) {
        const goodsRepository: Repository<Goods> = getManager().getRepository(Goods);
        const categoryRepository: Repository<Category> = getManager().getRepository(Category);

        const goodsToBeSaved: Goods = new Goods();
        goodsToBeSaved.name = ctx.request.body.name;
        goodsToBeSaved.price = ctx.request.body.price;
        goodsToBeSaved.author = ctx.request.body.author;
        goodsToBeSaved.publish = ctx.request.body.publish;
        goodsToBeSaved.time = ctx.request.body.time;
        goodsToBeSaved.word = ctx.request.body.word;
        goodsToBeSaved.description = ctx.request.body.description;
        goodsToBeSaved.image = ctx.request.body.image;
        
        goodsToBeSaved.category = await categoryRepository.findOne({
            id: ctx.request.body.categoryId
        });

        const errors: ValidationError[] = await validate(goodsToBeSaved);

        if (errors.length > 0) {
            ctx.body = {
                code: 1,
                msg: errors
            };
        } else {
            await goodsRepository.save(goodsToBeSaved);

            ctx.body = {
                code: 0
            };
        }
    }

    public static async updateGoods(ctx: BaseContext) {

        const goodsRepository: Repository<Goods> = getManager().getRepository(Goods);
        const categoryRepository: Repository<Category> = getManager().getRepository(Category);

        const goodsToBeUpdated: Goods = new Goods();
        goodsToBeUpdated.id = ctx.request.body.id;
        goodsToBeUpdated.name = ctx.request.body.name;
        goodsToBeUpdated.price = ctx.request.body.price;
        goodsToBeUpdated.author = ctx.request.body.author;
        goodsToBeUpdated.publish = ctx.request.body.publish;
        goodsToBeUpdated.time = ctx.request.body.time;
        goodsToBeUpdated.word = ctx.request.body.word;
        goodsToBeUpdated.description = ctx.request.body.description;
        goodsToBeUpdated.image = ctx.request.body.image;
        
        goodsToBeUpdated.category = await categoryRepository.findOne({
            id: ctx.request.body.categoryId
        });

        const errors: ValidationError[] = await validate(goodsToBeUpdated);

        if (errors.length > 0) {
            ctx.body = {
                code: 1,
                msg: errors
            };
        } else if (!await goodsRepository.findOne({
            id: goodsToBeUpdated.id
        })) {
            ctx.body = {
                code: 1,
                msg: '数据不存在'
            };
        } else {
            await goodsRepository.save(goodsToBeUpdated);
            ctx.body = {
                code: 0
            }
        }

    }

    public static async deleteGoods(ctx: BaseContext) {

        const goodsRepository = getManager().getRepository(Goods);

        const goodsToRemove: Goods = await goodsRepository.findOne({
            id: ctx.request.body.id
        });
        if (!goodsToRemove) {
            ctx.body = {
                code: 1,
                msg: '数据不存在'
            };
        } else {
            await goodsRepository.remove(goodsToRemove);
            ctx.body = {
                code: 0
            }
        }

    }

}