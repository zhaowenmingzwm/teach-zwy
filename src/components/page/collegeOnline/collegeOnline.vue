<template>
  <div class="college-online" :style="{marginBottom: '0'}" @mousewheel="handleScroll">
    <div class="college-contain">
      <div class="banner-img">
        <img src="@/assets/image/college.jpg" alt>
      </div>

      <!-- <div class="lookVipRecord"> -->
      <el-dialog title="完善预约信息" :visible.sync="dialogTableVisible" style="minWidth:200px">
        <div class="contain">
          <label>您孩子的姓名:</label>
          <el-input v-model="userName"></el-input>
        </div>
        <div class="contain">
          <label>您孩子的性别:</label>
          <div class="sameStyle">
            <el-radio v-model="sex" label="男" class="sex" fill="#c80032">男</el-radio>
            <el-radio v-model="sex" label="女" class="sex" fill="#c80032">女</el-radio>
          </div>
        </div>
        <div class="contain">
          <label>您孩子的年级:</label>
          <div class="sameStyle child-grade">
            <el-select v-model="gradeName" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.gradeName"
                :value="item.gradeCode"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="contain">
          <label>选择预约时间:</label>
          <div class="block sameStyle child-grade">
            <el-date-picker
              v-model="dataTime"
              type="date"
              :picker-options="pickerOptions"
              placeholder="选择日期"
            ></el-date-picker>
          </div>
        </div>
        <!-- <div class="contain">
          <label>输入兑换券码:</label>
          <el-input v-model="coupon">张三</el-input>
        </div>
        <p class="couponSty">
          <span style="color:#f00">*</span>输入兑换券码即可申请新国人书院“成长奖金“冲抵费用
        </p>-->

        <el-button class="submit" @click="submitInfo">提交</el-button>
      </el-dialog>
      <!-- </div> -->
    </div>
    <div
      :class="!positionOff ? 'college-appointment appointment_fixed' : 'college-appointment appointment_absolute'"
      id="searchBar"
    >
      <el-button class="appointment" @click="appointment">预约</el-button>
      <el-button class="look-course" @click="lookCourse">查看课程</el-button>
      <span>{{coueseMessage}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogTableVisible: false,
      sex: "女",
      userName: "",
      dataTime: "",
      options: [],
      gradeName: "",
      coupon: null,
      userId: null,
      mobile: "",
      coueseMessage: "",
      userAccount: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      isH: false,
      positionOff: false
    };
  },
  created() {
    this.userId = localStorage.getItem("token");
    this.userAccount = JSON.parse(localStorage.getItem("web")).agencyAccount;
    this.getUserInfo();
  },
  mounted() {
    this.offsetTop = document.querySelector(".footer").offsetTop;
    this.bodyHeight = document.body.offsetHeight;

    //给页面绑定滑轮滚动事件
    if (document.addEventListener) {
      //firefox
      document
        .querySelector("#scroll")
        .addEventListener("DOMMouseScroll", this.Scroll, false);
    }
    //滚动滑轮触发scrollFunc方法  //ie 谷歌
    window.onmousewheel = document.onmousewheel = this.Scroll;
  },
  methods: {
    // 滚动页面
    Scroll() {
      const Top = document.querySelector(".footer").offsetTop;
      let scrollTop = document.querySelector("#scroll").scrollTop;
      let h =
        document.documentElement.clientHeight || document.body.clientHeight;
      Top - (scrollTop + 120 + 58) < h
        ? (this.positionOff = true)
        : (this.positionOff = false);
    },
    // 获取用户信息
    getUserInfo() {
      if (this.userId == null) {
        this.$router.push({ path: "/LoginEntrance" });
      } else {
        this.$axios
          .post(this.baseURL + "/user/getAssessmentAuthenticatedInfo", {
            userId: this.userId
          })
          .then(res => {
            if (res.code == "000000") {
              this.mobile = res.mobile;
              // this.userName = res.student.realname;
              // this.sex = res.student.sex = 1;
            }
          });
      }
    },
    // 提交信息
    appointment() {
      this.dialogTableVisible = true;
      this.getGradeListt();
      this.getUserInfo();
    },
    // 查看课程
    lookCourse() {
      if(this.userId == null) {
        
        this.userId == null && this.$router.push({ path: "/LoginEntrance" })
        return;
      }
      if (!this.userAccount) {
        this.$message({
          type: "info",
          duration: "3000",
          message: "您当前尚无课程，请预约课程后，客服人员会联系您安排试听课"
        });
        return;
      }
      this.$axios
        .post(this.lantianUrl + "/agency/user/getUserInfoByAccout", {
          userAccount: this.userAccount
        })
        .then(res => {
          if (res.httpCode == "200") {
            console.log(res);
            if (res.result == null || res.result.userAccount == null) {
              this.$message({
                type: "error",
                duration: "3000",
                message:
                  "您当前尚无课程，请预约课程后，客服人员会联系您安排试听课"
              });
            } else {
            const newPage = window.open("_blank");
            newPage.location = this.anlie +
                  "?" +
                  "name" +
                  "=" +
                  res.result.userAccount +
                  "&" +
                  "pwd" +
                  "=" +
                  res.result.userPassword +
                  "&" +
                  "type" +
                  "=" +
                  "1"
            }
          }
        });
    },
    submitInfo() {
      let sendData = {
        appointDateTime: this.dataTime,
        childGrade: this.gradeName,
        childRealName: this.userName,
        childSex: this.sex,
        inviteCode: this.coupon,
        userId: this.userId,
        tel: this.mobile
      };
      // 非空校验
      if (this.userName == "") {
        this.$message("请输入姓名");
        return;
      } else if (this.sex == "") {
        this.$message("请选择性别");
        return;
      } else if (this.gradeName == "") {
        this.$message("请选择年级");
        return;
      } else if (this.dataTime == "") {
        this.$message("请选择日期");
        return;
      } else {
        this.$axios
          .post(this.baseURL + "/parentTest/saveInterveneTrain", sendData)
          .then(res => {
            this.$message({
              type: "success",
              message: "提交成功"
            });
          });
        this.dialogTableVisible = false;
      }
    },
    // 获取年级列表
    getGradeListt() {
      this.$axios.post(this.baseURL + "/grade/getGrades", {}).then(res => {
        this.options = res.grades;
      });
    },
    // 鼠标滚动
    handleScroll(event) {
      // // console.log(event.offsetY)
      // if(event.offsetY >= 2000){
      //   this.isH = true
      // }else{
      //    this.isH = false;
      // }
      // console.log(this.isH)
    }
  }
};
</script>


<style lang="less">
.college-online {
  position: relative;
  .college-appointment {
    .appointment,
    .look-course {
      margin-bottom: 40px;
      width: 130px;
      background-color: #c80032;
      color: #fff;
      border: solid 1px #c80032;
    }
    .look-course {
      background-color: #67b6ee;
      margin-left: 50px;
      border: none;
    }
  }
  .appointment_fixed {
    text-align: center;
    position: fixed;
    bottom: 0;
    height: 76px;
    line-height: 76px;
    width: 100%;
    background-color: #dfdfdf;
    border: solid 1px #a2a2a2;
  }
  .appointment_absolute {
    text-align: center;
    position: absolute;
    bottom: 0;
    height: 76px;
    line-height: 76px;
    width: 100%;
    background-color: #dfdfdf;
    border: solid 1px #a2a2a2;
  }

  .appointmentOff {
    top: inherit;
    bottom: 0px;
  }
  .isH {
    top: calc(100% - 260px);
  }
  // overflow: hidden;
  margin-bottom: 188px;
  .college-contain {
    // border: solid #ccc 1px;

    width: 1200px;
    // height: 697px;
    background-color: #fff;
    position: relative;
    margin: 0 auto;
    text-align: center;
    .banner-img {
      img {
        margin: 40px 0;
      }
    }

    .el-dialog {
      // width: 28%;
      // min-width: 400px;
      width: 540px;
      .el-input {
        width: 50%;
        margin-left: 30px;
      }
      label {
        color: #333 !important;
      }
      .submit {
        width: 130px;
        margin-top: 50px;
        background-color: #c80032;
        color: #fff;
        border: solid 1px #c80032;
      }
    }
    .contain {
      margin-bottom: 20px;
      .sameStyle {
        display: inline-block;
        width: 50%;
        margin-left: 30px;
        text-align: left;
      }
      .child-grade {
        .el-select {
          min-width: 100px;
          max-width: 300px;
          width: 100%;
        }
        .el-input {
          width: 100%;
          margin-left: 0;
        }
      }
    }

    // 输入优惠码
    .couponSty {
      color: #999;
      span {
        color: #c80032;
        font-size: 14px;
        line-height: 20px;
        margin-right: 5px;
        position: relative;
        top: 3px;
      }
    }
  }
}
</style>

