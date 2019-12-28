<template>
  <div class="timeTable">
    <div class="comp-full-calendar">
      <div class="headerclass">
        <span>{{currentYear}}年&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <i class="el-icon-caret-left" @click="pre"></i> {{currentMonth+1}}月课表
        <i class="el-icon-caret-right" @click="next"></i>
      </div>
      <div class="full-calendar-body">
        <div class="weeks">
          <div>日</div>
          <div>一</div>
          <div>二</div>
          <div>三</div>
          <div>四</div>
        <div>五</div>
        <div> 六</div>
      </div>
      <div class="dates">
        <div class="dates-bg">
          <div v-for="(item,index) in dateArray" :key="index" class="week-row">
            <div class="day-cell" v-for="(day,index2) in item" :key="index2" :class="{'today': currentMonth==new Date().getMonth()&&day==new Date().getDate()?true:false,'before':before(day)&&currentMonth==new Date().getMonth()&&day<new Date().getDate(),'befor':before(day)&&currentMonth<new Date().getMonth()}">
              <span class="dayNum">{{day}}</span>
              <ul v-if='day==key&&currentMonth<=new Date().getMonth()' v-for="(value,key) in result" :key="key">
                <li v-for="(val,key) in value" @click="show(val,key);a=val">
                  {{commonSubject[val.subjectCode]}} : {{val.startTime}}~{{val.endTime}}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  <div class="datail" v-show="isShow">
    <span class="close" @click="close">X</span>
    <div class="courseinfor">
      <h3>学科：{{commonSubject[a.subjectCode]}}</h3>
      <p>上课日期：{{a.month}}月{{a.day}}日</p>
      <p>上课时间：{{a.startTime}}~{{a.endTime}}</p>
      <p>教师：{{a.teacherName}}</p>
      <p>学生：{{a.studentName}}</p>
      <p>课程名称：{{a.contentSectionName}}</p>
      <!-- <p>课程内容:</p>
                <p>{{a.courseContent}}</p> -->
    </div>
    <div class="btn">
      <el-button type="primary" v-if="clasrecoard()||a.isFinish=='1'" @click="showClass(a.resourceSectionId,a.contentSectionCode,a.studentCode,a.subjectCode)">课堂记录</el-button>
    </div>
  </div>
  <!-- <div class="biji"> -->
  <!-- <el-dialog :visible.sync="dialogTableVisible" class="eldialog">
                <h3>课堂记录</h3>
                <class-register v-for="(item,index) in data.classregister" :key="index" :questitem="item"></class-register>
                <h4>试卷</h4> -->
  <!-- <question-item v-for="(item,index) in data.questionlist" :key="index" :questionItem="item"></question-item> -->
  <!-- </el-dialog> -->
  <!-- </div> -->
  </div>
</template>
<script>
import myNotes from "../page/stumanage/myNotes";
import questionItem from "../page/teamanage/questionItem";
import classRegister from "../page/stumanage/classRegister";
export default {
  props: {
    studentCode: "",
    teacherCode: ""
  },
  components: {
    myNotes,
    questionItem,
    classRegister
  },
  data() {
    return {
      curAnswerNum: 0,
      numlist: [{ 0: 1 }, { 1: 2 }, { 3: 4 }, { 4: 1560 }],
      addCourse: false,
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      dateArray: [],
      isShow: false,
      // listShow: false,
      result: {},
      k: "",
      a: {},
      dialogTableVisible: false,
      data: {
        questionlist: [],
        classregister: []
      },
      resourceSectionId: "",
      contentSectionCode: ""
    };
  },
  mounted() {
    this.getDateArray(this.currentYear, this.currentMonth);
    this.getagencytask();

    // console.log(this.dateArray);
  },
  methods: {
    showClass(resourceSectionId, contentSectionCode, studentCode, subjectCode) {
      sessionStorage.setItem("contentSectionCode", this.contentSectionCode);
      sessionStorage.setItem("studentCode", studentCode);
      // sessionStorage.setItem("studentCod", this.studentCode);

      this.$router.push({
        path: "/classRecord",
        query: {
          lectureId: resourceSectionId,
          contentSectionCode: contentSectionCode,
          subjectCode: subjectCode,
          studentCode: studentCode
          // contentSectionCode:this.contentSectionCode
        }
      });
      // this.dialogTableVisible = true;
      this.resourceSectionId = resourceSectionId;
      // this.getquestionitem();
      // this.getClassRegister();
    },
    before(day) {
      if (this.result != undefined || this.result != null) {
        return Object.keys(this.result).some(function(item) {
          return item == day;
        });
      }
    },
    //选择题号
    chooseQuestion(index) {
      this.curAnswerNum = index;
    },
    show(val, key) {
      this.isShow = true;
      this.clasrecoard();

      this.contentSectionCode = val.contentSectionCode;
    },
    close() {
      this.isShow = false;
    },
    //判断当前选择时间是否小于是当前实际时间
    ParseDate(s) {
      // 将字串解析成日期值
      // reg = /^\d\d\d\d-\d\d-\d\d-\d\d:\d\d$/gi;
      var dv = new Date(Date.parse(s.replace(/-/g, "/")));
      return dv;
    },

    clasrecoard() {
      var myDate = new Date();
      // console.log(new Date());
      if (this.a.endTime) {
        var endtim = this.a.endTime;
        var lastcoursetime =
          this.a.year +
          "-" +
          this.a.month +
          "-" +
          this.a.day +
          "-" +
          this.a.endTime;
        // var datNow = new Date(), dateValue = this.ParseDate("2017-06-23-13:35");
        var datNow = new Date(),
          dateValue = this.ParseDate(lastcoursetime);
        if (dateValue < datNow) {
          return true;
        } else {
          return false;
        }
      }
    },
    getDateArray(year, month) {
      month = parseInt(month, 10) + 1;
      var d = new Date(year, month, 0);
      var nums = d.getDate();

      var array = [];

      for (var i = 1; i <= nums; i++) {
        array.push(i);
      }

      d = d.setDate(1);
      // console.log(d);

      var which = new Date(d).getDay();
      while (which > 0) {
        array.unshift("");
        which--;
      }

      /* [0,0,0,0,0,1,2,3,4,5,6] [ [0,1,2,3,4,5,6], [7,8,9,10,11,12,13 ], [14,15,16,17,18,19,20], [20,21,22,23,24,25,26,27], [28,29] ] */

      let subArrayNum = 7;
      var dateArray = new Array(Math.ceil(array.length / subArrayNum));

      for (let i = 0; i < dateArray.length; i++) {
        dateArray[i] = new Array();
        for (let j = 0; j < subArrayNum; j++) {
          dateArray[i][j] = "";
        }
      }
      for (let i = 0; i < array.length; i++) {
        dateArray[parseInt(i / subArrayNum)][i % subArrayNum] = array[i];
      }

      // console.log(dateArray);
      this.dateArray = dateArray;
    },
    getagencytask() {
      var studentCode = this.localData.get("userInfo").studentCode;
      if (this.$route.query.isEdu) {
        var sendDate = {
          agencyStudentSubjectLevelCode: this.$route.query.code,
          studentCode: null,
          subjectCode: null,
          schoolCode: null,
          classCode: null,
          levelCode: null,
          courseTimeCodes: null,
          courseContentCode: null,
          teacherCode: null,
          status: 1,
          year: this.currentYear,
          month: this.currentMonth + 1,
          day: null
        };
      } else {
        var sendDate = {
          agencyStudentSubjectLevelCode: null,
          studentCode: this.studentCode,
          subjectCode: null,
          schoolCode: null,
          classCode: null,
          levelCode: null,
          courseTimeCodes: null,
          courseContentCode: null,
          teacherCode: this.teacherCode,
          status: 1,
          year: this.currentYear,
          month: this.currentMonth + 1,
          day: null
        };
      }

      var keys = [];
      this.$axios
        .post("/agencyTask/getAgencyTask", sendDate)
        .then(({ httpCode, result }) => {
          if (httpCode == 200) {
            // this.result = result;
            for (var key in result) {
              keys.push(key);
            }
            this.result = result[key];
            // console.log(this.result);
            // var ks = [];
            // for (var k in this.result) {
            //     this.k = k;
            //     ks.push(k);
            // }
            // console.log(ks);
          }
        })
        .catch(error => {});
    },
    pre() {
      if (this.currentMonth >= 1) {
        this.currentMonth--;
      } else {
        this.currentMonth = 11;
        this.currentYear--;
      }
      this.getDateArray(this.currentYear, this.currentMonth);
      this.getagencytask();
    },
    next() {
      if (this.currentMonth < 11) {
        this.currentMonth++;
      } else {
        this.currentMonth = 0;
        this.currentYear++;
      }
      this.getDateArray(this.currentYear, this.currentMonth);
      this.getagencytask();
    },
    // 获取课堂记录
    getClassRegister() {
      let sendData = {
        // lectureId: "d863f6d7e2da4b81b1c623ba1c911b44"
        lectureId: this.resourceSectionId
      };
      this.$axios
        .get("/resource/getResourceSectionInfo?lectureId=" + sendData.lectureId)
        .then(({ httpCode, result }) => {
          if (result) {
            this.data.classregister = result.questionModels;
          }
        })
        .catch(error => {});
    }
    //获取试卷
    // getquestionitem() {
    //     let sendData = {
    //         agencyPaperCode: "b97c5be3cd1d4915a8cfc3b4fbaf9886",
    //         questionCode: null,
    //         subjectCode: null,
    //         // userCode:this.localData.get("userInfo").code,
    //         userCode: null,
    //         gradeIden: null
    //     };
    //     this.$axios
    //         .post("/agency/getAgencyQuestionRecords", sendData)
    //         .then(({ httpCode, result }) => {
    //             console.log(result);
    //             if (result) {
    //                 this.data.questionlist = result;
    //             }
    //         })
    //         .catch(error => {
    //             this.$message("获取失败");
    //         });
    // }
  }
};
</script>
<style lang="scss" scoped>
.timeTable {
  display: flex;
  height: 1000px;
}

.datail {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center; // flex: 1;
  min-width: 500px;
  height: 600px;
  border: 1px solid #909399;
  margin-top: 90px;
  margin-left: 50px;
  float: right;
  padding-top: 50px;
  .close {
    position: absolute;
    top: 20px;
    right: 30px;
    color: #909399;
    font-size: 20px;
    cursor: pointer;
  }
  .close:hover {
    color: #3cccfe;
  }
  .courseinfor {
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      margin-top: 25px;
      font-size: 18px;
    }
  }

  .btn {
    height: 10%;
  }
}

.comp-full-calendar {
  // flex: 1;
  // font-family: "elvetica neue", tahoma, "hiragino sans gb";
  padding: 20px 36px 0 36px;
  background: #fff;
  min-width: 960px; // margin: 0 auto;
  ul,
  p {
    margin: 0;
    padding: 0;
  }
}

.headerclass {
  text-align: center;
  -webkit-user-select: none;
  user-select: none;
  font-size: 24px;
  i:hover {
    cursor: pointer;
  }
}

.full-calendar-body {
  margin-top: 20px;
  .weeks {
    display: flex;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    border-left: 1px solid #e0e0e0;
    div {
      flex: 1;
      text-align: center;
      border-right: 1px solid #e0e0e0;
    }
  }
}

.dates {
  position: relative;
  .week-row {
    border-left: 1px solid #e0e0e0;
    display: flex;
    .day-cell {
      display: flex;
      position: relative;
      flex: 1;
      min-height: 160px;
      border-right: 1px solid #e0e0e0;
      border-bottom: 1px solid #e0e0e0;
      text-align: center;
      flex-direction: column;
      justify-content: center;
      .dayNum {
        position: absolute;
        top: 32%;
        left: 32%;
        color: rgba(0, 0, 0, 0.24);
        font-size: 50px;
      }
      ul {
        display: inline-block;
        z-index: 1000;
        position: relative;
        p {
          position: absolute;
        }
        li {
          cursor: pointer;
          font-size: 15px;
          color: grey;
          -webkit-user-select: none;
          user-select: none;
        }
        li:hover {
          transform: scale(1.2);
          color: green;
        }
      }
      &.today {
        // background-color: #fcf8e3;
        background-color: rgba(51, 255, 204, 0.3);
      }
      &.before {
        background-color: #ebebeb;
      }
      &.befor {
        background-color: #ebebeb;
      }
      &.not-cur-month {
        .day-number {
          color: rgba(0, 0, 0, 0.24);
          -webkit-user-select: none;
          user-select: none;
        }
      }
    }
  }
}

.dayItem {
  float: left;
  width: 100px;
  height: 100px;
}

.lineBox {
  overflow: hidden;
}

.el-dialog {
  position: relative;
  margin: 0 auto 88px;
  background: #fff;
  border-radius: 2px;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 50%;
  height: 80%;
}
.eldialog {
  .el-dialog {
    width: 65%;
    .el-dialog__body {
      padding: 20px 40px;
    }
  }
}
.quesItem {
  background-color: #f7f7f7;
  padding: 15px 10px;
}
</style>
