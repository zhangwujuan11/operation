const { defineConfig } = require('@vue/cli-service')
module.exports = {

	publicPath: process.env.NODE_ENV == 'development' ? '/operation/' : '/operation/',
	configureWebpack: {
		experiments: {
		  asyncWebAssembly: true,
		  syncWebAssembly: true
		},
		module:{
		  rules:[{
		    test: /\.wasm$/,
		    type: "webassembly/async"
		  }]
		},
		
	},
	outputDir: "dist", // 输出文件目录
	assetsDir: "static",
	productionSourceMap: false,
	devServer: {
		hot:true,//热更新
		// open:true,
		host:'localhost',
		port:8080,
		//proxy:{'/api':{}},代理器中设置/api,项目中请求路径为/api的替换为target
		proxy: {
		  [process.env.VUE_APP_BASE_API]: {
		    target: 'http://10.10.10.202:7001',
		    // ws: true,
		    changeOrigin: true,
		    pathRewrite: {
		      ['^' + process.env.VUE_APP_BASE_API]: ''
		       // '^/api': ''
		    }
		  }
		}
	},

}
