import { BaseContext } from 'koa';
import { getManager, Repository } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { Address } from '../entity/address';
import { User } from '../entity/user';

export default class AddressController {

    public static async getAddress(ctx: BaseContext) {

        const sceneRepository: Repository<Address> = getManager().getRepository(Address);
        const address: Address[] = await sceneRepository.find({
            where: {
                user: {
                    id: ctx.user.id
                }
            }
        });

        ctx.body = {
            code: 0,
            data: address
        };
    }

    public static async getAddressById(ctx: BaseContext) {

        const sceneRepository: Repository<Address> = getManager().getRepository(Address);
        const address: Address = await sceneRepository.findOne({
            where: {
                id: ctx.request.body.id
            }
        });

        ctx.body = {
            code: 0,
            data: address
        };
    }
    
    public static async createAddress(ctx: BaseContext) {
        const userRepository: Repository<User> = getManager().getRepository(User);
        const sceneRepository: Repository<Address> = getManager().getRepository(Address);

        const sceneToBeSaved: Address = new Address();
        sceneToBeSaved.name = ctx.request.body.name;
        sceneToBeSaved.mobile = ctx.request.body.mobile;
        sceneToBeSaved.address = ctx.request.body.address;

        sceneToBeSaved.user = await userRepository.findOne({
            id: ctx.user.id
        });
        
        const errors: ValidationError[] = await validate(sceneToBeSaved);

        if (errors.length > 0) {
            ctx.body = {
                code: 1,
                msg: errors
            };
        } else {
            await sceneRepository.save(sceneToBeSaved);
            
            ctx.body = {
                code: 0
            };
        }
    }

    public static async updateAddress (ctx: BaseContext) {

        const sceneRepository: Repository<Address> = getManager().getRepository(Address);

        const sceneToBeUpdated: Address = new Address();
        sceneToBeUpdated.id = ctx.request.body.id; 
        sceneToBeUpdated.name = ctx.request.body.name;
        sceneToBeUpdated.mobile = ctx.request.body.mobile;
        sceneToBeUpdated.address = ctx.request.body.address;

        const errors: ValidationError[] = await validate(sceneToBeUpdated); 

        if (errors.length > 0) {
            ctx.body = {
                code: 1,
                msg: errors
            };
        } else if ( !await sceneRepository.findOne({
            id: sceneToBeUpdated.id
        }) ) {
            ctx.body = {
                code: 1,
                msg: '数据不存在'
            };
        } else {
            await sceneRepository.save(sceneToBeUpdated);
            ctx.body = {
                code: 0
            }
        }

    }

    public static async deleteAddress (ctx: BaseContext) {

        const sceneRepository = getManager().getRepository(Address);

        const sceneToRemove: Address = await sceneRepository.findOne({
            id: ctx.request.body.id
        });
        if (!sceneToRemove) {
            ctx.body = {
                code: 1,
                msg: '数据不存在'
            };
        } else {
            await sceneRepository.remove(sceneToRemove);
            ctx.body = {
                code: 0
            }
        }

    }

}