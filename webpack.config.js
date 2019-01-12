/**
 * Created by Wiener_zyj on 2017/6/27.
 */
var path = require('path');

module.exports = {
    entry: {},
    output: {
        path: path.resolve(__dirname, 'public/com'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015','react']
                }
            },
        ]
    },
    resolve: {
        alias: {
          'react-pixi$': 'react-pixi-fiber/react-pixi-alias'
        }
    },
    node: {
        fs: 'empty'
    }
}