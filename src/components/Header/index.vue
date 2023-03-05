<template>
  <div>
    <header class="header">
      <!-- 头部的第一行 -->
      <div class="top">
        <div class="container">
          <div class="loginList">
            <p>尚品汇欢迎您！</p>
            <p v-if="!userName">
              <span>请</span>
              <!-- <a href="###">登录</a> -->
              <!-- 声明式导航router-link，务必要有to属性 -->
              <router-link to="/login">登录</router-link>
              <!-- <a href="###" class="register">免费注册</a> -->
              <router-link class="register" to="/register"
                >免费注册</router-link
              >
            </p>
            <p v-else>
              <a>{{ userName }}</a>
              <a class="register" @click="logout">退出登录</a>
            </p>
          </div>
          <div class="typeList">

            <router-link to="/center/myOrder">我的订单</router-link>
            <router-link to="/shopcart">我的购物车</router-link>

            <a href="###">我的尚品汇</a>
            <a href="###">尚品汇会员</a>
            <a href="###">企业采购</a>
            <a href="###">关注尚品汇</a>
            <a href="###">合作招商</a>
            <a href="###">商家后台</a>
          </div>
        </div>
      </div>
      <!--头部第二行 搜索区域-->
      <div class="bottom">
        <h1 class="logoArea">
          <router-link class="logo" to="/home">
            <img src="./images/logo.png" alt="" />
          </router-link>
        </h1>
        <div class="searchArea">
          <form action="###" class="searchForm">
            <input
              type="text"
              id="autocomplete"
              class="input-error input-xxlarge"
              v-model="keyword"
            />
            <button
              class="sui-btn btn-xlarge btn-danger"
              type="button"
              @click="goSearch"
            >
              搜索
            </button>
          </form>
        </div>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  // name='',
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    /*  搜索按钮的回调函数：需要向search路由进行跳转
        通过编程式导航API,导航跳转到指定的页面/search */
    goSearch() {
      // 路由传参的方式
      // 第一种：字符串形式
      // this.$router.push('/search/'+this.keyword+'?k='+this.keyword.toUpperCase());
      // 第二种：模板字符串
      // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
      // 第三种：对象
      // 注意要给路由配置name，在router/index.jsx下给需要传参的路由配置
      if (this.$route.query) {
        // 由于$route的query和params默认为空对象，所以if的条件判断必定为true，不用担心因为不点击3级菜单而导致this.$router.query为undefined
        let location = {
          name: "search",
          params: { keyword: this.keyword || undefined },
        };
        location.query = this.$route.query; //给location传入之前点击3级菜单后，$route里存放的query参数
        this.$router.push(location);
      }
    },
    // 退出登录
    async logout(){
      // 退出登录需要做的事情
      // 1.需要发请求，通知服务器退出登录【清除一些数据:token】
      // 2.清除项目当中的数据
      try {
        // 如果退出成功
        await this.$store.dispatch('userLogout')
        // 回到首页
        this.$router.push('/home')
      } catch (error) {
        
      }
    }
  },
  // },
  mounted() {
    // 通过全局事件总线清除关键字
    this.$bus.$on("clear", () => {
      this.keyword = "";
    });
  },
  computed: {
    // 用户名信息
    userName() {
      return this.$store.state.user.userInfo.name;
    },
  },
};
</script>
<style lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
