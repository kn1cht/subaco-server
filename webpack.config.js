const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyEsPlugin = require('uglify-es-webpack-plugin');
const webpack = require('webpack');

const app = {
  entry  : { main : './views/main.js'} ,
  output : {
    path         : `${__dirname}/public/javascripts`,
    filename     : 'bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath   : `javascripts/`
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
    new webpack.optimize.CommonsChunkPlugin({ name : 'main', filename : 'common.js' }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new UglifyEsPlugin({ output : { comments : require('uglify-save-license') } }),
    new webpack.ProvidePlugin({
      $               : 'jquery',
      jQuery          : 'jquery',
      'window.jQuery' : 'jquery',
      Popper          : ['popper.js', 'default'],
    })
  ],
  resolve : {
    alias : {
      bootstrap : 'bootstrap/dist/js/bootstrap.min.js',
      jquery    : 'jquery/dist/jquery.min.js',
      vue       : 'vue/dist/vue.min.js'
    }
  }
};

const bootstrap = {
  entry : [
    `${__dirname}/node_modules/bootstrap/dist/css/bootstrap.min.css`,
    `${__dirname}/node_modules//font-awesome/css/font-awesome.min.css`,
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