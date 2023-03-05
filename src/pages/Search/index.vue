<template>
  <div>
    <!-- 商品分类三级列表 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread：面包屑，带有x的结构的-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if='searchParams.categoryName'>{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if='searchParams.keyword'>{{searchParams.keyword}}<i @click="removekeyword">×</i></li>
            <!-- 品牌的面包屑 -->
             <li class="with-x" v-if='searchParams.trademark'>{{searchParams.trademark.split(':')[1]}}<i @click="removeTradeMark">×</i></li>
             <!-- 平台的售卖的属性值展示 -->
             <li class="with-x" v-for='(attrValue,index) in searchParams.props' :key="index">{{attrValue.split(':')[1]}}<i @click="removeAttr(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo='trademarkInfo' @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li class="active">
                  <a href="#">综合</a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li>
                  <a href="#">价格⬆</a>
                </li>
                <li>
                  <a href="#">价格⬇</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good, index) in goodsList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`"><img :src="good.defaultImg"/></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo='searchParams.pageNo' :pageSize='searchParams.pageSize' :total='total' :continues='5' @getPageNo='getPageNo'/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
  import SearchSelector from './SearchSelector/SearchSelector'
  export default {
    name: 'Search',

    components: {
      SearchSelector
    },
    data(){
      return{
        // 带给服务器参数
        searchParams:{
          // 一级分类的ID
          category1Id: "",
           // 二级分类的ID
          category2Id: "",
           // 三级分类的ID
          category3Id: "",
          // 分类名字
          categoryName: "",
          // 关键字
          keyword: "",
          // 排序
          order: "",
          // 分页器用的，代表的是当前是第几页
          pageNo: 1,
          // 代表的是每一页展示数据个数
          pageSize: 5,
          // 平台售卖属性操作带的参数
          props: [],
          // 品牌
          trademark: ""
        }
      }
    },
    // 当组件挂载完毕之前执行一次【先于mounted之前】
    beforeMount(){
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      // console.log('发请求之前',this.searchParams);
    },
    // 组件挂载完毕仅仅执行一次
    mounted(){
      // 在发请求之前带给服务器参数（searchParams参数发生变化有数值带给服务器）
      this.getData()
    },
    computed:{
      // 将仓库中的数据映射为组件身上的数据
      // mapGetters里面的写法：传递的是数组，因为getter计算属性是没有划分模块【home、search】
      ...mapGetters(['goodsList']),
      // 获取search模块展示产品一共多少数据
      ...mapState({
        total:state=>state.search.searchList.total
      }),
    },
    methods:{
      // 向服务器发请求，获取search模块数据（根据参数不同返回不同的数据进行展示）
      // 把这次请求封装为一个函数，当你需要在调用的时候调用即可
      getData(){
         this.$store.dispatch("getSearchList", this.searchParams);
      },
      //清除面包屑-商品名字(点击x后)
      removeCategoryName(){
         //搜索条件商品名字清空
         // 把带给服务器的参数置空了，还需要向服务器发请求
        // 带给服务器参数说明（可有可无的）：属性值为空的字符串还是会把相应的字段带给服务器
        // 但是如果把相应的字段变为undefind,当前这个字段不会带给服务器
        this.searchParams.categoryName=undefined
        this.searchParams.category1Id=undefined
        this.searchParams.category2Id=undefined
        this.searchParams.category3Id=undefined
        this.getData()
        // 地址栏也需要修改
        if(this.$route.params){
          this.$router.push({name:'search',params:this.$route.params})
        }
      },
      // 删除关键字
      removekeyword(){
        // 给服务器带的参数searchParams的keyword置空
        this.searchParams.removekeyword=undefined
        // 再次发请求
        this.getData()
        // 通知兄弟组件Header清除关键字
        this.$bus.$emit('clear')
        // 进行路由的跳转
        if(this.$route.query){
           this.$router.push({'name':'search',query:this.$route.query})
        }
      },
      // 自定义事件回调
      trademarkInfo(trademark){
        this.searchParams.trademark=`${trademark.tmId}:${trademark.tmName}`
        // 再次发请求获取search模块列表的数据进行展示
        this.getData()
      },
      // 删除品牌信息
      removeTradeMark(){
        this.searchParams.trademark=undefined
      },
      // 收集平台属性地方回调函数（自定义事件）
      attrInfo(attr,attrValue){
        let props=`${attr.attrId}:${attrValue}:${attr.attrName}`
        this.searchParams.props.push(props)
        // 数组去重
        if(this.searchParams.props.indexOf(props)==-1){
            this.searchParams.props.push(props)
        }
        // 再次发请求
        this.getData()
      },
      removeAttr(index){
        // 再次整理参数
        this.searchParams.props.splice(index,1)
        // 再次发请求
        this.getData()
      },
      // 自定义事件的回调函数---获取当前第几页
      getPageNo(pageNo){
        //父组件整理参数
      this.searchParams.pageNo = pageNo;
       this.getData();
      }
    },
      watch: {
    $route(newValue, oldValue) {
      // 再次处理请求参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      console.log(this.searchParams);
      this.getData();
      //分类名字与关键字不用清理：因为每一次路由发生变化的时候，都会给他赋予新的数据
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
  },
  }
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>