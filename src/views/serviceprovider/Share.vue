<template>
	<div class="maincon">
		<div class="infobox">
			 <el-tabs v-model="activeName">
			    <el-tab-pane label="B扫C" name="first"><Firsttable></Firsttable></el-tab-pane>
			    <el-tab-pane label="静态码C扫B" name="second"><Secondtable></Secondtable></el-tab-pane>
			    <el-tab-pane label="公众号C扫B" name="third"><Thirdtable></Thirdtable></el-tab-pane>
			  </el-tabs>
		</div>
		
	</div>
</template>

<script>
	import Firsttable from '@/components/share/Firsttable.vue'
	import Secondtable from '@/components/share/Secondtable.vue'
	import Thirdtable from '@/components/share/Thirdtable.vue'
	export default{
		inject:["reload"],
		components:{
			Firsttable,
			Secondtable,
			Thirdtable
		},
		data(){
			 return {
			        activeName: 'first'
			      };
		},
		created(){
			
		},
		methods:{
		}
	}
</script>
<style scoped>
	/* 修改 */
	/deep/.infobox{
		height: 100% !important;
	}
	/deep/.el-table--fit{
		height: calc(100% - 145px);
	}
	/deep/.el-table .cell{
		height: 30px;
		white-space: nowrap;
	}
	/deep/.el-table th.el-table__cell>.cell{
		overflow: initial;
	}
	/deep/.el-table__header{
		table-layout: initial;
	}
</style>