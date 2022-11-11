<template>
	<div class="maincon">
		<Travelpermit>
			<div slot="travel">
				主页 / 支付配置 / 支付接口
			</div>
		</Travelpermit>
		<div class="infobox">
			<ul>
				<li class="jiekou" @click="dialogVisible=true">
					<img src="@/assets/images/jiekou.png" alt="">
				</li>
				<li v-for="(item,index) in lidata" :key="index">
					<div class="imgbox" :style="{background:item.bgColor}">
						<img :src="item.icon">
					</div>

					<p>{{item.ifName}}</p>
					<p class="btnbox">
						<span class="bj" @click="changeinfo(item.ifCode)">编辑</span>
						<span class="del" @click="delwaycode(item.ifCode)">删除</span>
					</p>
				</li>
				
			</ul>
		</div>
		<!-- 蒙尘 -->
		<el-dialog title="新增支付接口" append-to-body :visible.sync="dialogVisible" width="50%">
			<div class="chen">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="接口代码：" prop="ifCode">
						<el-input v-model="ruleForm.ifCode"></el-input>
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
					<el-form-item label="页面展示：卡片icon" v-model="ruleForm.icon">
						<UploadImg @headimg="getKey"></UploadImg>
					</el-form-item>
					<el-form-item label="页面展示：卡片背景色" prop="bgColor">
						<el-input type="text" v-model="ruleForm.bgColor"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button @click="dialogVisible=false">取消</el-button>
						<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-dialog>
		<el-dialog title="修改支付接口" append-to-body :visible.sync="isyrue" width="50%">
			<Indexdailog :dilagodata='dilagodata'></Indexdailog>
		</el-dialog>
	</div>
</template>

<script>
	import {
		payIfDefines,
		addpayIfDefines,
		payWays,
		delpayWays,
		payWaysinfo
	} from '@/utils/configuration.js'
	import Travelpermit from '@/components/Travelpermit.vue'
	import UploadImg from '@/components/configuration/UploadImg.vue'
	import Indexdailog from '@/components/configuration/Indexdailog.vue'
	
	export default {
		inject: ["reload"],
		components: {
			Travelpermit,
			UploadImg,
			Indexdailog
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
				dialogVisible: false,
				ruleForm: {
					bgColor: '',
					configPageType: 1,
					icon: '',
					ifCode: '',
					ifName: '',
					isIsvMode: 1,
					isMchMode: 1,
					isvParams: '',
					isvsubMchParams: '',
					normalMchParams: '',
					remark: '',
					state: 1,
					wayCodes:[]
				},
				rules: {
					ifCode: [{
						required: true,
						message: '请输入接口代码',
						trigger: 'blur'
					}],
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
					wayCodes: [{
						validator: valwayCodeStrs,
						trigger: 'blur'
					}]
				},
				lidata: [],
				checkboxlist: [],
				isyrue:false,
				dilagodata:{}
			}
		},
		created() {
			this.getData()
			this.getwaycode()
		},
		methods: {
			// 新增支付接口
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.ruleForm.wayCodeStrs=this.ruleForm.wayCodes.toString()
						addpayIfDefines(this.ruleForm).then(res => {
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
			// 支付接口列表
			getData() {
				payIfDefines().then(res => {
					this.lidata = res.data.data
				})
			},
			// 支付方式列表
			getwaycode() {
				payWays().then(res => {
					this.checkboxlist = res.data.data.records
				})
			},
			// 图片上传的getKey
			getKey(data) {
				this.ruleForm.icon = data[0]
			},
			// 删除支付接口
			delwaycode(n) {
				this.$confirm('确认删除？', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					delpayWays(n).then(res => {
						this.$message({
							type: 'success',
							message: res.data.msg
						});
						this.reload()
					}).catch(() => {
						this.$message.error("出错了")
					})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			// 编辑
			changeinfo(n){
				payWaysinfo(n).then(res=>{
					let arr=[]
					for(var i=0;i<res.data.data.wayCodes.length;i++){
						arr.push(res.data.data.wayCodes[i].wayCode)
					}
					this.dilagodata=res.data.data
					this.dilagodata.wayCodes=arr
					this.isyrue=true
				})
				
			}
			
		}
	}
</script>
<style scoped>
	.infobox ul {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		min-height: 520px;
		margin: 0;
		padding: 0;
		content: '';
	}

	.infobox {
		padding: 15px 0 15px 15px;
	}

	.infobox ul li {
		width: calc((100% - 90px) / 6);
		height: 260px;
		box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.15);
		border-radius: 5px;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		padding-top: 15px;
		box-sizing: border-box;
		margin-bottom: 18px;
		margin-right: 15px;
	}

	.infobox ul:after {
		content: "";
		height: 0;
		width: 230px;
	}

	.infobox ul li:nth-child(6n+6) {
		margin-right: 0px;
	}

	.infobox ul li .imgbox {
		width: 90%;
		height: 142px;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.infobox ul li .imgbox img {
		max-width: 100%;
		max-height: 100%;
	}

	.infobox ul li p {
		width: 100%;
		text-align: center;
		font-size: 16px;
		margin: 0;
		height: 22px;
	}

	.infobox ul li .btnbox {
		border-top: 1px solid #C4C4C480;
		display: flex;
		justify-content: space-around;
		line-height: 40px;
		font-size: 14px;
	}

	.infobox ul li .btnbox .bj {
		color: #278DE5;
		cursor: pointer;
	}

	.infobox ul li .btnbox .del {
		color: #E56C6C;
		cursor: pointer;
	}

	.infobox ul .jiekou {
		padding: 0;
		box-shadow: none;
	}

	.infobox ul .jiekou img {
		width: 100%;
		height: 100%;
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

	:deep(.el-form-item__label) {
		width: 200px !important;
	}

	:deep(.chen .el-input) {
		width: 250px !important;
	}

	:deep(.el-textarea) {
		width: 70%;
	}

	:deep(.el-form-item__error) {
		left: 12%;
	}
</style>
