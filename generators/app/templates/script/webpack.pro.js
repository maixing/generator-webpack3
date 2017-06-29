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
                                plugins: function () {
                                    return [
                                        require('autoprefixer'),
                                        require('cssnano')
                                    ];
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
                                plugins: function () {
                                    return [
                                        require('autoprefixer'),
                                        require('cssnano')
                                    ];
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
                                plugins: function () {
                                    return [
                                        require('autoprefixer'),
                                        require('cssnano')
                                    ];
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
        new ExtractTextPlugin({
            filename: 'app.css',
            disable: false,
            allChunks: true
        }),
        new UglifyJsPlugin({
            beautify: false,
            comments: false,
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
            }
        }),
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
        new HtmlWebpackPlugin({
            title: 'ultra-react-webpack2-study',
            template: path.resolve(__dirname, '../src/index.html'),
            inject: false,
            minify: {
                html5: true,
                collapseWhitespace: true,
                removeComments: true,
                removeTagWhitespace: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
            },
        }),
        // new webpack.LoaderOptionsPlugin({
        //     options: {
        //         postcss: function(){
        //             return [
        //                 require("autoprefixer")({
        //                     browsers: ['ie>=8','>1% in CN']
        //                 }),
        //                 require('postcss-smart-import')({ /* ...options */ }),
        //                 require('precss')({ /* ...options */ }),
        //             ]
        //         }
        //     }
        // })
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "commons",
        //     filename: "commons.js",
        // })
    ],
});