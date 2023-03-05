<template>
    <div>
        <!-- 三级联动全局组价 -->
        <!-- 不需要再引入（import）三级联动，因为已经注册为全局组建了。可以直接使用 -->
        <TypeNav></TypeNav>
        <ListContainer></ListContainer>
        <Recommend></Recommend>
        <Rank></Rank>
        <Like></Like>
        <!-- floor这个组件：自己在组件内部是没有发请求的，数据是父组件给的 -->
        <Floor v-for='(floor,index) in floorList' :key='floor.id' :list='floor'></Floor>
        <!-- 组件复用 -->
        <!-- <Floor></Floor> -->
        <Brand></Brand>
    </div>
</template>
<script>
// 引入其余的组件
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import { mapState } from 'vuex'

export default {
    // 注册
    components:{
        ListContainer,
        Recommend,
        Rank,
        Like,
        Floor,
        Brand,
    },
    mounted(){
        // 派发action，获取floor组件的数据
        this.$store.dispatch('getFloorList')
        // 获取用户信息在首页展示
        this.$store.dispatch('getUserInfo')
    },
    computed:{
        ...mapState({
            floorList:state=>state.home.floorList
        })
    }
    
}
</script>
<style lang="less">
    
</style>