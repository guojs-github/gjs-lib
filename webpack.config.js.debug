var webpack = require("webpack");

module.exports = {
	devtool: 'source-map', // 配置生成Source Maps，选择适合的选项
	entry:  __dirname + "/src/main.js",//唯一入口文件
	output: {
		path: __dirname + "/js",//打包后的文件存放的地方
		filename: "gjs-lib.js"//打包后输出文件的文件名
	},
	module: {
		loaders: [
			{ // jQuery loader
				test: require.resolve('jquery'), 
				loader: "expose-loader?jQuery!expose-loader?$"
			},
			{ // css loader
				test:/\.css$/,
				loaders:['style-loader','css-loader']
			}
		]
	}	
}