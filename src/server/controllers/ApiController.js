
class ApiController {
    constructor({BooksService}) {
        this.booksService = BooksService
    }
    async actionIndex(ctx, next) {
        const result = await this.booksService.getData()
        ctx.body = {
            data: result
        }
    }
}
export default ApiController