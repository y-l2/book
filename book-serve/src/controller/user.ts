import { BaseContext } from 'koa';
import * as uuid from 'uuid';
import { getManager, Repository } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { User } from '../entity/user';

export default class UserController {

    public static async createUser(ctx: BaseContext) {
        const userRepository: Repository<User> = getManager().getRepository(User);

        const userToBeSaved: User = new User();
        userToBeSaved.username = ctx.request.body.username;
        userToBeSaved.password = ctx.request.body.password;

        const errors: ValidationError[] = await validate(userToBeSaved); // errors is an array of validation errors

        if (errors.length > 0) {
            ctx.body = {
                code: 1,
                msg: errors
            };
        } else if (await userRepository.findOne({ username: userToBeSaved.username })) {
            ctx.body = {
                code: 1,
                msg: '用户已存在'
            };
        } else {
            await userRepository.save(userToBeSaved);
            ctx.body = {
                code: 0
            };
        }
    }

    public static async login(ctx: BaseContext) {
        const userRepository: Repository<User> = getManager().getRepository(User);

        if(!ctx.request.body.username || !ctx.request.body.password){
            ctx.body = {
                code: 1,
                msg: '用户名和密码必须填写'
            };

            return false
        }
        const userToBeUpdated: User = await userRepository.findOne({
            // select: ['id', 'username', 'token'],
            where: {
                username: ctx.request.body.username,
                password: ctx.request.body.password,
            }
        });

        if (userToBeUpdated) {
            userToBeUpdated.token = uuid.v4()
            const user = await userRepository.save(userToBeUpdated);
            ctx.body = {
                code: 0,
                data: user
            };
        } else {
            ctx.body = {
                code: 1,
                msg: '用户不存在'
            };
        }
    }


}