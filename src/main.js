import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/comm.css'
import '@/permission'
//全局引入echarts
import * as echarts from 'echarts';
// //需要挂载到Vue原型上
Vue.prototype.$echarts = echarts
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
