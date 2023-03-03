<template>
	<div class="datable">
		<el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
			style="width:100%;padding-bottom: 2.6rem;">
			<el-table-column prop="isv_no" label="服务商名称"  :formatter="sfktHouse">
			</el-table-column>
			<el-table-column prop="percentage" label="收益百分比" >
				<template slot-scope="scope" class="rebox">
					{{scope.row.percentage + '%'}}
				</template>
			</el-table-column>
			<el-table-column prop="create_at" label="创建时间">
			</el-table-column>
			<el-table-column prop="zip" label="操作">
				<template slot-scope="scope" class="rebox">
					<span  @click="open(scope.row)">修改</span>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination background @current-change="handleCurrentChange" :current-page="currentPage"
			:page-sizes="pageSizes" :page-size="PageSize" layout="prev, pager, next" :total="totalCount">
		</el-pagination>
		<!-- 蒙尘 -->
		<el-dialog title="修改服务商收益配置" append-to-body :visible.sync="dialogVisible" width="30%">
			<div class="chen">
				<el-form :model="ruleForm" :rules="rules"   ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="服务商:" prop="isv_no">
						<el-select disabled v-model="ruleForm.isv_no" placeholder="请选择服务商">
							<el-option v-for="(item,index) in isv" :key="index" :label="item.isv_name" :value="item.isv_no"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="收益百分比:" prop="percentage">
						<!-- <el-select v-model="ruleForm.yield_id" placeholder="请选择百分比">
							<el-option v-for="(item,index) in options" :key="index" :label="item.percentage + '%'" :value="item.yield_id"></el-option>
						</el-select> -->
						<el-input placeholder="输入百分比" v-model="ruleForm.percentage"></el-input>% 
					</el-form-item>
					 <p class="btn_box">
						 <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
					 </p>
				</el-form>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import Payment from '@/components/merchant/Payment.vue'
	import Channel from '@/components/merchant/Channel.vue'
	import {isvyieldquery,yieldqueryall} from '@/utils/mchinfo.js'
	import {isvc,isvyielddata} from '@/utils/merchant.js'
	export default {
		inject: ["reload"],
		data() {
			return {
				tableData: [],
				dialogVisible: false,
				// 默认显示第几页
				currentPage: 1,
				// 总条数，根据接口获取数据长度(注意：这里不能为空)
				totalCount: 1,
				// 个数选择器（可修改）
				pageSizes: [1, 2, 3, 4],
				// 默认每页显示的条数（可修改）
				PageSize: 8,
				isv:[],
				options:[],
				ruleForm:{
				},
				rules: {
					isv_no: [{
						required: true,
						message: '请选择商户',
						trigger: 'blur'
					}],
					yield_id: [{
						required: true,
						message: '请选择百分比',
						trigger: 'blur'
					}]
				},
			}

		},
		components: {
			Payment,
			Channel
		},
		created() {
			isvyieldquery().then(res=>{
				this.tableData=res.data.data
			})
			isvc().then(res=>{
				this.isv=res.data.data
			})
			yieldqueryall().then(res=>{
				this.options=res.data.data
			})
			this.$nextTick(()=>{
				this.getData()
			})
		},
		methods: {
			// 分页
			getData() {
				this.totalCount = this.tableData.length
			},
			// 显示第几页
			handleCurrentChange(val) {
				// 改变默认的页数
				this.currentPage = val
			},
			sfktHouse(row, index){
				for(var i=0;i<this.isv.length;i++){
					if(row.isv_no == this.isv[i].isv_no){
						return this.isv[i].isv_name
					}
				}
			},
			// yiddld(row, index){
			// 	for(var i=0;i<this.options.length;i++){
			// 		if(row.yield_id == this.options[i].yield_id){
			// 			return this.options[i].percentage + '%'
			// 		}
			// 	}
			// },
			// 修改
			open(n) {
				this.dialogVisible=true
				this.ruleForm=n
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						isvyielddata(this.ruleForm).then(res=>{
							this.$message.success("信息储存成功");
								this.reload()
								this.dialogVisible = false
							}).catch(err => {
								this.$message.error("失败");
							})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
		},
		watch:{
			// $route(n){
			// 	this.getdataList(n.query)
			// },
			tableData(){
				this.getData()
			},
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
		width: 70%;
	}
	.inpuyselent .el-input{
		width: 100%;
	}
	.el-form-item{
		width: 70%;
	}

	:deep(.el-form-item__label) {
		width: 150px !important;
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
		flex-direction: column;
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
		margin-left: 122px;
	}
	:deep(.el-form-item__label){
		width: 100px !important;
	}
	:deep(.el-form-item__error){
		top:100%;
		left: 16px;
	}
	.btn_box{
		text-align: center;
	}
</style>
