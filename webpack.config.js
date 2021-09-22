const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { rule } = require('postcss')

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

    ],
    resolve: {
        extensions: ["*", ".js", ".jsx"] ,
    },
    devServer: {
        historyApiFallback: true,
        static: {
            directory: srcPath
        },
        port: 4000,
        hot: isDev
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