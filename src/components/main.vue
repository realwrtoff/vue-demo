<template>
  <div class="containers">
    <div class="head">
      <!--顶部-->
      <div class="left">
        <img src="../assets/images/top/top-logo.png" />
      </div>
      <div class="right">
        <div class="right-box">
          <div class="right-inner">
            <div class="user">
              <span class="user-icon"></span>
              <span class="user-info">{{name}}</span>
            </div>
            <a class="logout" href="javascript:void(0)" @click="logout"></a>
          </div>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="content" v-bind:style="'max-height:'+height+'px'">
        <router-view>
          <!--内容主体-->
        </router-view>
        <div class="bottom">
          <span>Copyright&copy;2018 麦盟科技maimenggroup版权所有</span>
        </div>
      </div>
      <div class="aside" v-bind:style="'height:'+(height+15)+'px'">
        <!--左侧菜单-->
        <ul class="menu-list">
          <li v-bind:class="current=='company'?'current':''">
            <a href="javascript:void(0)" data-router="company" @click="menu_select">
              <span class="service"></span>公司
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getCookie } from "@/config/util";

export default {
  data() {
    return {
      height: 300,
      name: "admin",
      current: "company"
    };
  },
  created() {
    this.name = getCookie("username");
    let router = this.$router.currentRoute.path.split("/");
    this.current = router.length > 1 ? router[1] : this.current;
    this.height = document.documentElement.clientHeight - 75;
  },
  methods: {
    logout() {
      this.$router.push({
        path: "/"
      });
    },
    menu_select(e) {
      this.current = e.target.getAttribute("data-router");
      this.$router.push({
        path: "/" + this.current
      });
    }
  }
};
</script>

<style scoped>
@import "../assets/css/pages/main.css";
</style>
