import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
// 导入moment
import moment from "moment";
// 导入放大镜
import ProductZoomer from "vue-product-zoomer";

Vue.use(ProductZoomer);

// 导入axios
import axios from "axios";
Vue.prototype.$axios = axios;
axios.defaults.withCredentials=true;//让ajax携带cookie
// 使用axios绑定网站基地址
axios.defaults.baseURL = "http://111.230.232.110:8899/";
// 导入首页组件
import index from "./components/index.vue";
// 导入详情页面组件
import detail from "./components/02-detail.vue";
// 导入购物车页面
import cart from "./components/03-cart.vue";
// 导入订单详情页面
import order from './components/04-order.vue'
// 导入登录页面
import login from './components/05-login.vue'
// 导入付款页面 订单详情页面
import payMoney from './components/06-payMoney.vue'
// 导入支付成功页面
import paySuccess from './components/07-paySuccess.vue'
// 导入会员中心页面
import vipCenter from './components/08-vipCenter.vue'
Vue.use(VueRouter);
import "./assets/site/css/style.css";
Vue.use(ElementUI);

// 导入element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// 导入iviewui
import iView from "iview";
import "iview/dist/styles/iview.css";
Vue.use(iView);
// 注册
Vue.use(ElementUI);

Vue.config.productionTip = false;
let routes = [
  // 重定向
  { path: "/", redirect: "/index" },
  { path: "/index", component: index},
  { path: "/detail/:artID", component: detail },
  { path: "/cart", component: cart },
  { path: "/order/:ids", component: order,meta: { checkLogin: true } },
  { path: "/login", component: login,meta: { checkLogin: true } },
  { path: "/payMoney/:ids", component: payMoney,meta: { checkLogin: true } },
  { path: "/paySuccess", component: paySuccess,meta: { checkLogin: true } },
  { path: "/vipCenter", component: vipCenter,meta: { checkLogin: true } }
];
const router = new VueRouter({
  routes,
  mode: 'history'
});
// 导航守卫
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.checkLogin)){
    // 如果要去meta属性中有checkLogin=true的值 需要判断是否登录了
      axios.get('site/account/islogin').then(result=>{
      // console.log(result);
      if(result.data.code == 'nologin'){
        // 说明没有登录
        // console.log('没有登录');
        router.push('/login')
      }else{
        // console.log('登录了');
        next()
      }
    })
  }else{

    next()
  }
  // window.scrollTop = 0;
})
// 定义全局过滤器
Vue.filter("shorttime", function(value) {
  // console.log(value);
  return moment(value).format("YYYY年MM月DD日");
});
// 定义全局过滤器
Vue.filter("shorttimeplus", function(value) {
  // console.log(value);
  return moment(value).format("YYYY年MM月DD日 HH:mm:ss");
});

// 导入Vuex
import Vuex from "vuex";
Vue.use(Vuex);

// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    // count: 0
    // 购物车数据对象
    // 短路运算 || 如果没有数据 左边的值是 false 去获取 || 右边的值
    cartData: JSON.parse(window.localStorage.getItem("hm24")) || {},
    islogin:false
    // cartData:data
  },
  getters: {
    cartNum(state) {
      let cartCount = 0;
      for (const key in state.cartData) {
        cartCount += state.cartData[key];
      }

      return cartCount;
    }
  },
  mutations: {
    // increment (state) {
    //   state.count++
    // }
    add2cart(state, obj) {
      // console.log(obj);
      // 判断购物车中是否有这个商品
      if (state.cartData[obj.cartId]) {
        //  说明存在
        state.cartData[obj.cartId] = state.cartData[obj.cartId] + obj.cartNum;
      } else {
        // 说明产品是第一次加
        // 参数1:对象,参数2:键,参数3:值
        Vue.set(state.cartData, obj.cartId, obj.cartNum);
      }
      // console.log(state.cartData);
    },
    changeCount(state,obj){
      state.cartData = obj
    },
    // 登录状态改变
    changeLogin(state,isLogin){
      state.islogin = isLogin
    },
    // 删除提交订单的物品
    deleteById(state,id){
      Vue.delete(state.cartData,id)
    }
  }
});
// 关闭浏览器,将数据存起来
window.onbeforeunload = function() {
  window.localStorage.setItem("hm24", JSON.stringify(store.state.cartData));
};

new Vue({
  render: h => h(App),
  router,
  store,
  components:{baseinput:'<p>今天天气还好呀</p>' },
  created() {
    axios.get('site/account/islogin').then(result=>{
      // console.log(result);
      if(result.data.code == 'nologin'){
        // 说明没有登录
        // console.log('没有登录');
        router.push('/login')
        // store.state.islogin = false;
      }else{
        store.state.islogin = true;
      }
    })
  },
}).$mount("#app");
