
import Koa from 'koa';
const app = new Koa();
import serve from 'koa-static';
import { addAliases } from 'module-alias';
import render from 'koa-swig';
import { wrap } from 'co';
import { configure, getLogger } from 'log4js';
import { historyApiFallback } from 'koa2-connect-history-api-fallback';
addAliases({
    '@root': __dirname,
    '@controllers': __dirname + '/controllers',
    '@models': __dirname + '/models'
})

import  config from './config';
const { port, viewDir, staticDir } = config
import { error } from './middlewares/errorHandler';

configure({
    appenders: { app: { type: 'file', filename: './logs/app.log' } },
    categories: { default: { appenders: ['app'], level: 'error' } }
});

const logger = getLogger('app');
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
error(app,logger)
require('./controllers').default(app);

// 在端口3000监听:
app.listen(port, () => {
    console.log('app started ', port);
});
