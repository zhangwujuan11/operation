import request from '@/utils/request.js'
import axios from 'axios'

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

// 服务商分润单列表
export function serviceprovilist(data){
	return axios({
		url:'https://1to2to3.cn/share_profit/profit_withdraw/order_by_status/' + JSON.parse(localStorage.getItem('isv-no')),
		method:'get'
	})
}
// 提现单确认
export function provideright(data){
	return axios({
		url:'https://1to2to3.cn/share_profit/status/' +JSON.parse(localStorage.getItem('isv-no')) + '/' +  data.date + '/' + data.status,
		method:'post'
	})
}

// 提现成功提现单
// export function providesucess(data){
// 	return axios({
// 		url:'https://1to2to3.cn/share_profit/withdraw_table/' +JSON.parse(localStorage.getItem('isv-no')),
// 		method:'get'
// 	})
// }

// 管理员管理所有提现单
export function providerall(data){
	return axios({
		url:'https://1to2to3.cn/share_profit/profit_withdraw/right',
		method:'get'
	})
}
// 管理员管理分润表有误的提现单
export function providerwrong(data){
	return axios({
		url:'https://1to2to3.cn/share_profit/profit_withdraw/wrong',
		method:'get'
	})
}
// 管理员上传凭证
export function uploadimg(data){
	return axios({
		url:'https://1to2to3.cn/share_profit/certificate',
		method:'post',
		data:data
	})
}

// 管理员修改金额
export function changecash(data){
	return axios({
		url:'https://1to2to3.cn/share_profit/profit_table/' +data.isv + '/' + data.date + '/'  + data.profit,
		method:'put'
	})
}
// 计算分润单
export function gocont(data){
	return axios({
		url:'https://1to2to3.cn/share_profit/profit_table',
		method:'post'
	})
}

// 驳回
export function rejected(data){
	return axios({
		url:'https://1to2to3.cn/share_profit/status/' +data.isv + '/' +  data.date + '/' + data.status,
		method:'post'
	})
}