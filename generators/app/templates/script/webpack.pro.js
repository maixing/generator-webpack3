/**
 * Created by maixing on 2017/6/12.
 */
let path = require('path');
let webpack = require('webpack');
let merge = require('webpack-merge');
let webpackConfig = require('./webpack.config.js');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
require("babel-polyfill");//兼容ie9,10配置
module.exports = merge(webpackConfig, {
    devtool: 'false',
    entry: {
        app: ['babel-polyfill', path.resolve(__dirname, '../src/index.js')]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config:{
                                    path:  path.resolve(__dirname, './postcss.config.js')
                                }
                            }
                        }
                    ]
                })
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config:{
                                    path:  path.resolve(__dirname, './postcss.config.js')
                                }
                            }
                        },
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config:{
                                    path:  path.resolve(__dirname, './postcss.config.js')
                                }
                            }
                        },
                        'less-loader'
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: true,
        }),
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'static',
        // }),
        new webpack.optimize.AggressiveMergingPlugin(), // Merge chunks
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
        new HtmlWebpackPlugin({
            title: 'ultra-react-webpack2-study',
            template: path.resolve(__dirname, '../src/index.html'),
            inject: false,
            favicon:path.resolve(__dirname, '../src/favicon.ico')
            // minify: {
            //     html5: true,
            //     collapseWhitespace: true,
            //     removeComments: true,
            //     removeTagWhitespace: true,
            //     removeEmptyAttributes: true,
            //     removeStyleLinkTypeAttributes: true,
            // },
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "commons",
        //     filename: "commons.js",
        // })
    ],
});