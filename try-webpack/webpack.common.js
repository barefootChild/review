const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    main: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.css|scss$/,
        use: [
          ExtractTextPlugin.loader,
          'css-loader', 'postcss-loader', 'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },
      {
        test: /\.(csv|tsv)$/,
        use: ['csv-loader']
      },
      {
        test: /\.xml$/,
        use: ['xml-loader']
      }
    ]
  },
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, 'src')
    ],
    extensions: ['.vue', '.js', '.json', '.jsx', '.css'],
    alias: {
      _sources: path.resolve(__dirname, './src/assets'),
      vue$: 'vue/dist/vue.js'
    }
  },
  context: __dirname,
  target: 'web',
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      _join: ['lodash', 'join']
    }),
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 3000,
      automaticNameDelimiter: '~',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 10
        },
        common: {
          minChunks: 2,
          name: 'common',
          chunks: 'all',
          priority: 5
        }
      }
    }
  }
}