import { BaseContext } from 'koa';
import * as path from 'path';

export default class UploadController {

    public static async upload(ctx: BaseContext) {
        console.log(ctx.request.files)
        ctx.body = {
            code: 1,
            data: {
                name: path.basename(ctx.request.files.file.path),
            }
        };
    }

}