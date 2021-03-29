import { getManager, Repository } from 'typeorm';
import { User } from '../entity/user';

let whiteList = []

const checkToken = async (ctx, next) => {

	let res = !!whiteList.filter(o => o == ctx.request.url).length

	let {token} = ctx.header
	// 需要检查 但是没有传token字段
	console.log(ctx.request.method)
	if (!res && !token && !ctx.request.url.includes('categories') && !ctx.request.url.includes('goods') && ctx.request.method != 'GET') {
		ctx.body = {
			code: 403,
			msg: '无token'
		}

		return false
	}

	// 需要检查并且有token字段
	if (!res && token) {
    // token匹配不到用户
    const userRepository: Repository<User> = getManager().getRepository(User);

		const user: User = await userRepository.findOne({
			where: {
				token
			}
		})

		if (!user) {
			ctx.body = {
				code: 403,
				msg: '无效的token'
			}
			return false
		}
		
		ctx.user = user

		await next();

		return false

	}
	await next();

}

module.exports = function (list = [
	'/login',
	'/register',
	'/goods',
	'/categories',
	'/scenes'
]) {
	whiteList = list
	return checkToken
}