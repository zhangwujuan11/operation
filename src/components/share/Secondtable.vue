<template>
	<div class="datable">
		<div class="inputBox">
			<el-form :model="myfrom" ref="myfrom" class="demo-ruleForm">
				<el-form-item>
					<el-input placeholder="商户名称/商户号/账单号" v-model="myfrom.is"></el-input>
				</el-form-item>
			</el-form>
			<div class="btnbox">
				<el-button type="primary" @click="gomerchangIndex(myfrom)">查询</el-button>
				<el-button @click="resetForm()">重置</el-button>
			</div>
		</div>
		<el-table :data="tableData"
		@row-click="getAddLisy"
			style="width:100%;padding-bottom: 2.6rem;">
			<el-table-column prop="merName" label="商户名称">
			</el-table-column>
			<el-table-column prop="bankCardNo" label="支付卡信息">
			</el-table-column>
			<el-table-column prop="bankInfo" label="支付银行信息">
			</el-table-column>
			<el-table-column prop="totalAmount" label="账单总金额">
				<template slot-scope="scope">
					{{scope.row.totalAmount | amount}}
				</template>
			</el-table-column>
			<el-table-column prop="billDate" label="订单时间">
			</el-table-column>
			<el-table-column prop="billNo" label="账单号">
			</el-table-column>
			<el-table-column prop="instMid" label="业务类型">
			</el-table-column>
			<el-table-column prop="mid" label="商户号">
			</el-table-column>
			<el-table-column prop="payTime" label="支付时间">
			</el-table-column>
			<el-table-column prop="status" label="交易状态">
			</el-table-column>
			<el-table-column prop="targetOrderId" label="目标平台单号">
			</el-table-column>
			<el-table-column prop="targetSys" label="目标系统">
			</el-table-column>
			<el-table-column prop="tid" label="终端号">
			</el-table-column>
			
		</el-table>
		<el-pagination background @current-change="handleCurrentChange" :current-page="currentPage"
			:page-sizes="pageSizes" :page-size="PageSize" layout="prev, pager, next" :total="totalCount">
		</el-pagination>
		<!-- 蒙尘 -->
		<el-dialog title="流水详情" append-to-body :visible.sync="dialogVisible" width="50%">
			<div class="chen">
				<p>商户名称: {{keyObj.merName}}</p>
				<p>支付卡信息: {{keyObj.bankCardNo}} </p>
				<p>支付银行信息: {{keyObj.bankInfo}} </p>
				<p>账单总金额: {{keyObj.totalAmount | amount}} </p>
				<p>订单时间: {{keyObj.billDate}} </p>
				<p>账单号: {{keyObj.billNo}} </p>
				<p>业务类型: {{keyObj.instMid}} </p>
				<p>商户号: {{keyObj.mid}} </p>
				<p>支付时间: {{keyObj.payTime}} </p>
				<p>交易状态: {{keyObj.status}} </p>
				<p>目标平台单号: {{keyObj.targetOrderId}} </p>
				<p>目标系统: {{keyObj.targetSys}} </p>
				<p>终端号: {{keyObj.tid}} </p>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import Payment from '@/components/merchant/Payment.vue'
	import Channel from '@/components/merchant/Channel.vue'
	import {Secondtable,Secondtablequery} from '@/utils/share.js'
	export default {
		inject: ["reload"],
		filters: {
			amount(e) {
				return  '￥' + e / 100
			},
			
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
			Secondtable(1).then(res=>{
				this.tableData=res.data.data
				this.totalCount=res.data.count
			})
		},
		methods: {
			// 显示第几页
			handleCurrentChange(val) {
				// 改变默认的页数
				if(this.myfrom.is != ''){
					Secondtablequery({
						"page":val,
						"is":this.myfrom.is
					}).then(res=>{
						this.tableData=res.data.data
						this.totalCount=res.data.count
						
					})
				}else{
					Secondtable(val).then(res=>{
						this.tableData=res.data.data
						// this.currentPage = val
					})
				}
				
				
				
				
			},
			// 详情
			getAddLisy(row){
				this.keyObj=row
				this.dialogVisible=true
			},
			// 重置
			resetForm(){
				 Object.assign(this.$data.myfrom,this.$options.data().myfrom)
			},
			// 查询
			gomerchangIndex(){
				if(this.myfrom.is != ''){
					Secondtablequery({
						"page":1,
						"is":this.myfrom.is
					}).then(res=>{
						this.tableData=res.data.data
						this.totalCount=res.data.count
						
					})
				}else{
					Secondtable(1).then(res=>{
						this.tableData=res.data.data
						this.totalCount=res.data.count
						this.currentPage=1
					})
				}
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
	.btn_box{
		margin-top: 50px;
	}
	.btnbox{
		margin-bottom: 50px;
	}
	/deep/.el-form-item__content{
		width: 350px;
	}
</style>
