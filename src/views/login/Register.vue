<template>
	<div>
		<h3>注册</h3>
		<div class="firstStepBox">
			<el-form ref="registerForm" :model="registerForm" :rules="rules" label-width="100px" class="registerForm">
				<el-form-item label="用户名" prop="name">
					<el-input v-model="registerForm.name" type="text" autocomplete="off" />
				</el-form-item>
				<el-form-item label="账号" prop="username">
					<el-input v-model="registerForm.username" type="text" autocomplete="off" />
					<span class="greyWord">作为登录账号</span>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="registerForm.email" type="email" autocomplete="off" />
				</el-form-item>
				<el-form-item label="手机号" prop="phone">
					<p class="svgcode">
						<el-input v-model="registerForm.phone" type="tel" autocomplete="off" />
						<el-button class="button" style="width:150px;" :disabled="issend" @click="binPH" type="primary">{{countDown}}</el-button>
						 <p style="font-size: 12px;color: red;margin:0;" v-show="teltru">请输入正确手机号</p>
					</p>
				</el-form-item>
				<el-form-item label="短信验证码" prop="vcodeText">
					<p class="svgcode">
						<el-input v-model="registerForm.vcodeText" type="text" autocomplete="off" />
					</p>
				</el-form-item>
				<el-form-item label="密码" prop="pass">
					<el-input v-model="registerForm.password" type="password" autocomplete="off" />
					<span class="greyWord">密码长度应大于八位，注意区分大小写</span>
				</el-form-item>
				<el-form-item label="确认密码" prop="checkPass">
					<el-input v-model="registerForm.checkPass" type="password" autocomplete="off" />
				</el-form-item>
				<p class="btnbox">
					<el-button class="button"  @click="gologin">返回</el-button>
					<el-button class="button" type="success" @click="submitForm(registerForm)">注册</el-button>
				</p>
				
			</el-form>
		</div>
	</div>
</template>
<script>
	import {register,dosendMsg} from '@/utils/login.js'
	export default {
		inject: ["reload"],
		components: {

		},
		data() {
			const validateEmail = (rule, value, callback) => {
				const patten =
					/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
				if (!patten.test(value) && value != ''){
					callback(new Error('请输入正确的邮箱地址'))
				}
				callback()
			}
			const validatePass = (rule, value, callback) => {
				if (this.registerForm.password.length < 8) {
					callback(new Error('请输入符合要求的密码'))
				}
				callback()
			}
			const validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'))
				} else if (value !== this.registerForm.password) {
					callback(new Error('两次输入密码不一致!'))
				} else {
					callback()
				}
			}
			const validatephone = (rule, value, callback) => {
				const reg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
				if (!reg.test(value)) {
					callback(new Error('请输入正确的手机号'))
				}
				callback()
			}
			const validatename = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('用户名不能为空'))
				}
				callback()
			}
			const validateusername = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('账号不能为空'))
				}
				callback()
			}
			const validateVcode = (rule, value, callback) => {
			  if (value == '' ) {
			    callback(new Error('请输入正确的验证码'))
			  }
			  callback()
			}
			return {
				titles: '注册',
				check: true,
				teltru:false,
				
				countDown: '获取验证码',
				countdown: 60,
				timer: null,
				issend:false,
				registerForm: {
					"name": "",
					"userCode": "",
					"username": "",
					"password": "",
					"email": "",
					"phone": "",
					"checkPass": '',
					"vcodeText":'123',
				},

				rules: {
					email: [{
						validator: validateEmail,
						trigger: 'blur'
					}],
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}],
					name: [{
						validator: validatename,
						trigger: 'blur'
					}],
					username: [{
						validator: validateusername,
						trigger: 'blur'
					}, ],
					phone: [{
						validator: validatephone,
					}],
					vcodeText: [{
						validator: validateVcode,
					}]

				}
			}
		},
		mounted() {
			
		},
		methods: {
			loading(){
			     //启动定时器
			     this.issend=true
			     this.countdown--; //定时器减1
			     this.countDown = "重新发送（" + this.countdown +"）";
			    },
			clearTimer(){
			   //清除定时器
			   clearInterval(this.timer);
			   this.timer = null;
			},
			// 发送验证码
			binPH(){
			  let reg=/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
			  if(!reg.test(this.registerForm.phone)){
			    this.teltru=true
			    return false
			  }else{
			      this.teltru=false
			      this.loading()
			      dosendMsg({
			        "phone":this.registerForm.phone
			      }).then(res=>{
			        if(res.data.code==1500){
			          this.$message.success('发送成功')
					  let msg={
						  code:res.data.data,
						  num:this.registerForm.phone
					  }
			          localStorage.setItem("dosendMsg",JSON.stringify(msg))
			        }else{
			          this.$message.error('发送失败')
			        }
			      })
			      this.timer = setInterval(() => {
			        //创建定时器
			        if(this.countdown == 0){
			            this.issend=false
			             this.clearTimer(); //关闭定时器
			             this.countDown="获取验证码"
			             this.countdown=60
			        }else{
			           this.loading();
			        }
			      },1000)
			  }
			},
			submitForm() {
				// let trueCode=JSON.parse(localStorage.getItem("dosendMsg")).code
				// console.log(trueCode)
				// let truenum=JSON.parse(localStorage.getItem("dosendMsg").num)
				this.$refs.registerForm.validate((valid) => {
					if (!valid) {
						this.$message.error('请确认注册信息！')
						return false
					}else if(this.registerForm.vcodeText != JSON.parse(localStorage.getItem("dosendMsg")).code || this.registerForm.phone != JSON.parse(localStorage.getItem("dosendMsg")).num){
						this.$message.error('验证码不正确！')
						return false
					}else {
						// console.log(this.registerForm)
						register(this.registerForm).then(res=>{
							this.$message(res.data.message)
							if(res.data.message=='注册成功'){
								this.$router.push("/login")
							}
						})
					}
				})
			},
			gologin(){
				this.$router.push('/login')
			}
		}
	}
</script>
<style scoped>
	.vcodeItem {
		position: relative;
	}

	.nextCode {
		position: absolute;
		top: 0;
		left: 470px;
		cursor: pointer;
	}

	.vcode {
		width: 150px;
		height: 44px;
		/* background-color: blanchedalmond; */
		position: absolute;
		left: 310px;
		top: -8px;
	}

	.codeInput {
		width: 300px;
		margin-right: 20px;
	}

	.loginLink {
		font-size: 17px;
		font-family: Source Han Sans SC;
		font-weight: 400;
		text-decoration: underline;
		color: #4377F3;
	}

	.textWord {
		margin-left: 60px;
		margin-bottom: 60px;

	}

	.greyWord {
		font-size: 14px;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #93989D;
		;
	}

	.firstStepBox {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.registerForm {
		width: 680px;
		/* height: 630px; */
		background-color: white;
		padding-top: 40px;
		padding-right: 40px;
	}

	.box-card {
		width: 100%;
		height: 770px;
	}

	.agreeArea {
		margin-left: 60px;
		margin-top: 40px;
		font-size: 15px;
		font-family: Source Han Sans SC;
		font-weight: 400;
	}

	.button {
		margin-top: 20px;
		margin-left: 50%;
		width: 100px;
		/* 因为ruleForm内有padding-right:40px,所以transform的时候还要计算上 */
		transform: translateX(-30px);
		margin-bottom: 30px;
	}
	h3{
		text-align: center;
		font-size: 24px;
		letter-spacing: 10px;
		margin:100px 0  40px 0;
	}
	.svgcode{
		width: 100%;
		height: 12px;
		display: flex;
		align-items: center;
		justify-content: start;
	}
	:deep(.svgcode .el-input__inner){
		width:300px;
	}
	.svgcode .el-input{
		width: 300px;
	}
	.svgcode .button{
		margin: 0 0 0 50px;
	}
	.btnbox{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.btnbox .button{
		margin: 0 30px 0 0;
	}
</style>
