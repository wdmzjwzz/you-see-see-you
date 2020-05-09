
const router = require('koa-simple-router')
const BookController = require('@controllers/BookController')
const IndexController = require('@controllers/IndexController')
const ApiController = require('@controllers/ApiController')
const bookController = new BookController()
const apiController = new ApiController()
const indexController = new IndexController()
module.exports = app => {
    app.use(router(_ => {
        // _.get("/book/list", bookController.actionIndex)
        // _.get("/index.html", indexController.actionIndex)
        _.get("/", indexController.actionIndex)
        _.get("/api/list", apiController.actionIndex)
    }))
}