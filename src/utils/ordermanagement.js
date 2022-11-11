import request from '@/utils/request.js'

// 支付订单列表
export function payOrder(data){
	return request({
		url:'/mgr/payOrder',
		method:'get',
		params:data
	})
}

// 支付订单详情
export function payOrderinfo(data){
	return request({
		url:'/mgr/payOrder/' + data,
		method:'get'
	})
}


// 退款订单列表
export function refundOrder(data){
	return request({
		url:'/mgr/refundOrder',
		method:'get',
		params:data
	})
}
// 退款订单详情
export function refundOrderinfo(data){
	return request({
		url:'/mgr/refundOrder/' + data,
		method:'get'
	})
}

// 转账订单列表
export function transferOrders(data){
	return request({
		url:'/mgr/transferOrders',
		method:'get',
		params:data
	})
}

// 转账订单详情
export function transferOrdersinfo(data){
	return request({
		url:'/mgr/transferOrders/' + data,
		method:'get'
	})
}

// 商户通知列表
export function mchNotify(data){
	return request({
		url:'/mgr/mchNotify',
		method:'get',
		params:data
	})
}

// 商户通知详情
export function mchNotifyinfo(data){
	return request({
		url:'/mgr/mchNotify/' + data,
		method:'get'
	})
}