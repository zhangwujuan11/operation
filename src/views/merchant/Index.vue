<template>
	<div class="maincon">
		<Travelpermit></Travelpermit>
		<div class="infobox">
			<div class="inputBox">
				<el-form :model="myfrom" ref="myfrom" class="demo-ruleForm">
					<el-form-item>
						<el-input placeholder="输入应用APPID" v-model="myfrom.appId"></el-input>
					</el-form-item>
				<el-form-item>
					<el-input placeholder="输入应用名称"  v-model="myfrom.appName"></el-input>
				</el-form-item>
				<el-form-item>
					<el-select v-model="myfrom.state" placeholder="应用状态">
					   <el-option
					     v-for="item in options"
					     :key="item.value"
					     :label="item.label"
					     :value="item.value">
					   </el-option>
					 </el-select>
				</el-form-item>
				<div class="btnbox">
					<el-button type="primary" @click="gomerchangIndex(myfrom)">查询</el-button>
					<el-button @click="resetForm()">重置</el-button>
					<el-button type="primary" @click="dialogVisible=true">新建</el-button>
				</div>
				</el-form>
			</div>
			
			<Table></Table>
		</div>
		<!-- 蒙尘 -->
		<el-dialog title="新增应用" append-to-body :visible.sync="dialogVisible" width="50%">
			<div class="chen">
				<el-form  :model="ruleForm"  @submit.native.prevent :rules="rules" ref="ruleForm"
					label-width="100px" class="demo-ruleForm">
					<div class="chendiv">
						<el-form-item label="商户号" prop="mchNo">
							<el-input type="text" v-model="ruleForm.mchNo" placeholder='请输入商户号'></el-input>
						</el-form-item>
						<el-form-item label="应用名称" prop="appName">
							<el-input type="text" v-model="ruleForm.appName" placeholder='输入应用名称'></el-input>
						</el-form-item>
						<el-form-item label="私钥AppSecret" prop="appSecret" style="margin-bottom: 0;">
							<el-input type="text" v-model="ruleForm.appSecret" placeholder='生成私钥' ></el-input>
						</el-form-item>
						<button class="appsecretBtn" @click="appsecretBtn"><i class="el-icon-document-add"></i> 随机生成私钥</button>
					</div>
					<div class="chendiv">
						<el-form-item label="状态">
							<el-radio-group size="small" v-model="ruleForm.state">
								<el-radio :label="0">停用</el-radio>
								<el-radio :label="1">启用</el-radio>
							</el-radio-group>
						</el-form-item>
						
						<el-form-item label="备注">
							<el-input type="textarea" style="width: 80%;" :rows="3" placeholder="请输入备注信息" v-model="ruleForm.remark">
							</el-input>
						</el-form-item>
					</div>
					<div class="btnbox">
						<el-form-item>
							<el-button @click="dialogVisible=false">取消</el-button>
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
	import Table from '@/components/merchant/Indextable.vue'
	import {newbulidapps} from '@/utils/merchant.js'
	
	export default{
		inject:["reload"],
		components:{
			Travelpermit,
			Table
		},
		data(){
			return{
				options: [],
				myfrom:{
					appId: '',
					appName:'',
					state:null
				},
				dialogVisible:false,
				ruleForm: {
					appName: '',
					appSecret: '',
					mchNo:'',
					remark: '',
					state: 1
				},
				rules: {
					appName: [{required: true,message: '请输入应用名称',trigger: 'blur'}],
					mchNo:[{required: true,message: '请输入商户号',trigger: 'blur'}],
					appSecret:[{required: true,message: '请生成应用私钥',trigger: 'blur'}]
				},
			}
		},
		methods:{
			// 提交
			 submitForm(formName) {
			        this.$refs[formName].validate((valid) => {
			          if (valid) {
			            newbulidapps(this.ruleForm).then(res=>{
							if(res.data.code==5000){
								 this.$message.error(res.data.msg);
							}else{
								 this.$message.success(res.data.msg);
								 this.reload()
							}
			            	this.dialogVisible=false
			            })
			          } else {
			            console.log('error submit!!');
			            return false;
			          }
			        });
			      },
			// 重置
			 resetForm() {
					 Object.assign(this.$data.myfrom, this.$options.data().myfrom)
			      },
			  // 生成私钥
			  appsecretBtn(){
				  	let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
					let tempStr=''
				  	for(var i=0; i<32; ++i){
				  		tempStr += chars.charAt(Math.floor(Math.random() * 32 ));
				  	}
					this.ruleForm.appSecret=tempStr
			  },
		  // 查询
		  gomerchangIndex(n){
			  this.$router.push({
				  path:'/merchant/index',
				  query:n
			  })
		  }
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
	}
	.el-button{
		margin-right: 30px;
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
		width: 122px !important;
	}
	:deep(.el-form-item__error){
		top: 60%;
		left: 16px;
	}
</style>