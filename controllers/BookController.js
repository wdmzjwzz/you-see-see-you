const Books = require('@models/Books')
const books = new Books()
class BookController {
    constructor() {

    }
    async actionIndex(ctx, next) {
        const result = await books.getData()
        ctx.body = {
            data: result
        }
    }
}
module.exports = BookController