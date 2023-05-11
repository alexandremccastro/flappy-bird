const { Configuration } = require("webpack");

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

/**
 * @type {Configuration}
 */
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
  module: {
    rules: [{ test: /\.css$/i, use: ["style-loader", "css-loader"] }],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new CopyPlugin({
      patterns: [{ from: "./assets", to: "./assets", context: "./src" }],
    }),
  ],
  devServer: {
    port: 8001,
    static: {
      directory: "./public",
      watch: true,
    },
  },
};
