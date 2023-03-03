<template>
	<div class="datable">
		<el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
			style="width:100%;padding-bottom: 2.6rem;">
			<el-table-column prop="percentage" label="服务商收益百分比">
				<template slot-scope="scope" class="rebox">
					{{scope.row.percentage}}%
				</template>
			</el-table-column>
			<el-table-column prop="yield_id" label="百分比ID">
			</el-table-column>
			<el-table-column prop="create_at" label="创建时间">
			</el-table-column>
			<el-table-column prop="zip" label="操作">
				<template slot-scope="scope" class="rebox">
					<span @click="modify(scope.row)">修改</span>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination background @current-change="handleCurrentChange" :current-page="currentPage"
			:page-sizes="pageSizes" :page-size="PageSize" layout="prev, pager, next" :total="totalCount">
		</el-pagination>

		<!-- 蒙尘 -->
		<el-dialog title="修改服务商收益百分比配置" append-to-body :visible.sync="dialogVisible" width="30%">
			<div class="chen">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="百分比" type="number" prop="percentage">
						<el-input v-model="ruleForm.percentage"></el-input> &emsp; %
					</el-form-item>
					 <p class="btn_box">
						 <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
					 </p>
				</el-form>
			</div>
		</el-dialog>



		<!-- 支付配置 -->
		<!-- <el-dialog append-to-body :visible.sync="paymentVisible" width="45%" height='80%' custom-class="paymentdialog">
			<div class="account">
				<el-tabs v-model="activeName">
					<el-tab-pane label="支付参数配置" name="first">
						<Payment :pasend="paycode"></Payment>
					</el-tab-pane>
					<el-tab-pane label="支付通道配置" name="second">
						<Channel :pasend="paycode"></Channel>
					</el-tab-pane>
				</el-tabs>
			</div>
		</el-dialog> -->
	</div>
</template>

<script>
	import Payment from '@/components/merchant/Payment.vue'
	import Channel from '@/components/merchant/Channel.vue'
	import {yieldqueryall,yieldupdata} from '@/utils/mchinfo.js'
	
	export default {
		inject: ["reload"],
		filters: {
			toChinese(e) {
				if (e == 0) {
					return '停用'
				} else if (e == 1) {
					return '启用'
				}
			}
		},
		data() {
			var validateappavatar = (rule, value, callback) => {
				let sig=/^\d\.([1-9]{1,2}|[0-9][1-9])$|^[1-9]\d{0,1}(\.\d{1,2}){0,1}$|^100(\.0{1,2}){0,1}$/
			  if (!sig.test(this.ruleForm.percentage)) {
			    callback(new Error('百分比格式错误'))
			  }
			  callback()
			}
			return {
				tableData: [],
				dialogVisible: false,
				ruleForm: {
				},
				rules: {
					percentage: [{
						required: true,
						validator: validateappavatar,
						trigger: 'blur'
					}]
				},
				// 支付配置
				// paymentVisible: false,
				activeName: 'first',
				// 默认显示第几页
				currentPage: 1,
				// 总条数，根据接口获取数据长度(注意：这里不能为空)
				totalCount: 1,
				// 个数选择器（可修改）
				pageSizes: [1, 2, 3, 4],
				// 默认每页显示的条数（可修改）
				PageSize: 8,
				paycode:'',
				options:[]
			}

		},
		components: {
			Payment,
			Channel
		},
		created() {
			yieldqueryall().then(res=>{
				this.tableData=res.data.data
			})
			this.$nextTick(()=>{
				this.getData()
			})
		},
		methods: {
			// 支付配置
			configuration(n) {
				this.paymentVisible = true
				this.paycode=n
			},
			// 修改
			modify(n) {
				this.dialogVisible = true
				this.ruleForm=n
				console.log(n)
			},
			// 分页
			getData() {
				this.totalCount = this.tableData.length
			},
			// 显示第几页
			handleCurrentChange(val) {
				// 改变默认的页数
				this.currentPage = val
			},
			
			// 修改应用
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						yieldupdata(this.ruleForm).then(res=>{
							this.$message.success('修改成功')
							this.dialogVisible=false
						}).catch(()=>{
							this.$message.error('修改失败，请重试')
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
		},
		watch:{
			// $route(n){
			// 	this.getdataList(n.query)
			// },
			tableData(){
				this.getData()
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
	.chendiv{
		width: 50%;
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
</style>
