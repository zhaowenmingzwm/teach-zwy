<template>
    <div class="header">
        <div class="logo">案例重构教学平台
            <span v-if="userInfo.userType == 3">-校长端</span>
        </div>
        <div class="schoolName" v-if="userInfo.userType == 3">{{userInfo.schoolName}}</div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    {{userInfo.userName}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <div id="headDrop">

                        <div v-if="userInfo.userType == 15">
                            <el-dropdown-item command="userManger">用户管理</el-dropdown-item>
                            <el-dropdown-item style="position:relative" class="sourceFa">
                              <i class="el-icon-caret-left"></i><span>课程管理</span>
                              <ul class="boxSource">
                                <li @click="$router.push({ path: '/reportAnalyzeList',query:{}})">报告解读课</li>
                                <li @click="$router.push({  path: '/managementBack/abilityList',query:{}})">能力训练课</li>
                              </ul>
                            </el-dropdown-item>
                            <el-dropdown-item style="position:relative" class="sourceFa">
                              <i class="el-icon-caret-left"></i><span>运营管理</span>
                              <ul class="boxSource">
                                <li @click="$router.push({ path: '/orderList',query:{}})">订单列表</li>
                                <li @click="$router.push({  path: '/orderDetails',query:{}})">订单流水</li>
                              </ul>
                            </el-dropdown-item>
                        </div>

                        <div v-else-if="userInfo.userType == 11">
                           <!-- <el-dropdown-item command="myCourse">我的课表</el-dropdown-item>-->
                            <el-dropdown-item command="newCourse">我的课表</el-dropdown-item>
                            <el-dropdown-item command="courseRecommend">课程推荐</el-dropdown-item>
                            <el-dropdown-item command="orderManage">订单管理</el-dropdown-item>
                            <el-dropdown-item command="InfoNotice">消息通知</el-dropdown-item>
                            <el-dropdown-item command="warningList1">预警列表</el-dropdown-item>

                        </div>

                        <div v-else-if="userInfo.userType == 12">
                            <el-dropdown-item command="courseTrack">我的课表</el-dropdown-item>
                            <!--<el-dropdown-item command="classPlan2">我的课表</el-dropdown-item>-->
                            <!--<el-dropdown-item command="classTrack">产生式教学</el-dropdown-item>-->
                            <el-dropdown-item command="teaMessageList">消息通知</el-dropdown-item>
                            <el-dropdown-item command="warningList">预警列表</el-dropdown-item>
                        </div>

                        <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
                        <el-dropdown-item command="loginout">退出</el-dropdown-item>
                    </div>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible" size="tiny" :show-close=false class="passwordBox">
            <el-form :label-position="labelPosition" class="innerbox" label-width="80px" :model="form">
                <el-form-item label="新密码">
                    <el-input type="password" placeholder="请输入6-12位新密码" v-model="form.pwd" :maxlength="maxlength" auto-complete="off" class="pwd"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input type="password" placeholder="请再次输入新密码" v-model="form.pwd2" :maxlength="maxlength" auto-complete="off" class="pwd"></el-input>
                </el-form-item>
            </el-form>
            <p class="changeP">
                <el-button type="primary" @click="changePwd" class="changeP-b">确 定</el-button>
                <el-button @click="dialogFormVisible = false" class="changeP-b">取 消</el-button>
            </p>
        </el-dialog>
    </div>
</template>
<script>
import md5 from "js-md5";
export default {
    data() {
        return {
            maxlength: 12,
            minlength: 6,
            labelPosition: "left",
            userInfo: this.localData.get("userInfo"), //用户登录后保存用户信息
            name: "linxin",
            dialogFormVisible: false,
            form: {
                pwd: "",
                pwd2: ""
            }
        };
    },
    computed: {
        username() {
            //                let username = localStorage.getItem('ms_username');
            //                return username ? username : this.name;
            return "测试";
        }
    },
    methods: {
        handleCommand(command) {
            if (command == "loginout") {
                localStorage.clear();
                if (location.hostname == "localhost") {
                    window.location.href = "#/login";
                } else {
                    window.location.href =
                        location.protocol +
                        "//" +
                        location.hostname +
                        "/org/index.html";
                }
            }
            if (command == "changePwd") {
                this.form = {};
                this.dialogFormVisible = true;
            }

            if(command =="userManger"){
                this.$router.push({ path: '/schoolAdmin/studentList'});
            }


            if(command =="myCourse"){
                this.$router.push({ path: '/classPlan'});
            }
          if(command =="newCourse"){
            this.$router.push({ path: '/courseTime'});
          }
            if(command =="InfoNotice"){
                this.$router.push({ path: '/inform'});
            }
            if(command =="warningList1"){
                this.$router.push({ path: '/warningList1'});
            }



            if(command =="courseRecommend"){
                this.$router.push({ path: '/commendClassList'});
            }
            if(command =="orderManage"){
                this.$router.push({ path: '/orderManage'});
            }



            if(command =="classPlan2"){
                this.$router.push({ path: '/classPlan2'});
            }
          if(command =="courseTrack"){
            this.$router.push({ path: '/courseTrack'});
          }
            if(command =="classTrack"){
                this.$router.push({ path: '/classTrack'});
            }
            if(command =="teaMessageList"){
                this.$router.push({ path: '/teaMessageList'});
            }
            if(command =="warningList"){
                this.$router.push({ path: '/warningList'});
            }

        },
        changePwd() {
            if (this.form.pwd.length < 6) {
                this.$message("您新密码太短");
                return;
            }
            if (this.form.pwd != this.form.pwd2) {
                this.$message("两次输入密码不一致");
                return;
            }
            this.$axios
                .post("/authorize/resetUserPwd",
                    {
                        userId: this.userInfo.userId,
                        userName: this.userInfo.userName,
                        userPassword: md5(this.form.pwd)
                    }
                )
                .then(res => {
                    if (res.httpCode == "200") {
                        this.dialogFormVisible = false;
                        this.$notify({
                            title: "成功",
                            message: "重置密码成功",
                            type: "success"
                        });
                    }
                });
        }
    }
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    font-size: 22px;
    color: #fff;
}
.header .logo {
    float: left;
    width: 290px;
    text-align: center;
}
.header .schoolName {
    float: left;
    font-size: 14px;
}
.user-info {
    float: right;
    padding-right: 50px;
    font-size: 16px;
    color: #fff;
}
.user-info .el-dropdown-link {
    position: relative;
    display: inline-block;
    padding-left: 50px;
    color: #fff;
    cursor: pointer;
    vertical-align: middle;
}
.user-info .user-logo {
    position: absolute;
    left: 0;
    top: 15px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.changeP {
    height: 25px;
}

.changeP .changeP-b {
    float: right;
}

.changeP .changeP-b:nth-child(1) {
    margin-left: 10px;
}
.pwd {
    width: 250px;
}
.passwordBox{
    line-height: 18px;
}
.innerbox{
    padding-left: 20px;
}
.boxSource {
  display: none;
  position: absolute;
  background: #fff;
  width: 100px;
  text-align: center;
  top: 0px;
  right: 101%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .12);
  border-radius: 4px;
  min-width: 150px;
  border-radius: 5px;
  overflow: hidden;
}

#headDrop .sourceFa:hover .boxSource {
  display: block;
  color: #000;
  background-color: #fff;
}

#headDrop {
  min-width: 150px;
  text-align: center;
  border-radius: 5px;
  padding: 0px;
  border: none;
}

#headDrop>li:first-child {
  border-radius: 5px 5px 0px 0px;
}

#headDrop>li:last-child {
  border-radius: 0px 0px 5px 5px;
}

.boxSource li {
  background-color: #fff;
  color: #000;
    border-bottom: 1px solid #dedede;
    line-height: 40px;
}
.boxSource li:last-child {
    border: none;
}
.boxSource li:hover {
    background-color: #ecf5ff;
    color: #66b1ff;
}

.sourceFa>i {
  position: absolute;
  left: 20px;
  top: 12px;
  font-size: 14px;
}

</style>

<style type="text/css">


#headDrop .el-dropdown-menu__item {
    border-bottom: 1px solid #dedede;
    line-height: 40px;
}

.el-dropdown-menu.el-popper{
    padding: 0px;
}

#headDrop > .el-dropdown-menu__item:last-child {
    border: none;
}
</style>
