import axios from 'axios'
import {iToken} from '@/utils/home.js'


const server = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	withCredentials: true,
	timeout: 8000
})

// 请求拦截器
server.interceptors.request.use(
	config => {
		let token = JSON.parse(localStorage.getItem('iToken'))
		config.headers['Accept'] = 'application/json'
		config.headers['x-requested-with'] = 'XMLHttpRequest'
		config.headers['Access-Control-Allow-Origin'] = "*"  
		if (!config.headers.hasOwnProperty('iToken') && token) {
			config.headers.iToken=token
		}
		return config
	}, error => {
		Promise.reject(error)
	}
)

//响应拦截
server.interceptors.response.use(response => {
	if (response.data.code == 5000101) {
		return iToken().then(res=>{
			localStorage.setItem('iToken',JSON.stringify(res.data.data.iToken))
		})
	    } else {
	     return response
	    }
	
},
  error => {
    return Promise.reject(error)
    console.log('err' + error)
  })



export default server

