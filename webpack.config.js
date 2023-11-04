const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js", //打包好的js名称
    path: path.resolve(__dirname, "./dist"),
    library: "TEST", // 为你的库指定一个全局变量名
    libraryTarget: "umd", // 将你的库以 UMD 格式导出
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },

      {
        // 加载 CSS
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      //加载图像
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".jsx"],
  },
  mode: "production",
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
  ],
};
