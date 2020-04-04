const WorkboxPlugin = require('workbox-webpack-plugin');

const { commonPlugins, commonRules } = require('./webpack.common')

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    output: {
        library: 'nlpApp',
        libraryTarget: 'var'
    },
    module: {
        rules: [
            ...commonRules
        ]
    },
    plugins: [
        ...commonPlugins,
        new WorkboxPlugin.GenerateSW(),
    ]
}
