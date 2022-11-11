import request from '@/utils/request.js'

// 支付接口列表
export function payIfDefines(){
	return request({
		url:'/mgr/payIfDefines',
		method:'get'
	})
}
// 新增支付接口
export function addpayIfDefines(data){
	return request({
		url:'/mgr/payIfDefines',
		method:'post',
		data
	})
}

// 支付方式列表
export function payWays(data){
	return request({
		url:'mgr/payWays',
		method:'get',
		params:data
	})
}
// 删除支付接口
export function delpayWays(data){
	return request({
		url:'/mgr/payIfDefines/' + data,
		method:'DELETE'
	})
}

// 接口详情
export function payWaysinfo(data){
	return request({
		url:'/mgr/payIfDefines/' + data,
		method:'get'
	})
}

// 修改接口信息
export function changedata(data){
	return request({
		url:'/mgr/payIfDefines/' + data.ifCode,
		method:'PUT',
		data:data
	})
}


// 新增支付方式
export function addpayWay(data){
	return request({
		url:'mgr/payWays',
		method:'post',
		data:data
	})
}