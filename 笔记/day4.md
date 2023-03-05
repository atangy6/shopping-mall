# 开发floor组件(Floor组件它被复用的（重复使用两次）)
1. 从mock中获取floor数据---api/index.js
export const reqFloorList=()=>mockRequests.get('/floor')
2. ---store/home/index.js
```js
// 引入封装的API
import {reqFloorList} from '@/api'
const state = {
    // state中的数据默认初始值别瞎写，服务器返回对象，服务器返回数组。【根据接口返回值初始化】
    // floor组件的数据
    floorList:[],
};
const mutations = {
    GETFLOORLIST(state,floorList){
        state.floorList=floorList
    }
};
//类似于methods,用于发起异步请求
const actions = {
    // 获取floor数据;commit提交;发请求;await等待返回的结果，有await同样要有async;获取数据后提交mutations
    async getFloorList({commit}){
        let result=await reqFloorList()
        if(result.code==200){
            // 提交mutations
            commit('GETFLOORLIST',result.data)
        }
    }
};
```
3. ---page/Home/index.vue
getFloorList这个action在哪里触发，是需要在Home路由组件当中发的,不能在Floor组件内部发action，因为我们需要v-for遍历floor组件
父组件派发action，通知Vuex发请求，Home父组件获取仓库的数据，通过v-for遍历出多个Floor组件
```js
<Floor v-for='(floor,index) in floorList' :key='floor.id' :list='floor'></Floor>//将父组件数据传给子组件

import { mapState } from 'vuex'

mounted(){
        // 派发action，获取floor组件的数据
        this.$store.dispatch('getFloorList')
    },
computed:{
        ...mapState({
            floorList:state=>state.home.floorList
        })
    }
```
注意：v-for|v-show|v-if|这些指令可以在自定义标签（组件）的身上使用
4. 子组件拿到数据（页面暂未显示获得的数据）---page/Home/Floor/index.vue
props:['list']
5. 动态展示数据
引入轮播图
- 引入swiper包
- 引入swiper样式（main.js中已经引入）
- 遍历图片
- new swiper实例
## 优化
把首页当中的轮播图拆分为一个共用的全局组件
【好乱。。。】
## 组件间通信***面试必问的东西
props:用于父子组件通信
插槽:父子
自定义事件:@on @emit可以实现子给父通信
全局事件总线`$bus`:万能
pubsub:万能
Vuex:万能
`$ref`:父子通信

