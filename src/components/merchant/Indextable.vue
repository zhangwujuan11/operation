<template>
	<div class="datable">
		<el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
			style="width:100%;padding-bottom: 2.6rem;">
			<el-table-column prop="appId" label="应用APPID">
			</el-table-column>
			<el-table-column prop="appName" label="应用名称">
			</el-table-column>
			<el-table-column prop="state" label="状态">
				<template slot-scope="scope">
					{{scope.row.state | toChinese}}
				</template>
			</el-table-column>
			<el-table-column prop="createdAt" label="创建日期">
			</el-table-column>
			<el-table-column prop="zip" label="操作">
				<template slot-scope="scope" class="rebox">
					<span @click="modify(scope.row.appId)">修改</span>
					<span @click="configuration(scope.row.appId)">支付配置</span>
					<span style="color: red;" @click="open(scope.row.appId,scope.$index)">删除</span>
					<!-- <div class="downshow" v-if="scope.row.downshow">
						<p>支付测试</p>
						<p>发起转账</p>
						<p @click="open(scope.row.appId,scope.$index)">删除</p>
					</div> -->
				</template>
			</el-table-column>
		</el-table>
		<el-pagination background @current-change="handleCurrentChange" :current-page="currentPage"
			:page-sizes="pageSizes" :page-size="PageSize" layout="prev, pager, next" :total="totalCount">
		</el-pagination>

		<!-- 蒙尘 -->
		<el-dialog title="修改应用" append-to-body :visible.sync="dialogVisible" width="50%">
			<div class="chen">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<div class="chendiv">
						<el-form-item label="应用APPID" prop='appId'>
							<el-input type="text" v-model="ruleForm.appId" placeholder='输入应用APPID' disabled></el-input>
						</el-form-item>
						<el-form-item label="商户号" prop='mchNo'>
							<el-input type="text" v-model="ruleForm.mchNo" placeholder='输入商户号' disabled></el-input>
						</el-form-item>
						<el-form-item label="应用名称" prop="appName">
							<el-input type="text" v-model="ruleForm.appName" placeholder='输入应用名称'></el-input>
						</el-form-item>
						<el-form-item label="私钥AppSecret" prop="appSecret">
							<el-input  type="text" v-model="ruleForm.appSecret" placeholder='生成私钥'  maxlength="40" ></el-input>
							<button class="appsecretBtn" @click="appsecretBtn">随机生成私钥</button>
						</el-form-item>
					</div>
					<div class="chendiv">
						<el-form-item label="状态" prop="state">
							<el-radio-group size="small" v-model="ruleForm.state">
								<el-radio :label="0">停用</el-radio>
								<el-radio :label="1">启用</el-radio>
							</el-radio-group>
						</el-form-item>

						<el-form-item label="备注" prop="remark">
							<el-input type="textarea" :rows="3" placeholder="请输入备注信息" v-model="ruleForm.remark">
							</el-input>
						</el-form-item>
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
	import {
		mchApps,
		delapp,
		putapp,
		infoApp
	} from '@/utils/merchant.js'
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
			return {
				tableData: [],
				dialogVisible: false,
				ruleForm: {
					appName: '',
					appSecret: '',
					mchNo: '',
					remark: '',
					state: 1,
					appId: ''
				},
				rules: {
					appId: [{
						required: true,
						message: '请输appId',
						trigger: 'blur'
					}],
					appName: [{
						required: true,
						message: '请输入应用名称',
						trigger: 'blur'
					}],
					mchNo: [{
						required: true,
						message: '请输入商户号',
						trigger: 'blur'
					}],
					appSecret: [{
						required: true,
						message: '请生成应用私钥',
						trigger: 'blur'
					}]
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
				PageSize: 5,
				paycode:''
			}

		},
		components: {
			Payment,
			Channel
		},
		created() {
			this.getdataList(this.$route.query)
			this.$nextTick(()=>{
				this.getData()
			})
		},
		methods: {
			getdataList(n){
				mchApps(n).then(res => {
					this.tableData = res.data.data.records
				})
			},
			// morepaye(n) {
			// 	for (var i = 0; i < this.tableData.length; i++) {
			// 		if (i == n) {
			// 			this.tableData[n].downshow = !this.tableData[n].downshow
			// 		} else {
			// 			this.tableData[i].downshow = false
			// 		}
			// 	}
			// },
			// 支付配置
			configuration(n) {
				this.paymentVisible = true
				this.paycode=n
			},
			// 修改
			modify(n) {
				this.dialogVisible = true
				infoApp(n).then(res=>{
					this.ruleForm=res.data.data
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
			open(n, i) {
				this.$confirm('确认删除？', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					delapp(n).then(res => {
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
						putapp(this.ruleForm).then(res => {
							this.$message.success(res.data.msg);
							this.reload()
							this.dialogVisible = false
						}).catch(err => {
							this.$message.error("失败");
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			// 生成私钥
			appsecretBtn() {
				let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
				let tempStr = ''
				for (var i = 0; i < 32; ++i) {
					tempStr += chars.charAt(Math.floor(Math.random() * 32));
				}
				this.ruleForm.appSecret = tempStr
			}
		},
		watch:{
			$route(n){
				this.getdataList(n.query)
			},
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

	:deep(.el-form-item__error) {
		left: 50px;
	}
	input{
		text-overflow: string !important;
	}
</style>
