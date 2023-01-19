<template>
	<div class="maincon">
		<Travelpermit>
			<div slot="travel">
				商户管理 / 信息配置 / 服务商收益配置
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
		<el-dialog title="新增百分比" append-to-body :visible.sync="dialogVisible" width="30%">
			<div class="chen">
				<el-form :model="ruleForm" :rules="rules"   ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="百分比" type="number" prop="percentage">
						<el-input v-model="ruleForm.percentage"></el-input>%
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
	import Table from '@/components/macinfos/Benefittable.vue'
	import {excalcreat,excalquery} from '@/utils/login.js'
	import {yieldcreate,yieldquery,yieldqueryall} from '@/utils/mchinfo.js'
	export default {
		inject: ["reload"],
		components: {
			Table,
			Travelpermit
		},
		data() {
			var validateappavatar = (rule, value, callback) => {
				let sig=/^\d\.([1-9]{1,2}|[0-9][1-9])$|^[1-9]\d{0,1}(\.\d{1,2}){0,1}$|^100(\.0{1,2}){0,1}$/
			  if (!sig.test(this.ruleForm.percentage)) {
			    callback(new Error('百分比格式错误'))
			  }
			  callback()
			}
			return {
				dialogVisible:false,
				conversion_time1:'',
				ruleForm:{
				},
				rules: {
					percentage: [{
						required: true,
						validator: validateappavatar,
						trigger: 'blur'
					}]
				}
			}
		},
		created() {},
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
						yieldquery(this.ruleForm.percentage).then(data=>{
							if(data.data.data.length == 0){
								this.ruleForm.create_at=this.conversion_time1
								yieldcreate(this.ruleForm).then(res=>{
									this.$message.success('信息储存成功')
									this.dialogVisible=false
									this.reload()
								})
							}else{
								this.$message.error('该百分比已存在')
							}
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
