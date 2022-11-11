<template>
	<div class="maincon">
		<Travelpermit>
			<div slot="travel">
				主页 / 支付配置 / 支付方式
			</div>
		</Travelpermit>
		<div class="infobox">
			<div class="inputBox">
				<el-input v-model="myFrom.wayCode" placeholder="支付方式代码"></el-input>
				<el-input v-model="myFrom.wayName" placeholder="支付方式名称"></el-input>
			</div>
			<div class="btnbox">
				<el-button type="primary" @click="serchdata">查询</el-button>
				<el-button @click="resetForm()">重置</el-button>
				<el-button type="primary" @click="dialogVisible=true">新建</el-button>
			</div>
			<Table></Table>
		</div>
		<!-- 蒙尘 -->
		<el-dialog title="新增支付接口" append-to-body :visible.sync="dialogVisible" width="520px">
			<div class="chen">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				  <el-form-item label="接口代码" prop="wayCode" >
				    <el-input v-model="ruleForm.wayCode"></el-input>
				  </el-form-item>
				  <el-form-item label="接口名称" prop="wayName">
				    <el-input v-model="ruleForm.wayName"></el-input>
				  </el-form-item>
				  <div style="width: 100%;">
					  <el-form-item>
					  	<el-button>取消</el-button>
					    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
					  </el-form-item>
				  </div>
				 
				</el-form>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import Travelpermit from '@/components/Travelpermit.vue'
	import Table from '@/components/configuration/Paymentable.vue'
	import {addpayWay} from '@/utils/configuration.js'
	export default{
		inject:["reload"],
		components:{
			Travelpermit,
			Table
		},
		data(){
			return{
				myFrom:{
					wayCode:'',
					wayName:''
				},
				dialogVisible:false,
				ruleForm: {
					wayCode:'',
					wayName:''
				},
				rules: {
					wayCode: [{
						required: true,
						message: '请输入支付方式代码',
						trigger: 'blur'
					}],
					wayName: [{
						required: true,
						message: '请输入支付方式名称',
						trigger: 'blur'
					}]
				}
			}
		},
		methods:{
			// 重置
			resetForm(){
				 Object.assign(this.$data.myFrom, this.$options.data().myFrom)
			},
			// 查询
			serchdata(){
				this.$router.push({
					path:'/configuration/paymentmethod',
					query:this.myFrom
				})
			},
			// 新建
			submitForm(formName) {
			       this.$refs[formName].validate((valid) => {
			         if (valid) {
			           addpayWay(this.ruleForm).then(res=>{
							this.$message.success(res.data.msg);
							this.reload()
			           })
			         } else {
			           console.log('error submit!!');
			           return false;
			         }
			       });
			     },
		}
	}
</script>
<style scoped>
	.inputBox{
		width: 100%;
		display: flex;
		justify-content: left;
		flex-wrap: wrap;
	}
	.el-input , .el-select{
		width: 250px;
		margin-right: 20px;
		height: 40px;
		margin-bottom: 30px;
	}
	.btnbox{
		margin-top: 30px;
		margin-bottom: 30px;
	}
	.el-button{
		margin-right: 30px;
	}
	.block{
		margin-right: 20px;
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
		flex-direction: column;
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
		margin-left: 25px;
	}
	:deep(.el-form-item__label){
		width: 97px !important;
	}
	:deep(.el-form-item__error){
		top: 60%;
	}
</style>