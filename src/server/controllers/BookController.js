import Books from '@models/Books'
import {Readable} from 'stream'
import { create } from 'domain'
import cheerio from 'cheerio'
const books = new Books()
class BookController {
    constructor() {

    }
    async actionIndex(ctx, next) {
        const result = await books.getData()
        
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
        const result = await books.getData()
        const html = await ctx.render('books/pages/create.html',{
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
        
    }
}
export default BookController