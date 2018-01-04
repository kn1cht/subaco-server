module.exports = {
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
  resolve : {
    alias : {
      vue : 'vue/dist/vue.common.js'
    }
  }
};