import request from '@/utils/request.js'

// 操作员列表
export function sysUsers(){
	return request({
		url:'mgr/sysUsers',
		method:'get'
	})
}
// 角色信息列表
export function rolelist(data){
	return request({
		url:'mgr/sysRoles',
		method:'get',
		params:data
	})
}
// 权限管理列表
export function showTree(data){
	return request({
		url:'mgr/sysEnts/showTree',
		method:'get',
		params:data
	})
}
// 日志列表
export function sysLog(data){
	return request({
		url:'mgr/sysLog',
		method:'get',
		params:data
	})
}
