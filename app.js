
const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');
const moduleAlias = require('module-alias')
const render = require('koa-swig');
const co = require('co');
const { historyApiFallback } = require('koa2-connect-history-api-fallback');
moduleAlias.addAliases({
    '@': __dirname,
    '@controllers': __dirname + '/controllers',
    '@models': __dirname + '/models'
})
const { port, viewDir,staticDir } = require('@/config')

app.use(serve(staticDir));
app.use(historyApiFallback({index:"/", whiteList: ['/api'] }));
app.context.render = co.wrap(render({
    root: viewDir,
    autoescape: true,
    cache: process.env.NODE_ENV === 'development' ? false : 'memory', // disable, set to false
    ext: 'html',
    varControls:["[[",']]'],
    writeBody: false
}));
require('@/controllers')(app)

// 在端口3000监听:
app.listen(port, () => {
    console.log('app started ', port);
});
