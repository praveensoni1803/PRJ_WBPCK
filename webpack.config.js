var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/app.js",
    output: {
        path: "/Users/praveen/Projects/PRJ_WBPCK/dist",
        filename: "app.min.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Generated title",
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            template: "./src/index.ejs"
        })
    ]
}