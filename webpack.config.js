var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "./src/app.js",
    output: {
        path: "/Users/praveen/Projects/PRJ_WBPCK/dist",
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
                    fallBackLoader: "style-loader",
                    use: ["css-loader","sass-loader"],
                    publicPath: "/Users/praveen/Projects/PRJ_WBPCK/dist"
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
            filename: "app.css",
            disabled: false,
            allChunks: true
        })
    ]
}