<template>
  <div class="c-calender">
    <div class="year-month">
      <span class="reduce" @click="monthChange(-1)"></span>
      <span class="tmpTime">{{tmpYear}}年{{tmpMonth}}月</span>
      <span class="grow" @click="monthChange(1)"></span>
    </div>
    <ul class="c-lists">
      <li class="week"><span>一</span></li>
      <li class="week"><span>二</span></li>
      <li class="week"><span>三</span></li>
      <li class="week"><span>四</span></li>
      <li class="week"><span>五</span></li>
      <li class="week"><span>六</span></li>
      <li class="week"><span>日</span></li>
      <li class="day" :class="{focus:day.focus,out:day.out,passed:day.passed}" v-for="day in days" @click="clickDay(day)"><i
        class="c-course" v-if="day.course"><i></i></i><span>{{day.d}}</span></li>
    </ul>
  </div>
</template>

<script>
  /*
  * 使用方法
  * 1.引用此component
  * 2.当月份有改变，要显示某一天是否有课时，需调用子组件的 monthCourses 方法,传入参数为一段时间内某天有课的标记的数组。
  * 3.当点击某一天时会调用父组件的 daycourse 方法，所传参数格式为：{year:2018,month:0,date:1}
  * 4.当跳转月份时会调用父组件方法 monthchange 方法，所传参数格式为：{year:2018,month:0}
  * 注意：点击月份跳转时，如果跳转到当前月份会调用 daycourse 和 monthchange 俩方法，参数分别为当前日期和月份；当点击上月日期或下月日期时，也会调用俩方法，参数分别为点击日期和月份
  *
  * */
  export default {
    name: "calender",
    data() {
      return {
        days: [],
        tmpYear: 0,
        tmpMonth: 0, //月1~12
        monthDays: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      }
    },
    created() {
      this.init();
    },
    methods: {
      monthCourses(data) { //当前月份中某一天有课，数组
        console.log("run method monthCourses, got data ", data);
        if (!(data instanceof Array) || data.length === 0) return; //非法数据或者没有课  [{startTine:"2018-09-01"}]
        for (let i = 0; i < this.days.length; i++) {
          for (let j = 0; j < data.length; j++) {
            let hday = new Date(data[j].startTime);
            if(hday.getFullYear()===this.days[i].y && hday.getMonth()===this.days[i].m && hday.getDate()===this.days[i].d){
              this.days[i].course = true;
            }
          }
        }
      },
      clickDay(day) {
        if (this.tmpMonth - 1 !== day.m) {
         // this.$emit("monthchange", day.y + "-" + this.fillLLength(day.m + 1, 2));
          this.$emit("monthchange", {year:day.y,month:day.m+1});
          this.makeCalender(day.y, day.m, day.d);
          this.tmpYear = day.y;
          this.tmpMonth = day.m + 1;
        } else {
          for (let i = 0; i < this.days.length; i++) {
            this.days[i].focus = this.days[i].m === day.m && this.days[i].d === day.d;
          }
        //  let s = day.y + "-" + this.fillLLength(day.m + 1, 2) + "-" + this.fillLLength(day.d, 2);
          this.$emit("daycourse", {year:day.y,month:day.m+1,date:day.d});
        }
      },
      getMonthDays(year, month) { //获取某月有多少天，月份从0开始
        let monthday = this.monthDays[month];
        if (month === 1 && ((year % 100 !== 0 && year % 4 === 0) || year % 400 === 0)) { //闰年2月
          monthday = 29;
        }
        return monthday;
      },
      fillLLength(data, len) {
        let s = '';
        for (let i = 0; i < len; i++) {
          s += "0";
        }
        return (s + data).substr(0 - len);
      },
      timePassed(year,month,day){
        let today = new Date();
        if(today.getFullYear()>year){
          return true
        }else if(today.getFullYear()===year){
          if(today.getMonth() > month){
            return true;
          }else if(today.getMonth()===month){
            return today.getDate() > day;
          }
        }
        return false;
      },
      makeCalender(year, month, date) { //month 从0开始
        let today = new Date();
        if (date == null && year === today.getFullYear() && month === today.getMonth()) {
          date = today.getDate();
        }
        let monthDay = this.getMonthDays(year, month); //当前月多少天
        let monthFirstDay = new Date(year, month, 1);
        let fistDayWeek = monthFirstDay.getDay(); //当月1号周几
        let weak = fistDayWeek-1; //上月显示天数
        weak = weak >= 0 ? weak:6;
        let lastMonthDays;//上月最后一天
        let y, m;
        if (weak > 0) {
          m = month - 1;
          y = year;
          if (m < 0) {
            m = 11;
            y--;
          }
          lastMonthDays = this.getMonthDays(y, m);
        }
        let left = 6 * 7 - weak - monthDay; //显示下月天数
        let days = []; //日历
        for (let i = 0; i < weak; i++) {
          days.unshift({
            y: y,
            m: m,   //月从0~11
            d: lastMonthDays,
            out: true,
            passed:this.timePassed(y,m,lastMonthDays),
            focus: false,  //当前是否被选中
            course: false  //是否有课
          });
          lastMonthDays--;
        }
        for (let i = 1; i <= monthDay; i++) {
          days.push({
            y: year,
            m: month,
            d: i,
            passed:this.timePassed(year,month,i),
            focus: (date && date === i) ? true : false,
            course: false
          })
        }
        m = month + 1;
        y = m > 11 ? year + 1 : year;
        m = m > 11 ? 0 : m;
        for (let i = 1; i <= left; i++) {
          days.push({
            y: y,
            m: m,
            d: i,
            passed:this.timePassed(y,m,i),
            out: true,
            focus: false,
            course: false
          })
        }
        this.days = days;
        if (date) {
          //this.$emit("daycourse", year + "-" + this.fillLLength(month + 1, 2) + "-" + this.fillLLength(date, 2));
          this.$emit("daycourse", {year:year,month:month+1,date:date});
        }
      },
      init() {
        let today = new Date();
        this.makeCalender(today.getFullYear(), today.getMonth(), today.getDate());
        this.tmpYear = today.getFullYear();
        this.tmpMonth = today.getMonth() + 1;
       // this.$emit("monthchange", this.tmpYear + "-" + this.fillLLength(this.tmpMonth, 2));
        this.$emit("monthchange", {year:this.tmpYear,month:this.tmpMonth});
      },
      monthChange(g) {
        let m = this.tmpMonth + g;
        this.tmpYear = m < 1 ? this.tmpYear - 1 : m > 12 ? this.tmpYear + 1 : this.tmpYear;
        this.tmpMonth = m < 1 ? 12 : m > 12 ? 1 : m;
        this.makeCalender(this.tmpYear, this.tmpMonth - 1, null);
       // this.$emit("monthchange", this.tmpYear + "-" + this.fillLLength(this.tmpMonth, 2));
        this.$emit("monthchange", {year:this.tmpYear,month:this.tmpMonth});
      }
    }
  }
</script>

<style scoped lang="scss">
  .c-calender {
    font-family: 'microsoft yahei';
    user-select: none;
    font-size: 0px;
    box-shadow: 4px 4px 13px rgba(0,0,0,.2);
    border-radius: 20px;
    .year-month {
      color: #333333;
      font-weight: bold;
      text-align: center;
      padding: 26px 0;
      .tmpTime {
        font-size: 24px;
        margin: 0 30px;
        display: inline-block;
      }
      .reduce,.grow {
        height: 0;
        width: 0;
        display: inline-block;
        cursor: pointer;
      }
      .reduce{
        border-style: solid;
        border-color: transparent #999999 transparent transparent;
        border-width: 10px;
      }
      .grow{
        border-style: solid;
        border-color: transparent  transparent transparent #999999;
        border-width: 10px;
      }
    }
    .c-lists {
      font-size: 26px;
      list-style: none;
      padding: 0;
      text-align: center;
      display: block;
      color: #777777;
      &:after {
        content: " ";
        display: block;
        visibility: hidden;
        height: 0;
        clear: both;
      }
      li {
        float: left;
        width: 14.28%;
        display: inline-block;
        box-sizing: border-box;
        margin: 0;
        position: relative;
        font-size: 0;
        &.week {
          background-color: #409eff;
          color: #ffffff;
          font-size: 16px;
          padding: 18px 0;
          margin-bottom: 4px;
        }
        &.day {
          padding: 0;
          color: #333333;
          &.out {
            color: #c8c8c8;
          }
          span {
            font-size: 20px;
            padding: 4px;
            border-radius: 26px;
            display: inline-block;
            margin: 26px 0;
            text-align: center;
            cursor: pointer;
            width: 26px;
            height: 26px;
            &:hover {
              color: #ffffff;
              background-color: #04f4e0;
            }
          }
          &.focus span {
            color: #ffffff;
            background-color: #fdc840;
          }
          .c-course {
            height: 12px;
            width: 12px;
            border-radius: 6px;
            font-size: 0;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: 9px;
            margin-top: -16px;
            z-index: 10;
            display: inline-block;
            background-color: #ffffff;
            i {
              position: absolute;
              left: 0;
              right: 0;
              bottom: 0;
              top: 0;
              z-index: 11;
              width: 8px;
              height: 8px;
              margin: auto;
              border-radius: 4px;
              display: inline-block;
              background-color: #409eff;
            }
          }
          &.passed .c-course i{
            background-color: #999999;
          }
        }
      }
    }
  }
</style>
