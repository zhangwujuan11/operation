<template>
	<div class="datable">
		<el-table
		:data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
		 style="width:100%;height: 100%;"
		 >
			<el-table-column
			  prop="wayCode"
			  label="支付方式代码"
			  width='250'>
			</el-table-column>
			<el-table-column
			  prop="wayName"
			  label="支付方式名称"
			  >
			</el-table-column>
			<el-table-column
			  prop="passageState"
			  label="状态"
			  >
			  <template slot-scope='scope'>
				  {{scope.row.ext.passageState | passageState}}
			  </template>
			</el-table-column>
			<el-table-column
			  label="操作"
			  >
			  <template>
				  <span class="control">
					  配置
				  </span>
			  </template>
			</el-table-column>
			
		  </el-table>
		  <!-- <p class="next"> <el-button >上一步</el-button></p> -->
		  <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage"
		  	:page-sizes="pageSizes" :page-size="PageSize" layout="prev, pager, next" :total="totalCount">
		  </el-pagination>
	</div>
</template>

<script>
	export default{
		props:['tableData'],
		filters:{
			passageState(e){
				if(e==1){
					return '开启'
				}else if(e==0){
					return '关闭'
				}
			}
		},
		data(){
			return{
				// 默认显示第几页
				currentPage: 1,
				// 总条数，根据接口获取数据长度(注意：这里不能为空)
				totalCount: 1,
				// 个数选择器（可修改）
				pageSizes: [1, 2, 3, 4],
				// 默认每页显示的条数（可修改）
				PageSize: 5
				}
				
		},
		created() {
			this.getData()
		},
		methods:{
			// 分页
			getData() {
				this.totalCount = this.tableData.length
			},
			// 显示第几页
			handleCurrentChange(val) {
				// 改变默认的页数
				this.currentPage = val
			}
		},
		watch:{
			tableData(n){
				this.getData()
			}
		}
		
	}
</script>

<style scoped>
	:deep(.el-table th.el-table__cell){
		background-color: #F5F5F5 !important;
	}
	
	:deep(.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf){
		border-bottom: none !important;
	}
	.next{
		width: 100%;
		height: 1.28rem;
		text-align: center;
		padding-bottom: 20px;
	}
	.el-table::before {
		height:0;
	}
	.el-button{
		border: 1px solid #278DE580;
		color: #278DE5;
	}
	.datable{
		height: 200px;
		overflow: hidden;
		overflow-y: scroll;
	}
	.control{
		color: #278DE5;
	}
	.el-pagination{
		margin-top: 0;
	}
</style>