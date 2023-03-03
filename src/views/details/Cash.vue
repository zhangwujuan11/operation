<template>
	<div class="maincon">
		<Travelpermit>
			<div slot="travel">
				商户管理 / 信息配置 / 服务商收益提现
			</div>
		</Travelpermit>
		<div class="infobox">
			<template>
				<div class="datable">
					<el-table :data="tableData" style="width:100%;padding-bottom: 2.6rem;">
						<el-table-column prop="isv_no" label="服务商名称" :formatter="sfktHouse">
						</el-table-column>
						<el-table-column prop="status" label="提现状态">
						</el-table-column>
						<el-table-column prop="profit" label="提现金额">
						</el-table-column>
						<el-table-column prop="date" label="提现月份">
						</el-table-column>
						<el-table-column prop="zip" label="操作">
							<template slot-scope="scope" class="rebox">
								<span @click="open(scope.row)">详情</span>
							</template>
						</el-table-column>
					</el-table>
					<!-- <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage"
						:page-sizes="pageSizes" :page-size="PageSize" layout="prev, pager, next" :total="totalCount">
					</el-pagination> -->
					<!-- 蒙尘 -->
					<el-dialog title="分润单详情" append-to-body :visible.sync="dialogVisible" width="30%">
						<div class="chen">
							<p>服务商名称: {{obj.isvname}}</p>
							<p> 服务商名下商户总收益： ￥{{obj.income}}</p>
							<p>服务商可分得金额： ￥{{obj.profit}}</p>
							<p>提现月份: {{obj.date}}</p>
							<p>
								<el-upload v-if="obj.status == '待提现'" class="upload-demo" action="#" :limit='1'
									:before-upload="beforeAvatarUpload" :on-exceed="overflod" :file-list="imglist"
									:http-request="uploadToCos">
									<el-button type="primary">确认</el-button>
								</el-upload>
							<p v-if="obj.status == '有异议'">
								<el-input v-model="paynum" class="statuswrongs" placeholder="请输入修正金额"></el-input>
								<el-upload class="upload-demo" action="#" :limit='1'
									:before-upload="beforeAvatarUpload" :on-exceed="overflod" :file-list="imglist"
									:http-request="uploadToCost">
									<el-button class="statuswrong" type="primary">确认</el-button>
								</el-upload>
								<!-- <el-button type="primary" @click="changecash()">确认</el-button> -->
								<span class="errmsg" v-if="errmsg">请正确输入金额</span>
							</p>
							<el-button type="danger" @click="disprovider">驳回</el-button>
							</p>
						</div>
					</el-dialog>
				</div>
			</template>
		</div>
		<!-- 蒙尘 -->
	</div>
</template>

<script>
	import Travelpermit from '@/components/Travelpermit.vue'
	import Payment from '@/components/serviceprovider/Payment.vue'
	import {
		providerall,
		uploadimg,
		providerwrong,
		provideright,
		changecash,
		rejected
	} from '@/utils/serviceprovider.js'
	import {
		isvc
	} from '@/utils/merchant.js'
	import {
		putObjects
	} from '@/assets/js/upload.js'
	export default {
		inject: ["reload"],
		components: {
			Payment,
			Travelpermit
		},
		data() {
			return {
				tableData: [],
				isv: [],
				dialogVisible: false,
				obj: {},
				imglist: [],
				newList: [],
				paynum: null,
				errmsg: false
			}
		},
		created() {
			providerall().then(res => {
				let arry1 = res.data.data
				arry1.map((item, index) => {
					Object.assign(item, {
						"status": "待提现"
					})
				})
				console.log(arry1)
				providerwrong().then(ress => {
					let arry2 = ress.data.data
					arry2.map((item, index) => {
						Object.assign(item, {
							"status": "有异议"
						})
					})
					this.tableData = [...arry1, ...arry2]
				})

			})
			isvc().then(res => {
				this.isv = res.data.data
			})
		},
		methods: {
			sfktHouse(row, index) {
				for (var i = 0; i < this.isv.length; i++) {
					if (row.service_provider == this.isv[i].isv_no) {
						return this.isv[i].isv_name
					}
				}
			},
			open(n) {
				this.obj = n
				for (var i = 0; i < this.isv.length; i++) {
					if (n.service_provider == this.isv[i].isv_no) {
						this.obj.isvname = this.isv[i].isv_name
					}
				}
				this.dialogVisible = true
			},
			// 上传图片
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file
					.type === 'image/gif'
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传二维码图片只能是 JPG/PNG/JPEG/GIF 格式!');
					this.progressFlag = false;
				}
				if (!isLt2M) {
					this.$message.error('上传二维码图片大小不能超过 2MB!');
					this.progressFlag = false;
				}
				return isJPG && isLt2M;
			},
			// 移除
			handleRemove(file) {
				const index = this.imglist.findIndex(item => item.uid === file.uid)
				this.imglist.splice(index, 1) //移除已上传的图片0
				this.newList.splice(index, 1)
			},
			overflod() {
				this.$alert('只允许上传一张图片，如需更换请先删除', {
					confirmButtonText: '确定',
				})
			},
			uploadToCos(fel) {
				this.imglist.push(fel.file)
				let nnewList = []
				putObjects(fel.file.name, fel.file).then(res => {
					let qrimg = 'https://' + res.Location
					nnewList.push(qrimg)
					// return nnewList
					uploadimg({
						service_provider: this.obj.service_provider,
						date: this.obj.date,
						url: nnewList[0]
					}).then(res => {
						this.$message.success('提现完成')
						this.dialogVisible = false
						this.reload()
					}).catch(() => {
						this.$message.success('提现失败')
					})
				})
				this.newList = nnewList
			},

			disprovider() {
				rejected({
					date: this.obj.date,
					status: 'rejected',
					isv: this.obj.service_provider
				}).then(res => {
					this.$message.error('驳回成功')
					this.reload()
				}).catch(() => {
					this.$message.error('驳回失败')
				})
			},
			uploadToCost(fel) {
				let reg = /[0-9]/
				if (reg.test(this.paynum)) {
					this.errmsg = false
					changecash({
						date:this.obj.date,
						profit:this.paynum,
						isv:this.obj.service_provider
					}).then(()=>{
						this.imglist.push(fel.file)
						let nnewList = []
						putObjects(fel.file.name, fel.file).then(res => {
							let qrimg = 'https://' + res.Location
							nnewList.push(qrimg)
							// return nnewList
							uploadimg({
								service_provider: this.obj.service_provider,
								date: this.obj.date,
								url: nnewList[0]
							}).then(res => {
								this.$message.success('提现完成')
								this.dialogVisible = false
								this.reload()
							}).catch(() => {
								this.$message.success('提现失败')
							})
						})
						this.newList = nnewList
					})
					
				} else {
					this.imglist=[]
					this.newList=[]
					this.errmsg = true
					return false
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

	.inpuyselent .el-input {
		width: 100%;
	}

	.el-form-item {
		width: 70%;
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

	.chen {
		width: 100%;

	}

	.chendiv {
		width: 50%;
	}

	.el-form {
		width: 100%;
		display: flex;
		flex-direction: column;
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
		margin-left: 122px;
	}

	:deep(.el-form-item__label) {
		width: 100px !important;
	}

	:deep(.el-form-item__error) {
		top: 100%;
		left: 16px;
	}

	.btn_box {
		text-align: center;
	}

	/* 上传图片 */
	/deep/ .upload-demo {
		margin-bottom: 10px;
	}

	.statuswrong {
		margin-top: 10px;
	}
.statuswrongs{
	width: 30%;
	
}
	.errmsg {
		color: red;
		margin-left: 10px;
	}
</style>
