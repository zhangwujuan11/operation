<template>
	<div class="datable">
		<el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" style="width:100%;">
			<el-table-column  label="转账金额">
				<template slot-scope="scope">
					￥{{scope.row.amount | amount}}
				</template>
			</el-table-column>
			<el-table-column prop="mchName" label="商户名称">
			</el-table-column>
			<el-table-column  label="订单号" width='260'>
				<template slot-scope='scope'>
					<span class="zz">转账</span>{{scope.row.transferId}}<br>
					<span class="sh">商户</span>{{scope.row.mchOrderNo}}
				</template>
			</el-table-column>
			<el-table-column prop="accountNo" label="收款账号">
			</el-table-column>
			<el-table-column prop="accountName" label="收款人姓名">
			</el-table-column>
			<el-table-column prop="transferDesc" label="转账备注">
			</el-table-column>
			<el-table-column label="状态">
				<template slot-scope="scope">
					{{scope.row.state | state}}
				</template>
			</el-table-column>
			<el-table-column prop="createdAt" width='260' label="创建日期">
			</el-table-column>
			<el-table-column  label="操作">
				<template slot-scope="scope">
					<span style="color: #1a79ff;cursor: pointer;"  @click="jinhao(scope.row.transferId)">详情</span>
				</template>
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
		<el-dialog title="转账订单详情" append-to-body :visible.sync="dialogVisible" width="50%">
			<div class="chen">
				<p>
					<span>商户类型：{{dialogData.mchType | mchType}}</span>
				</p>
				<p>
					<span>商户号：{{dialogData.mchNo}}</span>
				</p>
				<p>商户名称：{{dialogData.mchName}}</p>
				<p>
					应用APPID：{{dialogData.appId}}
				</p>
				<p>服务商号：{{dialogData.isvNo}}</p>
				<p>
					转账订单号：<span class="shouxu">{{dialogData.transferId}}</span>
				</p>
				<p>
					商户转账单号：{{dialogData.mchOrderNo}}
				</p>
				
				<p>
					渠道支付订单号：{{dialogData.channelPayOrderNo}}
				</p>
				<p>
					<span>金额：<span class="zhifu">￥{{dialogData.amount | amount}}</span></span>
				</p>
				<p>
					<span>货币代码：{{dialogData.currency}}</span>
				</p>
				<p>
					<span>收款账号：<span class="shouxu">{{dialogData.accountNo}}</span></span>
				</p>
				<p>
					收款人姓名：{{dialogData.accountName}}
				</p>
				<p>
					转账备注：{{dialogData.transferDesc}}
				</p>
				<p>
					订单状态：{{dialogData.state | state}}
				</p>
				<p>
					转账成功时间：{{dialogData.successTime}}
				</p>
				<p>
					<span>创建时间：{{dialogData.createdAt}}</span>
				</p>
				<p>
					<span>更新时间：{{dialogData.updatedAt}}</span>
				</p>
				<!-- border -->
				<p class="fengeborder"></p>
				<p>
					<span>接口代码：{{dialogData.ifCode}}</span>
				</p>
				<p>入账类型：{{dialogData.entryType | entryType}}</p>
				<p>
					<span>客户端IP：{{dialogData.clientIp}}</span>
				</p>
				<p>异步通知地址：</p>
				<!-- border -->
				<p class="fengeborder"></p>
				<p>渠道订单号：{{dialogData.channelOrderNo}}</p>
				<p>渠道错误码：{{dialogData.errCode}}</p>
				<p>渠道错误描述：{{dialogData.errMsg}}</p>
				<p>渠道额外参数：{{dialogData.extParam}}</p>
				<!-- border -->
				<p class="fengeborder"></p>
				<p>扩展参数：{{dialogData.channelExtra}}</p>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {transferOrders,transferOrdersinfo} from'@/utils/ordermanagement.js'
	export default {
		filters:{
			amount(e){
				return e/100
			},
			state(e){
				if(e==0){
					return '订单生成'
				}else if(e==1){
					return '转账中'
				}else if(e==2){
					return '转账成功'
				}else if(e==3){
					return '转账失败'
				}else if(e==4){
					return '订单关闭'
				}
			},
			mchType(e){
				if(e==1){
					return '普通商户'
				}else if(e==2){
					return '特约商户'
				}
			},
			entryType(e){
				if(e=='WX_CASH'){
					return '微信零钱'
				}else if(e=='ALIPAY_CASH'){
					return '支付宝转账'
				}else if(e=='BANK_CARD'){
					return '银行卡'
				}
			}
		},
		data() {
			return {
				tableData: [],
				dialogVisible: false,
				dialogData:{},
				// 默认显示第几页
				currentPage: 1,
				// 总条数，根据接口获取数据长度(注意：这里不能为空)
				totalCount: 1,
				// 个数选择器（可修改）
				pageSizes: [1, 2, 3, 4],
				// 默认每页显示的条数（可修改）
				PageSize:5,
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
				transferOrdersinfo(n).then(res=>{
					this.dialogData=res.data.data
					this.dialogVisible = true
				})
			},
			// 获取订单列表
			getDatas(n){
				transferOrders(n).then(res=>{
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
</style>
