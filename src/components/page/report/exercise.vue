<template>
    <!-- 练习题 -->
    <div class="exercise-content">
      <!-- <div class="breadcrumb">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/learningCenter' }">学习中心</el-breadcrumb-item>
          <el-breadcrumb-item >练习题</el-breadcrumb-item>
        </el-breadcrumb>
      </div> -->
      <report-nav></report-nav>
      <el-row class="print-btn">
        <el-button @click="printView()">打印</el-button>
      </el-row>
      <!--<div style="height:40px;margin-bottom:10px;" class="print">-->
        <!--<printer style="float: right;" ref="goPrint1" :async="true" @prepare="goPrint1" :ids="printIds1"></printer>-->
      <!--</div>-->
      <div class="question-content lf-printOne" id="print2">
        <div class="print-wrap">
          <!--练习题-->
          <div class="report-knowledge report-item threeQues-content PageNext" v-if="quesListObj&&quesListObj.length!=0">
            <div class="threeQues-wrap">
              <h1 class="title-text">练习题</h1>
              <div class="ques-list" v-for="(itemQues,indexQues) in quesListObj" :key="indexQues">
                <h1>练习{{ indexQues+1 | ArabelToCN }}</h1>
                <p>
                  <span v-html="strUrlChange(itemQues.stem)"></span>
                </p>
                <div class="quesList" v-if="itemQues.type==1||itemQues.type==2">
                  <span class="opt-list" v-for="(itemOpt,indexOpt) in strToArr(itemQues.quesOption)" :key="indexOpt">{{ itemOpt.optionKey }}.<span v-html="strUrlChange(itemOpt.optionValue)"></span></span>
                </div>
                <div class="quesList" v-if="itemQues.type>5">
                  <div class="smallQuesList" v-for="(itemSmall,indexSmall) in itemQues.componentQuestions" :key="indexSmall">
                    <p>
                      <span>({{ indexSmall+1 }}).</span>
                      <span v-html="strUrlChange(itemSmall.stem)"></span>
                    </p>
                    <div v-if="itemSmall.type==1||itemSmall.type==2">
                      <span class="opt-list" v-for="(itemSmallOpt,indexSmallOpt) in strToArr(itemSmall.quesOption)" :key="indexSmallOpt">{{ itemSmallOpt.optionKey }}.<span v-html="strUrlChange(itemSmallOpt.optionValue)"></span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--命题点-->
          <div class="report-knowledge report-item threeLive-content PageNext" v-if="quesListObj && quesListObj.length!=0">
            <div class="threeLive-wrap" >
              <h1 class="title-text">命题点</h1>
              <!--<div v-for="(itemPoint,indexPoint) in item.subjectQuestions">-->
              <el-row v-for="(itemPoint,indexPoint) in quesListObj" style="margin-bottom:12px;" :key="indexPoint" class="ques-list">
                <h1>练习{{ indexPoint+1 | ArabelToCN }}</h1>
                <el-col :span="24" class="elCol">
                  <el-row v-for="(itemP,indexP) in itemPoint.baseProductionModels" style="margin-bottom:16px;" v-if="itemPoint.type<=5" :key="indexP">
                    <!--<el-col style="width:100px;"><span v-if="indexP==0">{{ indexPoint+1 }}.考点：</span><span v-if="indexP!=0" style="opacity: 0">{{ indexPoint+1 }}.考点：</span></el-col>-->
                    <el-col :span="20">
                      <p class="base-p"><b>命题点{{ indexP+1 }}</b><span>【{{ itemP.baseProductionName }}】</span></p>
                      <p>
                        <span>条件：</span>
                        <span v-html="strUrlChange(itemP.baseProductionCause)"></span>
                      </p>
                      <p>
                        <span>结论：</span>
                        <span v-html="strUrlChange(itemP.baseProductionResult)"></span>
                      </p>
                    </el-col>
                  </el-row>
                  <el-row v-for="(itemP,indexP) in itemPoint.componentQuestions" style="margin-bottom:16px;" v-if="itemPoint.type==6" :key="indexP">
                    <el-col style="width:30px;margin-top:9px;"><span >({{ indexP+1 }})</span></el-col>
                    <el-col :span="20">
                      <div v-for="(itemP1,indexP1) in itemP.baseProductionModels" :key="indexP1">
                        <p class="base-p"><b>命题点{{ indexP1+1 }}</b><span>【{{ itemP1.baseProductionName }}】</span></p>
                        <p>
                          <span>条件：</span>
                          <span v-html="strUrlChange(itemP1.baseProductionCause)"></span>
                        </p>
                        <p>
                          <span>结论：</span>
                          <span v-html="strUrlChange(itemP1.baseProductionResult)"></span>
                        </p>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <!--</div>-->
            </div>
          </div >
          <!--答案&解析-->
          <div class="report-knowledge report-item threeQuesAns-content PageNext" v-if="quesListObj && quesListObj.length!=0">
            <div class="threeQuesAns-wrap">
              <h1 class="title-text">答案和解析</h1>
              <div class="quesAns-list" v-for="(itemAns,indexAns) in quesListObj" :key="indexAns">
                <h1>练习{{ indexAns+1 | ArabelToCN }}</h1>
                <div class="quesAns-l" style="margin-bottom:12px;" v-if="itemAns.type<=5">
                  <el-row style="margin-bottom:8px;">
                    <el-col :span="24">
                      <el-row>
                        <el-col style="width:82px;color:#333"><b>【答案】：</b></el-col>
                        <el-col :span="20">
                          <b><span v-if="itemAns.type!=3&&itemAns.type!=4" v-html="strUrlChange(itemAns.answer)" style="vertical-align:-3px;"></span></b>
                          <p v-if="itemAns.type==3">
                            <b><span v-if="itemAns.answer==0">错</span></b>
                            <b><span v-if="itemAns.answer==1">对</span></b>
                          </p>
                          <p v-if="itemAns.type==4">
                            <span v-for="(itemTK,indexTK) in strToArr(itemAns.answer)" :key="indexTK"> {{ indexTK+1 }}. <b><span v-html="strUrlChange(itemTK.answerValue)"></span></b></span>
                          </p>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-row style="margin-bottom:6px;">
                        <el-col style="width:82px;color:#666;">解析：</el-col>
                        <!--<el-col :span="20">-->
                        <!--<p v-for="(itemAnsList,indexAnsList) in strToArr(itemAns.quesAnalyze)" ><span v-html="itemAnsList.analyzeKey"></span> <span v-html="strUrlChange(itemAnsList.analyzeValue)"></span></p>-->
                        <!--</el-col>-->
                      </el-row>
                    </el-col>
                  </el-row>
                  <el-row style="color:#666;">
                    <el-col :span="24">
                      <p v-for="(itemAnsList,indexAnsList) in strToArr(itemAns.quesAnalyze)" v-if="strToArr(itemAns.quesAnalyze).length>1"><span v-html="itemAnsList.analyzeKey"></span> <span v-html="strUrlChange(itemAnsList.analyzeValue)"></span></p>
                      <p v-if="strToArr(itemAns.quesAnalyze).length==1">
                        <span v-if="!strToArr(itemAns.quesAnalyze)[0].analyzeValue">请按照解构思路自行完成解析（可参考命题点）</span>
                        <span v-else><span v-html="strToArr(itemAns.quesAnalyze)[0].analyzeKey"></span> <span v-html="strUrlChange(strToArr(itemAns.quesAnalyze)[0].analyzeValue)"></span></span>
                      </p>
                      <p v-if="strToArr(itemAns.quesAnalyze).length==0">
                        <span>请按照解构思路自行完成解析（可参考命题点）</span>
                      </p>
                    </el-col>
                  </el-row>
                </div>
                <div class="quesAns-l" style="margin-bottom:12px;" v-if="itemAns.type==6">
                  <div v-for="(itemComponent,indexCmponent) in itemAns.componentQuestions" style="margin-bottom:26px;">
                    <el-row style="margin-bottom:6px;">
                      <el-col :span="24">
                        <el-row>
                          <el-col style="width:85px;color:#333;"><b>({{ indexCmponent+1 }}) 答案：</b></el-col>
                          <el-col :span="20">
                            <b><span v-if="itemComponent.type!=3&&itemComponent.type!=4&&itemComponent.type!=5" v-html="strUrlChange(itemComponent.answer)" style="vertical-align:-3px;"></span></b>
                            <p v-if="itemComponent.type==3">
                              <b><span v-if="itemComponent.answer==0">错</span></b>
                              <b><span v-if="itemComponent.answer==1">对</span></b>
                            </p>
                            <p v-if="itemComponent.type==4">
                              <span v-for="(itemTK,indexTK) in strToArr(itemComponent.answer)"> {{ indexTK+1 }}. <b><span v-html="strUrlChange(itemTK.answerValue)"></span></b></span>
                            </p>
                            <p v-if="itemComponent.type==5">
                              <span><b><span v-html="strUrlChange(strToArrZG(itemComponent.answer))"></span></b></span>
                            </p>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-row style="margin-bottom:6px;color:#666;">
                          <el-col style="width:82px;"><span style="opacity: 0">({{ indexCmponent+1 }}) </span>解析：</el-col>
                          <!--<el-col :span="20">-->
                          <!--<p v-for="(itemComponentList,indexComponentList) in strToArr(itemComponent.quesAnalyze)" ><span v-html="itemComponentList.analyzeKey"></span> <span v-html="strUrlChange(itemComponentList.analyzeValue)"></span></p>-->
                          <!--</el-col>-->
                        </el-row>
                      </el-col>
                    </el-row>
                    <el-row style="color:#666;">
                      <el-col :span="24">
                        <p v-for="(itemComponentList,indexComponentList) in strToArr(itemComponent.quesAnalyze)" v-if="strToArr(itemComponent.quesAnalyze).length>1"><span v-html="itemComponentList.analyzeKey"></span> <span v-html="strUrlChange(itemComponentList.analyzeValue)"></span></p>
                        <p v-if="strToArr(itemComponent.quesAnalyze).length==1">
                          <span v-if="!strToArr(itemComponent.quesAnalyze)[0].analyzeValue">请按照解构思路自行完成解析（可参考命题点）</span>
                          <span v-else><span v-html="strToArr(itemComponent.quesAnalyze)[0].analyzeKey"></span> <span v-html="strUrlChange(strToArr(itemComponent.quesAnalyze)[0].analyzeValue)"></span></span>
                        </p>
                        <p v-if="strToArr(itemComponent.quesAnalyze).length==0">
                          <span>请按照解构思路自行完成解析（可参考命题点）</span>
                        </p>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

</template>

<script>
  import reportNav from '@/components/page/report/reportNav.vue'
  import printer  from "../../common/printer"
export default {
	data(){
		return {
      quesObj:"", //试题数据
      quesListObj:[], //所有题列表
      ids:['print2'],
      productType: this.$route.query.productType || null,
		}
	},
  components: {
    reportNav,printer
  },
  created(){

  },
  mounted(){
    this.routeItem = this.$route.query;
    this.getQues();
  },
	methods:{
    /*打印*/
    printView(){
      let dom = "";
      for (let i = 0; i < this.ids.length; i++) {
        let domid = this.ids[i];
        dom += document.getElementById(domid).outerHTML
      }
      let newer = window.open("_blank");
      newer.location = location.href;
      let _this = this;
      newer.onload = function () {
        newer.document.getElementsByTagName("body")[0].innerHTML = dom;
        //console.log(newer.document.getElementsByTagName("body")[0].style)
        newer.document.getElementsByTagName("body")[0].style.overflow = "visible";
        dom = null;
        for (let i = 0; i < _this.ids.length; i++) {
          let ndom = newer.document.getElementById(_this.ids[i]);
          let nclss = ndom.getAttribute("class");
          nclss += " printpager";
          ndom.setAttribute("class", nclss);
          ndom = null;
        }
        newer.print();
        newer.close();
      }
    },
    /*获取试题数据*/
    getQues:function(){
      var $this = this;
      var obj = {
        "evaluationRecordCode": this.routeItem.id,
      }
      this.$axios
        .post(this.baseURL + "/promotionPlan/getExeciseFeedbacks",obj)
        .then(({ code, execiseFeedbacks }) => {
          if (code == "000000") {
            if(execiseFeedbacks){
              // $this.quesObj = execiseFeedbacks
              $this.quesListObj = execiseFeedbacks
            }
          }else {
            this.$message("获取练习题失败");
          }
        });
    },

    /*parse数据*/
    strToArr:function(item){
      return JSON.parse(item)
    },
    /*复合题主观题parse数据*/
    strToArrZG:function(item){
      if(item.substr(0, 1) == "{"){
        return JSON.parse(item).answer
      }else{
        return item
      }
    },
    /*图片解析*/
    strUrlChange(str){
      if(!str || typeof  str != "string")return "";
      return str.replace(/http:\/\/.*?\.(mp3|jpg|jpeg|png|gif)/ig, function(w){
        if(/mp3$/i.test(w)){
          return '<audio src="' + w + '" controls/>'
        }else{
          return '<img class="media-middle" style="vertical-align: middle;max-width: 100%;" src="' + w + '"/>'
        }
      });
    },
	},
	watch:{
	},
  filters: {
    ArabelToCN (i){
      var arrNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '佰'];
      if (i <= 10) {
        return arrNum[i];
      } else if (i < 20) {
        return arrNum[10] + (i % 10 > 0 ? arrNum[parseInt(i % 10)] : "");
      } else if (i < 100) {
        return arrNum[parseInt(i / 10)] + arrNum[10] + (i % 10 > 0 ? arrNum[parseInt(i % 10)] : "");
      }
      return i;
    }
  }
}
</script>

<style lang='scss'>
	.replay-header{
		height: 52px;
		line-height: 52px;
		border-bottom: 1px solid #d9d9d9;
		background: #fff;
		p{
			width: 1200px;
			margin: 0 auto;
			color: #7f7f7f;
		}
	}
  .print-btn{
    width:1200px;
    margin:0 auto;
    text-align: right;
  }
  .question-content,.printpager{
    width:1200px;
    margin:0 auto;
    .print-wrap{
      /*练习题*/
      .threeQues-content{
        min-height:200px;
        .threeQues-wrap{
          /*padding:0 40px 40px 40px;*/
          /*background-color:#FFF;*/
          .title-text{
            font-size:16px;
            color:#333;
            margin:30px 0 20px 0;
            height:17px;
            border-left:3px solid #c80032;
            line-height:17px;
            padding-left:20px;
          }
          .ques-list{
            margin-bottom:20px;
            padding-bottom:22px;
            border:1px solid #d9d9d9;
            border-top:none;
            background-color:#FFF;
            h1{
              font-size:14px;
              color:#666;
              font-weight:100;
              height:35px;
              border:1px solid #d9d9d9;
              background-color:#f1f1f1;
              line-height:36px;
              padding:0 22px;
              margin-bottom:22px;
            }
            p{
              vertical-align:1px;
              padding:0 22px;
            }
            span{
              display: inline-block;
              line-height:1;
              img{
                vertical-align: 100px
              }
            }

            .opt-list{
              display: inline-block;
              min-width:25%;
            }
            .quesList{
              margin-top:12px;
              padding:0 22px;
              .smallQuesList{
                margin-top:12px;
              }
            }
          }
        }
      }
      /*命题点*/
      .threeLive-content{
        min-height:200px;
        .threeLive-wrap{
          /*padding:0 40px 0 40px;*/
          /*background-color:#FFF;*/
          .title-text{
            font-size:16px;
            color:#333;
            margin:30px 0 20px 0;
            height:17px;
            border-left:3px solid #c80032;
            line-height:17px;
            padding-left:20px;
          }
          .ques-list{
            margin-bottom:20px;
            padding-bottom:22px;
            border:1px solid #d9d9d9;
            border-top:none;
            background-color:#FFF;
            h1{
              font-size:14px;
              color:#666;
              font-weight:100;
              height:35px;
              border:1px solid #d9d9d9;
              background-color:#f1f1f1;
              line-height:36px;
              padding:0 22px;
              margin-bottom:22px;
            }
            .elCol{
              padding:0 22px;
              p{
                color:#666;
              }
              .base-p{
                font-size:14px;
                color:#333;
                margin:6px 0 12px 0;
                font-weight:bold;
                b{
                  margin-right:8px;
                }
                span{
                  display: inline-block;
                  line-height:30px;
                  padding:0 4px;
                  background-color:#f9e6e6;
                }
              }
            }
          }
        }
      }
      /*答案&解析*/
      .threeQuesAns-content{
        min-height:200px;
        .threeQuesAns-wrap{
          /*padding:0 40px 10px 40px;*/
          /*background-color:#FFF;*/
          .title-text{
            font-size:16px;
            color:#333;
            margin:30px 0 20px 0;
            height:17px;
            border-left:3px solid #c80032;
            line-height:17px;
            padding-left:20px;
          }
          .quesAns-list{
            margin-bottom:20px;
            padding-bottom:22px;
            border:1px solid #d9d9d9;
            border-top:none;
            background-color:#FFF;
            h1{
              font-size:14px;
              color:#666;
              font-weight:100;
              height:35px;
              border:1px solid #d9d9d9;
              background-color:#f1f1f1;
              line-height:36px;
              padding:0 22px;
              margin-bottom:22px;
            }
            .quesAns-l{
              padding:0 22px;
            }
          }
        }
      }
    }
  }

  /*打印样式*/
  .PageNext   {   PAGE-BREAK-AFTER:   always   }
  @media print{
    .question-content{
      width:100%;
      background-color:#FFF;
      overflow: hidden;
      .threeQues-content{
        .threeQues-wrap{
          .title-text{
            margin-top:0;
          }
        }
      }

    }
  }
</style>
