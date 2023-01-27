const path = require("path");  // для получения абсолютного пути
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtarctPlugin = require("mini-css-extract-plugin");

module.exports = {
  // точка входа для сборщика
  entry: {
    main: "./src/pages/index.js",
  },

  // точка выхода
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },


  mode: "development",

  // локальный сервер, настройки
  devServer: {
    static: path.resolve(__dirname, "dist"),
    open: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtarctPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,   // изменение порядка запуска
            }
          },
          'postcss-loader'
        ],
      },
      // изображения
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        type: 'asset/resource',  // перенести исходные файлы в конечную сборку в том же формате
        generator: {
          filename: "images/[name].[hash][ext]"
        }
      },
      {
        test: /\.(ttf|woff|woff2|otf|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: "fonts/[name][hash][ext]"
        }
      }
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtarctPlugin(),
  ],
};
