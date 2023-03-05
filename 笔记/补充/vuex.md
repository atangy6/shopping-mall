文章： https://www.jianshu.com/p/2e5973fe1223
Vux4新特性(Vuex3和Vuex4对比总结): https://juejin.cn/post/7104575137894105096
vuex是一个专为 Vue.js 应用程序开发的状态管理模式， 采用集中式存储管理应用的所有组件的状态，解决多组件数据通信。(简单来说就是管理数据的,相当于一个仓库(store),里面存放着各种需要共享的数据,所有组件都可以拿到里面的数据)
# vuex的五个属性
1. state: 统一定义管理公共数据；状态即state，state又是用来存储一些数据的
2. mutations: 使用它来修改数据
3. getters: 类似于vue中的计算属性
4. actions: 类似于methods,用于发起异步请求,比如axios
5. modules: 模块拆分
# mapState 辅助函数
当一个组件需要获取多个状态(state)的时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性，让你少按几次键：
es6中扩展运算符（spread）是三个点（...）
作用：使用mapState获取vuex中state的数据
举例：
如果要获取store里面的state的city属性。首先来看看没有使用mapState的情况,
{{this.$store.state.city}}
再来看看使用mapState后
{{this.city}}
```js
// 第一种 $store.state
 computed:{
        userInformation(){
            return this.$store.state.userInformation
        },
         userToken(){
            return this.$store.state.userToken
        },
    },
    
// 第二种
  computed:mapState([
       'userInformation',
        'userToken'
    ]),  
    
// 第三种  
  computed:mapState({
        'userInformation':state=>state.userInformation,
        'userToken':state=>state.userToken,
    })

// 第四种  使用展开运算符
  computed:{
        xxx(){
            return 'yyy'
        },
        // 注意：这种写法用mapstate等这种辅助函数的时候，前面的方法名和获取的属性名是一致的
        ...mapState([
            'userInformation',
            'userToken'
        ])
    },
```
# this.$store.dispatch() 与 this.$store.commit()
this.$store.dispatch() 与 this.$store.commit()方法的区别总的来说他们只是存取方式的不同,两个方法都是传值给vuex的mutation改变state
this.$store.dispatch() ：含有异步操作，例如向后台提交数据，写法：this.$store.dispatch(‘action方法名’,值)
this.$store.commit()：同步操作，，写法：this.$store.commit(‘mutations方法名’,值)
- commit: 同步操作
存储 this.$store.commit('changeValue',name)
取值 this.$store.state.changeValue
- dispatch: 异步操作
存储 this.$store.dispatch('getlists',name)
取值 this.$store.getters.getlists
