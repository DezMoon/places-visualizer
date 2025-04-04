const webpack = require('webpack');
const { override, addWebpackPlugin } = require('customize-cra');

module.exports = override(
    addWebpackPlugin(
        new webpack.ProvidePlugin({
            process: 'process/browser', // Add process polyfill
            Buffer: ['buffer', 'Buffer'],
        })
    ),
    (config) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            "path": require.resolve("path-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "buffer": require.resolve("buffer/"),
        };

        // Add process polyfill
        config.plugins = [
            ...config.plugins,
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
                process: 'process/browser',
            }),
        ];

        config.ignoreWarnings = [/Failed to parse source map/];
        return config;
    }
);