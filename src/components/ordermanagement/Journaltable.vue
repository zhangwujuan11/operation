<template>
	<div class="datable">
		<el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" style="width:100%;">
			<el-table-column prop="userName" label="用户名">
			</el-table-column>
			<el-table-column prop="userId" label="用户ID">
			</el-table-column>
			<el-table-column prop="userIp" label="用户IP">
			</el-table-column>
			<el-table-column label="所属系统">
				<template slot-scope="scope">
					<span class="sh">{{scope.row.sysType | sysType}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="methodRemark" label="操作描述">
			</el-table-column>
			<el-table-column prop="createdAt" label="创建日期">
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
	</div>
</template>

<script>
	import {sysLog} from '@/utils/system.js'
	export default {
		filters:{
			sysType(e){
				if(e=="MGR"){
					return '运营平台'
				}else if(e=='MCH'){
					return '商户系统'
				}
			}
		},
		data() {
			return {
				tableData: [],
				// 默认显示第几页
				currentPage: 1,
				// 总条数，根据接口获取数据长度(注意：这里不能为空)
				totalCount: 1,
				// 个数选择器（可修改）
				pageSizes: [1, 2, 3, 4],
				// 默认每页显示的条数（可修改）
				PageSize:5
			}
		},
		created() {
			
			this.getDatas()
		},
		methods: {
			getDatas(n){
				sysLog(n).then(res=>{
					this.tableData=res.data.data.records
				})
			},
			
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
			tableData(){
				this.getData()
			},
			$route(n){
				this.getDatas(n.query)
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

	:deep(.el-table .cell) {
		line-height: 35px;
		white-space: nowrap;
		overflow: hidden;
	}

	.next {
		width: 100%;
		height: 1.28rem;
		text-align: center;
		padding-bottom: 20px;
	}

	.el-table::before {
		height: 0;
	}

	.el-button {
		border: 1px solid #278DE580;
		color: #278DE5;
	}

	.datable {
		height: 500px;
		overflow: hidden;
		overflow-y: scroll;
	}

	.control {
		color: #278DE5;
		cursor: pointer;
	}

	.zz {
		color: #1C64A3;
		background-color: rgba(39, 141, 229, 0.2);
		border-radius: 4px;
		padding: 2px 5px;
		margin-right: 4px;
	}

	.sh {
		color: #52c41a;
		background-color: #f6ffed;
		border: 1px solid #b7eb8f;
		border-radius: 4px;
		padding: 2px 5px;
		margin-right: 4px;
	}
</style>
