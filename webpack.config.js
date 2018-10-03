const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'src');
const dirAssets = path.join(__dirname, 'public');

/**
 * Webpack Configuration
 */
module.exports = {
    entry: {
        vendor: [
            'lodash'
        ],
        bundle: [
            path.join(dirApp, 'index.js'),
            path.join(dirApp, 'index.css')
        ]
    },
    resolve: {
        modules: [
            dirNode,
            dirApp,
            dirAssets
        ],
        alias: {
            '~': `${dirApp}`,
            'Assets': `${dirApp}/assets`,
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: IS_DEV
        }),
        new CopyWebpackPlugin([
            { from: path.join(dirApp, 'assets'), to: path.join(dirAssets, 'assets') }
        ], {}),
        new ExtractTextPlugin({
            filename: "css/[name].css"
        })
    ],
    module: {
        rules: [
            // BABEL
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                options: {
                    compact: true
                }
            },

            // CSS / SASS
            {
                test: /\.(scss|sass|css)$/i,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {importLoaders: 1, url: true},
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: __dirname + '/postcss.config.js'
                                }
                            },
                        },
                    ]
                })
            },
            // IMAGES
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: 'file-loader',
                options: {
                    context: path.resolve(__dirname, 'src/assets/images'),
                    name: '/assets/images/[path][name].[ext]?[hash]',
                    publicPath: function (url) {
                        return url.replace(/src/, '');
                    },
                }
            },

            //FONTS
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: "file-loader",
                options: {
                    context: path.resolve(__dirname, 'src/assets/fonts'),
                    name: '/assets/fonts/[path][name].[ext]?[hash]',
                    publicPath: function (url) {
                        return url.replace(/src/, '');
                    },

                }
            }


        ]
    }
};