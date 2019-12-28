<template>
  <div class="learning-center">
    <!-- <div class="breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/learningCenter' }">学习中心</el-breadcrumb-item>
        <el-breadcrumb-item>测评报告</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
    <report-nav></report-nav>
    <div v-if="dataList.code" class="content">
      <div class="paperBox">
        <div class="NotReview">推荐测评</div>
        <div class="paperBox-center">
          <div style="height:66px;">
            <div class="paperName">{{dataList.productName}}</div>
            <span
              class="assessTime"
              v-if="dataList.assessTime"
            >测评时间:{{dataParse(dataList.assessTime)}}</span>
          </div>
          <div style="clear:both"></div>
          <div>
            <span class="merchandise">{{dataList.subjectName}}</span>
            <span class="merchandise">{{dataList.gradeName}}</span>
            <span class="merchandise">{{dataList.bookTypeName}}</span>
            <span class="grade" v-if="dataList.assessStatus == 0">总分：{{dataList.totalScore}}分</span>
            <span class="grade" v-else>得分/总分：{{dataList.userScore}}/{{dataList.totalScore}}分</span>
            <span
              class="The-measurement-time"
              v-if="dataList.assessStatus == 0"
            >测评限时：{{dataList.standardTime}}分钟</span>
            <span
              class="The-measurement-time"
              v-else
            >测评用时/限时：{{Math.ceil(dataList.userTime / 60)}} / {{dataList.standardTime}}分钟</span>
          </div>
        </div>
        <div class="textPaper-right">
          <div v-if="dataList.liveStatus == 1">
            <p
              style="margin-top:45px;font-size:14px;color:#b6b6b6;float:right;margin-right:20px;"
            >专家咨询时间: {{dataParse(dataList.liveStartTime)}} 请在开始前十五分钟进入教室</p>
          </div>
        </div>
        <div class="btn">
          <!-- <button
            v-if=" dataList.insurance == true && dataList.insuranceStatus == 2 && dataList.insuranceStatus !== 0"
            class="blue"
            @click="PlanDetails(dataList)"
          >提分承保方案</button>
          <button v-else class="grayness">提分承保方案</button>

          <button
              :class="dataList.status ? 'grayness':'blue'"
              v-if="dataList.liveStatus == 3 && dataList.productType != 2"
              @click="playbackOfReadingReport(dataList)"
            >专家咨询回放</button>
            <button
              v-if="dataList.liveStatus == 2 && dataList.productType != 2"
              :class="dataList.status ? 'grayness':'blue'"
              @click="EnterTheInterpretationCourse(dataList)"
            >进入专家咨询</button>
            <button v-if="dataList.liveStatus == 1 && dataList.productType != 2" class="grayness">进入专家咨询</button>
            <button
              v-if="dataList.liveStatus == 0 && dataList.productType != 2"
              @click="purchaseBtn(dataList)"
              :class="dataList.status ? 'grayness':'yellow'"
            >购买专家咨询</button>
          <button
            v-if="dataList.assessStatus == 0 && !dataList.status"
            class="blue"
            @click="StartEvaluation(dataList)"
          >开始测评</button>
          <button
            v-if="dataList.assessStatus == 1"
            class="blue"
            @click="CheckTheReportBtn(dataList)"
          >查看测评报告</button> -->


          <span v-if="dataList.productType != 2">
              <!-- <button v-if='item.vipStatus == 2 ' :class="item.status ? 'grayness':'blue'"  @click='PlanDetails(item)'>提分行动方案</button>
              <button v-if='item.vipStatus == 1'  class="grayness" >提分行动方案</button>-->
              <!-- 保险按钮状态 -->
              <button
                v-if="dataList.insurance== true && dataList.insuranceStatus !== 3 && dataList.insuranceStatus !== 0"
                :class="dataList.insuranceStatus == 1 ? 'yellow' : dataList.insuranceStatus == 2 ? 'blue' : ''"
                @click="buyIns(dataList)"
              >
                {{
                dataList.insuranceStatus == 1 ? '购买提分承保服务' : dataList.insuranceStatus == 2 ? '提分承保方案' : '购买提分承保服务'
                }}
              </button>
              <button
                :class="dataList.vipStatus == 1 ? 'grayness': dataList.vipStatus == 2 ? 'blue' : 'yellow'"
                v-if="!dataList.insurance"
                @click="dataList.vipStatus == 0 ? GetARaiseAction(item) : dataList.vipStatus == 2 ? PlanDetails(dataList) : null"
              >{{dataList.vipStatus == 0 ? '购买提分行动方案' : '提分行动方案'}}</button>
            </span>

            <button
              :class="dataList.status ? 'grayness':'blue'"
              v-if="dataList.liveStatus == 3 && dataList.productType != 2"
              @click="playbackOfReadingReport(dataList)"
            >专家咨询回放</button>
            <button
              v-if="dataList.liveStatus == 2 && dataList.productType != 2"
              :class="dataList.status ? 'grayness':'blue'"
              @click="EnterTheInterpretationCourse(dataList)"
            >进入专家咨询</button>
            <button v-if="dataList.liveStatus == 1 && dataList.productType != 2" class="grayness">进入专家咨询</button>
            <button
              v-if="dataList.liveStatus == 0 && dataList.productType != 2"
              @click="purchaseBtn(dataList)"
              :class="dataList.status ? 'grayness':'yellow'"
            >购买专家咨询</button>
            <button
              v-if="dataList.assessStatus == 1"
              class="blue"
              @click="CheckTheReportBtn(dataList)"
            >查看测评报告</button>
            <button
              v-if="dataList.assessStatus == 0 && !dataList.status"
              class="blue"
              @click="StartEvaluation(dataList)"
            >开始测评</button>
            <!-- <button v-if="item.assessStatus == 0 && !item.status" class="blue" @click='dialogVisible = true'></button> -->
            <button v-if="dataList.status" class="grayness">开始测评</button>
        </div>
      </div>
    </div>
    <div
      v-else
      class="nextTest"
    >{{ !dataList.nexPushTimeStr ? '当前暂无推荐测评' : `下次测评试卷将于${dataList.nexPushTimeStr}推送给您`}}</div>
    <el-dialog
      title="会员购买"
      :visible.sync="centerDialogVisible"
      v-if="centerDialogVisible"
      width="600px"
      center
      class="buyVipSty"
    >
      <buy-Ins v-if="centerDialogVisible" :params="uesrInfo"></buy-Ins>
    </el-dialog>
  </div>
</template>

<script>
import deconstruct from "../../common/deconstruct.vue";
import buyIns from "@/components/common/buyInsurance.vue";
import reportNav from "@/components/page/report/reportNav.vue";
export default {
  components: { deconstruct, buyIns, reportNav },
  data() {
    return {
      uesrInfo: {},
      centerDialogVisible: false,
      dialogVisible: false,
      selectArea: "",
      selectTimeData: [], // 选择省数据
      newWin: "",
      isPaper: false,
      paperCode: "",
      loading: true,
      Year: [], //学年
      subject: [], //学科
      bookTypes: [], //教材版本
      // subjectCode:"",
      active: 10000,
      active1: 10000,
      active2: 10000,
      active3: 1,
      active4: 1,
      from: {
        assessStatus: null, //测评状态
        bookTypeCode: null, //教材版本号
        gradeCode: null, //年级code
        pageNum: 1, //当前第几页
        pageSize: 10, //一页多少条
        subjectCode: null, //学科code
        userCode: localStorage.getItem("token"), //用户Code
        liveProcess: null, //专家咨询状态
        orderType: 6
      },
      provinceId: this.selectArea,
      parentId: window.localStorage.token,
      total: 0, //一共多少条
      dataList: {},
      cheseSub: "" // 文理科
    };
  },
  computed: {
    time() {
      return new Date().getTime();
    }
  },
  mounted() {
    this.$store.commit("active", 3);
  },
  created() {
    this.getInfo();
  },
  methods: {
    //方案详情点击按钮
    // PlanDetails(dataList) {
    //   localStorage.setItem("paperBox", JSON.stringify(dataList));
    //   const { href } = this.$router.resolve({
    //     path: "/report/testReport",
    //     query: {
    //       id: dataList.evaluationRecordId,
    //       productType: dataList.productType
    //     }
    //   });
    // },
    // 专家咨询回放
    playbackOfReadingReport(dataList){
         if (dataList.status) {
        return;
      }
      const { href } = this.$router.resolve({
        path: "/playbackOfReadingReport",
        query: {
          roomId: dataList.roomId,
          paperName: dataList.paperName,
          liveStartTime: dataList.liveStartTime,
          liveTeacherName: dataList.liveTeacherName
        }
      });
      this.newWin = href;
    },
    buyIns(item) {
      // console.log(item)
      localStorage.setItem("paperBox", JSON.stringify(item));
      if (item.insuranceStatus == 1) {
        this.getUserInfo();
        item.insuranceStatus == 1 ? (this.centerDialogVisible = true) : null;
        this.centerDialogVisible = true;
        // console.log(item);
        this.uesrInfo.subjectCode = item.subjectCode;
        this.uesrInfo.gradeCode = item.gradeCode;
        this.uesrInfo.evaluationRecordId = item.evaluationRecordId;
        // console.log(this.uesrInfo);
      } else if (item.insuranceStatus == 2) {
        this.$router.push({
          path: "/report/testReport",
          query: {
            id: item.evaluationRecordId,
            productType: item.productType 
          }
        });
      }
    },
    // 进入专家咨询
    EnterTheInterpretationCourse(dataList){
      var url = "https://testingtest.e-eduspace.com";
      if (location.hostname == "testing.e-eduspace.com") {
        url = "https://testing.e-eduspace.com";
      }
      this.$axios
        .post(this.lantianUrl + "/live/entryRoom", {
          id: dataList.roomId,
          studentName: JSON.parse(localStorage.getItem("web")).mobile
        })
        .then(res => {
          if (res.httpCode == "200") {
            //this.localData.set('liveUrl',res.result)
            // window.open(url + "#/goLive?liveUrl=" + res.result);
            let newer = window.open("_blank");
            newer.location = url + "#/goLive?liveUrl=" + res.result;
          }
        });
    },
    //购买专家咨询
    purchaseBtn(dataList) {
      if (dataList.status) {
        return;
      }
      const { href } = this.$router.resolve({
        path: "/PurchaseOfCourse",
        query: {
          code: dataList.productCode,
          cp: "学习中心"
        }
      });
      //window.open(href, '_blank');
      // var tw=window.open('','_blank');
      //tw.location=href;
      this.newWin = href;
    },
    // 开始测评
    StartEvaluation(dataList) {
      this.localData.set("paperBox", dataList); //用户信息
      this.$router.push({
        path: "/onlineTest",
        query: {
          provinceId: this.provinceId,
          parentId: this.parentId,
          artType: this.cheseSub
        }
      });
    },
    //提分承包方案
    PlanDetails(dataList) {
      localStorage.setItem("paperBox", JSON.stringify(dataList));
      const { href } = this.$router.resolve({
        path: "/report/testReport",
        query: {
          id: dataList.evaluationRecordId,
          productType: dataList.productType
        }
      });
      this.newWin = href;
    },
    //点击查看报告
    CheckTheReportBtn(dataList) {
      this.localData.set("paperBox", dataList);
      const { href } = this.$router.resolve({
        path: "/reportDetail",
        query: {
          code: dataList.evaluationRecordId,
          type: dataList.productType
        }
      });
      this.newWin = href;
    },
    getInfo() {
      const paperBox = JSON.parse(localStorage.getItem("paperBox"));
      let params = {
        userCode: paperBox.userCode,
        gradeCode: paperBox.gradeCode,
        subjectCode: paperBox.subjectCode,
        parentCode: paperBox.code
      };
      this.$axios
        .post(
          this.lantianUrl +
            "/agency/agencyAssessUserProduct/getPushAssessUserProductInfo",
          params
        )
        .then(res => {
          // console.log();
          this.dataList = res.result;
          // console.log(this.dataList);
        });
    }
  },

  watch: {
    newWin(newName, oldName) {
      if (newName != oldName && newName != "")
        // window.open(this.newWin, "_blank");
        var newPage = window.open("_blank");
        newPage.location = this.newWin
      this.$nextTick(function() {
        this.newWin = "";
      });
    }
  }
};
</script>

<style lang='less' scoped>
.learning-center {
  background: #f7f7f7;
  .header-ganged-wrap {
    background: #fff;
    border-bottom: 1px solid #d9d9d9;
    padding-bottom: 50px;
    .header-ganged {
      width: 1200px;
      margin: 0 auto;
      div {
        clear: both;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        p {
          float: left;
          width: 100px;
          color: #8a8a8a;
          padding-top: 26px;
          text-align: right;
          padding-right: 20px;
        }
        span {
          margin-top: 26px;
          float: left;
          width: 61px;
          height: 32px;
          border-radius: 50px;
          text-align: center;
          cursor: pointer;
          color: #7a7a7a;
        }
        ul {
          float: left;
          // width: 1060px;
          li {
            float: left;
            padding-left: 20px;
            padding-right: 20px;
            color: #7a7a7a;
            cursor: pointer;
            margin-top: 26px;
            border-radius: 50px;
            text-align: center;
          }
        }
        .active {
          background: #c80032;
          color: #fff;
        }
      }
    }
  }
  .content {
    margin-top: 48px;
    clear: both;
    min-height: 300px;
    position: relative;
    .paperBox {
      height: 122px;
      border: 1px solid #e6e6e6;
      background-color: #fff;
      width: 1200px;
      margin: 20px auto;
      position: relative;
      .paperBox-left {
        width: 26px;
        height: calc(100% - 24px);
        border: 1px solid #ffa6bc;
        background: #f8f1f3;
        color: #c80032;
        line-height: 22px;
        padding-left: 13px;
        font-size: 12px;
        padding-top: 24px;
        float: left;
      }
      .NotReview {
        width: 40px;
        float: left;
        border: 1px solid #d9d9d9;
        background-color: #f7f8f9;
        background-color: #f7f8f9;
        box-sizing: border-box;
        height: 100%;
        text-align: center;
        line-height: 23px;
        padding: 0 10px;
        padding-top: 10px;
        font-size: 12px;
      }
      .paperBox-center {
        float: left;
        height: 122px;
        padding-left: 42px;
        .paperName {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 300px;
          font-size: 18px;
          padding-top: 34px;
          font-weight: bold;
          color: #333333;
          float: left;
          margin-bottom: 14px;
          cursor: pointer;
          &:hover {
            color: #c80032;
          }
        }
        .assessTime {
          margin-left: 20px;
          padding-top: 39px;
          color: #999999;
          float: left;
          font-size: 12px;
        }
        .merchandise {
          font-size: 12px;
          color: #999999;
          padding-right: 13px;
          float: left;
          display: block;
        }
        .grade {
          display: block;
          padding-left: 25px;
          padding-right: 25px;
          float: left;
          border-left: 1px solid #c2c2c2;
          border-right: 1px solid #c2c2c2;
          color: #c2c2c2;
          margin-left: 15px;
          font-size: 12px;
        }
        .The-measurement-time {
          display: block;
          float: left;
          margin-left: 24px;
          color: #c2c2c2;
          font-size: 12px;
        }
      }
      .textPaper-right {
        float: right;
        margin-top: 43px;
        .textPaper-right-btn {
          clear: both;
          button {
            width: 115px;
            height: 36px;
            border: none;
            float: right;
            border-radius: 5px;
            margin-right: 20px;
            cursor: pointer;
            color: #fff;
          }
        }
      }
    }
    .btn {
      position: absolute;
      right: 25px;
      top: 44px;
      button {
        width: 115px;
        height: 36px;
        border: none;
        float: right;
        border-radius: 5px;
        margin-right: 20px;
        cursor: pointer;
        color: #fff;
        // background-color: #67b6ee;
      }
      button:nth-child(2) {
        background-color: #ff9b19;
      }
      button:nth-child(1) {
        background-color: none;
      }
      button:nth-child(3) {
        background-color: #67b6ee;
      }
    }
  }
  .main-1 {
    width: 1200px;
    height: 400px;
    background: #fff;
    margin: 20px auto;
    color: #666;
    text-align: center;
    padding-top: 100px;
    img {
      display: inline-block;
      text-align: center;
    }
    p {
      display: block;
    }
  }
  .paging {
    margin: 64px auto;
    width: 1200px;
    text-align: center;
  }
}
//按钮颜色
 .blue {
  background-color: #67b6ee !important;
}
.yellow {
  background-color: #ff9b19 !important;
}
 .grayness {
  background: #cdcdcd !important;
  cursor: no-drop ;
}
.secletClase {
  margin-top: 10px;
}
.sujecetInput {
  width: 200px;
  height: 20px;
}
.priceClass {
  font-weight: 700;
  transform: translate(0, 10px);
  font-size: 14px;
  margin-top: 10px;
}
.yaoqing {
  font-weight: 700;
}
</style>

<style lang="scss">
.learning-center {
  .buyVipSty {
    .el-dialog__body {
      padding: 0;
    }
  }
}
.nextTest {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin-top: 80px;
}
</style>


