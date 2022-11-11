<template>
	<div class="datable">
		<el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" style="width:100%;">
			<el-table-column prop="isvName" label="服务商名称" width='250'>
			</el-table-column>
			<el-table-column prop="isvNo" label="服务商号">
			</el-table-column>
			<el-table-column prop="state" label="状态">
				<template slot-scope='scope'>
					{{scope.row.state | state}}
				</template>
			</el-table-column>
			<el-table-column prop="createdAt" label="创建日期">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope='scope'>
					<span class="control" @click="changedata(scope.row.isvNo)">修改</span>
					<span class="control" @click="paycon(scope.row.isvNo)">支付配置</span>
					<span style="color:red;cursor: pointer;" @click="delisinfo(scope.row.isvNo)">删除</span>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination background @current-change="handleCurrentChange" :current-page="currentPage"
			:page-sizes="pageSizes" :page-size="PageSize" layout="prev, pager, next" :total="totalCount">
		</el-pagination>

		<!-- 蒙尘 -->
		<el-dialog title="修改服务商" append-to-body :visible.sync="dialogVisible" width="50%">
			<div class="chen">
				<el-form :model="ruleForm" status-icon @submit.native.prevent :rules="rules" ref="ruleForm"
					label-width="100px" class="demo-ruleForm">
					<div class="chendiv">
						<el-form-item label="服务商名称" prop="isvName">
							<el-input type="text" v-model="ruleForm.isvName" placeholder='输入商户名称'></el-input>
						</el-form-item>
						<el-form-item label="服务商简称" prop="isvShortName">
							<el-input type="text" v-model="ruleForm.isvShortName" placeholder='输入商户简称'></el-input>
						</el-form-item>
						<el-form-item label="联系人手机号" prop="contactTel">
							<el-input type="text" v-model="ruleForm.contactTel" placeholder='输入联系人手机号'></el-input>
						</el-form-item>
						<el-form-item label="备注" prop="remark">
							<el-input type="textarea" :rows="2" placeholder="请输入备注信息" v-model="ruleForm.remark">
							</el-input>
						</el-form-item>
					</div>
					<div class="chendiv">
						<el-form-item label="状态" prop="state">
							<el-radio-group size="small" v-model="ruleForm.state">
								<el-radio :label="0">停用</el-radio>
								<el-radio :label="1">启用</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="联系人姓名" prop="contactName">
							<el-input type="text" v-model="ruleForm.contactName" placeholder='输入联系人姓名'></el-input>
						</el-form-item>
						<el-form-item label="联系人邮箱" prop="contactEmail">
							<el-input type="text" v-model="ruleForm.contactEmail" placeholder='输入联系人邮箱'></el-input>
						</el-form-item>
					</div>
					<div class="btnbox">
						<el-form-item>
							<el-button>取消</el-button>
							<el-button type="primary" @click="savechange('ruleForm')">保存</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</el-dialog>
		
		<!-- 支付配置 -->
		<el-dialog append-to-body :visible.sync="paymentVisible" title="支付参数列表"  width="45%" custom-class="paymentdialog">
			<Payment :pasend="paycode"></Payment>
		</el-dialog>
	</div>
</template>

<script>
	import Payment from '@/components/serviceprovider/Payment.vue'
	import {
		isvInfo,
		delisvInfo,
		updataisvinfo,
		isvInfodata
	} from '@/utils/serviceprovider.js'
	export default {
		inject: ["reload"],
		filters: {
			state(e) {
				if (e == 0) {
					return '停用'
				} else if (e == 1) {
					return '正常'
				}
			}
		},
		components:{
			Payment
		},
		data() {
			//表单校验
			var validateValue = async (rule, value, callback) => {
				let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
				if (!reg.test(this.ruleForm.contactEmail) && this.ruleForm.contactEmail != '') {
					callback(new Error('请输入正确的邮箱'))
				}
			}
			var validateTel = async (rule, value, callback) => {
				let reg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
				if (!reg.test(this.ruleForm.contactTel) && this.ruleForm.contactTel != '') {
					callback(new Error('请正确填写手机号'))
				}
			}
			return {
				tableData: [],
				dialogVisible: false,
				ruleForm: {
					isvName: '',
					state: 1,
					isvShortName: '',
					contactName: '',
					contactTel: '',
					contactEmail: '',
					remark: ''
				},
				rules: {
					isvName: [{
						required: true,
						message: '请输入服务商名称',
						trigger: 'blur'
					}],
					isvShortName: [{
						required: true,
						message: '请输入服务商简称',
						trigger: 'blur'
					}],
					contactTel: [{
						validator: validateTel,
						trigger: 'blur'
					}],
					contactEmail: [{
						validator: validateValue,
						trigger: 'blur'
					}],
				},
				// 默认显示第几页
				currentPage: 1,
				// 总条数，根据接口获取数据长度(注意：这里不能为空)
				totalCount: 1,
				// 个数选择器（可修改）
				pageSizes: [1, 2, 3, 4],
				// 默认每页显示的条数（可修改）
				PageSize: 5,
				// 支付配置
				paymentVisible:false,
				activeName: 'first',
				paycode:''
			}
		},
		created() {
			this.getDatas()
		},
		methods: {
			getDatas(n) {
				isvInfo(n).then(res => {
					this.tableData = res.data.data.records
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
			delisinfo(n) {
				this.$confirm('确认删除？', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					delisvInfo(n).then(res => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						})
						this.reload()
					})
					console.log("444")
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});

				})
			},
			//获取服务商详情
			 changedata(n){
				 this.dialogVisible=true
				 isvInfodata(n).then(res=>{
					 this.ruleForm=res.data.data
				 }).catch(()=>{
					 this.$message.error('服务商信息出错')
				 })
			 },
			// 修改
			savechange(formName) {
			       this.$refs[formName].validate((valid) => {
			         if (valid) {
			         updataisvinfo(this.ruleForm).then(res=>{
						 this.$message.success(res.data.msg);
						 this.reload()
						})
			         } else {
			           console.log('error submit!!');
			           return false;
			         }
			       });
			     },
			 // 支付配置
			 paycon(n){
				 this.paymentVisible=true
				 this.paycode=n
			 }
		},
		watch: {
			$route(n) {
				this.getDatas(n.query)
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


	.el-table::before {
		height: 0;
	}

	.datable {
		height: 450px;
		overflow: hidden;
		overflow-y: scroll;
	}

	.control {
		color: #278DE5;
		cursor: pointer;
		margin-right: 15px;
	}

	/* 蒙尘 */
	:deep(.el-dialog) {
		border-radius: 10px !important;
	}

	:deep(.el-dialog__header) {
		border-bottom: none;
	}

	.chen {
		width: 100%;

	}

	.chendiv {
		width: 50%;
	}

	.el-form {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.btnbox {
		width: 100%;
		justify-content: center;
	}

	:deep(.btnbox .el-form-item__content) {
		margin-left: 0;
		text-align: center;
	}

	.chendiv .el-form-item__content .el-input {
		width: 70%;
	}

	.appsecretBtn {
		width: 150px;
		height: 30px;
		border: 0.026667rem solid #278DE5;
		border-radius: 5px;
		background-color: white;
		color: #278DE5;
		margin-left: 25px;
	}

	.el-table--fit {
		height: 390px;
	}
	
	:deep(.el-dialog__body) {
		padding:24px 20px 10px;
	}
</style>
