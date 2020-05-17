const CopyPlugin = require('copy-webpack-plugin');
const { join } = require('path');
const setTitle = require('node-bash-title');
setTitle('🚀 Webapp开发环境');
module.exports = {
  plugins: [
    new CopyPlugin([
      {
        from: join(__dirname, '../', 'src/web/views/layouts/layout.html'),
        to: '../views/layouts/layout.html',
      },
    ]),
    new CopyPlugin(
      [
        {
          from: join(__dirname, '../', 'src/web/components'),
          to: '../components',
        },
      ],
      {
        copyUnmodified: true,
        ignore: ['*.js', '*.css', '.DS_Store'],
      }
    ),
  ],
};
