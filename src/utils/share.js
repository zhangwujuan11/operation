import axios from 'axios'


// b扫c firsttable
export function oederinfoall(numm) {
	return axios({
		url: 'https://1to2to3.cn/rds2/service/query',
		method: 'post',
		data: {
			"auth": 2,
			"project": "umsPay",
			"table": "order_info",
			"conditions": {
				"pagination": {
					"page":numm,
					"pageSize": 5
				},
				"fields": [],
				"query": {
					"and": []
				}
			}
		}
	})
}

// firsttable查询
export function oederinfoquery(data) {
	return axios({
		url: 'https://1to2to3.cn/rds2/service/query',
		method: 'post',
		data: {
			"auth": 2,
			"project": "umsPay",
			"table": "order_info",
			"conditions": {
				"pagination": {
					"page":data.page,
					"pageSize": 5
				},
				"fields": [],
				"query": {
					"or": [
						{"match":{"mchntName":data.is}},
						{"match":{"merchantCode":data.is}},
						{"match":{"merchantOrderId":data.is}}
						]}
				}
			}
		})
		}
		
		
		
		


// 静态码C扫B Secondtable
export function Secondtable(numm) {
	return axios({
		url: 'https://1to2to3.cn/rds2/service/query',
		method: 'post',
		data: {
			"auth": 2,
			"project": "umsPay",
			"table": "cb_order_info_to_qrcode",
			"conditions": {
				"pagination": {
					"page":numm,
					"pageSize": 5
				},
				"fields": [],
				"query": {
					"and": []
				}
			}
		}
	})
}
// Secondtable查询
export function Secondtablequery(data){
	return axios({
		url: 'https://1to2to3.cn/rds2/service/query',
		method: 'post',
		data: {
			"auth": 2,
			"project": "umsPay",
			"table": "cb_order_info_to_qrcode",
			"conditions": {
				"pagination": {
					"page":data.page,
					"pageSize": 5
				},
				"fields": [],
				"query": {
					"or": [
						{"match":{"merName":data.is}},
						{"match":{"billNo":data.is}},
						{"match":{"mid":data.is}}
						]}
				}
			}
		})
		}

// 公众号C扫B Thirdtable
export function Thirdtable(numm) {
	return axios({
		url: 'https://1to2to3.cn/rds2/service/query',
		method: 'post',
		data: {
			"auth": 2,
			"project": "umsPay",
			"table": "cb_order_info",
			"conditions": {
				"pagination": {
					"page":numm,
					"pageSize": 10
				},
				"fields": [],
				"query": {
					"and": []
				}
			}
		}
	})
}
// Thirdtable查询
export function Thirdtablequery(data){
	return axios({
		url: 'https://1to2to3.cn/rds2/service/query',
		method: 'post',
		data: {
			"auth": 2,
			"project": "umsPay",
			"table": "cb_order_info",
			"conditions": {
				"pagination": {
					"page":data.page,
					"pageSize": 5
				},
				"fields": [],
				"query": {
					"or": [
						{"match":{"buyerId":data.is}},
						{"match":{"status":data.is}},
						{"match":{"mid":data.is}}
						]}
				}
			}
		})
		}