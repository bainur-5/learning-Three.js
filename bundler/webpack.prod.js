// Импортируем merge для объединения конфигураций Webpack
const { merge } = require('webpack-merge');
// Подключаем общую (common) конфигурацию
const commonConfiguration = require('./webpack.common.js');
// Плагин для очистки папки сборки перед новым билдом
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(commonConfiguration, {
    // Указываем, что сборка будет в режиме "production"
    mode: 'production',

    // Подключаем плагины
    plugins: [
        // CleanWebpackPlugin автоматически удаляет содержимое папки сборки
        // (по умолчанию это папка dist) перед тем, как туда будут записаны
        // новые скомпилированные файлы
        new CleanWebpackPlugin(),
    ],
});
