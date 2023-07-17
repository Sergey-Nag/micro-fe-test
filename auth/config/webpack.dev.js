const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const dependencies = require('../package.json').dependencies;

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8082/',
    },
    devServer: {
        port: 8082,
        historyApiFallback: { // or historyApiFallback: true
            index: '/index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'auth',
            filename: 'remoteEntry.js',
            exposes: {
                './AuthApp': './src/bootstrap',
            },
            shared: dependencies,
        }),
    ]
};

module.exports = merge(commonConfig, devConfig);
