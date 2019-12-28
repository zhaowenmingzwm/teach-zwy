<template>
  <!-- 练习题 -->
  <div class="feedBack-content">
    <!-- <div class="breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/learningCenter' }">学习中心</el-breadcrumb-item>
        <el-breadcrumb-item>方案反馈</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
    <report-nav></report-nav>
    <div class="table-content">
      <el-table
        :data="feedBackObj"
        :span-method="objectSpanMethod"
        border
        :header-row-class-name="getRowClass"
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column prop="time" label="时间安排" width="180"></el-table-column>
        <el-table-column prop="document.title" label="深度解构题"></el-table-column>
        <el-table-column prop="execise" label="练习题">
          <template slot-scope="scope">
            <span
              v-if="scope.row.execise.id"
            >练习{{scope.row.execise.index || scope.row.num+1 }} ({{scope.row.execise.score}})分</span>
            <span v-if="!scope.row.execise.id">--</span>
          </template>
        </el-table-column>
        <el-table-column prop="amount2" label="完成情况">
          <template slot-scope="scope">
            <div v-if="!scope.row.execise.id">--</div>
            <div v-if="scope.row.execise.id&&scope.row.execise.type!=5">
              <span
                class="icon no"
                @click="chooseIcon(scope.row,scope.$index,1)"
                :class="{active:scope.row.finish==1}"
              ></span>
              <span
                class="icon yes"
                @click="chooseIcon(scope.row,scope.$index,2)"
                :class="{active:scope.row.finish==2}"
              ></span>
            </div>
            <div v-if="scope.row.execise.id&&scope.row.execise.type==5" style="cursor:pointer">
              <span
                v-if="!scope.row.finish&&!scope.row.isShowInput"
                @click="writeScore(scope.row,scope.$index)"
              >请填写分数</span>
              <span
                v-if="scope.row.finish&&!scope.row.isShowInput"
                @click="writeScore(scope.row,scope.$index)"
              >{{scope.row.finish}}</span>
              <el-input
                v-model="scope.row.finish"
                placeholder="请输入内容"
                v-if="scope.row.isShowInput"
                @blur="blurInput(scope.row,scope.$index)"
              ></el-input>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="upImg">
      <p>上传图片</p>

      <el-upload
        :action="regionURL"
        accept="image/jpeg, image/gif, image/png"
        :data="postData"
        :on-success="handleAvatarSuccess"
        :on-error="handleerror"
        :before-upload="beforeAvatarUpload"
        :file-list="fileList"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt>
      </el-dialog>
      <!-- <div class="uploadImg">
        <el-button @click="upPicture">上传</el-button>
      </div> -->
    </div>
  </div>
</template>

<script>
import reportNav from "@/components/page/report/reportNav.vue";

import { genUpToken } from "../../../../static/js/qiniuToken.js";
export default {
  data() {
    return {
      feedBackObj: [], //方案反馈数据
      spanArr: [],
      dialogImageUrl: "",
      dialogVisible: false,
      postData: {}, //图片上传
      token: "1212121212",
      formData: [],
      fileList: [],
      regionURL: "",
    };
  },
  components: {
    reportNav
  },
  created() {
    console.log(this.region);
    this.regionURL = this.region;
    this.routeItem = this.$route.query;
    this.getFeedBack();
    this.getToken();
    this.getFeedbackPictures(); // 获取反馈图片
  },
  mounted() {},
  methods: {
    /*选择对错*/
    chooseIcon: function(item, index, num) {
      var $this = this;
      var obj = {
        evaluationRecordId: this.routeItem.id,
        knowledgeCode: item.execise.knowledgeCode,
        questionId: item.execise.id,
        userScore: num == 2 ? item.execise.score : 0
      };
      this.$axios
        .post(this.baseURL + "/fillPromotionPlanFeedbackTable", obj)
        .then(({ code }) => {
          if (code == "000000") {
            $this.$set($this.feedBackObj[index], "finish", num);
            this.$message("操作成功");
          } else {
            this.$message("操作失败");
          }
        });
    },
    /*获取七牛图片token*/
    getToken() {
      var token;
      var policy = {};
      var bucketName = this.qiniuSpaceURL;
      var AK = "5Nt5ZRgLSrIj8ywvVjqCZvep3dg-Zu9H0321EDiH";
      var SK = "2RekRSQxy72knJjTd4vZZsuqyndLkUijmci7pdUG";
      var deadline = Math.round(new Date().getTime() / 1000) + 3600;
      policy.scope = bucketName;
      policy.deadline = deadline;
      token = genUpToken(AK, SK, policy);
      this.postData.token = token;
      // console.log(this.postData);
      this.token = token;
    },
    // 获取反馈图片接口
    getFeedbackPictures() {
      const obj = {
        evaluationRecordCode: this.routeItem.id
      }
      this.$axios
        .post(this.baseURL + "/promotionPlan/getFeedbackPictures", obj)
        .then((res) => {
          res.feedbackPictures.forEach((item) => {
            this.fileList.push({url: item.pictureUrl})
          });
        });
    },
    // 图片上传失败
    handleerror(err) {
      console.log(err);
       this.$message({
          type: "error",
          message: "上传失败，请刷新页面重试！"
        });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    //上传图片
    handleAvatarSuccess(res, file) {
      //this.course.imageUrl = URL.createObjectURL(file.raw);
      this.dialogImageUrl = "http://" + this.qiniuURL + res.key;
      this.formData.push({
        pictureUrl: this.dialogImageUrl,
        feedbackDate: new Date().getTime()
      });
      this.upPicture();
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/gif" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 图片 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    // 上传图片接口
    upPicture() {
      const id = localStorage.getItem('paperBox') ? JSON.parse(localStorage.getItem('paperBox')).evaluationRecordId : JSON.parse(localStorage.getItem('paperBox')).evaluationRecordId;
      if (!id) return;
      let params = {
        evaluationRecordCode: id,
        feedbackPictures: this.formData
      };
      console.log(params);
      this.$axios
        .post("/promotionPlan/appendFeedbackPicture", params)
        .then(res => {
          if (res.code == "000000") {
            this.$message({
              type: "success",
              message: "上传成功"
            });
          }
        });
    },
    /*主观题选中*/
    writeScore: function(item, index) {
      var $this = this;
      $this.$set($this.feedBackObj[index], "isShowInput", true);
    },
    blurInput: function(item, index) {
      var $this = this;
      var obj = {
        evaluationRecordId: this.routeItem.id,
        knowledgeCode: item.execise.knowledgeCode,
        questionId: item.execise.id,
        userScore: item.finish || null
      };
      this.$axios
        .post(this.baseURL + "/fillPromotionPlanFeedbackTable", obj)
        .then(({ code }) => {
          if (code == "000000") {
            $this.$set($this.feedBackObj[index], "isShowInput", false);
            this.$message("操作成功");
          } else {
            this.$message("操作失败");
          }
        });
    },
    /*合并单元格*/
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 2 || columnIndex === 3) {
        if (this.spanArr[rowIndex]) {
          return {
            rowspan: this.spanArr[rowIndex],
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    /*获取方案反馈数据*/
    getFeedBack: function() {
      var $this = this;
      var obj = {
        evaluationRecordId: this.routeItem.id
      };
      this.$axios
        .post(this.baseURL + "/getPromotionPlanFeedbackTable", obj)
        .then(({ promotionPlanFeedbacks }) => {
          if (promotionPlanFeedbacks && promotionPlanFeedbacks.length != 0) {
            // var obj = [
            //   {"time": "第1天",
            //     "document": "[{\"id\":\"faeed414abe74d939aa14cc818862941\",\"title\":\"test0001\",\"url\":\"http://file.resource.e-eduspace.com/tes111t.docx\"},{\"id\":\"faeed414abe74d939aa14cc818862941\",\"title\":\"test0001\",\"url\":\"http://file.resource.e-eduspace.com/tes111t.docx\"},{\"id\":\"faeed414abe74d939aa14cc818862941\",\"title\":\"test0001\",\"url\":\"http://file.resource.e-eduspace.com/tes111t.docx\"}]",
            //     "execise": "[]",
            //     "finish": null
            //   },
            //   {
            //     "time": "第2天",
            //     "document": "[{\"id\":\"faeed414abe74d939aa14cc818862941\",\"title\":\"test0001\",\"url\":\"http://file.resource.e-eduspace.com/tes111t.docx\"},{\"id\":\"faeed414abe74d939aa14cc818862941\",\"title\":\"test0001\",\"url\":\"http://file.resource.e-eduspace.com/tes111t.docx\"},{\"id\":\"faeed414abe74d939aa14cc818862941\",\"title\":\"test0001\",\"url\":\"http://file.resource.e-eduspace.com/tes111t.docx\"}]",
            //     "execise": "[]",
            //     "finish": null
            //   }, {
            //     "time": "第3天",
            //     "document": "[{\"id\":\"faeed414abe74d939aa14cc818862941\",\"title\":\"test1111\",\"url\":\"http://file.resource.e-eduspace.com/tes111t.docx\"},{\"id\":\"faeed414abe74d939aa14cc818862941\",\"title\":\"test2222\",\"url\":\"http://file.resource.e-eduspace.com/tes111t.docx\"},{\"id\":\"faeed414abe74d939aa14cc818862941\",\"title\":\"test3333\",\"url\":\"http://file.resource.e-eduspace.com/tes111t.docx\"}]",
            //     "execise": "{\"id\":\"08e09641c0b14fe7bce106093ebc3f3f\",\"score\":\"3.0\",\"type\":\"5\"}",
            //     "finish": null
            //   }, {
            //     "time": "第4天",
            //     "document": "[{\"id\":\"faeed414abe74d939aa14cc818862941\",\"title\":\"test0001\",\"url\":\"http://file.resource.e-eduspace.com/tes111t.docx\"}]",
            //     "execise": "{\"id\":\"19ce37a6169042a6bbbc40aecc267788\",\"score\":\"3.0\",\"type\":\"1\"}",
            //     "finish": null
            //   }, {
            //     "time": "第5天",
            //     "document": "[{\"id\":\"faeed414abe74d939aa14cc818862941\",\"title\":\"test0001\",\"url\":\"http://file.resource.e-eduspace.com/tes111t.docx\"}]",
            //     "execise": "{\"id\":\"3997c5ac9a7f4c68855b23ffbc5a9df6\",\"score\":\"3.0\",\"type\":\"5\"}",
            //     "finish": null
            //   }, {
            //     "time": "第6天",
            //     "document": "[{\"id\":\"faeed414abe74d939aa14cc818862941\",\"title\":\"test0001\",\"url\":\"http://file.resource.e-eduspace.com/tes111t.docx\"}]",
            //     "execise": "{\"id\":\"08e09641c0b14fe7bce106093ebc3f3f\",\"score\":\"3.0\",\"type\":\"5\"}",
            //     "finish": null
            //   }, {
            //     "time": "第7天",
            //     "document": "[]",
            //     "execise": "{\"id\":\"19ce37a6169042a6bbbc40aecc267788\",\"score\":\"3.0\",\"type\":\"1\"}",
            //     "finish": null
            //   }, {
            //     "time": "第8天",
            //     "document": "[]",
            //     "execise": "{\"id\":\"3997c5ac9a7f4c68855b23ffbc5a9df6\",\"score\":\"3.0\",\"type\":\"1\"}",
            //     "finish": null
            //   }, {
            //     "time": "第9天",
            //     "document": "[]",
            //     "execise": "{\"id\":\"08e09641c0b14fe7bce106093ebc3f3f\",\"score\":\"3.0\",\"type\":\"1\"}",
            //     "finish": null
            //   }, {
            //     "time": "第10天",
            //     "document": "[]",
            //     "execise": "{\"id\":\"19ce37a6169042a6bbbc40aecc267788\",\"score\":\"3.0\",\"type\":\"1\"}",
            //     "finish": null
            //   }, {
            //     "time": "第11天",
            //     "document": "[{\"id\":\"faeed414abe74d939aa14cc818862941\",\"title\":\"test0001\",\"url\":\"http://file.resource.e-eduspace.com/tes111t.docx\"}]",
            //     "execise": "{\"id\":\"3997c5ac9a7f4c68855b23ffbc5a9df6\",\"score\":\"3.0\",\"type\":\"1\"}",
            //     "finish": null
            //   }, {
            //     "time": "第12天",
            //     "document": "[{\"id\":\"faeed414abe74d939aa14cc818862941\",\"title\":\"test0001\",\"url\":\"http://file.resource.e-eduspace.com/tes111t.docx\"}]",
            //     "execise": "{\"id\":\"08e09641c0b14fe7bce106093ebc3f3f\",\"score\":\"3.0\",\"type\":\"1\"}",
            //     "finish": null
            //   }, {
            //     "time": "第13天",
            //     "document": "[]",
            //     "execise": "{\"id\":\"19ce37a6169042a6bbbc40aecc267788\",\"score\":\"3.0\",\"type\":\"1\"}",
            //     "finish": null
            //   }, {
            //     "time": "第14天",
            //     "document": "[]",
            //     "execise": "{\"id\":\"3997c5ac9a7f4c68855b23ffbc5a9df6\",\"score\":\"3.0\",\"type\":\"1\"}",
            //     "finish": null
            //   }]

            var num = 0;
            for (var i = 0; i < promotionPlanFeedbacks.length; i++) {
              var flag = null;
              var arr = JSON.parse(promotionPlanFeedbacks[i].document);
              if (JSON.parse(promotionPlanFeedbacks[i].execise).id) {
                flag = num;
                num++;
              }
              if (JSON.parse(promotionPlanFeedbacks[i].execise).userScore) {
                if (
                  JSON.parse(promotionPlanFeedbacks[i].execise).userScore ==
                  JSON.parse(promotionPlanFeedbacks[i].execise).score
                ) {
                  if (JSON.parse(promotionPlanFeedbacks[i].execise).type != 5) {
                    promotionPlanFeedbacks[i].finish = 2;
                  } else {
                    promotionPlanFeedbacks.finish = JSON.parse(
                      promotionPlanFeedbacks[i].execise
                    ).userScore;
                  }
                } else {
                  if (JSON.parse(promotionPlanFeedbacks[i].execise).type != 5) {
                    promotionPlanFeedbacks[i].finish = 1;
                  } else {
                    promotionPlanFeedbacks[i].finish = JSON.parse(
                      promotionPlanFeedbacks[i].execise
                    ).userScore;
                  }
                }
              } else {
                promotionPlanFeedbacks[i].finish = null;
              }
              if (arr.length == 0 || arr.length == 1) {
                $this.feedBackObj.push({
                  time: promotionPlanFeedbacks[i].time,
                  document: arr[0],
                  execise: JSON.parse(promotionPlanFeedbacks[i].execise),
                  finish: promotionPlanFeedbacks[i].finish,
                  num: flag,
                  isShowInput: false
                });
              } else {
                for (var s = 0; s < arr.length; s++) {
                  $this.feedBackObj.push({
                    time: promotionPlanFeedbacks[i].time,
                    document: arr[s],
                    execise: JSON.parse(promotionPlanFeedbacks[i].execise),
                    finish: promotionPlanFeedbacks[i].finish,
                    num: flag,
                    isShowInput: false
                  });
                }
              }
            }
            // console.log(JSON.stringify( $this.feedBackObj))
            let contactDot = 0;
            this.feedBackObj.forEach((item, index) => {
              if (index === 0) {
                this.spanArr.push(1);
              } else {
                if (item.time === this.feedBackObj[index - 1].time) {
                  this.spanArr[contactDot] += 1;
                  this.spanArr.push(0);
                } else {
                  contactDot = index;
                  this.spanArr.push(1);
                }
              }
            });
            // console.log(this.spanArr)
          } else {
            this.$message("方案反馈数据失败");
          }
        });
    },
    /*给表头加class*/
    getRowClass({ row, column, rowIndex, columnIndex }) {
      return "table-th";
    }
  },

  watch: {}
};
</script>

<style lang='less' scoped>
.feedBack-content {
  .replay-header {
    height: 52px;
    line-height: 52px;
    border-bottom: 1px solid #d9d9d9;
    background: #fff;
    p {
      width: 1200px;
      margin: 0 auto;
      color: #7f7f7f;
    }
  }
  .table-content {
    width: 1200px;
    margin: 0 auto;
    margin-bottom: 50px;
    .icon {
      width: 21px;
      height: 21px;
      display: inline-block;
      cursor: pointer;
    }
    .no {
      background: url("../../../assets/image/icon-1.png");
    }
    .no.active {
      background: url("../../../assets/image/icon-3.png");
    }
    .yes {
      background: url("../../../assets/image/icon-2.png");
    }
    .yes.active {
      background: url("../../../assets/image/icon-4.png");
    }
  }
}
</style>
<style lang="scss">
.feedBack-content .table-content .table-th th {
  background-color: #eaeaea;
  color: #333;
  text-align: center;
  font-weight: 100;
  font-size: 14px;
}
.feedBack-content {
  .upImg {
    width: 1200px;
    margin: 0 auto;
    margin-bottom: 115px;
    p {
      font-size: 18px;
      color: #333;
      padding-left: 28px;
      border-left: solid 3px #67b6ee;
      margin-bottom: 30px;
    }
  }
  .uploadImg {
    margin-top: 20px;
  }
}
</style>
