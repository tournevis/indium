var path = require('path');
var root = path.resolve(__dirname);

module.exports = {
  entry:{
    app:['./scripts/main.js']
  },
  output:{
    path : path.resolve(__dirname),
    filename: 'renderer.js'
  },
  module:{
    loaders:[
      {
        test:/\.js$/,
        loader: 'babel',
        exclude: /(node_modules)/,
        include: root,
      },
      {
        test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)$/,
        loader:'url',
        query:{
          limit:10000
        }
      }
    ]
  }
}
