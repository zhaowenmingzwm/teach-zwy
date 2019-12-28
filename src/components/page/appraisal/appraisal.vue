<template>
  <!--测评首页-->
  <div class="appraisal">
    <div class="header-ganged-wrap">
      <div class="header-ganged">
        <div class="Year">
          <p>学&emsp;&emsp;年:</p>
          <span :class="active === 10000  ?'active':''" @click="AllSchoolYear()">全部</span>
          <ul>
            <li
              v-for="(item,index) in Year"
              :key="index"
              @click="YearClick(item,index)"
              :class="index == active || item.gradeCode == getGrade ?'active':''"
            >{{item.gradeName}}</li>
          </ul>
        </div>
        <div class="subject">
          <p>学&emsp;&emsp; 科:</p>
          <span :class="active1 === 10000 ? 'active' : ''" @click="AllTheSubjects()">全部</span>
          <ul>
            <li
              v-for="(item,index) in subject"
              :key="index"
              @click="getVersions(item,index)"
              :class="index == active1  || item.subjectCode == getSub ?'active':''"
            >{{item.subjectName}}</li>
          </ul>
        </div>
        <!-- 暂时隐藏教材版本中 -->
        <!-- <div class="bookType">
          <p>教材版本:</p>
          <span :class="active2 === 10000 ? 'active' : ''" @click="Allversions()">全部</span>
          <ul>
            <li
              v-for="(item,index) in bookTypes"
              :key="index"
              @click="versions(item,index)"
              :class="index == active2 ?'active':''"
            >{{item.bookType}}</li>
          </ul>
        </div> -->
      </div>
      <div style="clear:both"></div>
    </div>
    <div class="main" v-if="list.length != 0">
      <div
        v-for="(item,index) in list"
        :key="index"
        :style="(index + 1) %4 ==0 ? fourth :''"
        class="content"
        @click="ClickToBuy(item)"
      >
        <img :src="item.coverImgUrl" alt class="imgUrl">
        <div class="content-hover">
          <h1 class="price">
            <span>￥</span>
            {{item.price}}
          </h1>
          <span class="member-free">会员免费</span>
          <span class="usage-rate">{{item.showUseCount }}人使用</span>
          <p class="name-of-test-paper">{{item.name }}</p>
          <ul>
            <li>{{item.gradeCode}}</li>
            <li>{{item.subjectCode}}</li>
            <!-- 暂时隐藏 -->
            <!-- <li>{{item.bookTypeName}}</li> -->
          </ul>
          <span class="total-points">总分:{{item.totalScore}}分</span>
        </div>
      </div>
    </div>
    <div class="main-1" v-else>
      <img src="../../../../static/img/bookCollege/zwsj.png">
      <p>暂无数据</p>
    </div>
    <!-- 分页 -->
    <div class="paging">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="from.pageNum"
        :page-size="from.pageSize"
        layout="total,prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newWin: "",
      loading: true,
      Year: [], //学年
      subject: [], //学科
      bookTypes: [], //教材版本
      active: 10000,
      active1: 10000,
      active2: 10000,
      active3: 1,
      active4: 1,
      list: [], //商品列表
      total: 0,
      getGrade: this.$route.query.grade || null,
      getSub: this.$route.query.sub || null,
      from: {
        bookTypeCode: null, //教材版本号
        gradeCode: this.$route.query.grade || null, //年级code
        pageNum: 1, //当前第几页
        pageSize: 8, //一页多少条
        subjectCode: this.$route.query.sub || null, //学科code
        status: 1
      }
    };
  },
  computed: {
    fourth() {
      return "marginRight:0";
    }
  },
  created(){
    this.getGrade ? this.active = null : 10000
    this.getSub ? this.active1 = null : 10000
  },
  mounted() {
    this.getYear();
    this.AllgetSubject();
    this.getAssessProductPageList();
  },
  methods: {
    //初始化查询全部学年
    getYear(item, index) {
      let self = this;
      self.$axios
        .post("/grade/getGrades", {
          stageCode: null
        })
        .then(res => {
          if (res.code == "000000") {
            res.grades.forEach((item,index) =>{
              if(item.gradeCode == "23"){
                res.grades.splice(index, 1);
              }
            })
            self.Year = res.grades;
          }
        });
    },
    AllgetSubject() {
      let self = this;
      self.$axios.post("subject/getSubjects", {}).then(res => {
        if (res.code == "000000") {
          self.subject = res.subjects;
        }
      });
    },
    //全部学年点击
    AllSchoolYear() {
      this.getGrade = null;
      this.getSub = null;
      this.active = 10000;
      this.active1 = 10000;
      this.active2 = 10000;
      this.from.gradeCode = null;
      this.from.subjectCode = null;
      this.from.bookTypeCode = null;
      this.from.pageNum = 1;
      this.AllgetSubject();
      this.getBookTypes();
      this.getAssessProductPageList();
    },
    //学年点击
    YearClick(item, index) {
      this.getGrade = null;
      this.getSub = null;
      this.from.gradeCode = item.gradeCode;
      this.from.pageNum = 1;
      this.from.subjectCode = null;
      this.from.bookTypeCode = null;
      this.active = index;
      this.active1 = 10000;
      this.active2 = 10000;
      this.getSubject(item);
      this.getAssessProductPageList();
    },
    //全部学科点击
    AllTheSubjects() {
      this.getSub = null;
      this.from.pageNum = 1;
      this.from.subjectCode = null;
      this.from.bookTypeCode = null;
      this.active1 = 10000;
      this.active2 = 10000;
      this.getBookTypes();
      this.getAssessProductPageList();
    },
    //学科点击
    getVersions(item, index) {
      this.getSub = null;
      this.from.pageNum = 1;
      this.from.subjectCode = item.subjectCode;
      this.from.bookTypeCode = null;
      this.active1 = index;
      this.active2 = 10000;
      this.getBookTypes(item);
      this.getAssessProductPageList();
    },
    //全部教材版本点击
    Allversions() {
      this.from.pageNum = 1;
      this.active2 = 10000;
      this.from.bookTypeCode = null;
      this.getAssessProductPageList();
    },
    //教材版本点击
    versions(item, index) {
      this.from.pageNum = 1;
      this.active2 = index;
      this.from.bookTypeCode = item.ctbCode;
      this.getAssessProductPageList();
    },
    getSubject(item) {
      let self = this;
      self.$axios
        .post("/subject/getCourses", {
          gradeCode: item ? item.gradeCode : null,
          excludeRule: "omp"
        })
        .then(res => {
          self.subject = res.subjects;
          self.getBookTypes();
        });
    },
    getBookTypes(item) {
      if (!item) {
        this.bookTypes = [];
        return;
      }
      let self = this;
      self.$axios
        .post("/bookType/getBookTypes", {
          gradeCode: item ? item.gradeCode : null,
          subjectCode: item ? item.subjectCode : null
        })
        .then(res => {
          self.bookTypes = res.bookTypes;
        });
    },
    handleSizeChange(val) {
      this.from.pageSize = val;
      this.getAssessProductPageList();
    },
    handleCurrentChange(val) {
      this.from.pageNum = val;
      this.getAssessProductPageList();
    },
    //获取商品
    getAssessProductPageList(item) {
      this.$axios
        .post(
          this.lantianUrl +
            "/agency/agencyAssessProduct/getAssessProductPageList",
          this.from
        )
        .then(res => {
          if (res.httpCode == "200") {
            this.list = res.result.list;
            this.total = res.result.total;
            //遍历将gradeCode转换为年级汉字
            for (let i = 0; i < this.list.length; i++) {
              for (let j in this.GrandList) {
                if (this.list[i].gradeCode == j) {
                  this.list[i].oldgradeCode = this.list[i].gradeCode;
                  this.list[i].gradeCode = this.GrandList[j];
                }
              }
            }
            for (let i = 0; i < this.list.length; i++) {
              for (let j in this.commonSubject) {
                if (this.list[i].subjectCode == j) {
                  this.list[i].oldsubjectCode = this.list[i].subjectCode;
                  this.list[i].subjectCode = this.commonSubject[j];
                }
              }
            }
          }
        });
    },
    //点击进入下一页
    ClickToBuy(item) {
      // 判断是否买过提分承保服务
      // debugger;
      let params = {
        gradeCode: item.oldgradeCode || null,
        subjectCode: item.oldsubjectCode || null,
        userId: localStorage.getItem("token") || null
      }; 
      const _this = this;
      if (!localStorage.getItem("token")) {
          const { href } = _this.$router.resolve({
            path: "/PurchaseOfCourse",
            query: {
              code: item.code,
              switchover: "yes",
              cp: "测评",
              gradeCode: this.from.gradeCode || null,
              subjectCode: this.from.subjectCode || null
            }
          });
          _this.newWin = href;
          return;
      }
      new Promise((resolve, reject) => {
        this.$axios
        .post(
          this.lantianUrl + "/agency/agencyAssessUserProduct/userIsBuyProduct",
          {
            productCode: item.code,
            userCode: localStorage.getItem("token")
          }
        )
        .then(res => {
          // debugger;
          if (res.httpCode == "200") {
            if (res.result == true) {
              this.hint();
            } else {
            reject();
            }
          } else {
            reject();
          }
        });

      })
      .then(() => {})
      .catch(() => {
        // debugger;
        _this.$axios
          .post(_this.lantianUrl + "/member/isUserPromotionPlanInsurance", params)
          .then(res => {
            if (res.result == true) {
               _this.$confirm(
                "您是提分行动险承保用户，请按提分方案进行学习及测评",
                {
                  // confirmButtonText: "前往",
                  // cancelButtonText: "取消",
                  type: "info"
                }
              );
            } else {
              var tw;
              const { href } = _this.$router.resolve({
                  path: "/PurchaseOfCourse",
                  query: {
                    code: item.code,
                    switchover: "yes",
                    cp: "测评",
                    gradeCode: this.from.gradeCode || null,
                    subjectCode: this.from.subjectCode || null
                  }
                });
                _this.newWin = href;
            }
          });

      }) 

    },
    hint() {
      this.$confirm("您已购买该测评，请前往学习中心查看", {
        confirmButtonText: "前往",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$router.push({ path: "/learningCenter" });
        })
        .catch(() => {});
    }
  },
  watch: {
    newWin(newName, oldName) {
      if (newName != oldName && newName != "")
        var newPage = window.open("_blank");
        newPage.location = this.newWin
        this.$nextTick(function() {
        this.newWin = "";
      });
    }
  }
};
</script>

<style lang='less' scoped>
.appraisal {
  background: #f7f7f7;
  .header-ganged-wrap {
    background: #fff;
    border-bottom: 1px solid #d9d9d9;
    .header-ganged {
      width: 1200px;
      margin: 0 auto;
      min-height: 195px;
      div {
        clear: both;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        p {
          float: left;
          width: 76px;
          color: #8a8a8a;
          padding-top: 26px;
        }
        span {
          margin-top: 26px;
          float: left;
          width: 61px;
          height: 32px;
          border-radius: 50px;
          text-align: center;
          cursor: pointer;
          color: #7a7a7a;
        }
        ul {
          float: left;
          width: 1060px;

          li {
            margin-top: 26px;
            float: left;
            padding: 0 20px;
            color: #7a7a7a;
            cursor: pointer;
            border-radius: 50px;
            text-align: center;
          }
        }
        .active {
          background: #c80032;
          color: #fff;
        }
      }
      .bookType {
        ul {
          margin-top: 26px;
          li {
            margin: 0 0 16px 0;
          }
        }
      }
    }
  }
  .main {
    width: 1200px;
    min-height: 700px;
    margin: 20px auto;
    clear: both;
    .content:hover {
      transform: translateY(-6px);
      transition: transform 0.5s linear;
      .content-hover {
        box-shadow: 0px 1px 5px rgb(232, 232, 232);
      }
    }
    .content {
      .content-hover {
        height: 148px;
      }
      cursor: pointer;
      width: 285px;
      height: 400px;
      background: #fff;
      float: left;
      margin: 0 20px 20px 0;
      .imgUrl {
        height: 247px;
        width: 100%;
        display: inline-block;
      }
      .price {
        line-height: 52px;
        color: #cc2447;
        font-size: 15px;
        float: left;
        span {
          font-size: 12px;
          margin-left: 26px;
        }
      }
      .member-free {
        margin-top: 16px;
        width: 58px;
        padding-left: 7px;
        height: 22px;
        line-height: 22px;
        font-size: 10px;
        color: #fff;
        float: left;
        margin-left: 6px;
        display: inline-block;
        box-sizing: border-box;
        background: url(../../../../static/img/bookCollege/background.png)
          no-repeat;
        background-size: 100%;
      }
      .usage-rate {
        float: right;
        margin-right: 29px;
        margin-top: 19px;
        color: #d0d0d0;
        font-size: 14px;
      }
      .name-of-test-paper {
        width: 236px;
        overflow: hidden;
        height: 50px;
        text-overflow: ellipsis;
        clear: both;
        line-height: 25px;
        font-size: 16px;
        margin-left: 26px;
        color: #6b6b6b;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-right: 23px;
      }
      ul {
        margin-left: 26px;
        float: left;
        line-height: 42px;
        font-size: 14px;
        color: #b6b6b6;
        li {
          float: left;
          color: #afafaf;
          margin-right: 9px;
        }
        li:nth-of-type(3) {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: 60px;
        }
      }
      .total-points {
        float: right;
        margin-right: 28px;
        color: #afafaf;
        font-size: 14px;
        line-height: 42px;
      }
    }
  }

  .paging {
    margin: 22px auto 60px;
    width: 1200px;
    text-align: center;
    clear: both;
  }
  .main-1 {
    width: 1200px;
    height: 500px;
    background: #fff;
    margin: 20px auto;
    text-align: center;
    color: #666;
    img {
      margin-top: 100px;
    }
  }
}
</style>
<style lang="less">
// .appraisal{
.el-message-box {
  .el-message-box__btns {
    .el-button--primary {
      background-color: #c80032 !important;
      border-color: #c80032;
    }
  }
}
// }
</style>
