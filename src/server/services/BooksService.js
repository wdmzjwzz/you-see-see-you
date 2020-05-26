
/**
 * This is the model class for table "books".
 *@fileoverview books类
 * @property int $id
 * @property string $name
 */
class BooksService {
    /**
     * @class
     * @param {*} app 执行上下文
     */
    constructor(app) {
        this.app = app;
    }
    /**
     * 获取数据
     * @param {*} 配置项
     * @example
     * cost books = new Book()
     * books.getDate() 
     */
    getData(options) {
        return Promise.resolve([
            {
                name: "第一本书",
                id: 1
            },
            {
                name: "第二本书",
                id: 2
            },
        ])
    }
}
export default BooksService
