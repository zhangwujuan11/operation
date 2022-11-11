<template>
	<div class="maincon">
		<Travelpermit>
			<div slot="travel">
				主页 / 系统管理 / 用户角色管理 / 角色管理
			</div>
		</Travelpermit>
		<div class="infobox">
			<div class="inputBox">
				<el-input v-model="myFrom.roleId" placeholder="角色ID"></el-input>
				<el-input v-model="myFrom.roleName" placeholder="角色名称"></el-input>
			</div>
			<div class="btnbox">
				<el-button type="primary"  @click="getDatas(myFrom)">查询</el-button>
				<el-button  @click="resetForm()">重置</el-button>
			</div>
			<el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" style="width:100%;">
				<el-table-column prop="roleId" label="角色ID" >
				</el-table-column>
				<el-table-column prop="roleName" label="角色名称">
				</el-table-column>
				<el-table-column label="操作">
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
	</div>
</template>

<script>
	import Travelpermit from '@/components/Travelpermit.vue'
	import {rolelist} from '@/utils/system.js'
	export default{
		components:{
			Travelpermit
		},
		data(){
			return{
				tableData: [],
				myFrom:{
					roleId:'',
					roleName:''
				},
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
		created(){
			this.getDatas()
		},
		methods:{
			// 查询/获取
			getDatas(n){
				rolelist(n).then(res=>{
					this.tableData=res.data.data.records
				})
			},
			// 重置
			 resetForm() {
				Object.assign(this.$data.myFrom, this.$options.data().myFrom)
			 },
			 // 显示第几页
			 handleCurrentChange(val) {
			 	// 改变默认的页数
			 	this.currentPage = val
			 },
			 getData() {
			 	this.totalCount = this.tableData.length
			 }
			
		},
		watch:{
			tableData(){
				this.getData()
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
	
	.datable{
		height:450px;
		overflow: hidden;
		overflow-y: scroll;
	}
	.control{
		color: #278DE5;
		cursor: pointer;
	}
</style>