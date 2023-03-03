import request from '@/utils/request.js'
import axios from 'axios'


// 应用列表
export function mchApps(data){
	return request({
		url:'/mgr/mchApps',
		method:'get',
		params:data
	})
}

// 新建应用
export function newbulidapps(data){
	return request({
		url:'/mgr/mchApps',
		method:'post',
		data
	})
}
// 删除应用
export function delapp(data){
	return request({
		url:'/mgr/mchApps/'+ data,
		method:'DELETE'
	})
}
// 修改/更新应用
export function putapp(data){
	return request({
		url:'/mgr/mchApps/' + data.appId,
		method:'put',
		data
	})
}
// 应用详情
export function infoApp(data){
	return request({
		url:'/mgr/mchApps/'+data,
		method:'get',
		data
	})
}
// 
export function payConfigs(data){
	return request({
		url:'/mgr/mch/payConfigs',
		method:'get',
		params:{'appId':data}
	})
}
// 查询支付方式列表
export function payPassages(data){
	return request({
		url:'/mgr/mch/payPassages',
		method:'get',
		params:data
	})
}





// 商户列表
export function mchInfo(data){
	return request({
		url:'/mgr/mchInfo',
		method:'get',
		params:data
	})
}

// 新增商户
export function newbuildmchInfo(data){
	return request({
		url:'/mgr/mchInfo',
		method:'post',
		data
	})
}

// 删除商户
export function delmchInfo(data){
	return request({
		url:'/mgr/mchInfo/'+data,
		method:'DELETE'
	})
}
// 修改/更新商户
export function updataInfo(data){
	return request({
		url:'/mgr/mchInfo/'+data.mchNo,
		method:'PUT',
		data
	})
}

// 商户详情
export function infomch(data){
	return request({
		url:'/mgr/mchInfo/'+data,
		method:'get',
		data
	})
}



// 所属服务商(未停用)
export function isvc(){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/query',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "isv_info",
	 		"conditions": {
	 			"fields": [],
	 			"query": {
	 				"and": [{
						"match":{
							"state":1
						}
	 				}]
	 			}
	 		}
	 	}
	 })
}
//所属服务商所有
export function isvcall(){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/query',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "isv_info",
	 		"conditions": {
	 			"fields": [],
	 			"query": {
	 				"and": [{
						"match":{
							"is_admin":0
						}
	 				}]
	 			}
	 		}
	 	}
	 })
}
// 精准所属服务商查询
export function isvcserch(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/query',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "isv_info",
	 		"conditions": {
	 			"fields": [],
	 			"query": {
	 				"and": [{
	 					"match":{
	 						"isv_no":data
	 					}
	 				}]
	 			}
	 		}
	 	}
	 })
}
// 精准所属服务商查询
export function isvcupdata(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/update-by-query',
	 	method: 'post',
	 	data:{
	 			"auth": 2,
	 			"project": "umsPay",
	 			"table": "isv_info",
	 			"query": {
	 				"and": [
	 					{
	 						"match": {
	 							"isv_no":data.isv_no,
	 							}
	 					}
	 				]
	 			},
	 			"data": data
	 		}
	 })
}

// 一级服务商查询
export function isvlevelno(data){
	return axios({
		url: 'https://1to2to3.cn/rds2/service/query',
		method: 'post',
		data: {
			"auth": 2,
			"project": "umsPay",
			"table": "isv_info",
			"conditions": {
				"fields": [],
				"query": {
					"and": [{
						"match":{
							"isv_level":1
						}
					}]
				}
			}
		}
	})
}

// 服务商等级
export function levels(){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/query',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "op_isv_level",
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

// 服务商收益修改
export function isvyielddata(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/update-by-query',
	 	method: 'post',
	 	data:{
	 			"auth": 2,
	 			"project": "umsPay",
	 			"table": "isv_yield_info",
	 			"query": {
	 				"and": [
	 					{
	 						"match": {
	 							"isv_no":data.isv_no,
	 							}
	 					}
	 				]
	 			},
	 			"data": data
	 		}
	 })
}




// 新建服务商流程
// 1.根据手机号查询服务商是否存在
export function isvlist(data) {
	return axios({
		url: 'https://1to2to3.cn/rds2/service/query',
		method: 'post',
		data: {
			"auth": 2,
			"project": "umsPay",
			"table": "isv_info",
			"conditions": {
				"fields": [],
				"query": {
					"and": [{
						"match":{
							"contact_tel":data
						}
					}]
				}
			}
		}
	})
}




// 服务商基础表添加
export function isvcreat(data) {
	return axios({
		url: 'https://1to2to3.cn/rds2/service/create',
		method: 'post',
		data: {
			"auth": 2,
			"project": "umsPay",
			"table": "isv_info",
			"data": [data]
		}
	})
}