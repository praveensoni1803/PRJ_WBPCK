const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.min.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader","css-loader"]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader","sass-loader"],
                    publicPath: path.resolve(__dirname, "dist")
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Generated title",
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            template: "./src/index.ejs"
        }),
        new ExtractTextPlugin({
            filename: "app.min.css",
            disable: false,
            allChunks: true
        })
    ]
}