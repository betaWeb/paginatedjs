const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

module.exports = {
    mode: 'production',
    entry: "./index.js",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "paginate-js.min.js",
        libraryTarget: 'umd',
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: true,
                    ecma: 5,
                    mangle: false
                },
                sourceMap: true
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    }
};
