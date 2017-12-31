const helpers           = require('./helpers');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'main': './src/main.js'
  },

  target: 'electron',

  node: {
    __dirname: false
  },

  output: {
    path: helpers.root('build/src'),
    filename: '[name].js'
  },

  resolve: {
    extensions: ['.ts', '.js', '.json']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
          exclude: [/notes\/\.?\.ts$/ ],
        loaders: 'awesome-typescript-loader'
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([
        {from: 'src/ui/package.json'},
	    {from: "src/core/**", to: helpers.root('build')}
    ])
  ]
};
