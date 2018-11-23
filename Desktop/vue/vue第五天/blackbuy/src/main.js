import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
// 导入moment
import moment from 'moment'

// 导入axios
import axios from 'axios'
Vue.prototype.$axios = axios
// 导入首页组件
import index from './components/index.vue'
// 导入详情页面组件
import detail from './components/02-detail.vue'
Vue.use(VueRouter)
import './assets/site/css/style.css'
Vue.use(ElementUI);

// 导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 导入iviewui
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
// 注册
Vue.use(ElementUI);

Vue.config.productionTip = false
let routes = [
  {path:'/',redirect:'/index'},
  {path:'/index',component:index},
  {path:'/detail/:artID',component:detail}
]
const router = new VueRouter({
  routes
})
// 定义全局过滤器
Vue.filter('shorttime', function (value) {
   // console.log(value);
   return moment(value).format('YYYY年MM月DD日')
})
// 定义全局过滤器
Vue.filter('shorttimeplus', function (value) {
  // console.log(value);
  return moment(value).format('YYYY年MM月DD日 HH:mm:ss')
})
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
