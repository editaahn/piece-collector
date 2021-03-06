const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const src = path.resolve('src');
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    publicPath: "/",
    path: path.resolve("./dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: "url-loader",
        options: {
          name: "[name].[ext]?[hash]",
          limit: 10000, // 10kb 미만은 url 로더가 처리
        },
      },
      {
        test: /[^index]\.html/, // index가 아닌 html 에 대해서만 추출함 (ex.새창 띄워야 하는 youtubePlayback의 경우)
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
        ],
      },
      ...(process.env.NODE_ENV === "production"
        ? [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: "babel-loader",
            },
          ]
        : []),
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `Build Time: ${new Date().toLocaleString()}`,
    }),
    new HtmlWebpackPlugin({ // 유튜브 deep link html 생성
      template: "./src/views/pages/youtubePlayback.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      templateParameters: {
        env: process.env.NODE_ENV === "development" ? "(개발용)" : "",
      },
      favicon: "./src/favicon.ico",
    }),
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === "production"
      ? [
          new MiniCssExtractPlugin({
            filename: "[name].css",
          }),
        ]
      : []),
  ],
};
