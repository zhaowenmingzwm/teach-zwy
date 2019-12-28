<template>
  <div class="pa" v-if="showType&&paper" :class="[showType]">
    <template v-for="(psq,bigI) in paper.paperSystemQusetionType">
      <template v-for="q in psq.typeList">
        <div v-if="parseInt(q.itemType) < 4" class="pa-per simple">
          <div class="pa-name">{{changeBigIndex(bigI)}}、{{q.itemContent}}（{{q.itemScore}}分）</div>
          <template v-for="qp in q.list">
            <div class="pa-q">
              <div class="pa-stem"><span>{{qp.questionNo}}. </span>
                <div class="bhtml" v-html="strUrlChange(qp.stem)"></div>
              </div>
              <div class="pa-select">
                <div class="pa-opt" @click="selectOne(qp,o)" v-for="o in qp.quesOption" :class="{focus:o.focus}">
                  <div class="op-txt">{{o.optionKey}}&nbsp;&nbsp;<div class="bhtml" v-html="strUrlChange(o.optionValue)"></div></div>
                </div>
              </div>
              <div class="pa-ans" v-if="showType!='test'&&showType!='view'">正确答案：{{qp.answer}}&nbsp;&nbsp;&nbsp;&nbsp;学生答案：<span
                v-if="!qp.userAnswerResul">未作答</span><span v-if="!!qp.userAnswerResul">{{qp.userAnswerResul}}</span>
              </div>
              <div class="pa-ana" v-if="showType!='test'&&showType!='view'&&(qp.quesAnalyze&&qp.quesAnalyze.length>0)">
                解析：
                <div class="bhtml" v-for="a in qp.quesAnalyze"><span v-if="a.analyzeKey">{{a.analyzeKey}}</span>
                  <div class="bhtml" v-html="strUrlChange(a.analyzeValue)"></div>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div v-if="parseInt(q.itemType) ==5||parseInt(q.itemType) ==4" class="pa-per">
          <div class="pa-name">{{changeBigIndex(bigI)}}、{{q.itemContent}}（{{q.itemScore}}分）</div>
          <template v-for="qp in q.list">
            <div class="pa-q">
              <div class="pa-stem"><span>{{qp.questionNo}}.  </span>
                <div class="bhtml" v-html="strUrlChange(qp.stem)"></div>
              </div>
              <div class="pa-ans" v-if="showType!='test'&&showType!='view'">正确答案：
                <div class="bhtml" v-html="maybeArr(qp.answer)"></div>
              </div>
              <div class="pa-ana" v-if="showType!='test'&&showType!='view'&&(qp.quesAnalyze&&qp.quesAnalyze.length>0)">
                解析：
                <div class="bhtml" v-for="a in qp.quesAnalyze"><span v-if="a.analyzeKey">{{a.analyzeKey}}</span>
                  <div class="bhtml" v-html="strUrlChange(a.analyzeValue)"></div>
                </div>
              </div>
              <div class="pa-selfCheck" v-if="showType != 'test'&&showType!='view'">
                <i class="el-icon-success" :class="{success:qp.markQuestionResult}"               @click="checker(qp,1)" v-if="showType=='judge'||(qp.markQuestionResult)"></i>
                <i class="el-icon-error" :class="{danger:(!qp.markQuestionResult&&qp.markQuestionResult!=null)||(showType!='judge'&&!qp.markQuestionResult)}" @click="checker(qp,0)" v-if="showType=='judge'||!(qp.markQuestionResult)"></i>
              </div>
            </div>
          </template>
        </div>

        <div v-if="q.itemType==6" class="pa-per" :class="{simple:q.simple}">
          <div class="pa-name">{{changeBigIndex(bigI)}}、{{q.itemContent}}（{{q.itemScore}}分）</div>
          <template v-for="qp in q.list">
            <div class="pa-q" :class="{simple:qp.allSimple}">
              <div class="pa-stem"><span>{{qp.questionNo}}.  </span>
                <div class="bhtml" v-html="strUrlChange(qp.stem)"></div>
              </div>
              <template v-for="cq in qp.componentQuestions">
                <div class="pa-q" :class="{simple:cq.type==1||cq.type==2||cq.type==3}">
                  <div class="pa-stem"><span>{{cq.questionNo}}.  </span>
                    <div class="bhtml" v-html="strUrlChange(cq.stem)"></div>
                  </div>
                  <div class="pa-select" v-if="cq.type==1||cq.type==2||cq.type==3">
                    <div class="pa-opt" @click="selectOne(cq,o)" v-for="o in cq.quesOption" :class="{focus:o.focus}">
                      <div class="op-txt">{{o.optionKey}}&nbsp;&nbsp;<div class="bhtml"  v-html="strUrlChange(o.optionValue)"></div></div>
                    </div>
                  </div>
                  <div class="pa-ans" v-if="showType!='test'&&showType!='view'">正确答案：
                    <div class="bhtml" v-html="maybeArr(cq.answer)"></div><span v-if="cq.type==1||cq.type==2||cq.type==3">&nbsp;&nbsp;&nbsp;&nbsp;学生答案：<span
                      v-if="!cq.userAnswerResul">未作答</span><span v-if="!!cq.userAnswerResul">{{cq.userAnswerResul}}</span></span>
                  </div>
                  <div class="pa-ana" v-if="showType!='test'&&showType!='view'&&(cq.quesAnalyze&&cq.quesAnalyze.length>0)">
                    解析：
                    <div class="bhtml" v-for="a in cq.quesAnalyze"><span v-if="a.analyzeKey">{{a.analyzeKey}}</span>
                      <div class="bhtml" v-html="strUrlChange(a.analyzeValue)"></div>
                    </div>
                  </div>
                  <div class="pa-selfCheck" v-if="showType != 'test'&&(cq.type==4||cq.type==5)&&showType!='view'">
                    <i class="el-icon-success" :class="{success:cq.markQuestionResult}"               @click="checker(cq,1)" v-if="showType=='judge'||(cq.markQuestionResult)"></i>
                    <i class="el-icon-error" :class="{danger:!cq.markQuestionResult&&cq.markQuestionResult!=null||(showType!='judge'&&!qp.markQuestionResult)}" @click="checker(cq,0)" v-if="showType=='judge'||!(cq.markQuestionResult)"></i>
                  </div>
                </div>
              </template>
            </div>
          </template>
        </div>

      </template>
    </template>
  </div>
</template>

<script>
  export default {
    name: "paper-analysis",
    props: ["paper", "showType"],
    data() {
      return {
        // showType:"" //view-只看题干和选项（不显示答案和解析），test-做卷（可选择）；judge-判卷（只显示主观题及其答案和解析，并且可选择对错）；analysis-解析（显示所有题型和解析，选项不可选择）；
      }
    },
    created() {

    },
    watch: {
      showType: function (newer, old) {
        if (newer === "judge") {
          this.hideObjective(1);
        } else if (old === "judge") {
          this.hideObjective(0);
        }
      }
    },
    methods: {
      hideObjective: function (a) { //a==1隐藏/1==0显示  客观题
        let b = a === 1;

      },
      checker(q, r) {
        this.$set(q, "markQuestionResult", r === 1);
      },
      changeBigIndex(i) {
        let big = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
        if (i < 10) {
          return big[i];
        } else if (i < 20) {
          return big[9] + big[i - 9];
        }
        return i;
      },
      selectOne(q, o) {
        if(this.showType!="test")return ; //不判卷无效果
        if (q.type == 2) {  //多选
          this.$set(o, "focus", !o.focus);
          let a = "";
          for (let i = 0; i < q.quesOption.length; i++) {
            if (q.quesOption[i].focus) {
              a += q.quesOption[i].optionKey;
            }
          }
          this.$set(q, "userAnswerResul", a);
        } else { //单选
          for (let i = 0; i < q.quesOption.length; i++) {
            this.$set(q.quesOption[i], "focus", false);
          }
          this.$set(o, "focus", true);
          this.$set(q, "userAnswerResul", o.optionKey);
        }
      },
      maybeArr(str){ // 处理正确答案可能是个数组
        try{
          if(!str)return " ";
          let arr = JSON.parse(str);
        //  console.log("arr",arr);
          let b = "";
          for(let i = 0; i < arr.length; i++){
            b+=this.strUrlChange(arr[i].answerValue||"")+"&nbsp;&nbsp;";
          }
          return b;
        }catch (e){
          return this.strUrlChange(str);
        }
      },
      strUrlChange(str) {
        if (!str || typeof  str != "string") return "";
        return str.replace(/http:\/\/.*?\.(mp3|jpg|jpeg|png|gif)/ig, function (w) {
          if (/mp3$/i.test(w)) {
            return '<audio src="' + w + '" controls/>'
          } else {
            return '<img class="media-middle" style="vertical-align: middle;max-width: 100%;" src="' + w + '"/>'
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">

  .pa.test {
    .pa-opt {
      cursor: pointer;

      .op-txt{
        display: inline-block;
        padding: 3px 8px;
        border-radius: 3px;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
      }
      &:hover .op-txt{
        background-color: #82C6FF;
      }
      &.focus .op-txt{
        background-color: #409eff;
      }
    }
  }

  .pa.analysis, .pa.judge, .pa.ans {
    .pa-selfCheck {
      .ok {
        &.checked, &:hover {
          background-color: #009926;
          color: #ffffff;
        }
      }
      .err {
        &.checked, &:hover {
          background-color: #990000;
          color: #ffffff;
        }
      }
    }
  }

  .pa-q {
    padding-right: 66px;
    margin-top: 20px;
    .pa-q {
      margin-left: 30px;
    }
  }

  .pa-per {
    margin-top: 20px;
    img {
      max-width: 100%;
      display: inline-block;
      vertical-align: middle;
    }
    color: #333333;
    .bhtml {
      display: inline;
      line-height: 1.5em;
    }
    .pa-name {
      font-size: 16px;
      padding: 10px 0;
    }
    .pa-stem {
      font-size: 20px;
      vertical-align: middle;
      display: block;
    }
    .pa-select {
      padding: 10px 0;
    }
    .pa-opt {
      font-size: 16px;
      display: inline-block;
      box-sizing: border-box;
      padding-left: 10px;
      padding-right: 5px;
      padding-top: 4px;
      padding-bottom: 4px;
      margin-top: 5px;
      border-radius: 4px;
      min-width: 50%;
    }
    .pa-ana {
      padding: 10px 0;
      box-sizing: border-box;
      padding-left: 20px;

    }
    .pa-ans {
      padding-top: 10px;
      box-sizing: border-box;
      padding-left: 20px;
    }
    .pa-q {
      position: relative;
      z-index: 1;
      display: block;
      clear: both;
    }
    .pa-selfCheck {
      position: absolute;
      right: 10px;
      top: 0;
      bottom: 0;
      width: 50px;
      z-index: 10;
      .el-icon-success, .el-icon-error {
        font-size: 20px;
        display: inline-block;
        float: left;
      }
      .el-icon-error{
        margin-left: 8px;
      }
    }
    .el-icon-success.success {
      color: #67C23A;
    }
    .el-icon-error.danger {
      color: #F56C6C;
    }
  }
  .pa.judge{
    .el-icon-success, .el-icon-error {
      cursor: pointer;
    }
    .simple{
      display: none;
    }
  }
</style>
