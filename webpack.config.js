const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
console.log(3,isDev,process.env.NODE_ENV)
module.exports = {
  entry:'./src/index.js',
  output:{
    path: path.resolve(__dirname,'dist'),
    filename: 'assets/js/[name].[hash:6].bundle.js',
    publicPath:'',

  },
  mode: isDev ? 'development' : 'production',
  module:{
    rules:[
      {
        test:/\.jsx?$/,
        use:['babel-loader'],
        exclude: /node_modules/
      },
      {
        test:/\.css$/,
        use:[{
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true,
            },
          },'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024, //10K
              esModule: false,
              name: 'assets/images/[name]_[hash:6].[ext]',
            }
          },
        ],
        exclude: /node_modules/,
      },
      // {
      //   test: /.html$/,
      //   use: 'html-withimg-loader',//这个是修改html里面的图片地址的
      // },
      // {
      //   test: /\.(le|c)ss$/,
      //   use: ['style-loader', 'css-loader', {
      //       loader: 'postcss-loader',
      //       options: {
      //           plugins: function () {
      //               return [
      //                   require('autoprefixer')({
      //                       "overrideBrowserslist": [
      //                           ">0.25%",
      //                           "not dead"
      //                       ]
      //                   })
      //               ]
      //           }
      //       }
      //   }, 'less-loader'],
      //   exclude: /node_modules/
      // }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./public/index.html',
      filename:'index.html',//打包后的文件名
      minify:{
        removeComments: true, //删除注释
        removeAttributeQuotes:false, // 移除属性双引号
        collapseWhitespace:false, //删除空白符与换行符
        minifyCSS: true,// 压缩内联css
        //是否压缩html里的js（使用uglify-js进行的压缩）
        minifyJS: true,
      },
      hash:true, //如果设置为true，则会为每个文件增加一个hash  <script type="text/javascript" src="main.js?90c7c6ff257843ddc5c1"></script>
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns:['**/*', '!aaa*'],
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/style/[name].[hash:6].min.css',
      chunkFilename: '[id].css',
    }),
    new OptimizeCSSAssetsPlugin({
      // assetNameRegExp: /index\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }]
      },
      canPrint: true,
    })
  ],
  devServer:{
    // contentBase: path.join(__dirname, 'dist'), //在配置了 html-webpack-plugin 的情况下， contentBase 不会起任何作用
    compress:true,
    port: 3000,
    // host: '0.0.0.0',
    hot: true,
    overlay: true, //启用 overlay 后，当编译出错时，会在浏览器窗口全屏输出错误，默认是关闭的。
  },
  devtool: isDev ? 'cheap-module-eval-source-map' : 'none',


}