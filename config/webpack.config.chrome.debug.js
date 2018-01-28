const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports =
{
    // Set the source code path
    context: path.resolve(__dirname, "../src"),

    // Enable sourcemaps
    devtool: "source-map",

    entry:
    {
        background: "./background.js",
        bbviewer: './bbviewer.js',
    },

    output:
    {
        // Set the bundle output path
        path: path.resolve(__dirname, "../debug/chrome"),

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
            // Copy the Chrome extension manifest
            {
                from: "../config/manifest.chrome.json",
                to: "./manifest.json",
            },

            // Copy the icons
            {
                from: { glob:"../images/icon-*.png" },
                to: "./images",
            },

            // Copy the WebExtensions polyfill
            {
                from: "../node_modules/webextension-polyfill/dist/browser-polyfill.js",
                to: "./vendor/",
            },

            // Copy static files
            {
                from: "./static",
                to: "./",
            },
        ]),
    ],
};
