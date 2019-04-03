const path = require('path');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'canvas-board.min.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 50000,
                            name: 'dist/img/[name]_[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'dist/fonts/[name]_[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            hash: true,
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'canvas-board.min.css'
        }),
        new cleanWebpackPlugin()
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                exclude: /\.min\.js$/,
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    devServer: {
        host: 'localhost',
        port: 3009, // 端口
        progress: true,
        open: true,
        compress: true,
        contentBase: path.resolve(__dirname, 'dist') // 服务器当前执行目录
    }
};