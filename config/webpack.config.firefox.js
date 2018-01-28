const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports =
{
    // Set the source code path
    context: path.resolve(__dirname, "../src"),

    entry:
    {
        background: './background.js',
        bbviewer: './bbviewer.js',
    },

    output:
    {
        // Set the bundle output path
        path: path.resolve(__dirname, "../build/firefox"),

        // Name bundle files after their entry points
        filename: "[name].js",
    },

    resolve:
    {
        // Allow us to import node modules
        modules: [path.resolve(__dirname, "../node_modules")],
    },

    plugins:
    [
        // Copy static files into the output directory
        new CopyWebpackPlugin(
        [
            // Copy the Firefox extension manifest
            {
                from: "../config/manifest.firefox.json",
                to: "./manifest.json",
            },

            // Copy the icons
            {
                from: { glob:"../images/icon-*.png" },
                to: "./images",
            },

            // Copy static files
            {
                from: "./static",
                to: "./",
            },
        ]),

        // Uglify it
        new UglifyJsPlugin(),
    ],
};
