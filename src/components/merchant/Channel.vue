<template>
	<div class="channel">
		<el-form :model="ruleForm"  status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
		  <el-form-item  prop="pass">
			<el-input type="text" v-model="ruleForm.wayCode" placeholder='支付方式代码'></el-input>
		  </el-form-item>
		  <el-form-item prop="checkPass">
			<el-input  type="text" v-model="ruleForm.wayName" placeholder='支付方式名称'></el-input>
		  </el-form-item>
		  <el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		  </el-form-item>
		</el-form>
		<Tabledata :tableData="chanList"></Tabledata>
	</div>
</template>

<script>
	import Tabledata from '@/components/merchant/Paymenttable.vue'
	import {payPassages} from '@/utils/merchant.js'
	export default{
		components:{
			Tabledata
		},
		props:['pasend'],
		 data() {
		      return {
		        ruleForm: {
		          wayCode: '',
		          wayName:'',
		        },
				 chanList:[],
		      }
		    },
			created() {
				this.payData({appId:this.pasend})
				this.ruleForm.appId=this.pasend
			},
			
		    methods: {
		      submitForm(formName) {
		        console.log(this.ruleForm)
				this.payData(this.ruleForm)
		      },
		      resetForm(formName) {
		         Object.assign(this.$data.ruleForm, this.$options.data().ruleForm)
		      },
			  payData(val){
			  	payPassages(val).then(res=>{
					this.chanList=res.data.data.records
			  	})
			  }
		    },
			watch:{
				pasend(n){
					this.payData({appId:n})
					this.ruleForm.appId=n
				}
			}
	}
</script>

<style scoped>
	.el-select{
		width: 100%;
	}
	.el-form{
		width: 100%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
	.el-form-item{
		width: 100%;
		display: flex;
		justify-content: left;
	}
	:deep(.el-form-item__content){
		margin-left: 0 !important;
	}
	:deep(.el-input--suffix .el-input__inner){
		padding-right: 0.4rem !important;
		width: 200px;
	}
	
	.el-table{
		 display: block;
		 overflow-x: auto;
	}
	.channel{
		padding-top: 1.6rem;
	}
</style>