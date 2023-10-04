const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  entry: "./src/client/index.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist", "client"),
    // publicPath: path.resolve(__dirname, "dist", "client"),
  },
  module: {
    rules: [
      {
        test: /.(js|jsx|ts|tsx)$/,
        include: path.resolve(__dirname, "src", "client"),
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  devServer: {
    static: {
      publicPath: "/", // URL mapped to folder
      directory: path.resolve(__dirname, "dist", "client"), // Folder where index.html is
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        secure: false,
      },
      '/session': {
        target: 'http://localhost:3001',
        secure: false,
      },
    },
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'custom template',
      template: './src/client/index.html'
    })
  ]
};
