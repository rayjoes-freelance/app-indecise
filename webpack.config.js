const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports =(env) => {
    isProduction = env =='production';
    const CSSExtract = new ExtractTextPlugin('styles.css');
    return {
        entry : './src/app.js',
        output : {
            path:path.join(__dirname, 'public', 'dist'),
            filename : 'bundle.js'
        },
        plugins:[CSSExtract],
        module : {
            rules: [{
                loader : 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/,
            }, {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use:[
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }]
        },
        devtool : isProduction ? 'source-map' : 'cheap-module-eval-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback:true,
            publicPath: '/dist'
        }
    }
};

