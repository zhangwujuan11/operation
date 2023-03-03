<template>
	<div class="maincon">
		<div class="infobox">
			<div class="inputBox">
				<el-form :model="myfrom" ref="myfrom" class="demo-ruleForm">
					<el-form-item>
						<el-date-picker
						:clearable="false"
						v-model="myfrom.monthdata"
						class="timePicker"
						type="month"
						placeholder="请选择年月"
						format="yyyy-MM"
						value-format="yyyyMM"
						>
						</el-date-picker>
					</el-form-item>
					<!-- <el-form-item>
						<el-input placeholder="输入应用名称" v-model="myfrom.appName"></el-input>
					</el-form-item> -->
					<!-- <el-form-item>
						<el-select v-model="myfrom.state" placeholder="应用状态">
					  <el-option v-for="item in options" :key="item.value" :label="item.label"
								:value="item.value">
					 	</el-option>
						</el-select>
					</el-form-item> -->
				</el-form>
				<div class="btnbox">
					<el-button type="primary" @click="gomerchangIndex(myfrom)">查询</el-button>
					<el-button @click="resetForm()">重置</el-button>
					<el-upload class="upload-demo" action="/" :on-change="handleChange"
						accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
						<el-button type="primary">导入</el-button>
					</el-upload>
					<el-button v-if="isadmin==1" class="button" style="width:150px;" :disabled="issend" @click="binPH" type="primary">{{countDown}}</el-button>
					<!-- <el-button  @click="gocount">计算</el-button> -->
				</div>
			</div>

			<Table></Table>
		</div>
		<!-- 蒙尘 -->
		<!-- <el-dialog title="新增商户" append-to-body :visible.sync="dialogVisible" width="50%">
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
		</el-dialog> -->
	</div>
</template>

<script>
	import Table from '@/components/details/Indextable.vue'
	import {excalcreat,excalquery,exqueryall} from '@/utils/login.js'
	import {gocont} from '@/utils/serviceprovider.js'
	import { Loading } from 'element-ui';
	export default {
		inject: ["reload"],
		components: {
			Table
		},
		data() {
			return {
				myfrom: {
					monthdata:''
				},
				tableData:[],
				teltru:false,
				countDown: '计算',
				countdown: 60,
				issend:false,
				isadmin:JSON.parse(localStorage.getItem('isadmin')) 
			}
		},
		created() {
			
		},
		methods: {
			// 导入
			handleChange() {
				Loading.service();
				let _this = this;
				let f = event.currentTarget.files[0];
				let rABS = false; //是否将文件读取为二进制字符串
				let reader = new FileReader();
				FileReader.prototype.readAsBinaryString = function(f) {
					let binary = "";
					let rABS = false; //是否将文件读取为二进制字符串
					let wb; //读取完成的数据
					let outdata;
					let reader = new FileReader();
					reader.onload = function(e) {
						let bytes = new Uint8Array(reader.result);
						let length = bytes.byteLength;
						for (let i = 0; i < length; i++) {
							binary += String.fromCharCode(bytes[i]);
						}
						let XLSX = require("xlsx");
						if (rABS) {
							wb = XLSX.read(btoa(fixdata(binary)), {
								//手动转化
								type: "base64",
							});
						} else {
							wb = XLSX.read(binary, {
								type: "binary",
							});
						}
						outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{range:1}); //outdata就是你想要的东西

						const keyObj = {
							"月份": "month",
							"拓展渠道": "developChannel",
							"拓展渠道代码": "developChannelCode",
							"分润模式": "shareProfitPattern",
							"项目细分": "project",
							"接入方式": "accessWay",
							"阶梯费率": "tieredRate",
							"商户入网时间":'mchAccessTime',
							"商户名称":'mchName',
							"应用名称":'appName',
							"商户号":'mid',
							"地区代码":'locationCode',
							"地区名称":'location',
							"借记卡扣率":'debitCardDeductionRate',
							"贷记卡扣率":'crebitCardDeductionRate',
							"外卡借记扣率":'wildCardDebitDeductionRate',
							"外卡贷记扣率":'wildCardCrebitDeductionRate',
							"微信扣率":'wechatDeductionRate',
							"支付宝扣率":'alipayDeductionRate',
							"银联二维码借记扣率":'unionpayQrcodeDebitdeductionRate',
							"银联二维码贷记扣率":'UnionpayQrcodeCrebitdeductionRate',
							"千元以下银联二维码交易笔数":'below1000UnionPayQrcodeTransactionsNum',
							"千元以下银联二维码交易金额":'below1000UnionPayQrcodeTransactionsAmount',
							"千元以下银联二维码交易收单收益":'below1000UnionPayQrcodeTransactionsReceiptIncome',
							"千元以上银联二维码交易笔数":'above1000UnionPayQrcodeTransactionsNum',
							"千元以上银联二维码交易金额":'above1000UnionPayQrcodeTransactionsAmount',
							"千元以上银联二维码交易收单收益":'above1000UnionPayQrcodeTransactionsReceiptIncome',
							"总交易笔数":'totalTransactionsNum',
							"总交易金额":'totalTransactionsAmount',
							"总收单收益":'totalTransactionsReceiptIncome',
							"品牌费":'brandFee',
							"扣除品牌费后收单收益":'receiptIncomeAfterDeductingBrandFee',
							"我司收益":'companyIncome',
							"第三方收益":'thirdPartyIncome',
							"待扣D1服务费（元）":'d1ServiceChargeDeducted',
							"第三方实际收益（元）":'thirdPartyActualIncome',
							"备注":'remark',
							"交易类型":'transactionsType',
							"产权方代码":'propertyOwnerCode',
							"产权方":'propertyOwner',
							"分润比例":'shareProfitProportion',
							"分润公式":'shareProfitFormula',
							"DM发展方":'dmDevelopingSide'
						};

						outdata.forEach((item) => {
							// 将中文的键名替换成英文的
							for (let k in keyObj) {
								let newKey = keyObj[k];
								if (newKey) {
									item[newKey] = item[k];
									delete item[k];
								}
								if(item[newKey] == undefined){
									item[newKey]=''
								}
							}
						})
						let len=outdata.at(-1)
						if(len.month == '' && len.developChannel == ''){
							outdata.pop()
						}
						let mouthdata=outdata[0].month
						excalquery(mouthdata).then(res=>{
							if(res.data.data.length>1){
								let loadingInstance = Loading.service();
								loadingInstance.close();
								_this.$message.error( mouthdata+"已经导入,请勿重复导入")
							}else{
								// 将表哥提交levitas
								excalcreat(outdata).then(()=>{
									let loadingInstance = Loading.service();
									 loadingInstance.close();
									 _this.$message.success("导入成功！")
									 this.reload()
								})
							}
						})
					};
					reader.readAsArrayBuffer(f);
				};
				if (rABS) {
					reader.readAsArrayBuffer(f);
				} else {
					reader.readAsBinaryString(f);
				}
			},
			// 重置
			resetForm() {
				Object.assign(this.$data.myfrom, this.$options.data().myfrom)
			},
			// 查询
			gomerchangIndex(n) {
				this.$router.push({
					path: '/details',
					query: n
				})
			},
			loading(){
			     //启动定时器
			     this.issend=true
			     this.countdown--; //定时器减1
			     this.countDown = "重新计算（" + this.countdown +"）";
			    },
			clearTimer(){
			   //清除定时器
			   clearInterval(this.timer);
			   this.timer = null;
			},
			binPH(){
			      this.teltru=false
			      this.loading()
			    gocont()
			      this.timer = setInterval(() => {
			        //创建定时器
			        if(this.countdown == 0){
			            this.issend=false
			             this.clearTimer(); //关闭定时器
			             this.countDown="计算"
			             this.countdown=60
			        }else{
			           this.loading();
			        }
			      },1000)
			},
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
</style>
