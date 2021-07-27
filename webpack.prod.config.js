const path = require('path') // 引入path路径

module.exports = { // 默认导出
    mode: 'production', // 打包模式为development，开发环境，代码不会压缩
    entry: path.join(__dirname, 'src', 'index.js'), // 需要打包的代码路径，入口文件，webpack会从改入口文件不断延伸查找所需依赖
    output: { // 打包完成输出的配置
      libraryTarget: 'umd', //类库加载方式
      filename: 'acceleratorkunn.js', // 输出的文件名
      path: path.join(__dirname,'dist') // 输出的文件夹
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',//使用 babel-loader
            options: {
              presets: ['@babel/preset-env']//包含es6转成es5的模块
            }
          }
        }
      ]
    }
  }