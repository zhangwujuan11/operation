import request from '@/utils/request.js'

// 查询服务商信息列表
export function isvInfo(data){
	return request({
		url:'/mgr/isvInfo',
		method:'get',
		params:data
	})
}

// 新增服务商
export function addisvInfo(data){
	return request({
		url:'/mgr/isvInfo',
		method:'post',
		data
	})
}

// 删除服务商
export function delisvInfo(data){
	return request({
		url:'/mgr/isvInfo/' + data,
		method:'DELETE'
	})
}

// 更新服务商
export function updataisvinfo(data){
	return request({
		url:'/mgr/isvInfo/' + data.isvNo,
		method:'put',
		data:data
	})
}
// 服务商详情
export function isvInfodata(data){
	return request({
		url:'/mgr/isvInfo/' + data,
		method:'get'
	})
}

// 支付参数列表
export function payConfigs(data){
	return request({
		url:'/mgr/isv/payConfigs',
		method:'get',
		params:{isvNo:data}
	})
}