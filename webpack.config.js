let path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    index: './packages/index',
    utils: './packages/utils/index'
  },
  devtool: 'none',
  mode: 'production',// 告诉webpack使用production模式的内置优化,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    library: 'antd-component',
    libraryTarget: 'umd',
    sourceMapFilename: '[file].map', // string
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.tsx', '.ts', '.js', '.less']
  },
  module: {
    rules: [{
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
        limit: 8192
      }
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }, {
      test: /\.scss$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
    },

    // {
    //   test: /\.less$/,
    //   use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
    // }
    {
      test: /\.less$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: (resourcePath, context) =>
              `${path.relative(path.dirname(resourcePath), context)}/`,
          },
        },
        {
          loader: 'css-loader', // translates CSS into CommonJS
        },
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              javascriptEnabled: true,
            },
          },
        },
      ],
    },
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    //new MiniCssExtractPlugin({ filename: './index.css' }),// 文件目录会放入output.path里
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  // externals: { // 从输出的bundle中排除依赖
  //   react: { commonjs: 'react', commonjs2: 'react', amd: 'react', },
  //   antd: { commonjs: 'antd', commonjs2: 'antd', amd: 'antd', },
  //   moment: { commonjs: 'moment', commonjs2: 'moment', amd: 'moment', },
  // }
  externals: [
    {
      react: 'React',
      'react-dom': 'ReactDOM',
      antd: 'antd',
      moment: 'moment',
    },
  ],
}