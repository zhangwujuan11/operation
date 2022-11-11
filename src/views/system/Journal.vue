<template>
	<div class="maincon">
		<Travelpermit>
			<div slot="travel">
				主页 / 系统管理 / 系统日志
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
				      end-placeholder="结束日期"
					  format="yyyy 年 MM 月 dd 日"
					   value-format="yyyy-MM-dd">
				    </el-date-picker>
				  </div>
				<el-input v-model="ruleForm.userId" placeholder="用户ID"></el-input>
				<el-input v-model="ruleForm.userName" placeholder="用户名"></el-input>
				 <el-select v-model="ruleForm.sysType" placeholder="所属系统">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
			</div>
			<div class="btnbox">
				<el-button type="primary" @click="serchdata">查询</el-button>
				<el-button @click="resetfrom">重置</el-button>
			</div>
			<Table></Table>
		</div>
	</div>
</template>

<script>
	import Travelpermit from '@/components/Travelpermit.vue'
	import Table from '@/components/ordermanagement/Journaltable.vue'
	export default{
		components:{
			Travelpermit,
			Table
		},
		data(){
			return{
				riqi:'',
				options: [{
				  value: 'MGR',
				  label: '运营平台'
				}, {
				  value: 'MCH',
				  label: '商户系统'
				}],
				dialogVisible:false,
				ruleForm: {
					createdStart: '',
					createdEnd: '',
					userId:'',
					userName: '',
					sysType: ''
				}
			}
		},
		methods:{
			// 重置
			resetfrom(){
				Object.assign(this.$data.ruleForm,this.$options.data().ruleForm)
				this.riqi=[]
			},
			// 查询
			serchdata(){
				this.ruleForm.createdStart=this.riqi[0]
				this.ruleForm.createdEnd=this.riqi[1]
				this.$router.push({
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