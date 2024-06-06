const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./src/app.js",
    output: {
        filename: "app.min.js",
        path: path.resolve(__dirname, "dist"),
    },
    watch: false,
    mode: "development",
    devtool: "source-map",
    // devServer: {
    //     static: {
    //       directory: path.join(__dirname, 'public'),
    //     },
    //     compress: true,
    //     port: 9000,
    //     headers: {
    //       "Access-Control-Allow-Origin": "*",
    //       "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    //       "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    //     }
    //   },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",

                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html',
        }),
        new CopyWebpackPlugin({
          patterns: [
            { from: 'src/firebase-messaging-sw.js', to: '' },
            { from: 'src/server.js', to: '' }
          ],
        }),
       ],
    
}