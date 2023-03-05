<template>
  <!-- 轮播图 -->
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <!-- 遍历轮播图图片 -->
      <div
        class="swiper-slide"
        v-for="(carousel, index) in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>
<script>
// 引入包
import Swiper from "swiper";
export default {
  name: "Carousel",
  props:['list'],
   watch:{
    list:{
      // 立即监听：不管数据有没有变化，立即监听一次
      // 为什么watch监听不到list变化：因为这个数据从来没有发生变化（数据是父亲给的，给的时候就是一个对象，对象里面该有的数据都是有的
      immediate:true,
      handler(){
        // 只能监听到数据已经有了，但是v-for动态渲染结构我们还是没有办法确定的，因此还是需要用nextTick
        this.$nextTick(()=>{
          var mySwiper = new Swiper(
      this.$refs.cur,
      {
        loop: true,
        pagination: {
          el: ".swiper-pagination",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      }
    );
        })
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>