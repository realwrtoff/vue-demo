<template>
  <div class="container login" @keyup.enter="login">
    <div class="login-top">
      <div class="top-center">
        <img src="../assets/images/login/login-title.png" alt />
        <div class="top-right">
          <a href="#">麦盟官网</a> |
          <a href="#">帮助中心</a>
        </div>
      </div>
    </div>
    <div class="login-content">
      <div class="content-center">
        <div class="login-box">
          <h3>登录</h3>
          <div class="input" v-bind:class="{'error':$v.username.$error}">
            <span class="icon-user"></span>
            <input
              type="text"
              value
              class="input-text"
              placeholder="请输入用户名"
              v-model.trim="username"
              @blur="$v.username.$touch"
            />
            <div class="msg">请输入用户名</div>
          </div>
          <div class="input" v-bind:class="{'error':$v.password.$error}">
            <span class="icon-password"></span>
            <input
              type="password"
              value
              class="input-text"
              placeholder="请输入密码"
              v-model.trim="password"
              @blur="$v.password.$touch"
            />
            <div class="msg">请输入密码</div>
          </div>
          <button type="button" class="btn" @click="login">登录</button>
        </div>
      </div>
    </div>
    <div class="login-bottom">
      <p>Copyright&copy;2018 麦盟科技maimenggroup版权所有</p>
    </div>
  </div>
</template>

<script>
import api from "@/config/api";
import { setCookie } from "@/config/util";
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      username: "admin",
      password: ""
    };
  },
  validations: {
    username: { required },
    password: { required }
  },
  methods: {
    login() {
      let _this = this;

      //数据验证
      _this.$v.$touch();

      var loginForm = {
        username: _this.username,
        password: _this.password
      };
      //数据提交
      api
        .login(loginForm)
        .then(data => {
          this.loading = false;
          setCookie("token", data.token);
          setCookie("username", _this.loginForm.username);
          _this.$router.push({ path: _this.redirect || "/company" });
        })
        .catch(err => {
          this.loading = false;
          _this.$message.error(err);
        });
    }
  }
};
</script>

<style scoped>
@import "../assets/css/pages/login.css";
</style>
