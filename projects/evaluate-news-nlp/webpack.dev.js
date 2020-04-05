const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { EnvironmentPlugin } = require('webpack')
const { commonPlugins, commonRules } = require('./webpack.common')

module.exports = {
    entry: ['regenerator-runtime/runtime', './src/client/index.js'],
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    module: {
        rules: [
            ...commonRules
        ]
    },
    output: {
        library: 'nlpApp',
        libraryTarget: 'var'
    },
    plugins: [
        ...commonPlugins,
        new EnvironmentPlugin({
            NODE_ENV: 'development'
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
    ],
    devServer: {
        proxy: {
            '/api': 'http://localhost:8081'
        }
    }
}
