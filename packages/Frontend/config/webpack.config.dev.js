require('dotenv').config();
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const template = require('html-webpack-template');

const outputPath = path.resolve(__dirname, '..', 'dist');
module.exports = {
  mode: 'development',
  entry: ['react-hot-loader/patch', './src/index.jsx'],
  plugins: [
    new HtmlWebpackPlugin({
      appMountId: 'app',
      inject: false,
      links: ['https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css'],
      mobile: true,
      template,
      title: 'Dashboard',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.FB_API_KEY': JSON.stringify(process.env.FB_API_KEY),
      'process.env.FB_AUTH_DOMAIN': JSON.stringify(process.env.FB_AUTH_DOMAIN),
      'process.env.FB_DATABASE_URL': JSON.stringify(process.env.FB_DATABASE_URL),
      'process.env.FB_PROJECT_ID': JSON.stringify(process.env.FB_PROJECT_ID),
      'process.env.FB_STORAGE_BUCKET': JSON.stringify(process.env.FB_STORAGE_BUCKET),
      'process.env.FB_MESSAGING_SENDER_ID': JSON.stringify(process.env.FB_MESSAGING_SENDER_ID),
    }),
  ],
  output: {
    path: outputPath,
    filename: 'bundle.js',
    publicPath: '/',
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    hot: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
