<template>
    <div>
      <commonTitle :ifBack="goType==1">
        出门考&nbsp;|&nbsp;{{paperName}}
      </commonTitle>
      <!--试题view-->
      <all-paper :paperData="paperQuestionQuery" :paperNum="isPaperNum"></all-paper>
      <!--全部提交-->
      <el-row type="flex" class="row-bg" justify="center" v-if="goType==2">
        <el-col :span="2">
          <el-button type="success"  @click="commitAllMarkPaper">提交并查看测评报告</el-button>
        </el-col>
      </el-row>
      <el-dialog
        :title=paperName
        :visible.sync="centerDialogVisible"
        width="60%" :closeOnClickModal="false" :showClose="false"
        center>
        <all-paper :paperData="paperQuestionQuery2" :paperNum="isPaperNum2" :paperlist="paperlist"></all-paper>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click=" closeDialogVisible()">结 束</el-button>
        </span>
      </el-dialog>
    </div>

</template>
<script>
  import allPaper  from '../teachResearch/checkPaper/allTypePaperShow.vue';
  import { Loading } from 'element-ui';
  export default {
      components: {allPaper},
        props: {},
        mounted() {
        },
        data() {
            return {
              paperName:this.$route.query.paperName,
              results: [],
              paperQuestionQuery: [],//试卷信息
              paperQuestionQuery2: [],//报告信息
              isPaperNum:"",
              isPaperNum2:3,
              paperlist:{},
              goType:this.$route.query.goType,
              centerDialogVisible: false,
              //widthChange:'80%'
            }
        },
        methods: {
          PaperNum(){
            if(this.goType==2){
              this.isPaperNum=2;
             return;
            }
            this.isPaperNum=1
          },
          /*关闭报告弹窗*/
          closeDialogVisible(){
            this.$router.go(-1);
            this.centerDialogVisible = false
          },
         getSendAnswer (allQuestionList)  {
            let markAnswers = [];
            allQuestionList.forEach(item => {
              markAnswers.push(...getMarkAnswers(item));
            })
            return markAnswers;

            function getMarkAnswers(questionWrap) {
              let temp = [];
              try {
                questionWrap.typeList.map(questionTypeWrap => {
                  questionTypeWrap.list.map(question => {
                    temp.push(...getOneMarkAnswer(question, questionWrap.type));
                  })
                })
              } catch (e) {
                // console.log('类型' + questionWrap.type + '获取老师判卷有问题')
                // console.log(e)
              }
              return temp;
            }

            function getOneMarkAnswer(question, type) {
              if (type == 6) {
                return question.componentQuestions.reduce((result, item) => {
                  return result.concat(makeMarkAnswer(item, question));
                }, [])
              } else {
                return makeMarkAnswer(question);
              }
            }

            function makeMarkAnswer(question, questionWrap) {
              //console.log(JSON.stringify(question))
//             if (!question.isImg) return [];
              let markResult = !question.basetree.some(treeWrap => {
                return treeWrap.sons.some(tree => !tree.isRight)
              });
              question.basetree.map(
                basetreeWrap => {
                  basetreeWrap.sons.map(tree => {
                    question.tree.map(treeWrap => {
                      let temp = treeWrap.sons.find(i => i.idVo == tree.idVo);
                      temp && (temp.isRight = tree.isRight);
                    })
                  })
                }
              )

              return [{
                "questionScore": question.score,
                "answerRecordCode": question.answerRecordCode,
                "baseProduction": JSON.stringify(question.basetree),
                "productionKnowledge": JSON.stringify(question.tree),
                "complexQuestionCode": question.isComplex ? question.id : null,
                "isComplex": question.isComplex,
                "markResult": +markResult,
                "questionCode": question.isComplex ? questionWrap.id : question.id,
                "score": question.teacherScore,
              }]
            }

          },
          /*查看试卷*/
          lookPaper(){
            var paperCode=this.$route.query.id;
            this.$axios
              .post("/teacher/rescours/getResourcePaper", {"paperCode":paperCode})//"ff80808163b0ab4b0163cea9f5731915"
              .then(({result, httpCode}) => {
                if (httpCode === '200') {
                  if (result) {
                    this.dialogPaperDetail = true;
                    this.$set(this, 'paperQuestionQuery', this.resolveQuestion(result.paperSystemQusetionType || []));
                    this.$set(this, 'results', result);
                  }else{
                    this.$message({
                      type: 'info',
                      message: "该试卷暂无数据"
                    });
                  }
                }else{
                  this.$message({
                    type: 'info',
                    message: "获取试卷详情失败"
                  });
                }
              })
              .catch(err => {
                this.$message({
                  type: 'info',
                  message: "获取试卷详情失败"
                });
              });
          },
          /*锁定*/
          canSend() {
            return !this.paperQuestionQuery.some(allQuestionWrap => {
              return allQuestionWrap.typeList.some(questionType => {
                return questionType.list.some(question => {
                  if (allQuestionWrap.type == 6) {
                    return question.componentQuestions.some(componentQuestion => {
                      return checkQuestion.bind(this)(componentQuestion)
                    })
                  } else {
                    return checkQuestion.bind(this)(question)
                  }
                })
              })
            })
            function checkQuestion(question) {
              //不需要判题
              //if (!question.isImg) return false;
              //未打分
              if (question.teacherScore === '') {
                this.$message("请全部打分后再提交");
                return true;
              }
              //未锁定
              if (!question.isLock) {
                this.$message('全部试题锁定后才能提交,请锁定全部判卷!');
                return true;
              }
              //默认
              return false;
            }

          },
          /*提交判卷*/
          commitAllMarkPaper() {
            if (this.canSend()) {
              let {results: {totalScore, id}} = this;
              let {studentDiagnosisRecordCode} = this.$route.query;
              let answerWrap = this.getSendAnswer(this.paperQuestionQuery);
              let user = this.$$user();
              answerWrap.forEach(i => {
                i.diagnosisRecordCode = studentDiagnosisRecordCode;
                i.teacherCode = user.userId;
                i.teacherName = user.userName;
              })
              let send = {
                "agencyStudentSubjectLevelCode":this.$route.query.leveCode,
                "sectionCode":this.$route.query.sectionCode,
                "userCode":this.$route.query.userCode,
                "userName":this.$route.query.userName,
                "markQuestionList": answerWrap,
                "paperScore": totalScore,
                "resourcePaperCode": id
              };
              this.loading = Loading.service();
              this.$axios.post('/agency/saveAgencyMarkPaper',send)
                .then(({ result, httpCode }) => {
                  this.loading.close();
                  if (httpCode === '200') {
                    this.centerDialogVisible=true;
                    this.GetAgencyMarkResult();
                    return;
                  } else {
                    this.$message('提交失败');
                  }
                })
                .catch((err) => {
                  this.loading.close();
                  this.$message({
                    type: 'info',
                    message: '提交失败'
                  });
                })
            }
          },
          GetAgencyMarkResult(){
            let sendData = {
              sectionCode: this.$route.query.sectionCode,
              subjectCode: this.$route.query.subjectCode,
              userCode:this.$route.query.userCode,//学生code
              resourcePaperCode:this.$route.query.id
              // resourcePaperCode: "ff80808163b0ab4b0163cea9f5731915"
            };
            //console.log(sendData)
            this.$axios
              .post("/agency/getAgencyMarkResult", sendData)
              .then(({ httpCode, result }) => {
                //console.log(result);
                if (result) {
                  this.$set(
                    this,
                    "paperQuestionQuery2",
                    this.resolveQuestion(
                      result.paperSystemQusetionType || [],
                    )
                  );
                  this.paperlist = result;
                  //console.log(this.paperlist);
                }
              })
              .catch(error => {
                this.$message("获取失败");
              });
          },
          isFinish(){
            var isful=this.$route.query.isFinish;
            //console.log(typeof (isful))
            if(isful==1){
              this.centerDialogVisible=true;
              //this.widthChange="100%";
              this.GetAgencyMarkResult();
              return;
            }
          }
      },
      created(){
        this.isFinish();
        this.lookPaper();
        this.PaperNum()
      }
    }
</script>
<style scoped>

</style>
