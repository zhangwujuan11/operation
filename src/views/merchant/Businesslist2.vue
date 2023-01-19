<template>
	<div class="maincon">
		<Travelpermit>
			<div slot="travel">
				主页 / 商户管理 / 商户列表
			</div>
		</Travelpermit>
		<div class="infobox">
			<div class="inputBox">
				<el-form :model="myfrom" ref="myfrom" class="demo-ruleForm">
				<el-input placeholder="商户号" v-model="myfrom.mchNo"></el-input>
				<el-input placeholder="服务商号" v-model="myfrom.isvNo"></el-input>
				<el-input placeholder="商户名称" v-model="myfrom.mchName"></el-input>
				 <el-select v-model="myfrom.state" placeholder="商户状态">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
				  <el-select v-model="myfrom.type" placeholder="商户类型">
				     <el-option
				       v-for="item in options2"
				       :key="item.value"
				       :label="item.label"
				       :value="item.value">
				     </el-option>
				   </el-select>
				   </el-form>
			</div>
			<div class="btnbox">
				<el-button type="primary" @click="serchcoed(myfrom)">查询</el-button>
				<el-button @click="resetForm()">重置</el-button>
				<el-button type="primary" @click="dialogVisible=true">新建</el-button>
			</div>
			<Table></Table>
		</div>
		<!-- 蒙尘 -->
		<el-dialog title="新增商户" append-to-body :visible.sync="dialogVisible" width="50%">
			<div class="chen">
				<el-form :model="ruleForm"  :rules="rules" ref="ruleForm"
					label-width="100px" class="demo-ruleForm">
					<div class="chendiv">
						<el-form-item label="商户名称" prop="mchName">
							<el-input type="text" v-model="ruleForm.mchName" placeholder='输入商户名称'></el-input>
						</el-form-item>
						<el-form-item label="商户简称" prop="mchShortName">
							<el-input type="text" v-model="ruleForm.mchShortName" placeholder='输入商户简称'></el-input>
						</el-form-item>
						<el-form-item label="联系人邮箱" prop="contactEmail">
							<el-input type="text" v-model="ruleForm.contactEmail" placeholder='输入联系人邮箱'></el-input>
						</el-form-item>
						<el-form-item label="所属服务商" prop="type">
								<el-select
								   v-model="valuett"
								   filterable
								   placeholder="请输入商户名/终端号/手机号"
								  
								   >
								   <el-option
										v-for="(item,index) in isvs"
										:key="index"
										:label="item.isv_name"
										:value="item.isv_no">
								   </el-option>
								 </el-select>
						</el-form-item>
						<!-- <el-form-item label="私钥AppSecret">
							<el-input type="text" v-model="ruleForm.appsecret" placeholder='输入应用名称'></el-input>
							<button class="appsecretBtn">随机生成私钥</button>
						</el-form-item> -->
					</div>
					<div class="chendiv">
						<el-form-item label="收单宝登录名" prop="loginUserName">
							<el-input type="text" v-model="ruleForm.loginUserName" placeholder='输入商户登录名称'></el-input>
							<p style="color: darkgray;font-size: 14px;position: absolute;top:37px;left: 20px;">默认登录密码为：123456</p>
						</el-form-item>
						
						<el-form-item label="联系人姓名" prop="contactName">
							<el-input type="text" v-model="ruleForm.contactName" placeholder='输入联系人姓名'></el-input>
						</el-form-item>
						<el-form-item label="联系人手机号" prop="contactTel">
							<el-input type="text" v-model="ruleForm.contactTel" placeholder='输入联系人手机号'></el-input>
						</el-form-item>
						<el-form-item label="状态" prop="state">
							<el-radio-group size="small"  v-model="ruleForm.state">
								<el-radio :label="0">停用</el-radio>
								<el-radio :label="1">启用</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="备注" prop="remark">
							<el-input style="width: 80%;" type="textarea" :rows="2" placeholder="请输入备注信息" v-model="ruleForm.remark">
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
	import Table from '@/components/merchant/Businesstable.vue'
	import {newbuildmchInfo,isvc} from '@/utils/merchant.js'
	
	import {charkname,onetwo} from '@/utils/login.js'
	export default{
		inject:["reload"],
		components:{
			Travelpermit,
			Table
		},
		data(){
			// 表单校验
			var validateValue = async(rule, value, callback) => {
				let reg=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
				if(!reg.test(this.ruleForm.contactEmail) && this.ruleForm.contactEmail != ''){
				  callback(new Error('请输入正确的邮箱'))
				}
			}
			var validateTel = async(rule, value, callback) => {
				let reg=/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
				if(!reg.test(this.ruleForm.contactTel)){
				  callback(new Error('请输入正确的邮箱'))
				}
			}
			return{
				options: [{
				  value: 0,
				  label: '停用'
				}, {
				  value: 1,
				  label: '启用'
				}],
				
				options2: [{
				  value: 1,
				  label: '普通商户'
				}, {
				  value: 2,
				  label: '特约商户'
				}],
				
				dialogVisible:false,
				rules: {
					contactEmail:[{validator: validateValue, trigger: 'blur' }],
					contactName:[{required: true,message: '请输入联系人姓名',trigger: 'blur'}],
					loginUserName:[{required: true,message: '请输入登录名',trigger: 'blur'}],
					contactTel:[{required: true,validator:validateTel,message: '请输入联系人电话',trigger: 'blur'}],
					mchName:[{required: true,message: '请输入商户名称',trigger: 'blur'}],
					mchShortName:[{required: true,message: '请输入商户简称',trigger: 'blur'}],
				},
				ruleForm: {
					contactEmail: '',
					contactName: '',
					loginUserName: '',
					contactTel: '',
					mchName: '',
					mchShortName:'',
					remark:'',
					state:1,
					type:1,
				},
				myfrom:{
					mchNo:'',
					isvNo:'',
					mchName:'',
					state:null,
					type:null
				},
				isvs:[],
				valuett:''
			}
		},
		created(){
			isvc().then(res=>{
				this.isvs=res.data.data
				// console.log(res.data.data)
			})
		},
		methods:{
			// 提交
			 submitForm(formName) {
			        this.$refs[formName].validate((valid) => {
			          if (valid) {
						  newbuildmchInfo(this.ruleForm).then(res=>{
								console.log(res.data.code)
								if(res.data.code != 200){
									this.$message.error(res.data.msg)
								}else{
									this.$message.success(res.data.msg);
									this.reload()
								}
							 }).catch(()=>{
							this.$message.error("商户中心注册失败，请联系相关人员")
							this.reload()
						  })
						  // // 获取用户中心信息，查看手机号是否存在
						  // charkname({
						  // 	  phone:this.ruleForm.contactTel
						  // }).then(res=>{
							 // if(res.data.data==null){
								//  onetwo({
								// 	 	"name":this.ruleForm.contactName,
								// 	 	"username":this.ruleForm.loginUserName,
								// 	 	"password":"123456",
								// 	 	"email":this.ruleForm.contactEmail,
								// 	 	"phone":this.ruleForm.contactTel
								//  }).then(inforegin=>{
									 
								//  }).catch(()=>{
								// 	this.$message.error("商户中心注册失败，请联系相关人员")
								// 	this.reload()
								//  })
							 // }else if(res.data.data.username==this.ruleForm.loginUserName){
								// newbuildmchInfo(this.ruleForm).then(res=>{
								// 	this.$message.success(res.data.msg);
								// 	this.reload()
								// })
							 // }else if(res.data.data.username!=this.ruleForm.loginUserName){
								//  this.$alert("该手机号已绑定登录名为：" + res.data.data.username + "，请更改用户名进行注册",{
								// 		   confirmButtonText: '确定',
								//  })
							 // }
						  // })
						  
						  
						  
			    
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
			// 查询
			serchcoed(n){
				this.$router.push({
					path:'/merchant/businesslist',
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
		margin-left: 25px;
	}
	:deep(.el-form-item__label){
		width: 115px !important;
	}
	:deep(.el-form-item__error){
		left: 15px;
		top: 64%;
	}
</style>