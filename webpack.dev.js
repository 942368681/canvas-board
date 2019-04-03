const baseConfig = require('./webpack.base.js');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = merge(baseConfig, {
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'canvas-board.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            hash: true,
            filename: 'index.html'
        }),
    ],
    devServer: {
        host: 'localhost',
        port: 3009,
        progress: true,
        open: true,
        compress: true,
        contentBase: path.resolve(__dirname, 'dist')
    },
    mode: 'development'
});