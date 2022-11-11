<template>
	<div class="configuration">
		<div>
			<ul>
				<li 
				v-for="(item,index) in paymentList"
				:key="index"
				>	<p>
						<img :src="item.icon" :style="{background:item.bgColor}">
						<span>
							<strong>{{item.ifName}}</strong> <br>
							未开通
						</span>
					</p>
					
					<span class="ameter" @click="paymentdilige()">填写参数 <i class="el-icon-arrow-right"></i></span>
				</li>
				<li v-if='nodata' class="nodata">
					<span>NODATA</span>
				</li>
				<!-- <p class="next"  v-if='!nodata'> <el-button type="primary">下一步</el-button></p> -->
			</ul>
		</div>
		<!-- 蒙尘 -->
		<el-dialog title="支付参数配置" append-to-body :visible.sync="dialogVisible" width="50%">
			<div class="chen">
				<el-form :model="ruleForm" status-icon @submit.native.prevent :rules="rules" ref="ruleForm"
					label-width="100px" class="demo-ruleForm">
					<div class="chendiv">
						<el-form-item label="支付接口费率" prop="ifRate">
							<el-input type="text" v-model="ruleForm.ifRate" placeholder='输入商户名称'></el-input>
						</el-form-item>
						<el-form-item label="备注" prop="remark">
							<el-input type="textarea" :rows="2" placeholder="请输入备注信息" v-model="ruleForm.remark">
							</el-input>
						</el-form-item>
					</div>
					<div class="chendiv">
						<el-form-item label="状态" prop="state">
							<el-radio-group size="small" v-model="ruleForm.state">
								<el-radio :label="0">停用</el-radio>
								<el-radio :label="1">启用</el-radio>
							</el-radio-group>
						</el-form-item>
					</div>
					<div class="btnbox">
						<el-form-item>
							<el-button>取消</el-button>
							<el-button type="primary" @click="savechange('ruleForm')">保存</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {payConfigs} from '@/utils/serviceprovider.js'
	export default{
		inject: ["reload"],
		props:["pasend"],
		data(){
			//表单校验
			var validateValue = async (rule, value, callback) => {
				let reg = /^100$|^(\d|[1-9]\d)(\.\d{1,4})*$/
				if (!reg.test(this.ruleForm.ifRate) && this.ruleForm.ifRate != '') {
					callback(new Error('请输入0-100之间的数字，最多四位小数'))
				}
			}
			
			return {
				paymentList:[],
				nodata:false,
				ruleForm: {
					ifRate:'',
					remark: ''
				},
				rules: {
					ifRate: [{
						validator: validateValue,
						trigger: 'blur'
					}]
				},
				dialogVisible: false,
			}
		},
		created() {
			this.payData(this.pasend)
		},
		methods:{
			payData(val){
				payConfigs(val).then(res=>{
					this.paymentList=res.data.data
						this.nodata=false
						for(var i=0;i<this.paymentList.length;i++){
							if(this.paymentList[i].icon==null){
								this.paymentList[i].icon=require('@/assets/images/Rectangle18.png')
							}
						}
				}).catch(()=>{
					this.nodata=true
				})
			},
			// 填写参数
			paymentdilige(){
				this.dialogVisible=true
			},
			// 修改
			savechange(formName) {
			       this.$refs[formName].validate((valid) => {
			         if (valid) {
			        console.log("123")
					this.reload()
			         } else {
			           return false;
			         }
			       });
			     },
		},
		watch:{
			pasend(n){
				this.payData(n)
			}
		}
	}
</script>

<style scoped>
	.configuration{
		width:100%;
		height: 440px;
		overflow: hidden;
		overflow-y: scroll;
		/* scrollbar-width: none; */
		/* -ms-overflow-style: none; */
	}
	/* .configuration::-webkit-scrollbar {
	    display: none; 
	} */
	
	.configuration ul{
		width: 100%;
		margin-top: 26px;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.configuration ul li{
		width: 48%;
		margin-bottom:20px;
		border: 1px solid #c4c4c4;
		border-radius:10px;
		padding:15px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.configuration ul li p{
		display: flex;
		align-items: center;
	}
	.configuration ul li p span{
		margin-left: 15px;
		cursor: pointer;
	}
	.configuration ul li img{
		width:75px;
		height:50px;
		border-radius:10px;
	}
	.configuration ul .nodata{
		width: 100%;
		height: 200px;
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
		font-size: 30px;
	}
	.next{
		width: 100%;
		height: 1.28rem;
		background-color: white;
		text-align: center;
	}
	.ameter{
		color: #1a79ff;
		cursor: pointer;
	}
</style>