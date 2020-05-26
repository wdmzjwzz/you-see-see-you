
import {Readable} from 'stream'
import { create } from 'domain'
import cheerio from 'cheerio'
class BookController {
    constructor({BooksService}) {
      this.booksService = BooksService
    }
    async actionIndex(ctx, next) {
        const result = await this.booksService.getData()
        
        const html = await ctx.render('books/pages/list.html',{
            data:result
        })
        if (ctx.request.header['x-pjax']) {
            console.log('站内刷新')
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
            console.log('直接刷新！')
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