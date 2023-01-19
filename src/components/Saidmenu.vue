<template>
	<div class="ltr">
		<img src="@/assets/images/loginlogo.png" alt="">
		<el-menu default-active="2" class="el-menu-vertical-demo" :collapse='false'
			background-color='#E7EBF1' router>
			<el-menu-item index="/home">
				<i class="el-icon-house"></i>
				<span slot="title">主页</span>
			</el-menu-item>
			
			
			
			
			<el-menu-item index="/details">
				<i class="el-icon-printer"></i>
				<span slot="title">分润汇总</span>
			</el-menu-item>
			<el-menu-item index="/serviceprovider/share">
				<i class="el-icon-pie-chart"></i>
				<span slot="title">流水明细</span>
			</el-menu-item>
			<el-submenu index="2">
				<template slot="title">
					<i class="el-icon-user"></i>
					<span>商户管理</span>
				</template>
				<el-menu-item-group >
					<el-menu-item index="/merchant/index">
						<i class="el-icon-menu"></i>
						应用列表
					</el-menu-item>
					<el-menu-item index="/merchant/businesslist">
						<i class="el-icon-s-finance"></i>
						商户列表
					</el-menu-item>
					<el-submenu index="1-2">
						<template slot="title">
							<i class="el-icon-s-check"></i>
							信息配置
						</template>
						<el-menu-item index="/mchinfos/index">
							<i class="el-icon-key"></i>
							商户信息配置
						</el-menu-item>
						<el-menu-item index="/mchinfos/tc">
							<i class="el-icon-star-off"></i>
							音箱信息配置
						</el-menu-item>
						<el-menu-item index="/mchinfos/cc">
							<i class="el-icon-document"></i>
							码牌信息配置
						</el-menu-item>
						<el-menu-item index="/mchinfos/channle">
							<i class="el-icon-map-location"></i>
							渠道信息配置
						</el-menu-item>
						<el-menu-item index="/mchinfos/benefi" v-if="isadmin == 1">
							<i class="el-icon-map-location"></i>
							服务商收益定义
						</el-menu-item>
					</el-submenu>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="3">
				<template slot="title">
					<i class="el-icon-money"></i>
					<span>服务商管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/serviceprovider">
						<i class="el-icon-document"></i>
						服务商列表
					</el-menu-item>
					<el-menu-item index="">
						<i class="el-icon-document"></i>
						分润管理
					</el-menu-item>
					<el-menu-item index="/mchinfos/benefitdefinition" v-if="isadmin == 1">
						<i class="el-icon-document"></i>
						服务商收益配置
					</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="4">
				<template slot="title">
					<i class="el-icon-wallet"></i>
					<span>订单管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/ordermanagement/index">
						<i class="el-icon-s-custom"></i>
						支付订单
					</el-menu-item>
					<el-menu-item index="/ordermanagement/refundorder">
						<i class="el-icon-s-ticket"></i>
						退款订单
					</el-menu-item>
					<el-menu-item index="/ordermanagement/transferorder">
						<i class="el-icon-refresh"></i>
						转账订单
					</el-menu-item>
					<el-menu-item index="/ordermanagement/notification">
						<i class="el-icon-printer"></i>
						商户通知
					</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="5">
				<template slot="title">
					<i class="el-icon-guide"></i>
					<span>支付配置</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/configuration/index">
						<i class="el-icon-c-scale-to-original"></i>
						支付接口
					</el-menu-item>
					<el-menu-item index="/configuration/paymentmethod">
						<i class="el-icon-bank-card"></i>
						支付方式
					</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="6" v-if="isadmin == 1">
				<template slot="title">
					<i class="el-icon-setting"></i>
					<span>系统管理</span>
				</template>
				<el-submenu index="5-1">
					<template slot="title">
						<i class="el-icon-s-check"></i>
						用户角色管理
					</template>
					<el-menu-item index="/system/index">
						<i class="el-icon-s-custom"></i>
						操作员管理
					</el-menu-item>
					<el-menu-item index="/system/role">
						<i class="el-icon-user-solid"></i>
						角色管理
					</el-menu-item>
					<el-menu-item index="/system/permission">
						<i class="el-icon-s-check"></i>
						权限管理
					</el-menu-item>
				</el-submenu>
				<el-menu-item-group>
					<el-menu-item index="/system/journal">
						<i class="el-icon-edit-outline"></i>
						系统日志
					</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
		<!-- 	<el-submenu index="7">
				<template slot="title">
					<i class="el-icon-key"></i>
					<span>银联信息配置</span>
				</template>
					<el-menu-item index="/mchinfo/index">
						<i class="el-icon-edit"></i>
						商户信息配置
					</el-menu-item>
					<el-menu-item index="/mchinfo/tc">
						<i class="el-icon-star-off"></i>
						音箱配置
					</el-menu-item>
					<el-menu-item index="/mchinfo/cc">
						<i class="el-icon-document"></i>
						码牌信息配置
					</el-menu-item>
			</el-submenu>
			
			
			<el-submenu index="8">
				<template slot="title">
					<i class="el-icon-s-platform"></i>
					<span>银联信息</span>
				</template>
					<el-menu-item index="/mchinfo/indextable">
						<i class="el-icon-s-custom"></i>
						商户信息
					</el-menu-item>
					<el-menu-item index="/mchinfo/tctable">
						<i class="el-icon-s-data"></i>
						音箱信息
					</el-menu-item>
					<el-menu-item index="/mchinfo/cctable">
						<i class="el-icon-s-grid"></i>
						码牌信息
					</el-menu-item>
			</el-submenu> -->
		</el-menu>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				isadmin:JSON.parse(localStorage.getItem('isadmin')) 
			}
		}
	}
</script>
<style scoped>
	.ltr {
		width: 225px !important;
		background-color: #E7EBF1;
		margin-top: 16px;
		height: calc(100vh - 16px);
		position: fixed;
		overflow-y: scroll;
		scrollbar-width: none; /* firefox */
		-ms-overflow-style: none; /* IE 10+ */
	}
	.ltr::-webkit-scrollbar {
	    display: none; /* Chrome Safari */
	}
	.ltr img{
		width: 200px;
	}
</style>
