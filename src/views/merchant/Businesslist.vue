<template>
	<div class="maincon">
		<Travelpermit>
			<div slot="travel">
				主页 / 商户管理 / 商户列表
			</div>
		</Travelpermit>
		<div class="infobox">
			<!-- <div class="inputBox">
				<el-form :model="myfrom" ref="myfrom" class="demo-ruleForm">
					<el-input placeholder="商户号/商户名称" v-model="myfrom.is"></el-input>
				</el-form>
			</div> -->
			<div class="btnbox">
				<!-- <el-button type="primary" @click="serchcoed(myfrom)">查询</el-button> -->
				<!-- <el-button @click="resetForm()">重置</el-button> -->
				<el-button type="primary" @click="dialogVisible=true">新建</el-button>
			</div>
			<!-- <div class="btnbox">
				<el-button type="primary" @click="serchcoed(myfrom)">查询</el-button>
				<el-button @click="resetForm()">重置</el-button>
				<el-button type="primary" @click="dialogVisible=true">新建</el-button>
			</div> -->
			<Table :channel="channel" :ccdatas="ccdatas" :tcinfodata="tcinfodata" :isvs="isvs"></Table>
		</div>
		
		
		<!-- 蒙尘 -->
		<el-dialog title="商户绑定" append-to-body :visible.sync="dialogVisible" width="50%">
			<div class="chen">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<div class="chendiv">
						<!-- <el-form-item label="收款方式:"  prop="channelId">
							<el-select placeholder="请选择收款方式" v-model="ruleForm.channelId" @change="channeld()">
								<el-option v-for="(item,index) in channel" :key="index" :label="item.channelName"
									:value="item.id">
								</el-option>
							</el-select>
						</el-form-item> -->
						<el-form-item label="商户:">
							<el-select v-model="valuett" filterable placeholder="请输入商户名/终端号" vue-key=""
								@change="activ()">
							 <el-option v-for="(item,index) in options" :key="index"
									:label="item.mchName + '(' + item.tid + ')'" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="码牌:" prop="id">
							<el-select v-model="ruleForm.id" filterable value-key="" :placeholder="placeholders">
								<el-option v-for="(item,index) in ccdatas" :key="index"
									:label="item.ccName+ '(' + item.id + ')'" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="所属服务商:" prop="isvNo">
							<el-select v-model="ruleForm.isvNo" filterable placeholder="请输入商户名/终端号/手机号">
								<el-option v-for="(item,index) in isvs" :key="index" :label="item.isv_name"
									:value="item.isv_no">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="支付倒计时(s):" prop="expireTime">
							<el-input v-model="ruleForm.expireTime" type="number" class="bunnabc"></el-input>
						</el-form-item>
						<div class="ables" v-if="ables">
							<p>商户名:{{changeinfo.mchName}}</p>
							<p>商户号:{{changeinfo.mid}}</p>
							<p>终端号:{{changeinfo.tid}}</p>
							<p>渠道:{{channelname}}</p>
							<p>手机号:{{changeinfo.phone | phonepass}}</p>
							<div class="verification">
								{{changeinfo.phone | phonepass}}
								<el-button v-if="timerTf" class="sengbtn" type="primary" @click="receiveCode">
									{{ countDown }}
								</el-button>
								<el-button v-else class="sengbtn" type="primary" disabled>
									{{ countDownNum }} 秒后重新获取
								</el-button>
							</div>
							<p class="phoneclass">
								<el-input type="number" class="bunnabc" v-model="input" placeholder="请输入短信验证码">
								</el-input>
							</p>
							<el-button @click="subfrom('ruleForm')" class="subable" type="primary" :disabled="!input != ''">确认提交</el-button>
						</div>
					</div>
					<div class="chendiv">
						<el-form-item label="商户登录名:" prop="username">
							<el-input type="text" v-model="ruleForm.username" placeholder='输入商户登录名称'></el-input>
							<!-- <p style="color: darkgray;font-size: 14px;position: absolute;top:37px;left: 20px;">默认登录密码为：123456</p> -->
						</el-form-item>

						<el-form-item label="支付后通知:"  prop="payNotifySelect">
							<el-checkbox-group v-model="ruleForm.payNotifySelect">
								<el-checkbox label="1">氢信公众号通知</el-checkbox>
								<el-checkbox label="2">氢信企业版机器人</el-checkbox>
								<el-checkbox label="3">商户短信通知</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
						<el-form-item class="bottmtext" label="支付前的页面底部定义:" prop="beforetext" >
							<el-checkbox v-model="beforetext">附加文本</el-checkbox>
						</el-form-item>
						<el-input style="margin-bottom: 10px;width: 90%;" placeholder="输入文本" v-if="beforetext"
							v-model="ruleForm.payBeforeText"></el-input>
						<el-form-item label="支付中:"  prop="isPayFailNotify">
							<el-checkbox v-model="isPayFailNotify">支付失败提醒</el-checkbox>
						</el-form-item>
						<!-- 音箱 -->
						<div class="tctc">
							<el-form-item v-for="(deviceId, index) in ruleForm.deviceIds" :label="'音响ID' + (index + 1)"
								:key="index" :prop="'deviceIds.' + index + '.value'" class="additem">
								<p class="seridpbox">
									<!-- <el-input v-model="deviceId.value"></el-input> -->
									<el-select v-model="deviceId.value" filterable placeholder="音箱名称/ID"
										value-key="deviceId">
										<el-option v-for="(item,index) in tcinfodata" :key="item.deviceId"
											:label="item.tcName + '(' + item.deviceId + ')'" :value="item">
										</el-option>
									</el-select>
									<el-button style="margin-left: 5px;" type="danger"
										@click.prevent="removeDomain(deviceId)">删除</el-button>
								</p>
							</el-form-item>
							<p style="width: 100%;text-align: center;margin-bottom: 15px;color: #409EFF;font-size: 14px;cursor: pointer;"
								@click="addDomain">
								<i class="el-icon-plus"></i> 新增音响ID
							</p>
						</div>
					</div>
					<div class="btnbox">
						<el-form-item>
							<el-button @click="dialogVisible=false">取消</el-button>
							<!-- <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button> -->
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
	import {
		isvc
	} from '@/utils/merchant.js'
	import {
		levcreat,
		mchpay_infoinit,
		levitastid,
		mchpay_infoset,
		tctcset
	} from '@/utils/login.js'
	import {
		mahinfoserchdataall,
		mahinfodata,
		sendverdata,
		tcinfoserchall,
		ccinfoserchall,
		channelinfo,
		tcinfo
	} from '@/utils/mchinfo.js'
	export default {
		inject: ["reload"],
		components: {
			Travelpermit,
			Table
		},
		filters: {
			phonepass(val) {
				if (val) {
					return (val.substring(3, 0)) + '****' + (val.substring(7));
				}
			}
		},
		data() {
			return {
				placeholders: "码牌名称/码牌ID",
				ables: false,
				tcinfodata: [], //在用音箱
				ccdatas: [], //在用码牌
				beforetext: false,
				isPayFailNotify: false,
				ruleForm: {
					mchName: '',
					id: '',
					expireTime: 30,
					deviceIds: [{
						value: ''
					}],
					payNotifySelect: [],
					phone: '',
					username:'',
					isvNo:'',
					channelId:''
				},
				rules: {
					// mchName:[{
					// 	required: true,
					// 	message: '请选择商户',
					// 	trigger: 'change' 
					// }],
					isvNo:[{
						required: true,
						message: '请选择所属服务商',
						trigger: 'change' 
					}]
				},
				activeName: 'first',
				options: [],
				valuett: '',
				changeinfo: {},
				countDown: "发送验证码", // 倒计时
				timerTf: true,
				countDownNum: 60,
				subable: true,
				input: '',
				phonedata: '123',
				ttru: false,
				// tid:JSON.parse(localStorage.getItem("mchtiddata")).tid,
				// merchantCode:JSON.parse(localStorage.getItem("mchtiddata")).merchantCode,
				// username:JSON.parse(localStorage.getItem("username")),
				myfrom: {
					is:''
				},
				isvs: [],
				dialogVisible: false,
				channel: [],
				channelname:''
			}
		},
		mounted() {
			// 商户号
			mahinfoserchdataall().then(res => {
				this.options = res.data.data
			}),
			isvc().then(res => {
				this.isvs = res.data.data
			})
			// 音箱
			tcinfoserchall().then(res => {
				this.tcinfodata = res.data.data
			})
			//码牌
			ccinfoserchall().then(res => {
				this.ccdatas = res.data.data
				for (var i = 0; i < this.ccdatas.length; i++) {
					this.ccdatas[i].id = String(this.ccdatas[i].id)
				}
			})
			// 渠道
			channelinfo().then(res => {
				this.channel = res.data.data
			})

		},
		methods: {
			activ() {
				if (this.valuett != '') {
					let def = this.options.find((item) => item.id == this.valuett)
					mahinfodata({
						"mchName": def.mchName,
						"tid": def.tid
					}).then(res => {
						let chang = JSON.stringify(res.data.data[0])
						this.changeinfo = JSON.parse(chang)
						let numname=this.channel.findIndex((role) => role.id == this.changeinfo.channel)
						this.channelname=this.channel[numname].channelName
						this.ables = true
					})
				}
				this.$forceUpdate()
			},
			// 短信验证
			receiveCode() {
				sendverdata(this.changeinfo.phone).then(res => {
					this.phonedata = res.data.data
				})
				this.timerTf = false
				this.countDownNum = 60
				this.timer = setInterval(() => {
					this.countDownNum--
					if (this.countDownNum <= -1) {
						this.timerTf = true
						this.clearTime()
					}
				}, 1000)
			},
			clearTime() {
				this.timerTf = true
				clearInterval(this.timer)
			},

			formatDate(objDate, fmt) {
				var o = {
					"M+": objDate.getMonth() + 1, //月份
					"d+": objDate.getDate(), //日
					"h+": objDate.getHours() % 12 == 0 ? 12 : objDate.getHours() % 12, //小时
					"H+": objDate.getHours(), //小时
					"m+": objDate.getMinutes(), //分
					"s+": objDate.getSeconds(), //秒
					"q+": Math.floor((objDate.getMonth() + 3) / 3), //季度
					"S": objDate.getMilliseconds() //毫秒
				};
				if (/(y+)/.test(fmt))
					fmt = fmt.replace(RegExp.$1, (objDate.getFullYear() + "").substr(4 - RegExp.$1.length));
				for (var k in o)
					if (new RegExp("(" + k + ")").test(fmt))
						fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k])
							.length)));
				return fmt;
			},

			// 手机验证，保存信息
			subfrom(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						if (this.input == this.phonedata) {
							let arrayid = []
							for (var i = 0; i < this.ruleForm.deviceIds.length; i++) {
								arrayid.push(this.ruleForm.deviceIds[i].value.deviceId)
							}
							let obj = {
								"createTime": this.formatDate(new Date(), "yyyy-MM-dd HH:mm:ss"),
								"deviceIds": JSON.stringify(arrayid),
								"expireTime": this.ruleForm.expireTime,
								"id": this.ruleForm.id,
								"isPayFailNotify": this.isPayFailNotify,
								"mchName": this.changeinfo.mchName,
								"mid": this.changeinfo.mid,
								"payBeforeText": this.ruleForm.payBeforeText,
								"payNotifySelect": JSON.stringify(this.ruleForm.payNotifySelect),
								"phone": this.changeinfo.phone,
								"tid": this.changeinfo.tid,
								"username": this.ruleForm.username,
								"isvNo":this.ruleForm.isvNo,
								"channelId":this.changeinfo.channel
							}
							let objj={}
							if(this.changeinfo.channel == "1"){
								 objj = {
								"username": this.ruleForm.username,
								"merchantCode": this.changeinfo.mid,
								"terminalCode": this.changeinfo.tid,
								}
							}else{
								 objj = {
								"username": this.ruleForm.username,
								"mid": this.changeinfo.mid,
								"tid": this.changeinfo.tid,
								}
							}
							// 查询是否重复绑定
							levitastid({
								"username": this.ruleForm.username,
								"channelId":this.changeinfo.channel
							}).then(res=>{
								console.log(res.data.data.length)
								let isrepeat=res.data.data.length==0
								if(isrepeat){
									// console.log(obj)
									//保存到levitas
									levcreat(obj).then(ress => {
										//保存到levitas.mid,tid
										mchpay_infoinit(objj).then(() => {
											// 同步到商户音箱信息表
											for (var y = 0; y < arrayid.length; y++) {
												tctcset({
													"id": this.ruleForm.id,
													"deviceId": arrayid[y],
													"is_del": 0
												})
											}
											this.$message.success("信息绑定成功")
											this.reload()
										})
									}).catch(err => {
										this.$message.error(err.response.data.error)
									})
								}else{
									this.$message.error("商户信息已存在")
								}
							})
						} else {
							this.$message.error('验证码输入错误！')
						}
					}
				})
				
			},

			// 增加设备
			addDomain() {
				for (var i = 0; i < this.ruleForm.deviceIds.length; i++) {
					this.ttru = Boolean(this.ruleForm.deviceIds[i].value != '')
				}
				if (this.ttru || this.ruleForm.deviceIds.length == 0) {
					this.ruleForm.deviceIds.push({
						value: ''
					});
				}
			},
			// 删除设备
			removeDomain(item) {
				var index = this.ruleForm.deviceIds.indexOf(item)
				if (index !== -1) {
					this.ruleForm.deviceIds.splice(index, 1)

				}
			},
			// 重置
			resetForm() {
				Object.assign(this.$data.myfrom, this.$options.data().myfrom)
			},
			// 查询
			serchcoed(n) {
				this.$router.push({
					path: '/merchant/businesslist',
					query: n
				})
			}

		}
	}
</script>

<style scoped>
	.inputBox {
		width: 100%;
		display: flex;
		justify-content: left;
		flex-wrap: wrap;
	}

	.el-input,
	.el-select {
		width: 250px;
		margin-right: 20px;
		height: 40px;
		/* margin-bottom: 30px; */
	}

	.btnbox {
		margin-top: 30px;
	}

	.el-button {
		margin-right: 30px;
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

	.chendiv {
		width: 50%;
	}

	.el-form {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.btnbox {
		width: 100%;
		justify-content: center;
	}

	:deep(.btnbox .el-form-item__content) {
		margin-left: 0;
		text-align: center;
	}

	.chendiv .el-form-item__content .el-input {
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

	:deep(.el-form-item__label) {
		width: 115px !important;
	}

	:deep(.el-form-item__error) {
		left: 15px;
		top:100%;
	}

	/deep/.bunnabc input::-webkit-outer-spin-button,
	/deep/.bunnabc input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}

	/deep/.bunnabc input[type="number"] {
		-moz-appearance: textfield;
	}

	/deep/.seridpbox .el-select {
		width: 200px !important;
	}
	
	/deep/.bottmtext .el-form-item__label {
		width: 170px !important;
	}
	/deep/.tctc .el-form-item {
		margin-bottom: 0 !important;
	}
	.additem{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	/deep/.additem .el-form-item__content{
		margin-left: 0px !important;
	}
	.ables{
		padding-left: 45px;
	}
</style>
