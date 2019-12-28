<template>
  <div>
    <div class="breadcrumb" v-if="!$route.query.isMgr">
      <el-breadcrumb separator=">" v-if="type">
        <el-breadcrumb-item :to="{ path: '/learningCenter' }">学习中心</el-breadcrumb-item>
        <!-- <el-breadcrumb-item :to="{ path: '/reportDetail', query: {code:code} }">报告详情</el-breadcrumb-item>-->
        <el-breadcrumb-item>我的作答</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="testInfo">
      <div id="testInfo">
        <!--<el-breadcrumb separator=">" v-if="type">
          <el-breadcrumb-item :to="{ path: '/bookList' }">测评列表</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/reportDetail', query: {code:code} }">报告详情</el-breadcrumb-item>
          <el-breadcrumb-item>我的作答</el-breadcrumb-item>
        </el-breadcrumb>-->
        <div v-if="!isHidebtn">
          <div class="toReport" v-if="type==1 && !$route.query.isMgr" @click="toReport">
            <el-button>免费获取测评报告</el-button>
          </div>
          <div class="toReport" v-if="(type==2 && !$route.query.isMgr)" @click="toReport">
            <el-button>获取测评报告</el-button>
          </div>
        </div>
        <div class="gotoreport" v-if="isHidebtn">
          <el-button type="primary" @click="toReport">返 回</el-button>
        </div>
        <div v-for="(item,index) in testInfo" :key="item.bigId">
          <div>
            <h5>{{number[index]}}、{{item.bigTitle}}（共{{item.smallQuestions.length}}题；共{{item.bigScore}}分）</h5>
            <div
              v-for="(val,index2) in item.smallQuestions"
              :key="index2"
              class="smallQuestion"
              v-if="val.type<6"
            >
              <question-info-ans :q="val" :b="index2" :num="val.num" v-if="type"></question-info-ans>
              <question-info :q="val" :b="index2" :num="val.num" papertype="1" v-else></question-info>
            </div>
            <div
              v-for="(val,index2) in item.smallQuestions"
              :key="index2"
              class="smallQuestion"
              v-if="val.type==6"
            >
              <h6>
                {{val.num}}.
                <span v-html="strToUrl(val.stem)"></span>
                <i class="listen" v-if="val.questionAnalyzeType"></i>
              </h6>
              <div v-for=" (i,index3) in addType(val.componentQuestionModels)" :key="index3">
                <question-info-ans :q="i" :b="index2" :c="index3" :num="val.num" v-if="type"></question-info-ans>
                <question-info :q="i" :b="index2" :c="index3" :num="val.num" papertype="1" v-else></question-info>
              </div>
            </div>
            <!--<h5>英语听力（共2题；共6分）<span></span></h5> 听力题-->
          </div>
        </div>
      </div>
    </div>
    <div class="caretTop" :style="{display: caretTop ? 'flex' : 'none'}" @click="goCaretTop">
      <i class="el-icon-caret-top"></i>
    </div>
  </div>
</template>
<script>
import questionInfo from "./questionInfo.vue";
import questionInfoAns from "./questionInfoAns.vue";
export default {
  components: { questionInfoAns, questionInfo },
  data() {
    return {
      number: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"],
      type: this.$route.query.type,
      testInfo: null,
      code: null,
      isMgr: this.$route.query.isMgr == 1 ? true : false,
      isHidebtn: this.$route.query.isHidebtn == 1 ? true : false,
      caretTop: false // 回到顶部按钮状态
    };
  },
  props: ["paperInfo"],
  created() {
    //动态绑定src地址
  },
  mounted() {
    if (this.isHidebtn) {
      // debugger;breadcrumb
      $(".Header").css({ height: "0px", overflow: "hidden" });
      $(".breadcrumb").css({ height: "0px", overflow: "hidden" });
      $(".main").css({ "margin-top": "0px" });
      $(".footer").css({ display: "none" });
    }
    //给页面绑定滑轮滚动事件
    if (document.addEventListener) {
      //firefox
      document
        .querySelector("#scroll")
        .addEventListener("DOMMouseScroll", this.Scroll, false);
    }
    //滚动滑轮触发scrollFunc方法  //ie 谷歌
    window.onmousewheel = document.onmousewheel = this.Scroll;

    this.code = this.$route.query.code;
    if (this.type && this.code) {
      this.$axios({
        method: "post",
        url: "/evaluation/getEvaluationAnswer",
        data: {
          evaluationRecordCode: this.code
        }
      })
        .then(res => {
          if (res.code == "000000") {
            var result = res.bigQuestions || [];
            this.testInfo = result;
            var num = 0;
            this.testInfo.forEach((val, index1) => {
              var small = val.smallQuestions || [];
              small.forEach((val2, index2) => {
                num++;
                this.$set(val2, "num", num);
              });
            });
          } else {
            this.$message({
              type: "info",
              message: "获取试卷详情失败"
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: err.message
          });
        });
    }
    if (this.$route.query.isMgr) {
      $(".Header").css({ height: "0px", overflow: "hidden" });
      $(".main").css({ "margin-top": "0px" });
      $(".footer").css({ display: "none" });
    }
  },
  methods: {
    // 监听页面滚动
    Scroll() {
      // console.log(document.querySelector('#scroll').scrollTop);
      document.querySelector("#scroll").scrollTop > 100
        ? (this.caretTop = true)
        : (this.caretTop = false);
    },
    // 回到顶部
    goCaretTop() {
      document.querySelector("#scroll").scrollTop = 0;
      this.caretTop = false;
    },
    //字符串转换为数组
    strToObj(str) {
      if (!str) {
        return [];
      }
      return JSON.parse(str);
    },
    //增加复合题题型参数
    addType(val) {
      val.forEach(item => {
        this.$set(item, "smallType", item.componentType);
      });
      return val;
    },
    toReport() {
      var query = this.$route.query;
      this.$router.push({
        path: "/reportDetail",
        query: {
          reportId: query.reportId || null,
          code: query.code || null,
          isHidebtn: this.isHidebtn ? 1 : 0,
        }
      });
    }
  },

  watch: {
    paperInfo(val) {
      if (val) {
        this.testInfo = this.paperInfo;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  height: 48px;
  line-height: 48px;
}
</style>
<style lang="less">
.testInfo{
  width: 100%;
  background-color: #fff;
}
.caretTop {
  position: fixed;
  background-color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #409eff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  z-index: 5;
  right: 30px;
  top: 50%;
}
#testInfo {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  color: #333;
  font-size: 14px;
  font-family: Arial;
  padding-bottom: 60px;
  h5 {
    font-size: 16px;
    line-height: 38px;
    width: auto;
    margin-bottom: 16px;
    span {
      display: inline-block;
      vertical-align: middle;
      width: 22px;
      height: 18px;
      background: url("/static/img/bookCollege/onlineIcon.png") 0 -25px no-repeat;
    }
  }
  .smallQuestion {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #d9d9d9;
    h6 {
      font-weight: normal;
      line-height: 26px;
      margin-bottom: 16px;
      font-size: 14px;
    }
    span {
      min-width: 25%;
      max-width: 100%;
      // word-break: break-all;
      word-wrap: break-word;
      /*display: inline-block;*/
      line-height: 22px;
      margin-bottom: 10px;
      i {
        font-style: normal;
      }
    }
    .listen {
      display: inline-block;
      margin-left: 10px;
      width: 22px;
      line-height: 26px;
      vertical-align: middle;
      height: 18px;
      background: url("../../../../static/img/bookCollege/onlineIcon.png") 0 -25px
        no-repeat;
    }
  }
  .smallQuestion:last-child {
    border-bottom: inherit;
  }
  .gotoreport {
    position: fixed;
    top: 50px;
    right: 60px;
  }
  .toReport {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    height: auto;
    overflow: hidden;
    position: absolute;
    top: 109px;
    left: 0;
    right: 0;
    padding-right: 60px;
    .el-button {
      background-color: #c80032;
      color: #fff;
      border: 1px solid #c80032;
      float: right;
      position: relative;
      z-index: 99;
    }
  }
}
</style>

