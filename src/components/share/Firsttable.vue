<template>
	<div class="datable">
		<div class="inputBox">
			<el-form :model="myfrom" ref="myfrom" class="demo-ruleForm">
				<el-form-item>
					<el-input placeholder="商户名称/商户号/商户订单号" v-model="myfrom.is"></el-input>
				</el-form-item>
			</el-form>
			<div class="btnbox">
				<el-button type="primary" @click="gomerchangIndex(myfrom)">查询</el-button>
				<el-button @click="resetForm()">重置</el-button>
			</div>
		</div>
		<el-table :data="tableData"
			style="width:100%;padding-bottom: 2.6rem;"
			@row-click="getAddLisy"
			>
			<el-table-column prop="mchntName" label="商户名称">
			</el-table-column>
			<el-table-column prop="actualTransactionAmount" label="优惠后交易金额">
				<template slot-scope="scope">
					{{scope.row.actualTransactionAmount | amount}}
				</template>
			</el-table-column>
			<el-table-column prop="amount" label="实际支付金额">
				<template slot-scope="scope">
					{{scope.row.amount | amount}}
				</template>
			</el-table-column>
			<el-table-column prop="thirdPartyName" label="第三方名称">
			</el-table-column>
			<el-table-column prop="errCode" label="支付状态">
				<template slot-scope="scope">
					{{scope.row.errCode | sate}}
				</template>
			</el-table-column>
			<el-table-column prop="merchantCode" label="商户号">
			</el-table-column>
			<el-table-column prop="merchantOrderId" label="商户订单号">
			</el-table-column>
			<el-table-column prop="merchantRemark" label="商户备注">
			</el-table-column>
			<el-table-column prop="originalOrderId" label="银商订单号">
			</el-table-column>
			<el-table-column prop="payCode" label="支付码">
			</el-table-column>
			<el-table-column prop="terminalCode" label="终端号">
			</el-table-column>
			<el-table-column prop="transactionDateWithYear" label="交易成功时间">
				<template slot-scope="scope">
					{{scope.row.transactionDateWithYear}}-{{scope.row.transactionTime}}
				</template>
			</el-table-column>
		</el-table>
		<el-pagination background @current-change="handleCurrentChange" :current-page="currentPage"
			:page-sizes="pageSizes" :page-size="PageSize" layout="prev, pager, next" :total="totalCount">
		</el-pagination>
		<!-- 蒙尘 -->
		<el-dialog title="流水详情" append-to-body :visible.sync="dialogVisible" width="50%">
			<div class="chen">
				<p>商户名称: {{keyObj.mchntName}}</p>
				<p>优惠后交易金额: {{keyObj.actualTransactionAmount | amount}} </p>
				<p>实际支付金额: {{keyObj.amount | amount}} </p>
				<p>第三方名称: {{keyObj.thirdPartyName}} </p>
				<p>支付状态: {{keyObj.errCode | sate}} </p>
				<p>商户号: {{keyObj.merchantCode}} </p>
				<p>商户订单号: {{keyObj.merchantOrderId}} </p>
				<p>商户备注: {{keyObj.merchantRemark}} </p>
				<p>银商订单号: {{keyObj.originalOrderId}} </p>
				<p>支付码: {{keyObj.payCode}} </p>
				<p>终端号: {{keyObj.terminalCode}} </p>
				<p>交易成功时间: {{keyObj.transactionDateWithYear}}-{{keyObj.transactionTime}} </p>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import Payment from '@/components/merchant/Payment.vue'
	import Channel from '@/components/merchant/Channel.vue'
	import {oederinfoall,oederinfoquery} from '@/utils/share.js'
	export default {
		inject: ["reload"],
		filters: {
			amount(e) {
				return  '￥' + e / 100
			},
			sate(e){
				if(e == '00'){
					return '支付成功'
				}
			}
		},
		data() {
			return {
				myfrom:{is:''},
				tableData: [],
				activeName: 'first',
				// 默认显示第几页
				currentPage: 1,
				// 总条数，根据接口获取数据长度(注意：这里不能为空)
				totalCount: 1,
				// 个数选择器（可修改）
				pageSizes: [1, 2, 3, 4],
				// 默认每页显示的条数（可修改）
				PageSize: 5,
				keyObj:{},
				dialogVisible:false
			}

		},
		components: {
			Payment,
			Channel
		},
		created() {
			oederinfoall(1).then(res=>{
				this.tableData=res.data.data
				this.totalCount=res.data.count
			})
		},
		methods: {
			// 显示第几页
			handleCurrentChange(val) {
				// 改变默认的页数
				if(this.myfrom.is != ''){
					oederinfoquery({
						"page":val,
						"is":this.myfrom.is
					}).then(res=>{
						this.tableData=res.data.data
						this.totalCount=res.data.count
						
					})
				}else{
					oederinfoall(val).then(res=>{
						this.tableData=res.data.data
					})
				}
				
			},
			// 详情
			getAddLisy(row){
				this.keyObj=row
				this.dialogVisible=true
			},
			// 查询
			gomerchangIndex(){
				if(this.myfrom.is != ''){
					oederinfoquery({
						"page":1,
						"is":this.myfrom.is
					}).then(res=>{
						this.tableData=res.data.data
						this.totalCount=res.data.count
						
					})
				}else{
					oederinfoall(1).then(res=>{
						this.tableData=res.data.data
						this.totalCount=res.data.count
						this.currentPage=1
					})
				}
				
			},
			// 重置
			resetForm(){
				 Object.assign(this.$data.myfrom,this.$options.data().myfrom)
			}
		}
	}
</script>

<style scoped>
	

/* 蒙尘 */
	.datable {
		margin-top: 30px;
		width: 100%;
	}
	
	:deep(.el-table th.el-table__cell) {
		background-color: #F5F5F5 !important;
	}
	
	.cell span {
		color: #278DE5;
		margin-right: 0.533333rem;
	}
	
	.cell span img {
		width: 0.24rem;
		height: 0.24rem;
		margin-left: 0.186667rem;
	}
	
	:deep(.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf) {
		border-bottom: none !important;
		cursor: pointer;
	}
	
	.downshow {
		width: 150px;
		height: 100px;
		background-color: white;
		border-radius: 0.266667rem;
		position: absolute;
		top: 35px;
		box-shadow: 8px 0px 20px 8px rgba(0, 0, 0, 0.15);
		z-index: 1999;
		left: 46px;
	}
	.btnbox{
		margin-bottom: 50px;
	}
	/deep/.el-form-item__content{
		width: 350px;
	}
</style>
