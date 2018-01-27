const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

// Make sure the TARGET environment variable is set appropriately
if (!process.env.TARGET)
{
    throw Error('No TARGET environment variable set: please specify either "chrome" or "firefox"');
}
if (!(process.env.TARGET === 'chrome' || process.env.TARGET === 'firefox'))
{
    throw Error('Invalid TARGET: please specify either "chrome" or "firefox"');
}

// Print a log message
console.info(`Build target: "${process.env.TARGET}"`);

// Base configuration for copy-webpack-plugin
let copyWebpackConfig = [
    // Copy the appropriate plugin manifest
    {
        from: `./manifest.${process.env.TARGET}.json`,
        to: './manifest.json',
    },
    // Copy the images folder
    {
        from: './images',
        to: './images'
    },
]

// If we're building for Chrome, include the WebExtensions polyfill
if (process.env.TARGET === 'chrome')
{
    copyWebpackConfig.push({
        from: '../node_modules/webextension-polyfill/dist/browser-polyfill.js',
        to: './vendor/',
    });
}

module.exports =
{
    // Set the source code path
    context: path.resolve(__dirname, 'src'),
    
    // Enable source maps
    devtool: "source-map",

    entry:
    {
        // The background script
        background: './background.js',
        // The page action script
        launch: './launch.js'
    },

    output:
    {
        // Set the bundle output path
        path: path.resolve(__dirname, "obj", process.env.TARGET),

        // Name bundle files after their entry points
        filename: "[name].js",
    },

    resolve:
    {
        // Allow us to import node modules
        modules: [path.resolve(__dirname, "node_modules")],
    },

    plugins:
    [
        // Copy static files into the output directory
        new CopyWebpackPlugin(copyWebpackConfig),
    ],
};
