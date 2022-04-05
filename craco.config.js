const webpack = require('webpack');

module.exports = {
    style: {
        // https://stackoverflow.com/questions/70403417/typeerror-match-loader-options-plugins-is-not-a-function
        postcssOptions: {
            plugins: [require("tailwindcss"), require("autoprefixer")],
        },
    },
    // https://github.com/WalletConnect/walletconnect-monorepo/issues/748#issuecomment-1032952692

    configure: {
        resolve: {
            fallback: {
                buffer: require.resolve('buffer'),
            },
        },
    },
    plugins: {
        add: [
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
            }),
        ],
    },
};
