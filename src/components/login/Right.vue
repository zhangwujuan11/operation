<template>
	<div>
		<div v-if="havetoken != null" class="header-right">
		  <span>{{username}}</span>
		  <el-divider direction="vertical" />
		  <span @click="logout">退出</span>
		</div>
		<div v-else>
		  <span @click='register'>注册</span>
		  <el-divider direction="vertical" />
		  <span @click="dialogVisible=true">登录</span>
		</div>
		
		<!-- 登录表单 -->
		<el-dialog title="登录" append-to-body :visible.sync="dialogVisible" width="490px">
			<div class="chen">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="账号：" prop="username">
						<el-input v-model="ruleForm.username"></el-input>
					</el-form-item>
					<el-form-item label="密码：" prop="password">
						<el-input v-model="ruleForm.password" type="password"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button @click="dialogVisible=false">取消</el-button>
						<el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-dialog>
		
	</div>
</template>

<script>
	import {goLogin} from '@/utils/login.js'
	import {iToken} from '@/utils/home.js'
	export default{
		inject:["reload"],
		data(){
			return{
				havetoken:null ,
				dialogVisible: false,
				username:'',
				ruleForm: {
					grant_type:'password',
					username: '',
					password: '',
					client_id:'1001',
					client_secret:'123456'
				},
				rules: {
					username: [{
						required: true,
						message: '请输入账号',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}]
				}
			}
		},
		created() {
			this.havetoken=JSON.parse(localStorage.getItem('user'))
			this.username=JSON.parse(localStorage.getItem('user')).username
		},
		methods:{
			// 注册
			register(){
				this.$router.push({
					path:'/register'
				})
			},
			// 登录
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						goLogin(this.ruleForm).then(res=>{
							if(res.data.code==400){
								this.$message.error(res.data.message)
							}else{
								let userinfo={
									token:res.data.access_token,
									username:this.ruleForm.username
								}
								localStorage.setItem('user',JSON.stringify(userinfo))
								this.$nextTick(()=>{
									iToken().then(ress=>{
										let isadmin=ress.data.data.sysUser.isAdmin
										localStorage.setItem('isadmin',JSON.stringify(ress.data.data.sysUser.isAdmin))
										this.$message.success("登录成功")
										this.$router.push('/home')
									}).catch(()=>{
										this.$message.error("登录失败，请重试！")
									})
								})
								
							}
						})
					} else {
						this.$message.error("请完整填写登录信息")
						return false;
					}
				});
			},
			// 退出
			logout(){
				localStorage.removeItem('user')
				localStorage.removeItem('isadmin')
				this.reload()
			}
		}
	}
</script>

<style scoped>
	span{
		cursor: pointer;
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
	
	/* :deep(.el-form-item__label) {
		width: 200px !important;
	} */
	
	:deep(.chen .el-input) {
		width: 250px !important;
	}
	
</style>