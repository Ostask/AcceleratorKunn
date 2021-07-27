const path = require('path') // 引入path路径
const HtmlWebpackPlugin = require('html-webpack-plugin') // 引用解析html

module.exports = { // 默认导出
  mode: 'development', // 打包模式为development，开发环境，代码不会压缩
  entry: path.join(__dirname, 'example', 'index.js'), // 需要打包的代码路径，入口文件，webpack会从改入口文件不断延伸查找所需依赖
  output: { // 打包完成输出的配置
    libraryTarget: 'umd', //类库加载方式
    filename: 'bundle.js', // 输出的文件名
    path: path.join(__dirname, 'example' ,'dist') // 输出的文件夹
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
  },
  plugins: [ // 解析html文件
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'example', 'index.html'), // 源文件
      filename: 'index.html' // 输出文件
    })
  ],
  devServer: { // 启动端口
    port: 3000,
    contentBase: path.join(__dirname, 'example' ,'dist') // 执行dist文件夹里面的内容
  }
}