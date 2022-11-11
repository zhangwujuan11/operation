<template>
	<div class="datable">
		<el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" style="width:100%;" >
			<el-table-column prop="province" label="支付金额">
				<template slot-scope="scope">
					￥{{scope.row.payAmount | refundAmount}}
				</template>
			</el-table-column>
			<el-table-column prop="name" label="退款金额">
				<template slot-scope="scope">
					￥{{scope.row.refundAmount | refundAmount}}
				</template>
			</el-table-column>
			<el-table-column label="退款订单号"  width='300'>
				<template slot-scope='scope'>
					<span class="zz">退款</span>{{scope.row.refundOrderId}}<br>
					<span class="sh">商户</span>{{scope.row.mchRefundNo}}
				</template>
			</el-table-column>
			<el-table-column prop="name" width='300' label="支付订单号">
				<template slot-scope="scope">
					<span class="zz">支付</span>{{scope.row.payOrderId}}<br>
					<span class="wfs">渠道</span>{{scope.row.channelPayOrderNo}}
				</template>
			</el-table-column>
			<el-table-column prop="name"  label="状态">
				<template slot-scope='scope'>
					{{scope.row.state | state}}
				</template>
			</el-table-column>
			<el-table-column prop="createdAt" width='250' label="创建日期">
			</el-table-column>
			<el-table-column label="操作" >
				<template slot-scope='scope'>
					<span @click="jinhao(scope.row.refundOrderId)" style="color: #1a79ff;cursor: pointer;">详情</span>
				</template>
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
		<!-- 蒙尘 -->
		<el-dialog title="退款订单详情" append-to-body :visible.sync="dialogVisible" width="50%">
			<div class="chen">
				<p>
					<span>所属系统：{{dilogoList.mchType | mchType}}</span>
				</p>
				<p>
					<span>服务商号：{{dilogoList.isvNo}}</span>
				</p>
				<p>
					<span>退款订单号：<span class="dingdan">{{dilogoList.refundOrderId}}</span></span>
				</p>
				<p>
					<span>商户号：{{dilogoList.mchNo}}</span>
				</p>
				<p>
					<span>支付订单号：{{dilogoList.payOrderId}}</span>
				</p>
				<p>
					<span>商户退款单号：{{dilogoList.mchRefundNo}}</span>
				</p>
				<p>
					渠道支付订单号：{{dilogoList.channelPayOrderNo}}
				</p>
				<p>
					应用APPID：{{dilogoList.appId}}
				</p>
				<p>
					<span>支付金额：<span class="zhifu">￥{{dilogoList.payAmount | refundAmount}}</span></span>
				</p>
				<p>
					<span>退款金额：<span class="zhifu">￥{{dilogoList.refundAmount | refundAmount}}</span></span>
				</p>
				
				<p>
					<span>订单状态：<span class="zhifu">{{dilogoList.state | state}}</span></span>
				</p>
				
				<p>
					<span>退款成功时间：{{dilogoList.successTime}}</span>
				</p>
				<p>
					<span>创建时间：{{dilogoList.createdAt}}</span>
				</p>
				<p>
					<span>更新时间：{{dilogoList.updatedAt}}</span>
				</p>
				<p class="fengeborder"></p>

				<p>
					<span>接口代码：{{dilogoList.ifCode}}</span>
				</p>
				<p>
					<span>货币代码：{{dilogoList.currency}}</span>
				</p>	
				<p>
					<span>支付方式：{{dilogoList.wayCode}}</span>
				</p>
				<p>
					<span>客户端IP：{{dilogoList.clientIp}}</span>
				</p>
				<p>
					异步通知地址：
					{{dilogoList.notifyUrl}}
				</p>
				<p class="fengeborder"></p>
				<p>
					渠道订单号：{{dilogoList.channelOrderNo}}
				</p>
				<p>
					渠道错误码：{{dilogoList.errCode}}
				</p>
				<p>
					渠道错误描述：{{dilogoList.errMsg}}
				</p>
				<p>
					渠道额外参数：{{dilogoList.extParam}}
				</p>
				<p class="fengeborder"></p>
				<p>
					扩展参数：{{dilogoList.channelExtra}}
				</p>
				<p class="fengeborder"></p>
				<p>
					备注：{{dilogoList.refundReason}}
				</p>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {refundOrder,refundOrderinfo} from '@/utils/ordermanagement.js'
	export default {
		filters:{
			refundAmount(e){
				return e/100
			},
			state(e){
				if(e==0){
					return '订单生成'
				}else if(e==1){
					return '退款中'
				}else if(e==2){
					return '退款成功'
				}else if(e==3){
					return '退款失败'
				}else if(e==4){
					return '退款任务关闭'
				}
			},
			mchType(e){
				if(e==1){
					return '普通商户'
				}else if(e==2){
					return '特约商户'
				}
				
			}
		},
		data() {
			return {
				tableData: [],
				dialogVisible: false,
				ruleForm: {
					appid: '',
					appname: '',
					status: 1,
					appsecret: '',
					textarea: '',
					ad: ''
				},
				rules: {
					appname: [{
						required: true,
						message: '请输入应用名称',
						trigger: 'blur'
					}]
				},
				// 默认显示第几页
				currentPage: 1,
				// 总条数，根据接口获取数据长度(注意：这里不能为空)
				totalCount: 1,
				// 个数选择器（可修改）
				pageSizes: [1, 2, 3, 4],
				// 默认每页显示的条数（可修改）
				PageSize:5,
				dilogoList:{}
			}
		},
		created(){
			this.getDatas()
			this.$nextTick(()=>{
				this.getData()
			})
		},
		methods: {
			getDatas(n){
				refundOrder(n).then(res=>{
					this.tableData=res.data.data.records
				})
			},
			// 详情
			jinhao(n) {
				this.dialogVisible = true
				refundOrderinfo(n).then(res=>{
					this.dilogoList=res.data.data
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
			}
		},
		watch:{
			$route(n){
				this.getDatas(n.query)
			},
			tableData(){
				this.getData()
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
		color: #1CA329;
		background-color: rgba(155, 181, 158, 0.2);
		border-radius: 4px;
		padding: 2px 5px;
		margin-right: 4px;
	}

	/* 蒙尘 */
	p {
		width: 48%;
		font-size: 14px;
		margin-bottom: 25px;
		display: flex;
		align-items: center;
	}

	:deep(.el-dialog) {
		border-radius: 10px !important;
	}

	:deep(.el-dialog__header) {
		border-bottom: 1px solid rgba(196, 196, 196, 0.5);
	}

	.chen {
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	p img {
		width: 50px;
		height: 18px;
	}

	.dingdan {
		color: #2751E5;
		background-color: rgba(39, 81, 229, 0.2);
		border: 1px solid rgba(39, 81, 229, 0.5);
		border-radius: 4px;
		padding: 2px 5px;
	}

	.shouxu {
		color: #E527B0;
		background-color: rgba(229, 39, 176, 0.2);
		border: 1px solid rgba(229, 39, 176, 0.5);
		border-radius: 4px;
		padding: 2px 5px;
	}

	.zhifu {
		color: #27E53A;
		background-color: rgba(39, 229, 58, 0.2);
		border: 1px solid rgba(39, 229, 58, 0.5);
		border-radius: 4px;
		padding: 2px 5px;
	}

	.fengeborder {
		border-top: 1px solid rgba(196, 196, 196, 0.5);
		width: 100%;
		margin: 0.32rem 0;
	}
	.wfs{
		color: white;
		background-color:#CB8F1C;
		border: none;
		border-radius: 4px;
		padding: 2px 5px;
	}
</style>
