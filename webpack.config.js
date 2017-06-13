const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

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
        // stats: "errors-only",
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
        new ExtractTextPlugin({
            filename: "contact.min.css",
            disable: false,
            allChunks: true
        })
    ]
}