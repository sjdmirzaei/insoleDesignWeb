"use strict";

const webpack = require("webpack");
const fs = require("fs");

const args = process.argv;

let plugins = [
<<<<<<< HEAD
	new webpack.BannerPlugin(fs.readFileSync('./dev/banner.txt', 'utf8'), { raw: true, entryOnly: true })
=======
	new webpack.BannerPlugin(fs.readFileSync('./dev/banner.txt', 'utf8'),{ raw: true, entryOnly: true })
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
];
let externals = [];
let filename = "raphael";


if(args.indexOf('--no-deps') !== -1){
	console.log('Building version without deps');
	externals.push("eve");
	filename += ".no-deps"
}

if(args.indexOf('--min') !== -1){
	console.log('Building minified version');
	plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress:{
				dead_code: false,
				unused: false
			}
		})
	);
	filename += ".min"
}

module.exports = {
	entry: './dev/raphael.amd.js',
	output: {
		filename: filename + ".js",
		libraryTarget: "umd",
<<<<<<< HEAD
		library: "Raphael"
=======
		library: "Raphael",
		umdNamedDefine: true
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
	},

	externals: externals,

	plugins: plugins,

	loaders: [
  		{
  			test: /\.js$/, 
  			loader: "eslint-loader", 
  			include: "./dev/"
  		}
	],
  	
	eslint: {
    	configFile: './.eslintrc'
  	},

	resolve: {
<<<<<<< HEAD
		modulesDirectories: ["bower_components"],
		alias: {
			"eve": "eve-raphael/eve"
		}
=======
		modulesDirectories: ["bower_components"]
>>>>>>> d08bd309b7fc163faaed9d8eef992bf9d90f0a27
	}
};