# search模块开发
1. 先写静态页面+静态组件拆分出来
2. 发请求(API)
3. vue(三连环)
4. 组件获取仓库数据，动态展示数据
## 步骤
1. 从服务器中获取search数据---api/index.js
// 获取搜索模块数据，地址：/api/list   请求方式：POST 参数：
// 当前这个函数需要接受外部传递参数 params代表给服务器传递的参数
export const reqGetSearchInfo=(params)=>{requests({url:'/list',method:'post',data:params})}
2. vue(三连环)---store/search/index.js
```js
// 引入封装的API
import {reqGetSearchInfo} from '@/api'
const state = {
    searchList:{}
};
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList=searchList
    }
};
//类似于methods,用于发起异步请求
const actions = {
    // 获取search模块数据,
    async getSearchList({commit},params){
        // 当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
        // params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result=await reqGetSearchInfo(params)
        if(result.code==200){
            // 提交mutations
            commit('GETSEARCHLIST',result.data)
        }
    }
};
//getters:仓库的计算属性
//项目中:vuex的getters,为了简化数据而生。
// 可以把我们将来在组件当中需要用的数据简化一下【将来组件在获取数据的时候就方便了】
const getters={
     goodsList(state){
        return state.searchList.goodsList
     },
     trademarkList(state){
        return state.searchList.trademarkList
     },
     attrsList(state){
        return state.searchList.attrsList
     },
};
```
3. 组件获取仓库数据，动态展示数据---page/Search/index.vue
## 面包屑
---page/search/index.vue
