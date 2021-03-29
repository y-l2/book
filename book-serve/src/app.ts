import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import * as koaStatic from 'koa-static';
import * as cors from 'koa2-cors';
import * as logger from 'koa-logger';
import * as path from 'path';

import { config } from './config';
import { router } from './routes';


const checkToken = require('./middleware/check-token')

createConnection({
  type: 'mysql',
  ...config,
  synchronize: true,
  logging: true,
  entities: [
    'dist/entity/**/*.js'
  ]
}).then(connection => {

  const app = new Koa();

  app.use(cors())
  app.use(logger())
  app.use(koaBody({
    multipart: true,
    formLimit: 2 * 1024 * 1024,
    formidable: {
      uploadDir: path.join(__dirname, 'upload'),
      keepExtensions: true,
      maxFieldsSize: 2 * 1024 * 1024,
    }
  }));
  const staticPath = './upload'
  app.use(koaStatic(
      path.join( __dirname, staticPath)
  ))
  
  app.use(checkToken());
  app.use(router.routes());
  app.use(router.allowedMethods());

  
  app.listen(3017);

  console.log('连接成功 正在监听localhost:3017')

}).catch(error => console.log(error));
