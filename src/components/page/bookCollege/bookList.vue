<template>
  <div class="bookList-content">
    <div class="nav-top">
      <el-row>
        <el-col :span="1">
          <div class="gradeList">
            <b>学年：</b>
          </div>
        </el-col>
        <el-col :span="23">
          <div class="gradeList">
            <span v-for="item in gradeList" @click="chooseGrade(item)" :class="{ active: item.gradeCode==chooseGradeIndex }">{{ item.gradeName }}</span>
            <!--<span v-for="item in gradeListTwo" @click="chooseGrade(item)" :class="{ active: item.gradeCode==chooseGradeIndex }">{{ item.gradeName }}</span>-->
            <!--<span v-for="item in gradeListThree" :class="{ span1: item.gradeCode==44,active: item.gradeCode==chooseGradeIndex }" @click="chooseGrade(item)">{{ item.gradeName }}</span>-->
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col  :span="1">
          <div class="subjectList">
            <b>学科：</b>
          </div>
        </el-col>
        <el-col :span="23">
          <div class="subjectList">
            <span v-for="item in subjectList" @click="chooseSubject(item)" :class="{ active: item.subjectCode==chooseSubjectIndex }">{{ item.subjectName }}</span>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="book-wrap">
      <div class="bookList " v-for="(item,index) in listObj" :class="{blue:item.status==2,orange:item.status==1}">
        <div class="right-score" v-if="item.status==2">
          <span>{{ item.score }}分</span>
        </div>
        <h1>{{ item.paperName }}</h1>
        <ul>
          <li class="li1" v-if="item.evaluationRecordCode"><span class="li-title">得<em></em>分：</span>{{ item.evaluationRecordScore || 0}}分<span class="score-all">/{{ item.totalScore }}分</span></li>
          <li class="li1" v-else><span class="li-title">总<em></em>分：</span>{{ item.totalScore }}分</li>

          <li class="li2"><span class="li-title">测评限时：</span>{{ item.standardTime }}分钟</li>
          <li class="li3" v-if="item.evaluationRecordCode"><span class="li-title">测评日期：</span>{{ timeObj(item.evaluationRecordTime) }}</li>
          <li class="li4" v-if="item.evaluationRecordCode"><span class="li-title">状<em></em>态：</span>已测评</li>
          <li class="li4" v-else><span class="li-title">状<em></em>态：</span>未测评</li>
        </ul>
        <div class="btn-wrap">

          <span  class="goResultBtn" v-if="item.evaluationRecordCode" @click="goReport(item)">查看测评报告</span>
          <span class="goTextBtn" v-else @click="goTest(item)">开始测评</span>
        </div>
      </div>
    </div>
    <!--分页-->
    <div class="pagination-wrap">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

  </div>
  <!--列表-->

</template>
<script>
export default {
    data() {
        return {
          gradeList:[], //年级列表
          gradeListOne:[], //年级one
          gradeListTwo:[], //年级two
          gradeListThree:[], //年级three
          subjectList:[], //学科列表
          chooseGradeIndex:null, //选择学年
          chooseSubjectIndex:null, //选择学科
          listObj:[], //列表数据
          /*分页*/
          currentPage:1, //当前页数
          total:100, //数据个数
          pageSize:12, //每页几条
          userId:null,
        };
    },
    created() {
     // this.userId=this.localData.get('userId');
      this.getGradeList();
      this.getSubjectList();
    },
    methods: {
      /*获取学年列表*/
      getGradeList(){
        var $this = this;
        this.$axios
          .post(this.baseURL1 + "/jeecg/rest/support/grade/getGrades",{})
          .then(res => {
            // for(var i = 0;i<res.result.length;i++){
            //   if(res.result[i].dataIden==23){
            //     res.result.splice(i,1)
            //   }
            // }

            /*$this.gradeList.unshift({
              "gradeCode":"",
              "gradeName":"全部"
            })*/
            var stageCode = $this.$route.query.stageCode||null;
            if(stageCode==1){
              $this.gradeList = res.result.slice(0,6);
            }else if(stageCode==2){
              $this.gradeList = res.result.slice(6,9);
            }else if(stageCode==3){
              $this.gradeList = res.result.slice(9);
            }else{
              $this.gradeList = res.result || [];
            }
            $this.chooseGrade($this.gradeList[0])
            //
            // $this.gradeListTwo = $this.gradeList.slice(7,10);
            // $this.gradeListThree = $this.gradeList.slice(10);
          })
          .catch(err => {
            this.$message({
              type: 'info',
              message: "获取学年列表失败"
            });
          });
      },
      /*获取学科列表*/
      getSubjectList(){
        var $this = this;
        var obj = {
          "gradeCodes":[$this.chooseGradeIndex],
          "releaseStatus":1
        }
        if(!$this.chooseGradeIndex){
          obj.gradeCodes = [];
        }
        this.$axios
          .post(this.baseURL1 + "/jeecg/rest/support/course/getSubjects", obj)
          .then(res => {
            var arr = [];
            for(var i = 0;i<res.result.length;i++){
              arr.push(res.result[i])
              /*if(res.result[i].subjectCode==2||res.result[i].subjectCode==3||res.result[i].subjectCode==4){
                arr.push(res.result[i])
              }*/
            }
            this.subjectList = arr;
            $this.subjectList.unshift({
              "subjectCode":null,
              "subjectName":"全部"
            })
            $this.chooseSubject($this.subjectList[0])
          })
          .catch(err => {
          });
      },
      /*选择学年*/
      chooseGrade:function (item) {
        var $this = this;
        $this.chooseGradeIndex = item.gradeCode
        $this.getSubjectList();
      },
      /*选择学科*/
      chooseSubject:function (item) {
        var $this = this;
        $this.chooseSubjectIndex = item.subjectCode;
        this.getPaperList();
      },
      /*获取试卷列表*/
      getPaperList:function(){
        var $this = this;
        var obj = {
          "gradeCode": $this.chooseGradeIndex,
          "pageNum":$this.currentPage,
          "pageSize": $this.pageSize,
          "productId": "3b881f4878694e8b81a0399db794cf5e",
          "subjectCode": $this.chooseSubjectIndex,
          "userId": null,
          "releaseStatus":1
        }
        if(this.userId){
          obj.userId=this.userId
        }

        this.$axios
          .post("/paper/getPaperList",obj)
          .then(res => {
            if(res.code="000000"){
              this.listObj=res.pages ||[];
              this.total=res.totalRows
            }

          })
          .catch(err => {
            this.$message({
              type: 'info',
              message: "获取试卷列表失败"
            });
          });
      },
      /*点击分页*/
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getPaperList()
      },
      goTest(item) {
        var obj={
          "gradeCode":this.chooseGradeIndex,//a.gradeCode,
          "paperId":item.paperId,
          "paperName":item.paperName,
        }
        this.localData.set('paperBox',obj) //用户信息
        this.$router.push({path: '/textBegin',query:{inviteCode:this.$route.query.inviteCode}})
      },
      goReport(item) {
        this.$router.push({path: '/reportDetail', query: {code:item.evaluationRecordCode,inviteCode:this.$route.query.inviteCode}})
      },
      //时间转换
      timeObj(value){
        var a = new Date(value);
        var month = "";
        var dateItem = "";
        var h = "";
        var m = "";
        var s = "";
        if(a.getMonth() + 1<10){
          month = "0" + (a.getMonth() + 1)
        }else{
          month = (a.getMonth() + 1)
        }
        if(a.getDate()<10){
          dateItem = "0" + a.getDate()
        }else{
          dateItem = a.getDate()
        }
        if(a.getHours()<10){
          h = "0" + a.getHours()
        }else{
          h = a.getHours()
        }
        if(a.getMinutes()<10){
          m = "0" + a.getMinutes()
        }else{
          m = a.getMinutes()
        }
        if(a.getSeconds()<10){
          s = "0" + a.getSeconds()
        }else{
          s = a.getSeconds()
        }
        var b  = a.getFullYear() + '-' + month + '-' + dateItem + " " + h + ":" + m + ":" + s;
        return b
      },

    },

    components: {
    },
    watch: {

    }
};
</script>
<style lang="less">
  @blue-ss: #36a4c8;
  @blue-s: #3ebce5;
  @blue-q: #e7f9ff;
  @blue-y: #ff9234;
  .bookList-content{
    .pagination-wrap{
      text-align: center;
      margin:50px;
    }
    .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
      background-color:#FFF;
    }
    .nav-top{
      width:1200px;
      margin:0 auto;
      .gradeList{
        margin:16px 0 0 0;
        b{
          color:#333;
          font-size:16px;
        }
        span{
          font-size:14px;
          color:#333;
          display: inline-block;
          /*width:58px;*/
          /*height:26px;*/
          padding:0 6px;
          border:1px solid #cccccc;
          background-color:#FFF;
          text-align:center;
          line-height:26px;
          border-radius:2px;
          cursor:pointer;
          margin-right:22px;
          margin-bottom:10px;
          &:hover{
            background-color:@blue-q;
            border:1px solid @blue-s;
          }
        }
        .active{
          background-color:@blue-s;
          border:1px solid @blue-ss;
          color:#FFF;
          &:hover{
            background-color:@blue-s;
            border:1px solid @blue-ss;
            color:#FFF;
          }
        }
        .span1{
          margin-right:0;
        }
      }
      .subjectList{
        margin-bottom:36px;
        b{
          color:#333;
          font-size:16px;
        }
        span{
          font-size:14px;
          color:#333;
          display: inline-block;
          padding:0 15px;
          height:26px;
          border:1px solid #cccccc;
          background-color:#FFF;
          text-align:center;
          line-height:26px;
          border-radius:2px;
          cursor:pointer;
          margin-right:22px;
          margin-bottom:10px;
          &:hover{
            background-color:@blue-q;
            border:1px solid @blue-s;
          }
        }
        .active{
          background-color:@blue-s;
          border:1px solid @blue-ss;
          color:#FFF;
          &:hover{
            background-color:@blue-s;
            border:1px solid @blue-ss;
            color:#FFF;
          }
        }
      }
    }
    .book-wrap{
      /*margin-top:50px;*/
      width:1224px;
      margin:0 auto;
      .bookList{
        width:246px;
        height:190px;
        display: inline-block;
        background-color:#FFF;
        padding:16px;
        position: relative;
        margin:20px 14px;
        position: relative;
        .right-score{
          position: absolute;
          width:61px;
          height:61px;
          right:0;
          top:0;
          background:url("../../../../static/img/bookCollege/list-icon5.png") no-repeat;
          span{
            color:#FFF;
            font-size:14px;
            display: inline-block;
            transform:rotate(45deg);
            -ms-transform:rotate(45deg); 	/* IE 9 */
            -moz-transform:rotate(45deg); 	/* Firefox */
            -webkit-transform:rotate(45deg); /* Safari 和 Chrome */
            -o-transform:rotate(45deg);
            margin-top:12px;
            margin-left:25px;
          }
        }
        h1{
          font-size:18px;
          color:#333;
          font-weight:100;
          width:216px;
          overflow: hidden;
          height:52px;
          /*white-space: nowrap;
          text-overflow: ellipsis;*/
        }
        ul{
          /*margin-top:38px;*/
          position: absolute;
          top:76px;
          li{
            font-size:14px;
            color:#333;
            line-height:28px;
            padding-left:23px;
            .li-title{
              color:#666;
              em{
                display: inline-block;
                width:2em;
              }
            }
            .score-all{
              color:#999;
            }
            &.li1{
              background:url("../../../../static/img/bookCollege/list-icon1.png") no-repeat 0 50%;
            }
            &.li2{
              background:url("../../../../static/img/bookCollege/list-icon2.png") no-repeat 0 50%;
            }
            &.li3{
              background:url("../../../../static/img/bookCollege/list-icon3.png") no-repeat 0 50%;
            }
            &.li4{
              background:url("../../../../static/img/bookCollege/list-icon4.png") no-repeat 0 50%;
            }
          }
        }
        &.orange{
          border-top:3px solid @blue-y;
        }
        &.blue{
          border-top:3px solid @blue-s;
        }
        .btn-wrap{
          position: absolute;
          left:50%;
          margin-left:-57px;
          bottom:-15px;
          span{
            display: inline-block;
            width:115px;
            height:30px;
            border-radius:5px;
            color:#FFF;
            text-align:center;
            line-height:30px;
            cursor:pointer;
            &.goTextBtn{
              background-color:@blue-y;
              border:1px solid #ff7e0b;
            }
            &.goResultBtn{
              background-color:#e3e3e3;
              border:1px solid #cdcdcd;
              color:#333;
            }
          }
        }
      }
    }
  }
</style>

