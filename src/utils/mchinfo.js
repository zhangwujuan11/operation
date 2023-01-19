import request from '@/utils/request.js'
import axios from 'axios'

// 商户渠道表
export function channelinfo(){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/query',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "op_channel_info",
	 		"conditions": {
	 			"fields": [],
	 			"query": {
	 				"and": [{
						"match": {"isDel":0}
	 				}]
	 			}
	 		}
	 	}
	 })
}
// 商户渠道
export function channelset(data){
	return axios({
		url: 'https://1to2to3.cn/rds2/service/create',
		method: 'post',
		data: {
			"auth": 2,
			"project": "umsPay",
			"table": "op_channel_info",
			"data": [data]
		}
	})
}
// 渠道删除
export function channeldel(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/update-by-query',
	 	method: 'post',
	 	data: {
			"auth": 2,
			"project": "umsPay",
			"table": "op_channel_info",
			"query": {
				"and": [
					{"match": {"id": data.id}}
				]
			},
			"data": data
		}
	 })
}
export function channelquery(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/query',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "op_channel_info",
	 		"conditions": {
	 			"fields": [],
	 			"query": {
	 				"and": [{
	 					"match": {
	 						"isDel":0,
							"channelName":data
	 					}
	 				}]
	 			}
	 		}
	 	}
	 })
}
// 新建商户信息
export function mahinfo(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/create',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "op_mch_info",
	 		"data": [data]
	 	}
	 })
}
//修改商户信息
export function mahinfoupdata(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/update-by-query',
	 	method: 'post',
	 	data: {
			"auth": 2,
			"project": "umsPay",
			"table": "op_mch_info",
			"query": {
				"and": [
					{"match": {"mid": data.mid,"tid":data.tid}}
				]
			},
			"data": data
		}
	 })
}
// 删除商户
export function mahinfodel(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/update-by-query',
	 	method: 'post',
	 	data: {
			"auth": 2,
			"project": "umsPay",
			"table": "op_mch_info",
			"query": {
				"and": [
					{"match": {"mchName": data.mchName}}
				]
			},
			"data": data
		}
	 })
}
// 商户精确查找
export function mahinfoserch(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/query',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "op_mch_info",
	 		"conditions": {
	 			"fields": [],
	 			"query": {
	 				"and": [{
	 					"match": {
							"mid":data.mid,
							"tid":data.tid,
							"isDel":0
	 					}
	 				}]
	 			}
	 		 
	 		}
	 	}
	 })
}
export function mahinfoserchdataall(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/query',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "op_mch_info",
	 		"conditions": {
	 			"fields": [],
	 			"query": {
	 				"and": [{
	 					"match": {
							"isDel":0
	 					}
	 				}]
	 			}
	 		 
	 		}
	 	}
	 })
}

// 查找未删除商户
export function mahinfoserchall(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/query',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "op_mch_info",
	 		"conditions": {
				"pagination": {
					"page": data,
					"pageSize":8
				},
	 			"fields": [],
	 			"query": {
	 				"and": [{
	 					"match": {
	 						"isDel": 0,
	 					}
	 				}]
	 			}
	 		 
	 		}
	 	}
	 })
}

// 音箱信息
export function tcinfo(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/create',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "op_tc_info",
	 		"data": [data]
	 	}
	 })
}

// 精确查找音箱
export function tcinfoserch(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/query',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "op_tc_info",
	 		"conditions": {
	 			"fields": [],
	 			"query": {
	 				"and": [{
	 					"match": {
	 						"deviceId": data,
							"isDel":0
	 					}
	 				}]
	 			}
	 		 
	 		}
	 	}
	 })
}
// 查找未删除的音箱
export function tcinfoserchall(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/query',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "op_tc_info",
	 		"conditions": {
	 			"fields": [],
	 			"query": {
	 				"and": [{
						"match": {
							"isDel": 0,
						}
	 				}]
	 			}
	 		 
	 		}
	 	}
	 })
}
//修改音箱信息
export function tcinfoupdata(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/update-by-query',
	 	method: 'post',
	 	data: {
			"auth": 2,
			"project": "umsPay",
			"table": "op_tc_info",
			"query": {
				"and": [
					{"match": {"deviceId": data.deviceId}}
				]
			},
			"data": data
		}
	 })
}
//删除音箱
export function tcinfodel(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/update-by-query',
	 	method: 'post',
	 	data: {
			"auth": 2,
			"project": "umsPay",
			"table": "op_tc_info",
			"query": {
				"and": [
					{"match": {"deviceId": data.deviceId}}
				]
			},
			"data": data
		}
	 })
}
// 码牌信息
export function ccinfo(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/create',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "op_cc_info",
	 		"data": [data]
	 	}
	 })
}



// 查找未删除的码牌
export function ccinfoserchall(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/query',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "op_cc_info",
	 		"conditions": {
	 			"fields": [],
	 			"query": {
	 				"and": [{
	 					"match": {
	 						"isDel": 0,
	 					}
	 				}]
	 			}
	 		 
	 		}
	 	}
	 })
}
// 精确查找的码牌
export function ccinfoserch(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/query',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "op_cc_info",
	 		"conditions": {
	 			"fields": [],
	 			"query": {
	 				"and": [{
	 					"match": {
	 						"id": data,
							"isDel":0
	 					}
	 				}]
	 			}
	 		 
	 		}
	 	}
	 })
}
//修改码牌信息
export function ccinfoupdata(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/update-by-query',
	 	method: 'post',
	 	data: {
			"auth": 2,
			"project": "umsPay",
			"table": "op_cc_info",
			"query": {
				"and": [
					{"match": {"id": data.id}}
				]
			},
			"data": data
		}
	 })
}
// 删除码牌
export function ccinfodel(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/update-by-query',
	 	method: 'post',
	 	data: {
			"auth": 2,
			"project": "umsPay",
			"table": "op_cc_info",
			"query": {
				"and": [
					{"match": {"id": data.id}}
				]
			},
			"data": data
		}
	 })
}



export function mahinfodata(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/query',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "op_mch_info",
	 		"conditions": {
	 			"fields": [],
	 			"query": {
	 				"and": [{
						"match": {
							"mchName":data.mchName,
							"tid":data.tid,
							"isDel":0
						}
	 				}]
	 			}
	 		 
	 		}
	 	}
	 })
}
// 手机验证码
export function sendverdata(data){
	return axios({
		url:'http://quakelogin.quakeai.tech/sms/dosendMsg',
		method:'post',
		data:{
			"phone":data
		}
	})
}

// 商户收益配置
export function yieldcreate(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/create',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "op_yield_info",
	 		"data": [data]
	 	}
	 })
}
export function yieldquery(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/query',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "op_yield_info",
	 		"conditions": {
	 			"fields": [],
	 			"query": {
	 				"and": [{
	 					"match": {
	 						"percentage":data
	 					}
	 				}]
	 			}
	 		 
	 		}
	 	}
	 })
}
export function yieldqueryall(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/query',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "op_yield_info",
	 		"conditions": {
	 			"fields": [],
	 			"query": {
	 				"and": [{
	 					
	 				}]
	 			}
	 		 
	 		}
	 	}
	 })
}
export function yieldupdata(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/update-by-query',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "op_yield_info",
	 		"query": {
	 			"and": [
	 				{"match": {"yield_id": data.yield_id}}
	 			]
	 		},
	 		"data": data
	 	}
	 })
}

// 服务商收益绑定
export function isvyield(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/create',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "isv_yield_info",
	 		"data": [data]
	 	}
	 })
}
export function isvyieldquery(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/query',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "isv_yield_info",
	 		"conditions": {
	 			"fields": [],
	 			"query": {
	 				"and": [{
	 					
	 				}]
	 			}
	 		 
	 		}
	 	}
	 })
}