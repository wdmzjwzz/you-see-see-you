
import router from 'koa-simple-router'
import BookController from './BookController'
import IndexController from './IndexController'
import ApiController from './ApiController'
const bookController = new BookController()
const apiController = new ApiController()
const indexController = new IndexController()
export default app => {
    app.use(router(_ => {
        _.get("/", indexController.actionIndex)
        _.get("/index.html", indexController.actionIndex)
        _.get("/book/list", bookController.actionIndex)
        _.get("/api/list", apiController.actionIndex)
    }))
}