<template>
	<div class="datable">
		<el-table :data="tableData" style="width:100%;padding-bottom: 2.6rem;">
			<el-table-column prop="mchName" label="商户名称">
			</el-table-column>
			<el-table-column prop="username" label="夸克登录名">
			</el-table-column>
			<el-table-column prop="mid" label="商户号">
			</el-table-column>
			<el-table-column prop="tid" label="终端号">
			</el-table-column>
			<el-table-column prop="channelId" label="通道/渠道" :formatter="levellist">
				<!-- <template #default="scope">
				  <div>{{ channel[scope.row.channelId - 1 ].channelName }}</div>
				 </template> -->
			</el-table-column>
			<el-table-column width='280' prop="createTime" label="创建日期">
			</el-table-column>
			<el-table-column prop="zip" label="操作">
				<template slot-scope="scope" class="rebox">
					<span @click="modify(scope.row)">修改</span>
					<!-- <span @click="configuration(scope.row.mchNo)">应用配置</span> -->
					<span style="color: red;" @click="open(scope.row)">删除</span>
					<!-- <div class="downshow" v-if="scope.row.downshow">
						<p>支付测试</p>
						<p>发起转账</p>
						<p @click="open(scope.row.mchNo,scope.$index)">删除</p>
					</div> -->
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			background
			@current-change="handleCurrentChange" 
			:current-page="currentPage"
			:page-sizes="pageSizes" 
			:page-size="PageSize" 
			layout="prev, pager, next"
			:total="totalCount">
		</el-pagination>

		<!-- 蒙尘 -->
		<el-dialog title="修改商户绑定信息" append-to-body :visible.sync="dialogVisible" width="50%">
			<div class="chen">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<div class="chendiv">
						<el-form-item label="商户:">
							<el-select v-model="valuett" :disabled="true">
							 <!-- <el-option v-for="(item,index) in options" :key="index"
									:label="item.mchName + '(' + item.tid + ')'" :value="item.id">
								</el-option> -->
							</el-select>
						</el-form-item>
						<el-form-item label="码牌:" prop="id">
							<el-select v-model="ruleForm.id" filterable value-key="" placeholder="码牌名称/码牌ID">
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
						<div class="ables">
							<p>商户名:{{ruleForm.mchName}}</p>
							<p>商户号:{{ruleForm.mid}}</p>
							<p>终端号:{{ruleForm.tid}}</p>
							<p>渠道:{{channelname}}</p>
							<p>手机号:{{ruleForm.phone | phonepass}}</p>
							<div class="verification">
								{{ruleForm.phone | phonepass}}
								<el-button v-if="timerTf" class="sengbtn" type="primary" @click="receiveCode">
									{{ countDown }}
								</el-button>
								<el-button v-else class="sengbtn" type="primary" disabled>
									{{ countDownNum }} 秒后重新获取
								</el-button>
							</div>
							<p class="phoneclass">
								<el-input type="number" style="width: 60%;" class="bunnabc" v-model="input" placeholder="请输入短信验证码">
								</el-input>
							</p>
							<el-button @click="subfrom('ruleForm')" class="subable" type="primary" :disabled="!input != ''">确认修改</el-button>
						</div>
					</div>
					<div class="chendiv">
						<el-form-item label="商户登录名:" prop="username">
							<el-input :disabled="true" type="text" v-model="ruleForm.username" placeholder='输入商户登录名称'></el-input>
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
		
		
		
		<!-- 支付配置 -->
	<!-- 	<el-dialog append-to-body :visible.sync="paymentVisible" width="45%" custom-class="paymentdialog">
			<div class="account">
				<el-tabs v-model="activeName">
					<el-tab-pane label="支付参数配置" name="first">
						<Payment></Payment>
					</el-tab-pane>
					<el-tab-pane label="支付通道配置" name="second">
						<Channel></Channel>
					</el-tab-pane>
				</el-tabs>
			</div>
		</el-dialog> -->
	</div>
</template>

<script>
	// import Payment from '@/components/merchant/Payment.vue'
	// import Channel from '@/components/merchant/Channel.vue'
	// import {mchInfo,delmchInfo,updataInfo,infomch} from '@/utils/merchant.js'
	import {mahinfoserchall,levitastid,resetlevtas,mchpay_infoset,tctcset,dellevtas,mchpay_infodel} from '@/utils/login.js'
	export default {
		inject:["reload"],
		props:["channel","ccdatas","isvs","tcinfodata"],
		filters: {
			phonepass(val) {
				if (val) {
					return (val.substring(3, 0)) + '****' + (val.substring(7));
				}
			},
			// channelname(e){
			// 	if(e == 1){
			// 		return '银联b扫c'
			// 	}else if(e == 2){
			// 		return '银联公众号c扫b'
			// 	}else if(e == 3){
			// 		return '666666666666666'
			// 	}
			// }
			
		},
		data() {
			return {
				tableData:[],
				ables: false,
				beforetext: false,
				isPayFailNotify: false,
				ruleForm: {
					mchName: '',
					id: '',
					expireTime: 30,
					deviceIds:[{
						value:''
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
					}],
					username:[{
						required: true,
						message: '请输入商户登录名',
						trigger: 'bule' 
					}]
				},
				activeName: 'first',
				// options: [],
				valuett: '',
				changeinfo: {},
				countDown: "发送验证码", // 倒计时
				timerTf: true,
				countDownNum: 60,
				subable: true,
				input: '',
				phonedata: '123',
				ttru: false,
				channelname:'',
				dialogVisible: false,
				// 默认显示第几页
				currentPage: 1,
				// 总条数，根据接口获取数据长度(注意：这里不能为空)
				totalCount: 1,
				// 个数选择器（可修改）
				pageSizes: [1, 2, 3, 4],
				// 默认每页显示的条数（可修改）
				PageSize:8
			}

		},
		// components:{
		// 	Payment,
		// 	Channel
		// },
		created() {
			mahinfoserchall(1).then(res=>{
				this.tableData=res.data.data
				this.totalCount=res.data.count
			})
		},
		methods: {
			levellist(row,index){
				for(var i=0;i<this.channel.length;i++){
					if(row.channelId == this.channel[i].id){
						return this.channel[i].channelName
					}
				}
			},
			// 确认修改
			subfrom(formName) {
			       this.$refs[formName].validate((valid) => {
			         if (valid) {
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
							"mchName": this.ruleForm.mchName,
							"mid": this.ruleForm.mid,
							"payBeforeText": this.ruleForm.payBeforeText,
							"payNotifySelect": JSON.stringify(this.ruleForm.payNotifySelect),
							"phone": this.ruleForm.phone,
							"tid": this.ruleForm.tid,
							"username": this.ruleForm.username,
							"isvNo":this.ruleForm.isvNo,
							"channelId":this.ruleForm.channelId
						}
						let objj={}
						if(this.ruleForm.channelId == "1"){
							 objj = {
							"username": this.ruleForm.username,
							"merchantCode":this.ruleForm.mid,
							"terminalCode": this.ruleForm.tid,
							}
						}else{
							 objj = {
							"username": this.ruleForm.username,
							"mid": this.ruleForm.mid,
							"tid": this.ruleForm.tid,
							}
						}
						resetlevtas(obj).then(()=>{
							mchpay_infoset(objj).then(()=>{
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
						})
			         } else {
			           console.log('error submit!!');
			           return false;
			         }
			       });
			     },
			// 显示第几页
			handleCurrentChange(val) {
				mahinfoserchall(val).then(res=>{
					this.tableData=res.data.data
					// this.currentPage = val
				})
				
			},
			// 修改
			modify(n) {
				this.dialogVisible = true
				let numname=this.channel.findIndex((role) => role.id == n.channelId)
				this.channelname=this.channel[numname].channelName
				levitastid({
					"channelId":n.channelId,
					"username":n.username
				}).then(res=>{
					// console.log(res.data.data[0])
					if(res.data.data[0].payBeforeText != null){
						this.beforetext=true
					}
					if(res.data.data[0].isPayFailNotify == '1'){
						this.isPayFailNotify=true
					}else{
						this.isPayFailNotify=false
					}
					this.valuett=res.data.data[0].mchName + '(' + res.data.data[0].tid + ')'
					let obj={
						"channelId":res.data.data[0].channelId,
						"mchName":res.data.data[0].mchName,
						"expireTime":res.data.data[0].expireTime,
						"id":res.data.data[0].id,
						"payBeforeText":res.data.data[0].payBeforeText,
						"deviceIds":[],
						"isvNo":res.data.data[0].isvNo,
						"username":res.data.data[0].username,
						"isPayFailNotify":res.data.data[0].isPayFailNotify,
						"mid":res.data.data[0].mid,
						"phone":res.data.data[0].phone,
						"tid":res.data.data[0].tid,
					}
					// console.log(res.data.data[0].deviceIds)
					if(res.data.data[0].payNotifySelect != null){
						obj.payNotifySelect=JSON.parse(res.data.data[0].payNotifySelect)
					}
					if(res.data.data[0].deviceIds != null){
						let dev=JSON.parse(res.data.data[0].deviceIds)
						for(var i=0;i<dev.length;i++){
							obj.deviceIds.push({
							value:{
								deviceId:dev[i]
							}
							})
						}
					}
					this.ruleForm=obj
					// console.log(obj)
				})
			},
			// 删除
			open(n) {
				this.$confirm('确认删除？', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					n.isDel=1
					delete n.createTime
					// console.log(n)
					let objj={}				if(n.channelId == "1"){					 objj = {					"username": n.username,					"merchantCode":'',					"terminalCode":'',					}				}else{					 objj = {					"username": n.username,					"mid":'',					"tid":'',					}				}
					dellevtas(n).then(res=>{
						mchpay_infodel(objj).then(()=>{
							this.$message.success('删除成功')
							this.reload()
						})
						console.log(res)
					}).catch(()=>{
						this.$message.error('删除失败')
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
					
				});
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
			}
		},
		watch:{
			$route(n){
				this.morepaye(n.query)
			},
			// tableData(){
			// 	this.getData()
			// }
		}

	}
</script>

<style scoped>
	.datable {
		margin-top: 30px;
		width: 100%;
	}

	:deep(.el-table th.el-table__cell) {
		background-color: #F5F5F5 !important;
	}

	.cell span {
		color: #278DE5;
		margin-right: 0.533333rem;
	}

	.cell span img {
		width: 0.24rem;
		height: 0.24rem;
		margin-left: 0.186667rem;
	}

	:deep(.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf) {
		border-bottom: none !important;
		cursor: pointer;
	}

	.downshow {
		width: 150px;
		height: 100px;
		background-color: white;
		border-radius: 0.266667rem;
		position: absolute;
		top: 35px;
		box-shadow: 8px 0px 20px 8px rgba(0, 0, 0, 0.15);
		z-index: 1999;
		left: 46px;
	}

	.el-table__row:last-child .downshow,
	.el-table__row:nth-last-child(2) .downshow,
	.el-table__row:nth-last-child(3) .downshow {
		top: -90px;
	}

	.downshow p {
		width: 100%;
		height: 0.906667rem;
		text-align: center;
		line-height: 0.906667rem;
		color: #278DE5;
	}

	.downshow p:last-child {
		color: #E56C6C;
	}

	.el-table::before {
		height: 0;
	}

	:deep(.el-table__row td:last-child) {
		position: relative;
	}

	/* 蒙尘 */
	:deep(.el-dialog) {
		border-radius: 10px !important;
	}

	:deep(.el-dialog__header) {
		border-bottom: 1px solid rgba(196, 196, 196, 0.5);
	}

	.appsecretBtn {
		width: 150px;
		height: 30px;
		border: 0.026667rem solid #278DE5;
		border-radius: 5px;
		background-color: white;
		color: #278DE5;
		margin-left: 50px;
	}

	:deep(.el-input__inner) {
		border-radius: 0.133333rem;
	}

	.el-textarea {
		width: 180px;
		height: 80px;
	}

	.el-form-item__content .el-input {
		width: 50%;
	}

	:deep(.el-form-item__label) {
		width: 150px !important;
	}


	/* 支付配置 */
	.account {
		width: 100%;
		background-color: white;
		position: relative;
	}

	:deep(.el-tabs__nav) {
		width: 8.8rem;
		display: flex;
	}

	:deep(.el-tabs__nav-scroll) {
		display: flex;
		justify-content: left;
		width: 80%;
	}

	:deep(.el-tabs__active-bar) {
		height: 0.106667rem;
	}

	:deep(.el-tabs__nav-wrap::after) {
		height: 1px;
	}

	:deep(.el-tabs__item) {
		color: #515151;
	}

	:deep(.paymentdialog .el-dialog__body) {
		padding-top: 0;
	}

	:deep(.paymentdialog .el-dialog__header) {
		border: none;
	}

	:deep(.paymentdialog .el-dialog__header) {
		padding: 24px 20px 10px;
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
	.el-form-item::after{
		width: 100%;
	}
	.savediv{
		width: 80%;
		display: flex;
		justify-content: space-between;
	}
	.accou{
		width: 100px;
		text-align: right;
		padding-right: 12px;
		box-sizing: border-box;
	}
	.savediv .el-form-item{
		display: flex;
		width: 50%;
		justify-content: left;
		align-items: center;
	}
	
	:deep(.savediv .el-form-item .el-form-item__label){
		width: 200px !important;
	}
	:deep(.savediv .el-form-item__content){
		margin-left: 3px !important;
	}
	:deep(.el-form-item__error){
		left: 55px !important;
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
	/deep/.seridpbox{
		display: flex !important;
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
	/deep/.additem  .el-form-item__label{
		width: 300px !important;
	}
</style>
