
import {Readable} from 'stream'
import { create } from 'domain'
import cheerio from 'cheerio'
import { route, GET } from 'awilix-koa';
@route('/book')
class BookController {
    constructor({BooksService}) {
      this.booksService = BooksService
    }
    @route('/list')
    @GET()
    async actionIndex(ctx, next) {
        const result = await this.booksService.getData()
        
        const html = await ctx.render('books/pages/list.html',{
            data:result
        })
        if (ctx.request.header['x-pjax']) {
            const $ = cheerio.load(html)
            ctx.status = 200;
            ctx.type = 'html'
            $('.pjaxcontent').each(function(){
                ctx.res.write($(this).html())
            });
            $('.lazyload-js').each(function(){
                ctx.res.write(`<script src="${$(this).attr('src')}"></script>`)
            });
            ctx.res.end()
        } else {
            function createSSRStreamPromise() {
                return new Promise((reslove,reject)=>{
                    const htmlStream = new Readable();
                    htmlStream.push(html);
                    htmlStream.push(null);
                    ctx.status = 200;
                    ctx.type = 'html'
                    htmlStream.on('error',(err)=>{
                        reject(err)
                    }).pipe(ctx.res)
                })
            }
            await createSSRStreamPromise();
        }
        
        // ctx.body = html
    }
    @route('/add')
    @GET()
    async addbooks(ctx, next) {
        const result = await this.booksService.getData()
        const html = await ctx.render('books/pages/create.html',{
            data:result
        })
        //站内刷新
        if (ctx.request.header['x-pjax']) {
            const $ = cheerio.load(html)
            ctx.status = 200;
            ctx.type = 'html'
            $('.pjaxcontent').each(function(){
                ctx.res.write($(this).html())
            });
            $('.lazyload-js').each(function(){
                ctx.res.write(`<script src="${$(this).attr('src')}"></script>`)
            });
            ctx.res.end()
        } else {
            // 直接刷
            function createSSRStreamPromise() {
                return new Promise((reslove,reject)=>{
                    const htmlStream = new Readable();
                    htmlStream.push(html);
                    htmlStream.push(null);
                    ctx.status = 200;
                    ctx.type = 'html'
                    htmlStream.on('error',(err)=>{
                        reject(err)
                    }).pipe(ctx.res)
                })
            }
            await createSSRStreamPromise();
        }
        
    }
}
export default BookController