const path = require('path');

const webpackConfig = {
  devtool: 'source-map',

  entry: {
    // 'js/admin': path.resolve(__dirname, 'app/admin.js'),
    'js/shortcode': path.resolve(__dirname, 'app/shortcode.js'),
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'assets'),
  },

  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: /(node_modules)/,
        loader  : 'url-loader?limit=30000'
      }
    ],
  },
};

if (process.env.NODE_ENV === 'production') {
  webpackConfig.devtool = 'cheap-source-map';
}

module.exports = webpackConfig;
