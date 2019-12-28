<template>
  <div class="header">
    <div style="float:left;cursor: pointer;" @click="$router.push('/')">
      <div class="logo">
        <img src="../../../static/img/bookCollege/logo.png">
      </div>
    </div>
    <div class="nav">
      <ul>
        <!-- <router-link tag="li" :to="item.path" v-for="(item,index) in navigation" :key="index">
            <p @click='cutBtn(index)' :class='index == Act'>{{item.name}}</p>
        </router-link>-->
        <li
          @click="cutBtn(index,item)"
          v-for="(item,index) in navigation"
          :key="index"
          :class="index == Act ? 'header-nav' : ''"
        >
          <p>{{item.name}}</p>
        </li>
      </ul>
    </div>
    <div v-if="!userState">
      <router-link
        class="register-btn"
        tag="button"
        to="/LoginEntrance"
        v-if="!RegistrationButtonStatus"
      >
        <div @click="registerBtn">注册</div>
      </router-link>
      <router-link class="register-btn login-btn" tag="button" to="/LoginEntrance" v-else>
        <div @click="loginBtn">登录</div>
      </router-link>
    </div>
    <div class="userinfo" v-else>
      <el-dropdown @command="handleSelect">
        <span>
          <img :src="portrait?portrait:src" alt>
          <span class="el-dropdown-link">
            {{mobile || cellphone}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            :command="item.code"
            v-for="(item,index) in mines"
            :key="index"
          >{{item.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 忘记密码弹出框 -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="471px"
      style="z-index:10000"
      :modal-append-to-body="false"
    >
      <div class="modal-box">
        <p class="model-forget">忘记密码</p>
        <span class="new-password">原密码</span>
        <input class="new-code" type="password" placeholder="原密码" v-model="YnewPassword">
        <span class="new-password">新密码</span>
        <input class="new-code" type="password" placeholder="新密码" v-model="XnewPassword">
        <span class="new-passwords">重复新密码</span>
        <input class="new-code" type="password" placeholder="重复新密码" v-model="XnewPasswords">
        <div style="clear:both"></div>
        <p class="tit">{{tit}}</p>
        <button class="modal-submit" @click="resetBtn()">提交</button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import md5 from "js-md5";
import { localData } from "../../api/index";
export default {
  data() {
    return {
      tit: "",
      YnewPassword: "", //原来密码
      XnewPassword: "", //新密码
      XnewPasswords: "", //重复新密码
      src: require("../../assets/image/header.png"),
      portrait: "",
      activeIndex: "1",
      ButtonSwitch: true,
      navigation: [
        { name: "首页", path: "/homePage" },
        { name: "测评", path: "/appraisal" },
        { name: "提分行动", path: "/vipCenter" },
        { name: "学习中心", path: "/learningCenter" },
        { name: "专家解读", path: "/readingTraining" },
        { name: "新国人在线", path: "/collegeOnline" }
      ],
      mines: [
        { code: "1", name: "基本信息" },
        { code: "4", name: "我的订单" },
        { code: "2", name: "会员中心" },
        { code: "8", name: "消息中心" },
        // { code: "4", name: "我的订单" },
        { code: "5", name: "修改密码" },
        { code: "6", name: "常见问题" },
        { code: "7", name: "退出登录" }
      ],
      active: 0,
      cellphone: "",
      dialogVisible: false
    };
  },
  created() {
    var web = localData.get("web") || {};
    this.portrait = web.portrait || "";
    this.cellphone = web.mobile || "";
    this.$store.commit("active", localStorage.getItem("active"));
    if (this.$route.fullPath == "/homePage") {
      this.$store.commit("active", 0);
    } else if (this.$route.fullPath == "/appraisal") {
      this.$store.commit("active", 1);
    } else if (this.$route.fullPath == "/vipCenter") {
      this.$store.commit("active", 2);
    } else if (this.$route.fullPath == "/learningCenter") {
      this.$store.commit("active", 3);
    } else if (this.$route.fullPath == "/readingTraining") {
      this.$store.commit("active", 4);
    } else if (this.$route.fullPath == "/collegeOnline") {
      this.$store.commit("active", 5);
    }
    // if(this.$route.)
  },
  mounted() {
    //因为页面刷新后vuex里store的值会消失，所以要查询session里面如果有值得话继续向userState里面存储
    if (localStorage.getItem("token")) {
      this.$store.commit("userState", localStorage.getItem("token"));
    } else {
      this.$store.commit("userState", null);
    }
  },
  computed: {
    userState() {
      return this.$store.state.userState;
    },
    Act() {
      return this.$store.state.active;
    },
    mobile() {
      return this.$store.state.mobile;
    },
    RegistrationButtonStatus() {
      return this.$store.state.RegistrationButtonStatus;
    }
  },
  methods: {
    //修改密码
    resetBtn() {
      let self = this;
      let myreg = /^1[34578]\d{9}$/;
      let str = /^[a-z0-9A-Z]{6,18}$/;
      if (self.YnewPassword.length < 1) {
        self.tit = "原密码不能为空";
        return;
      }
      if (self.XnewPassword.length < 1 || self.XnewPasswords.length < 1) {
        self.tit = "新密码不能为空";
        return;
      }

      if (!str.test(self.XnewPassword) || !str.test(self.XnewPasswords)) {
        self.tit = "密码长度为6-18位";
        return;
      }
      if (self.XnewPassword != self.XnewPasswords) {
        self.tit = "两次输入密码不一致";
        return;
      }
      self.tit = "";

      this.$axios
        .post("/user/editPassword", {
          userId: JSON.parse(localStorage.getItem("web")).userId,
          oldPassword: md5(this.YnewPassword),
          newPassword: md5(this.XnewPasswords)
        })
        .then(res => {
          if (res.code == "000303") {
            self.tit = "原密码输入有误";
            return;
          }
          if (res.code == "000000") {
            this.$message({
              message: "修改密码成功",
              type: "success"
            });
            this.dialogVisible = false;
            this.YnewPassword = ""; //原来密码
            this.XnewPassword = ""; //新密码
            this.XnewPasswords = ""; //重复新密码
          }
        });
    },
    handleSelect(key, keyPath) {
      this.$emit("cutBtn", true);
      if (key == 1) {
        //基本信息
        this.$store.commit("active", 10);
        this.$router.push({
          path: "/personalInfo",
          query: {
            state: 1
          }
        });
      } else if (key == 2) {
        //会员中心
        this.$store.commit("active", 2);
        this.$router.push({
          path: "/personalInfo",
          query: {
            state: 3
          }
        });
      } else if (key == 3) {
        //会员中心
      } else if (key == 4) {
        //我的订单
        this.$store.commit("active", 10);
        this.$router.push({
          path: "/personalInfo",
          query: {
            state: 2
          }
        });
      } else if (key == 8) {
        //消息中心
        this.$store.commit("active", 10);
        this.$router.push({
          path: "/personalInfo",
          query: {
            state: 6
          }
        });
      } else if (key == 5) {
        //修改密码
        this.$emit("cutBtn", false);
        this.dialogVisible = true;
      } else if (key == 6) {
        //常见问题
        this.$store.commit("active", 10);
        this.$router.push({
          path: "/personalInfo",
          query: {
            state: 4
          }
        });
      } else if (key == 7) {
        //退出登录
        this.$store.commit("RegistrationButtonStatus", true);
        this.$emit("cutBtn", false);
        this.sessionData.delete("token");
        this.localData.delete("token");
        this.localData.delete("paperBox");
        this.localData.delete("web");
        this.localData.delete("paperBox");
        this.$store.commit("userState", null);
        this.$store.commit("mobile", "");
        this.$router.push({ path: "/homePage" });
      }
    },
    cutBtn(index, item) {
      window.localStorage.setItem("active", index);
      this.$store.commit("active", index);
      if (index == 0) {
        this.$emit("cutBtn", false);
      } else {
        this.$emit("cutBtn", true);
      }
      this.$router.push({ path: item.path });
    },
    //注册
    registerBtn() {
      this.$emit("cutBtn", true); //拥有底部
      this.$store.commit("RegistrationButtonStatus", true);
    },
    //登录
    loginBtn() {
      this.$emit("cutBtn", true); //拥有底部
      this.$store.commit("RegistrationButtonStatus", false);
    }
  },
  watch: {
    userState(val) {
      this.aa = val;
    }
  }
};
</script>
<style lang="scss" scoped>
.router-link-active {
  border-bottom: 5px solid #c80032;
  color: #c80032 !important;
}
.header-nav {
  border-bottom: 5px solid #c80032;
  color: #c80032 !important;
}
.header {
  height: auto;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  width: 1200px;
  font-size: 22px;
  margin: 0 auto;
  .el-dropdown {
    margin-top: 15px;
    line-height: 32px;
    cursor: pointer;
  }
  .logo {
    float: left;
    cursor: pointer;
    img {
      margin-top: 11px;
      height: 38px;
    }
  }
  .span1 {
    font-size: 16px;
    line-height: 56px;
    margin-left: 16px;
    float: left;
  }
  .nav {
    float: left;
    margin-left: 100px;
    ul li {
      margin: 0 28px;
      padding-left: 15px;
      padding-right: 15px;
      float: left;
      text-align: center;
      line-height: 56px;
      font-size: 14px;
      color: #666666;
      cursor: pointer;
      p {
        height: 100%;
      }
    }
  }
  .register-btn {
    float: right;
    margin-top: 12px;
    border: none;
    border-radius: 5px;
    color: #fff !important;
    width: 52px;
    height: 32px;
    line-height: 32px;
    background: #eb003b;
    cursor: pointer;
    div {
      width: 100%;
      height: 100%;
    }
  }
  .login-btn {
    background-color: #fff;
    border: 1px solid #666666 !important;
    color: #666666 !important;
  }
}
.userinfo {
  width: 170px;
  height: 60px;
  float: right;
  p {
    line-height: 60px;
    color: #666666;
    font-size: 12px;
    padding-right: 20px;
    float: right;
  }
  .el-menu-demo {
    float: left;
    width: 100px;
  }
  img {
    border-radius: 50%;
    border: 1px solid #c80032;
    width: 30px;
    height: 30px;
    // margin-top: 15px;
    float: left;
    margin-right: 10px;
  }
}
.active {
  background: #c80032;
  color: #fff !important;
}

.modal-box {
  width: 323px;
  height: 255px;
  margin: 0 auto;
  .model-forget {
    text-align: center;
    font-size: 14px;
    position: absolute;
    top: 22px;
    left: 45%;
  }
  .modal-submit {
    clear: both;
    margin-top: 12px;
    width: 100%;
    height: 42px;
    color: #fff;
    background: #c80032;
    float: left;
    border: none;
    margin-bottom: 5px;
  }
  .new-password {
    float: left;
    line-height: 36px;
    margin-right: 20px;
    margin-top: 18px;
  }
  .new-passwords {
    float: left;
    line-height: 36px;
    margin-right: 20px;
    margin-top: 18px;
    margin-left: -28px;
  }
  .new-code {
    float: left;
    height: 36px;
    margin-top: 18px;
    border: none;
    border-bottom: 1px solid #d9d9d9;
    width: 260px;
  }

  .title {
    line-height: 26px;
  }
  .tit {
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #c80032;
  }
}
</style>
<style lang='less'>
.header {
  .el-submenu__title {
    font-size: 12px !important;
  }
  .el-submenu__title {
    border: none !important;
    height: 59px !important;
    width: 60px !important;
    padding-left: 0px !important;
  }
  .el-menu-item {
    width: 100px !important;
  }
  .el-menu--horizontal {
    .el-menu--popup-bottom-start .el-menu--popup .el-menu {
      min-width: 0px !important;
    }
  }

  .el-icon--right {
    width: 0;
    height: 2px;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 7px solid #8f8f8f;
  }
  .el-icon-arrow-down:before {
    content: "";
  }
}

.el-dialog__header {
  border-top: 3px solid #c80032;
}
</style>
