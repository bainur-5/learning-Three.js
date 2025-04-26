const path = require('path');
const { merge } = require('webpack-merge');
const commonConfiguration = require('./webpack.common.js');
const ip = require('ip');

const infoColor = (message) =>
    `\u001b[1m\u001b[34m${message}\u001b[39m\u001b[22m`;

module.exports = merge(commonConfiguration, {
    stats: 'errors-warnings',
    mode: 'development',

    infrastructureLogging: {
        level: 'warn',
    },

    devServer: {
        host: 'localhost',
        port: 3000,
        open: true,
        allowedHosts: 'all',
        hot: true,
        watchFiles: ['src/**', 'static/**'],

        // ✅ Обновлённый способ задать http/https
        server: {
            type: 'http', // или 'https' при необходимости
        },

        static: {
            watch: true,
            directory: path.join(__dirname, '../static'),
        },

        client: {
            logging: 'none',
            overlay: true,
            progress: false,
        },

        // ✅ Новый формат функции setupMiddlewares
        setupMiddlewares: (middlewares, devServer) => {
            const port = devServer.options.port;
            const isHttps = devServer.options.server?.type === 'https';
            const protocol = isHttps ? 'https' : 'http';
            const localIp = ip.address();

            const domain1 = `${protocol}://${localIp}:${port}`;
            const domain2 = `${protocol}://localhost:${port}`;

            console.log(
                `Проект запущен на:\n  - ${infoColor(domain1)}\n  - ${infoColor(domain2)}`
            );

            return middlewares;
        },
    },
});
