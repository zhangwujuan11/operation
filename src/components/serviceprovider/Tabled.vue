<template>
	<div class="datable">
		<el-table :data="tableData" style="width:100%;"  @row-click="showimg">
			<el-table-column  prop="date" label="日期">
			</el-table-column>
			<el-table-column prop="income" label="分润总金额">
			</el-table-column>
			<el-table-column prop="profit" label="可分得金额">
			</el-table-column>
			<el-table-column  label="凭证" >
				<template slot-scope='scope'>
					<i class="el-icon-picture"></i>
				</template>
			</el-table-column>
		</el-table>
		<!-- 蒙尘 -->
		<el-dialog title="凭证展示" append-to-body :visible.sync="dialogVisible" width="50%">
			<div class="chen">
				<img class="shouimg" :src="imgsrc" alt="">
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import Payment from '@/components/serviceprovider/Payment.vue'
	import {serviceprovilist} from '@/utils/serviceprovider.js'
	export default {
		inject: ["reload"],
		
		components:{
			Payment
		},
		data() {
			return{
				tableData:[],
				dialogVisible:false,
				imgsrc:''
			}
		},
		created() {
			serviceprovilist().then(res=>{
				this.tableData=res.data.data.successful
			})
		},
		methods:{
			showimg(row){
				// console.log(row)
				this.imgsrc=row.cert_url
				this.dialogVisible=true
			}
		}
	}
</script>

<style scoped>
	:deep(.el-table th.el-table__cell) {
		background-color: #F5F5F5 !important;
	}

	:deep(.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf) {
		border-bottom: none !important;
	}


	.el-table::before {
		height: 0;
	}

	.datable {
		height: 450px;
		overflow: hidden;
		overflow-y: scroll;
	}

	.control {
		color: #278DE5;
		cursor: pointer;
		margin-right: 15px;
	}

	/* 蒙尘 */
	:deep(.el-dialog) {
		border-radius: 10px !important;
	}

	:deep(.el-dialog__header) {
		border-bottom: none;
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

	.el-table--fit {
		height: 390px;
	}
	
	:deep(.el-dialog__body) {
		padding:24px 20px 10px;
	}
	.shouimg{
		width: 100%;
	}
</style>
