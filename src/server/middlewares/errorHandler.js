const handler = {
    error(app, logger) {
        
        app.use(async (ctx, next) => {

            await next()
            if (ctx.status === 404) {
                ctx.status = 200
                ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>'
            }
        })
        app.use(async (ctx, next) => {
            try {
                await next()
            } catch (error) {
                logger.error(error)
                ctx.status = ctx.status||500
                ctx.body = "500了o(╥﹏╥)o"
            }
        })
    }
}
module.exports = handler