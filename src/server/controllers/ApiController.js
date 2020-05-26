import { route, GET } from 'awilix-koa';
@route('/api')
class ApiController {
    constructor({ booksService }) {
        this.booksService = booksService
    }
    @route('/list')
    @GET()
    async actionIndex(ctx, next) {

        ctx.body = await this.booksService.getData()
    }
}
export default ApiController