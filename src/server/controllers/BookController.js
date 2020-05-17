import Books from '@models/Books'
const books = new Books()
class BookController {
    constructor() {

    }
    async actionIndex(ctx, next) {
        const result = await books.getData()
        // ctx.body = {
        //     data: result
        // }
        ctx.body = await ctx.render('books/pages/books.html',{
            data:result
        })
        
    }
}
export default BookController