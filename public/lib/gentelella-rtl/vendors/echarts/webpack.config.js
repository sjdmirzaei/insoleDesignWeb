var PROD = process.argv.indexOf('-p') >= 0;
<<<<<<< HEAD
var webpack = require('webpack');

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            'typeof __DEV__': JSON.stringify('boolean'),
            __DEV__: PROD ? false : true
        })
    ],
=======

module.exports = {
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
    entry: {
        'echarts': __dirname + '/index.js',
        'echarts.simple': __dirname + '/index.simple.js',
        'echarts.common': __dirname + '/index.common.js'
    },
    output: {
        libraryTarget: 'umd',
        library: 'echarts',
        path: __dirname + '/dist',
        filename: PROD ? '[name].min.js' : '[name].js'
    }
};