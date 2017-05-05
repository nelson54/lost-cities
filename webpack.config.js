const path = require('path')

module.exports = {
    entry: path.join(__dirname, 'client/index.js'),
    output: {
        path: path.join(__dirname, 'public/js'),
        filename: 'lost-cities.js',
    },
    module: {
        rules: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            options: {
                babelrc: false,
                presets: [ 
                    ['env', { 
                        targets: {
                            browsers: [ 'last 2 versions' ],
                        },
                        useBuiltIns: true,
                        modules: false
                    }],
                    'react' 
                ]
            }
        }]
    }
}

