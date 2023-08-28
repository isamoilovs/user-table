const HtmlWebPackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const path = require('path')

const htmlPlugin = new HtmlWebPackPlugin({
  template: './public/index.html',
  filename: './index.html'
})
module.exports = {
  mode: 'development',
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    htmlPlugin,
    new ModuleFederationPlugin({
      name: 'microapp',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/Button'
      },
      shared: {
        react: { singleton: true, eager: true },
        'react-dom': { singleton: true, eager: true }
      }
    })
  ]
}
