/**
 * Created by maixing on 2017/6/12.
 */
let path = require('path');
let webpack = require('webpack');
require("babel-polyfill");//兼容ie9,10配置
module.exports = {
    entry: {},
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/,
                use: [{
                    loader: 'file-loader?name=images/img_[hash:8].[ext]' // creates style nodes from JS strings
                }, {
                    loader: 'image-webpack-loader' // translates CSS into CommonJS
                }]
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: [{
                    loader: 'file-loader?name=fonts/[name].[ext]' // creates style nodes from JS strings
                }]
            }
        ]
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
    ],
};