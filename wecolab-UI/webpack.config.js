const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
var webpackConfig = {
    entry: {
        main: './src/main.ts'
    }, resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'src', 'dist'),
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: ['ts-loader', 'angular2-template-loader']
        },
        {
            test: /\.html$/,
            use: {
                loader: 'html-loader',
                options: {
                    attrs: [':data-src']
                }
            }
        },
        {
            test: /\.css$/,
            use: [
                'to-string-loader', 'css-loader',
            ],
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
                {
                    loader: 'file-loader',
                },
            ],
        },
        ]
    },
    // devServer: {
    //   writeToDisk: true
    // },
};
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: './src/index.html',
});
webpackConfig.plugins = [
    htmlWebpackPlugin,
];
module.exports = webpackConfig;
