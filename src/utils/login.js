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


// login.js
//新写
export function levcreat(data) {
	return axios({
		url: 'https://1to2to3.cn/rds2/service/create',
		method: 'post',
		data: {
			"auth": 2,
			"project": "umsPay",
			"table": "pay_mch_info",
			"data": [data]
		}
	})
}
//储存绑定商户信息
export function mchpay_infoinit(data){
	return axios({
		url:'https://1to2to3.cn/rds2/service/create',
		method:'post',
		data: {
			"auth": 2,
			"project": "umsPay",
			"table": "pay_mch_info_t",
			"data": [data]
		}
	})
}
// 精确查询商户绑定信息表
export function levitastid(data) {
	return axios({
		url: 'https://1to2to3.cn/rds2/service/query',
		method: 'post',
		data: {
			"auth": 2,
			"project": "umsPay",
			"table": "pay_mch_info",
			"conditions": {
				"fields": [],
				"query": {
					"and": [{
						"match": {
							"channelId": data.channelId,
							"username":data.username
						}
					}]
				}

			}
		}
	})
}
// 查询未删除商户绑定信息表
export function mahinfoserchall(data) {
	return axios({
		url: 'https://1to2to3.cn/rds2/service/query',
		method: 'post',
		data: {
			"auth": 2,
			"project": "umsPay",
			"table": "pay_mch_info",
			"conditions": {
				"pagination": {
					"page": data,
					"pageSize":8
				},
				"fields": [],
				"query": {
					"and": [{
						"match": {
							"isDel": 0
						}
					}]
				}

			}
		}
	})
}

//修改
export function resetlevtas(data){
	return axios({
		url:'https://1to2to3.cn/rds2/service/update-by-query',
		method:'post',
		data:{
				"auth": 2,
				"project": "umsPay",
				"table": "pay_mch_info",
				"query": {
					"and": [
						{
							"match": {
								"username": data.username,
								"channelId": data.channelId
								},
						}
					]
				},
				"data": data
			}
	})
}
// 修改
export function mchpay_infoset(data){
	return axios({
		url:'https://1to2to3.cn/rds2/service/update-by-query',
		method:'post',
		data:{
				"auth": 2,
				"project": "umsPay",
				"table": "pay_mch_info_t",
				"query": {
					"and": [
						{"match": {"username": data.username}}
					]
				},
				"data": data
			}
	})
}

// 删除商户绑定信息
export function dellevtas(data){
	return axios({
		url:'https://1to2to3.cn/rds2/service/update-by-query',
		method:'post',
		data:{
				"auth": 2,
				"project": "umsPay",
				"table": "pay_mch_info",
				"query": {
					"and": [
						{
							"match": {
								"username": data.username,
								"channelId": data.channelId
								},
						}
					]
				},
				"data": data
			}
	})
}
// 删除商户绑定表2
export function mchpay_infodel(data){
	return axios({
		url:'https://1to2to3.cn/rds2/service/update-by-query',
		method:'post',
		data:{
				"auth": 2,
				"project": "umsPay",
				"table": "pay_mch_info_t",
				"query": {
					"and": [
						{"match": {"username": data.username}}
					]
				},
				"data": data
			}
	})
}
// 音箱修改
export function tctcset(data){
		return axios({
			url:'https://1to2to3.cn/rds2/service/set',
			method:'post',
			data: {
				"auth": 2,
				"project": "umsPay",
				"table": "mch_tc_info",
				 "id": data.id,
				"data": data
			}
		})
	}
	
// 导入excal提交levitas
export function excalcreat(data) {
	return axios({
		url: 'https://1to2to3.cn/rds2/service/create',
		method: 'post',
		data: {
			"auth": 2,
			"project": "umsPay",
			"table": "op_profit_info",
			"data": data
		}
	})
}
// 查询excal月份
export function excalquery(data){
	return axios({
		url: 'https://1to2to3.cn/rds2/service/query',
		method: 'post',
		data: {
			"auth": 2,
			"project": "umsPay",
			"table": "op_profit_info",
			"conditions": {
				"pagination": {
					"page": data.page,
					"pageSize":10
				},
				"fields": [],
				"query": {
					"and": [{
						"match": {
							"month":data.get
						}
					}]
				}

			}
		}
	})
}
// 查询全部信息
export function excalqueryall(data) {
	return axios({
		url: 'https://1to2to3.cn/rds2/service/query',
		method: 'post',
		data: {
			"auth": 2,
			"project": "umsPay",
			"table": "op_profit_info",
			"conditions": {
				"pagination": {
					"page": data,
					"pageSize":10
				},
				 "order": {
				       "month": "desc"
				        },
				"fields": [],
				"query": {
					"and": [{
						"match": {
							
						}
					}]
				}
			}
		}
	})
}
// 查询全部信息不分页
// export function exqueryall(data) {
// 	return axios({
// 		url: 'https://1to2to3.cn/rds2/service/query',
// 		method: 'post',
// 		data: {
// 			"auth": 2,
// 			"project": "umsPay",
// 			"table": "op_profit_info",
// 			"conditions": {
// 				"fields": [],
// 				"query": {
// 					"and": [{
// 						"match": {
							
// 						}
// 					}]
// 				}

// 			}
// 		}
// 	})
// }