[toc]
# 使用vue脚手架创建一个项目

# vue-cli脚手架初始化项目
- node+webpack+淘宝镜像
- node_modules文件夹：项目依赖
- public文件夹：一般放置静态资源（图片），需要注意，放在public文件夹中的静态资源，webpack进行打包的时候，会原封不动打包到dist文件夹中。
- src文件夹（程序员代码文件夹）：
    assets文件夹：一般也是放置静态资源（一般放置多个组件共用的静态资源），需要注意，放置在assrts文件夹里面静态资源，在webpack打包的时候，webpack会把静态资源当做一个模块，打包到JS文件里面。
    components文件夹：一般放置的是非路由组件（全局组件）
    App.vue:唯一的根组件，Vue当中的组件（.vue）
    main.js：程序入口文件，也是整个程序当中最先执行的文件
- babel.config.js：配置文件（bable相关）
- package.json文件：项目信息
- package-lock.json文件：缓存性文件
- README.md：说明性文件
# 项目的其他配置
2.1项目运行起来的时候，让浏览器自动打开
---package.json
"scripts": {
    "serve": "vue-cli-service serve --open",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },

2.2eslint效验功能关闭
---在根目录下，创建一个vue.config.js
比如：声明变量但没有使用eslint校验工具报错
module.exports = {
   lintOnSave:false,
}

2.3文件夹简写方法，配置别名 @
jsconfig.json配置别名 @提示 [@代表的是src文件夹，这样将来文件过多，找的时候方便很多]
# 项目路由的分析
vue-router
前端所谓路由：KV键值对
key:URL(地址栏中的路由)
value:相应的路由组件
注意：项目上中下结构

- 路由组件：
Home首页路由组件、Search路由组件、login登陆路由(有Header,没有Footer)
- 非路由组件：
Header
Footer[在首页、搜索页]，但在登录页没有
# 完成非路由组件Header与Footer业务
在开发项目的时候：
1：写静态页面
2：拆分组件
3：获取服务器的数据动态展示
4：完成相应的动态业务逻辑
注意1：创建组件的时候，组件结构+组件的样式+图片资源
注意2：项目采用less,浏览器不识别less语法，需要一些loader进行处理(`npm i less-loder`)，把less语法转换为CSS语法
注意3：需要在style标签的身上加上lang="less",不添加样式不生效
## (非路由组件)使用组件的步骤:
第一步：定义
第二步：引入
第三步：注册
第四步:使用
# 路由组件的搭建
vue-router
- 安装路由
`npm i --save vue-router （安装vue-router@3|npm i --save vue-router@3）`
--save:可以让你安装的依赖，在package.json文件当中进行记录
- 路由组件应该有四个:Home、Search、Login、Register
-components文件夹：经常放置的非路由组件（共用全局组件）
-views|pages文件夹：经常放置路由组件
## 配置路由
创建router文件夹：项目当中配置的路由一般放在router文件夹中
配置路由routes
## 总结
- 路由组件和非路由组件的区别
1.路由组件一般放在views|pages文件夹，非路由组件一般放在components文件夹中
2.路由组件一般需要在router文件夹中进行注册，非路由组件在使用时一般都是以标签的形式使用
3.注册完路由，不管路由组件、还是非路由组件身上都有$route和$router属性

$route：一般获取路由信息【路径、query、params等等】
$router：一般进行编程式导航进行路由跳转【push|replace】
## 路由的跳转
两种形式：
1.声明式导航router-link,可以进行路由的跳转【务必要有to属性】
2.编程式导航push|replace,可以进行路由跳转
当点击`<router-link>`时，这个方法会在内部调用，即点击`<router-link :to="...">` 等同于调用 `router.push(...)`

编程式导航：声明式导航能做的，编程式导航都能做
但编程式导航除了可以进行路由跳转，还可以做一些其他的业务逻辑
# Footer组件显示与隐藏
Footer组件：在Home、Search显示Footer组件
Footer组件：在登录、注册时候隐藏
- 显示或隐藏组件：v-show与v-if（不推荐）
- 我们可以根据组件身上的$route获取当前路由的信息，通过路由路径判断Footer显示与隐藏
配置路由的时候，可以给路由添加路由元信息【meta】，路由需要配置对象，它的key不能乱写
## 面试题：v-show与v-if区别?
v-show:通过样式display控制
v-if：通过元素上树与下树进行操作
## 面试题:开发项目的时候，优化手段有哪些?
1:v-show|v-if
2:按需加载
# 路由传参
## 路由跳转有几种方式
比如：A->B
声明式导航：router-link(务必要有to属性)，可以实现路由的跳转
编程式导航：利用的是组件实例的$router.push|replace，可以实现路由的跳转
## 路由传参，参数有几种
params参数：属于路径当中的一部分;需要注意：路由需要占位，程序就崩了，属于URL当中一部分
query参数：不属于路径当中的一部分;需要注意：路由不需要占位，写法类似于ajax当中query参数
## 路由传参的方式
---page/Search/index.vue
<h1>params参数---{{$route.params.keyword}}</h1>
<h1>query参数---{{$route.query.k}}</h1>
---components/Header/index.vue
<input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword"/>
<button class="sui-btn btn-xlarge btn-danger" type="button" @click='goSearch'>搜索</button>
······
goSearch(){
  // 第一种：字符串形式
  this.$router.push('/search/'+this.keyword+'?k='+this.keyword.toUpperCase());
  // 第二种：模板字符串
  this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
  // 第三种：对象
  // 注意要给路由配置name，在router/index.jsx下给需要传参的路由配置
  this.$router.push({name:'search',params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}})
}
---router/index.js
{
    path:'/search/:keyword',
    component:Search,
    meta:{show:true},
    name:'search',
},

## 路由传递参相关面试题
     1:路由传递参数（对象写法）path是否可以结合params参数一起使用?
     不可以,路由跳转传参的时候，对象的写法可以是name、path形式，但需要注意的是，path这种写法不能与params参数一起使用
     2:如何指定params参数可传可不传? 
     3:params参数可以传递也可以不传递，但是如果传递是空串，如何解决？
     4:如果指定name与params配置, 但params中数据是一个"", 无法跳转，路径会出问题
     5: 路由组件能不能传递props数据?