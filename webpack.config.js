 const NODE_ENV = process.env.NODE_ENV || 'dev';
 const webpack = require('webpack');
 const path = require('path');
 console.info(`now is ${NODE_ENV} module`);
 module.exports = {
     entry :{
        angular: './app/main.ts',
     },
     output: {
         path: __dirname + '/public/js',
         filename: '[name].js',
         chunkFilename: '[id].chunk.js',
     },
     watch: NODE_ENV == 'dev',
     watchOptions: {
         aggregateTimeout: 100
     },

     devtool: NODE_ENV == 'dev' ? "inline-source-map" : "cheap-module-source-map",

    module: { 
        loaders: [
            {
              test: /\.ts$/,
              loaders: [
                    'awesome-typescript-loader',
                    'angular2-template-loader'
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: require.resolve('babel-preset-es2015-nostrict'),
                    plugins: require.resolve('babel-plugin-transform-runtime'),
                },
                exclude:path.resolve(__dirname, "node_modules")
            },
            { 
                test: /\.(html|css)$/, 
                loader: 'raw-loader'
            }
        ],
    },
     resolve: {
        extensions: ["", ".js",".ts"],
        root: [ path.resolve(__dirname, 'node_modules') ],
        modulesDirectories: [ path.resolve(__dirname, 'node_modules') ]
     },
     resolveLoader: {
        root: [ path.resolve(__dirname, 'node_modules') ]
    },

       plugins:[
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
             NODE_ENV: JSON.stringify(NODE_ENV),
          }),
     ],
 };


 /**
 * For prod mode uglify js 
 */
 if(NODE_ENV == 'prod'){
      module.exports.plugins.push(
         new webpack.optimize.UglifyJsPlugin({
             warning: false,
             sourceMap: false,
             output: {
                 comments: false
             }
         })
     );
 }
