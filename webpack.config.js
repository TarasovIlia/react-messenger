const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpakPlaugin = require('copy-webpack-plugin')

const srcPath = path.resolve(__dirname, './src/')
const prodPath = path.resolve(__dirname, './prod/')

const isDev = process.env.NODE_ENV === 'development'
const filename = ext => isDev ? `[name].${ext}` : `[name][hash].${ext}`

module.exports = {
    entry:['@babel/polyfill', path.resolve(srcPath, 'index.js')],
    output: {
        filename: filename('js'),
        path: prodPath
    },
    stats: {
        children: false,
        modules: false,
        errors: true,
        errorDetails: true,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: path.resolve(srcPath, 'index.html'),
        }),
        new CopyWebpakPlaugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public/favicon.ico'),
                    to: path.resolve(__dirname, 'prod')
                }
            ]
        }),

    ],
    resolve: {
        extensions: ["*", ".js", ".jsx"] ,
    },
    devServer: {
        disableHostCheck: true,
        historyApiFallback:{
            compress: true,
            public: "https://front-test1.herokuapp.com/",
            rewrites: [
                { from: /favicon.ico/, to: 'public/favicon.ico'}
            ]
        },
        static: {
            directory: srcPath
        },
        port: process.env.PORT || 4000,
        hot: true
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader', 
                    'css-loader', 
                    {
                        loader: 'sass-loader',
                        options: {
                            additionalData: '@import "variables";',
                            sassOptions: {
                                includePaths: [path.resolve(__dirname, "src/styles.scss")],
                              },
                        }
                    }
                ]
            },
            {
                test: /\.ttf$/,
                exclude: /node_modules/,
                use: ['url-loader']
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
        ]
    }
} 