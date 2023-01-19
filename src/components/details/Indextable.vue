<template>
	<div class="datable">
		<el-table :data="tableData"
			style="width:100%;padding-bottom: 2.6rem;"
			@row-click="getAddLisy"
			>
			<el-table-column prop="month" label="月份">
			</el-table-column>
			<el-table-column prop="developChannel" label="拓展渠道">
			</el-table-column>
			<el-table-column prop="developChannelCode" width="110" label="拓展渠道代码">
			</el-table-column>
			<el-table-column prop="shareProfitPattern" label="分润模式">
			</el-table-column>
			<el-table-column prop="project" label="项目细分">
			</el-table-column>
			<el-table-column prop="accessWay" label="接入方式">
			</el-table-column>
			<el-table-column prop="tieredRate" label="阶梯费率">
			</el-table-column>
			<el-table-column prop="mchAccessTime" width="110" label="商户入网时间">
			</el-table-column>
			<el-table-column prop="mchName" label="商户名称">
			</el-table-column>
			<el-table-column prop="appName" label="应用名称">
			</el-table-column>
			<el-table-column prop="mid" label="商户号">
			</el-table-column>
			<el-table-column prop="locationCode" label="地区代码">
			</el-table-column>
			<el-table-column prop="location" label="地区名称">
			</el-table-column>
			<el-table-column prop="debitCardDeductionRate" width="110" label="借记卡扣率">
			</el-table-column>
			<el-table-column prop="crebitCardDeductionRate" width="110" label="贷记卡扣率">
			</el-table-column>
			<el-table-column prop="wildCardDebitDeductionRate" width="110" label="外卡借记扣率">
			</el-table-column>
			<el-table-column prop="wildCardCrebitDeductionRate" width="110" label="外卡贷记扣率">
			</el-table-column>
			<el-table-column prop="wechatDeductionRate" label="微信扣率">
			</el-table-column>
			<el-table-column prop="alipayDeductionRate" width="110" label="支付宝扣率">
			</el-table-column>
			<el-table-column prop="unionpayQrcodeDebitdeductionRate" width="180" label="银联二维码借记扣率">
			</el-table-column>
			<el-table-column prop="UnionpayQrcodeCrebitdeductionRate" width="180" label="银联二维码贷记扣率">
			</el-table-column>
			<el-table-column prop="below1000UnionPayQrcodeTransactionsNum" width="220" label="千元以下银联二维码交易笔数">
			</el-table-column>
			<el-table-column prop="below1000UnionPayQrcodeTransactionsAmount"  width="220" label="千元以下银联二维码交易金额">
			</el-table-column>
			<el-table-column prop="below1000UnionPayQrcodeTransactionsReceiptIncome"  width="250" label="千元以下银联二维码交易收单收益">
			</el-table-column>
			<el-table-column prop="above1000UnionPayQrcodeTransactionsNum"  width="220" label="千元以上银联二维码交易笔数">
			</el-table-column>
			<el-table-column prop="above1000UnionPayQrcodeTransactionsAmount"  width="220" label="千元以上银联二维码交易金额">
			</el-table-column>
			<el-table-column prop="above1000UnionPayQrcodeTransactionsReceiptIncome"  width="250" label="千元以上银联二维码交易收单收益">
			</el-table-column>
			<el-table-column prop="totalTransactionsNum"  width="110" label="总交易笔数">
			</el-table-column>
			<el-table-column prop="totalTransactionsAmount"  width="110" label="总交易金额">
			</el-table-column>
			<el-table-column prop="totalTransactionsReceiptIncome"  width="110" label="总收单收益">
			</el-table-column>
			<el-table-column prop="brandFee" label="品牌费">
			</el-table-column>
			<el-table-column prop="receiptIncomeAfterDeductingBrandFee" width="180"  label="扣除品牌费后收单收益">
			</el-table-column>
			<el-table-column prop="companyIncome" label="我司收益">
			</el-table-column>
			<el-table-column prop="thirdPartyIncome" width="110"  label="第三方收益">
			</el-table-column>
			<el-table-column prop="d1ServiceChargeDeducted" width="180"  label="待扣D1服务费（元）">
			</el-table-column>
			<el-table-column prop="thirdPartyActualIncome"  width="170" label="第三方实际收益（元）">
			</el-table-column>
			<el-table-column prop="remark" label="备注">
			</el-table-column>
			<el-table-column prop="transactionsType" label="交易类型">
			</el-table-column>
			<el-table-column prop="propertyOwnerCode" width="110" label="产权方代码">
			</el-table-column>
			<el-table-column prop="propertyOwner" label="产权方">
			</el-table-column>
			<el-table-column prop="shareProfitProportion" label="分润比例">
			</el-table-column>
			<el-table-column prop="shareProfitFormula" label="分润公式">
			</el-table-column>
			<el-table-column prop="dmDevelopingSide" width="110" label="DM发展方">
			</el-table-column>
			
		</el-table>
		<el-pagination background @current-change="handleCurrentChange" :current-page="currentPage"
			:page-sizes="pageSizes" :page-size="PageSize" layout="prev, pager, next" :total="totalCount">
		</el-pagination>
		<!-- 蒙尘 -->
		<el-dialog title="汇总详情" append-to-body :visible.sync="dialogVisible" width="50%">
			<div class="chen">
				<p>月份: {{keyObj.month}}</p>
				<p>拓展渠道: {{keyObj.developChannel}} </p>
				<p>拓展渠道代码: {{keyObj.developChannelCode}} </p>
				<p>分润模式: {{keyObj.shareProfitPattern}} </p>
				<p>项目细分: {{keyObj.project}} </p>
				<p>接入方式: {{keyObj.accessWay}} </p>
				<p>阶梯费率: {{keyObj.tieredRate}} </p>
				<p>商户入网时间: {{keyObj.mchAccessTime}}</p>
				<p>商户名称: {{keyObj.mchName}}</p>
				<p>应用名称: {{keyObj.appName}}</p>
				<p>商户号: {{keyObj.mid}}</p>
				<p>地区代码: {{keyObj.locationCode}}</p>
				<p>地区名称: {{keyObj.location}}</p>
				<p>借记卡扣率: {{keyObj.debitCardDeductionRate}}</p>
				<p>贷记卡扣率: {{keyObj.crebitCardDeductionRate}}</p>
				<p>外卡借记扣率: {{keyObj.wildCardDebitDeductionRate}}</p>
				<p>外卡贷记扣率: {{keyObj.wildCardCrebitDeductionRate}}</p>
				<p>微信扣率: {{keyObj.wechatDeductionRate}}</p>
				<p>支付宝扣率: {{keyObj.alipayDeductionRate}}</p>
				<p>银联二维码借记扣率: {{keyObj.unionpayQrcodeDebitdeductionRate}}</p>
				<p>银联二维码贷记扣率: {{keyObj.UnionpayQrcodeCrebitdeductionRate}}</p>
				<p>千元以下银联二维码交易笔数: {{keyObj.below1000UnionPayQrcodeTransactionsNum}}</p>
				<p>千元以下银联二维码交易金额: {{keyObj.below1000UnionPayQrcodeTransactionsAmount}}</p>
				<p>千元以下银联二维码交易收单收益: {{keyObj.below1000UnionPayQrcodeTransactionsReceiptIncome}}</p>
				<p>千元以上银联二维码交易笔数: {{keyObj.above1000UnionPayQrcodeTransactionsNum}}</p>
				<p>千元以上银联二维码交易金额: {{keyObj.above1000UnionPayQrcodeTransactionsAmount}}</p>
				<p>千元以上银联二维码交易收单收益: {{keyObj.above1000UnionPayQrcodeTransactionsReceiptIncome}}</p>
				<p>总交易笔数: {{keyObj.totalTransactionsNum}}</p>
				<p>总交易金额: {{keyObj.totalTransactionsAmount}}</p>
				<p>总收单收益: {{keyObj.totalTransactionsReceiptIncome}}</p>
				<p>品牌费: {{keyObj.brandFee}}</p>
				<p>扣除品牌费后收单收益: {{keyObj.receiptIncomeAfterDeductingBrandFee}}</p>
				<p>我司收益: {{keyObj.companyIncome}}</p>
				<p>第三方收益: {{keyObj.thirdPartyIncome}}</p>
				<p>待扣D1服务费（元）: {{keyObj.d1ServiceChargeDeducted}}</p>
				<p>第三方实际收益（元）: {{keyObj.thirdPartyActualIncome}}</p>
				<p>备注: {{keyObj.remark}}</p>
				<p>交易类型: {{keyObj.transactionsType}}</p>
				<p>产权方代码: {{keyObj.propertyOwnerCode}}</p>
				<p>产权方: {{keyObj.propertyOwner}}</p>
				<p>分润比例: {{keyObj.shareProfitProportion}}</p>
				<p>分润公式: {{keyObj.shareProfitFormula}}</p>
				<p>DM发展方: {{keyObj.dmDevelopingSide}}</p>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import Payment from '@/components/merchant/Payment.vue'
	import Channel from '@/components/merchant/Channel.vue'
	import {excalqueryall,excalquery} from '@/utils/login.js'
	export default {
		inject: ["reload"],
		data() {
			return {
				tableData: [],
				// 默认显示第几页
				currentPage: 1,
				// 总条数，根据接口获取数据长度(注意：这里不能为空)
				totalCount: 1,
				// 个数选择器（可修改）
				pageSizes: [1, 2, 3, 4],
				// 默认每页显示的条数（可修改）
				PageSize: 10,
				keyObj:{},
				dialogVisible:false
			}
		},
		components: {
			Payment,
			Channel
		},
		created() {
			excalqueryall(1).then(res=>{
				this.tableData=res.data.data
				this.totalCount=res.data.count
			})
		},
		methods: {
			// 详情
			getAddLisy(row){
				this.keyObj=row
				this.dialogVisible=true
			},
			// 显示第几页
			handleCurrentChange(val) {
				
				if(this.$route.query != undefined && this.$route.query.monthdata != ''){
					// 月份查询
					excalquery({
						"get":this.$route.query.monthdata,
						"page":val
						}).then(res=>{
						this.tableData=res.data.data
						this.totalCount=res.data.count
					})
				}else{
					// 全部数据时
					excalqueryall(val).then(res=>{
						this.tableData=res.data.data
					})
				}
				
			}
		},
		watch:{
			$route(n){
				if(n.query != undefined && n.query.monthdata != ''){
					excalquery({
						"get":n.query.monthdata,
						"page":1
						}).then(res=>{
						this.tableData=res.data.data
						this.totalCount=res.data.count
					})
				}else{
					excalqueryall(1).then(res=>{
						this.tableData=res.data.data
						this.totalCount=res.data.count
						this.currentPage=1
					})
				}
				
			},
		}

	}
</script>

<style scoped>
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

	.el-table__row:last-child .downshow,
	.el-table__row:nth-last-child(2) .downshow,
	.el-table__row:nth-last-child(3) .downshow {
		top: -90px;
	}

	.downshow p {
		width: 100%;
		height: 0.906667rem;
		text-align: center;
		line-height: 0.906667rem;
		color: #278DE5;
	}

	.downshow p:last-child {
		color: #E56C6C;
	}

	.el-table::before {
		height: 0;
	}

	:deep(.el-table__row td:last-child) {
		position: relative;
	}

	/* 蒙尘 */
	:deep(.el-dialog) {
		border-radius: 10px !important;
	}

	:deep(.el-dialog__header) {
		border-bottom: 1px solid rgba(196, 196, 196, 0.5);
	}

	.appsecretBtn {
		width: 150px;
		height: 30px;
		border: 0.026667rem solid #278DE5;
		border-radius: 5px;
		background-color: white;
		color: #278DE5;
		margin-left: 50px;
	}

	:deep(.el-input__inner) {
		border-radius: 0.133333rem;
	}

	.el-textarea {
		width: 180px;
		height: 80px;
	}

	.el-form-item__content .el-input {
		width: 70%;
	}
	.inpuyselent .el-input{
		width: 100%;
	}
	.el-form-item{
		width: 50%;
	}

	:deep(.el-form-item__label) {
		width: 150px !important;
	}

/* 蒙尘 */
	:deep(.el-dialog) {
		border-radius: 10px !important;
	}
	
	:deep(.el-dialog__header) {
		border-bottom: 1px solid rgba(196, 196, 196, 0.5);
	}
	.chen{
		width: 100%;
	}
	.chen p{
		font-size: 16px;
	}
	.el-form{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
	.btnbox{
		width: 100%;
		justify-content: center;
	}
	:deep(.btnbox .el-form-item__content){
		margin-left: 0;
		text-align: center;
	}
	.chendiv .el-form-item__content .el-input{
		width: 70%;
	}
	.appsecretBtn {
		width: 150px;
		height: 30px;
		border: 0.026667rem solid #278DE5;
		border-radius: 5px;
		background-color: white;
		color: #278DE5;
		margin-left: 122px;
	}
	:deep(.el-form-item__label){
		width: 90px !important;
	}
	:deep(.el-form-item__error){
		top:100%;
		left: 16px;
	}
	.btn_box{
		margin-top: 50px;
	}
	.datable{
		height: 100%;
	}
	/deep/.el-table--fit{
		height:calc(100% - 150px) !important;
	}
	/* .el-table--scrollable-x .el-table__body-wrapper */
	/* /deep/.el-table{
		overflow: scroll !important;
	} */
	/deep/.el-table .cell{
		height: 30px;
		white-space: nowrap;
	}
</style>
