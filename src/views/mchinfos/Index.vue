<template>
	<div class="maincon">
		<Travelpermit>
			<div slot="travel">
				商户管理 / 信息配置 / 商户信息配置
			</div>
		</Travelpermit>
		<div class="infobox">
			<div class="inputBox">
				<el-form :model="myfrom" ref="myfrom" class="demo-ruleForm">
					<el-form-item>
						<el-input placeholder="输入商户名称" v-model="myfrom.mchName"></el-input>
					</el-form-item>
				<el-form-item>
					<el-input placeholder="输入手机号"  v-model="myfrom.phone"></el-input>
				</el-form-item>
				<el-form-item>
					<el-select v-model="myfrom.channel" placeholder="通道">
					   <el-option
					      v-for="(item,index) in options" 
						  :key="index" 
						  :label="item.channelName" 
						  :value="item.id">
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
		<el-dialog title="新增商户" append-to-body :visible.sync="dialogVisible" width="50%">
			<div class="chen">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="商户名称" prop="mchName">
						<el-input v-model="ruleForm.mchName"></el-input>
					</el-form-item>
					<el-form-item label="商户号" prop="mid">
						<el-input v-model="ruleForm.mid"></el-input>
					</el-form-item>
					<el-form-item label="终端号" prop="tid">
						<el-input v-model="ruleForm.tid"></el-input>
					</el-form-item>
					<el-form-item label="通道/渠道" prop="channel">
						<el-select v-model="ruleForm.channel" placeholder="请选择">
							<el-option v-for="(item,index) in options" :key="index" :label="item.channelName" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="手机号" prop="phone">
						<el-input v-model="ruleForm.phone"></el-input>
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
	import Table from '@/components/macinfos/Indextable.vue'
	import {newbulidapps} from '@/utils/merchant.js'
	import {channelinfo,mahinfo,mahinfoserch} from '@/utils/mchinfo.js'
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
				options: [],
				myfrom:{
					channel:'',
					phone:'',
					mchName:''
				},
				dialogVisible:false,
				ruleForm: {
					mchName:'',
					mid:'',
					tid:'',
					channel: '',
					phone: ''
				},
				rules: {
					mchName: [{
						required: true,
						message: '请输入商户名称',
						trigger: 'blur'
					}],
					mid: [{
						required: true,
						message: '请输入商户号',
						trigger: 'blur'
					}],
					tid: [{
						required: true,
						message: '请输入终端号',
						trigger: 'blur'
					}],
					channel: [{
						required: true,
						message: '请选择渠道/通道',
						trigger: 'blur'
					}],
					phone: [{
						required: true,
						validator: validateappavatar,
						trigger: 'blur'
					}],
				}
			}
		},
		created(){
			channelinfo().then(res=>{
				this.options=res.data.data
			})
		},
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
						mahinfoserch({
							mid:this.ruleForm.mid,
							tid:this.ruleForm.tid
						}).then(data=>{
							if(data.data.data.length == 0){
								this.ruleForm.createAt=this.conversion_time1
								mahinfo(this.ruleForm).then(res=>{
									this.$message.success('信息储存成功')
									this.dialogVisible=false
									this.reload()
								})
							}else{
								this.$message.error('商户号，终端号已存在')
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
		  // 查询
		  gomerchangIndex(n){
			  // this.$router.push({
				 //  path:'/merchant/index',
				 //  query:n
			  // })
			  console.log(n)
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
		margin-top: 50px;
	}
</style>