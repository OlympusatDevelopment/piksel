const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const env = process.argv[process.argv.length - 1];

const htmlWebpackPlugin =  new HtmlWebpackPlugin({
  template: path.join(__dirname, "examples/src/index.html"),
  filename: "./index.html"
});

module.exports = {
  watch: true,
  performance: { hints: false },
  entry: env === "development" ? path.join(__dirname, "examples/src/index.js") : './src/index.js',
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'piksel.js',
    library: 'piksel',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  },
  devServer: {
    // contentBase: path.join(__dirname, './lib'),
    watchContentBase: true,
    port: 9000
  },
  plugins: env === "development" ? [
    htmlWebpackPlugin
  ] : undefined
};