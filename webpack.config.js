require("dotenv").config({path: "../../.env"});
const webpack = require("webpack");
const path = require("path");

// constiables
const isProduction =
    process.argv.indexOf("-p") >= 0 || process.env.NODE_ENV === "production";
const sourcePath = path.join(__dirname, "./src");
const outPath = path.join(__dirname, "../../public/dist/");

// plugins
const WebpackLaravelMixManifest = require("webpack-laravel-mix-manifest/src/main.js");
const mixManifestTransform = require("webpack-laravel-mix-manifest/src/transform");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackCleanupPlugin = require("webpack-cleanup-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const WebpackNotifierPlugin = require("webpack-notifier");


module.exports = {
    mode: isProduction ? "production" : "development",
    target: "web",
    context: sourcePath,
    node: {
        __dirname: true,
    },
    entry: {
        app: ["./main.tsx"],
    },
    output: {
        path: outPath,
        filename: isProduction ? "[name].prod.[contenthash].js" : "[name].js",
        chunkFilename: isProduction ? "[name].prod.[contenthash].js" : "[name].js",
    },
    resolve: {
        extensions: [
            ".js",
            ".ts",
            ".tsx",
        ],
        // Fix webpack"s default behavior to not load packages with jsnext:main module
        // (jsnext:main directs not usually distributable es6 format, but es6 sources)
        alias: {
            src: path.resolve(__dirname, "src"),
        },
        plugins: [new TsconfigPathsPlugin()],
    },
    module: {
        rules: [
            // .ts, .tsx
            {
                test: /\.tsx?$/,
                include: [path.resolve(__dirname, "src")],
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true,
                        },
                    },
                    {loader: "tslint-loader"},
                    {loader: "eslint-loader"},
                ],
            },
            // css
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            sourceMap: !isProduction,
                            camelCase: true,
                            localIdentName: !isProduction ? "[local]__[hash:base64:5]" : "[hash:base64:5]",
                        },
                    },
                ],
            },
            //scss
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            data: `@import "src/style/_variables.scss"; @import "src/style/_mixins.scss";`,
                        },
                    },
                ],
            },
            {test: /\.json$/, loader: "json-loader"},
            {test: /\.(jpg|png)$/, loader: "url-loader?limit=8000"},
            {test: /\.(woff|woff2|eot|ttf)$/, loader: "url-loader?limit=100000"},
            {
                test: /\.svg$/,
                use: [
                    "babel-loader",
                    {
                        loader: "react-svg-loader",
                        options: {
                            svgo: {
                                plugins: [
                                    {removeDoctype: true},
                                    {removeComments: true},
                                    {mergePaths: false},
                                    {removeViewBox: false},
                                ],
                            },
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new WebpackLaravelMixManifest(
            {
                filename: "../mix-manifest.json",
                transform(assets) {
                    let result = JSON.parse(mixManifestTransform(assets));

                    result = Object.keys(result).reduce((acc, key) => {
                        acc[key] = (`/dist/${result[key]}`)
                            .split("//")
                            .join("/");

                        return acc;
                    }, {});

                    return JSON.stringify(result);
                },
            },),
        new webpack.EnvironmentPlugin({
            NODE_ENV: "development", // use "development" unless process.env.NODE_ENV is defined
            DEBUG: true,
        }),
        new MiniCssExtractPlugin({
            filename: !isProduction ? "[name].css" : "[name].[hash].css",
            chunkFilename: !isProduction ? "[id].css" : "[id].[hash].css",
        }),
        new WebpackCleanupPlugin({
            preview: true,
        }),
        new webpack.HashedModuleIdsPlugin(),
        // new CompressionPlugin()
        ...(!isProduction ? [new WebpackNotifierPlugin({alwaysNotify: true})] : []),
    ],

    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 6,
            maxInitialRequests: 4,
            automaticNameDelimiter: '~',
            automaticNameMaxLength: 30,
            cacheGroups: {
                default: false,
                commons: {
                    test: / [\\ /] node_modules [\\ /] /,
                    name: 'vendor_app',
                    chunks: 'all',
                    minChunks: 2
                },
            },
        },
        runtimeChunk: false,
    },
    stats: {
        colors: false,
        hash: true,
        timings: true,
        assets: true,
        chunks: true,
        chunkModules: true,
        modules: true,
        children: true,
    },
    devtool: isProduction && process.env.APP_URL === "https://qwinex.io/" ? "cheap-source-map" : "eval-source-map",
    watchOptions: {
        aggregateTimeout: 1000,
        poll: 1000,
    },
};
