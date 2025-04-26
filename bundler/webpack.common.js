const CopyWebpackPlugin = require('copy-webpack-plugin'); // Плагин для копирования файлов и папок
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Плагин для создания HTML-файла, автоматически добавляющего ссылки на бандлы
const MiniCSSExtractPlugin = require('mini-css-extract-plugin'); // Плагин для извлечения CSS в отдельные файлы
const path = require('path'); // Модуль для работы с путями

module.exports = {
    // Указываем точку входа — основной файл нашего приложения
    entry: path.resolve(__dirname, '../src/script.js'),

    // Настраиваем выходной файл
    output: {
        hashFunction: 'xxhash64', // Используем алгоритм хэширования xxhash64
        filename: 'bundle.[contenthash].js', // Имя файла с хэшем для предотвращения кеширования старых версий
        path: path.resolve(__dirname, '../dist') // Папка, куда будут складываться файлы сборки
    },

    // Генерируем source-map для удобства отладки
    devtool: 'source-map',

    plugins: [
        // Копируем статические файлы в выходную папку
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../static'), // Берем из папки static
                    noErrorOnMissing: true // Не выдавать ошибку, если папка отсутствует
                }
            ]
        }),

        // Создаем HTML-файл и автоматически добавляем в него ссылки на бандлы
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'), // Шаблон HTML
            minify: true // Минифицируем HTML
        }),

        // Извлекаем CSS в отдельные файлы
        new MiniCSSExtractPlugin()
    ],

    // Настраиваем обработку различных типов файлов
    module: {
        rules: [
            {
                test: /\.(html)$/, // Для всех .html файлов
                use: ['html-loader'] // Используем html-loader
            },
            {
                test: /\.js$/, // Для всех .js файлов
                exclude: /node_modules/, // Игнорируем файлы в node_modules
                use: ['babel-loader'] // Используем babel-loader для транспиляции
            },
            {
                test: /\.css$/, // Для всех .css файлов
                use: [
                    MiniCSSExtractPlugin.loader, // Выносим CSS в отдельные файлы
                    'css-loader' // Преобразуем CSS в модули
                ]
            },
            {
                test: /\.(jpg|png|gif|svg)$/, // Для изображений
                type: 'asset/resource', // Сохраняем их как отдельные файлы
                generator: {
                    filename: 'assets/images/[hash][ext]' // Храним в папке assets/images с хэшами
                }
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/, // Для шрифтов
                type: 'asset/resource', // Сохраняем их как отдельные файлы
                generator: {
                    filename: 'assets/fonts/[hash][ext]' // Храним в папке assets/fonts с хэшами
                }
            }
        ]
    }
};
