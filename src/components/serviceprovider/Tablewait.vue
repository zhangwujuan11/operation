<template>
	<div class="datable">
		<el-table :data="tableData" style="width:100%;">
			<el-table-column prop="date" label="日期"></el-table-column>
			<el-table-column prop="income" label="分润总金额">
			</el-table-column>
			<el-table-column prop="profit" label="可分得金额">
			</el-table-column>
			<el-table-column prop="status" label="订单状态">
			</el-table-column>
		</el-table>
		<!-- 蒙尘 -->
		<!-- <el-dialog title="修改服务商" append-to-body :visible.sync="dialogVisible" width="50%">
			<div class="chen">
				<el-form :model="ruleForm" status-icon @submit.native.prevent :rules="rules" ref="ruleForm"
					label-width="100px" class="demo-ruleForm">
					<div class="chendiv">
						<el-form-item label="服务商名称" prop="isv_name">
							<el-input type="text" v-model="ruleForm.isv_name" placeholder='输入商户名称'></el-input>
						</el-form-item>
						<el-form-item label="服务商简称" prop="isv_short_name">
							<el-input type="text" v-model="ruleForm.isv_short_name" placeholder='输入商户简称'></el-input>
						</el-form-item>
						<el-form-item label="联系人手机号" prop="contact_tel">
							<el-input type="text" v-model="ruleForm.contact_tel" placeholder='输入联系人手机号'></el-input>
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
						<el-form-item label="联系人姓名" prop="contact_name">
							<el-input type="text" v-model="ruleForm.contact_name" placeholder='输入联系人姓名'></el-input>
						</el-form-item>
						<el-form-item label="联系人邮箱" prop="contact_email">
							<el-input type="text" v-model="ruleForm.contact_email" placeholder='输入联系人邮箱'></el-input>
						</el-form-item>
						<el-form-item label="等级" prop="isv_level">
							<el-select placeholder="等级" v-model="ruleForm.isv_level">
							    <el-option
							      v-for="(item,index) in levels"
							      :key="index"
							      :label="item.isv_level_name"
							      :value="item.isv_level">
							    </el-option>
							</el-select>
						</el-form-item>
						<el-form-item v-if="ruleForm.isv_level == 2" label="服务商隶属" prop="isv_vassalage">
							<el-select placeholder="服务商隶属" v-model="ruleForm.isv_vassalage">
							    <el-option
							      v-for="(item,index) in vassalage"
							      :key="index"
							      :label="item.contact_name"
							      :value="item.isv_no">
							    </el-option>
							</el-select>
						</el-form-item>
					</div>
					<div class="btnbox">
						<el-form-item>
							<el-button type="primary" @click="savechange('ruleForm')">保存</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</el-dialog> -->
		
		<!-- 支付配置 -->
		<!-- <el-dialog append-to-body :visible.sync="paymentVisible" title="支付参数列表"  width="45%" custom-class="paymentdialog">
			<Payment :pasend="paycode"></Payment>
		</el-dialog> -->
	</div>
</template>

<script>
	import Payment from '@/components/serviceprovider/Payment.vue'
	import {serviceprovilist} from '@/utils/serviceprovider.js'
	export default {
		inject: ["reload"],
		
		components:{
			Payment
		},
		data() {
			return{
				tableData:[]
			}
		},
		created() {
			serviceprovilist().then(res=>{
				let arry1=res.data.data.right
				arry1?.map((item,index)=>{
					Object.assign(item,{"status":"待提现"})
				})
				this.tableData=arry1
				let arry2=res.data.data.wrong
				arry2 ?.map((item,index)=>{
					Object.assign(item,{"status":"有异议"})
				
				})
				// console.log(arry2)
				if(arry1 !=undefined && arry2 !=undefined){
					this.tableData=arry1?.concat(arry2)
				}else if(arry1 !=undefined && arry2 ==undefined){
					this.tableData=arry1
				}else if(arry1 ==undefined && arry2 !=undefined)
				this.tableData=arry2
			})
		},
		methods:{
			chekfun(){
				this.$message.success("已提交，请留意手机提现信息")
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
