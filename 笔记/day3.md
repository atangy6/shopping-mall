# 完成一级分类动态添加背景颜色
第一种解决方案：采用样式完成
第一种解决方案：通过js完成
# 通过js控制二三级商品分类的显示与隐藏
最开始的时候，是通过css样式display:block|none显示与隐藏二三级商品分类
# 卡顿现象及解决办法
## 演示卡顿现象
正常:事件触发非常频繁，而且每一次的触发，回调函数都要去执行(如果时间很短，而回调函数内部有计算，那么很可能出现浏览器卡顿)

//正常情况（用户慢慢的操作):鼠标进入，每一个一级分类h3，都会触发鼠标进入事件
//非正常情况（用户操作很快）:本身全部的一级分类都应该触发鼠标进入事件，但是经过测试,
只有部分h3触发了
//就是由于用户行为过快，导致浏览器反应不过来。如果当前回调函数中有一些大量业务，有可能出现卡顿现象
## 防抖与节流【节流（throttle）与防抖（debounce）】
- 防抖:前面的所有的触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速的触发只会执行一次
使用插件lodash
lodash里面有自己封装的函数，可以用于防抖于节流：
- 节流:在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发
//防抖:用户操作很频繁，但是只是执行一次
//节流:用户操作很频繁，但是把频繁的操作变为少量操作【可以给浏览器有充裕的时间解析代码】
- 【防抖--回城；节流：cd】
# 完成三级联动节流的操作
// 引入lodash
// import _ from 'lodash';
// 最好的引入方式：按需加载;lodash源码中throttle默认暴露，引入时不用加{}
import throttle from 'lodash/throttle';
···
// lodash中的throttle()方法用于创建一节流函数
// throttle回调函数别用箭头函数，可能出现上下this
    changeIndex:throttle(function(index){
        this.currentIndex = index;
    },50),
# 三级联动组件的路由跳转与传递参数
- 三级联动用户可以点击的有：一级分类、二级分类、三级分类，当点击的时候，Home模块跳转到Search模块，一级会把用户选中的产品（产品的名字、ID）在路由跳转时进行传递。
- 路由跳转的两种方式：
声明式导航:router-link
编程式导航:push|replace
- 当使用声明式导航router-link 直接添加给a标签时，虽然可以实现路由的跳转与传参，但是会出现卡顿现象，原因：
router-link是一个组件，当服务器的数据返回之后，会循环出很多的router-link组件（创建组件实例，并将虚拟dom转换成真实dom）,在创建组件实例的时候，一瞬间会很耗内存的，因此出现了卡顿现象。
- 最终解决思路：
1、给类为all-sort-list2 的div添加路由跳转事件，利用事件委派，将事件传给子节点；
2、给子节点里的a标签添加自定义属性data-categoryName 和data-categoryXid ,X为1、2、3,1级菜单的a标签为data-category1id，以此类推。这样的做法是为了让程序确认点击的是a标签，并通过路由，将对应的参数传递给search。因为all-sort-list2 的div子节点有很多种：h3  a  dl   dd  em 都是它的子节点，通过给a绑定独有的属性，然后判断属性data-categoryName 和data-categoryXid是否存在，即可确定点击的是不是a标签、以及是哪一级的a标签。
- 总结：这里用到了编程式导航和事件委派，并通过自定义属性来优化性能。
# Search模块中TypeNav商品分类菜单与过渡动画效果
注意：TypeNav已经是全局组件，不需要再在Search中引入
过渡动画：前提是组件/元素务必要有v-if|v-show指令才可以进行过渡动画
# 商品分类列表的优化
- 项目：home切换到search或者search切换到home，你会发现一件事情，组件在频繁的向服务器发请求，
获取三级联动的数据进行展示。
项目中如果频繁的向服务器发请求，很好性能的，因此需要进行优化。
- 为什么会频繁的向服务器发请求获取三级联动的数据那?
因为路由跳转的时候，组件会进行销毁的【home组件的created：在向vuex派发action，因此频繁的获取三级联动的数据】
只需要发一次请求，获取到三级联动的数据即可，不需要多次
将之前获取TypeNav组件的服务器数据请求放在TypeNav组件中，可以将该请求放在App.vue里。
App.vue里面的代码：
```js
mounted(){
    // 通知Vuex发请求，获取数据，存储仓库当中
    this.$store.dispatch("categoryList");
  }
```
## this.$store.commit()
commit: 同步操作
this.$store.commit('方法名',值)【存储】
this.$store.state.方法名【取值】
## this.$store.dispatch()
dispatch: 异步操作
this.$store.dispatch('方法名',值)【存储】
this.$store.getters.方法名【取值】
# 合并param与query参数
# 开发Home首页当中的ListContainer组件与Floor组件
但是这里需要知道一件事情:服务器返回的数据（接口）只有商品分类菜单分类数据，对于ListContainer组件与Floor组件数据服务器没有提供的。
mock数据（模拟）:如果你想mock数据，需要用到一个插件mockjs
安装：`npm install mockjs`
1. 在项目当中src文件夹中创建mock文件夹
2. 第二步：准备json数据
【注意：webpack默认对外暴露的：图片，JSON数据格式】
3. 第三步:准备模拟的数据
把mock数据需要的图片放置于public文件夹中！【public文件夹在打包的时候，会把相应的资源原封不动的打包到dist文件夹中】
比如:listContainer中的轮播图的数据
[
   {id:1,imgUrl:'xxxxxxxxx'}, 
   {id:2,imgUrl:'xxxxxxxxx'}, 
   {id:3,imgUrl:'xxxxxxxxx'}, 
]
4. 第四步：在mock文件夹中创建一个mockServe.js文件
注意：在mockServe.js文件当中对于banner.json||floor.json的数据没有暴露，但是可以在server模块中使用。
对于webpack当中一些模块：图片、json，不需要对外暴露，因为默认就是对外暴露。
5. 第五步:通过mock模块模拟出数据
通过Mock.mock方法进行模拟数据
6. 第六步:回到入口文件，引入mockServe.js
mock需要的数据|相关mock代码页书写完毕，关于mock当中mockServe.js需要执行一次，
如果不执行，和你没有书写一样的。
7. 第七步:在API文件夹中创建mockRequest【axios实例：baseURL:'/mock'】
专门获取模拟数据用的axios实例。
在开发项目的时候：切记，单元测试，某一个功能完毕，一定要测试是否OK
# swiper使用
Swiper使用方法 - Swiper中文网
安装Swiper插件 视频同步选择Swiper@5
`npm install --save swiper@5`
## 使用步骤
1. 安装Swiper插件
2. 引入相应的依赖包(swiper.js|swiper.css)
3. 页面中的结构务必要有
4. 初始化swiper实例，给轮播图添加动态效果
## 完美的解决方案，轮播图问题
watch+nextTick
# vue  watch
watch：数据监听，监听已有数据变化
immediate：默认false
handler：watch中需要具体执行的方法
```js
watch:{
    isHot:{
        // handler什么时候调用？当isHot发生变化时
        handler(newValue,oldValue){
            console.log('isHot被修改了',newValue,oldValue)
        },
        immediate:true,//初始化时让handler调用一下
    }
}
```
# $nextTick
在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM
