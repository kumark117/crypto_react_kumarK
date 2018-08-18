const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: "./src/index.js", //relative to root of the application
    output: {
     filename: "./src/app.bundle.js" //relative to root of the application
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
      { test: /\.html$/i, loader: 'html-loader' },
	{
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: '[name]-[local]-[hash:base64:5]'
                }
            }],
            exclude: /node_modules/
        }, {
            test: /\.jsx?$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react']
                }
            },
],
            exclude: /node_modules/
        }]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    devServer: {
        port: 8000
    }
}
