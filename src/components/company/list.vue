<template>
  <div class="main advertiser">
    <div class="main-search">
      <div class="search-item">
        <span class="item-left">省份</span>
        <span class="item-right">
          <input type="text" value class="txt-common" v-model="search.province" />
        </span>
        <span class="item-left">城市</span>
        <span class="item-right">
          <input type="text" value class="txt-common" v-model="search.city" />
        </span>
      </div>
      <button type="button" class="btn-search" @click="search_list">查询</button>
    </div>
    <div class="main-table">
      <div class="table-msg">
        <div class="msg-left">
          <p>
            查询符合上述条件的数据
            <span>{{data.totalCount}}</span>条
          </p>
        </div>
      </div>
      <table border="0" cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <td>省份</td>
            <td>城市</td>
            <td>公司名称</td>
            <td>法人代表</td>
            <td>成立时间</td>
            <td>注册资本</td>
            <td>地址</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data.list" :key="item.companyId">
            <td>{{item.province}}</td>
            <td>{{item.city}}</td>
            <td>{{item.name}}</td>
            <td>{{item.legalPersonName}}</td>
            <td>{{item.establishTime}}</td>
            <td>{{item.regCapital}}</td>
            <td>{{item.address}}</td>
            <td>
              <a href="javascript:void(0)" @click="info(item.companyId)">详情</a>
            </td>
          </tr>
          <tr v-if="data.totalCount<=0">
            <td colspan="6" class="table-empty">没有符合条件的数据</td>
          </tr>
        </tbody>
      </table>
      <div class="table-pager" v-show="data.totalCount>0">
        <div class="pager-left">
          <span>每页显示：</span>
          <select id="page-size" @change="change_size">
            <option value="10">每页显示10条</option>
            <option value="20">每页显示20条</option>
            <option value="50">每页显示50条</option>
          </select>
        </div>
        <div class="pager-right" v-show="data.totalPage>1">
          <div class="pager-box">
            <ul>
              <li v-if="pagers.prev">
                <a href="javascript:void(0)" @click="prev">上一页</a>
              </li>
              <li v-else-if="!pagers.prev">
                <a class="disabled">上一页</a>
              </li>
              <li v-for="p in pagers.pagers" :key="p">
                <a v-if="p==pagers.index" class="current">{{p}}</a>
                <a v-else-if="p!=pagers.index" href="javascript:void(0)" @click="goto(p)">{{p}}</a>
              </li>
              <li v-if="pagers.next">
                <a href="javascript:void(0)" @click="next">下一页</a>
              </li>
              <li v-else-if="!pagers.next">
                <a class="disabled">下一页</a>
              </li>
            </ul>
            <span>共{{data.totalPage}}页，跳到第</span>
            <input type="text" value="1" id="go-page" />
            <span>页</span>
            <button type="button" class="btn-com" @click="goto(0)">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/config/api";

export default {
  data() {
    return {
      search: {
        province: "", //部门代码
        city: "", //职位代码
        page_size: 10, //每页数量
        page: 1 //页码
      },
      data: {
        list: [], //数据集
        totalPage: 0, //总页数
        totalCount: 0 //总条数
      },
      pagers: {
        index: 1, //当前页
        prev: false, //上一页
        next: true, //下一页
        pagers: [1, 2, 3, 4, 5] //页码集合
      }
    };
  },
  created() {
    //数据初始化
    this.search_data();
  },
  methods: {
    //数据查询
    search_data() {
      let _this = this;
      api
        .getCompanyList({
          province: _this.search.province,
          city: _this.search.city,
          page: _this.search.page,
          page_size: _this.search.page_size
        })
        .then(data => {
          _this.data.list = data.list;
          _this.data.totalPage = data.totalPage;
          _this.data.totalCount = data.totalCount;
          _this.set_pagers(_this.search.page, _this.data.totalPage);
        })
        .catch(err => {
          console.log("getCompanyList failed.", err);
          _this.$message.error("数据初始化失败，请刷新重试");
        });
    },
    //分页初始化
    set_pagers(index, totalpage) {
      let pagers = {};

      pagers.index = index;

      if (pagers.index == 1) {
        pagers.prev = false;
      } else {
        pagers.prev = true;
      }

      if (pagers.index == totalpage) {
        pagers.next = false;
      } else {
        pagers.next = true;
      }

      pagers.pagers = [];
      let maxpage = Math.ceil(pagers.index / 5) * 5;
      let t = totalpage < maxpage ? totalpage : maxpage;
      let i = t - 4;
      if (i <= 0) {
        i = 1;
      }
      for (i; i <= t; i++) {
        pagers.pagers.push(i);
      }

      this.pagers = pagers;
    },
    //上一页
    prev() {
      this.search.page--;
      this.search_data();
    },
    //下一页
    next() {
      this.search.page++;
      this.search_data();
    },
    //跳转到
    goto(i) {
      if (i == 0) {
        i = document.getElementById("go-page").value;

        if (i > this.data.totalPage) {
          i = this.data.totalPage;
        }

        if (i < 1) {
          i = 1;
        }

        document.getElementById("go-page").value = i;
      }

      this.search.page = i;
      this.search_data();
    },
    //修改每页显示条数
    change_size(e) {
      this.search.page = 1;
      this.search.size = parseInt(e.target.value);
      this.search_data();
    },
    //按条件查询
    search_list() {
      this.search.page = 1;
      this.search_data();
    },
    //查看详情
    info(id) {
      this.$router.push({
        path: "/company/info?id=" + id
      });
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/pages/main.css";
</style>

