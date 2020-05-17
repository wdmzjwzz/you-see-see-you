const argv = require("yargs-parser")(process.argv.slice(2))
const _mode = argv.mode || "development"
const _mergeConfig = require(`./config/webpack.${_mode}.js`)
const merge = require('webpack-merge')
const { sync } = require('glob')
const file = sync("./src/web/views/**/*.entry.js")
const { resolve,join } = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const HtmlAfterPlugin = require('./config/htmlAfterPlugin');
let _plugin = []
let _entry = {}
for (let item of file) {

    if (/.+\/([A-z]+-[A-z]+)(\.entry\.js)/g.test(item)) {
        let entryKey = RegExp.$1
        _entry[entryKey] = item
        const [dist, template] = entryKey.split('-')
        _plugin.push(new htmlWebpackPlugin({
            filename: `../views/${dist}/pages/${template}.html`,
            template: `src/web/views/${dist}/pages/${template}.html`,
            inject: false,
            chunks: ['runtime', entryKey],
        }))

    } else {
        console.log("配置失败=======")
        process.exit(-1)
    }

}
const webpackConfig = {
    entry: _entry,
    output: {
        path: join(__dirname, "./dist/assets"),
        publicPath: '/',
        filename: "scripts/[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    watch: _mode == 'development' ? true : false,
    optimization: {
        runtimeChunk: {
            name: "runtime"
        }
    },
    externals: {
        jquery: 'jQuery',
    },
    plugins: [..._plugin, new HtmlAfterPlugin()],
    resolve: {
        alias: {
            '@': resolve('src/web'),
        },
    }

}
module.exports = merge(webpackConfig, _mergeConfig)