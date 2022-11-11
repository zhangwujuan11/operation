<template>
	<div class="linechart">
		<p class="linecharttitle">
			<span>交易统计</span>
			<el-select v-model="value" placeholder="请选择" @change="changeRecent">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
		</p>
		<div style="width: 90%;height: 400px;" ref="piechart" id="piechart"></div>
	</div>
</template>

<script>
	import moment from 'moment'
	import {payCount} from '@/utils/home.js'
	export default {
		data() {
			return {
				options: [{
					value: 6,
					label: '最近七天'
				}, {
					value: 5,
					label: '最近六天'
			 }, {
					value: 4,
					label: '最近五天'
				}, {
					value: 3,
					label: '最近四天'
				}, {
					value: 2,
					label: '最近三天'
				}],
				value: 6,
				CollectionList: [], //收款
				dalist: [], //显示天数
				refundList: [], //退款
			}
		},
		mounted() {
			this.changeRecent(6)
		},
		methods: {
			//初始化echarts
			echartsInit() {
				let linearBarDom = this.$echarts.getInstanceByDom(this.$refs.piechart); //有的话就获取已有echarts实例的DOM节点。
				     if (linearBarDom == null) { // 如果不存在，就进行初始化。
				         linearBarDom = this.$echarts.init(this.$refs.piechart);
				     }
				linearBarDom.setOption({
					tooltip: {
						trigger: 'axis',
						axisPointer: {
					 	// Use axis to trigger tooltip
							type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
						}
					},
					xAxis: {
						name: '日期',
						type: 'category',
						data:this.dalist,
						axisLine: {
							lineStyle: {
								color: "#515151",
							}
						}

					},
					yAxis: {
						name: '(元/日)',
						type: 'value',
						axisLine: {
							lineStyle: {
								color: "#515151",
							}
						}
					},
					legend: {
						data: ['收款', '退款'],
						icon: 'circle',
						right: 'right',
						textStyle: {
							color: "#515151",
						},
					},
					series: [{
							name: "收款",
							type: 'bar',
							data:  this.CollectionList,
							barGap: '20%',
							barCategoryGap: '40%',
							itemStyle: {
								color: {
									type: 'linear',
									x: 0,
									y: 1,
									colorStops: [{
											offset: 0,
											color: 'rgba(139, 224, 194, 0.06)',
										},
										{
											offset: 1,
											color: '#6CE5BA',
										}
									],
									global: false
								},
								borderRadius: [10, 10, 0, 0],
							},
							emphasis: {
								itemStyle: {
									color: '#ccc', //hover时改变柱子颜色
								}
							},
							textStyle: {
								color: "#fff",
							},
						},
						{
							name: "退款",
							type: 'bar',
							data: this.refundList,
							itemStyle: {
								color: {
									type: 'linear',
									x: 0,
									y: 1,
									colorStops: [
										// 0%处的颜色
										{
											offset: 0,
											color: 'rgba(229, 108, 108, 0.06)',
										},
										{
											offset: 1,
											color: '#E56C6C',
										}
									],
								},
								borderRadius: [10, 10, 0, 0],
							},
							emphasis: {
								itemStyle: {
									color: '#ccc', //hover时改变柱子颜色
								}
							},
						}
					]
				})
			},
			// 日期选择
			changeRecent(value) {
			         let fmt = moment().subtract(value, 'days').format('YYYY-MM-DD');
					 let taday = moment().format("YYYY-MM-DD")
					 let arr=[]
					 let arrt=[]
					 let arrw=[]
					payCount({
						createdStart:fmt,createdEnd:taday
					}).then(res=>{
						for (var i=0; i<res.data.data.length;i++) {
							arr.push(res.data.data[i].date)
							var dataList = new Set(arr)
							if(res.data.data[i].type == '收款'){
								arrt.push(res.data.data[i].payAmount)
							}else if(res.data.data[i].type == '退款'){
								arrw.push(res.data.data[i].payAmount)
							}
						}
						this.dalist=Array.from(dataList)  
						this.CollectionList=arrt
						this.refundList=arrw
						this.echartsInit()
					}).catch(()=>{
						this.$message.error("这几天暂无数据")
					})
			      }
		}
	}
</script>

<style scoped>
	.linechart {
		width: 55%;
		background-color: white;
		border-radius: 10px;
		padding: 11px 16px;
		font-size: 14px;
		display: flex;
		justify-content: space-between;
		margin-top: 15px;
		box-sizing: border-box;
		flex-wrap: wrap;
		margin-bottom: 1.6rem;
	}

	.linecharttitle {
		width: 100%;
		display: flex;
		justify-content: left;
		margin-top: 15px;
		align-items: center;
	}

	.linecharttitle span {
		margin-right: 60px;
	}

	.select {
		width: 300px;
		margin-top: 0.32rem;
		margin-bottom: 0.346667rem;
	}

	.el-select {
		width: 66%;
	}
</style>
