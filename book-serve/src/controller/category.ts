import { BaseContext } from 'koa';
import { getManager, Repository } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { Category } from '../entity/category';

export default class CategoryController {

    public static async getCategories(ctx: BaseContext) {

        const categoryRepository: Repository<Category> = getManager().getRepository(Category);

        const categories: Category[] = await categoryRepository.find();

        ctx.body = {
            code: 0,
            data: categories
        };
    }

    public static async createCategory(ctx: BaseContext) {
        const categoryRepository: Repository<Category> = getManager().getRepository(Category);

        const categoryToBeSaved: Category = new Category();
        categoryToBeSaved.name = ctx.request.body.name;

        const errors: ValidationError[] = await validate(categoryToBeSaved);

        if (errors.length > 0) {
            ctx.body = {
                code: 1,
                msg: errors
            };
        } else {
            await categoryRepository.save(categoryToBeSaved);
            
            ctx.body = {
                code: 0
            };
        }
    }

    public static async updateCategory (ctx: BaseContext) {

        const categoryRepository: Repository<Category> = getManager().getRepository(Category);

        const categoryToBeUpdated: Category = new Category();
        categoryToBeUpdated.id = ctx.request.body.id; 
        categoryToBeUpdated.name = ctx.request.body.name;

        const errors: ValidationError[] = await validate(categoryToBeUpdated); 

        if (errors.length > 0) {
            ctx.body = {
                code: 1,
                msg: errors
            };
        } else if ( !await categoryRepository.findOne({
            id: categoryToBeUpdated.id
        }) ) {
            ctx.body = {
                code: 1,
                msg: '数据不存在'
            };
        } else {
            await categoryRepository.save(categoryToBeUpdated);
            ctx.body = {
                code: 0
            }
        }

    }

    public static async deleteCategory (ctx: BaseContext) {

        const categoryRepository = getManager().getRepository(Category);

        const categoryToRemove: Category = await categoryRepository.findOne({
            id: ctx.request.body.id
        });
        if (!categoryToRemove) {
            ctx.body = {
                code: 1,
                msg: '数据不存在'
            };
        } else {
            await categoryRepository.remove(categoryToRemove);
            ctx.body = {
                code: 0
            }
        }

    }

}