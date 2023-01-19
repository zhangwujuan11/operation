<template>
	<div class="maincon">
		<Travelpermit>
			<div slot="travel">
				商户管理 / 信息配置 / 码牌信息配置
			</div>
		</Travelpermit>
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
		<el-dialog title="新增码牌" append-to-body :visible.sync="dialogVisible" width="50%">
			<div class="chen">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="码牌名称" prop="ccName">
						<el-input v-model="ruleForm.ccName"></el-input>
					</el-form-item>
					<el-form-item label="码牌ID" prop="id">
						<el-input v-model="ruleForm.id"></el-input>
					</el-form-item>
					<el-form-item label="备注" prop="remark">
						<el-input type="textarea" v-model="ruleForm.remark"></el-input>
					</el-form-item>
					 <p class="btn_box">
						 <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
					 </p>
				</el-form>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import Travelpermit from '@/components/Travelpermit.vue'
	import Table from '@/components/macinfos/Cctable.vue'
	import {ccinfo,ccinfoserch} from '@/utils/mchinfo.js'
	export default{
		inject:["reload"],
		components:{
			Travelpermit,
			Table
		},
		data(){
			var validateappavatar = (rule, value, callback) => {
				let sig=/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
			  if (!sig.test(this.ruleForm.phone)) {
			    callback(new Error('手机格式错误'))
			  }
			  callback()
			}
			return{
				dialogVisible:false,
				ruleForm: {
					ccName:'',
					id: '',
					remark:''
				},
				rules: {
					ccName: [{
							required: true,
							message: '请输入码牌名称',
							trigger: 'blur'
						}],
					id: [{
						required: true,
						message: '请输入码牌ID',
						trigger: 'blur'
					}]
				},
				options:[],
				myfrom:{
					appId: '',
					appName:'',
					state:null
				},
			}
		},
		// created(){
		// 	channelinfo().then(res=>{
		// 		this.options=res.data.data
		// 	})
		// },
		methods:{
			// 提交
			gettime(){
				var date = new Date();
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? ('0' + m) : m;
				var d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				var h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				var min = date.getMinutes();
				min = min < 10 ? ('0' + min) : min;
				var s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s;
				this.conversion_time1 = y + '-' + m + '-' + d + ' ' + h + ':' + min + ':'             
				+ s;
			},
			submitForm(formName) {
				this.gettime()
				this.$refs[formName].validate((valid) => {
					if (valid) {
						ccinfoserch(this.ruleForm.id).then(data=>{
							// console.log(data.data.data)
							if(data.data.data.length == 0){
								this.ruleForm.createAt=this.conversion_time1
								ccinfo(this.ruleForm).then(res=>{
									this.$message.success('信息储存成功')
									this.dialogVisible=false
									this.relaod()
								})
							}else{
								this.$message.error('该码牌已存在')
							}
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
			  // appsecretBtn(){
				 //  	let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
					// let tempStr=''
				 //  	for(var i=0; i<32; ++i){
				 //  		tempStr += chars.charAt(Math.floor(Math.random() * 32 ));
				 //  	}
					// this.ruleForm.appSecret=tempStr
			  // },
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
		width: 90px !important;
	}
	:deep(.el-form-item__error){
		top: 60%;
		left: 16px;
	}
	.btn_box{
		width: 100%;
		margin-top: 50px;
		text-align: center;
	}
	.chen .el-form-item{
		width: 100%;
	}
	/deep/.el-textarea__inner{
		width: 50%;
	}
	
</style>