<template>
	<div class="maincon">
		<Travelpermit>
			<div slot="travel">
				主页 / 服务商管理 / 服务商列表
			</div>
		</Travelpermit>
		<div class="infobox">
			<div class="inputBox">
				<el-form :model="myForm"  ref="myForm">
					<el-input placeholder="服务商号" v-model="myForm.isvNo"></el-input>
					<el-input placeholder="服务商名称" v-model="myForm.isvName"></el-input>
					<el-select placeholder="服务商状态" v-model="myForm.state">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</el-form>
			</div>
			<div class="btnbox">
				<el-button type="primary" @click="serchdata">查询</el-button>
				<el-button @click="resetForm()">重置</el-button>
				<el-button type="primary" @click="dialogVisible=true">新建</el-button>
			</div>
			<Table></Table>
		</div>
		<!-- 蒙尘 -->
		<el-dialog title="新增服务商" append-to-body :visible.sync="dialogVisible" width="50%">
			<div class="chen">
				<el-form :model="ruleForm"  :rules="rules" ref="ruleForm"
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
							<el-radio-group size="small"  v-model="ruleForm.state">
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
	import Table from '@/components/serviceprovider/Indextable.vue'
	import {isvInfo,addisvInfo} from '@/utils/serviceprovider.js'
	import {isvcreat,levels,isvlevelno} from '@/utils/merchant.js'
	export default{
		inject:["reload"],
		components:{
			Travelpermit,
			Table
		},
		data(){
			
			// 表单校验
			var validateValue = async (rule, value, callback) => {
				let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
				if (!reg.test(this.ruleForm.contact_email) && this.ruleForm.contactEmail != '') {
					callback(new Error('请输入正确的邮箱'))
				}
			}
			var validateTel = async (rule, value, callback) => {
				let reg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
				if (!reg.test(this.ruleForm.contact_tel) && this.ruleForm.contactTel != '') {
					callback(new Error('请正确填写手机号'))
				}
			}
			return{
				options: [{
				  value: 0,
				  label: '停用'
				}, {
				  value:1,
				  label: '正常'
				}],
				value:'',
				dialogVisible:false,
				ruleForm: {
					state:1,
				},
				rules: {
					isv_name: [{
						required: true,
						message: '请输入服务商名称',
						trigger: 'blur'
					}],
					isv_short_name: [{
						required: true,
						message: '请输入服务商简称',
						trigger: 'blur'
					}],
					contact_tel: [{
						required: true,
						validator: validateTel,
						trigger: 'blur'
					}],
					contact_email: [{
						required: true,
						validator: validateValue,
						trigger: 'blur'
					}],
					contact_name: [{
						required: true,
						message: '请输入联系人姓名',
						trigger: 'blur'
					}],
					isv_level:[{
						required: true,
						message: '请选择等级',
						trigger: 'blur'
					}],
					isv_vassalage:[{
						required: true,
						message: '请选择服务商隶属',
						trigger: 'blur'
					}],
				},
				myForm:{
					state:null,
					isvNo:'',
					isvName:''
				},
				levels:[],
				vassalage:[]
			}
		},
		created(){
			levels().then(res=>{
				this.levels=res.data.data
				// console.log(res.data.data)
			})
			isvlevelno().then(res=>{
				this.vassalage=res.data.data
			})
		},
		methods:{
			sjsz(num){
			      var ary = [];                    //创建一个空数组用来保存随机数组
			     for(var i=0; i<num; i++){            //按照正常排序填充数组
			         ary[i] = i+1;
			     }
			     ary.sort(function(){
			          return 0.5-Math.random();        //返回随机正负值
			      })
			     return ary;                    //返回数组
			 },
			
			// 提交新建
			 submitForm(formName) {
			        this.$refs[formName].validate((valid) => {
			          if (valid) {
						  let numsui=this.sjsz(9).join('')  
							this.ruleForm.isv_no='V' + numsui
						
			            isvcreat(this.ruleForm).then(res=>{
							this.$message.success("新建成功");
							this.reload()
			            })
			          } else {
			            console.log('error submit!!');
			            return false;
			          }
			        });
			      },
			  // 查询
			  serchdata(){
				  this.$router.push({
						path:'/serviceprovider',
						query:this.myForm
				  })
			  },
			  // 重置
			  resetForm(){
				  Object.assign(this.$data.myForm,this.$options.data().myForm)
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
		margin-bottom: 30px;
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
		width: 97px !important;
	}
	:deep(.el-form-item__error){
		top: 60%;
	}
</style>