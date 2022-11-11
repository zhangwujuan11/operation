<template>
	<div class="maincon">
		<div class="home">
			<div class="infobox transaction">
				<p>今日交易金额</p>
				<p>
					<span class="jine">￥{{homedatalist.todayAmount}}</span>
					共{{homedatalist.todayPayCount}}笔
				</p>
				<h5></h5>
				<p class="transactionbotrtonm">
					<span>昨日交易金额：￥{{homedatalist.todayAmount}}</span>
					<span>近七天交易金额：￥{{homedatalist.payWeek}}</span>
				</p>
			</div>
			<ul class="userinfo">
				<li 
				class="infobox zaitao" 
				@click="dialogVisible=true"
				
				
				 style="cursor: pointer;">
					<div class="informationLeft">
						<img src="@/assets/images/ellipse.png">
						<div>Hello，某某商户 <br> <span>超级管理员</span></div>
					</div>
					<img class="diandian" src="@/assets/images/diandiandain.png">
				</li>
				<div class="ulbox">
					<li class="infobox">
						<p style="margin-top: 0;">交易总金额</p>
						<p class="bigfont">￥{{total.totalAmount}}</p>
					</li>
					<li class="infobox">
						<p style="margin-top: 0;">服务商数量</p>
						<p class="bigfont">{{total.totalIsv}}</p>
					</li>
					<li class="infobox">
						<p style="margin-top: 0;">交易总笔数</p>
						<p class="bigfont">{{total.totalCount}}笔</p>
					</li>
					<li class="infobox">
						<p style="margin-top: 0;">商户数量</p>
						<p class="bigfont">{{total.totalMch}}</p>
					</li>
				</div>
			</ul>
			<Indexchart></Indexchart>
			<Piechart></Piechart>
		</div>
		
		
		<!-- 蒙尘 -->
		<el-dialog
		  title="用户信息"
		  append-to-body
		  :visible.sync="dialogVisible"
		  width="50%"
		  >
		  <div class="chen">
		  	<p>
		  		<span>所属系统：运营平台</span>
		  	</p>
		  	<p>
		  		<span>登录用户名：tiyan007</span>
		  	</p>
		  	<p>
		  		权限：<span class="greenbg">操作员</span>
		  	</p>
		  	<p>
		  		用户状态：<span class="greenborder">启用</span>
		  	</p>
		  	<p class="wh">
		  		<span>真实姓名：张飞</span>
		  	</p>
		  	<p class="wh">
		  		<span>手机号：18611117212</span>
		  	</p>
		  	<p class="wh">
		  		<span>性别：男</span>
		  	</p>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
	import Indexchart from '@/components/home/Indexchart.vue'
	import Piechart from '@/components/home/Piechart.vue'
	import {iToken,payAmountWeek,numCount} from '@/utils/home.js'
	export default {
		name: 'Home',
		data(){
			return{
				dialogVisible:false,
				homedatalist:{},
				total:{}
			}
		},
		components: {
			Indexchart,
			Piechart
		},
		
		mounted(){
				payAmountWeek().then(res=>{
					this.homedatalist=res.data.data
				})
				numCount().then(res=>{
					this.total=res.data.data
				})
				
				
				import('@qians/gen_header/gen_header.js').then((res) => {
				        console.log(res)
				      })
				
		},
		methods:{
			selectStyle(){
			}
			
		}
	}
</script>
<style scoped>
	.home {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.transaction {
		width: 48%;
		height: 280px;
		
	}
	
	.jine {
		font-size: 20px;
		margin-right: 10px;
	}

	.transaction h5 {
		border-bottom: 1px solid #C4C4C480;
		padding-top: 128px;
		box-sizing: border-box;
		margin-bottom: 0;
	}

	.transactionbotrtonm {
		display: flex;
		justify-content: space-between;
		margin-top: 10px;
	}

	.informationLeft {
		display: flex;
		align-items: center;
		font-size: 18px;
	}

	.informationLeft img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin-right: 10px;
	}

	.informationLeft span {
		font-size: 14px;
		line-height: 38px;
	}

	.diandian {
		width: 24px;
		height: 24px;
		position: absolute;
		right: 15px;
		top: 11px;
	}

	.userinfo {
		width: 47%;
		margin: 0;
	}
	.ulbox{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.ulbox li:nth-child(odd){
		width: 54%;
	}
	.ulbox li:nth-child(even){
		width: 40%;
	}
	.userinfo li {
		height: 82px;
		box-sizing: border-box;
		margin-bottom: 20px;
	}

	.bigfont {
		font-size: 18px;
	}
	/* 蒙尘 */
	.chen{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	p{
		font-size: 14px;
		/* margin-bottom:25px; */
		display: flex;
		align-items: center;
	}
	p img{
		width: 50px;
		height: 18px;
	}
	.wh{
		width: 100%;
	}
	:deep(.el-dialog){
		 border-radius: 10px !important;
	}
	:deep(.el-dialog__header){
		 border-bottom: 1px solid rgba(196, 196, 196, 0.5);
	}
	.greenbg{
		padding: 2px 10px;
		background-color: #5AE168;
		color: white;
		border-radius: 4px;
	}
	.greenborder{
		padding: 2px 10px;
		border-radius: 4px;
		border: 1px solid #27E53A;
		color: #27E53A;
		background-color: rgba(39, 229, 58, 0.2);
	}
</style>
