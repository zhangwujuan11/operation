<template>
	<div class="datable">
		<el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" style="width:100%;">
			<el-table-column prop="orderId" label="订单ID">
			</el-table-column>
			<el-table-column prop="mchOrderNo" label="商户订单号">
			</el-table-column>
			<el-table-column label="通知状态">
				<template slot-scope='scope'>
					<span class="zhifu">{{scope.row.state | state}}</span>
				</template>
			</el-table-column>
			<el-table-column label="订单类型">
				<template slot-scope='scope'>
					<span class="zhifu">{{scope.row.orderType | orderType}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="createdAt" label="创建日期" width="270">
			</el-table-column>
			<el-table-column  label="操作">
				<template slot-scope="scope">
					<span @click="jinhao(scope.row.notifyId)" style="color: #1a79ff;cursor: pointer;">详情</span>
				</template>>
			</el-table-column>
		</el-table>
		<el-pagination
			background
			@current-change="handleCurrentChange" 
			:current-page="currentPage"
			:page-sizes="pageSizes" 
			:page-size="PageSize" 
			layout="prev, pager, next"
			:total="totalCount">
		</el-pagination>
		<!-- 蒙尘 -->
		<el-dialog title="商户通知详情" append-to-body :visible.sync="dialogVisible" width="50%">
			<div class="chen">
				<p>
					订单ID：<span class="shouxu">{{dialogdata.orderId}}</span>
				</p>
				<p>
					服务商号：
				</p>
				<p>商户订单号：{{dialogdata.mchOrderNo}}</p>
				<p>商户号：{{dialogdata.mchNo}}</p>
				<p>
					订单类型：<span class="shouxu">{{dialogdata.orderType | orderType}}</span>
				</p>
				<p>
					应用APPID：{{dialogdata.appId}}
				</p>
				
				<p>
					通知状态：<span class="shouxu">{{dialogdata.state | state}}</span>
				</p>
				<p>
					通知次数：{{dialogdata.notifyCount}}
				</p>
				<p>
					最后通知时间：{{dialogdata.lastNotifyTime}}
				</p>
				<p>
					创建时间：{{dialogdata.createdAt}}
				</p>
				<p>
					更新时间：{{dialogdata.updatedAt}}
				</p>
				<!-- border -->
				<p class="fengeborder"></p>
				<p style="width: 100%;">
					通知地址：{{dialogdata.notifyUrl}}
				</p>
				<!-- border -->
				<p class="fengeborder"></p>
				<p style="width: 100%;">
					响应结果：{{dialogdata.resResult}}
				</p>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {mchNotify,mchNotifyinfo} from '@/utils/ordermanagement.js'
	export default {
		filters:{
			state(e){
				if(e==1){
					return '通知中'
				}else if(e==2){
					return '通知成功'
				}else if(e==3){
					return '通知失败'
				}
			},
			orderType(e){
				if(e==1){
					return '支付'
				}else if(e==2){
					return '退款'
				}else if(e==3){
					return '转账'
				}
			}
		},
		data() {
			return {
				tableData: [],
				dialogVisible: false,
				// 默认显示第几页
				currentPage: 1,
				// 总条数，根据接口获取数据长度(注意：这里不能为空)
				totalCount: 1,
				// 个数选择器（可修改）
				pageSizes: [1, 2, 3, 4],
				// 默认每页显示的条数（可修改）
				PageSize:5,
				dialogdata:{}
			}
		},
		created(){
			this.getDatas()
			this.$nextTick(()=>{
				this.getData()
			})
		},
		methods: {
			// 详情
			jinhao(n) {
				mchNotifyinfo(n).then(res=>{
					this.dialogdata=res.data.data
					this.dialogVisible = true
				})
				
			},
			// 商户通知列表
			getDatas(n){
				mchNotify(n).then(res=>{
					this.tableData=res.data.data.records
				})
			},
			// 分页
			getData() {
				this.totalCount = this.tableData.length
			},
			// 显示第几页
			handleCurrentChange(val) {
				// 改变默认的页数
				this.currentPage = val
			}
		},
		watch:{
			$route(n){
				this.getDatas(n.query)
			},
			tableData(){
				this.getData()
			}
		}

	}
</script>

<style scoped>
	:deep(.el-table th.el-table__cell) {
		background-color: #F5F5F5 !important;
	}

	:deep(.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf) {
		border-bottom: none !important;
	}

	:deep(.el-table .cell) {
		line-height: 35px;
		white-space: nowrap;
		overflow: hidden;
	}

	.next {
		width: 100%;
		height: 1.28rem;
		text-align: center;
		padding-bottom: 20px;
	}

	.el-table::before {
		height: 0;
	}

	.el-button {
		border: 1px solid #278DE580;
		color: #278DE5;
	}

	.datable {
		height: 500px;
		overflow: hidden;
		overflow-y: scroll;
	}

	.control {
		color: #278DE5;
		cursor: pointer;
	}

	.zz {
		color: #1C64A3;
		background-color: rgba(39, 141, 229, 0.2);
		border-radius: 4px;
		padding: 2px 5px;
		margin-right: 4px;
	}

	.sh {
		color: #1CA329;
		background-color: rgba(155, 181, 158, 0.2);
		border-radius: 4px;
		padding: 2px 5px;
		margin-right: 4px;
	}

	/* 蒙尘 */
	p {
		width: 48%;
		font-size: 14px;
		margin-bottom: 25px;
		display: flex;
		align-items: center;
	}

	:deep(.el-dialog) {
		border-radius: 10px !important;
	}

	:deep(.el-dialog__header) {
		border-bottom: 1px solid rgba(196, 196, 196, 0.5);
	}

	.chen {
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	p img {
		width: 50px;
		height: 18px;
	}

	.dingdan {
		color: #2751E5;
		background-color: rgba(39, 81, 229, 0.2);
		border: 1px solid rgba(39, 81, 229, 0.5);
		border-radius: 4px;
		padding: 2px 5px;
	}

	.shouxu {
		color: #E527B0;
		background-color: rgba(229, 39, 176, 0.2);
		border: 1px solid rgba(229, 39, 176, 0.5);
		border-radius: 4px;
		padding: 2px 5px;
	}

	.zhifu {
		color: #27E53A;
		background-color: rgba(39, 229, 58, 0.2);
		border: 1px solid rgba(39, 229, 58, 0.5);
		border-radius: 4px;
		padding: 2px 5px;
	}

	.fengeborder {
		border-top: 1px solid rgba(196, 196, 196, 0.5);
		width: 100%;
		margin: 0.32rem 0;
	}
	.wfs{
		color: white;
		background-color:#CB8F1C;
		border: none;
		border-radius: 4px;
		padding: 2px 5px;
	}
	textarea{
		width: 70%;
		border: 1px solid #C4C4C4B2;
		border-radius: 5px;
		outline: none;
		text-indent: 10px;
	}
</style>
