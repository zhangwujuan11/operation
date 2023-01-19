<template>
	<div class="datable">
		<el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
			style="width:100%;padding-bottom: 2.6rem;">
			<el-table-column prop="mchName" label="商户名称">
			</el-table-column>
			<el-table-column prop="mid" label="商户号">
			</el-table-column>
			<el-table-column prop="tid" label="终端号">
			</el-table-column>
			<el-table-column prop="phone" label="手机号">
			</el-table-column>
			<el-table-column prop="channel" label="通道/渠道" :formatter="levellist">
				<!-- <template slot-scope="scope">
					{{options[scope.row.channel - 1].channelName}}
				</template> -->
			</el-table-column>
			<el-table-column width='280' prop="createAt" label="创建日期">
			</el-table-column>
			<el-table-column prop="zip" label="操作">
				<template slot-scope="scope" class="rebox">
					<span @click="modify(scope.row)">修改</span>
					<span style="color: red;" @click="open(scope.row)">删除</span>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination background @current-change="handleCurrentChange" :current-page="currentPage"
			:page-sizes="pageSizes" :page-size="PageSize" layout="prev, pager, next" :total="totalCount">
		</el-pagination>

		<!-- 蒙尘 -->
		<el-dialog title="修改商户配置" append-to-body :visible.sync="dialogVisible" width="50%">
			<div class="chen">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="商户名称" prop="mchName">
						<el-input v-model="ruleForm.mchName"></el-input>
					</el-form-item>
					<el-form-item label="商户号" prop="mid">
						<el-input :disabled="true" v-model="ruleForm.mid"></el-input>
					</el-form-item>
					<el-form-item label="终端号" prop="tid">
						<el-input :disabled="true" v-model="ruleForm.tid"></el-input>
					</el-form-item>
					<el-form-item label="通道/渠道" prop="channel">
						<el-select class="inpuyselent" v-model="ruleForm.channel" placeholder="请选择">
							<el-option v-for="(item,index) in options" :key="index" :label="item.channelName" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="手机号" prop="phone">
				 	<el-input v-model="ruleForm.phone"></el-input>
					</el-form-item>
					 <p class="btn_box">
						 <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
					 </p>
				</el-form>
			</div>
		</el-dialog>



		<!-- 支付配置 -->
		<el-dialog append-to-body :visible.sync="paymentVisible" width="45%" height='80%' custom-class="paymentdialog">
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
		</el-dialog>
	</div>
</template>

<script>
	import Payment from '@/components/merchant/Payment.vue'
	import Channel from '@/components/merchant/Channel.vue'
	import {mahinfoserchall,channelinfo,mahinfoserch,mahinfoupdata,mahinfodel} from '@/utils/mchinfo.js'
	// import {
	// 	mchApps,
	// 	delapp,
	// 	putapp,
	// 	infoApp
	// } from '@/utils/merchant.js'
	export default {
		inject: ["reload"],
		data() {
			var validateappavatar = (rule, value, callback) => {
				let sig=/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
			  if (!sig.test(this.ruleForm.phone)) {
			    callback(new Error('手机格式错误'))
			  }
			  callback()
			}
			return {
				tableData: [],
				dialogVisible: false,
				ruleForm: {
					mchName:'',
					mid: '',
					tid: '',
					channel: '',
					phone: ''
				},
				rules: {
					mchName: [{
							required: true,
							message: '请输入商户名称',
							trigger: 'blur'
						}],
					mid: [{
						required: true,
						message: '请输入商户号',
						trigger: 'blur'
					}],
					tid: [{
						required: true,
						message: '请输入终端号',
						trigger: 'blur'
					}],
					channel: [{
						required: true,
						message: '请选择渠道/通道',
						trigger: 'blur'
					}],
					phone: [{
						required: true,
						validator: validateappavatar,
						trigger: 'blur'
					}],
				},
				// 支付配置
				paymentVisible: false,
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
			// 所有未删除商户
			mahinfoserchall().then(res=>{
				this.tableData=res.data.data
			})
			// 渠道
			channelinfo().then(res=>{
				this.options=res.data.data
				// console.log(res.data.data)
			})
			this.$nextTick(()=>{
				this.getData()
			})
		},
		methods: {
			levellist(row,index){
				for(var i=0;i<this.options.length;i++){
					if(row.channel == this.options[i].id){
						return this.options[i].channelName
					}
				}
			},
			// 支付配置
			configuration(n) {
				this.paymentVisible = true
				this.paycode=n
			},
			// 修改
			modify(n) {
				this.dialogVisible = true
				mahinfoserch({mid:n.mid,tid:n.tid}).then(res=>{
					this.ruleForm=res.data.data[0]
					this.ruleForm.channel=Number(this.ruleForm.channel)
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
			},
			// 删除
			open(n) {
				this.$confirm('确认删除？', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					n.isDel=1
					mahinfodel(n).then(res => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						})
						this.reload()
					})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			// 修改应用
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						mahinfoupdata(this.ruleForm).then(res=>{
							this.$message.success('修改成功')
							this.dialogVisible=false
							this.reload()
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
