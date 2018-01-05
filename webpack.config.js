const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const app = {
  entry  : './views/main.js',
  output : {
    path     : `${__dirname}/public/javascripts`,
    filename : 'bundle.js'
  },
  module : {
    rules : [
      {
        test   : /\.vue$/,
        loader : 'vue-loader'
      }
    ]
  },
  plugins : [
    new webpack.ProvidePlugin({
      $               : 'jquery',
      jQuery          : 'jquery',
      'window.jQuery' : 'jquery',
      Popper          : ['popper.js', 'default'],
    })
  ],
  resolve : {
    alias : {
      vue : 'vue/dist/vue.common.js'
    }
  }
};

const bootstrap = {
  entry : [
    `${__dirname}/node_modules/bootstrap/dist/css/bootstrap.min.css`,
    `${__dirname}/node_modules//font-awesome/css/font-awesome.css`,
  ],
  output : {
    path     : `${__dirname}/public/stylesheets`,
    filename : 'bundle.css'
  },
  module : {
    loaders : [
      {
        test   : /\.css$/,
        loader : ExtractTextPlugin.extract('css-loader')
      },
      {
        test   : /\.(woff|woff2|eot|ttf|svg)$/,
        loader : 'file-loader?name=../fonts/[name].[ext]'
      }
    ]
  },
  plugins : [
    new ExtractTextPlugin('../stylesheets/bundle.css')
  ]
};

module.exports = [app, bootstrap];