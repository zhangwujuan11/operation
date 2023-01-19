<template>
	<div class="datable">
		<div class="inputBox">
			<el-form :model="myfrom" ref="myfrom" class="demo-ruleForm">
				<el-form-item>
					<el-input placeholder="买家用户名/商户号/交易状态" v-model="myfrom.is"></el-input>
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
			<el-table-column prop="buyerId" label="买家ID">
			</el-table-column>
			<el-table-column prop="buyerUsername" label="买家用户名">
			</el-table-column>
			<el-table-column prop="buyerPayAmount" width="130" label="买家付款的金额">
				<template slot-scope="scope">
					{{scope.row.buyerPayAmount | amount}}
				</template>
			</el-table-column>
			<el-table-column prop="mid" label="商户号">
			</el-table-column>
			<el-table-column prop="payTime" label="支付时间">
			</el-table-column>
			<el-table-column prop="attachedData" label="附加数据">
			</el-table-column>
			<el-table-column prop="bankCardNo" label="银行卡号">
			</el-table-column>
			<el-table-column prop="billFunds" width="110" label="支付渠道列表">
			</el-table-column>
			<el-table-column prop="billFundsDesc" width="110" label="支付渠道描述">
			</el-table-column>
			<el-table-column prop="status" label="交易状态">
			</el-table-column>
			<el-table-column prop="couponAmount" width="110" label="渠道优惠金额">
				<template slot-scope="scope">
					{{scope.row.couponAmount | amount}}
				</template>
			</el-table-column>
			<el-table-column prop="instMid" label="业务类型">
			</el-table-column>
			<el-table-column prop="invoiceAmount" width="180" label="交易中可给用户开具发票的金额">
			</el-table-column>
			<el-table-column prop="receiptAmount" width="110" label="商户实收金额">
				<template slot-scope="scope">
					{{scope.row.receiptAmount | amount}}
				</template>
			</el-table-column>
			<el-table-column prop="refId" label="检索参考号">
			</el-table-column>
			<el-table-column prop="refundOrderId" label="退款订单号">
			</el-table-column>
			<el-table-column prop="refundDesc" label="退货说明">
			</el-table-column>
			<el-table-column prop="seqId" label="平台流水号">
			</el-table-column>
			<el-table-column prop="settleDate" label="结算日期">
			</el-table-column>
			<el-table-column prop="targetSys" width="110" label="目标平台代码">
			</el-table-column>
			<el-table-column prop="tid" label="终端号">
			</el-table-column>
			<el-table-column prop="totalAmount" label="支付总金额">
				<template slot-scope="scope">
					{{scope.row.totalAmount | amount}}
				</template>
			</el-table-column>
		</el-table>
		<el-pagination background @current-change="handleCurrentChange" :current-page="currentPage"
			:page-sizes="pageSizes" :page-size="PageSize" layout="prev, pager, next" :total="totalCount">
		</el-pagination>
		<!-- 蒙尘 -->
		<el-dialog title="流水详情" append-to-body :visible.sync="dialogVisible" width="50%">
			<div class="chen">
				<p>买家ID: {{keyObj.buyerId}}</p>
				<p>买家用户名: {{keyObj.buyerUsername}} </p>
				<p>买家付款的金额: {{keyObj.buyerPayAmount | amount}} </p>
				<p>商户号: {{keyObj.mid}} </p>
				<p>支付时间: {{keyObj.payTime}} </p>
				<p>附加数据: {{keyObj.attachedData}} </p>
				<p>银行卡号: {{keyObj.bankCardNo}} </p>
				<p>支付渠道列表: {{keyObj.billFunds}} </p>
				<p>支付渠道描述: {{keyObj.billFundsDesc}} </p>
				<p>交易状态: {{keyObj.status}} </p>
				<p>渠道优惠金额: {{keyObj.couponAmount | amount}} </p>
				<p>业务类型: {{keyObj.instMid}} </p>
				<p>交易中可给用户开具发票的金额: {{keyObj.invoiceAmount}} </p>
				<p>商户实收金额: {{keyObj.receiptAmount | amount}} </p>
				<p>检索参考号: {{keyObj.refId}} </p>
				<p>退款订单号: {{keyObj.refundOrderId}} </p>
				<p>退货说明: {{keyObj.refundDesc}} </p>
				<p>平台流水号: {{keyObj.seqId}} </p>
				<p>结算日期: {{keyObj.settleDate}} </p>
				<p>目标平台代码: {{keyObj.targetSys}} </p>
				<p>终端号: {{keyObj.tid}} </p>
				<p>支付总金额: {{keyObj.totalAmount | amount}} </p>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import Payment from '@/components/merchant/Payment.vue'
	import Channel from '@/components/merchant/Channel.vue'
	import {Thirdtable,Thirdtablequery} from '@/utils/share.js'
	export default {
		inject: ["reload"],
		filters: {
			amount(e) {
				return  '￥' + e / 100
			},
			
		},
		data() {
			return {
				tableData: [],
				activeName: 'first',
				// 默认显示第几页
				currentPage: 1,
				// 总条数，根据接口获取数据长度(注意：这里不能为空)
				totalCount: 1,
				// 个数选择器（可修改）
				pageSizes: [1, 2, 3, 4],
				// 默认每页显示的条数（可修改）
				PageSize: 10,
				keyObj:{},
				dialogVisible:false,
				myfrom:{is:''}
			}

		},
		components: {
			Payment,
			Channel
		},
		created() {
			Thirdtable(1).then(res=>{
				this.tableData=res.data.data
				this.totalCount=res.data.count
			})
		},
		methods: {
			// 显示第几页
			handleCurrentChange(val) {
				// 改变默认的页数
				if(this.myfrom.is != ''){
					Thirdtablequery({
						"page":val,
						"is":this.myfrom.is
					}).then(res=>{
						this.tableData=res.data.data
						this.totalCount=res.data.count
					})
				}else{
					Thirdtable(val).then(res=>{
						this.tableData=res.data.data
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
			gomerchangIndex(){
				if(this.myfrom.is != ''){
						Thirdtablequery({
							"page":1,
							"is":this.myfrom.is
						}).then(res=>{
							this.tableData=res.data.data
							this.totalCount=res.data.count
						})
					}else{
						Thirdtable(1).then(res=>{
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
	.btnbox{
		margin-bottom: 50px;
	}
	/deep/.el-form-item__content{
		width: 350px;
	}
</style>
