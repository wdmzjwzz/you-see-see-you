import {route,GET} from 'awilix-koa';
@route('/')
class IndexController {
    constructor() { }
    @route('/')
    @GET()
    async actionIndex(ctx, next) {
        ctx.body = await ctx.render('index/pages/index.html',{
            data:"这是data啊"
        })
    }
    
}
export default IndexController