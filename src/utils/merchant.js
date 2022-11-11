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