<template>
	<div class="maincon">
		<Travelpermit>
			<div slot="travel">
				主页 / 订单管理 / 商户通知
			</div>
		</Travelpermit>
		<div class="infobox">
			<div class="inputBox">
				<div class="block">
				    <el-date-picker
				      v-model="riqi"
				      type="daterange"
				      range-separator="—"
				      start-placeholder="开始日期"
				      end-placeholder="结束日期">
				    </el-date-picker>
				  </div>
				<el-input placeholder="订单ID" v-model="ruleForm.orderId"></el-input>
				<el-input placeholder="商户订单号" v-model="ruleForm.mchOrderNo"></el-input>
				<el-input placeholder="商户号" v-model="ruleForm.mchNo"></el-input>
				<el-input placeholder="服务商号" v-model="ruleForm.isvNo"></el-input>
				<el-input placeholder="应用APPID" v-model="ruleForm.appId"></el-input>
				 <el-select v-model="ruleForm.state" placeholder="通知状态">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
				  <el-select v-model="ruleForm.orderType" placeholder="订单类型">
				     <el-option
				       v-for="item in options2"
				       :key="item.value"
				       :label="item.label"
				       :value="item.value">
				     </el-option>
				   </el-select>
			</div>
			<div class="btnbox">
				<el-button type="primary" @click="serchdata()">查询</el-button>
				<el-button @click="resetForm()">重置</el-button>
			</div>
			<Table></Table>
		</div>
	</div>
</template>

<script>
	import Travelpermit from '@/components/Travelpermit.vue'
	import Table from '@/components/ordermanagement/Notificationtable.vue'
	export default{
		components:{
			Travelpermit,
			Table
		},
		data(){
			return{
				riqi:[],
				options: [{
				  value: 1,
				  label: '通知中'
				}, {
				  value: 2,
				  label: '通知成功'
				}, {
				  value: 3,
				  label: '通知失败'
				}],
				options2: [{
				  value: 1,
				  label: '支付'
				}, {
				  value: 2,
				  label: '退款'
				},{
					value: 3,
					label: '转账'
				}],
				dialogVisible:false,
				ruleForm: {
					orderId: '',
					mchOrderNo: '',
					mchNo: null,
					isvNo: '',
					appId: '',
					state:null,
					orderType:null,
					createdStart:'',
					createdEnd:''
				}
			}
		},
		methods:{
			// 重置
			resetForm(){
				 Object.assign(this.$data.ruleForm, this.$options.data().ruleForm)
				 this.riqi=[]
			},
			// 查询
			serchdata(){
				this.ruleForm.createdStart=this.riqi[0]
				this.ruleForm.createdEnd=this.riqi[1]
				this.$router.push({
					path:'/ordermanagement/notification',
					query:this.ruleForm
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
		margin-bottom: 30px;
	}
	.el-button{
		margin-right: 30px;
	}
	.block{
		margin-right: 20px;
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
</style>