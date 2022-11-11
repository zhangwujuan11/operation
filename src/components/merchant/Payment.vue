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
					
					<span class="ameter">填写参数 <i class="el-icon-arrow-right"></i></span>
				</li>
				<li v-if='nodata' class="nodata">
					<span>NODATA</span>
				</li>
				<!-- <p class="next"  v-if='!nodata'> <el-button type="primary">下一步</el-button></p> -->
			</ul>
		</div>
		
	</div>
</template>

<script>
	import {payConfigs} from '@/utils/merchant.js'
	export default{
		props:["pasend"],
		data(){
			return {
				paymentList:[],
				nodata:false
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
			gohome(){
				this.$router.push('/home')
			}
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