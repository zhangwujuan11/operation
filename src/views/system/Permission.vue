<template>
	<div class="maincon">
		<Travelpermit>
			<div slot="travel">
				主页 / 系统管理 / 用户角色管理 / 权限管理
			</div>
		</Travelpermit>
		<div class="infobox">
			<div class="inputBox">
				<el-select v-model="valuechoose">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<el-table 
			:data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" 
			style="width:100%;" 
			row-key="entId"
			:tree-props="{children: 'children', hasChildren: 'hasChildren'}"
			>
				<el-table-column prop="entId" width='300' label="资源权限ID">
				</el-table-column>
				<el-table-column prop="entName"  label="资源名称">
				</el-table-column>
				<el-table-column prop="menuIcon"   label="图标">
				</el-table-column>
				<el-table-column prop="menuUri"  label="路径">
				</el-table-column>
				<el-table-column prop="componentName"  label="组件名称">
				</el-table-column>
				<el-table-column prop="entType"  label="类型">
				</el-table-column>
				<el-table-column prop="state"  label="状态">
					<template slot-scope="scope">
						{{scope.row.state | state}}
					</template>
				</el-table-column>
				<el-table-column prop="entSort"  label="排序">
				</el-table-column>
				<el-table-column prop="updatedAt"  label="修改时间" width="250">
				</el-table-column>
				<!-- <el-table-column prop="status" label="操作">
				</el-table-column> -->
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
	</div>
</template>

<script>
	import Travelpermit from '@/components/Travelpermit.vue'
	import {showTree} from '@/utils/system.js'
	export default {
		filters: {
			state(e) {
				if (e == 0) {
					return '停用'
				} else if (e == 1) {
					return '启用'
				}
			}
		},
		components: {
			Travelpermit
		},
		data() {
			return {
				options: [{
					value: 'MCH',
					label: '显示菜单：商户系统'
				}, {
					value: 'MGR',
					label: '显示菜单：运营平台'
				}],
				valuechoose: 'MGR',
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
			this.getDatas('MGR')
		},
		methods: {
			getDatas(n) {
				showTree({
					sysType: n
				}).then(res => {
					this.tableData = res.data.data
				})
			},
			// 分页
			getData() {
				this.totalCount = this.tableData.length
			},
			// 显示第几页
			handleCurrentChange(val) {
				// 改变默认的页数
				this.currentPage = val
			},
			
		},
		watch:{
			tableData(){
				this.getData()
			},
			valuechoose(n){
				this.getDatas(n)
			}
		}
		
	}
</script>
<style scoped>
	.inputBox {
		width: 100%;
		display: flex;
		justify-content: left;
		flex-wrap: wrap;
	}

	.el-input,
	.el-select {
		width: 250px;
		margin-right: 20px;
		height: 40px;
		margin-bottom: 30px;
	}

	.btnbox {
		margin-top: 30px;
		margin-bottom: 30px;
	}

	.el-button {
		margin-right: 30px;
	}

	:deep(.el-table th.el-table__cell) {
		background-color: #F5F5F5 !important;
	}

	/* :deep(.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf) {
		border-bottom: none !important;
	} */

	.next {
		width: 100%;
		height: 1.28rem;
		text-align: center;
		padding-bottom: 20px;
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
	}
	:deep(.el-table--fit){min-height: 500px;overflow: scroll;}
	.el-table--fit::-webkit-scrollbar {
    display: none; /* Chrome Safari */
}
</style>
