// search模块的小仓库

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
    async getSearchList({commit},params={}){
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
        // state.searchList.goodsList如果服务器数据回来了，没问题是一个数组
        // 加入没有网络state.searchList.goodsList应该返回的是undefind
        return state.searchList.goodsList||[]
     },
     trademarkList(state){
        return state.searchList.trademarkList
     },
     attrsList(state){
        return state.searchList.attrsList
     },
};
 
export default{
    state,mutations,actions,getters
}