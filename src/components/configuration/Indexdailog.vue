<template>
	
		<div class="chen">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="接口代码：" prop="ifCode">
					<el-input v-model="ruleForm.ifCode" disabled></el-input>
				</el-form-item>
				<el-form-item label="接口名称：" prop="ifName">
					<el-input v-model="ruleForm.ifName"></el-input>
				</el-form-item>
				<el-form-item label="是否支持普通商户模式：" prop="isMchMode">
					<el-radio-group v-model="ruleForm.isMchMode">
						<el-radio :label="0">不支持</el-radio>
						<el-radio :label="1">支持</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="是否支持服务商子商户模式：" prop="isIsvMode">
					<el-radio-group v-model="ruleForm.isIsvMode">
						<el-radio :label="0">不支持</el-radio>
						<el-radio :label="1">支持</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="支付参数配置页面类型：" prop="configPageType">
					<el-radio-group v-model="ruleForm.configPageType">
						<el-radio :label="1">根据接口配置定义描述渲染页面</el-radio>
						<el-radio :label="2">自定义页面</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="服务商接口配置定义描述：" v-if="ruleForm.isIsvMode == 1 && ruleForm.configPageType==1"
					prop="isvParams">
					<el-input type="textarea" placeholder="请输入" v-model="ruleForm.isvParams"></el-input>
				</el-form-item>
				<el-form-item label="特约商户接口配置定义描述：" v-if="ruleForm.isIsvMode == 1 && ruleForm.configPageType==1"
					prop="isvsubMchParams">
					<el-input type="textarea" placeholder="请输入" v-model="ruleForm.isvsubMchParams"></el-input>
				</el-form-item>
				<el-form-item label="普通商户接口配置定义描述：" v-if="ruleForm.isMchMode == 1 && ruleForm.configPageType==1"
					prop="normalMchParams">
					<el-input type="textarea" placeholder="请输入" v-model="ruleForm.normalMchParams"></el-input>
				</el-form-item>
				<el-form-item label="状态：" prop="state">
					<el-radio-group v-model="ruleForm.state">
						<el-radio :label="1">启用</el-radio>
						<el-radio :label="0">停用</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="备注：" prop="remark">
					<el-input type="textarea" v-model="ruleForm.remark"></el-input>
				</el-form-item>
				<el-form-item label="支持的支付方式：" prop="wayCodes">
					<el-checkbox-group v-model="ruleForm.wayCodes">
						<el-checkbox 
						v-for="(item,index) in checkboxlist" 
						:key="index" 
						:label="item.wayCode"
						>
						{{item.wayName}}
						</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="页面展示：卡片icon">
					<UploadImg @headimg="getKey" :hasqrimg='ruleForm.icon'></UploadImg>
				</el-form-item>
				<el-form-item label="页面展示：卡片背景色" prop="bgColor">
					<el-input type="text" v-model="ruleForm.bgColor"></el-input>
				</el-form-item>
				<el-form-item>
					<!-- <el-button @click="reload()">取消</el-button> -->
					<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
				</el-form-item>
			</el-form>
		</div>
</template>

<script>
	import {changedata,payWays} from '@/utils/configuration.js'
	import UploadImg from '@/components/configuration/UploadImg.vue'
	export default {
		inject: ["reload"],
		props:['dilagodata'],
		components: {
			UploadImg
		},
		data() {
			//表单校验
			var validateValue = async (rule, value, callback) => {
				if (this.ruleForm.isvParams == '') {
					callback(new Error('请输入服务商接口配置定义描述'))
				}
			}
			var validateTel = async (rule, value, callback) => {
				if (this.ruleForm.isvsubMchParams == '') {
					callback(new Error('请输入特约商户接口配置定义描述'))
				}
			}
			var validateParams = async (rule, value, callback) => {
				if (this.ruleForm.normalMchParams == '') {
					callback(new Error('请输入普通商户接口配置定义描述'))
				}
			}
			var valwayCodeStrs = async (rule, value, callback) => {
				if (this.ruleForm.wayCodes.length==0) {
					callback(new Error('请选择支付方式'))
				}
			}
			return {
				ruleForm: {
					bgColor: '',
					configPageType: null,
					icon: '',
					ifCode: '',
					ifName: '',
					isIsvMode: null,
					isMchMode: null,
					isvParams: '',
					isvsubMchParams: '',
					normalMchParams: '',
					remark: '',
					state: null,
					wayCodes:[]
				},
				rules: {
					ifName: [{
						required: true,
						message: '请输入接口名称',
						trigger: 'blur'
					}],
					isvParams: [{
						validator: validateValue,
						trigger: 'blur'
					}],
					isvsubMchParams: [{
						validator: validateTel,
						trigger: 'blur'
					}],
					normalMchParams: [{
						validator: validateParams,
						trigger: 'blur'
					}],
					wayCodeStrs: [{
						validator: valwayCodeStrs,
						trigger: 'blur'
					}]
				},
				checkboxlist:[],
				nwelisdata:''
			}
		},
		created() {
			this.getwaycode()
			this.ruleForm=this.dilagodata
		},
		methods: {
			// 支付方式列表
			getwaycode() {
				payWays().then(res => {
					this.checkboxlist= res.data.data.records
				})
			},
			// 图片上传的getKey
			getKey(data) {
				this.ruleForm.icon = data[0]
			},
			
			// 修改支付接口表单提交
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.ruleForm.wayCodeStrs=this.ruleForm.wayCodes.toString()
						changedata(this.ruleForm).then(res => {
							this.$message.success(res.data.msg)
							this.reload()
						}).catch(() => {
							this.$message.erroe(res.data.msg)
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			
		},
		watch:{
			dilagodata(n){
				this.ruleForm=n
			}
		}
	}
</script>

<style>
</style>