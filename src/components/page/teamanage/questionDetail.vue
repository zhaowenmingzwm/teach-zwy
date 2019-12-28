<template>
    <div>
      <el-row>
        <el-col :span="24" class="detail-step">
          <el-steps :active="curIndex" finish-status="success">
            <el-step v-for="(item,index) in step" id="step" :key="index"></el-step>
          </el-steps>
          <div class="step-btn">
            <el-button  @click="goNext" type="primary">{{nextText}}</el-button>
            <el-button  @click="goBack" type="primary">返回</el-button>
          </div>
        </el-col>
        <el-col :span="24" class="detail-top">
          <dl>
            <dt><b v-html="curIndex+1>step?step:curIndex+1"></b><samp>/</samp><span>{{step||0}}</span></dt>
            <dd>
              <h4>{{StepCont.stepName}}</h4>
              <p>{{StepCont.stepDesc}}</p>
            </dd>
          </dl>
        </el-col>
        <el-col :span="24" class="question-main">
          <div class="question-top">
            <el-button type="primary" @click="isFlag=!isFlag">题干</el-button>
            <el-button type="primary" @click="isShow = true" style="float:right;">小节结构图</el-button>
            <!--<el-button type="primary" @click="videoReplay" style="float:right;width:auto">神笔回放</el-button>-->
            <el-dialog
              :visible.sync="isShow"
              width="80%"
              center>
              <img :src="subjectModel.lectureStructurePicture" alt="结构图"/>
            </el-dialog>
            <el-dialog
            :visible.sync="isPain"
            width="80%" custom-class="painBox" top="3vh"
            center>
              <iframe  frameborder=0 name="showHere" :src="iframeUrl" scrolling=auto  width="100%" height="820px;" ></iframe>
          </el-dialog>
          </div>
          <div v-if="isFlag" class="question-stem" :class="{changeWidth:isActive} ">
            <div v-html="strToUrl(subjectModel.stem)" class="question-con"></div>
            <div v-if="subjectModel.type!=6">
              <div v-for="(val,index) in strToObj(quesOption)" :key="index" v-if="quesOption.length">
                <span>{{val.optionKey}}</span> <span v-html="strToUrl(val.optionValue)">111</span>
              </div>
            </div>
            <div v-if="subjectModel.type==6" class="question-con">
              <div v-if="isTrue">
                <div v-for="value in componentQuestions">
                  <span v-html="strToUrl(value.stem)"></span>
                  <div v-for="(val,index) in strToObj(value.quesOption)" :key="index">
                    <span>{{val.optionKey}}</span> <span v-html="strToUrl(val.optionValue)"></span>
                  </div>
                </div>
              </div>
              <div v-if="!isTrue">
                <div v-html="strToUrl(componentQuestion.stem)" ></div>
                <div v-for="(val,index) in strToObj(componentQuestion.quesOption)" :key="index">
                  <span>{{val.optionKey}}</span> <span v-html="strToUrl(val.optionValue)"></span>
                </div>
              </div>
            </div>
          </div>
          <div class="question-content" :class="{xxkWidth:isActive,clickWidth:widthFlag} ">
            <div class="xxk-nav">
              <div>
                <button @click="widthBtn()" v-show="isClearBtn"> <i class="el-icon-caret-left"></i></button>
                <button @click="clearBtn()" v-show="isClearBtn" class="widthBtn"> <i class="el-icon-caret-right"></i></button>
              </div>
              <span @click="cBtn(0)" :class="{'cur':msg===0}">答案解析</span>
              <span @click="cBtn(1) " :class="{'cur':msg===1}" v-if="baseProductionModels.length">核心产生式</span>
              <span @click="cBtn(2)" :class="{'cur':msg===2}" v-if="productionModels">相关产生式</span>
              <span @click="cBtn(3)" :class="{'cur':msg===3}">试题结构图</span>
            </div>
            <div class="xxk-con" >
              <div v-show="msg===0">
                <div v-if="subjectModel.type==6">
                  <div v-if="isTrue">
                    <div v-for="(val,index) in componentQuestions" :key="index">
                      <samp class="questionTip" style="margin-bottom: 5px;">第{{index+1}}题</samp>
                      <div v-if="val.type==4"><span style="color: #409eff;">答案:</span>
                        <span v-for="(item,index) in strToObj(val.answer)" :key="index" class="basePro">
                         <span>{{(index+1)}}.</span> <span v-html="strToUrl(item.answerValue)"></span>
                        </span>
                      </div>
                      <div v-if="val.type!=4"><span style="color: #409eff;">答案:</span><span v-html="strToUrl(val.answer)"></span></div>
                      <div>
                        <span style="color: #409eff;">解析:</span><span v-for="(item,index) in strToObj(val.quesAnalyze)" :key="index">
                      <span>{{item.analyzeKey}}</span> <span v-html="strToUrl(item.analyzeValue)"></span>
                    </span>
                      </div>
                    </div>
                  </div>
                  <div v-if="!isTrue">
                    <div v-if="componentQuestion.type==4">答案:
                      <span v-for="(item,index) in strToObj(componentQuestion.answer)" :key="index" class="basePro">
                     <span>{{(index+1)}}.</span> <span v-html="strToUrl(item.answerValue)"></span>
                    </span>
                    </div>
                    <div v-else>答案: <span v-html="strToUrl(componentQuestion.answer)"></span></div>
                    <div>
                      试题解析:<span v-for="(item,index) in strToObj(componentQuestion.quesAnalyze)" :key="index">
                      <span>{{item.analyzeKey}}</span> <span v-html="strToUrl(item.analyzeValue)"></span>
                    </span>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div v-if="subjectModel.type==4">答案:
                    <span v-for="(item,index) in strToUrl(strToObj(subjectModel.answer))" :key="index" class="basePro">
                     <span>{{(index+1)}}.</span> <span v-html="strToUrl(item.answerValue)"></span>
                    </span>
                  </div>
                  <div v-else>答案: <span v-html="strToUrl(subjectModel.answer)"></span></div>
                  <div>
                    试题解析:<span v-for="(val,index) in strToObj(subjectModel.quesAnalyze)" :key="index">
                      <span>{{val.analyzeKey}}</span> <span v-html="strToUrl(val.analyzeValue)"></span>
                    </span>
                  </div>
                </div>
              </div>
              <div v-show="msg===1">
                <div  class="product-head">
                  <button  @click="GetProductionInfo(item.baseProductionCode,index)" v-for="(item,index) in baseProductionModels" :class="{active:index == num}"  v-if="item.baseProductionName">{{item.baseProductionName}}</button>
                  <div><samp>如果:</samp>
                    <span v-html="strToUrl(causeResult.causeDesc)" v-if="causeResult.causeDesc"></span><br/>
                    <samp>那么:</samp>
                    <span v-html="strToUrl(causeResult.resultDesc)" v-if="causeResult.resultDesc"></span></div>
                </div>

              </div>
              <div v-show="msg===2">
                <div  class="product-head">
                  <button  @click="GetProductionInfo(item.productionCode,index)" v-for="(item,index) in productionModels" :class="{active:index == num}" v-if="item.productionName">{{item.productionName}}</button>
                  <div><samp>如果:</samp>
                    <span v-html="strToUrl(causeResult.causeDesc)" v-if="causeResult.causeDesc"></span><br/>
                    <samp>那么:</samp>
                    <span v-html="strToUrl(causeResult.resultDesc)" v-if="causeResult.resultDesc"></span></div>
                </div>
              </div>
              <div v-show="msg===3">
                <img :src="subjectModel.questionStructurePicture" alt="试题结构图" class="pic" @click="isPic = true"  v-if="subjectModel.questionStructurePicture"/>
                <div v-else>没有试题结构图哦!!!!</div>
                <el-dialog
                  :visible.sync="isPic"
                  width="60%"
                  center>
                  <img :src="subjectModel.questionStructurePicture" alt="小节结构图" v-if="subjectModel.questionStructurePicture"/>
                </el-dialog>
              </div>
            </div>

          </div>
        </el-col>

      </el-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
             // active: 0, //步骤
              tabPosition: 'left',
              isActive:false,//控制样式
              //question:this.$route.query,
              baseProductionModels:[],//核心产生式
              productionModels:[],//相关产生式
              componentQuestion:{},//复合题小题
              componentQuestions:[],//复合题小题集合
              resourceId:'',
              subjectModel:{},
              isShow:false,
              isPic:false,
              isFlag:false,
              //flag:false,
              isClearBtn:false,
              widthFlag:false,
              isPain:false,
              //isAnswer:false,
              //production:false,
              //isAnaly:false,//小题解析
              //isProduct:false,//小题产生式
              step:'',//步骤长度
              StepList:[],//步骤集合
              StepCont:{},//当前步骤集合
              causeResult:{},//产生式的因果关系
              productCodes:[],//产生式code集合
              curIndex:0,
              nextText:'下一步',
              msg:-1,
              num:0,
              isTrue:this.$route.query.isTrue,
              quesOption:[],//其他题型的选项
              iframeUrl:"", //iframe路径
            }
        },
        methods: {
          /*点击神笔回放按钮*/
          videoReplay(){
            this.isPain = true;
            var urlItem = "";
            if (location.hostname == 'localhost') {
              urlItem = 'http://godtest.coolpen.net/';
            }else if(location.protocol=="file:"){
              urlItem = 'http://godtest.coolpen.net/'
            }else if(location.hostname == "diagnosismanagertest.e-eduwisdom.com"){
              urlItem = 'http://godtest.coolpen.net/'
            }else if(location.hostname == "diagnosismanager.e-eduwisdom.com"){
              urlItem = 'http://god.coolpen.net/'
            }else if(location.hostname == "demo.e-eduwisdom.com"){
              urlItem = 'http://goddemo.coolpen.net/'
            }
            this.iframeUrl = urlItem + "PCpage/index.html?code=" + it.code;
          },
          goBack(){
            this.$router.go(-1);
          },
          //收起
          clearBtn(){
            this.msg=-1;
            this.isActive=false;
            this.isClearBtn=false;
            this.widthFlag=false
          },
          //加宽
          widthBtn(){
            this.isActive=true;
            this.widthFlag=false
          },
          //字符串转换为数组
          strToObj(str){
            if(!str){return []};
            return JSON.parse(str)
          },
          //字符串分割为数组
          strToAry(str){
            if(!str){return []};
            return str.split('@');
          },
          //获取资源库小节内试题详情
          GetResourceSectionQuestion(){
            var that=this;
            this.$axios
              .get("/resource/getResourceSectionQuestion", {
                params: { //请求参数
                  'lectureId' :this.$route.query.lectureId,
                  'questionId':this.$route.query.resourceId
                }
              })
              .then(res => {
                var checkIndex=this.$route.query.index;
                var result = res.result;
                //console.log(result);
                this.subjectModel={
                  stem:result.stem,
                  type:result.type,
                  answer:result.answer,
                  lectureStructurePicture:result.lectureStructurePicture,
                  questionStructurePicture:result.questionStructurePicture
                  };
                  this.baseProductionModels=result.baseProductionModels;//核心产生式
                  this.productionModels=result.productionModels;//相关产生式
                if(this.subjectModel.type==6){
                  if(this.isTrue==0){
                    this.componentQuestion=result.componentQuestionModels[checkIndex];
                    console.log('1010')
                    console.log(this.componentQuestion)
                    //return;
                  }
                  this.componentQuestions=result.componentQuestionModels;//小题集合
                }else{
                  this.quesOption=result.quesOption;
                };
                //console.log(this.quesOption)
                 this.isQuestion();
              })
              .catch(err => {
                this.$message({
                  type: 'info',
                  message: "获取资源库小节内试题详情失败"
                });
              });
          },
          //判断是否为复合题
          isQuestion(){
            if(this.subjectModel.type==6){
              console.log(this.$route.query.isTrue);
              if(this.isTrue==1){
                this.resourceId=this.$route.query.resourceId;
              }else{
                this.resourceId=this.componentQuestion.id;
                //console.log(this.componentQuestion);
              }
            }else{
              this.resourceId=this.$route.query.resourceId
            }
            //console.log(this.resourceId);
           this.getAgencyResourceId(this.resourceId)
          },
          //获取试题教学流程步骤列表
          getAgencyResourceId(resourceId){
            var obj={
              "sectionCode":this.$route.query.sectionCode,
              "resourceId":resourceId
            };
            //console.log(obj)
            this.$axios
              .post('/agency/getAgencyTeachModelStepsBySectionCodeAndResourceId',obj)
              .then(res=>{
                var result=res.result || [];
                this.StepList=result;
               //console.log(this.StepList);
                this.step=this.StepList.length;
                this.CheckAgencySectionStepContent(resourceId)
              })
              .catch(err=>{
                this.$message({
                  type: 'info',
                  message: "获取试题教学流程步骤列表失败"
                });
              })

          },
          //验证当前步骤
          CheckAgencySectionStepContent(resourceId){
            //console.log(this.goType)
            var goType=this.$route.query.goType;
            //console.log(this.StepList[0]);
            var stepOneId=this.StepList[0].id;
            var teachStepSort=this.StepList[0].teachStepSort;
           // console.log(stepOneId);
            if(goType==2){
              var info={
                "userCode":this.$route.query.userCode,
                "userName":this.$route.query.userName,
                "userType":"11",
                "sectionCode":this.$route.query.sectionCode,
                "resourceid":resourceId,
                "teachStepSort":teachStepSort,
                "teachStepId":stepOneId,
                "roomId":this.$route.query.roomId,
              }
              this.$axios
                .post('/agency/checkAgencySectionStepContent',info)
                .then(res=>{
                  var result=res.result;
                  if(result.teachStepId && result.teachStepSort){
                    let stepIdList=this.StepList.map(item => {
                      return item.teachStepSort
                    });
                   this.curIndex=stepIdList.indexOf(result.teachStepSort);
                   console.log(this.curIndex);
                    console.log(result)
                    if(this.curIndex < 0){
                      this.curIndex=0
                    }else if((this.curIndex+1)==this.step){
                      this.nextText="完成";
                      if(result.stepEndTime!=null){
                        this.nextText="已结束";
                        this.curIndex+=1;
                        this.StepCont=this.StepList[this.curIndex-1];
                        return;
                      }
                    }
                  }else{
                    this.curIndex=0
                  }
                  this.StepCont=this.StepList[this.curIndex]
                  //this.curIndex+=1;
                })
                .catch(err=>{
                  this.$message({
                    type: 'info',
                    message: "获取试题步骤记录失败"
                  });
                })
            }else{
              this.curIndex=0;
              this.StepCont=this.StepList[this.curIndex]
            }
          },
          //选项卡
          cBtn(num){
            this.widthFlag=true;
            this.isClearBtn=true;
            this.msg = num;
            if(num ==1||num==2){
              this.causeResult = {};
              if(num==1){
               this.GetProductionInfo(this.baseProductionModels[0].baseProductionCode,0)
              }else if(num==2){
                this.GetProductionInfo(this.productionModels[0].productionCode,0)
              }

            }
          },
          //获取相关产生式因果关系
          GetProductionInfo(code,index){
            this.num = index;
            this.$axios.get('/resource/getProductionInfo',{
              params:{'productionCode':code}
            }).then(res=>{
              //console.log(res.result);
              if(res.result){
                this.causeResult=res.result;
              }
            }).catch(err=>{
              console.log(err);//发生错误时执行的代码
            })
          },
          //点击下一步
          goNext(){
            //if (this.curIndex++ > 2) this.active = 0;
            if(this.curIndex<this.step){
              //console.log(this.curIndex);
              if(this.$route.query.goType==2){
                var nextInfo={
                  "userCode":this.$route.query.userCode,
                  "userName":this.$route.query.userName,
                  "userType":"11",
                  "sectionCode":this.$route.query.sectionCode,
                  "resourceId":this.resourceId,
                  "teachStepSort":this.StepList[this.curIndex].teachStepSort,
                  /*"resourceType":this.$route.query.resourceType,*/
                  "teachStepId":this.StepList[this.curIndex].id,
                };
                //console.log(nextInfo)
                if((this.curIndex+2)==this.step){
                  nextInfo.nextTeachStepId=this.StepList[this.curIndex+1].id;
                  nextInfo.nextTeachStepSort=this.StepList[this.curIndex+1].teachStepSort;
                }else if((this.curIndex+1)==this.step){
                  this.nextText="已结束";
                  nextInfo.nextTeachStepId=null;
                  nextInfo.nextTeachStepSort=null;
                }else{
                  nextInfo.nextTeachStepId=this.StepList[this.curIndex+1].id;
                  nextInfo.nextTeachStepSort=this.StepList[this.curIndex+1].teachStepSort;
                }
                this.$axios
                  .post('/agency/nextStepAgencySectionStepContent',nextInfo)
                  .then(res=>{
                    if(res.result){
                      //console.log('记录下一步成功');
                    }
                  })
                  .catch(err=>{
                    this.$message({
                      type: 'info',
                      message: "获取试题步骤记录失败"
                    });
                  })
              }
              this.curIndex=this.curIndex+1;
              this.StepCont=this.StepList[this.curIndex];
              if((this.curIndex+1)==this.step){
                this.nextText="完成";}
              else if((this.curIndex)==this.step){
                this.StepCont=this.StepList[this.curIndex-1]
                this.nextText="已结束";}
              /*if(this.curIndex>this.step-1){
                this.curIndex>this.step-1
              }*/
            }else{
              this.$message({
                type: 'info',
                message: "步骤已走完"
              });
            }

          },
          //添加神笔回放
          /*goPain(){
            this.localData.set('PainUrl', 'http://bluebookmobile.coolpen.net/PCpage/index.html?code=10004');
            const {href} = this.$router.resolve({
              path: "/goPaintbrush"
            });
            window.open(href, '_blank');
          },*/
        },
      created(){
        this.GetResourceSectionQuestion();
      }
    }
</script>
<style scoped>
  .el-dialog__body img,.pic{max-width:100%;
    margin:0 auto;
    display: block;}
  .el-main{background-color: #f3f7fd!important;}
  .detail-step{border-bottom:1px solid #d6e1f1;
    padding:18px 0;}
  .detail-top{ padding:24px 0;border-bottom:1px solid #d6e1f1; }
.el-steps{width:80%;
  float: left;}
  .step-btn{
    float: right;}

.detail-top dl{
  width:100%;}
  .detail-top dt{
    float: left;
    height:58px; border-radius: 5px; background: #409eff;
    color: #fff;
    line-height:58px; min-width:58px; text-align:center;
    padding:0 5px;
    font-size:30px;
    position: relative;
    margin-right:14px;}
  .detail-top dt samp{color: #a8d3ff;font-size:40px;

  }
  .detail-top dt span{
    color: #a8d3ff;font-size: 14px;margin-left: -6px;  }
  .detail-top dd{
    overflow: hidden;}
  .detail-top dd h4{
    color: #333;
    font-size:20px;
    line-height:30px;}
  .detail-top dd p{
    font-size: 16px;
    color: #666;
    line-height:26px;
  }
  .question-main{
    margin-bottom:30px!important;
    line-height:20px!important;}
  .question-top{
    padding-top:24px;
    width:100%;
    height:76px;
    overflow: hidden;}
  .question-top .el-button{
    margin-bottom: 10px;
    width:190px;
  }
  .question-content{
    height:auto;
    overflow: hidden;
    float: right;

  }
  .clickWidth{width:35%;}
  .question-content .xxk-nav{
    width:40px;
    float: left;
    animation: hideIndex 0.3s;
    -moz-animation: hideIndex  0.3s; /* Firefox */
    -webkit-animation: hideIndex  0.3s; /* Safari and Chrome */
    -o-animation: hideIndex  0.3s; /* Opera */
  }
  .xxk-nav div{
    height:40px;margin-bottom: 10px;
    animation: hideIndex 0.3s;
    -moz-animation: hideIndex  0.3s; /* Firefox */
    -webkit-animation: hideIndex  0.3s; /* Safari and Chrome */
    -o-animation: hideIndex  0.3s; /* Opera */
  }
  .xxk-nav button{
    width:20px;
    height:40px;
    float: left;
    border-top-left-radius: 8px;border-bottom-left-radius: 8px;
  background-color:#409eff;border:none;
    color: #fff; font-size: 20px;
   }
  .xxk-nav button.widthBtn{
    border-radius:0;
  }
.xxk-nav span{
  margin-bottom: 16px;display: -webkit-flex;cursor: pointer;
  display: flex;
  -webkit-align-items: center;
  align-items: center;border-top-left-radius: 8px;border-bottom-left-radius: 8px;
  -webkit-justify-content: center;
  justify-content: center;
  width:24px;
  height:120px; text-align: center;background: #b3c0d1;
  color: #fefefe; font-size: 16px;
  padding:0 8px;
  user-select:none;
  animation: hideIndex 0.3s;
  -moz-animation: hideIndex  0.3s; /* Firefox */
  -webkit-animation: hideIndex  0.3s; /* Safari and Chrome */
  -o-animation: hideIndex  0.3s; /* Opera */
}
  .question-content .xxk-con{
    font-size: 16px;
    float: left;
    height:auto;
    border-left:1px solid #a8d3ff;
    width:85%;
  }
  .question-content .xxk-con>div{
    width:100%;
    padding:20px;box-sizing: border-box;
    min-height:554px;
    animation: hideIndex 0.3s;
    -moz-animation: hideIndex  0.3s; /* Firefox */
    -webkit-animation: hideIndex  0.3s; /* Safari and Chrome */
    -o-animation: hideIndex  0.3s; /* Opera */
  }
  .xxkWidth {width:60%;}
  /*.xxkWidth .xxk-con{
    width:85%;}
  .xxkWidth .xxk-con>div{
    width:100%;}*/
.product-head{
  width:100%;
}
  .product-head div{
font-size: 20px;
    line-height:30px;
  }
.product-head div samp,.questionTip{
  line-height:30px;
  width:50px;
  background: #409eff;
  color: #fff;border-radius: 5px;margin-right: 6px;
  padding:0 10px;display: inline-block;
  height:30px;font-family: "Microsoft Yahei", sans-serif;
}
.product-head button{
  padding:0 10px;
  height:40px;
  line-height:40px;
  background-color: #b3c0d1;border:none; border-radius: 8px;font-size: 16px;
  color: #fefefe;
  margin:0 10px 20px 0;
}
  .product-head button:last-child{margin-bottom: 0}

  .xxk-nav span.cur,.product-head button.active{
    background-color: #409eff;
  }
  @keyframes hideIndex{
  0%{ opacity: 0; transform: translate(800px, 0) }
  100%{opacity: 1; transform: translate(0, 0) }
  }

  .basePro{display:inline-block;margin-right:10px;}

  .question-main{
    margin-bottom:30px;
    line-height:20px;}
  .question-main>.el-button{
    margin-bottom: 10px;
  }
  .question-con{
    margin-bottom: 40px;font-size: 20px;line-height: 30px;  }
  .questionTop button{
    box-sizing: border-box;
    padding:12px 20px;
    border-radius: 4px;font-size: 14px;
    transition:.1s;
    outline:0;
    cursor: pointer;
    line-height: 1;
   background-color: #ecf5ff;
    color: #409EFF;
    border:1px solid #b3d8ff;
  }
  .questionTop button.is-plain{
    background-color: #409EFF;
    border-color: #409EFF;
    color: #fff;
  }
  .questionTop2{
    position: static;
    margin-bottom:10px;
  }
  .questionTop2 button{
    padding:10px 12px;
  }
  .el-tag{
    margin-right: 6px; cursor: pointer}
.small-question{
  position: relative;
  display: block;
  width:100%;
  height:auto;}
.mar10{
  margin-bottom: 10px;
}
  .row-bg{
    padding-top:50px;}
  .question-stem{
    width:60%;
    float: left;}
  .changeWidth{width:35%}
</style>
<style>
  .painBox{
    height:900px;}
  input,button,select,textarea{outline:none;}
  button{user-select:none;cursor: pointer}
 .el-step__line{background-color: #b3c0d1;}
 .el-step__icon{
   width:30px;
   height:30px;
   color: #fff;
   border:none;
   font-size:16px;
 }
 .el-step.is-horizontal .el-step__line{
   top:15px;
   color: #409EFF;
 }


 .el-step__icon.is-text{
   border:none;background: #b3c0d1;
 }
 .el-step__head.is-success{
   color:#fff;
 }
 .is-success .el-step__icon{
   background-color:#409EFF;
   color:#fff;
 }
 .el-step__head.is-success{
   border-color: #409EFF;
 }
  .el-dialog__headerbtn{
    font-size:30px;
    top:14px;
  }
  .question-stem p,.question-stem span{
    line-height: 30px !important;
    font-size: 20px !important;
    color: #000 !important;
    font-family:'microsoft yahei'!important;
  }
</style>
