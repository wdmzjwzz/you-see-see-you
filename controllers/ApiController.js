const Books = require('@models/Books')
const books = new Books()
class ApiController {
    constructor() {

    }
    async actionIndex(ctx, next) {
        const result = await books.getData()
        ctx.body = {
            data: result
        }
    }
}
module.exports = ApiController