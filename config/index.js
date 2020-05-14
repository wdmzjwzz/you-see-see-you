const { extend } = require('lodash')
const { join } = require("path")
let config = {
    port: 8000,
    viewDir: join(__dirname, "..", 'views'),
    staticDir: join(__dirname, "..", 'assets')
}
if (process.env.NODE_ENV === 'development') {
    let localConfig = {
        port: 8080
    }
    config = extend(config, localConfig)
}
if (process.env.NODE_ENV === 'production') {
    let localConfig = {
        port: 80
    }
    config = extend(config, localConfig)
}
module.exports = config