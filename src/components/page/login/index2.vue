<template>
  <div class="login-wrap">
    <div class="login-bg">
      <div class="ms-login">
        <div class="ms-title"><!-- 案例重构教学平台 --></div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
          <el-form-item prop="userAccount">
            <input class="input_txt input_txt_user" type="text" v-model="ruleForm.userAccount" placeholder="请输入账号">
          </el-form-item>
          <el-form-item prop="userPassword">
            <input class="input_txt input_txt_pwd" type="password" placeholder="请输入密码" v-model="ruleForm.userPassword" @keyup.enter="login()">
          </el-form-item>
          <div class="login-btn">
            <span @click="login">登录</span>
          </div>
          <p class="tips">
            <router-link to="beforeLogin"></router-link>
            <a>忘记密码？</a>
          </p>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import md5 from "js-md5";
  export default {
    data: function() {
      return {
        data: {
          isShowPhoneError: false
        },
        elseRole: "",
        role: "角色", //登录角色
        ruleForm: {
          userAccount: "",
          userPassword: ""
        },
        rules: {
          userAccount: [{
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }],
          userPassword: [
            { required: true, message: "请输入密码", trigger: "blur" }
          ]
        }
      };
    },
    mounted: function() {
      localStorage.clear();
    },
    methods: {
      login() {
        let { ruleForm: { userAccount, userPassword } } = this;
        if (!userAccount) {
          this.showMobileError("请输入手机号");
          return;
        }

        if (!userPassword) {
          this.showPwdError("请输入密码");
          return;
        }

        if (userPassword.length < 6 || userPassword.length > 16) {
          this.showPwdError("密码为6-16位");
          return;
        }


        this.$axios.post('/agency/user/agencyLogin', {
          "userAccount": userAccount,
          "userPassword": userPassword
        }).then((res) => {
          if (res.httpCode == "200"&&res.result!=null) {
            var userType = res.result.userType;
            var resultArray = [];
            var authList = []; //可访问的路由列表（权限）
            switch (userType) {
              case 11: //学生
                authList = ["/courseTime",'/classPlan', '/inform','/classRecord','/warningList1','/calender','/paperTest','/commendClassList','/abilityOpration',"/courseTime","/buyAbilityClass","/reportCourseDetail","/orderManage","/goLive","/managementBack/detailAbilityClass","/blank","/abilityOpration",'/paying','/stumanage/paperReport','/paperAnswer','/paperView'];
                resultArray = [{
                  resourceId: 1,
                  resourceParentId: 0,
                  resourceName: "我的课表",
                  resourceUrl: "/classPlan",
                  resourceDesc: "",
                  resourceIcon: "el-icon-setting"
                },
                  {
                    resourceId: 2,
                    resourceParentId: 0,
                    resourceName: "消息通知",
                    resourceUrl: "/inform",
                    resourceDesc: "产品后台管理系统-校长端-系统管理员-学生管理",
                    resourceIcon: "el-icon-setting"
                  },
                  {
                    resourceId: 3,
                    resourceParentId: 0,
                    resourceName: "预警列表",
                    resourceUrl: "/warningList1",
                    resourceDesc: "",
                    resourceIcon: "el-icon-setting"
                  },
                  {
                    resourceId: 4,
                    resourceParentId: 0,
                    resourceName: "订单管理",
                    resourceUrl: "/orderManage",
                    resourceDesc: "",
                    resourceIcon: "el-icon-setting"
                  }
                ]
                break;
              case 12: //教师
                authList = ["/courseTrack",'/classPlan2', '/classTrack', '/teaMessageList', '/classRecord','/warningList','/classDetail','/questionDetail','/goPaper','/goLive','/goPaintbrush',"/abilityOpration",'/paperView'];
                resultArray = [{
                  resourceId: 1,
                  resourceParentId: 0,
                  resourceName: "我的课表",
                  resourceUrl: "/classPlan2",
                  resourceDesc: "",
                  resourceIcon: "el-icon-setting"
                },
                  {
                    resourceId: 4,
                    resourceParentId: 0,
                    resourceName: "案例重构教学",
                    resourceUrl: "/classTrack",
                    resourceDesc: "",
                    resourceIcon: "el-icon-setting"
                  },
                  {
                    resourceId: 2,
                    resourceParentId: 0,
                    resourceName: "消息通知",
                    resourceUrl: "/teaMessageList",
                    resourceDesc: "",
                    resourceIcon: "el-icon-setting"
                  },
                  {
                    resourceId: 3,
                    resourceParentId: 0,
                    resourceName: "预警列表",
                    resourceUrl: "/warningList",
                    resourceDesc: "",
                    resourceIcon: "el-icon-setting"
                  }
                ]

                break;
              case 13: //教务
                authList = ['/studentsList', '/teachList','/addStudent','/addTeacher','/coursePlan','/giveTime','/changeTime',"/eduInformation","/eduWarninglist","/studentDetail","/planClass","/eduClassPlan","/classRecord","/timeTable","/changeStudent","/changeTeacher"];
                resultArray = [{
                  resourceId: 1,
                  resourceParentId: 0,
                  resourceName: "学生列表",
                  resourceUrl: "/studentsList",
                  resourceDesc: "",
                  resourceIcon: "el-icon-setting"
                },
                  {
                    resourceId: 2,
                    resourceParentId: 0,
                    resourceName: "教师列表",
                    resourceUrl: "/teachList",
                    resourceDesc: "",
                    resourceIcon: "el-icon-setting"
                  },{
                    resourceId: 3,
                    resourceParentId: 0,
                    resourceName: "总课表",
                    resourceUrl: "/timeTable",
                    resourceDesc: "",
                    resourceIcon: "timeTable"
                  },
                  {
                    resourceId: 4,
                    resourceParentId: 0,
                    resourceName: "消息通知",
                    resourceUrl: "/eduInformation",
                    resourceDesc: "",
                    resourceIcon: "el-icon-setting"
                  },
                  {
                    resourceId: 5,
                    resourceParentId: 0,
                    resourceName: "预警列表",
                    resourceUrl: "/eduWarninglist",
                    resourceDesc: "",
                    resourceIcon: "el-icon-setting"
                  }
                ]
                break;
              case 14: //教研
                authList = ['/resStudent/studentList', '/resTeachList','/resStudent/aisciGrade','/planClass','/course','/resStudent/resCourse','/flowMange/flowList','/flowMange/addFlow','/checkPaper/index','/flowMange/stepList','/flowMange/addStep','/flowMange/changeStep','/flowMange/changeFlow',"/teareserchInform","/teaserchWarn","/classRecord"];
                resultArray = [{
                  resourceId: 1,
                  resourceParentId: 0,
                  resourceName: "学生列表",
                  resourceUrl: "/resStudent/studentList",
                  resourceDesc: "",
                  resourceIcon: "el-icon-setting"
                },
                  {
                    resourceId: 2,
                    resourceParentId: 0,
                    resourceName: "教师列表",
                    resourceUrl: "/resTeachList",
                    resourceDesc: "",
                    resourceIcon: "el-icon-setting"
                  },
                  // {
                  //   resourceId: 3,
                  //   resourceParentId: 0,
                  //   resourceName: "安排课程",
                  //   resourceUrl: "/planClass",
                  //   resourceDesc: "",
                  //   resourceIcon: "el-icon-setting"
                  // },
                  {
                    resourceId: 4,
                    resourceParentId: 0,
                    resourceName: "流程步骤设置",
                    resourceUrl: "",
                    resourceDesc: "",
                    resourceIcon: "el-icon-setting",
                    hasChildren:true,
                    children:[
                      {
                        resourceId: 4-1,
                        resourceParentId: 4,
                        resourceName: "流程设置",
                        resourceUrl: "/flowMange/flowList",
                        resourceDesc: "",
                        resourceIcon: "el-icon-setting"
                      },
                      {
                        resourceId: 4-2,
                        resourceParentId: 4,
                        resourceName: "步骤设置",
                        resourceUrl: "/flowMange/stepList",
                        resourceDesc: "",
                        resourceIcon: "el-icon-setting"
                      }

                    ]
                  },
                  {
                    resourceId: 5,
                    resourceParentId: 0,
                    resourceName: "诊断校验",
                    resourceUrl: "/checkPaper/index",
                    resourceDesc: "",
                    resourceIcon: "el-icon-setting"
                  },{
                    resourceId: 6,
                    resourceParentId: 0,
                    resourceName: "消息通知",
                    resourceUrl: "/teareserchInform",
                    resourceDesc: "",
                    resourceIcon: "el-icon-setting"
                  },
                  {
                    resourceId: 7,
                    resourceParentId: 0,
                    resourceName: "预警列表",
                    resourceUrl: "/teaserchWarn",
                    resourceDesc: "",
                    resourceIcon: "el-icon-setting"
                  }
                ]
                break;
              case 15: //校管理员
                authList = ["/schoolAdmin/studentList","/schoolAdmin/teacherList","/schoolAdmin/eduMangeList","/schoolAdmin/teaResearchList","/schoolAdmin/addUser","/managementBack/abilityList","/managementBack/addAbilityClass","/managementBack/addUnscramble","/reportAnalyzeList","/orderList","/orderDetails","/managementBack/editAbilityClass","/managementBack/detailAbilityClass",'/paperView'];
                resultArray = [{
                  resourceId: 1,
                  resourceParentId: 0,
                  resourceName: "学生列表",
                  resourceUrl: "/schoolAdmin/studentList",
                  resourceDesc: "",
                  resourceIcon: "el-icon-setting"
                },
                  {
                    resourceId: 2,
                    resourceParentId: 0,
                    resourceName: "教师列表",
                    resourceUrl: "/schoolAdmin/teacherList",
                    resourceDesc: "",
                    resourceIcon: "el-icon-setting"
                  },
                  {
                    resourceId: 3,
                    resourceParentId: 0,
                    resourceName: "教务列表",
                    resourceUrl: "/schoolAdmin/eduMangeList",
                    resourceDesc: "",
                    resourceIcon: "el-icon-setting"
                  },
                  {
                    resourceId: 4,
                    resourceParentId: 0,
                    resourceName: "教研列表",
                    resourceUrl: "/schoolAdmin/teaResearchList",
                    resourceDesc: "",
                    resourceIcon: "el-icon-setting"
                  }, {
                    resourceId: 5,
                    resourceParentId: 0,
                    resourceName: "添加用户",
                    resourceUrl: "/schoolAdmin/addUser",
                    resourceDesc: "",
                    resourceIcon: "el-icon-setting"
                  },
                  {
                    resourceId: 6,
                    resourceParentId: 0,
                    resourceName: "添加用户",
                    resourceUrl: "/orderList",
                    resourceDesc: "",
                    resourceIcon: "el-icon-setting"
                  },
                  {
                    resourceId: 7,
                    resourceParentId: 0,
                    resourceName: "添加用户",
                    resourceUrl: "/orderDetails",
                    resourceDesc: "",
                    resourceIcon: "el-icon-setting"
                  },
                ];
                break;
            }
            this.localData.set('userInfo', res.result) //用户信息
            this.localData.set('resultArray', resultArray) // 用于渲染侧边栏菜单
            this.localData.set('authList', authList) //用于校验访问路径是否在权限数组之内。
            this.$router.push({ path: authList[0] })//跳到首页
            this.localData.set('firstUrl',authList[0]) //菜单高亮
          } else {
            this.$message(res.message);
          }
        }).catch((error) => {
          console.log(error)
          this.$message(error.message);
        })
      },
      showPwdError(val) {
        this.$message(val);
      }
    }
  };

</script>
<style scoped >
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background: url(../../../../static/img/b_bg.png) repeat-x;
  }

  .login-bg {
    background: url(../../../../static/img/bg.jpg) no-repeat;
    width: 1422px;
    height: 773px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .ms-title {
    font-size: 36px;
    color: #7fbed0;
    margin: 46px 0;
    text-align: center;
  }

  .ms-login {
    width: 460px;
    border-radius: 5px;
    background: #fff;
    position: absolute;
    left: 75%;
    top: 30%;
    transform: translate(-50%, -50%);
  }

  .input_txt {
    height: 40px;
    border: none;
    border-bottom: 1px solid #7fbed0;
    padding-left: 44px;
    font-size: 16px;
    width: 300px;
    font-family: "microsoft yahei";
  }

  .input_txt_user {
    background: url(../../../../static/img/user.png) no-repeat;
  }

  .input_txt_pwd {
    background: url(../../../../static/img/pwd.png) no-repeat;
  }

  .login-btn {
    margin-top: 80px;
    text-align: center;
  }

  .login-btn span {
    display: inline-block;
    line-height: 65px;
    border-radius: 5px;
    width: 460px;
    height: 65px;
    font-size: 24px;
    background: #7fbed0;
    border: none;
    color: #fff;
    font-family: "microsoft yahei";
    cursor: pointer;
  }

  .login-btn span:hover {
    opacity: 0.8;
  }

  .tips {
    position: relative;
    color: #999;
    line-height: 60px;
  }

  .tips a:nth-of-type(2) {
    position: absolute;
    right: 0;
  }

  .demo-ruleForm{
    margin-top: 200px;
  }

</style>
