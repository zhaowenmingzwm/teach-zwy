<template>
  <div id="onlineTestBox">
    <!-- <div class="breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/learningCenter' }">学习中心</el-breadcrumb-item>
        <el-breadcrumb-item>{{paperInfo.paperName}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
    <div class="paperFather">
    <div class="paper" :class="{'testBox':toAnser}">
      <div class="testCon">
        <div class="testTop">
          <div class="timeLine">
            <span>
              考试时间：
              <b>{{minute}}分{{second}}秒</b>
            </span>
            <i v-if="!toAnser">
              总分：
              <b>{{paperInfo.totalScore}}分</b>
            </i>
          </div>
          <h3>{{`试卷预览：【${paperInfo.paperName}】`}}</h3>
          <!-- <el-popover
            placement="bottom"
            width="225"
            trigger="click"
            v-model="anserCard"
            v-if="toAnser"
          >

            <el-button
              type="primary"
              slot="reference"
              class="cardBtn"
            >答题卡({{checkTopicNumber}}/{{totalTopic}})</el-button>
          </el-popover> -->
          <div class="testTop_card" v-if="toAnser" @click="testTopCardShow = !testTopCardShow">
            <span>答题卡({{checkTopicNumber}}/{{totalTopic}})</span>
            <div class="onlinePopBox" v-if="testTopCardShow">
              <div v-for="(item,index) in testInfo" :key="index">
                <p>{{number[index]}}、{{item.bigTitle}}({{item.anserNum}}/{{item.smallQuestions.length}})</p>
                <span
                  v-for="(val,index2) in item.smallQuestions"
                  :key="index2"
                  @click="checkTopic(index2,index)"
                  :class="{'active':val.isShow,'asered':val.isAsered,'noAnser':val.isNo}"
                >{{val.num}}</span>
              </div>
            </div>

          </div>
        </div>
        <div v-if="!toAnser" class="testC">
          <test-question :paper-info="testInfo" style="padding: 0 35px; box-sizing: border-box;"></test-question>
          <div class="mask"></div>
          <el-button
            type="primary"
            :class="butStart ? 'anserBtn' : 'anserBtnStart'"
            :style="{right: butStart ? '30px' : ((widtStart - 1200)/2 + 30) + 'px' }"
            @click="toStart()"
          >开始作答</el-button>
        </div>
        <div v-if="toAnser">
          <div class="topicBox">
            <el-row>
              <el-col :span="24">
                <div v-for="(item,index) in testInfo" :key="item.bigId" v-if="item.isShow">
                  <div>
                    <h5>{{number[index]}}、{{item.bigTitle}}（共{{item.smallQuestions.length}}题；共{{item.bigScore}}分）</h5>
                    <div
                      v-for="(val,index2) in item.smallQuestions"
                      :key="index2"
                      class="smallQuestion"
                      v-if="val.isShow && item.bigType<6"
                      :style="{'height': topicHeiht}"
                    >
                      <question-info
                        :q="val"
                        :a="index"
                        :b="index2"
                        papertype="2"
                        :num="val.num"
                        @changeques="changeQues"
                        style="padding: 0 35px; box-sizing: border-box"
                      ></question-info>
                      <div class="onlineBottom">
                        <span class="onlineBottom_tips">退出全屏将终止答题，并清空已答题目，返回学习中心，请慎重操作退出全屏！</span>
                        <el-button
                          type="primary"
                          class="cardBtn"
                          @click="preTopic(item,val,index2,index)"
                          v-if="!(index==0 && index2==0)"
                        >上一题</el-button>
                        <el-button
                          type="primary"
                          class="cardBtn"
                          @click="nextTopic(item,val,index2,index)"
                          v-if="!(index==(testInfo.length-1)&& index2==(item.smallQuestions.length-1))"
                        >下一题</el-button>
                        <el-button
                          type="primary"
                          class="cardBtn cardBtn_submit"
                          @click="btnGo(item,val,index2,index) "
                          :disabled="isDis"
                          v-if="index==(testInfo.length-1)&& index2==(item.smallQuestions.length-1)"
                        >提交</el-button>
                      </div>
                    </div>
                    <div
                      v-for="(val,index2) in item.smallQuestions"
                      :key="index2"
                      class="smallQuestion"
                      v-if="val.isShow && item.bigType==6"
                    >
                      <!----------听力复合题------------->
                      <div v-if="val.questionAnalyzeType " class="listenBox">
                        <!--v-if="val.questionAnalyzeType"-->
                        <span class="listen"></span>
                        <h6>
                          {{val.num}}.
                          <span v-html="strToUrl(val.stem)"></span>
                        </h6>
                        <div v-for=" (i,index3) in val.componentQuestionModels" :key="index3">
                          <question-info
                            :q="i"
                            :a="index"
                            :b="index2"
                            :c="index3"
                            papertype="2"
                            @changeques="changeQues"
                          ></question-info>
                        </div>
                      </div>
                      <!---------------普通复合题-------------------->
                      <div class="moreTopic" v-else>
                        <el-row>
                          <el-col :span="14" :style="{'height': fullHeight}">
                            <h6>
                              {{val.num}}.
                              <span v-html="strToUrl(val.stem)"></span>
                            </h6>
                          </el-col>
                          <el-col :span="10" class="rightC" :style="{'height': fullHeight}">
                            <el-button class="rightBtn" @click="checkMeBtn(val)" v-if="!isMore">点我作答</el-button>
                            <div
                              v-for=" (i,index3) in val.componentQuestionModels"
                              :key="index3"
                              v-if="isMore"
                            >
                              <question-info
                                :q="i"
                                :a="index"
                                :b="index2"
                                :c="index3"
                                papertype="2"
                                @changeques="changeQues"
                              ></question-info>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="onlineBottom">
                        
                        <span class="onlineBottom_tips">退出全屏将终止答题，并清空已答题目，返回学习中心，请慎重操作退出全屏！</span>
                        <el-button
                          type="primary"
                          class="cardBtn"
                          @click="preTopic(item,val,index2,index)"
                          v-if="!(index==0 && index2==0)"
                        >上一题</el-button>
                        <el-button
                          type="primary"
                          class="cardBtn"
                          @click="nextTopic(item,val,index2,index)"
                          v-if="!(index==(testInfo.length-1) && index2==item.smallQuestions.length-1)"
                        >下一题</el-button>
                        <el-button
                          type="primary"
                          class="cardBtn"
                          @click="btnGo(item,val,index2,index)"
                          v-if="index==(testInfo.length-1)&& index2==(item.smallQuestions.length-1)"
                        >提交</el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <!-- 提交确认框 -->
      <el-dialog
        title="提示"
        :visible.sync="submitShow"
        width="30%">
        <span>你还有题目未作答,确认要交卷</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="submitShow = false">取 消</el-button>
          <el-button type="primary" @click="handlerSubmitShow">提 交</el-button>
        </span>
      </el-dialog>
    </div>
    </div>
    <!--弹窗-->
    <el-dialog
      :visible.sync="inputDialog"
      width="40%"
      class="pushCode"
      :close-on-click-modal="!isTime"
      :show-close="!isTime"
    >
      <h3 v-if="isTime">考试时间到,系统将为您自动提交试卷!</h3>
      <p>共{{totalTopic}}题，已作答{{checkTopicNumber}}题</p>
      <p style="margin-bottom: 10px">为更好的提供后续服务，请在下方输入您的手机号码：</p>
      <el-row class="el-rowIndex">
        <el-col :span="5">
          <span class="span-label">
            1、您孩子的姓名
            <span>*</span>
          </span>
        </el-col>
        <el-col :span="19">
          <el-input v-model="form.childName"></el-input>
        </el-col>
      </el-row>
      <el-row class="el-rowIndex">
        <el-col :span="5">
          <span class="span-label">
            2、您孩子的性别
            <span>*</span>
          </span>
        </el-col>
        <el-col :span="19" style="line-height:40px;">
          <el-radio v-model="form.sex" label="1">男</el-radio>
          <el-radio v-model="form.sex" label="0">女</el-radio>
        </el-col>
      </el-row>

      <el-row class="el-rowIndex">
        <el-col :span="5">
          <span class="span-label">
            3、您孩子的年级
            <span>*</span>
          </span>
        </el-col>
        <el-col :span="19" style="line-height:40px;">
          <el-select v-model="form.childGrade" placeholder="请选择">
            <el-option
              v-for="item in gradeList"
              :key="item.gradeCode"
              :label="item.gradeName"
              :value="item.gradeCode"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="el-rowIndex">
        <el-col :span="5">
          <span class="span-label">
            4、是否为独生子女
            <span>*</span>
          </span>
        </el-col>
        <el-col :span="19" style="line-height:40px;">
          <el-radio v-model="form.isOne" label="1">是</el-radio>
          <el-radio v-model="form.isOne" label="0">否</el-radio>
        </el-col>
      </el-row>
      <el-row class="el-rowIndex">
        <el-col :span="5">
          <span class="span-label">
            5、您是孩子的
            <span>*</span>
          </span>
        </el-col>
        <el-col :span="19" style="line-height:40px;">
          <el-radio v-model="form.childType" label="1">父亲</el-radio>
          <el-radio v-model="form.childType" label="0">母亲</el-radio>
          <el-radio v-model="form.childType" label="2">其他监护人</el-radio>
        </el-col>
      </el-row>
      <el-row class="el-rowIndex">
        <el-col :span="5">
          <span class="span-label">
            6、您的手机号码
            <span>*</span>
          </span>
        </el-col>
        <el-col :span="19">
          <el-input v-model="form.mobile"></el-input>
        </el-col>
      </el-row>
      <el-row class="el-rowIndex">
        <el-col :span="5">
          <span class="span-label" style="opacity:0">
            6、您的手机号码
            <span>*</span>
          </span>
        </el-col>
        <el-col :span="12">
          <el-input v-model="form.smsCode"></el-input>
        </el-col>
        <el-col :span="7">
          <el-button type="primary" style="float:right;" @click="sendMessage">{{word}}</el-button>
        </el-col>
      </el-row>
      <!--<el-form ref="form" :model="form" label-width="80px">-->
      <!--<el-form-item label="手机号：" style="width:90%">-->
      <!--<el-input v-model="form.mobile"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="验证码：" style="width:90%">-->
      <!--<el-input v-model="form.smsCode" style="width: 60%;"></el-input>-->
      <!--<el-button type="primary" style="float:right;" @click="sendMessage">{{word}}</el-button>-->
      <!--</el-form-item>-->
      <!--</el-form>-->
      <span slot="footer" class="dialog-footer">
        <!--<el-button type="info" @click="inputDialog = false" v-if="!isTime">取 消</el-button>-->
        <el-button type="primary" @click="smsBtn()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import testQuestion from "./testInfo.vue";
import questionInfo from "./questionInfo.vue";
import audio from "../../../util/audioPlay";
var aud;
var time;
export default {
  components: { testQuestion, questionInfo },
  beforeDestroy() {
    window.clearInterval(this.time); //离开前清除定时器
  },
  data() {
    return {
      isDis: false,
      toAnser: false,
      totalTime: null, //倒计时的总时间
      testTopCardShow: false, // 答题卡是否展示
      submitShow: false, // 提交确认框
      minutes: 0, // 分钟数量
      seconds: 0, // 秒数数量
      number: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"],
      anserCard: false,
      fullHeight: "",
      topicHeiht: "",
      timer: false,
      testInfo: null,
      paperInfo: {},
      totalTopic: 0, //总题数
      checkTopicNumber: 0, //答题数
      isMore: false, //复合题小题是否展示
      lookTime: null, //预览题目的时间
      aTime: null, //开始时间
      bTime: null, //刚进入页面的时间
      cTime: null, //结束时间
      isPlay: false,
      paper: null,
      inputDialog: false,
      word: "获取验证码",
      isOvertime: false,
      form: {
        childName: "",
        sex: "",
        childGrade: "",
        isOne: "",
        childType: "",
        mobile: "",
        smsCode: ""
      },
      gradeList: [], //年级列表
      isTime: false,
      butStart: false, // 开始作答按钮位置
      widtStart: 0, // 页面宽度
      useInfo: JSON.parse(localStorage.getItem('paperBox')),
      off: false,
      requestMethod: false, // 是否全屏
      submitParam: {
        item: '',
        val: '',
        userPostData: ''
      }, // 提交时的信息
      fullscreenOff: false, // 提价试卷设置为true
    };
  },
  mounted() {
    //给页面绑定滑轮滚动事件
    if (document.addEventListener) {
      //firefox
      document
        .querySelector("#scroll")
        .addEventListener("DOMMouseScroll", this.Scroll, false);
    }
    const _this = this;
    // 监听进入全屏或退出全屏事件
    document.addEventListener("fullscreenchange", this.esc)
    document.addEventListener("mozfullscreenchange", this.esc)
    document.addEventListener("webkitfullscreenchange", this.esc)
    document.addEventListener("msfullscreenchange", this.esc)
    //滚动滑轮触发scrollFunc方法  //ie 谷歌
    window.onmousewheel = document.onmousewheel = this.Scroll;

    this.paper = this.localData.get("paperBox");
    //console.log(this.paper,"1111")
    this.getTestInfo();
    this.getGradeList();
    // this.sToTime(this.totalTime)
    const that = this;
    that.aTime = this.getTime();
    that.bTime = this.getTime();
    var h = document.documentElement.clientHeight || document.body.clientHeight;
    this.widtStart =
      document.documentElement.clientWidth || document.body.clientWidth;
    that.fullHeight = h - 360 + "px";
    that.topicHeiht = h - 280 + "px";
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        that.fullHeight = window.fullHeight - 360 + "px";
        that.topicHeiht = window.fullHeight - 280 + "px";
      })();
    };
    window.onbeforeunload = function(e) {
      e = e || window.event;

      // 兼容IE8和Firefox 4之前的版本
      if (e) {
        e.returnValue = "关闭提示";
      }

      // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
      return "关闭提示";
    };
    // that.$refs.player.src = '/static/1.mp3';
  },
  methods: {
    // esc退出全屏
    esc() {
      const _this = this;
      _this.requestMethod ? _this.requestMethod = false : _this.requestMethod = true
      if (!_this.requestMethod && !_this.fullscreenOff) {
        _this.$router.push({ path: "/learningCenter" });
      }
    },
    // 滚动页面
    Scroll() {
      const Top = document.querySelector(".footer").offsetTop;
      let scrollTop = document.querySelector("#scroll").scrollTop;
      let h =
        document.documentElement.clientHeight || document.body.clientHeight;
      Top - (scrollTop + 120 + 58) < h
        ? (this.butStart = true)
        : (this.butStart = false);
    },
    /*获取学年列表*/
    getGradeList() {
      var $this = this;
      this.$axios
        .post(this.staticURL + "jeecg/rest/support/grade/getGrades", {})
        .then(res => {
          $this.gradeList = res.result || [];
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "获取学年列表失败"
          });
        });
    },
    //发送验证码
    sendMessage() {
      if (this.isOvertime) {
        return false;
      }
      let that = this,
        time = 60;
      var reg = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/; //手机号正则验证
      var phoneNum = this.form.mobile;
      if (!phoneNum) {
        //未输入手机号
        this.$message({
          message: "请输入手机号码",
          type: "warning"
        });
        return;
      }
      if (!reg.test(phoneNum)) {
        //手机号不合法
        this.$message({
          message: "您输入的手机号码不合法，请重新输入",
          type: "warning"
        });
        return;
      }
      var data = {
        mobile: this.form.mobile
      };
      this.$axios({
        method: "post",
        url: "/sms/evaluationSMS",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(data)
      })
        .then(res => {
          if (res.code == "000000") {
            //成功
          } else {
            self.$message({
              type: "error",
              message: res.message
            });
          }
          console.log(res);
        })
        .catch(function(res) {
          self.$message({
            type: "error",
            message: res.message
          });
        });
      var sendTimer = setInterval(function() {
        that.isOvertime = true;
        time--;
        that.word = "已发送" + time;
        if (time < 0) {
          that.isOvertime = false;
          clearInterval(sendTimer);
          that.word = "重新发送";
        }
      }, 1000);
    },
    //获取路由信息
    getUrlKey: function(name) {
      return (
        decodeURIComponent(
          (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|/|#|;|$)").exec(
            location.href
          ) || [, ""])[1].replace(/\+/g, "%20")
        ) || null
      );
    },
    //获取试题信息
    getTestInfo() {
      var self = this;
      var obj = {
        paperId: self.paper.paperCode //'c9883b33f22611e8889bf44d304501c9'//'b6f1792ff22a11e8889bf44d304501c9',
      };
      this.$axios({
        method: "post",
        url: self.staticURL + "assessment/paper/getPaper",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(obj)
      })
        .then(res => {
          if (res.code == "000000") {
            //成功
            self.paperInfo = res;
            self.testInfo = self.paperInfo.bigQuestions || [];
            //console.log(JSON.stringify(self.testInfo));
            var num = 0;
            self.testInfo.forEach((val, index1) => {
              self.$set(val, "anserNum", 0);
              var small = val.smallQuestions || [];
              small.forEach((val2, index2) => {
                num++;
                self.$set(val2, "num", num);
              });
            });
            // console.log(JSON.stringify(self.testInfo));
            self.minutes = self.paperInfo.standardTime; //总时间
            self.countDown(self.minutes);
          } else {
            self.$message({
              type: "error",
              message: res.message
            });
          }
        })
        .catch(function(error) {
          self.$message({
            type: "error",
            message: "服务器出错"
          });
        });
    },
    //num
    num: function(n) {
      return n < 10 ? "0" + n : "" + n;
    },
    //倒计时
    countDown() {
      var _this = this;
      _this.time = window.setInterval(function() {
        if (_this.seconds === 0 && _this.minutes !== 0) {
          _this.seconds = 59;
          _this.minutes -= 1;
        } else if (_this.minutes === 0 && _this.seconds === 0) {
          _this.seconds = 0;
          window.clearInterval(_this.time);
          // val.time = val.time + (self.getTime() - self.aTime);
          //_this.inputDialog=true;
          _this.isTime = true;
          _this.$alert("考试时间到,系统将为您自动提交试卷!", "提示", {
            confirmButtonText: "确定",
            callback: action => {
              _this.cTime = null;
              _this.cTime = Math.round((_this.getTime() - _this.bTime) / 1000);
              var userPostData = _this.localData.get("web").userId || null;
              _this.subBtn(userPostData);
            }
          });
        } else {
          _this.seconds -= 1;
        }
      }, 1000);
    },
    //时间分钟
    timestampToTime(val) {
      var date = new Date(val); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds();
      if (h) {
        h = (h < 10 ? "0" + h : h) + "时";
      }
      if (m) {
        m = (m < 10 ? "0" + m : m) + "分";
      }
      if (s) {
        s = (s < 10 ? "0" + s : s) + "秒";
      }
      return h + m + s;
    },
    //秒数转换为时间
    sToTime(val) {
      var time = val;
      var h = Math.floor(time / (60 * 60));
      var m = Math.floor((time % (60 * 60)) / 60);
      var s = Math.floor((time % (60 * 60)) % 60);
      if (h) {
        h = (h < 10 ? "0" + h : h) + "时";
      } else {
        h = "";
      }
      m = (m < 10 ? "0" + m : m) + "分";
      s = (s < 10 ? "0" + s : s) + "秒";
      return h + m + s;
    },
    // 判断是否作答过
    haveReport() {
      const obj = {
          code: this.useInfo.code,
      }
      this.$axios
        .post(this.lantianUrl + "/agency/agencyAssessUserProduct/getAssessUserProductInfo",obj)
        .then((res) => {
          res.result.assessStatus == 1 ? this.off = true :　this.off = false;
        })
    },
    //开始作答按钮
    toStart() {

      const obj = {
          code: this.useInfo.code,
      }
      this.$axios
        .post(this.lantianUrl + "/agency/agencyAssessUserProduct/getAssessUserProductInfo",obj)
        .then((res) => {
          res.result.assessStatus == 1 ? this.off = true :　this.off = false;
          if (res.result.assessStatus == 1) {
            this.$message.error('该试卷已作答，不可重复提交', 3000);
            this.$router.push({ path: "/learningCenter" });
            localStorage.setItem("active", 1);
            this.$store.commit("active", 1);
            return;
          }
          this.fullScreen();
          
        // this.answer();
        })

    },
    // 进入作答页面
    answer() {
      
      var that = this;
      that.lookTime = Math.round(this.getTime() / 1000 - that.aTime / 1000);
      // 
      that.aTime = this.getTime();
      that.toAnser = !that.toAnser;
      var total = 0;
      that.testInfo.forEach((item, index) => {
        if (!item.smallQuestions) {
          return [];
        }
        total = total + item.smallQuestions.length;
        item.smallQuestions.forEach((val, index2) => {
          that.$set(val, "time", 0);
          if (val.questionType == 6) {
            val.componentQuestionModels.forEach(i => {
              that.$set(i, "time", 0);
            });
          }
        });
        if (index == 0) {
          that.$set(item, "isShow", true);
          if (item.smallQuestions.length > 0) {
            item.smallQuestions.forEach((val, index2) => {
              if (index2 == 0) {
                that.$set(val, "isShow", true);
                that.getAudio(val);
                console.log("11111adasd");
              } else {
                that.$set(val, "isShow", false);
              }
            });
          }
        } else {
          that.$set(item, "isShow", false);
        }
      });
      that.totalTopic = total;
    },
    // 作答全屏
    fullScreen() {
      this.$confirm('开始答题后将不能退出答题操作，如退出答题，本次已答题将被清空，请确认是否继续?', '提示', {
        confirmButtonText: '继续作答',
        cancelButtonText: '取消作答',
        type: 'warning'
      })
      .then(() => {
        var elem = document.querySelector('.paper')
        let requestMethod =
            elem.requestFullScreen ||
            elem.webkitRequestFullScreen ||
            elem.mozRequestFullScreen ||
            elem.msRequestFullScreen
        if (requestMethod) {
         requestMethod.call(elem)
        } else if (typeof window.ActiveXObject !== 'undefined') {
          var wscript = new ActiveXObject('WScript.Shell')
          if (wscript !== null) {
            wscript.SendKeys('{F11}')
          }
        }
        this.answer();
      })
      
    },
    // 退出全屏
    exitFullscreen() { 
      if(document.exitFullscreen) { 
        document.exitFullscreen(); 
      } else if(document.mozExitFullScreen) { 
        document.mozExitFullScreen(); 
      } else if(document.webkitExitFullscreen) { 
        document.webkitExitFullscreen(); 
      } 
    },
    //字符串转换为数组
    strToObj(str) {
      if (!str) {
        return [];
      }
      return JSON.parse(str);
    },
    //算总题目数
    //下一题
    nextTopic(item, val, a, b) {
      //a 小题索引 b 大题索引
      var self = this;
      val.time = val.time + (self.getTime() - self.aTime);
      self.aTime = self.getTime();
      self.iconBtn(val, item);
      if (val.smallType < 6) {
        if (!val.userAnswer) {
          self.$set(val, "isNo", true);
        }
      }
      if (val.aud) {
        val.aud.pause();
      }
      if (a == item.smallQuestions.length - 1) {
        //当前大题的最后一小题
        b++;
        self.testInfo.forEach((cur, index) => {
          if (index == b) {
            self.$set(cur, "isShow", true);
            cur.smallQuestions.forEach((cur2, index) => {
              if (index == 0) {
                self.$set(cur2, "isShow", true);
                self.getAudio(cur2);
                // if(cur2.isShow)
              } else {
                self.$set(cur2, "isShow", false);
              }
            });
            return;
          } else {
            self.$set(cur, "isShow", false);
            cur.smallQuestions.forEach((cur2, index) => {
              self.$set(cur2, "isShow", false);
            });
          }
        });
      } else {
        a++;
        item.smallQuestions.forEach((cur2, index) => {
          if (index == a) {
            self.getAudio(cur2);
            self.$set(cur2, "isShow", true);
          } else {
            self.$set(cur2, "isShow", false);
          }
        });
      }
    },
    //上一题
    preTopic(item, val, a, b) {
      //a 小题索引 b 大题索引
      var self = this;
      val.time = val.time + (self.getTime() - self.aTime);
      self.aTime = self.getTime();
      self.iconBtn(val, item);
      if (val.aud) {
        val.aud.pause();
      }
      if (a == 0) {
        //当前大题的第一道一小题
        b--;
        self.testInfo.forEach((cur, index) => {
          if (index == b) {
            self.$set(cur, "isShow", true); //上一题大题显示
            cur.smallQuestions.forEach((cur2, index) => {
              if (index == cur.smallQuestions.length - 1) {
                self.$set(cur2, "isShow", true);
                self.getAudio(cur2);
              } else {
                self.$set(cur2, "isShow", false);
              }
            });
          } else {
            self.$set(cur, "isShow", false);
            cur.smallQuestions.forEach((cur2, index) => {
              self.$set(cur2, "isShow", false);
            });
          }
        });
      } else {
        a--;
        item.smallQuestions.forEach((cur2, index) => {
          if (index == a) {
            self.$set(cur2, "isShow", true);
            self.getAudio(cur2);
          } else {
            self.$set(cur2, "isShow", false);
          }
        });
      }
    },
    //图标显示
    iconBtn(val, item) {
      var self = this;
      if (val.smallType == 4) {
        var isA = false;
        if (val.userAnswer.length > 0) {
          val.userAnswer.forEach(i => {
            if (i != "") {
              isA = true;
            }
            /*if (i.answerValue.length>0) {
                isA = true;
              }*/
          });
        }
        if (isA) {
          if (val.isAsered) {
            return;
          } else {
            val.isAsered = true;
            item.anserNum++;
            self.checkTopicNumber++;
          }
        } else {
          if (val.isAsered) {
            item.anserNum--;
            self.checkTopicNumber--;
          }
          val.isAsered = false;
          val.isNo = true;
        }
      } else {
        var flag = false;
        if (val.smallType == 6) {
          if (val.componentQuestionModels.length > 0) {
            val.componentQuestionModels.forEach(val2 => {
              if (val2.userAnswer) {
                flag = true;
              }
            });
          }
        } else {
          if (val.userAnswer) {
            flag = true;
          }
        }
        if (flag) {
          console.log(val.userAnswer);
          if (val.isAsered) {
            return;
          } else {
            val.isAsered = true;
            item.anserNum++;
            self.checkTopicNumber++;
          }
        } else {
          if (val.isAsered) {
            item.anserNum--;
            self.checkTopicNumber--;
          }
          val.isAsered = false;
          val.isNo = true;
        }
      }
    },
    //答题卡上指定题目
    checkTopic(a, b) {
      //a 小题索引 b 大题索引
      var self = this;
      self.testInfo.forEach((cur, index) => {
        cur.smallQuestions.forEach((cur2, index) => {
          if (cur2.isShow) {
            cur2.time = cur2.time + (self.getTime() - self.aTime);
            self.aTime = self.getTime();
            self.iconBtn(cur2, cur);
          }
          self.$set(cur2, "isShow", false);
          if (cur2.aud) {
            cur2.aud.pause();
          }
        });
        if (index == b) {
          self.$set(cur, "isShow", true);
          cur.smallQuestions.forEach((cur2, index2) => {
            if (index2 == a) {
              self.$set(cur2, "isShow", true);
              self.getAudio(cur2);
              self.$set(cur2, "isNo", true);
            } else {
              self.$set(cur2, "isShow", false);
            }
          });
        } else {
          self.$set(cur, "isShow", false);
          cur.smallQuestions.forEach((cur2, index2) => {
            self.$set(cur2, "isShow", false);
          });
        }
      });
    },
    //题目作答信息返回过来
    changeQues(a, b, c) {
      //a大题索引
      console.log(a, b, c);
      var self = this;
      self.testInfo.forEach((val, index) => {
        if (index == a) {
          val.smallQuestions.forEach((val2, index2) => {
            if (index2 == b) {
              if (c != undefined) {
                //复合题
                val2.componentQuestionModels.forEach((i, index3) => {
                  if (index3 == c) {
                    val.time = val.time + (self.getTime() - self.aTime);
                    self.aTime = self.getTime();
                  }
                });
              }
            }
          });
        }
      });
    },
    //点我作答
    checkMeBtn(val) {
      var self = this;
      val.time = val.time + (self.getTime() - self.aTime); //获取题干的作答时间
      self.aTime = self.getTime();
      self.isMore = true;
    },
    toType(val) {
      if (typeof val == "string") {
        return val;
      } else if (typeof val == "undefined") {
        return "";
      } else {
        return JSON.stringify(val);
      }
    },
    //提交
    btnGo(item, val, a, b) {
      this.haveReport()
      if (this.off) {
        this.$message.error('改试卷已经做完提交');
        return;
      }
      
      const obj = {
          code: this.useInfo.code,
      }
      this.$axios
        .post(this.lantianUrl + "/agency/agencyAssessUserProduct/getAssessUserProductInfo",obj)
        .then((res) => {
          if (res.result.assessStatus == 1) {
            this.$message.error('该试卷已作答，不可重复提交', 3000);
            this.$router.push({ path: "/learningCenter" });
            localStorage.setItem("active", 1);
            this.$store.commit("active", 1);
            return;
          }

          var self = this;
          if (val.aud) {
            val.aud.pause();
          }
          var userPostData = this.localData.get("web").userId || null;
          var isA = false;
          this.testInfo.forEach(val => {
            val.smallQuestions.forEach(val2 => {
              if (val2.smallType < 6) {
                if (!this.toType(val2.userAnswer)) {
                  isA = true;
                }
              }
              if (val2.smallType == 6) {
                val2.componentQuestionModels.forEach(val3 => {
                  if (!this.toType(val3.userAnswer)) {
                    isA = true;
                  }
                });
              }
            });
          });
          if (isA) {
            this.submitShow = true;
            this.submitParam.val = val;
            this.submitParam.item = val;
            this.submitParam.userPostData = userPostData;
          } else {
            window.clearInterval(self.time);
            self.isDis = true;
            this.cTime = null;
            this.cTime = Math.round((this.getTime() - this.bTime) / 1000);
            // this.inputDialog = true;
            this.iconBtn(val, item);
            self.subBtn(userPostData);
          }
        })
      
    },
    // 点击提交试卷确认提示框，确认提交试卷
    handlerSubmitShow() {
      this.fullscreenOff = true;
      document.removeEventListener("fullscreenchange", this.esc)
      document.removeEventListener("mozfullscreenchange", this.esc)
      document.removeEventListener("webkitfullscreenchange", this.esc)
      document.removeEventListener("msfullscreenchange", this.esc)
      this.exitFullscreen();
      
      const self = this;
      self.submitShow = false;
      window.clearInterval(self.time);
      self.submitParam.val.time = self.submitParam.val.time + (self.getTime() - self.aTime);
      self.aTime = self.getTime();
      self.cTime = null;
      (self.cTime = Math.round((self.getTime() - self.bTime) / 1000)),
      self.iconBtn(self.submitParam.val, self.submitParam.item);
      self.subBtn(self.submitParam.userPostData);
    },
    //通过验证码获取用户id
    smsBtn() {
      var self = this;

      if (!self.form.childName) {
        this.$message({
          message: "请填写孩子的姓名",
          type: "warning"
        });
        return;
      }
      if (!self.form.sex) {
        this.$message({
          message: "请选择孩子的性别",
          type: "warning"
        });
        return;
      }
      if (!self.form.childGrade) {
        this.$message({
          message: "请选择孩子的年级",
          type: "warning"
        });
        return;
      }
      if (!self.form.isOne) {
        this.$message({
          message: "请选择是否独生子女",
          type: "warning"
        });
        return;
      }
      if (!self.form.childType) {
        this.$message({
          message: "请选择您是谁",
          type: "warning"
        });
        return;
      }
      if (!self.form.mobile || !self.form.smsCode) {
        this.$message({
          message: "请输入的手机号及验证码",
          type: "warning"
        });
        return;
      }
      this.$axios({
        method: "post",
        url: "/sms/checkSMSCode",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(this.form)
      })
        .then(res => {
          if (res.code == "000000") {
            //成功

            var userId = res.userId;
            var inviteCode = self.getUrlKey("inviteCode");
            if (inviteCode) {
              self.sendAgent(inviteCode);
            }
            self.subBtn(userId);
          } else {
            self.$message({
              type: "error",
              message: res.message
            });
          }
        })
        .catch(function(res) {
          self.$message({
            type: "error",
            message: res.message
          });
        });
    },
    /*提交弹框信息*/
    postStudent: function(userId, reportCode, evaluationRecordCode) {
      var $this = this;
      var obj = {
        realname: $this.form.childName,
        sex: $this.form.sex,
        gradeCode: $this.form.childGrade,
        isSingle: $this.form.isOne,
        parentMobile: $this.form.mobile,
        userId: userId || null,
        inviteCode: $this.getUrlKey("inviteCode"),
        relationType: $this.form.childType
        // 'assessmentReportId':reportCode
      };
      console.log(obj);
      // var invitecode=_this.$route.query.inviteCode;
      $this
        .$axios({
          method: "post",
          url: "/user/addStudentWechat",
          data: obj
        })
        .then(res => {
          if (res.code == "000000") {
            $this.$message({
              message: "提交成功",
              type: "success"
            });
            window.localStorage.setItem("userId", JSON.stringify(userId));
            $this.$router.push({
              path: "/reportDetail",
              query: {
                code: evaluationRecordCode,
                gradecode: $this.$route.query.gradecode,
                reportId: reportCode,
                inviteCode: $this.getUrlKey("inviteCode")
              }
            });
          } else {
            $this.$message({
              message: res.message,
              type: "error"
            });
          }
        })
        .catch(err => {
          $this.$message({
            message: res.message,
            type: "error"
          });
        });
    },
    subBtn(id) {
      var self = this;
      self.aTime = null;
      var a = self.paperInfo; //self.testInfo;
      var data = {
        readTime: self.lookTime * 1000,
        useTime: self.cTime,
        gradeCode: this.paper.gradeCode,
        paperId: a.paperId,
        paperName: a.paperName,
        paperScore: a.totalScore,
        subjectCode: a.subjectCode,
        userId: id,
        userName: null,
        mobile: self.form.mobile,
        isReport: true,
        userProductCode: this.paper.code
        //"time":Math.round(val.time/1000),
      }; //paperInfo
      var arr = [];
      var obj = {};
      self.testInfo.forEach(val => {
        val.smallQuestions.forEach(val2 => {
          if (val2.smallType < 6) {
            val2.time = val2.time > 3600000 ? 360000 : val2.time;
            obj = {
              answerQuestionsTime: Math.round(val2.time / 1000),
              isComplexQuestion: 0,
              questionCode: val2.smallId,
              questionScore: val2.smallScore,
              questionSn: val2.smallSort,
              questionType: val2.smallType,
              readingQuestionsTime: 0, //阅读题干用时
              rightAnswer: val2.answer,
              userAnswer: this.toType(val2.userAnswer)
            };
            arr.push(obj);
          }
          if (val2.smallType == 6) {
            val2.componentQuestionModels.forEach(val3 => {
              val2.time = val2.time > 3600000 ? 360000 : val2.time;
              obj = {
                answerQuestionsTime: Math.round(val2.time / 1000),
                complexQuestionCode: val2.smallId,
                isComplexQuestion: 1,
                questionCode: val3.componentId,
                questionScore: val3.componentScore,
                questionSn: val3.componentSort,
                questionType: val3.componentType,
                readingQuestionsTime: Math.round(val2.time / 1000),
                rightAnswer: val3.answer,
                userAnswer: this.toType(val3.userAnswer)
              };
              arr.push(obj);
            });
          }
        });
      });
      data.questionList = arr;
      /* console.log(data)
        return*/
      if (data) {
        this.$axios({
          method: "post",
          url: "/evaluation/submit",
          headers: {
            "Content-Type": "application/json"
          },
          data: JSON.stringify(data)
        })
          .then(res => {
            if (res.code == "000000") {
              //成功
              self.isDis = false;
              let newInfo = JSON.parse(localStorage.getItem("paperBox"));
              newInfo.evaluationRecordId = res.evaluationRecordCode
              localStorage.setItem('paperBox', JSON.stringify(newInfo));

              if (
                this.localData.get("paperBox").gradeCode != 33 ||
                (this.localData.get("paperBox").subjectCode != 1 &&
                  this.localData.get("paperBox").subjectCode != 2)
              ) {
                self.$router.push({
                  path: '/paperInfo',
                  query: {
                    code: res.evaluationRecordCode,
                    type: 1,
                    reportId:res.reportId||null,
                  }
                  })
                  return;
              }

              var userPostData = this.localData.get("web").userId || null;
              if (userPostData) {
                self.$router.push({
                  path: "/reportDetail",
                  query: {
                    code: res.evaluationRecordCode,
                    gradecode: self.$route.query.gradecode,
                    reportId: res.reportId || null,
                    inviteCode: self.$route.query.inviteCode,
                    isHide: false,  
                  }
                });
              } else {
                self.postStudent(id, res.reportId, res.evaluationRecordCode);
              }
            } else {
              self.$message({
                type: "error",
                message: res.message
              });
            }
          })
          .catch(function(res) {
            self.$message({
              type: "error",
              message: res.message
            });
          });
      } else {
        self.$router.push({ path: "/LoginEntrance" });
      }
    },
    //获取时间
    getTime() {
      var timestamp = new Date().getTime();
      return timestamp;
    },
    //时间戳转化为分秒
    formatDuring(mss) {
      var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.round((mss % (1000 * 60)) / 1000);
      return hours + ":" + minutes + ":" + seconds;
    },
    //audio
    getAudio(val) {
      if (!val.questionAnalyzeType && val.smallType != 6) {
        return false;
      }
      var ary = [];

      if (val.questionAnalyzeType) {
        if (val.aud) {
          return false;
        }
        if (val.streamMedias.length > 0) {
          val.streamMedias.forEach(item => {
            ary.push({
              remotePath: item.remotePath,
              playTimes: item.playTimes
            });
          });
        }
        var a = val.componentQuestionModels || [];
        // console.log(a,"----------111111")
        if (a.length > 0) {
          a.forEach(item2 => {
            var b = item2.streamMedias || [];
            if (b.length > 0) {
              b.forEach(item3 => {
                ary.push({
                  remotePath: item3.remotePath,
                  playTimes: item3.playTimes
                });
              });
            }
          });
          console.log(ary, "------");
          if (val.streamMedias.length > 0) {
            val.aud = new audio(ary);
            val.aud.play();
          }
        }
      }
    }
  },
  watch: {
    fullHeight(val) {
      if (!this.timer) {
        this.fullHeight = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          that.timer = false;
        }, 400);
      }
    },
    second: {
      handler(newVal) {
        this.num(newVal);
      }
    },
    minute: {
      handler(newVal) {
        this.num(newVal);
      }
    }
  },
  computed: {
    second: function() {
      return this.num(this.seconds);
    },
    minute: function() {
      return this.num(this.minutes);
    }
  },
  destroyed() {
    window.onbeforeunload = null;
  }
};
</script>
<style lang="less" scoped>
#onlineTestBox {
  font-size: 14px;
  color: #333;
  .header {
    width: 1200px;
    margin: 0 auto;
    height: 45px;
    line-height: 50px;
    text-indent: 10px;
  }
  .paper {
    width: 1200px;
    padding-bottom: 45px;
    margin: 0 auto 60px;
    background-color: #fff;
    font-size: 14px;
    .testCon {
      width: 1200px;
      margin: 0 auto;
      /*box-shadow:2px 2px 20px #dfdfdf;*/
      .testTop {
        padding: 14px 20px 0;
        height: 100px;
        border-bottom: 1px solid #d9d9d9;
        position: relative;
        margin-bottom: 20px;
        box-sizing: border-box;
        .testTop_card {
          position: absolute;
          top: 22px;
          right: 30px;
          width: 125px;
          height: 40px;
          background: #3ebce5;
          border-radius: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .testTop_card:hover {
          cursor:pointer;
        }
        .cardBtn {
          position: absolute;
          width: 125px;
          background-color: #3ebce5;
          border-color: #3ebce5;
          right: 30px;
          top: 22px;
        }
        .timeLine {
          text-align: right;
          color: #666;
          line-height: 30px;
          span {
            margin-right: 32px;
            padding-left: 22px;
            position: relative;
            b {
              color: #db2d43;
              font-weight: normal;
            }
          }
          span:before {
            content: "";
            position: absolute;
            top: 50%;
            left: 0;
            display: inline-block;
            line-height: 30px;
            width: 18px;
            height: 17px;
            background: url("../../../../static/img/bookCollege/onlineIcon.png")
              0 0 no-repeat;
            margin-top: -9px;
          }
          i {
            font-style: normal;
            b {
              color: #000;
              font-weight: normal;
            }
          }
        }

        h3 {
          line-height: 48px;
          text-align: center;
          font-size: 18px;
          color: #003;
        }
      }
      .testC,
      .topicBox {
        /*padding: 0 35px;*/
        color: #333;
        font-size: 14px;
        h5 {
          padding: 0 35px;
          box-sizing: border-box;
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
          position: relative;
          overflow-y: auto;
          box-sizing: border-box;
          padding-bottom: 80px;
          h6 {
            font-weight: normal;
            line-height: 26px;
            margin-bottom: 16px;
            font-size: 14px;
            padding: 0 30px;
            box-sizing: border-box;
          }
          span {
            // word-break: break-all;
            word-wrap: break-word;
            display: inline-block;
          }
          .listenBox {
            position: relative;
            .listen {
              position: absolute;
              z-index: 99;
              vertical-align: middle;
              width: 22px;
              height: 18px;
              left: 230px;
              top: -43px;
              background: url("../../../../static/img/bookCollege/onlineIcon.png")
                0 -25px no-repeat;
            }
          }
          .onlineBottom {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 80px;
            // background-color: #f5f5f5;
            background-color: #fff;
            border-top: 1px solid #d9d9d9;
            line-height: 80px;
            text-align: right;
            padding-right: 20px;
            box-sizing: border-box;
            .onlineBottom_tips {
              float: left;
              margin-left: 10px;
              color: #c80032;
              font-size: 20px;
            }
            button {
              width: 162px;
            }
            .cardBtn {
              background-color: #ededed;
              border-color: #c6c6c6;
              color: #666;
              &:hover {
                background-color: #c80032;
                border-color: #c80032;
                color: #fff;
              }
            }
          }
        }
        .moreTopic {
          .el-col {
            overflow-y: auto;
          }
          .rightC {
            box-sizing: border-box;
            padding: 0 30px;
            border-left: 1px solid #e1e1e1;
            h6 {
              padding: 0;
            }
            .rightBtn {
              width: 100%;
            }
          }
        }
      }
      .testC {
        position: relative;
        .mask {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 10;
          // background-color: #fff;
        }
      }
      .anserBtn {
        position: absolute;
        right: 30px;
        bottom: 0px;
        height: 50px;
        width: 140px;
        margin: 0 auto;
        background-color: #c80032;
        border-color: #c80032;
        display: block;
        z-index: 11;
      }
      .anserBtnStart {
        position: fixed;
        bottom: 10px;
        right: 380px;
        height: 50px;
        width: 140px;
        margin: 0 auto;
        background-color: #c80032;
        border-color: #c80032;
        z-index: 11;
      }
    }
    &.testBox {
      position: relative;
      .testCon {
        background-color: #fff;
        .timeLine {
          text-align: left;
        }
      }
    }
  }
  .pushCode {
    .el-dialog {
      min-width: 500px !important;
    }
    h3 {
      text-align: center;
      margin-bottom: 10px;
      /*color: #3ebce5;*/
      font-family: "Microsoft YaHei";
    }
    p {
      line-height: 36px;
      color: #333;
      font-size: 16px;
    }
    .span-label {
      line-height: 40px;
      font-size: 16px;
      span {
        color: #ef5766;
      }
    }
  }
}

.onlinePopBox {
    position: absolute;
    background: #bbb;
    top: 45px;
    width: 200px;
    padding: 10px;
    right: 0;
    background: #FFF;
    min-width: 150px;
    border: 1px solid #EBEEF5;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    word-break: break-all;
    color: #606266;
    line-height: 1.4;
    text-align: justify;
    font-size: 14px;
    z-index: 10;

  p {
    line-height: 20px;
    margin-bottom: 10px;
    color: #333;
    font-size: 16px;
  }
  span {
    width: 30px;
    height: 30px;
    border: 1px solid #eaeced;
    box-sizing: border-box;
    text-align: center;
    line-height: 30px;
    display: inline-block;
    margin: 0 6px 6px 0;
    cursor: pointer;
    position: relative;
    &:hover,
    &.active {
      background-color: #3ebce5;
      border-color: #3ebce5;
      color: #fff;
    }
    &:before {
      content: "";
      position: absolute;
      left: -1px;
      top: -1px;
      width: 0;
      height: 0;
      border-top: 10px solid transparent;
      border-right: 10px solid transparent;
      // background-color:#db2d43;
    }
    &.noAnser:before {
      border-top-color: #db2d43;
    }
    &.asered:before {
      border-top-color: #7ac858;
    }
    &:hover:before {
      border-top-color: #3ebce5 !important;
    }
  }
}
</style>
<style lang="less">
.paperFather{
  width: 100%;
  background-color: #fff;
}
.cardBtn_submit {
  background-color: #c80032 !important;
  border-color: #c80032 !important;
  color: white !important;
}
#onlineTestBox {
  .p-stem {
    display: flex;
    span {
      word-break: break-all;
      word-wrap: break-word;
      /*display: inline-block;*/
    }
  }
  .pushCode {
    .el-dialog {
      min-width: 800px !important;
    }
    .el-rowIndex {
      margin-bottom: 22px;
    }
    .el-button {
      width: 200px;
    }
    .el-dialog__footer {
      text-align: center;
      .el-button {
        width: 100%;
      }
    }
    .el-form-item__label {
      text-align: left !important;
    }
    .el-form-item {
      width: 80%;
    }
    .el-button--primary {
      background-color: #c80032;
      border-color: #c80032;
    }
  }
}
.paper {
  .el-dialog {
    margin-top: inherit !important;
    width: 30%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
}
</style>

