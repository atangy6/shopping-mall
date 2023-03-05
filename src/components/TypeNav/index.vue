<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter='enterShow' >
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <!-- 过渡动画 -->
        <transition name='sort'>
        <div class="sort" v-show='show'>
          <!-- 利用编程式导航+事件委派实现路由的跳转与传递参数 -->
          <div class="all-sort-list2" @click="goSearch">
            <!-- v-for：遍历；c1:取名;index：索引;:key：值 -->
            <div
              class="item"
              v-for="(c1, index) in categoryList.slice(0, 16)"
              :key="c1.categoryId"
              :class="{ cur: currentIndex == index }"
            >
              <h3 @mouseenter="changeIndex(index)">
                <a
                  :data-categoryName="c1.categoryName"
                  :data-category1id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <!-- 二级、三级分类 -->
              <div
                class="item-list clearfix"
                :style="{ display: currentIndex == index ? 'block' : 'none' }"
              >
                <div
                  class="subitem"
                  v-for="(c2, index) in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryName="c2.categoryName"
                        :data-category2id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                      <!-- <router-link to='/search'>{{ c2.categoryName }}</router-link> -->
                    </dt>
                    <dd>
                      <em
                        v-for="(c3, index) in c2.categoryChild"
                        :key="c3.categoryId"
                      >
                        <a
                          :data-categoryName="c3.categoryName"
                          :data-category3id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                        <!-- <router-link to='/search'>{{ c3.categoryName }}</router-link> -->
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div> 
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex"; //可以使用 mapState 辅助函数帮助我们生成计算属性
// 引入lodash
// import _ from 'lodash';
// 最好的引入方式：按需加载;lodash源码中throttle默认暴露，引入时不用加{}
import throttle from 'lodash/throttle';

export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标移动到哪一个一级分类
      currentIndex: -1,
      show:true,
    };
  },
  // 组件挂载完毕：可以向服务器发请求
  mounted() {
    // 当组件挂载完毕，让show属性变为false
    // 如果不是home路由组件，将TypeNav隐藏
    this.show=false;
        if(this.$route.path==='/home'){
      this.show=true;
    }else{
      this.show=false;
    }
  },
  computed: {
    // es6中扩展运算符（spread）是三个点（...）
    ...mapState({
      // 右侧需要的是一个函数，当使用计算属性的时候，右侧函数会立即执行一次
      // 注入一个参数state,其实即为大仓库中的数据
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    // 鼠标进入修改响应式数据currentIndex属性
    /* changeIndex(index) {
      this.currentIndex = index;
    }, */
    // lodash中的throttle()方法用于创建一节流函数
    // throttle回调函数别用箭头函数，可能出现上下this
    changeIndex:throttle(function(index){
        this.currentIndex = index;
    },50),
    // 一级分类鼠标移除的事件回调
    leaveShow() {
      this.currentIndex = -1;
      if(this.$route.path!='/home'){
        // 当鼠标移除的时候让商品分类列表隐藏
        this.show=false
      }
    },
    // 进行路由跳转的方法
    
    goSearch(event){
      // this.$router.push('/search');
      // 最好的解决方案：编程式导航+事件委派
      // 利用事件委派存在的一些问题：1、如何确定点击的一定是a标签；2、如何获取参数（1、2、3级分类的产品名字和id）
      // 把子节点当中a标签加上自定义属性data-categoryName，其余的子节点没有
      let element = event.target;//event.target是发生事件的元素或触发事件的元素
      //console.log(element);
      // 获取到当前触发这个事件的节点（可能是h3 a dt dl），需要带有data-categoryName这样的节点（一定是a标签）
      // 节点有一个属性dataset 可以获取节点的自定义属性与属性值
      //console.log(element.dataset);
      let {categoryname,category1id,category2id,category3id} = element.dataset;
      // console.log(categoryname);
      // 如果标签身上拥有categoryname，那么一定是a标签
      if(categoryname){
        // 区分是一级分类、二级分类、还是三级分类的a标签
        // 整理路由跳转的参数
        let location ={name:'search'};
        let query={categoryName:categoryname};
        if(category1id){
          // 说明是一级分类a标签
          query.category1Id = category1id;
          // 说明是二级分类a标签
          }else if(category2id){
          // 说明是二级分类a标签
          query.category2Id = category2id;
        }else{
          // 说明是三级分类a标签
          query.category3Id = category3id;
        }
        if(this.$route.params){
          location.params=this.$route.params
          // 动态给location配置对象添加query属性
          location.query=query;
          // 路由跳转
          this.$router.push(location);
        }
      }
    },
    // 当鼠标移入的时候，让商品分类列表进行显示
    enterShow(){
     if(this.$route.path!='/home'){
        // 当鼠标移除的时候让商品分类列表显示
        this.show=true
      }
    }
  }, 
};
</script>


<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          //   &:hover {
          //     .item-list {
          //       display: block;
          //     }
          //   }
        }
        // .item:hover{
        //     background-color: rgb(206, 158, 158);
        // }
        .cur {
          background: skyblue;
        }
      }
    }
    // 过渡动画的样式
    // 过渡动画开始状态（进入）
    .sort-enter{
      height: 0px;
      // transform: rotate(0deg);
    }
    // 过渡动画结束状态（进入）
    .sort-enter-to{
      height: 461px;
      // transform: rotate(10deg);
    }
    // 定义动画的时间、速率
    .sort-enter-active{
      transition: all .5s linear;
    }
  }
}
</style>
// 全局引入