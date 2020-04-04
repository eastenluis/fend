const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { commonPlugins, commonRules } = require('./webpack.common')

module.exports = {
    entry: './src/client/index.js',
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
