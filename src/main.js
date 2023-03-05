import Vue from 'vue'
import App from './App.vue'
import { Button,MessageBox,} from 'element-ui';
// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 三级联动组件——————注册为全局组价
import TypeNav from '@/components/TypeNav'
// 轮播图
import Carousel from '@/components/Carousel'
// 分页器
import Pagination from '@/components/Pagination'
// 全局注册组件，可以使用Vue.component(tagName, options)
// 第一个参数：全局组件的名字；第二个参数，哪一个组件
// Component：组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
Vue.use(Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入路由
import router from './router'
Vue.config.productionTip = false 
// 在入口文件引入仓库
import store from '@/store'
// 引入mockServe.js---mock数据
import '@/mock/mockServe'

// 引入swiper样式
import 'swiper/css/swiper.css'
// import {reqGetSearchInfo} from '@/api'
// console.log(reqGetSearchInfo());

// 统一接口api文件夹里面全部请求函数
import * as API from '@/api'
// console.log(API);
new Vue({
  //全局事件总线$bus配置
  beforeCreate() {
    //此处的this就是这个new Vue()对象
    //网络有很多bus通信总结，原理相同，换汤不换药
    Vue.prototype.$bus = this
    // 所有的接口挂载到了Vue原型对象身上
    Vue.prototype.$API=API
  },
  render: h => h(App),
  //router2、注册路由，此时组件中都会拥有$router $route属性
  router,
  //注册store,此时组件中都会拥有$store
  store
}).$mount('#app')
