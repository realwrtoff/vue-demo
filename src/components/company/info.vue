<template>
  <div class="main company-info">
    <div class="main-edit">
      <div class="edit-box">
        <h6>
          <span></span>基本信息
        </h6>
        <div class="box-info">
          <div class="info-item">
            <span class="item-left">省份</span>
            <span class="item-right">{{this.company.province}}</span>
          </div>
          <div class="info-item">
            <span class="item-left">城市</span>
            <span class="item-right">{{this.company.city}}</span>
          </div>
          <div class="info-item">
            <span class="item-left">行政区</span>
            <span class="item-right">{{this.company.district}}</span>
          </div>
          <div class="info-item">
            <span class="item-left">公司名称</span>
            <span class="item-right">{{this.company.name}}</span>
          </div>
          <div class="info-item">
            <span class="item-left">法定代表人</span>
            <span class="item-right">{{this.company.legalPersonName}}</span>
          </div>
          <div class="info-item">
            <span class="item-left">成立时间</span>
            <span class="item-right">{{this.company.establishTime}}</span>
          </div>
          <div class="info-item">
            <span class="item-left">注册资本</span>
            <span class="item-right">{{this.company.regCapital}}</span>
          </div>
          <div class="info-item">
            <span class="item-left">公司地址</span>
            <span class="item-right">{{this.company.address}}</span>
          </div>
          <div class="info-item">
            <span class="item-left">行业</span>
            <span class="item-right">{{this.company.industry}}</span>
          </div>
          <div class="info-item">
            <span class="item-left">经营范围</span>
            <span class="item-right">{{this.company.businessScope}}</span>
          </div>
        </div>
      </div>
      <div class="edit-btn-list">
        <button type="button" class="btn-submit" @click="cancel">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/config/api";

export default {
  data() {
    return {
      company: {
        // 基本信息
        province: "", // 省份
        city: "", // 城市
        district: "", // 行政区
        name: "", // 公司名称
        legalPersonName: "", // 法定代表人
        establishTime: "", // 成立时间
        regCapital: "", // 注册资本
        address: "", // 公司地址
        industry: "", // 行业
        businessScope: "" // 经营范围
      }
    };
  },
  created() {
    this.company.companyId =
      this.$route.query.id == undefined ? 0 : this.$route.query.id;
    this.init();
  },
  methods: {
    //广告主数据初始化
    init() {
      let _this = this;

      api
        .getCompanyDetail(this.company.companyId, {})
        .then(data => {
          _this.company = data;
        })
        .catch(err => {
          console.log("getCompanyDetail failed.", err);
          _this.$message.error("数据初始化失败，请刷新重试");
        });
    },
    //取消-返回列表
    cancel() {
      this.$router.push({
        path: "/company"
      });
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/pages/main.css";

.company-info .edit-box .info-item .item-left {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

