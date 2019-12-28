<template>
  <div class="con">
    <div class="date">
      <!-- 年份 月份 -->
      <div class="titleleft">
        <p>{{ nowyear }}年
          <span style="color:#409eff"> {{ nowmonth }}月{{nowday}}日</span>
        </p>
      </div>
      <div class="headerclass">
        <i class="el-icon-caret-left" @click="weekPre"></i>
        {{ days[0].getMonth()+1 }}月{{days[0].getDate()}}日~{{ days[6].getMonth()+1 }}月{{days[6].getDate()}}日
        <i class="el-icon-caret-right" @click="weekNext"></i>
      </div>
      <!-- 星期 -->
      <div class="datatime">
        <div class="slide">
          <div class="datatitle">
            <div class="tdate"></div>
            <span class="s1">时间段</span>
            <span class="s2">日期</span>
          </div>
          <ul class="timeslide">
            <li v-for="(item,index) in courseTime" :class="{checked:courseTimeCodes.indexOf(item.code)!='-1'}">{{item.startTime}}-{{item.endTime}}</li>
          </ul>
        </div>
        <div class="weekdayall">
          <ul class="weekdays">
            <li>星期一</li>
            <li>星期二</li>
            <li>星期三</li>
            <li>星期四</li>
            <li>星期五</li>
            <li>星期六</li>
            <li>星期日</li>
          </ul>
          <ul class="days1">
            <li v-for="(day, index) in days" :key="index">
              <span v-if="day.getMonth()+1 != currentMonth" class="">{{day.getMonth()+1}}月{{ day.getDate() }}日</span>
              <span v-else>
                <!--今天-->
                <span v-if="day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate()" class="active">{{day.getMonth()+1}}月{{ day.getDate() }}日</span>
                <span v-else>{{day.getMonth()+1}}月{{ day.getDate() }}日</span>
              </span>
            </li>
          </ul>
          <!-- 日期 -->
          <ul class="days">
            <li v-for="(day, index) in days" :key="index">
              <!--本月-->
              <template v-for="(v,k) in resultobj">
                <ul v-if='day.getDate()==key' v-for="(value,key) in v" :key="key">

                  <li v-for="(val,index1) in value">
                    <div class="div" :class="{'xzactive':dd}" @click="show(val,key);a=val" v-for="(valch,index2) in val.courseTimeCodes" :style="{boxSizing:'border-box',height:29+'px',top:(valch-1)*29+'px',background:chose(val.subjectCode),borderLeft:' 10px ' + ' solid ' + chose1(val.subjectCode)}">
                      <span v-if="valch!=val.courseTimeCodes[index2+1]-1" :style="{color:chose1(val.subjectCode),bottom:calcBottom(val.courseTimeCodes,index2)}">{{commonSubject[val.subjectCode]}}</span>
                    </div>
                  </li>
                </ul>
              </template>
            </li>
          </ul>

        </div>
      </div>
      <div class="courdetail" v-show="isShow">
        <div class="courseinfor">
          <p>学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;科：&nbsp;&nbsp;&nbsp;{{commonSubject[a.subjectCode]}}</p>
          <p>上课日期：&nbsp;&nbsp;&nbsp;&nbsp;{{a.month}}月{{a.day}}日 </p>
          <p>上课时间：&nbsp;&nbsp;&nbsp;&nbsp;{{a.startTime}}~{{a.endTime}}</p>
          <p>教&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;师：&nbsp;&nbsp;&nbsp;&nbsp;{{a.teacherName}}</p>
          <p>学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;生：&nbsp;&nbsp;&nbsp;&nbsp;{{a.studentName}}</p>
          <p>课程名称 :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{a.contentSectionName}}</p>
        </div>
        <div class="btn">
          <el-button type="primary" v-if="clasrecoard()||a.isFinish=='1'" @click="showClass(a.resourceSectionId,a.contentSectionCode,a.studentCode,a.subjectCode)">课堂记录</el-button>
        </div>
      </div>
    </div>
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
      currentYear: 1970, // 年份
      currentMonth: 1, // 月份
      currentDay: 1, // 日期
      currentWeek: 1, // 星期
      days: [],
      courseTime: [],
      result: {},
      nowyear: new Date().getFullYear(),
      nowmonth: new Date().getMonth() + 1,
      nowday: new Date().getDate(),
      isShow: false,
      a: {},
      courseTimeCodes: [],
      resultobj: {},
      dd: false,
      contentSectionCode: "",
      resourceSectionId: "",
      data: {
        questionlist: [],
        classregister: []
      }
    };
  },

  mounted() {
    this.$axios
      .get("/agency/courseTime/getAgencyCourseTime")
      .then(res => {
        console.log(res);
        this.courseTime = res.result;
      })
      .catch();
    this.getagencytask();
  },

  created() {
    this.initData(null);
  },

  methods: {
    calcBottom(arr, index2) {
      var num = 0;
      if (index2 == 0) {
        num = 0;
      } else {
        while (index2 >= 1) {
          if (arr[index2] - 1 == arr[index2 - 1]) {
            num++;
          }
          index2--;
        }
      }
      return (num + 1) * 29 / 2 + "px";
    },
    show(val, key) {
      this.isShow = true;
      this.dd = true;
      this.courseTimeCodes = val.courseTimeCodes;
      this.clasrecoard();

      this.contentSectionCode = val.contentSectionCode;
    },
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
    chose(subjectCode) {
      switch (subjectCode) {
        case 1:
          return (subjectCode = "#ffebec");
          break;
        case 2:
          return (subjectCode = "#edfcf9");
          break;
        case 3:
          return (subjectCode = "#fff9e9");
          break;
        case 4:
          return (subjectCode = "#dff5ff");
          break;
        case 5:
          return (subjectCode = "#ffe9ff");
          break;
        case 6:
          return (subjectCode = "#eeffe4");
          break;
        case 7:
          return (subjectCode = "#defff6");
          break;
        case 8:
          return (subjectCode = "#ffe7d4");
          break;
        case 9:
          return (subjectCode = "#e5ebff");
          break;
      }
    },
    chose1(subjectCode) {
      switch (subjectCode) {
        case 1:
          return (subjectCode = "#feb2b2");
          break;
        case 2:
          return (subjectCode = "#acebe0");
          break;
        case 3:
          return (subjectCode = "#ffe292");
          break;
        case 4:
          return (subjectCode = "#a3e1ff");
          break;
        case 5:
          return (subjectCode = "#ab39b0");
          break;
        case 6:
          return (subjectCode = "#c6fda2");
          break;
        case 7:
          return (subjectCode = "#99ffe3");
          break;
        case 8:
          return (subjectCode = "#ffc597");
          break;
        case 9:
          return (subjectCode = "#b8c8ff");
          break;
      }
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
        console.log(lastcoursetime);
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
    getagencytask(curmon) {
      var studentCode = this.localData.get("userInfo").studentCode;
      var dat = this.formatDate(
        this.days[0].getFullYear(),
        this.days[0].getMonth() + 1,
        this.days[0].getDate()
      );
      var dat1 = this.formatDate(
        this.days[6].getFullYear(),
        this.days[6].getMonth() + 1,
        this.days[6].getDate()
      );
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
          date: dat,
          endDate: dat1,
          // year: this.currentYear,
          // month: this.currentMonth + 1,
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
          date: dat,
          endDate: dat1,
          // year: this.currentYear,
          // month: this.currentMonth,
          // month: curmon || this.currentMonth,
          day: null
        };
      }

      var keys = [];
      this.$axios
        .post("/agencyTask/getAgencyTask", sendDate)
        .then(({ httpCode, result }) => {
          if (httpCode == 200) {
            // this.result = result;
            this.resultobj = result;
            for (var key in result) {
              keys.push(key);
            }
            this.result = result[key];
          }
        })
        .catch(error => {});
    },
    formatDate(year, month, day) {
      const y = year;
      let m = month;
      if (m < 10) m = `0${m}`;
      let d = day;
      if (d < 10) d = `0${d}`;
      return `${y}-${m}-${d}`;
    },

    initData(cur) {
      let date = "";
      if (cur) {
        date = new Date(cur);
      } else {
        date = new Date();
      }
      this.currentDay = date.getDate(); // 今日日期 几号
      this.currentYear = date.getFullYear(); // 当前年份
      this.currentMonth = date.getMonth() + 1; // 当前月份
      this.currentWeek = date.getDay(); // 1...6,0  // 星期几
      if (this.currentWeek === 0) {
        this.currentWeek = 7;
      }
      const str = this.formatDate(
        this.currentYear,
        this.currentMonth,
        this.currentDay
      ); // 今日日期 年-月-日
      console.log(str);
      this.days.length = 0;
      // 今天是周日，放在第一行第7个位置，前面6个 这里默认显示一周，如果需要显示一个月，则第二个循环为 i<= 35- this.currentWeek
      /* eslint-disabled */
      for (let i = this.currentWeek - 1; i >= 0; i -= 1) {
        const d = new Date(str);
        console.log(d);
        d.setDate(d.getDate() - i);
        // console.log(y:" + d.getDate())
        this.days.push(d);
      }
      for (let i = 1; i <= 7 - this.currentWeek; i += 1) {
        const d = new Date(str);
        d.setDate(d.getDate() + i);
        this.days.push(d);
      }
    },

    // 上个星期
    weekPre() {
      this.courseTimeCodes = [];
      const d = this.days[0]; // 如果当期日期是7号或者小于7号
      d.setDate(d.getDate() - 7);
      this.initData(d);

      this.getagencytask();
      this.isShow = false;
    },

    // 下个星期
    weekNext() {
      this.courseTimeCodes = [];
      const d = this.days[6]; // 如果当期日期是7号或者小于7号
      d.setDate(d.getDate() + 7);
      this.initData(d);
      this.getagencytask();
      this.isShow = false;
    },

    // 上一個月  传入当前年份和月份
    pickPre(year, month) {
      const d = new Date(this.formatDate(year, month, 1));
      d.setDate(0);
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },

    // 下一個月  传入当前年份和月份
    pickNext(year, month) {
      const d = new Date(this.formatDate(year, month, 1));
      d.setDate(35);
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    }
  }
};
</script>

<style lang="scss" scope>
.con {
  min-width: 1300px;
  border-radius: 10px;
  margin-top: -6px;
  .courdetail {
    background-color: #fff;
    width: 25%;
    position: relative;
    display: flex;
    flex-direction: column;
    // align-items: center; // flex: 1;
    min-width: 300px;
    height: 360px;
    border: 1px solid #f3f6f7;
    border-radius: 10px;
    border-left: 8px solid #feb2b2;
    margin-left: 35px;
    // float: right;
    padding: 20px;
    box-shadow: 1px 1px 10px #f3f6f7;
    .courseinfor {
      height: 90%;
      display: flex;
      flex-direction: column;
      // align-items: center;
      p {
        margin-top: 25px;
        font-size: 18px;
        text-align: justify;
      }
    }

    .btn {
      height: 10%;
      text-align: center;
    }
  }
  .date {
    position: relative;
    color: #333;
    display: flex;
    .titleleft {
      position: absolute;
      top: -65px;
      left: 140px;
    }
    .headerclass {
      position: absolute;
      top: -65px;
      right: 580px;
    }
    .datatime {
      display: flex;
      width: 68%;
      background-color: #fff;
      border: 2px solid #f3f6f7;
      border-radius: 10px;
      .slide {
        width: 10%;
        .datatitle {
          position: relative;
          display: flex;
          height: 55px;
          line-height: 55px;
          text-align: center;
          border-bottom: 1px solid #f3f6f7;
        }
        .timeslide {
          li {
            padding: 6.5px 0;
            border-bottom: 1px solid #f3f6f7;
            text-align: center;
            box-sizing: border-box;
            height: 29px;
          }
        }
      }

      .weekdayall {
        width: 90%;
        display: flex;
        flex-direction: column;
        .weekdays {
          display: flex;
          font-size: 16px;
          height: 29px;
          li {
            border-left: 1px solid #f3f6f7;
            flex: 1;
            text-align: center;
          }
        }
        .days1 {
          height: 26px;
          border-bottom: 1px solid #f3f6f7;
          display: flex;
          li {
            position: relative;
            flex: 1;
            font-size: 16px;
            text-align: center;

            border-left: 1px solid #f3f6f7;

            .active {
              display: inline-block;

              color: #fff;
              border-radius: 6%;
              background-color: #fa6854;
            }

            .other-month {
              display: inline-block;
              color: #e4393c;
              margin-bottom: 3px;
            }
          }
        }
        .days {
          display: flex;
          overflow: hidden;
          // height: 780px;
          height: 783px;
          li {
            position: relative;
            flex: 1;
            font-size: 16px;
            text-align: center;

            border-left: 1px solid #f3f6f7;

            .active {
              display: inline-block;

              color: #fff;
              border-radius: 6%;
              background-color: #fa6854;
            }

            .other-month {
              display: inline-block;
              color: #e4393c;
              margin-bottom: 3px;
            }
            ul {
              position: relative;
              height: 783px;
              li {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                text-align: center;
                box-sizing: border-box;
                position: relative;
                .div {
                  position: absolute;
                  width: 100%;
                  height: 32px;
                  span {
                    position: absolute;
                    transform: translate(-50%, 50%);
                    left: 50%;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .headerclass {
    text-align: center;
    -webkit-user-select: none;
    user-select: none;
    i:hover {
      cursor: pointer;
    }
  }
}
.checked {
  background-color: #e6e6e6;
}
[class^="el-icon-"] {
  font-weight: 900;
  color: #409eff;
}
.xzactive {
  // background-color:gray !important
  // opacity: .5;
}
</style>
<style lang="scss">
.s1 {
  position: absolute;
  color: #fff;
  top: 21%;
  left: 4%;
}

.s2 {
  position: absolute;
  color: #fff;
  right: 10%;
  top: -23%;
}
.tdate {
  display: inline-block;
  width: 100%;
  height: 56px;
  background-image: url("../../../static/img/td.png");
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
