const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

const isProduction = process.env.NODE_ENV === `production`;

module.exports = {
    mode: isProduction ? `production` : `development`,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: `babel-loader`,
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "resources/index.html",
            title: "Phaser"
        }),
        new BrowserSyncPlugin({
            host: "localhost",
            port: 3000,
            server: { baseDir: ["dist"] }
        }),
        new webpack.DefinePlugin({
            CANVAS_RENDERER: JSON.stringify(true),
            WEBGL_RENDERER: JSON.stringify(true)
        })
    ]
};
