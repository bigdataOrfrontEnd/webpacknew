const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container; // 还可以这样
// webpack 插件配置
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "inline-source-map",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: "./dist",
    hot: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.tsx?$/,
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
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "dashboard", // exposeRemoteName 共享的模块名字，在消费该模块的应用中会用到 不能使用 -
      filename: "remoteEntry.js", // 远程加载的文件名字，在浏览器请求面板可看到，默认名字就是 remoteEntry.js
      exposes: {
        "./DashboardApp": "./src/bootstrap", // 从本应用暴露的共享模块,可共享多个模块 key 以 ./ 开头，value 指向本地的一个文件
      },
      shared: packageJson.dependencies, // 希望共享的依赖
    }),
  ],
};
