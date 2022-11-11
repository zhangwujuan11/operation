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
