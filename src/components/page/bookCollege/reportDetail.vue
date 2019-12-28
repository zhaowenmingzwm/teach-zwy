<template>
  <div class="reportDetails">
    <!-- <div class="breadcrumb" v-if="!$route.query.isMgr">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/learningCenter' }">学习中心</el-breadcrumb-item>
        <el-breadcrumb-item
          :to="{ path: '/paperInfo', query: {code:$route.query.code,reportId:$route.query.reportId,type:2} }"
        >我的作答</el-breadcrumb-item>
        <el-breadcrumb-item>报告详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
    <div class="content-right-body-wrap report-wrap">
      <div class="report-title">
        <img src="../../../../static/img/bookCollege/report-bg.png">
        <div class="report-title_warp">
          <div class="time-answer-wrap">
            <div class="use-time">
              测评用时：
              <b>{{result.useTime | userTimeFilter }}</b>
            </div>
          </div>
          <div class="name">考试名称:{{result.paperName}}</div>
          <canvas-ground :msg.sync='canvasImg' class="canvas" :circle="circleConfig"></canvas-ground>
          <div class="canvas">
            <img :src="canvasImg">
          </div>
          <div class="btn-wrap" v-if="!isMgr && !isHidebtn">
            <span class="spaceBtn" @click="myAnswerAns" v-if="!(!isHide && newPaperType == 1)">我的作答</span>
            <span
              class="spaceBtn yellow"
              @click="goText(0)"
              v-if="stateBtn == 0 && newPaperType != 2 "
            >购买专家咨询</span>
            <span class="spaceBtn blue" v-if="stateBtn == 3" @click="goText(3)">专家咨询回放</span>
            <span class="spaceBtn gray" v-if="stateBtn == 1">进入专家咨询</span>
            <span class="spaceBtn blue" v-if="stateBtn == 2" @click="goText(2)">进入专家咨询</span>
            <span class="spaceBtn" @click="goPaper()">试卷解构</span>
            <span
              class="spaceBtn yellow"
              v-if="!userInfo.vipStatus && newPaperType != 2 && isHide"
              @click="GetARaiseAction()"
            >购买提分行动方案</span>
            <span class="spaceBtn blue" v-if="(planType == 3 || (planType ==1 && !isHide)) && result.insuranceStatus " @click="PlanDetails">提分承保方案</span>
            <span class="spaceBtn blue" v-if="(planType == 2 || (planType ==1 && isHide  && userInfo.vipStatus))"  @click="PlanDetails">提分行动方案</span>
            
            <!--<el-popover
              placement="bottom"
              width="166"
              v-model="visible2"
              popper-class="popperItem">
              <div>
                <ul>
                  <li @click="goReport">2018-11-08报告</li>
                  <li @click="goReport">2018-11-08报告</li>
                  <li @click="goReport">2018-11-08报告</li>
                  <li @click="goReport">2018-11-08报告</li>
                </ul>
              </div>
              <span slot="reference" class="spaceBtn">历史报告 ∨</span>
            </el-popover>-->
          </div>
          <!-- 从案例重构平台进如该页面，展示的按钮 -->
          <div v-if="isHidebtn"  class="btn-wrap">
            <span class="spaceBtn" @click="myAnswerAns">我的作答</span>
            <span class="spaceBtn" @click="goPaper()">试卷解构</span>
          </div>

        </div>
      </div>
      <!-- 保险预测 -->
      <div v-if="result.obviousNceePrediction || stateBtn == 3">
        <div class="insurance PageNext">
          <div>
            <p>
              您本次测评科目是 :
              <span
                class="ins-gray"
              >{{GrandList[result.nceePrediction.gradeCode]}}{{commonSubject[result.nceePrediction.subjectCode]}}</span>
              总分 :
              <span class="ins-gray">{{result.nceePrediction.totalScore}}分</span>
              得分 :
              <span class="ins-red">{{result.nceePrediction.userScore}}分</span>
              距离高考时间 :
              <span
                class="ins-gray ins-nobor"
              >{{result.nceePrediction.untilNCEEDays}}天</span>
            </p>
            <p>
              通过AI智能算法进行计算，您通过
              <span
                class="ins-gray ins-gray2"
              >{{result.nceePrediction.untilNCEEDays}}天</span>的提分行动学习，预计您高考成绩为：
              <span
                class="ins-red ins-nobor"
              >{{result.nceePrediction.minScore+result.nceePrediction.baseScore}}-{{result.nceePrediction.maxScore+result.nceePrediction.baseScore}}分</span>
            </p>
            <p :style="{marginTop: '20px'}">预测分数=测评得数/测评试卷总分*高考该科总分+智能预测提升分数</p>
          </div>
          <el-button
            v-if="!result.insuranceStatus && newPaperType == 1"
            class="ins-btn"
            size="small"
            @click="goVipCenter"
          >购买提分承保服务</el-button>
        </div>
        <!-- <p class="insurance-p">备注：基础分数会以测评总分和得分的比例按照高考总分进行换算。如高考语文150分满分，测评总分100分，得分80分，则基础分为：120分</p> -->
        <!-- 会在<span class="ins-gray ins-gray2">{{result.nceePrediction.baseScore}}分</span>的基础上提升到 -->
      </div>
      <!-- 能力达标情况 蜘蛛图 -->
      <div id="printArea" class="report-knowledge report-item printArea">
        <div class="report-item-title">
          <h1>本测试卷反映{{student}}的各项认知能力百分比</h1>
          <div class="printBut" v-if="!isHidebtn">
            <el-button @click="printView()">打 印</el-button>
          </div>
        </div>
        <div class="report-item-body">
          <div class="titleP">
            <h2>认知能力是人脑加工、储存和提取信息的能力，是人们成功完成活动的最基本、最重要的心理条件。</h2>
            <p>
              认知能力分为：记忆能力、理解能力、应用能力、分析能力、评价能力和创造能力；
              <br>其中记忆能力、理解能力和应用能力属于基础学习能力；
              <br>分析能力、评价能力和创造能力属于深度学习能力。
              <br>
            </p>
          </div>
          <div class="report-knowledge-main PageNext">
            <div id="subjectAbility"></div>
          </div>
          <div class="report-knowledge-des PageNext">
            <div class="zz-wrap">
              <ul>
                <li v-for="(item,index) in reportDesObj">
                  <div class="left-wrap">
                    <img :src="abilityImg[item.num]">
                  </div>
                  <div class="right-wrap">
                    <h3>
                      {{ item.abilityName }}
                      <span>（{{ parseInt(item.rightRatio*100) }}%）</span>
                    </h3>
                    <p>
                      <span
                        v-if="item.covered"
                      >{{student}}同学在{{ item.abilityName}}上获得{{ parseInt(item.rightRatio*100) }}%，说明该同学</span>
                      {{ item.representation }}
                    </p>
                    <p
                      v-if="$route.query.isMgr&&item.covered"
                      style="color: #333;"
                    >说明{{student}}同学在学习过程中存在以下问题：</p>
                    <p v-if="$route.query.isMgr&&item.covered">{{item.question}}</p>
                  </div>
                </li>
              </ul>
              <div class="clear"></div>
            </div>
          </div>
        </div>
      </div>
      <!--学科核心素养-->
      <div class="report-knowledge report-item printArea" v-if="attainment.length">
        <!--attainment.length-->
        <div class="report-item-title">
          <h1>本测试卷反映{{student}}的各项核心素养不同能力的百分比</h1>
        </div>
        <div class="report-item-body">
          <div class="report-item-body_core PageNext">
            <div class="titleP">
              <h2 class="coreSty">学科核心素养是学生通过学科学习而形成的正确价值观、必备品格和关键能力。学生在学习不同的学科时会形成不同的核心素养。</h2>
              <p>其中{{commonSubject[subjectCode]}}学科的核心素养分{{attainment.length}}个水平</p>
              <p
                v-for="(item,i) in attainment"
              >由内向外的第{{number[i]}}个{{number[item.keyCompetencys.length-1 || 0]}}角图为水平{{number[i]}}的满分形状；</p>
              <p style="height:4px">&nbsp;</p>
              <p v-for="(item,i) in attainment">由内向外的第{{number[i]}}条线是{{student}}同学水平{{number[i]}}的得分；</p>
            </div>
            <div class="report-knowledge-main">
              <div style="width: 500px;margin: auto;" id="attainment1"></div>
            </div>
          </div>
          <div class="report-knowledge-des PageNext">
            <div class="zz-wrap">
              <ul>
                <li v-for="(item,index) in keyDesObj">
                  <div class="left-wrap">
                    <div class="num-text">{{ index+1 }}</div>
                  </div>
                  <div class="right-wrap">
                    <div class="key-list">
                      <b>{{ item.keyCompetencyName }}</b>
                      <span v-for="(itemS,indexS) in item.keyCompetencyCountList">
                        <i :style="{backgroundColor:lineColorsObj[indexS%5]}">{{ indexS+1 }}</i>
                        {{ parseInt(itemS.percentage)}}%
                      </span>
                    </div>
                    <p v-html="item.text"></p>
                  </div>
                </li>
              </ul>
              <div class="clear"></div>
            </div>
          </div>
        </div>
      </div>
      <!--知识掌握情况-->
      <div
        v-if="result.knowledgeGraspChart && result.knowledgeGraspChart.length"
        id="printArea1"
        class="report-knowledge report-item printArea PageNext"
      >
        <div class="report-item-title">
          <h1>本测试卷反映{{student}}的各知识掌握情况百分比</h1>
        </div>
        <div class="report-item-body">
          <div class="titleP">
            <h2>图例说明</h2>
            <p>
              彩色条表示该学生掌握的各个具体知识内容的百分比，颜色不说明问题，彩色条越长，表示该类知识掌握程度越好；
              <br>灰色区域表示该学生尚未掌握的具体知识内容的百分比，灰色条越长，该类知识掌握程度越差；
              <br>右侧分数的分子表示学生在该类知识的实际得分，分母表示该类知识在本试卷中考查的分值；
            </p>
          </div>
          <div class="report-knowledge-main" style="width:1055px">
            <div class="header">
              <div class="ling">0%</div>50%
              <div class="hundred">100%</div>
            </div>
            <div class="main" style="margin-top:0">
              <div class="line" :style="{left:i*20 + '%'}" v-for="i in 4"></div>
              <!--<div class="dian"></div>-->
              <div v-for="(know,index) in result.knowledgeGraspChart" class="main-item">
                <div class="main-item-title" style="height: 36px;">{{know.baseKnowledgeName}}</div>
                <el-tooltip placement="top" effect="light">
                  <div slot="content">{{ parseInt(know.rightRatio*100) + '%'}}</div>
                  <div class="main-item-body">
                    <span
                      class="num-total"
                      :style="{width:parseInt(know.rightRatio*100) + '%',backgroundColor:colors[index%colors.length]}"
                    ></span>
                    <span
                      class="lf-write"
                      v-show="know.totalScore==0"
                    >{{parseInt(know.rightRatio)*100}}%</span>
                    <span
                      class="lf-write"
                      v-show="know.totalScore!=0"
                    >{{Math.round(know.rightScore*10) / 10}}/{{ Math.round(know.totalScore*10) / 10}}</span>
                  </div>
                </el-tooltip>
              </div>
            </div>
          </div>
          <div class="report-knowledge-des">
            <el-row class="box">
              <el-col :span="12">
                <h4>举例说明</h4>
                <p v-if="scoreText">
                  {{ student }}同学“{{ scoreText.baseKnowledgeName }}”对应的
                  <span>{{ scoreText.rightScore }}/{{ scoreText.totalScore }}</span>，
                  <span>{{ scoreText.rightScore }}</span>
                  表示该学生在考查“{{ scoreText.baseKnowledgeName }}”的试题得分为
                  <span>{{ scoreText.rightScore }}</span>
                  分，本试卷中考查“{{ scoreText.baseKnowledgeName }}”的分数为
                  <span>{{ scoreText.totalScore }}</span>分，这类知识方面该学生丢了
                  <span>{{ scoreText.wrongScore }}</span>分。
                </p>
              </el-col>
              <el-col :span="12">
                <h4>注意</h4>
                <p>
                  彩色条达
                  <span>100%</span>并不表示该学生在所对应的知识内容完全掌握，只说明试卷所考查的该部分知识掌握无误；
                  <br>彩色条达
                  <span>0%</span>也不表示该学生在所对应的知识内容掌握程度为
                  <span>0</span>，只说明试卷所考查的该部分知识没有掌握。
                </p>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <!-- 有效增长点结构表 -->
      <div
        v-if="result.moduleScoreIncreaseChart&& result.moduleScoreIncreaseChart.length"
        id="printArea2"
        class="report-knowledge report-item printArea inCrease-content PageNext"
      >
        <div class="report-item-title">
          <h1>本测试卷反映{{student}}的在各知识内容存在的提分空间情况</h1>
        </div>
        <div class="report-item-body">
          <div class="titleP">
            <h2>图例说明</h2>
            <p>
              蓝色条表示本次测试卷反应的{{student}}同学各项知识存在的比较容易提分的空间，也就是说这部分知识内容能在短时间内得到修复，相对快速提升分数。
              <br>
              灰色条表示本次测试卷反应的{{student}}同学各项知识存在的较难提分的空间，也就是说这部分知识内容不太容易在较短的时间内得到修复，提分需要一定时间，这部分主要涉及学科的核心思想和解决复杂问题的策略。
            </p>
          </div>
          <div class="report-knowledge-main" style="width:950px;margin-left:75px;">
            <div class="header">
              <div
                v-for="i in 6"
                :key="i"
                :class="{first:i==1,last:i==6}"
                class="percent-num-item"
              >{{modelMaxTotalScore / 5 * (i - 1)}}</div>
            </div>
            <div class="main ge-por" style="margin-top:0;">
              <div class="lf-2">优先提升顺序</div>
              <div class="lf-3">较易提分/较难提分</div>
              <div class="line" :style="{left:i*20 +   '%'}" v-for="i in 4"></div>
              <div class="dian"></div>
              <div
                v-for="(know,index) in result.moduleScoreIncreaseChart"
                class="main-item"
                v-if="know.gray+know.yellow !=0"
              >
                <div class="main-item-title" style="height:36px;">{{know.baseKnowledgeName}}</div>
                <div class="main-item-body ge-por" :style="{background:'0 none',cursor:'pointer'}">
                  <el-tooltip
                    placement="top"
                    effect="light"
                    class="num-total"
                    style="background-color:rgb(204, 204, 204);position: absolute;top: 0;left: 0;height: 7px; text-align:right;line-height: 30px;"
                    :style="{width:(know.gray+know.yellow||0)/modelMaxTotalScore*100 + '%'}"
                  >
                    <div slot="content">{{'较难提升 '+ Number(know.gray).toFixed(1)+'分'}}</div>
                    <div class="main-item-body"></div>
                  </el-tooltip>

                  <el-tooltip
                    placement="top"
                    effect="light"
                    class="num-total"
                    v-show="know.yellow!=0"
                    style="position: absolute;top: 0;left: 0;height: 7px;background:rgb(123, 123, 241); text-align:right;line-height: 30px;"
                    :style="{width:(know.yellow||0)/modelMaxTotalScore*100 + '%'}"
                  >
                    <div slot="content">{{'较易提升 '+ Number(know.yellow).toFixed(1)+'分'}}</div>
                    <div class="main-item-body"></div>
                  </el-tooltip>
                  <span
                    class="lf-text"
                  >{{ Number(know.yellow).toFixed(1)}}/{{Number(know.gray).toFixed(1)}}</span>
                  <span class="lf-text1">{{ index+1 }}</span>
                </div>
              </div>
            </div>
            <div class="left-wrap">
              <div class="left-item">
                <div class="yuan" style="background:rgb(123, 123, 241)"></div>较易提升部分
              </div>
              <div class="left-item">
                <div class="yuan" style="background:rgb(204, 204, 204);"></div>较难提升部分
              </div>
            </div>
          </div>
          <div class="report-knowledge-des">
            <el-row class="box">
              <el-col :span="12">
                <h4>建议</h4>
                <p>建议{{student}}同学优先攻克蓝色条对应的知识部分，按照图表左侧的“优先提升顺序”进行后续的复习。</p>
              </el-col>
              <el-col :span="12">
                <h4>注意</h4>
                <p>此项数据是本次测试最重要的数据之一，建议进一步咨询学科报告解读专家获取更加细致个性化提升方案！</p>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <!--endprint-->
      <!-- 考试分数波动曲线 -->
      <div class="report-knowledge report-item" v-if="false">
        <div class="report-item-title">
          <h1>
            历次考试分数波动曲线
            <span>该表记录了学生的历次考试分数关注每次考试成绩以及学科成绩变化情况</span>
          </h1>
        </div>
        <div class="report-item-body">
          <div class="report-knowledge-main">
            <div id="hisScore"></div>
          </div>
        </div>
      </div>
      <!--<el-button  type="primary" @click="GetAgency">参考诊断报告预定义等级&nbsp;&nbsp;{{levelName}}</el-button>-->
    </div>
    <!--底部预约-->
    <div class="bottom-content" v-if="false">
      <p class="p-title">预约专家报告解读</p>
      <div class="content-wrap">
        <h1>专家解读报告</h1>
        <span class="price">
          <span class="span1">¥</span>500
          <span class="span2">元</span>
        </span>
        <p class="p-left">
          电 话：
          <span>400-0123 998</span>
        </p>
        <p class="p-left">地 址：北京市西城区北三环中路23号燕莎盛世大厦8层</p>
        <div class="form-right">
          <div class="block">
            <!--<span class="demonstration">默认</span>-->
            <el-date-picker
              v-model="timeText"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions1"
              style="width:100%;"
            ></el-date-picker>
          </div>
          <el-input v-model="couponText" placeholder="请输入兑换码" style="margin-top:16px;"></el-input>
          <p>
            <span>*</span>输入兑换码即可申请新国人书院“成长奖金”减免金额
          </p>
          <div class="btn" @click="postData">提交</div>
        </div>
      </div>
    </div>
    <el-dialog title="试卷解构" :visible.sync="isPaper" center width="1200px">
      <deconstruct :id="paperCode" v-if="paperCode"></deconstruct>
    </el-dialog>

    <el-dialog
      title="会员购买"
      :visible.sync="centerDialogVisible"
      width="600px"
      center
      class="buyVipSty"
    >
      <buy-Ins v-if="centerDialogVisible" :params="uesrInfo"></buy-Ins>
    </el-dialog>
  </div>
  <!--code=DE691CCECCC9478A836488AC2AF2C65C-->
</template>
<script>
import deconstruct from "../../common/deconstruct.vue";
import canvasGround from "../../common/canvasGround.vue";
import buyIns from "@/components/common/buyInsurance.vue";
// import '../../../assets/css/reportDETAIL.scss';
export default {
  components: {
    canvasGround,
    deconstruct,
    buyIns
  },
  data() {
    return {
      paperCode: "",
      isPaper: false,
      stateBtn: "",
      newPaperType: "",
      paper: "", //试卷信息
      result: {},
      isture: false,
      bannerShow: false,
      peopleShow: false,
      centerDialogVisible: false,
      proType: null, //测评类型
      peopleData: [210, 90, 300, 50],
      uesrInfo: localStorage.getItem("paperBox") ? JSON.parse(localStorage.getItem("paperBox")) : {},
      colors: [
        "#27ba9bi",
        "#5ac6ba",
        "#99d8ea",
        "#93aed4",
        "#ff8585",
        "#c486d7"
      ],
      levelName: "",
      levelCode: "",
      visible2: false,
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() + 86400000 < Date.now();
        }
      },
      timeText: "", //预约时间
      couponText: "", //请输入兑换码
      isMgr: this.$route.query.isMgr == 1 ? true : false,
      isHidebtn: this.$route.query.isHidebtn == 1 ? true : false, //  展示打印按钮，从案例重构平台进入该页面
      reportIdItem: "",
      competencyModel: [],
      student: "",
      subjectCode: "",
      gradeCode: "",
      attainment: [],
      number: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"],
      reportDesObj: [], //蜘蛛图描述文字
      abilityImg: [
        "../../../../static/img/ability-1.png",
        "../../../../static/img/ability-2.png",
        "../../../../static/img/ability-3.png",
        "../../../../static/img/ability-4.png",
        "../../../../static/img/ability-5.png",
        "../../../../static/img/ability-6.png"
      ],
      keyDesObj: [], //核心素养描述文字
      lineColorsObj: ["#e74141", "#b954e7", "#3183e5", "#62b412", "#dc8b20"],
      scoreText: "", //举例说明文本拼接
      paperId: this.$route.query.code,
      //  bannerSrc: "./static/img/high.png"
      userInfo: window.localStorage.getItem("paperBox") ? JSON.parse(window.localStorage.getItem("paperBox")) : {},
      isHide: true,   //是否显示我的作答    true是普通,false是保险
      planType: window.localStorage.getItem("paperBox") ? JSON.parse(window.localStorage.getItem("paperBox")).productType : null,  //试卷类型
      vipStatus: window.localStorage.getItem("paperBox") ? JSON.parse(localStorage.getItem("paperBox")).vipStatus : 'ooo',   //保险买没买 0没买
      newWin: "", //新开页
      canvasImg: '90909',
    };
  },
  created() {
    if (this.localData.get("paperBox") && this.localData.get("paperBox").gradeCode == 33 && (this.localData.get("paperBox").subjectCode == 1 || this.localData.get("paperBox").subjectCode == 2)
    ){
      this.isHide = false
    }
      // console.log(this.isHide); 
    this.stateBtn = this.userInfo.liveStatus || "";
    (this.newPaperType = this.userInfo.productType ? this.userInfo.productType : ""),
      (this.paper = this.localData.get("paperBox"));
    this.getExamReport();
    this.getReportDescription();
    this.proType = this.$route.query.type;
  },
  mounted() {
    if (this.$route.query.isMgr || this.isHidebtn) {
      $(".Header").css({ height: "0px", overflow: "hidden" });
      $(".main").css({ "margin-top": "0px" });
      $(".footer").css({ display: "none" });
    }
  },
  watch: {
    paperId: function(newval, oldval) {
      if (newval !== oldval) {
        this.getExamReport();
        this.getReportDescription();
        this.getKeyCompetencyDescription();
      }
    },
     newWin(newName, oldName) {
      if (newName != oldName && newName != "")
        // window.open(this.newWin, "_blank");
        var newPage = window.open("_blank");
        newPage.location = this.newWin
        this.$nextTick(function() {
        this.newWin = "";
      });
    },
    canvasImg(newV, oldV) {
      console.log(newV);
      this.canvasImg = newV;
    },
  },
  // props:['code','subjectCode','gradeIden'],
  methods: {
    //goPaper
    goPaper() {
      if (this.paperCode) {
        this.isPaper = true;
      }
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
     //提分行动方案详情点击按钮
    PlanDetails(item) {
      console.log(item)
      // localStorage.setItem("paperBox", JSON.stringify(item));
      const { href } = this.$router.resolve({
        path: "/report/testReport",
        query: {
          id: this.userInfo.evaluationRecordId,
          productType: this.userInfo.productType
        }
      });
      this.newWin = href;
    },
    // 购买提分行动
    goVipCenter() {
      localStorage.setItem("active", 2);
      this.$store.commit("active", 2);
      this.uesrInfo.newevaluationRecordCode = this.$route.query.code;
      this.centerDialogVisible = true;
    },
    /*预约提交*/
    postData: function() {
      var $this = this;
      var userPostData = JSON.parse(localStorage.getItem("userId"));
      if (!$this.timeText) {
        this.$message({
          message: "请选择预约时间",
          type: "warning"
        });
        return;
      }
      var obj = {
        appointDateTime: $this.timeObj($this.timeText),
        couponCode: $this.couponText,
        userId: userPostData,
        reportId: $this.$route.query.reportId || $this.reportIdItem,
        inviteCode: $this.getUrlKey("inviteCode"),
        type: 1
      };

      this.$axios({
        method: "post",
        url: "/user/appointment",
        data: obj
      })
        .then(res => {
          if (res.code == "000000") {
            $this.$message({
              type: "success",
              message: "提交成功"
            });
            $this.timeText = "";
            $this.couponText = "";
          } else {
            $this.$message({
              type: "warning",
              message: res.message
            });
          }
        })
        .catch(err => {
          $this.$message({
            type: "error",
            message: res.message
          });
        });
    },
    timeObj(value) {
      var a = new Date(value);
      var month = "";
      var dateItem = "";
      var h = "";
      var m = "";
      var s = "";
      if (a.getMonth() + 1 < 10) {
        month = "0" + (a.getMonth() + 1);
      } else {
        month = a.getMonth() + 1;
      }
      if (a.getDate() < 10) {
        dateItem = "0" + a.getDate();
      } else {
        dateItem = a.getDate();
      }
      if (a.getHours() < 10) {
        h = "0" + a.getHours();
      } else {
        h = a.getHours();
      }
      if (a.getMinutes() < 10) {
        m = "0" + a.getMinutes();
      } else {
        m = a.getMinutes();
      }
      if (a.getSeconds() < 10) {
        s = "0" + a.getSeconds();
      } else {
        s = a.getSeconds();
      }
      var b = a.getFullYear() + "-" + month + "-" + dateItem; //+ " " + h + ":" + m + ":" + s;
      return b;
    },
    //获取参考诊断报告
    getExamReport() {
      let that = this;
      var paperId = that.$route.query.code; //试卷code
      this.$axios({
        method: "post",
        url: that.baseURL + "/assessmentReport/createReport",
        data: {
          evaluationRecordCode: paperId
          // evaluationRecordCode: "bd62e615d8cb4627a982496e5ebc093b"
        }
      })
        .then(res => {
          if (res.code == "000000") {
            var result = res.result;
            that.paperCode = result.paperId;
            that.reportIdItem = result.reportId;
            for (var i = 0; i < result.moduleScoreIncreaseChart.length; i++) {
              for (
                var u = 0;
                u < result.moduleScoreIncreaseChart[i].productionColors.length;
                u++
              ) {
                if (
                  result.moduleScoreIncreaseChart[i].productionColors[u]
                    .colorCode == "blue"
                ) {
                  result.moduleScoreIncreaseChart[i].blue =
                    result.moduleScoreIncreaseChart[i].productionColors[
                      u
                    ].colorScore;
                } else if (
                  result.moduleScoreIncreaseChart[i].productionColors[u]
                    .colorCode == "gray"
                ) {
                  result.moduleScoreIncreaseChart[i].gray =
                    result.moduleScoreIncreaseChart[i].productionColors[
                      u
                    ].colorScore;
                } else if (
                  result.moduleScoreIncreaseChart[i].productionColors[u]
                    .colorCode == "yellow"
                ) {
                  result.moduleScoreIncreaseChart[i].yellow =
                    result.moduleScoreIncreaseChart[i].productionColors[
                      u
                    ].colorScore;
                }
              }
              if (
                result.moduleScoreIncreaseChart[i].gray +
                  result.moduleScoreIncreaseChart[i].yellow ==
                0
              ) {
                result.moduleScoreIncreaseChart.splice(i, 1);
                i--;
              }
              //know.gray+know.yellow
            }
            that.result = result;
            that.subjectCode = result.subjectCode || "";
            that.gradeCode = res.gradeCode || "";
            var a = result.keyCompetencyModelChart || [];
            that.attainment = a;
            if (result.student) {
              that.student = result.student.realname || "";
            }
            that.$nextTick(function() {
              that.getKeyCompetencyDescription();
              that.initChartAttainment(a);
              /*that.createHistoricalScore();*/
              that.createSubjectAbility();
              if (that.result.knowledgeGraspChart[0].totalScore != 0) {
                for (
                  var i = 0;
                  i < that.result.knowledgeGraspChart.length;
                  i++
                ) {
                  if (
                    that.result.knowledgeGraspChart[i].rightScore <
                    that.result.knowledgeGraspChart[i].totalScore
                  ) {
                    that.scoreText = that.result.knowledgeGraspChart[i];
                    return;
                  }
                }
              }
              // that.GetAgencyLevelByReport();
            });
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "获取参考诊断报告失败"
          });
        });
    },
    initChartAttainment(keyChart) {
      let xAxisCategories = [],
        seriesData = [],
        band = [];
      var a = ["#e74141", "#b954e7", "#3183e5", "#62b412", "#dc8b20"];
      var b = ["#f9d4d4", "#f5e6ff", "#caedff", "#e1ffe1", "#fff2e1"];
      keyChart &&
        keyChart.forEach((item, index) => {
          xAxisCategories = [];
          seriesData.push({
            name: "水平" + item.level,
            data: [],
            valueIndex: index,
            pointPlacement: "on",
            color: a[index % 5]
          });
          band.push({
            color: b[index % 5],
            from: index,
            to: index + 1
          });
          item.keyCompetencys &&
            item.keyCompetencys.forEach(val => {
              seriesData[index].data.push({
                y: index + (val.percentage || 0) / 100,
                temRealValue:
                  val.percentage == null ? "(未测评)" : parseInt(val.percentage)
              });
              xAxisCategories.push(val.keyCompetencyName);
            });
        });
      this.$nextTick(() => {
        Highcharts.chart("attainment1", {
          chart: {
            polar: true,
            type: "line",
            height: 500
          },
          credits: {
            enabled: false
          },
          plotOptions: {
            series: {
              connectNulls: true //连接数据为null的前后点
            }
          },
          xAxis: {
            categories: xAxisCategories,
            tickmarkPlacement: "on",
            lineWidth: 0,
            gridLineWidth: 3,
            labels: { style: { fontSize: "14px" } }
          },
          yAxis: {
            gridLineInterpolation: "polygon",
            lineWidth: 0,
            min: 0,
            max: keyChart.length,
            labels: { style: { fontSize: "14px" } },
            // ceiling:3,
            tickInterval: keyChart.length,
            minorTickInterval: keyChart.length,
            gridLineWidth: 3,
            plotBands: band
          },
          title: {
            text: `核心素养发展水平`, //${this.student}核心素养发展水平
            margin: 40
          },
          pane: {
            size: "100%"
          },
          tooltip: {
            shared: true,
            formatter: function() {
              var s = "<b>" + this.x + "</b>";
              $(this.points).each(function(i) {
                s +=
                  "<br />" + this.series.name + "：" + this.point.temRealValue;
              });
              return s;
            }
          },
          /*xAxis: {
                categories: xAxisCategories,
                tickmarkPlacement: "on",
                lineWidth: 0,
                labels: { style: { fontSize: "18px" } }
              },*/
          /*yAxis: {
                gridLineInterpolation: "polygon",
                lineWidth: 0,
                min: 0,
                max: 100,
                labels: { style: { fontSize: "18px" } }
              },*/
          /*tooltip: {
                shared: true,
                pointFormat:
                  '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>',
                style: {
                  fontSize: "16px"
                }
              },*/
          legend: {
            margin: 70,
            itemStyle: {
              fontSize: "14px"
            }
          },
          series: seriesData
        });
      });
    },
    spaceBtn() {
      document.querySelector("#printArea2").scrollIntoView();
      $("#printArea2")[0].scrollIntoView();
    },
    preview() {
      $(".printArea").jqprint({
        debug: false,
        importCSS: true,
        printContainer: true,
        operaSupport: false
      });
    },
    //历史成绩生成图表
    createHistoricalScore() {
      let historicalScore = this.result.historicalScoreChart;
      let examDate = [];
      let score = [];
      for (let i = 0; i < historicalScore.length; i++) {
        examDate.push(`第${1 + i}次`);
        score.push(historicalScore[i].userScore);
      }
      // score = score.reverse();
      Highcharts.chart("hisScore", {
        chart: {
          type: "line"
        },
        title: {
          text: "",
          x: 0
        },
        yAxis: {
          gridLineInterpolation: "polygon",
          lineWidth: 0,
          min: 0,
          max: this.result.paperScore || 150,
          title: {
            text: "考试分数（分)"
          }
        },
        xAxis: {
          title: {
            text: "测验次数",
            align: "high"
          },
          categories: examDate
        },
        series: [
          {
            showInLegend: false,
            data: score,
            color: "#ff6666"
          }
        ],
        credits: { enabled: false },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true // 开启数据标签
            },
            enableMouseTracking: false // 关闭鼠标跟踪，对应的提示框、点击事件会失效
          }
        }
      });
    },
    //蜘蛛图
    createSubjectAbility() {
      let subjectAbility = this.result.subjectAbilityChart;
      let myRadar_labelChart = [];
      let myRadar_dataChart = [];
      for (let i = 0; i < subjectAbility.length; i++) {
        myRadar_labelChart.push(subjectAbility[i].abilityName);
        myRadar_dataChart.push(parseInt(subjectAbility[i].rightRatio * 100));
      }
      Highcharts.chart("subjectAbility", {
        //图表展示容器，与 div 的 id 保持一致
        chart: {
          polar: true,
          type: "line"
        },
        credits: {
          enabled: false
        },
        title: {
          text: " "
        },
        pane: {
          size: "90%"
        },
        xAxis: {
          categories: myRadar_labelChart,
          tickmarkPlacement: "on",
          lineWidth: 0
        },
        tooltip: {
          shared: true,
          pointFormat:
            '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}%</b><br/>'
        },
        yAxis: {
          gridLineInterpolation: "polygon",
          lineWidth: 0,
          min: 0,
          max: 100,
          tickInterval: 10,
          minorTickInterval: 10,
          tickmarkPlacement: "on",
          labels: {}
        },
        legend: {
          align: "right",
          verticalAlign: "top",
          y: 70,
          layout: "vertical"
        },
        series: [
          {
            name: "能力",
            type: "area",
            data: myRadar_dataChart,
            pointPlacement: "on",
            showInLegend: false
          }
        ]
      });
    },
    /*获取蜘蛛图描述文字*/
    getReportDescription() {
      var $this = this;
      var paperId = this.$route.query.code; //试卷code
      this.$axios({
        method: "post",
        url: this.baseURL + "/getReportDescription",
        data: {
          evaluationRecordId: paperId
        }
      })
        .then(res => {
          if (res.code == "000000") {
            if (res.display) {
              var result = res.productionAbilityCounters;
              for (var i = 0; i < result.length; i++) {
                if (result[i].abilityName == "记忆能力") {
                  result[i].num = 0;
                } else if (result[i].abilityName == "分析能力") {
                  result[i].num = 1;
                } else if (result[i].abilityName == "理解能力") {
                  result[i].num = 2;
                } else if (result[i].abilityName == "创造能力") {
                  result[i].num = 3;
                } else if (result[i].abilityName == "应用能力") {
                  result[i].num = 4;
                } else if (result[i].abilityName == "评价能力") {
                  result[i].num = 5;
                }
              }
              $this.reportDesObj = result;
            } else {
              $this.reportDesObj = [];
            }
          } else {
            this.$message({
              type: "info",
              message: "获取学习能力图描述失败"
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "获取学习能力图描述失败"
          });
        });
    },
    /*获取核心素养描述文字*/
    getKeyCompetencyDescription() {
      var $this = this;
      var paperId = $this.$route.query.code; //试卷code
      this.$axios({
        method: "post",
        url: this.baseURL + "/getKeyCompetencyDescription",
        data: {
          evaluationRecordId: paperId
        }
      })
        .then(res => {
          if (res.code == "000000") {
            var result = res.keyCompetencyCharts;
            if (result) {
              for (var i = 0; i < result.length; i++) {
                result[i].text = "";
                for (
                  var s = 0;
                  s < result[i].keyCompetencyCountList.length;
                  s++
                ) {
                  var curCount = result[i].keyCompetencyCountList[s];
                  if (s == 0) {
                    if (curCount.covered) {
                      result[i].text +=
                        $this.student +
                        "同学在" +
                        result[i].keyCompetencyName +
                        "水平" +
                        $this.number[s] +
                        "上获得" +
                        parseInt(
                          result[i].keyCompetencyCountList[s].percentage
                        ) +
                        "%，说明该同学" +
                        result[i].keyCompetencyCountList[s].description +
                        "<br/>";
                    } else {
                      result[i].text +=
                        $this.student +
                        "同学在" +
                        result[i].keyCompetencyName +
                        "水平" +
                        $this.number[s] +
                        result[i].keyCompetencyCountList[s].description +
                        "<br/>";
                    }
                  } else {
                    if (curCount.covered) {
                      result[i].text +=
                        "在" +
                        result[i].keyCompetencyName +
                        "水平" +
                        $this.number[s] +
                        "上获得" +
                        parseInt(
                          result[i].keyCompetencyCountList[s].percentage
                        ) +
                        "%，说明该同学" +
                        result[i].keyCompetencyCountList[s].description +
                        "<br/>";
                    } else {
                      result[i].text +=
                        result[i].keyCompetencyName +
                        "水平" +
                        $this.number[s] +
                        curCount.description +
                        "<br/>";
                    }
                  }
                }
              }
              $this.keyDesObj = result;
            } else {
              $this.keyDesObj = [];
            }
          } else {
            this.$message({
              type: "info",
              message: "获取学习能力图描述失败"
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "获取学习能力图描述失败"
          });
        });
    },
    /*跳转到解析*/
    myAnswerAns() {
      this.$router.push({
        path: "/paperInfo",
        query: { type: "2", code: this.$route.query.code, isHidebtn: this.isHidebtn ? 1 : 0 }
      });
    },
    /*跳转到测评列表*/
    goText(item) {
      let params = JSON.parse(window.localStorage.getItem("paperBox"));
      if (item == 0) {
        this.$router.push({
          path: "/PurchaseOfCourse",
          query: {
            code: params.productCode,
            cp: "学习中心"
          }
        }); //跳转购买报告解读课程
      } else if (item == 1) {
      } else if (item == 2) {
      } else if (item == 3) {
        this.$router.push({
          path: "/playbackOfReadingReport",
          query: {
            roomId: params.roomId,
            paperName: params.paperName,
            liveStartTime: params.liveStartTime,
            liveTeacherName: params.liveTeacherName
          }
        });
      }
    },
    //购买提分行动服务按钮
    GetARaiseAction(item) {
      localStorage.setItem("active", 2);
      this.$store.commit("active", 2);
      this.$router.push({
        path: "/vipCenter",
        query: {
          gradeCode: this.userInfo.gradeCode,
          subjectCode: this.userInfo.subjectCode
        }
      });
    },
    /*跳转诊断报告页面*/
    goReport() {
      // this.$router.push({path: '/reportDetail', query: {code:'DE691CCECCC9478A836488AC2AF2C65111C'}})
    },
    
    // d打印
    printView() {
      let printBox = document.querySelector('.content-right-body-wrap').outerHTML;
      let newer = window.open(location.href, "_blank");
      let _this = this;
      newer.onload = function () {
        
        newer.document.getElementsByTagName("body")[0].innerHTML = printBox;
        newer.document.getElementsByTagName("body")[0].style.overflow = "visible";
        const btnWrap = newer.document.querySelector('.btn-wrap')
        const printbtn = newer.document.querySelector('.printBut')
        const reportTitle = newer.document.querySelector('.report-title')
        if (!_this.isMgr && !_this.isHidebtn) {
          btnWrap.setAttribute("class", 'btn-wrap butHide');
        }
        printbtn.setAttribute("class", 'printBut butHide');
        reportTitle.setAttribute("class", 'report-title butHide');
        printBox = null;
        newer.print();
        newer.close();
      }
    },
  },
  computed: {
    circleConfig() {
      let result = this.result;
      return {
        totalScore: +result.paperScore || 100,
        width: 120,
        score: result.userScore || 0
      };
    },
    modelMaxTotalScore() {
      let temp = 0;
      //计算模块分数的相加最大值
      // if(this.result && this.result.moduleScoreIncreaseChart){
      //   for(var i=0;i<this.result.moduleScoreIncreaseChart.length;i++){
      //     var num = 0;
      //     for(var u = 0;u<this.result.moduleScoreIncreaseChart[i].productionColors.length;u++){
      //       num += Number(this.result.moduleScoreIncreaseChart[i].productionColors[u].colorScore)
      //     }
      //     temp = num > temp ? num : temp;
      //   }
      // }
      this.result &&
        this.result.moduleScoreIncreaseChart &&
        this.result.moduleScoreIncreaseChart.forEach(
          ({ blue, gray, yellow }) => {
            let num = blue + gray + yellow;
            temp = num > temp ? num : temp;
          }
        );
      return Math.ceil(temp / 5) * 5;
    }
  },
  filters: {
    userTimeFilter(time) {
      time =
        time > 60
          ? ((time / 60) >> 0) + "'" + (time % 60 >> 0) + "''"
          : (time >> 0) + "''";
      return time;
    }
  }
};
</script>
<style lang="scss" scoped>

.reportDetails {
  .lf-2 {
    position: absolute;
    width: 100px;
    top: 0;
    left: -100px;
    font-size: 14px;
    color: #666;
  }
  .lf-3 {
    position: absolute;
    width: 130px;
    top: 0;
    right: -130px;
    font-size: 14px;
    color: #666;
  }
  .inCrease-content {
    .lf-text {
      position: absolute;
      top: -6px;
      right: -90px;
      width: 80px;
      color: #666;
      font-size: 14px;
    }
    .lf-text1 {
      position: absolute;
      top: -6px;
      left: -95px;
      width: 80px;
      text-align: right;
      color: #666;
      font-size: 14px;
    }
  }
  /*底部样式*/
  .bottom-content {
    padding: 0 40px;
    background-color: #fff;
    width: 1120px;
    margin: 0 auto;
    margin-top: 16px;
    padding-bottom: 40px;
    .p-title {
      font-size: 18px;
      text-align: center;
      color: #333;
      line-height: 60px;
    }
    .content-wrap {
      height: 297px;
      background: url("../../../assets/image/bg-1.png") no-repeat;
      padding: 0 26px 0 36px;
      overflow: hidden;
      position: relative;
      h1 {
        font-size: 44px;
        color: #525252;
        margin-top: 55px;
        margin-bottom: 20px;
      }
      .price {
        padding: 1px 8px 1px 15px;
        background-color: #3ebce5;
        color: #fff;
        font-size: 33px;
        border-radius: 5px;
        margin-bottom: 20px;
        .span1 {
          font-size: 23px;
        }
        .span2 {
          font-size: 16px;
        }
      }
      .p-left {
        color: #525252;
        font-size: 14px;
        margin-top: 14px;
        line-height: 1;
        span {
          font-size: 18px;
        }
      }
      .form-right {
        width: 362px;
        height: 222px;
        border-radius: 10px;
        background-color: #fff;
        padding: 20px 24px 0 24px;
        position: absolute;
        right: 26px;
        top: 26px;
        p {
          font-size: 14px;
          color: #666;
          margin: 16px 0;
          span {
            color: #f06270;
          }
        }
        .btn {
          color: #fff;
          width: 100%;
          background-color: #3ebce5;
          font-size: 16px;
          text-align: center;
          line-height: 46px;
          height: 46px;
          border-radius: 6px;
          cursor: pointer;
        }
      }
    }
  }
  .el-main {
    padding: 0 !important;
  }
  .popperItem {
    ul {
      margin-top: -13px;
      margin-bottom: -13px;
      li {
        margin: 0 -13px;
        background-color: #fff;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
        color: #333;
        cursor: pointer;
        &:hover {
          background-color: #3ebce5;
          color: #fff;
        }
      }
    }
  }
  .content-right-title-wrap {
    $padding: 40px;
    $h-title: 65px;
    text-align: left;
    background: #f5f5f5;
    border-radius: 3px;
    .title {
      font-weight: 500;
      font-size: 14px;
      color: #000033;
      width: 1200px;
      margin: 0 auto;
      .el-breadcrumb {
        height: 48px;
        line-height: 48px;
      }
    }
  }
  .content-right-body-wrap {
    text-align: center;
    width: 1200px;
    margin: 0 auto;
    background-color: #fff;
  }
  .content-right-body-wrap::after {
    content: "";
    display: table;
    clear: both;
  }

  /*gemixin*/
  @mixin ge-btn($w: 160px, $h: 40px) {
    text-align: center;
    width: $w;
    height: $h;
    line-height: $h;
    border-radius: $h/2;
    background-color: #3ccdfe;
    color: #fff;
    display: inline-block;
    user-select: none;
    cursor: pointer;
    &:active {
      background-color: hsl(195, 99%, 52%);
    }
    &.disabled {
      background: #ddd;
    }
  }
  @mixin wh($w, $h) {
    width: $w;
    height: $h;
  }
  @mixin margin-center {
    /*margin-left:auto !important;*/
    /*margin-right:auto !important;*/
  }
  $color1: #3ccdfe;
  /*gemixin--end*/
  .btn-wrap {
    padding-top: 23px;
    .spaceBtn {
      width: 118px;
      height: 32px;
      text-align: center;
      line-height: 32px;
      border-radius: 5px;
      background-color: #fff;
      color: #333;
      cursor: pointer;
      font-size: 14px;
      display: inline-block;
      margin-right: 30px;
      &:last-child {
        margin-right: 0;
      }
    }
  }

  .banner {
    display: block;
    position: relative;
    margin-bottom: 20px;
    img {
      width: 100%;
    }
  }

  %bg-w {
    background: #fff;
    padding: {
      left: 40px;
      right: 40px;
    }
  }
  .report-item {
    padding: {
      top: 20px;
    }
    .report-item-title {
      // margin: 0 38px;
      border-bottom: 1px solid #d9d9d9;
      height: 48px;
      overflow: hidden;
      position: relative;
      .printBut {
            position: absolute;
            top: 0px;
            right: 0px;
      }
      h1 {
        height: 22px;
        border-left: 4px solid #3ebce5;
        font-size: 16px;
        color: #333;
        text-align: left;
        padding-left: 12px;
        line-height: 22px;
        margin-top: 13px;
      }
      span {
        font-size: 14px;
        color: #666;
        font-weight: 100;
        vertical-align: -1px;
        margin-left: 23px;
      }
    }
    .report-item-body {
      @extend %bg-w;
      padding-top: 14px;
      padding-bottom: 30px;
      .titleP {
        text-align: left;
        padding-left: 4px;

        h2 {
          width: 100%;
          color: #55739b;
          font-size: 14px;
          height: 36px;
          line-height: 36px;
          font-weight: normal;
          margin-bottom: 10px;
          position: relative;
          &:before {
            content: "";
            width: 137px;
            border-bottom: 1px dashed #999;
            height: 36px;
            position: absolute;
            left: 0;
            top: 0;
          }
        }
        p {
          color: #55739b;
          line-height: 24px;
          font-size: 14px;
        }
        .line-wrap {
          position: relative;
          width: 210px;
          height: 3px;
          margin: 10px 0;
          .line {
            width: 100%;
            border-bottom: 3px dashed #e0e0e0;
          }
          .dian {
            position: absolute;
            top: -1.5px;
            $h: 6px;
            @include wh($h, $h);
            border-radius: $h/2;
            background-color: #cccccc;
            overflow: hidden;
            &:first-child {
              left: 0;
            }
            &:last-child {
              right: 0;
            }
          }
        }
      }
      .report-item-body_core {
        display: flex;
        .titleP {
          flex: 1;
          h2 {
            height: inherit;
          }
        }
        .report-knowledge-main {
          flex: 1;
        }
      }
    }
  }
  .main-item-body {
    position: relative;
  }
  .report-title {
    position: relative;
    height: 316px;
    .report-title_warp {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      text-align: center;
    }
    .time-answer-wrap {
      text-align: left;
      font-size: 14px;
      color: #ffd200;
      position: absolute;
      right: 35px;
      top: 70px;
    }
    .canvas {
      display: inline-block;
      background: white;
      border-radius: 50%;
      @include wh(120px, 120px);
      @include margin-center;
    }
    .name {
      text-align: center;
      color: #fff;
      font-size: 18px;
      padding-top: 37px;
      margin-bottom: 28px;
    }
  }

  .report-knowledge {
    .report-knowledge-main {
      margin-bottom: 20px;
      /*max-width: 650px;*/
      @include margin-center;
      .header {
        position: relative;
        height: 40px;
        line-height: 40px;
        color: #666;
        font-size: 14px;
        .ling {
          display: inline-block;
          position: absolute;
          top: 0;
          left: 0;
        }
        .hundred {
          display: inline-block;
          position: absolute;
          top: 0;
          right: 0;
        }
        .percent-num-item {
          width: 20%;
          display: inline-block;
          float: left;
          &.first {
            width: 10%;
            text-align: left;
          }
          &.last {
            width: 10%;
            text-align: right;
          }
        }
      }
      .main {
        $color2: #d9d9d9;
        padding: 13px 0;
        position: relative;
        border: {
          top: 1px solid $color2;
          left: 1px solid $color2;
          right: 1px solid $color2;
          bottom: 1px solid $color2;
        }

        .line {
          position: absolute;
          height: 100%;
          top: 0;
          width: 1px;
          background: #d9d9d9;
          /*opacity: 0.2;*/
        }
        .dian {
          position: absolute;
          $w: 15px;
          left: -$w/2;
          top: -$w/2;
          @include wh($w, $w);
          overflow: hidden;
          border-radius: $w/2;
          background: $color2;
        }
        .main-item {
          position: relative;
          text-align: left;
          &-title {
            line-height: 36px;
            color: #333;
            font-size: 14px;
            padding: 0 10px;
          }
          &-body {
            $h: 7px;
            height: $h;
            width: 100%;
            border-radius: $h/2;
            background: #eaeaea;
            position: relative;
            .num-total {
              display: inline-block;
              height: 100%;
              border-radius: $h/2;
              background: #7fcfc6;
              width: 100px;
              position: absolute;
              top: 0;
              left: 0;
            }
          }
        }
      }
      .left-wrap {
        text-align: left;
        font-size: 16px;
        color: #808080;
        margin: 0 auto;
        width: 240px;
        .left-item {
          line-height: 40px;
          font-size: 14px;
          color: #333;
          display: inline-block;
          margin-right: 30px;
          &:last-child {
            margin-right: 0;
          }
          .yuan {
            width: 10px;
            height: 10px;
            border-radius: 50px;
            display: inline-block;
            margin-right: 6px;
          }
        }
      }
    }
    .report-knowledge-des {
      width: 100%;
      padding: 32px 25px;
      box-sizing: border-box;
      border: 1px solid #d9d9d9;
      background-color: #fbfbfb;
      .box {
        display: flex;
        .el-col {
          text-align: left;
          min-height: 115px;
          h4 {
            height: 30px;
            position: relative;
            text-align: left;
            font-size: 16px;
            margin-bottom: 10px;
            &:after {
              content: "";
              width: 37px;
              height: 30px;
              border-bottom: 2px solid #21a0ff;
              position: absolute;
              left: 0;
              bottom: 0;
            }
          }
          p {
            color: #55739b;
            line-height: 24px;
            font-size: 14px;
            span {
              color: #de6b6b;
            }
          }
          &:first-child {
            padding-right: 25px;
            border-right: 1px solid #d9d9d9;
            flex: 1;
          }
          &:last-child {
            padding-left: 28px;
            flex: 1;
          }
        }
      }
      .zz-wrap {
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            /*float: left;*/
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 30px;
            width: 50%;
            text-align: left;
            .left-wrap {
              min-height: 150px;
              float: left;
              margin-right: 22px;
              width: 61px;
              img {
                width: 100%;
              }
              .num-text {
                height: 61px;
                width: 61px;
                background-color: #f7f7f7;
                border: 1px solid #cfcfcf;
                border-radius: 5px;
                text-align: center;
                line-height: 61px;
                margin-right: 22px;
              }
            }
            .right-wrap {
              min-height: 150px;
              /*float: left;*/
              width: 410px;
              h3 {
                font-size: 16px;
                color: #333;
                margin-bottom: 10px;
                span {
                  font-weight: 100;
                  color: #de6b6b;
                  font-size: 14px;
                }
              }
              .key-list {
                font-size: 16px;
                color: #333;
                margin-bottom: 10px;
                span {
                  font-size: 16px;
                  margin-right: 6px;
                  i {
                    display: inline-block;
                    width: 18px;
                    height: 18px;
                    background-color: #e74141;
                    margin-right: 6px;
                    font-style: inherit;
                    text-align: center;
                    line-height: 18px;
                    color: #fff;
                  }
                }
              }
              p {
                font-size: 14px;
                line-height: 24px;
                color: #55739b;
              }
            }
          }
        }
        .clear {
          clear: both;
        }
      }
    }
  }

  .knowledge-seniority {
    .knowledge-seniority-main {
      max-width: 650px;
      text-align: left;
      @include margin-center;
      .seniority-main-item {
        padding: 40px 0;
        position: relative;
        border-bottom: 1px solid #d9d9d9;
        .title {
          color: #333333;
          font-size: 18px;
          padding-bottom: 20px;
        }
        .error-wrap {
          font-size: 16px;
          color: #666666;
          .error {
            color: #ff6666;
          }
        }
        .go-btn {
          position: absolute;
          right: 0;
          top: 50px;
          @include ge-btn(100px, 40px);
        }
      }
    }
  }
  .num-total {
    line-height: 30px;
  }
  .lf-write {
    display: inline-block;
    width: 100px;
    position: absolute;
    top: -8px;
    right: -110px;
    font-size: 14px;
    color: #333;
    text-align: left;
  }
  .gray {
    background: #cdcdcd !important;
    color: #fff !important;
  }
  .blue {
    background: #67b6ee !important;
    color: #fff !important;
  }
  .yellow {
    background: #ff9b19 !important;
    color: #fff !important;
  }
  .el-button {
    font-size: 16px;
  }
  .insurance {
    margin: 38px;
    margin-bottom: 10px;
    padding: 35px 20px;
    border: solid 1px #d2d2d2;
    background-color: #f5f5f5;
    color: #666;
    position: relative;
    p {
      text-align: left;
    }
    p:nth-child(1) {
      margin-bottom: 20px;
    }
    .ins-gray {
      color: #333;
      display: inline-block;
      padding-right: 15px;
      margin-right: 15px;
      border-right: solid 1px #a6a6a6;
      font-size: 16px;
    }
    .ins-gray2 {
      border: none;
      padding: 0;
      padding-left: 10px;
    }
    .ins-red {
      color: #c80032;
      padding-right: 15px;
      border-right: solid 1px #a6a6a6;
      margin-right: 15px;
    }
    .ins-nobor {
      border: none;
    }
    .ins-btn {
      font-size: 16px;
      position: absolute;
      text-align: center;
      top: 47px;
      right: 30px;
      background-color: #ff9b19;
      color: right;
      color: #fff;
      border: none;
    }
  }
  .insurance-p {
    margin-left: 38px;
    text-align: left;
    color: #999;
  }
}
.PageNext   {
  PAGE-BREAK-AFTER: always;
}


</style>


<style lang="scss">
.reportDetails {
  .buyVipSty {
    .el-dialog__body {
      padding: 0;
    }
  }
  .coreSty{
    line-height: 24px!important;
    &::before{
      top: 16px!important;
    }
  }
}
</style>
