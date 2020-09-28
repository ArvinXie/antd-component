let path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
 
module.exports = {
    entry: {
        index: './packages/index',
    },
    devtool: 'none',
    mode: 'production',// 告诉webpack使用production模式的内置优化,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        library: 'antd-doddle',
        libraryTarget: 'umd',
        sourceMapFilename: '[file].map', // string
    },


    module: {
        rules: [  {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }, {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader'],
          }, {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
          }, {
            test: /\.less$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
          }]
    },

    plugins: [
        new CleanWebpackPlugin( ),
        new MiniCssExtractPlugin({ filename: './index.css' }),// 文件目录会放入output.path里
    ],
    externals: { // 从输出的bundle中排除依赖
        react: { commonjs: 'react', commonjs2: 'react', amd: 'react', },
        react: { commonjs: 'react-dom', commonjs2: 'react-dom', amd: 'react-dom', },
        antd: { commonjs: 'antd', commonjs2: 'antd', amd: 'antd', },
        moment: { commonjs: 'moment', commonjs2: 'moment', amd: 'moment', },
    }

}