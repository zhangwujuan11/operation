import request from '@/utils/request.js'
import axios from 'axios'

// 用户名获取itoken
export function iToken(){
	return request({
		url:'/mgr/anon/auth/validate',
		method:'POST',
		data:{
			"username": JSON.parse(localStorage.getItem('user')).username
		}
		
	})
}

// 周交易总金额
export function payAmountWeek(data){
	return request({
		url:'/mgr/mainChart/payAmountWeek',
		method:'get',
		data
	})
}

// 商户总数量、服务商总数量、总交易金额、总交易笔数
export function numCount (){
	return request({
		url:'/mgr/mainChart/numCount',
		method:'get'
	})
}

// eachert统计
export function payCount(data){
	return request({
		url:'/mgr/mainChart/payCount',
		method:'get',
		params:data
	})
}

// 支付方式统计
export function typeCount(data){
	return request({
		url:'/mgr/mainChart/payTypeCount',
		method:'get',
		params:data
	})
}


