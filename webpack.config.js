const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        index: "./src/index.js",
        contact : "./src/contact.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].min.js"
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
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        stats: "errors-only",
        //Hot Module Replacement(basically to apply CSS chanes without reloading the page), which I'm using in 'index page'
        hot: true,
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Home Page",
            // To minify the generated HTML
            // minify: {
            //     collapseWhitespace: true
            // },
            hash: true,
            chunks: ["index"],
            template: "./src/index.ejs"
        }),
        new HtmlWebpackPlugin({
            title: "Contact Page",
            hash: true,
            chunks: ["contact"],
            filename: "contact.html",
            template: "./src/contact.ejs"
        }),
        //The 'Hot Module Replacement' does not work out of the box with 'ExtractTextPlugin', which I'm using in 'contact page'
        new ExtractTextPlugin({
            filename: "contact.min.css",
            disable: false,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
}