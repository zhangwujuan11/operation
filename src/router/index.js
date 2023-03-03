import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
	{
	  path: '/login',
	  name: 'login',
	  component: () => import('@/views/Login.vue')
	},
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/merchant/index',
  	component: {
  		render: (e) => e("router-view")
  	},
  	children:[
  		{
  			path:'',
  			name: 'merchant',
  			component: () => import('@/views/merchant/Index.vue')
  		},
		{
			path:'/merchant/businesslist',
			name:'businesslist',
			component:()=> import ('@/views/merchant/Businesslist.vue')
		}
  	]
  },
  {
	  path:'/serviceprovider',
	  name: 'serviceprovider',
	  component:()=> import ('@/views/serviceprovider/Index.vue')
  },
  {
    path: '/ordermanagement/index',
  	component: {
  		render: (e) => e("router-view")
  	},
  	children:[
  		{
  			path:'',
  			name: 'ordermanagement',
  			component: () => import('@/views/ordermanagement/Index.vue')
  		},
		{
			path:'/ordermanagement/refundorder',
			name: 'refundorder',
			component: () => import('@/views/ordermanagement/Refundorder.vue')
		},
		{
			path:'/ordermanagement/transferorder',
			name: 'transferorder',
			component: () => import('@/views/ordermanagement/Transferorder.vue')
		},
		{
			path:'/ordermanagement/notification',
			name: 'notification',
			component: () => import('@/views/ordermanagement/Notification.vue')
		}
  	]
  },
  {
    path: '/configuration/index',
  	component: {
  		render: (e) => e("router-view")
  	},
  	children:[
  		{
  			path:'',
  			name: 'configuration',
  			component: () => import('@/views/configuration/Index.vue')
  		},
		{
			path:'/configuration/paymentmethod',
			name: 'paymentmethod',
			component: () => import('@/views/configuration/Paymentmethod.vue')
		}
  	]
  },
  {
    path: '/system/index',
  	component: {
  		render: (e) => e("router-view")
  	},
  	children:[
  		{
  			path:'',
  			name: 'system',
  			component: () => import('@/views/system/Index.vue')
  		},
		{
			path:'/system/role',
			name: 'role',
			component: () => import('@/views/system/Role.vue')
		},
		{
			path:'/system/permission',
			name: 'permission',
			component: () => import('@/views/system/Permission.vue')
		},
		{
			path:'/system/journal',
			name: 'journal',
			component: () => import('@/views/system/Journal.vue')
		}
  	]
  },
  // 商户配置
  {
	 path: '/mchinfos/index',
	 component: {
	 	render: (e) => e("router-view")
	 }, 
	 children:[
		 {	//商户信息
		 	path:'',
		 	name: 'mchinfo',
		 	component: () => import('@/views/mchinfos/Index.vue')
		 },
		 {	//码牌信息
		 	path:'/mchinfos/cc',
		 	name: 'cc',
		 	component: () => import('@/views/mchinfos/Cc.vue')
		 },
		 {	//音箱信息
		 	path:'/mchinfos/tc',
		 	name: 'tc',
		 	component: () => import('@/views/mchinfos/Tc.vue')
		 },
		 {	//渠道信息
		 	path:'/mchinfos/channle',
		 	name: 'channle',
		 	component: () => import('@/views/mchinfos/Channle.vue')
		 },
		 {	//收益定义
		 	path:'/mchinfos/benefi',
		 	name: 'benefi',
		 	component: () => import('@/views/mchinfos/Benefi.vue')
		 }
	 ]
  },
  {//服务商列表
	  path:'/details',
	  name: 'details',
	  component: () => import('@/views/details/Index.vue')
  },
  {	//服务商收益定义
  	path:'/mchinfos/benefitdefinition',
  	name: 'benefitdefinition',
  	component: () => import('@/views/details/Benefitdefinition.vue')
  },
  {	//流水明细
  	path:'/serviceprovider/share',
  	name: 'share',
  	component: () => import('@/views/serviceprovider/Share.vue')
  },
  {	//分润展示
  	path:'/serviceprovider/exhibition',
  	name: 'exhibition',
  	component: () => import('@/views/serviceprovider/Exhibition.vue')
  },
  {	//分润提现
  	path:'/details/cash',
  	name: 'cash',
  	component: () => import('@/views/details/Cash.vue')
  },
  
  // 银联信息配置
  // {
  //   path: '/mchinfo/index',
  // 	component: {
  // 		render: (e) => e("router-view")
  // 	},
  // 	children:[
  // 		{	//商户信息
  // 			path:'',
  // 			name: 'mchinfo',
  // 			component: () => import('@/views/mchinfo/Index.vue')
  // 		},
		// {	//音箱信息
		// 	path:'/mchinfo/tc',
		// 	name: 'tc',
		// 	component: () => import('@/views/mchinfo/Tc.vue')
		// },
		// {	//码牌信息
		// 	path:'/mchinfo/cc',
		// 	name: 'cc',
		// 	component: () => import('@/views/mchinfo/Cc.vue')
		// },
		// {
		// 	path:'/mchinfo/indextable',
		// 	name: 'indextable',
		// 	component: () => import('@/views/mchinfo/Indextable.vue')
		// },
		// {
		// 	path:'/mchinfo/tctable',
		// 	name: 'tctable',
		// 	component: () => import('@/views/mchinfo/Tctable.vue')
		// },
		// {	
		// 	path:'/mchinfo/cctable',
		// 	name: 'cctable',
		// 	component: () => import('@/views/mchinfo/Cctable.vue')
		// }
  // 	]
  // },
  {
	  path:'/register',
	  name:'register',
	  component: () => import('@/views/login/Register.vue')
  }
  
]

const router = new VueRouter({
  routes
})

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
