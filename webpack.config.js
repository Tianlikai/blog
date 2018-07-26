const path = require('path')
const webpack = require('webpack')
const WebpackMd5Hash = require('webpack-md5-hash')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const internalIp = require('internal-ip')

const config = {
    host: internalIp.v4.sync(),
    port: 8080,
    protocol: 'http'
}

const dev = true
const rootDir = path.resolve(__dirname)
const entry = path.join(rootDir, 'src')

let wp = {
    mode: dev ? 'development' : 'production',

    performance: {
        hints: dev ? false : 'warning'
    },

    devtool: dev ? 'cheap-module-eval-source-map' : 'hidden-source-map',

    entry: dev ? [
        'react-hot-loader/patch',
        'webpack-dev-server/client',
        //   'webpack-dev-server/client' + '?' + config.protocol + '://' + config.host + ':' + config.port + '/', // 资源服务器地址
        'webpack/hot/only-dev-server',
        path.join(entry, 'index.js')
    ] : ['babel-polyfill', path.join(entry, 'index.js')],

    output: {
        path: path.resolve(rootDir, 'dist'),
        publicPath: '/',
        filename: dev ? '[name].js' : '[name]-[chunkhash:8].js',
        chunkFilename: '[name]-[chunkhash:8].js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'postcss-loader'
                ]
                // use: ExtractTextPlugin.extract({
                //     fallback: 'style-loader',
                //     use: ['css-loader', 'postcss-loader']
                // })
            },
            {
                test: /\.s(a|c)ss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: { importLoaders: 1 }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
                // use: ExtractTextPlugin.extract({
                //     fallback: 'style-loader',
                //     use: [
                //             'css-loader',
                //             'sass-loader',
                //             'postcss-loader'
                //     ]
                // })
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        runtimeChunk: true,

        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            DEBUG: dev
        }),
        new HtmlWebpackPlugin({
            title: 'my blog',
            template: path.resolve(entry, 'index.ejs'),
            inject: false
        })
    ],
    devServer: {
        publicPath: '/',
        contentBase: path.resolve(rootDir, 'dist'),
        compress: true,
        historyApiFallback: true,
        hot: true,
        https: false,
        port: config.port,
        host: config.host,
        clientLogLevel: 'none',
        open: true,
        stats: {color: true},
        proxy: {
            '/api/*': {
                changeOrigin: true,
                secure: false,
                target: 'http://127.0.0.1:3000', // 随便写，但必须有
                router: function(req) {
                    let path = req.originalUrl
                    let rePrefix = /^\/api\/(\d+)?/
                    path = '/' + path.replace(rePrefix, '')
                    let target = 'http://127.0.0.1:3000'
                    console.log(`proxy: ${target}${path}`)
                    return target + path
                },
                pathRewrite: function() {
                    return ''
                }
            }
        }
    }
}

if (dev) {
    wp.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    )
}

module.exports = wp

/**
 * 待开发
 * 开发环境代理 api
 * 分离公共库
 * 生产环境分离样式
 */
