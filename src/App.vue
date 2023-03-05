<template lang="">
  <div>
    <!-- 使用 -->
    <Header/>
    <!-- 路由组件出口的地方 :不设置,路由组件不知道在哪里显示-->
    <router-view></router-view>
    <Footer v-show='$route.meta.show'></Footer>
  </div>
</template>
<script>
// 引入组件
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name:'App',
  // 注册
  components:{
    Header,
    Footer,
  },
  mounted(){
    // 通知Vuex发请求，获取数据，存储仓库当中
    this.$store.dispatch("categoryList");
  }
}
</script>
<style lang="">
  
</style>
