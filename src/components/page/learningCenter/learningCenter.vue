<template>
  <div class="learning-center">
    <div class="header-ganged-wrap">
      <div class="header-ganged">
        <div class="Year">
          <p>学&emsp;&emsp;年:</p>
          <span :class="active === 10000 ?'active':''" @click="AllSchoolYear()">全部</span>
          <ul>
            <li
              v-for="(item,index) in Year"
              :key="index"
              @click="YearClick(item,index)"
              :class="index == active ?'active':''"
            >{{item.gradeName}}</li>
          </ul>
        </div>
        <div class="subject">
          <p>学&emsp;&emsp;科:</p>
          <span :class="active1 === 10000 ? 'active' : ''" @click="AllTheSubjects()">全部</span>
          <ul>
            <li
              v-for="(item,index) in subject"
              :key="index"
              @click="getVersions(item,index)"
              :class="index == active1 ?'active':''"
            >{{item.subjectName}}</li>
          </ul>
        </div>
        
          <!-- 暂时隐藏 -->
        <!-- <div>
          <p>教材版本:</p>
          <span :class="active2 === 10000 ? 'active' : ''" @click="Allversions()">全部</span>
          <ul>
            <li
              v-for="(item,index) in bookTypes"
              :key="index"
              @click="versions(item,index)"
              :class="index == active2 ?'active':''"
            >{{item.bookType}}</li>
          </ul>
        </div> -->
        <div>
          <p>专家咨询状态:</p>
          <span @click="InterpretationOfState('1')" :class="active3 == 1 ?'active':''">全部</span>
          <ul>
            <li @click="InterpretationOfState('2')" :class="active3 == 2 ?'active':'' ">已咨询</li>
            <li @click="InterpretationOfState('3')" :class="active3 == 3 ?'active':'' ">待咨询</li>
          </ul>
        </div>
        <div>
          <p>测评状态:</p>
          <span @click="ReviewStatus('1')" :class="active4 == 1 ?'active':''">全部</span>
          <ul>
            <li @click="ReviewStatus('2')" :class="active4 == 2 ?'active':''">已测评</li>
            <li @click="ReviewStatus('3')" :class="active4 == 3?'active':''">待评测</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="content" v-loading="loading" v-if="data.length != 0">
      <div class="paperBox" v-for="(item,index) in data" :key="index">
        <div
          :class="item.assessStatus == 0 ? 'paperBox-left' : 'NotReview'"
        >{{item.assessStatus == 0 ?'待 评 测' : '已 评 测'}}</div>
        <div class="paperBox-center">
          <div style="height:66px;">
            <div class="paperName" @click="checkPaper(item)">{{item.productName}}</div>
            <span class="assessTime" v-if="item.assessTime">测评时间:{{item.assessTime}}</span>
          </div>
          <div style="clear:both"></div>
          <div>
            <span class="merchandise">{{item.subjectName}}</span>
            <span class="merchandise">{{item.gradeName}}</span>
            <!-- 暂时隐藏 -->
            <!-- <span class="merchandise">{{item.bookTypeName}}</span> -->
            <span class="grade" v-if="item.assessStatus == 0">总分：{{item.totalScore}}分</span>
            <span class="grade" v-else>得分/总分：{{item.userScore}}/{{item.totalScore}}分</span>
            <span
              class="The-measurement-time"
              v-if="item.assessStatus == 0"
            >测评限时：{{item.standardTime}}分钟</span>
            <span
              class="The-measurement-time"
              v-else
            >测评用时/限时：{{(item.userTime / 60)>1?Math.round(item.userTime / 60):Math.ceil(item.userTime / 60)}} / {{item.standardTime}}分钟</span>
          </div>
        </div>
        <div class="textPaper-right">
          <div class="textPaper-right-btn">
            <span v-if="item.productType != 2">
              <!-- <button v-if='item.vipStatus == 2 ' :class="item.status ? 'grayness':'blue'"  @click='PlanDetails(item)'>提分行动方案</button>
              <button v-if='item.vipStatus == 1'  class="grayness" >提分行动方案</button>-->
              <!-- 保险按钮状态 -->
              <button
                v-if="item.insurance== true && item.insuranceStatus !== 3 && item.insuranceStatus !== 0 && item.assessStatus"
                :class="item.insuranceStatus == 1 ? 'yellow' : item.insuranceStatus == 2 ? 'blue' : ''"
                @click="buyIns(item)"
              >
                {{
                item.insuranceStatus == 1 ? '购买提分承保服务' : item.insuranceStatus == 2 ? '提分承保方案' : '购买提分承保服务'
                }}
              </button>



              <button
                :class="item.vipStatus == 1 ? 'grayness': item.vipStatus == 2 ? 'blue' : 'yellow'"
                v-if="!item.insurance"
                @click="item.vipStatus == 0 ? GetARaiseAction(item) : item.vipStatus == 2 ? PlanDetails(item) : null"
              >{{item.vipStatus == 0 ? '购买提分行动方案' : '提分行动方案'}}</button>
            </span> 

            <span v-if="item.productType == 2">
              <button
                v-if="item.assessStatus == 1"
                :class="item.status ? 'grayness':'blue'"
                @click=" item.status ? null :PlanDetails(item)"
              >提分行动方案</button>
            </span>
            <!-- <button @click="centerDialogVisible = true" class="blue">购买提分行动险</button> -->

            <button
              :class="item.status ? 'grayness':'blue'"
              v-if="item.liveStatus == 3 && item.productType != 2"
              @click="playbackOfReadingReport(item)"
            >专家咨询回放</button>
            <button
              v-if="item.liveStatus == 2 && item.productType != 2"
              :class="item.status ? 'grayness':'blue'"
              @click="EnterTheInterpretationCourse(item)"
            >进入专家咨询</button>
            <button v-if="item.liveStatus == 1 && item.productType != 2" class="grayness">进入专家咨询</button>
            <button
              v-if="item.liveStatus == 0 && item.productType != 2"
              @click="purchaseBtn(item)"
              :class="item.status ? 'grayness':'yellow'"
            >购买专家咨询</button>
            <button
              v-if="item.assessStatus == 1"
              class="blue"
              @click="CheckTheReportBtn(item)"
            >查看测评报告</button>
            <button
              v-if="item.assessStatus == 0 && !item.status"
              class="blue"
              @click="StartEvaluation(item)"
            >开始测评</button>
            <!-- <button v-if="item.assessStatus == 0 && !item.status" class="blue" @click='dialogVisible = true'></button> -->
            <button v-if="item.status" class="grayness">开始测评</button>
          </div>
          <div v-if="item.liveStatus == 1">
            <p
              style="margin-top:15px;font-size:14px;color:#b6b6b6;float:right;margin-right:20px;"
            >专家咨询时间: {{dataParse(item.liveStartTime)}} 请在开始前十五分钟进入教室</p>
          </div>
        </div>
      </div>
    </div>
    <div class="main-1" v-else>
      <img src="../../../../static/img/bookCollege/zwsj.png">
      <p>暂无数据</p>
    </div>
    <!-- 分页 -->
    <div class="paging">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="from.pageNum"
        :page-size="from.pageSize"
        layout="total,prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </div>
    <el-dialog title="试卷解构" :visible.sync="isPaper" center width="1200px">
      <deconstruct :id="paperCode" v-if="paperCode"></deconstruct>
    </el-dialog>
    <!-- 开始测评弹框 -->
    <el-dialog title :visible.sync="dialogVisible" width="30%" :before-close="StartEvaluationHide">
      <span>此次测评有可能将作为提分行动险中所保障分数的测评依据，请认真作答</span>
      <div v-if="!provinceIdOff.provinceId">
        <span>所在省份:</span>
        <el-select
          v-model="selectArea"
          class="secletClase"
          placeholder="请选择省份"
          prop="ruleForm.selectedPro"
        >
          <el-option
            v-for="item in selectTimeData"
            :key="item.areaId"
            :label="item.areaName"
            :value="item.areaId"
          ></el-option>
        </el-select>
      </div>

      <div
        v-if="provinceIdOff.provinceId != 110000 && provinceIdOff.provinceId != 120000 && selectArea != 110000 && selectArea !=120000 && !provinceIdOff.artType"
      >
        <span>&nbsp;&nbsp;&nbsp;文理科:</span>
        <el-select v-model="cheseSub" class="secletClase" prop="ruleForm.selectedChin">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>

      <!-- <template slot-scope="data">
      </template>-->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="StartEvaluation()">开始测评</el-button>
        <el-button @click="StartEvaluationHide('')">取消测评</el-button>
      </span>
    </el-dialog>
    <!-- 立即购买弹框 -->
    <!-- <el-dialog
          title="会员购买"
          :visible.sync="centerDialogVisible"
          width="40%"
          center>
          <span>提分行动保险会以本次测评试卷中所预测的提升分数进行承保</span>
					<br>
					<span class="priceClass">学科:</span><span></span>
					<br>
					<span class="yaoqing">邀请码:</span> <input type="text" class="sujecetInput">
					<br>
					<span class="priceClass">支付金额:</span><span></span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary"  @click="GetARaiseAction">立即购买</el-button>
          </span>
    </el-dialog>-->

    <el-dialog
      title="会员购买"
      :visible.sync="centerDialogVisible"
      width="600px"
      center
      class="buyVipSty"
    >
      <buy-Ins v-if="centerDialogVisible" 
      @hide="getChild"  :params="uesrInfo"></buy-Ins>
    </el-dialog>
  </div>
</template>

<script>
import deconstruct from "../../common/deconstruct.vue";
import buyIns from "@/components/common/buyInsurance.vue";
export default {
  components: { deconstruct, buyIns },
  data() {
    return {
      rules: {
        selectedPro: [
          { required: true, message: "请输入省份", trigger: "change" }
        ],
        selectedChin: [
          { required: true, message: "请输入文理科", trigger: "change" }
        ]
      },
      ruleForm: {
        selectedPro: "",
        selectedChin: ""
      },
      uesrInfo: {},
      centerDialogVisible: false,
      dialogVisible: false,
      selectArea: "", //  选择省
      selectTimeData: [], // 选择省数据
      newWin: "",
      isPaper: false,
      paperCode: "",
      loading: true,
      Year: [], //学年
      subject: [], //学科
      bookTypes: [], //教材版本
      active: 10000,
      active1: 10000,
      active2: 10000,
      active3: 1,
      active4: 1,
      artType: "", // 文理科
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
      parentId: "",
      total: 0, //一共多少条
      data: [],
      cheseSub: "", // 文理科
      subjectList: "", // 获取的学科列表
      options: [
        {
          value: "0",
          label: "请选择"
        },
        {
          value: "1",
          label: "文科"
        },
        {
          value: "2",
          label: "理科"
        }
      ],
      provinceIdOff: {}
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
    this.getProvince(); //获取省
    this.getYear(); //初始化查询学年
    this.AllgetSubject(); //初始化查询全部学科
    this.getAssessUserProductPageList(); //初始化请求商品列表
    this.getUserInfo();
    
    // this.updataProvince()  // 更新省份
  },
  methods: {
    //点击试卷名
    checkPaper(val) {
      (this.paperCode = val.paperCode), (this.isPaper = true);
    },
    getChild(value){
      this.centerDialogVisible = value;
    },
    //点击查看报告
    CheckTheReportBtn(item) {
      console.log(111111, item);
      this.localData.set("paperBox", item);
      const { href } = this.$router.resolve({
        path: "/reportDetail",
        query: {
          code: item.evaluationRecordId,
          type: item.productType
        }
      });
      //window.open(href, '_blank');
      // var tw=window.open('','_blank');
      // tw.location=href;
      this.newWin = href;
    },
    //查询学年
    getYear(item, index) {
      let self = this;
      self.$axios
        .post("/grade/getGrades", {
          stageCode: null
        })
        .then(res => {
          if (res.code == "000000") {
            res.grades.forEach((item,index) =>{
              if(item.gradeCode == "23"){
                res.grades.splice(index, 1);
              }
            })
            self.Year = res.grades;
          }
        });
    },
    // 获取用户信息接口
    getUserInfo() {
      this.userId = localStorage.getItem("token");
      let sendData = {
        appKey: null,
        token: null,
        userId: localStorage.getItem("token") || null
      };
      this.$axios
        .post(this.baseURL + "/user/getAssessmentAuthenticatedInfo", sendData)
        .then(res => {
          // debugger;
          if (res.code == "000000") {
            this.uesrInfo = res;
            this.provinceIdOff = res.student ? res.student : {};
            this.Off = !this.provinceIdOff.provinceId ? true : false;
          }
        });
    },
    buyIns(item) {
      localStorage.setItem("paperBox", JSON.stringify(item));
      new Promise((resolve, reject) => {
        // debugger;
        if (item.insuranceStatus == 2) {
          resolve();
          return;
        }
        this.$axios.post(this.lantianUrl + "agency/checkInsuranceOrder", {evaluationRecordId: item.evaluationRecordId})
        .then((res) => {
            if(res.httpCode == 200){
              resolve();
            } else if (res.httpCode == 300042 ||　res.httpCode == 300039) {
              reject(res)
            }
        })
      })
      .then(() => {
        
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
          const { href } = this.$router.resolve({
            path: "/report/testReport",
            query: {
              id: item.evaluationRecordId,
              productType: item.productType
            }
          });
          this.newWin = href;
        }
      })
      .catch((err) => {
        this.$confirm(
          err.message,
          {
            showCancelButton: false,
            confirmButtonText: "确定",
            // cancelButtonText: "取消",
            type: "info"
          });
      })
    },
    // 更新省份
    updataProvince() {
      let params = {
        artType:
          this.selectArea == 110000 || this.selectArea == 120000
            ? "0"
            : this.cheseSub,
        provinceId: this.selectArea,
        parentId: this.uesrInfo.userId
      };
      this.$axios.post(
        this.baseURL + "/user/updateStudentAreaByParentId",
        params
      );
    },
    // 获取省接口
    getProvince() {
      this.$axios
        .post(this.areas + "assessment/area/getAreas", {})
        .then(res => {
          if (res.code == "000000") {
            this.selectTimeData = res.areas;
            // console.log(this.selectTimeData);
          }
        });
    },
    //查询全部学科
    AllgetSubject() {
      let self = this;
      self.$axios.post("subject/getSubjects", {}).then(res => {
        if (res.code == "000000") {
          self.subject = res.subjects;
        }
      });
    },
    //查询学科
    getSubject(item) {
      let self = this;
      self.$axios
        .post("/subject/getCourses", {
          gradeCode: item ? item.gradeCode : null,
          excludeRule: "omp"
        })
        .then(res => {
          self.subject = res.subjects;
          self.getBookTypes();
        });
    },
    //查询教材版本
    getVersions(item, index) {
      this.from.pageNum = 1;
      this.from.subjectCode = item.subjectCode;
      this.from.bookTypeCode = null;
      this.active1 = index;
      this.active2 = 10000;
      this.getBookTypes(item);
      this.getAssessUserProductPageList();
    },
    //查询教材版本
    getBookTypes(item) {
      if (!item) {
        this.bookTypes = [];
        return;
      }
      let self = this;
      self.$axios
        .post("/bookType/getBookTypes", {
          gradeCode: item ? item.gradeCode : null,
          subjectCode: item ? item.subjectCode : null
        })
        .then(res => {
          self.bookTypes = res.bookTypes;
        });
    },
    YearClick(item, index) {
      //学年点击
      this.from.gradeCode = item.gradeCode;
      this.from.pageNum = 1;
      this.from.subjectCode = null;
      this.from.bookTypeCode = null;
      this.active = index;
      this.active1 = 10000;
      this.active2 = 10000;
      this.getSubject(item);
      this.getAssessUserProductPageList();
    },
    // 教材版本
    versions(item, index) {
      this.from.pageNum = 1;
      this.active2 = index;
      this.from.bookTypeCode = item.ctbCode;
      this.getAssessUserProductPageList();
    },
    //查询全部教材版本
    Allversions() {
      this.from.pageNum = 1;
      this.active2 = 10000;
      this.from.bookTypeCode = null;
      this.getAssessUserProductPageList();
    },
    //查询全部学年
    AllSchoolYear() {
      this.active = 10000;
      this.active1 = 10000;
      this.active2 = 10000;
      this.from.gradeCode = null;
      this.from.subjectCode = null;
      this.from.bookTypeCode = null;
      this.from.pageNum = 1;
      this.AllgetSubject();
      this.getBookTypes();
      this.getAssessUserProductPageList();
    },
    //查询全部学科
    AllTheSubjects() {
      this.from.pageNum = 1;
      this.from.subjectCode = null;
      this.from.bookTypeCode = null;
      this.active1 = 10000;
      this.active2 = 10000;
      this.getBookTypes();
      this.getAssessUserProductPageList();
    },
    //专家咨询状态
    InterpretationOfState(res) {
      this.from.pageNum = 1;
      if (res == 1) {
        this.from.liveProcess = null;
        this.active3 = 1;
      } else if (res == 2) {
        //已咨询
        this.active3 = 2;
        this.from.liveProcess = 2;
      } else if (res == 3) {
        //未解读
        this.active3 = 3;
        this.from.liveProcess = 1;
      }
      this.getAssessUserProductPageList();
    },
    //评测状态
    ReviewStatus(res) {
      this.from.pageNum = 1;
      if (res == 1) {
        this.active4 = 1;
        this.from.assessStatus = null;
      } else if (res == 2) {
        this.from.assessStatus = 1;
        this.active4 = 2;
      } else if (res == 3) {
        this.active4 = 3;
        this.from.assessStatus = 0;
      }
      this.getAssessUserProductPageList();
    },
    //查询用户商品列表
    getAssessUserProductPageList() {
      let self = this;
      self.$axios
        .post(
          this.lantianUrl +
            "agency/agencyAssessUserProduct/getAssessUserProductPageList",
          self.from
        )
        .then(res => {
          if (res.httpCode == "200") {
            // this.subject = res.result.list;
            // console.log(this.subject);
            let getSubjectInfo = this.subject;
            for (var i = 0; i < getSubjectInfo.length; i++) {
              this.subjectList = getSubjectInfo[i].subjectCode;
              // console.log(this.subjectList);
            }
            self.loading = false;
            self.data = res.result.list;
            for (let i = 0; i < self.data.length; i++) {
              if (self.data[i].assessTime) {
                self.data[i].assessTime = this.formatDates(
                  self.data[i].assessTime
                );
              }
            }
            self.total = res.result.total;
          }
        });
    },
    //每页多少条
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.from.pageSize = val;
      this.getAssessUserProductPageList();
    },
    //当前第几页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.from.pageNum = val;
      this.getAssessUserProductPageList();
    },
    //购买专家咨询
    purchaseBtn(item) {
      if (item.status) {
        return;
      }
      const { href } = this.$router.resolve({
        path: "/PurchaseOfCourse",
        query: {
          code: item.productCode,
          cp: "学习中心"
        }
      });
      this.newWin = href;
    },
    // 取消测评
    StartEvaluationHide(done) {
      this.selectArea = "";
      this.cheseSub = "";
      done ? done() : (this.dialogVisible = false);
    },

    //开始测评按钮  progShen chineseSub
    StartEvaluation(item) {
      if (item) {
        this.localData.set("paperBox", item); //用户信息
      }
      if (
        item &&
        (item.subjectCode == 1 || item.subjectCode == 2) &&
        item.productType != 3 &&
        item.gradeCode == 33
      ) {
        this.dialogVisible = true;
        return;
      }
      if (!this.provinceIdOff.provinceId && !item && !this.selectArea) {
        this.$message("请选择省份");
        return;
      }
      const showInfo =
        this.provinceIdOff.provinceId != 110000 &&
        this.provinceIdOff.provinceId != 120000 &&
        this.selectArea != 110000 &&
        this.selectArea != 120000 &&
        !this.provinceIdOff.artType &&
        !this.cheseSub;
      // debugger;
      if (!item) {
        if (showInfo) {
          this.$message("请选择文理科");
          return;
        }
      }

      if (!this.provinceIdOff.provinceId && this.selectArea) {
        this.updataProvince(); // 更新省市
      }
      this.$router.push({
        path: "/textBegin",
        query: {
          provinceId: this.provinceIdOff.provinceId
            ? this.provinceIdOff.provinceId
            : this.selectArea
            ? this.selectArea
            : "", // 省的Id
          parentId: this.uesrInfo.userId, // 用户的Id
          artType: this.cheseSub
        }
      });
    },
    //购买提分行动服务按钮
    GetARaiseAction(item) {
      localStorage.setItem("active", 2);
      this.$store.commit("active", 2);
      this.$router.push({
        path: "/vipCenter",
        query: {
          gradeCode: item.gradeCode,
          subjectCode: item.subjectCode
        }
      });
    },
    //方案详情点击按钮
    PlanDetails(item) {
      localStorage.setItem("paperBox", JSON.stringify(item));
      const { href } = this.$router.resolve({
        path: "/report/testReport",
        query: {
          id: item.evaluationRecordId,
          productType: item.productType
        }
      });
      this.newWin = href;
    },
    //解读报告回放按钮
    playbackOfReadingReport(item) {
      if (item.status) {
        return;
      }
      const { href } = this.$router.resolve({
        path: "/playbackOfReadingReport",
        query: {
          roomId: item.roomId,
          paperName: item.paperName,
          liveStartTime: item.liveStartTime,
          liveTeacherName: item.liveTeacherName
        }
      });
      this.newWin = href;
      //	window.open(href, '_blank');
    },
    //进入解读课程按钮
    EnterTheInterpretationCourse(item) {
      var url = "https://testingtest.e-eduspace.com";
      if (location.hostname == "testing.e-eduspace.com") {
        url = "https://testing.e-eduspace.com";
      }
      this.$axios
        .post(this.lantianUrl + "/live/entryRoom", {
          id: item.roomId,
          studentName: JSON.parse(localStorage.getItem("web")).mobile
        })
        .then(res => {
          if (res.httpCode == "200") {
            //this.localData.set('liveUrl',res.result)
            window.open(url + "#/goLive?liveUrl=" + res.result);
            //  const {href} = this.$router.resolve({path:url+'/goLive'});
            //  this.localData.set('liveUrl',res.result)
            // window.open(href, '_blank');
            //	window.open(res.result)
          }
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
    margin-top: 18px;
    clear: both;
    min-height: 300px;
    .paperBox {
      height: 122px;
      border: 1px solid #e6e6e6;
      background-color: #fff;
      width: 1200px;
      margin: 20px auto;
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
        width: 26px;
        height: calc(100% - 24px);
        border: 1px solid #d9d9d9;
        background-color: #f7f8f9;
        line-height: 22px;
        padding-left: 13px;
        font-size: 12px;
        padding-top: 24px;
        float: left;
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
  background-color: #67b6ee;
}
.yellow {
  background-color: #ff9b19;
}
.grayness {
  background: #cdcdcd;
  cursor: no-drop !important;
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
</style>

