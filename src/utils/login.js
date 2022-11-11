import request from '@/utils/request.js'
import axios from 'axios'

export function register (data){
	return axios({
		url:'https://1to2to3.cn/super-login/user/register',
		method:'POST',
		data
	})
}

// 发送短信验证码
export function dosendMsg (data){
	return axios({
		url:'https://1to2to3.cn/super-login/sms/dosendMsg',
		method:'POST',
		data
	})
}

// 账号密码登录
export function goLogin(data){
	return request({
		url:'https://1to2to3.cn/super-login/oauth/token',
		method:'post',
		params:data
	})
}

// 判断token
export function overdue(){
  return axios({
    url:'https://1to2to3.cn/super-login/oauth/check_token',
    method:'post',
    params:{token:JSON.parse(localStorage.getItem('user')).token}
  })
}


// 通过手机号获取用户名称
export function charkname(data){
	return axios({
		url:'https://1to2to3.cn/super-login/user/findPhone',
		method:'post',
		data
	})
}

// 注册1to2to3用户中心账号
export function onetwo(data){
	return axios({
		url:'https://1to2to3.cn/super-login/user/register',
		method:'post',
		data
	})
}

// 新增操作员
export function addUser(data){
	return request({
		url:'/mgr/sysUsers/addUser',
		method:'post',
		data
	})
}