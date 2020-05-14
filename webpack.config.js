const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const { sync } = require('glob');
const { resolve, join } = require('path');
const files = sync('./src/web/views/**/*.entry.js');
const HtmlAfterPlugin = require('./config/htmlAfterPlugin');
let _enrty = {};
let _plugins = [];
for (let item of files) {
  if (/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js$)/g.test(item) == true) {
    const entryKey = RegExp.$1;
    // console.log("获取的key", entryKey);
    _enrty[entryKey] = item;
    const [dist, template] = entryKey.split('-');
    _plugins.push(
      new HtmlWebpackPlugin({
        filename: `../views/${dist}/pages/${template}.html`,
        template: `src/web/views/${dist}/pages/${template}.html`,
        inject: false,
        chunks: ['runtime', entryKey],
      })
    );
  } else {
    console.log('🐽', '项目配置失败');
    process.exit(-1);
  }
}
const webpackConfig = {
  entry: _enrty,
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
  output: {
    path: join(__dirname, './dist/assets'),
    publicPath: '/',
    filename: 'scripts/[name].bundle.js',
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
  },
  plugins: [..._plugins, new HtmlAfterPlugin()],
  externals: {
    jquery: 'jQuery',
  },
  resolve: {
    alias: {
      '@': resolve('src/web'),
    },
  },
};

module.exports = merge(webpackConfig, _mergeConfig);
