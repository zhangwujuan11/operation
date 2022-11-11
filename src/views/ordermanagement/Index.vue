<template>
	<div class="maincon">
		<Travelpermit>
			<div slot="travel">
				主页 / 订单管理 / 支付订单
			</div>
		</Travelpermit>
		<div class="infobox">
			<div class="inputBox">
				<el-form :model="ruleForm" ref="myfrom" >
					<div class="block">
					   <el-date-picker
					        v-model="riqi"
					        type="daterange"
					        start-placeholder="开始日期"
					        end-placeholder="结束日期"
					       format="yyyy 年 MM 月 dd 日"
						    value-format="yyyy-MM-dd">
					      </el-date-picker>
					  </div>
					<el-input v-model="ruleForm.unionOrderId" placeholder="支付/商户/渠道订单号"></el-input>
					<el-input v-model="ruleForm.mchNo" placeholder="商户号"></el-input>
					<el-input v-model="ruleForm.isvNo" placeholder="服务商号"></el-input>
					<el-input v-model="ruleForm.appId" placeholder="应用APPID"></el-input>
					<el-select  v-model="ruleForm.state" placeholder="支付状态">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					  <el-select  v-model="ruleForm.notifyState" placeholder="回调状态">
					     <el-option
					       v-for="item in options2"
					       :key="item.value"
					       :label="item.label"
					       :value="item.value">
					     </el-option>
					   </el-select>
					   <el-select  v-model="ruleForm.divisionState" placeholder="分账状态">
					      <el-option
					        v-for="item in options3"
					        :key="item.value"
					        :label="item.label"
					        :value="item.value">
					      </el-option>
					    </el-select>
				</el-form>
				
			</div>
			<div class="btnbox">
				<el-button type="primary" @click="submintfrom">查询</el-button>
				<el-button  @click="resetForm()">重置</el-button>
			</div>
			<Table></Table>
		</div>
	</div>
</template>

<script>
	import Travelpermit from '@/components/Travelpermit.vue'
	import Table from '@/components/ordermanagement/Indextable.vue'
	export default{
		components:{
			Travelpermit,
			Table
		},
		data(){
			return{
				riqi:[],
				options: [{
				  value: 0,
				  label: '订单生成'
				}, {
				  value:1,
				  label: '支付中'
				}, {
				  value: 2,
				  label: '支付成功'
				}, {
				  value: 3,
				  label: '支付失败'
				}, {
				  value: 4,
				  label: '已撤销'
				},{
					value:5,
					label:'已退款'
				},{
					value:6,
					label:'订单关闭'
				}],
				options2:[
					{
						value:0,
						label:'未发送'
					},
					{
						value:1,
						label:'已发送'
					}
				],
				options3:[
					{
						value:0,
						label:'未发生分账'
					},
					{
						value:1,
						label:'等待分账任务处理'
					},{
						value:2,
						label:'分账处理中'
					},
					{
						value:3,
						label:'分账任务已结束'
					}
				],
				dialogVisible:false,
				ruleForm: {
					createdStart:'',
					createdEnd:'',
					unionOrderId:'',
					mchNo:'',
					isvNo:'',
					appId:'',
					state:null,
					notifyState:null,
					divisionState:null
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
			submintfrom(){
				this.ruleForm.createdStart=this.riqi[0]
				this.ruleForm.createdEnd=this.riqi[1]
				this.$router.push({
					path:'/ordermanagement/index',
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