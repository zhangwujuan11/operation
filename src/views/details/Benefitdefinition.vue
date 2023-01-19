<template>
	<div class="maincon">
		<Travelpermit>
			<div slot="travel">
				商户管理 / 信息配置 / 服务商收益定义
			</div>
		</Travelpermit>
		<div class="infobox">
			<div class="inputBox">
				<!-- <el-form :model="myfrom" ref="myfrom" class="demo-ruleForm">
					<el-form-item>
						<el-input placeholder="输入应用APPID" v-model="myfrom.appId"></el-input>
					</el-form-item>
					<el-form-item>
						<el-input placeholder="输入应用名称" v-model="myfrom.appName"></el-input>
					</el-form-item>
				</el-form> -->
				<div class="btnbox">
					<el-button type="primary" @click="dialogVisible=true">新建</el-button>
					<!-- <el-button @click="resetForm()">重置</el-button>
					<el-upload class="upload-demo" action="/" :on-change="handleChange"
						accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
						<el-button type="primary">导入</el-button>
					</el-upload> -->
				</div>
			</div>

			<Table></Table>
		</div>
		<!-- 蒙尘 -->
		<el-dialog title="新增服务商收益定义" append-to-body :visible.sync="dialogVisible" width="30%">
			<div class="chen">
				<el-form :model="ruleForm" :rules="rules"   ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="服务商:" prop="isv_no">
						<el-select v-model="ruleForm.isv_no" placeholder="请选择服务商">
							<el-option v-for="(item,index) in isv" :key="index" :label="item.isv_name" :value="item.isv_no"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="收益百分比:" prop="yield_id">
						<el-select v-model="ruleForm.yield_id" placeholder="请选择百分比">
							<el-option v-for="(item,index) in options" :key="index" :label="item.percentage + '%'" :value="item.yield_id"></el-option>
						</el-select>
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
	import Table from '@/components/details/Benefitdefinition.vue'
	import {excalcreat,excalquery} from '@/utils/login.js'
	import {isvc} from '@/utils/merchant.js'
	import {yieldqueryall,isvyield} from '@/utils/mchinfo.js'
	export default {
		inject: ["reload"],
		components: {
			Table,
			Travelpermit
		},
		data() {
			return {
				dialogVisible:false,
				conversion_time1:'',
				ruleForm:{
				},
				rules: {
					isv_no: [{
						required: true,
						message: '请选择商户',
						trigger: 'blur'
					}],
					yield_id: [{
						required: true,
						message: '请选择百分比',
						trigger: 'blur'
					}]
				},
				isv:[],
				options:[]
			}
		},
		created() {
			isvc().then(res=>{
				this.isv=res.data.data
			})
			yieldqueryall().then(res=>{
				this.options=res.data.data
			})
			
		},
		methods: {
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
			submitForm(formName){
				this.gettime()
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.ruleForm.create_at=this.conversion_time1
						isvyield(this.ruleForm).then(res=>{
							this.$message.success('信息储存成功')
							this.dialogVisible=false
							this.reload()
						}).catch(error=>{
							this.$message.error('商户收益已绑定')
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			// // 重置
			// resetForm() {
			// 	Object.assign(this.$data.myfrom, this.$options.data().myfrom)
			// },
			// // 查询
			// gomerchangIndex(n) {
			// 	this.$router.push({
			// 		path: '/merchant/index',
			// 		query: n
			// 	})
			// }
		}
	}
</script>

<style scoped>
	/* .inputBox{
		width: 100%;
		display: flex;
		justify-content: left;
		flex-wrap: wrap;
	} */
	.demo-ruleForm {
		width: 100%;
		display: flex;
		justify-content: left;
		flex-direction: column;
	}

	.el-input,
	.el-select {
		width: 250px;
		margin-right: 20px;
		height: 40px;
		margin-bottom: 30px;
	}

	.btnbox {
		width: 100%;
		display: flex;
		justify-content: left;
		/* margin-top: 30px; */
	}

	.el-button {
		margin-right: 30px;
	}
	.infobox{
		height: 100%;
	}
	.btn_box{
		text-align: center;
	}
</style>
