const path = require('path');
const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');// 生成html 模板
const CleanWebpackPlugin = require('clean-webpack-plugin'); //清空dist插件
module.exports = {
  entry: {
    index:'./src/index/index.js',
    commit:'./src/commit/commit.js',
    test:'./src/commit/test.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[id].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [{
          loader:'vue-loader',
          options:{
            loaders: {
              sass: ExtractTextWebpackPlugin.extract({
                        fallback:'vue-style-loader', 
                        use:['css-loader','sass-loader']
                    }),//提取sass文件
              css: ExtractTextWebpackPlugin.extract({
                        fallback:'vue-style-loader', 
                        use:['css-loader']
                    })//能提取公共css文件
            }
          }
        }]
      },
      {
        test: /\.scss$/,
        use:ExtractTextWebpackPlugin.extract({
                fallback:'style-loader', 
                use:['css-loader','sass-loader']
              })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }]
     },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {name: '[name].[ext]?[hash]'}  
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    contentBase: './',
    host: 'localhost',
    port: 2246,
    inline: true,
    hot: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins:[
  // 提取公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors', // 公共模块的名称
      chunks: ['index','commit'],  // chunks 是需要提取的模块, 提取index 和 commint的公共模块
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new HtmlWebpackPlugin({
      title:'Index',
      template: './src/index/index.html',
      filename:'./index.html',
      chunks: ['vendors','index'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      title:'Index',
      template: './src/commit/commit.html',
      filename:'./commit.html',
      chunks: ['vendors','commit','test',],
      inject: true 
    }),
    new ExtractTextWebpackPlugin({filename: 'css/[name].css',allChunks: true})
    ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    })
  ])
}
