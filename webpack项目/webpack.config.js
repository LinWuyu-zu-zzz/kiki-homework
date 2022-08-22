const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin') // 引入自动生成 html 的插件
const { VueLoaderPlugin } = require('vue-loader')

//MiniCssExtractPlugin迷你css提取插件: 是用来配置contenthash后抽取css实现持久化缓存css的
//(即只有js改变,css的hash不会连带改变,用户就不需要再请求相同内容的css,使用本地缓存即可，提高体验感）
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'production', //去掉终端里的警告提示
    entry: "./src/main.js", // 入口
    output: {
        path: path.join(__dirname, "bundle"), // 出口路径
        filename: "bundle.js", // 出口文件名
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({ //引用这对象: 自动生成的html打开的时候,看不到html结构了,所以需要添加
            template: './public/index.html',
            // filename: 'index.html' 可以不要
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css', //单独一个文件夹
            // chunkFilename: "[id].css"
        })
    ],
    devServer: {
        port: 3000, // 改端口号
        open: true //运行yarn serve时自动打开谷歌浏览器
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: './'
                    }
                }, 'css-loader']
            },
            {
                test: /\.less$/, //从右往左执行,先处理less
                use: ["style-loader", "css-loader", "less-loader"]
            }, {
                test: /\.png|jpg|gif|jepg$/,
                type: 'asset/resource'
            }, {
                test: /\.vue$/,
                loader: 'vue-loader'
            }]
    }
}