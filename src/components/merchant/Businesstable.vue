<template>
	<div class="datable">
		<el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" style="width:100%;padding-bottom: 2.6rem;">
			<el-table-column prop="mchName" label="商户名称">
			</el-table-column>
			<el-table-column prop="mchNo" label="商户号">
			</el-table-column>
			<el-table-column prop="mchShortName" label="服务商号">
			</el-table-column>
			<el-table-column prop="state" label="状态">
				<template slot-scope='scope'>
					{{scope.row.state | mupsstate}}
				</template>
			</el-table-column>
			<el-table-column prop="type" label="商户类型">
				<template slot-scope='scope'>
					{{scope.row.type | mupstype}}
				</template>
			</el-table-column>
			<el-table-column width='280' prop="createdAt" label="创建日期">
			</el-table-column>
			<el-table-column prop="zip" label="操作">
				<template slot-scope="scope" class="rebox">
					<span @click="modify(scope.row.mchNo)">修改</span>
					<span @click="configuration(scope.row.mchNo)">应用配置</span>
					<span style="color: red;" @click="open(scope.row.mchNo,scope.$index)">删除</span>
					<!-- <div class="downshow" v-if="scope.row.downshow">
						<p>支付测试</p>
						<p>发起转账</p>
						<p @click="open(scope.row.mchNo,scope.$index)">删除</p>
					</div> -->
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
		<el-dialog title="修改商户" append-to-body :visible.sync="dialogVisible" width="50%">
			<div class="chen">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm"
					label-width="100px" class="from-wrapper">
					<div class="chendiv">
						<el-form-item label="商户名称" prop="mchName">
							<el-input type="text" v-model="ruleForm.mchName" placeholder='输入商户名称'></el-input>
						</el-form-item>
						<el-form-item label="商户简称" prop="mchShortName">
							<el-input type="text" v-model="ruleForm.mchShortName" placeholder='输入商户简称'></el-input>
						</el-form-item>
						<el-form-item label="联系人邮箱"  prop="contactEmail">
							<el-input type="text" v-model="ruleForm.contactEmail" placeholder='输入联系人邮箱'></el-input>
						</el-form-item>
					</div>
					<div class="chendiv">
						<el-form-item label="登录名" prop="loginUserName">
							<el-input type="text" v-model="ruleForm.loginUserName" disabled></el-input>
						</el-form-item>
						<el-form-item label="联系人姓名" prop="contactName">
							<el-input type="text" v-model="ruleForm.contactName" placeholder='输入联系人姓名'></el-input>
						</el-form-item>
						<el-form-item label="联系人手机号" prop="contactTel">
							<el-input type="text" v-model="ruleForm.contactTel" placeholder='输入联系人手机号' disabled></el-input>
						</el-form-item>
						<el-form-item label="状态" prop="state">
							<el-radio-group size="small" v-model="ruleForm.state">
								<el-radio :label="0">停用</el-radio>
								<el-radio :label="1">启用</el-radio>
							</el-radio-group>
						</el-form-item>
					</div>
					<el-form-item label="备注"  style="width: 100%;" prop="remark">
						<el-input style="width: 80%;" type="textarea" :rows="3" placeholder="请输入备注信息" v-model="ruleForm.remark">
						</el-input>
					</el-form-item>
					
						<div style="width: 100%;">
						  <p class="accou">账户安全</p>
						  <div class="savediv">
							 <el-form-item label="重置密码:" prop="resetPass">
								<el-checkbox v-model="ruleForm.resetPass"></el-checkbox>
							 </el-form-item>
							 <el-form-item label="恢复默认密码:" v-if="ruleForm.resetPass" key="defaultPass"  prop="defaultPass">
								<el-checkbox v-model="ruleForm.defaultPass"></el-checkbox>
							 </el-form-item>
						  </div>
						
							<el-form-item  v-if="!ruleForm.defaultPass && ruleForm.resetPass" label="新密码" prop="confirmPwd" key='confirmPwd'>
								<br />
								<el-input show-password  v-model="ruleForm.confirmPwd" placeholder="请输入新密码"></el-input>
								<br />
								<el-input style="margin-top: 5px;" show-password v-model="ruleForm.checkPass" placeholder="请确认密码"></el-input>
							</el-form-item>
							<!-- <el-form-item  v-if="!ruleForm.defaultPass && ruleForm.resetPass" label="确认密码" prop="checkPass" key="checkPass">
								
							</el-form-item> -->
						</div>
					<div class="btnbox">
						<el-form-item>
							<el-button>取消</el-button>
							<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</el-dialog>
		
		
		
		<!-- 支付配置 -->
		<el-dialog append-to-body :visible.sync="paymentVisible" width="45%" custom-class="paymentdialog">
			<div class="account">
				<el-tabs v-model="activeName">
					<el-tab-pane label="支付参数配置" name="first">
						<Payment></Payment>
					</el-tab-pane>
					<el-tab-pane label="支付通道配置" name="second">
						<Channel></Channel>
					</el-tab-pane>
				</el-tabs>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import Payment from '@/components/merchant/Payment.vue'
	import Channel from '@/components/merchant/Channel.vue'
	import {mchInfo,delmchInfo,updataInfo,infomch} from '@/utils/merchant.js'
	export default {
		inject:["reload"],
		filters:{
			mupstype(e){
				if(e==1){
					return '普通商户'
				}else if(e==2){
					return '特约商户'
				}
			},
			mupsstate(e){
				if(e==0){
					return '停用'
				}else if(e==1){
					return '启用'
				}
			}
		},
		data() {
			// 表单校验
			// const validatePass = (rule, value, callback) => {
			//   if (this.registerForm.password.length < 8) {
			//     callback(new Error('请输入符合要求的密码'))
			//   }
			//     callback()
			// }
			var validatePass2 = (rule, value, callback) => {
			  if (this.ruleForm.confirmPwd != '' && value == '') {
			    callback(new Error('请再次输入密码'))
			  } else if (value != this.ruleForm.confirmPwd) {
			    callback(new Error('两次输入密码不一致!'))
			  } 
			}
			var validateValue = async(rule, value, callback) => {
				let reg=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
				if(!reg.test(this.ruleForm.contactEmail) && this.ruleForm.contactEmail != ''){
				  callback(new Error('请正确填写邮箱'))
				}
			}
			var validateTel = async(rule, value, callback) => {
				let reg=/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
				if(!reg.test(this.ruleForm.contactTel)){
				  callback(new Error('请输入正确的手机号'))
				}
			}
			return {
				tableData: [],
				dialogVisible: false,
				ruleForm: {
					contactEmail:'',
					contactName:'',
					loginUserName:'',
					contactTel:'',
					mchName:'',
					mchShortName:'',
					remark:'',
					state:1,
					type:1,
					resetPass:false,
					confirmPwd:'',
					defaultPass:true,
					checkPass:''
				},
				
				rules: {
					mchName: [{required: true,message: '请输入商户名称',trigger: 'blur'}],
					loginUserName: [{required: true,message: '请输入登录名',trigger: 'blur'}],
					mchShortName: [{required: true,message: '请输入商户简称',trigger: 'blur'}],
					contactName: [{required: true,message: '请输入联系人',trigger: 'blur'}],
					contactTel: [{required: true,validator:validateTel,trigger: 'blur'}],
					contactEmail: [{validator: validateValue,trigger: 'blur'}],
					confirmPwd: [{required: true,message: '请输入新密码',trigger: 'blur'}],
					checkPass:[{required: true,validator: validatePass2,trigger: 'blur'}]
				},
				checked:false,
				checkedd:false,
				paymentVisible: false,
				activeName: 'first',
				// 默认显示第几页
				currentPage: 1,
				// 总条数，根据接口获取数据长度(注意：这里不能为空)
				totalCount: 1,
				// 个数选择器（可修改）
				pageSizes: [1, 2, 3, 4],
				// 默认每页显示的条数（可修改）
				PageSize:5
			}

		},
		components:{
			Payment,
			Channel
		},
		created() {
			this.morepaye()
			this.$nextTick(()=>{
				this.getData()
			})
		},
		methods: {
			morepaye(n){
				mchInfo(n).then(res=>{
					this.tableData=res.data.data.records
				})
				
			},
			// 提交
			submitForm(formName) {
			       this.$refs[formName].validate((valid) => {
			         if (valid) {
						 if(this.ruleForm.defaultPass){
							this.ruleForm.confirmPwd='' 
						 }else if(this.ruleForm.confirmPwd != '' ){
							 this.ruleForm.defaultPass=false
						 }
						 updataInfo(this.ruleForm).then(res=>{
							 this.$message.success(res.data.msg);
							 this.reload()
						})
			         } else {
			           console.log('error submit!!');
			           return false;
			         }
			       });
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
			
			// 应用配置
			configuration(n) {
				this.$router.push({
					path:'/merchant/index',
					query:{mchNo:n}
				})
			},
			// 修改
			modify(n) {
				infomch(n).then(res=>{
					this.ruleForm=res.data.data
					this.ruleForm.loginUserName=res.data.data.ext.loginUserName
					this.dialogVisible = true
				}).catch(()=>{
					this.$message.error('商户信息出错')
				})
			},
			// 删除
			open(n,i) {
				this.$confirm('确认删除？', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					delmchInfo(n).then(res => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						})
						this.reload()
					})
			
				}).catch(() => {
					// this.tableData[i].downshow= false
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
					
				});
			},
		},
		watch:{
			$route(n){
				this.morepaye(n.query)
			},
			tableData(){
				this.getData()
			}
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
		width: 50%;
	}

	:deep(.el-form-item__label) {
		width: 150px !important;
	}


	/* 支付配置 */
	.account {
		width: 100%;
		background-color: white;
		position: relative;
	}

	:deep(.el-tabs__nav) {
		width: 8.8rem;
		display: flex;
	}

	:deep(.el-tabs__nav-scroll) {
		display: flex;
		justify-content: left;
		width: 80%;
	}

	:deep(.el-tabs__active-bar) {
		height: 0.106667rem;
	}

	:deep(.el-tabs__nav-wrap::after) {
		height: 1px;
	}

	:deep(.el-tabs__item) {
		color: #515151;
	}

	:deep(.paymentdialog .el-dialog__body) {
		padding-top: 0;
	}

	:deep(.paymentdialog .el-dialog__header) {
		border: none;
	}

	:deep(.paymentdialog .el-dialog__header) {
		padding: 24px 20px 10px;
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
	.el-form-item::after{
		width: 100%;
	}
	.savediv{
		width: 80%;
		display: flex;
		justify-content: space-between;
	}
	.accou{
		width: 100px;
		text-align: right;
		padding-right: 12px;
		box-sizing: border-box;
	}
	.savediv .el-form-item{
		display: flex;
		width: 50%;
		justify-content: left;
		align-items: center;
	}
	:deep(.savediv .el-form-item .el-form-item__label){
		width: 200px !important;
	}
	:deep(.savediv .el-form-item__content){
		margin-left: 3px !important;
	}
	:deep(.el-form-item__error){
		left: 55px !important;
	}
</style>
