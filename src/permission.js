import router from './router'
import { Message } from 'element-ui'
import {overdue} from '@/utils/login.js'

// 路由白名单
const whiteList = ['/login','/register']

router.beforeEach(async(to, from, next) => {
	const hasToken=JSON.parse(localStorage.getItem('user'))
	if(!hasToken){
		if (whiteList.indexOf(to.path) >= 0) {
		  next()
		} else {
		  alert('请先登录')
		  next('/login')
		}
	}else{
    // token是否过期
    overdue().then(res=>{
      if(res.data.active==true){
		  
        next()
      }
    }).catch(()=>{
      alert("登录过期,请重新登录")
      localStorage.removeItem('user')
      next('/login')
    })
  }
	
})