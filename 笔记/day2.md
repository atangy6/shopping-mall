# 将Home组件的静态组件拆分
1静态页面（样式）
2拆分静态组件
3发请求获取服务器数据进行展示
4开发动态业务
拆分组件：结构+样式+图片资源
一共要拆分为七个组件
# 三级联动组件完成
---由于三级联动在Home、Search、Detail，把三级联动注册为全局组件（在main.js中引入）
好处：只需要注册一次，就可以在项目任意地方使用
## 注册全局组件
注册全局组件，可以使用Vue.component(tagName, options)
第一个参数：全局组件的名字；第二个参数，哪一个组件
Component：组件
# 完成其余静态组件
HTML+CSS+图片资源——————信息【结构，样式，图片资源】
# POSTMAN测试接口
经过POSTMAN工具测试，接口可用
如果服务器返回的数据code字段为200，代表服务器返回数据成功，否则失败
整个项目，接口的前缀都有/api字样
# axios二次封装
安装：`npm install --save axios`
AJAX:客户端可以'敲敲的'向服务器端发请求，在页面没有刷新的情况下，实现页面的局部更新。
XMLHttpRequest、$、fetch、axios
跨域:如果多次请求协议、域名、端口号有不同的地方，称之为跨域
JSONP、CROS、代理
2.1:工作的时候src目录下的API文件夹，一般关于axios二次封装的文件
2.2进度条：nprogress模块实现进度条功能
工作的时候，修改进度条的颜色，修改源码样式.bar类名的
## 为什么需要进行axios二次封装
请求拦截器：在发请求之前可以处理一些业务
响应拦截器：当服务器数据返回以后，可以处理一些事情
## 在项目当中经常出现API文件夹【存放关于axios请求的】
接口当中：路径都带有/api
baseURL:'/api'
# 接口统一管理
项目很小：完全可以在组件的生命周期函数中发请求
项目大：axios.get('xxx')
## 跨域问题
什么是跨域：协议、域名、端口号不同请求，称之为跨域
服务器之间没有跨域问题，浏览器之间有跨域问题
跨域解决方案：JSONP  CORS  代理
代理跨域配置：
在vue.config.js文件中配置如下内容：
```js
devServer: {
    proxy: {
      '/api': {
       target:'http://gmall-h5-api.atguigu.cn',
        pathRewrite: {'^/api' : ''}  //由于本项目中的接口都有/api，所以无需重写
      }
    }
  }
```
# nprogress进度条的使用（插件）
安装：`npm install --save nprogress`
需要将 `nprogress.js`和`nprogress.css`添加到项目中。
nprogress.start():进度条开始
nprogress.done():进度条结束
# vuex状态管理库
## vuex是什么？
vuex是官方提供的一个插件，是一个状态管理库，集中式管理项目中组件共用的数据。
vuex主要是用于项目大、组件多的情况下，各个组件之间的关系比较复杂，数据的传递就显得繁杂，很难管理，vuex可以集中式管理这些数据。
注意：并不是所有项目都需要vuex，项目小的话，完全可以不用vuex。
vuex几大核心概念：
state	仓库存储数据的地方
mutations	
actions	
getters	
modules	模块式开发
## vuex基本使用
安装vuex
`npm install --save vuex`
注意：4版本vue2不能使用，安装3版本
使用vuex：
在src目录下新建 store目录-index.js文件，代码如下：
```js
import Vue from "vue";
import Vuex from 'vuex';
// 使用插件
Vue.use(Vuex);
 
// state:仓库存储数据的地方
const state={};
// mutations:修改state的唯一手段 不能使用 if for 异步
const mutations={};
// actions:处理action,可以书写自己的业务逻辑，也可以处理异步
const actions={};
// getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便 
const getters={};
// 对外暴露Store类的一个实例
export default new Vuex.Store({
    state,mutations,actions,getters
})
```
## vuex实现模块式开发
如果项目过大，组件过多，接口也很多，数据也很多,可以让vuex实现模块式开发（将大仓库拆分为小仓库，再在大仓库中引入小仓库）
比如针对home路由组件，在store目录下新建home目录-index.js文件，代码如下：
```js
// home模块的小仓库
const state = {a:1};
const mutations = {};
const actions = {};
const getters={};
 
export default{
    state,mutations,actions,getters
}
```
在store/index.js下，将小仓库合并为大仓库
```js
import Vue from 'vue'
import Vuex from 'vuex'
// 需要使用插件一次
Vue.use(Vuex)
// 引入小仓库
import home from './home'
import search from './search'
// 对外暴露Store类的一个实例
export default new Vuex.Store({
    // 实现vuex仓库模块式开发存储数据
    modules:{
        // 注册小仓库
        home,
        search,
    }
})
```
# 完成TypeNav三级联动展示数据业务
[
    {
        id:1,
        name:图书，
        child:[
            {
                id:2,
                name:电子书,
                ···
            }
        ]
    }
]
