
import Koa from 'koa';
const app = new Koa();
import serve from 'koa-static';
import { addAliases } from 'module-alias';
import render from 'koa-swig';
import { wrap } from 'co';
import { configure, getLogger } from 'log4js';
import { historyApiFallback } from 'koa2-connect-history-api-fallback';
import { error } from './middlewares/errorHandler';
import config from './config';

import {
    Lifetime,
    createContainer
} from 'awilix';
// import {
//     scopePerRequest,
//     loadControllers
// } from 'awilix-koa';
const { port, viewDir, staticDir } = config
const setTitle = require('node-bash-title');

// 创建一个容器，管理所有的服务和路由
const container = createContainer()
addAliases({
    '@root': __dirname,
    '@controllers': __dirname + '/controllers',
    '@models': __dirname + '/models'
})


setTitle('🚀 server启动项目');
// 把所有的service注册容器
// 每一个controller把需要的service注册进去
container.loadModules([__dirname + "/services/*.js"], {
    formatName: "camelCase",
    registerOptions: {
        lifetime: Lifetime.SCOPED
    }
})
configure({
    appenders: { app: { type: 'file', filename: './logs/app.log' } },
    categories: { default: { appenders: ['app'], level: 'error' } }
});

const logger = getLogger('app');
// app.use(scopePerRequest(container));
app.use(serve(staticDir));
// app.use(historyApiFallback({ index: "/", whiteList: ['/api'] }));
app.context.render = wrap(render({
    root: viewDir,
    autoescape: true,
    cache: process.env.NODE_ENV === 'development' ? false : 'memory', // disable, set to false
    ext: 'html',
    varControls: ["[[", ']]'],
    writeBody: false
}));
error(app, logger)
require('./controllers').default(app);

// 在端口3000监听:
app.listen(port, () => {
    console.log('app started ', port);
});
