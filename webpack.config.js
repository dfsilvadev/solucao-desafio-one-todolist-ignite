const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { dirname } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefrashWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const path = require("path");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  devtool: isDevelopment ? "eval-source-map" : "source-map",
  mode: isDevelopment ? "development" : "production",
  entry: [path.join(__dirname, "src", "index")],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    open: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    hot: true,
  },
  plugins: [
    isDevelopment && new ReactRefrashWebpackPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        include: /src/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              isDevelopment && require.resolve("react-refresh/babel"),
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.(css|scss|sass)$/i,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(jpg|png|svg)$/,
        exclude: /node_modules/,
        include: /src/,
        loader: "file-loader",
        options: {
          name: "[path][name].[hash].[ext]",
        },
      },
    ],
  },
};
