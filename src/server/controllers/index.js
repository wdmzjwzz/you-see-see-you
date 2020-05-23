
import router from 'koa-simple-router'
import BookController from '@controllers/BookController'
import IndexController from '@controllers/IndexController'
import ApiController from '@controllers/ApiController'
const bookController = new BookController()
const apiController = new ApiController()
const indexController = new IndexController()
export default app => {
    app.use(router(_ => {
        _.get("/", indexController.actionIndex)
        _.get("/index.html", indexController.actionIndex)
        _.get("/book/list", bookController.actionIndex)
        _.get("/book/add", bookController.addbooks)
        _.get("/api/list", apiController.actionIndex)
    }))
}