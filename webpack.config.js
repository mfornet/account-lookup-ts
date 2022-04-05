const webpack = require('webpack');

module.exports = {
    configure: {
        resolve: {
            extensions: ['.ts', '.js'],
            fallback: {
                buffer: require.resolve('buffer'),
                stream: require.resolve("stream-browserify"),
            },
            alias: {
                process: "process/browser"
            }
        },
    },
    plugins: {
        add: [
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
            }),
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
        ],
    },
};
