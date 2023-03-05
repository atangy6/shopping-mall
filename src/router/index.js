// 配置路由的地方

import Vue from 'vue';
// 引入路由插件
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter)
import routes from './routes';
// 引入store
import store from '@/store'
// 解决router路由重复触发导致的报错
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

// 配置路由
let router= new VueRouter({
    // 配置路由routes
    routes,
    // 滚动行为
    scrollBehavior (to, from, savedPosition) {
        // 返回的这个y=0，代表的滚动条在最上方
        return{y:0}
    }
})
// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async(to,from,next)=>{
// to:可以获取到你要跳转的那个路由
// from:可以获取到你从哪个路由而来的信息
// next:放行函数;
// next()代表直接放行;next(path)放行到指定路由;next(false)
// next()
// 用户登录了，才会有token,未登录一定不会有token
let token=store.state.user.token
// 用户信息
let name=store.state.user.userInfo.name
// 用户已经登录了
if(token){
  // 用户已经登录了还想去login[不能去，停留在首页]
  if(to.path=='/login'){
    next('/home')
  }else{
    // 登录了，但去的不是login
    // 如果用户名已有
    if(name){
      next()
    }else{
      // 没有用户信息，派发action让仓库存储用户信息再跳转
      try {
        // 获取用户信息成功
        await store.dispatch('getUserInfo')
        next()
      } catch (error) {
        // token失效，获取不到用户信息重新登录
        //清除token
        await store.dispatch('userLogout')
        next('/login')
      }
    }
  }
}else{
  // 未登陆，不能去交易相关、支付、个人中心
  let toPath=to.path
  // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
// 如果没有找到匹配的字符串则返回 -1。
  if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
    next('/login?redirect='+toPath)
  }else{
    next()
  }
}
})
export default router

  

