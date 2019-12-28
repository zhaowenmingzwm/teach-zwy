<template class='LoginEntrance'>
  <!-- 登录页 -->
  <div class="Content-area">
    <div class="Content-left">
      <img src="../../../../static/img/character.png" alt=""/>
    </div>
    <!-- 登录账号 -->
    <div class="Content-right" v-if="!RegistrationButtonStatus">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">快捷登录</el-menu-item>
        <el-menu-item index="2">账号密码登录</el-menu-item>
      </el-menu>
        <!--快捷登录-->
        <div class="The-login-area" v-show='cut'>
          <el-input class="account1 account86" type="text"  placeholder="手机号" v-model="smsCodeAccount"></el-input>
          <el-input class="DynamicCode Dynamic" type="text" v-model="smsCode" placeholder="动态码" auto-complete="new-password"></el-input>
          <el-input  type="text" style="opacity: 0;height: 0;width: 0;"></el-input>
          <el-button class="GetDynamicCode" @click='getCode()'>{{Btn}}</el-button>
          <span class="Error" style="padding-top: 33px;" v-if="loginCertification"><i></i>{{loginCertification}}<a @click="$store.commit('RegistrationButtonStatus',true)" v-if="DL2"> 立即注册</a></span>
        </div>
        <!-- 账号密码登录 -->
        <div class="The-login-area" v-show="!cut">
          <el-select v-model="selectMode" placeholder="手机号" class="Select-input-mode">
              <el-option label="手机号" value="1"></el-option>
              <el-option label="账号" value="2"></el-option>
            </el-select>
            <el-input class="account Dynamic1" type="text" v-model="cellPhoneNumber" :placeholder="selectMode == '1' ? '手机号' : '账号'"></el-input>
            <el-input class="password Dynamic" type="password" v-model='password' placeholder="密码" show-password></el-input>
            <a class="forget" @click='forgetThePassword'>忘记密码?</a>
            <span class="Error" v-if="loginCertification1"><i></i>{{loginCertification1}}<a v-if="DL1" @click="$store.commit('RegistrationButtonStatus',true)"> 立即注册</a></span>
        </div>
        <button class="The-login-btn" @click='TheLoginButton'  v-show='cut' @keyup.enter="TheLoginButton">登录</button>
        <button class="The-login-btn" @click='TheLoginButton1' v-show="!cut" >登录</button>
        <span class="register" @click='registerBtn'>注册</span>
    </div>
    <!-- 注册 -->
    <div class="Content-right Content-right-register" v-if='RegistrationButtonStatus'>
      <el-menu :default-active="activeIndex1" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">手机号快速注册</el-menu-item>
      </el-menu>
        <div class="The-login-area">
          <el-input class="account1 account86" placeholder="手机号/账号" v-model="applyMobile"></el-input>
          <el-input class="DynamicCode Dynamic2" placeholder="动态码" v-model='mobile'></el-input>
          <el-input  type="text" style="opacity: 0;height: 0;width: 0;"></el-input>
          <el-button class="GetDynamicCode" @click='registerGetCode()'>{{Btn2}}</el-button>
          <el-input class="account1 Dynamic" type="password" placeholder="密码长度6-20位字符" v-model="setaPassword" show-password></el-input>
          <p class="reminder">提示:密码只可包含数字字母</p>
          <span class="Error"><i  v-if="error"></i><span>{{error}}<a v-if="DL" @click="$store.commit('RegistrationButtonStatus',false)">立即登录</a></span></span>
          <button class="register-immediately" @click='registerImmediately'>立即注册</button>
        </div>
        <div class="The-login-base">
          <p><input type="checkbox" v-model='checkbox'>阅读并同意测评中心以下政策协议</p>
          <span><agreement></agreement></span>
        </div>
    </div>
    <!-- 弹出框 -->
    <el-dialog :visible.sync="dialogVisible" width="471px">
        <div class="modal-box">
          <p class="model-forget">忘记密码</p>
          <span class="modal-mobile">手机号</span>
          <span class="modal-area-code">+86</span>
          <input type="text" class="modal-ipt-code" placeholder="手机号" v-model="ResetTheAccount">
          <span class="modal-code">动态码</span>
          <input class="modal-ipt-code1" v-model="validateCode" placeholder="请输入动态码" type="text">
          <button class="modal-count-down" @click='forgetGetCode()'>{{Btn1}}</button>
          <div style="clear:both"></div>
          <span class="new-password ">新密码</span>
          <input class="new-code" type="password" placeholder="新密码" v-model="newPassword" show-password>
          <p class="Modal-box-error-message">{{hh}}</p>
          <div style="clear:both"></div>
          <button class="modal-submit" @click='resetBtn()'>提交</button>
          <p style="line-height:26px;color:#999999;">备注： 已有案例重构账号的用户 , 可先绑定手机号后,通过手机号进行密码找回</p>
        </div>
    </el-dialog>


     <el-dialog :visible.sync="dialogVisible1" width="471px">
        <div class="modal-box">
           <div class="modal-box">
            <p class="model-forget">绑定手机号</p>
            <p class="title">您当前登录账号为案例重构教学平台用户,需先绑定手机号，才可登录</p>
            <span class="modal-mobile">手机号</span>
            <span class="modal-area-code">+86</span>
            <input type="text" class="modal-ipt-code" placeholder="手机号" v-model="BindingAccount">
            <span class="modal-code">动态码</span>
            <input class="modal-ipt-code1" v-model="BindCaptcha" placeholder="请输入动态码" type="text">
            <button class="modal-count-down" @click='BindCaptchaBtn()'>{{Btn3}}</button>
            <div style="clear:both"></div>
            <p class="Modal-box-error-message">{{ee}}</p>
            <div style="clear:both"></div>
            <button class="modal-submit" @click='bindingBtn()'>提交</button>
          </div>
        </div>
    </el-dialog>
    <form class="layui-form" style="display:none">
      <input type="text"/>
      <input type="password"/>
    </form>
  </div>
</template>

<script>
import agreement from '../../common/agreement.vue'
import md5 from "js-md5";
import { global } from '../../../api/common'
export default {
    components:{
      agreement
    },
    created(){
      var self = this;
      document.onkeydown = function(e) {
      var key = window.event.keyCode;
        if (key == 13) {
          self.TheLoginButton1();
        }
      }
    },
    computed:{
      RegistrationButtonStatus(){
        return this.$store.state.RegistrationButtonStatus
      }
    },
    data() {
        return {
          none:'',
            checkbox:false,
            hh:"",
            ee:'',
            activeIndex : '1',
            activeIndex1: '1',
            selectMode:'1',
            cut:true,
            countDown:'获取验证码',
            applyMobile:'',//注册的手机号
            mobile:'',//注册的验证码
            setaPassword:'',//注册的密码
            cellPhoneNumber:'',//账号密码登录的号
            password:'',//账号密码登录的密码
            smsCode:'',//快捷登录的验证码
            smsCodeAccount:'',//快捷登录账号
            error:'',//注册时错误提示信息
            dialogVisible: false,
            dialogVisible1:false,
            banBtn:true,
            loginCertification:'',//快捷登录时候错误的提示信息
            loginCertification1:'',//账号密码登录时的错误提示
            ResetTheAccount:'',//重置密码需要的账号
            validateCode:'',//重置密码验证码
            newPassword:'',//重置密码
            BindingAccount:'',//账号登录需要绑定的账号
            BindCaptcha:'',//账号登录需要绑定的验证码
            yes:false,
            Btn:'获取验证码',
            yes1:false,
            Btn1:'获取验证码',
            yes2:false,
            Btn2:'获取验证码',
            yes3:false,
            Btn3:'获取验证码',
            DL:false,
            DL1:false,
            DL2:false
        }
    },
    methods: {
        //tab切换
        handleSelect(key, keyPath){
          if (key == 1){
            this.cut = true
          } else {
            this.cut = false
          }
        },
        //注册页切换
        registerBtn(){
          this.$store.commit('RegistrationButtonStatus',true)
        },
        //立即注册按钮
        registerImmediately(){
          let self = this;
          self.DL = false
          let myreg=/^1[34578]\d{9}$/;
            let str = /^[a-z0-9A-Z]{6,18}$/
          if(self.applyMobile.length > 0){
            if (!myreg.test(self.applyMobile)){
              self.error = '手机格式不正确'
              return
            } else {
              self.error = ''
            }
          } else {
            self.error = '请输入手机号码'
            return
          }
          if(self.mobile.length < 1){
            self.error = '请输入验证码'
            return
          }
          if(self.setaPassword.length < 1){
            self.error = '请输入密码'
            return
          }
          if(!str.test(self.setaPassword)){
            self.error = '密码长度为6-18位'
            return
          }
          if(!this.checkbox){
            self.error = '请阅读同意测评中心政策'
            return
          }
          self.$axios.post('/user/register',{
            mobile:this.applyMobile,
            password:md5(this.setaPassword),
            smsCode:this.mobile
          }).then(res =>{
            if(res.code == '000304'){
              self.error = '验证码错误'
              return 
            }
            if(res.code == '000302'){
              self.error ='账号已存在'
              self.DL = true
              return 
            }
            if(res.code == '000000'){
              self.error = '注册成功'
              self.DL = true
            }  else {
              self.error = res.message
            }
          })
        },
        //登录获取验证码
        getCode(){
          if(this.yes){
            return
          }
          let self = this;
          let time = 60
          let myreg=/^1[34578]\d{9}$/;
          if(self.smsCodeAccount.length > 0){
            if(!myreg.test(self.smsCodeAccount)){
              self.loginCertification = '手机格式不正确'
              return
            } else {
              self.loginCertification = ''
            }
          } else {
              self.loginCertification = '手机号码不能为空'
              return
          }

          self.$axios.post('/sms/evaluationSMS',{mobile:self.smsCodeAccount,productType:1}).then(res =>{
            if(res.code == '000000'){
              self.loginCertification = '动态码已发送,请查看手机'
              var sendTimer = setInterval(function(){
                self.yes = true;
                time--;
                self.Btn = "已发送"+time;
                if(time < 0){
                  self.yes  = false;
                  clearInterval(sendTimer);
                  self.Btn = "重新发送";
                }
              },1000)
            }

          })

        },
        //重置密码验证码
        forgetGetCode(){
          if(this.yes1){
            return
          }
          let time = 60
          let self = this;
          let myreg=/^1[34578]\d{9}$/;
          if(self.ResetTheAccount.length > 0){
            if (!myreg.test(self.ResetTheAccount)){
              self.hh = '手机格式不正确'
              return
            } else {
              self.hh = ''
            }
          } else {
            self.hh = '请输入手机号码'
            return
          }
          self.$axios.post('/sms/evaluationSMS',{mobile:self.ResetTheAccount,productType:1}).then(res =>{
             if(res.code == '000000'){
              self.hh = '动态码已发送,请查看手机'
              var sendTimer = setInterval(function(){
                self.yes1 = true;
                time--;
                self.Btn1 = "已发送"+time;
                if(time < 0){
                  self.yes1  = false;
                  clearInterval(sendTimer);
                  self.Btn1 = "重新发送";
                }
              },1000)
            }
          })
        },
        //确定重置密码
        resetBtn(){
          let self = this;
          let myreg=/^1[34578]\d{9}$/;
          let str = /^[a-z0-9A-Z]{6,18}$/
          if(self.ResetTheAccount.length > 0){
              if(!myreg.test(self.ResetTheAccount)){
                self.hh = '手机号码格式不正确'
                return
              } else {
                self.hh = ''
              }
            } else {
              self.hh = '手机号码不能为空'
              return
            }
            if(self.newPassword.length < 1){
              self.hh = '密码不能为空'
              return
            }
            if(self.validateCode.length < 1){
              self.hh = '验证码不能为空'
              return
            }
            if(!str.test(self.newPassword)){
                self.hh = '密码长度为6-18位'
                return
            }
          self.$axios.post('/user/resetPassword',{validateCode:self.validateCode,mobile:self.ResetTheAccount,newPassword:md5(self.newPassword)}).then(res =>{
            if(res.code == '000304'){
                self.hh = '验证码不正确'
            }
            if(res.code == '000000'){
              this.$message({
                message: '重置成功',
                type: 'success'
              })
              this.dialogVisible = false
            }
          })
        },
        //注册获取验证码
        registerGetCode(){
           if(this.yes2){
            return
          }
          let time = 60
          let self = this;
          let myreg=/^1[34578]\d{9}$/;
          if(self.applyMobile.length > 0){
            if (!myreg.test(self.applyMobile)){
              self.error = '手机格式不正确'
              return
            } else {
              self.error = ''
            }
          } else {
            self.error = '请输入手机号码'
            return
          }
          self.$axios.post('/sms/evaluationSMS',{mobile:self.applyMobile,productType:1}).then(res =>{
             if(res.code == '000000'){
              self.hh = '动态码已发送,请查看手机'
              var sendTimer = setInterval(function(){
                  self.yes2 = true;
                  time--;
                  self.Btn2 = "已发送"+time;
                  if(time < 0){
                    self.yes2  = false;
                    clearInterval(sendTimer);
                    self.Btn2 = "重新发送";
                  }
                },1000)
             }
            })
        },
        //验证码登录按钮
        TheLoginButton(){
          let self = this;
          this.DL2 = false
          let myreg=/^1[34578]\d{9}$/;
          //验证码登录的校验
          if (self.smsCodeAccount.length > 0){
            if(!myreg.test(self.smsCodeAccount)){
              self.loginCertification = '手机号码格式不正确'
              return
            } else {
              self.loginCertification = ''
            }
          } else {
            self.loginCertification = '手机号码不能为空'
            return
          }
          if(self.smsCode.length < 1){
            self.loginCertification = '验证码不能为空'
            return
          }
          self.$axios.post('/user/login',{
            username:self.smsCodeAccount, //账号
            password:null, //登录密码二选一
            smsCode:this.smsCode //登录验证码二选一
          }).then(res =>{
            if(res.code == '000301'){
                self.loginCertification = '账号不存在'
                this.DL2 = true
                return
            }
            if(res.code == '000304'){
                self.loginCertification = '验证码错误'
                return
            }
            if(res.code == '000000'){
              self.smsCodeAccount = ''
              this.smsCode = ''
              this.localData.set('web',res)
              global.userId = res.userId;
              self.$store.commit('userState',res.userId)
              sessionStorage.setItem('token',res.userId)
              localStorage.setItem('token',res.userId)
              self.$router.push({path:'/homePage'})
            } else {
              self.loginCertification = res.message
            }
          })
        },
        //账号密码登录按钮
        TheLoginButton1(){

            let self = this;
            this.DL1 = false
            let myreg=/^1[34578]\d{9}$/;
            let str = /^[a-z0-9A-Z]{6,18}$/
            if(self.cellPhoneNumber.length > 0){
              if(self.selectMode == '1'){
                if(!myreg.test(self.cellPhoneNumber)){
                  self.loginCertification1 = '手机号码格式不正确'
                  return
                } else {
                  self.loginCertification1 = ''
                }
              }
            } else {
              self.loginCertification1 = '手机或者账号不能为空'
              return
            }
            if(self.password.length < 1){
              self.loginCertification1 = '密码不能为空'
              return
            }
            if(!str.test(self.password)){
                self.loginCertification1 = '密码长度为6-18位'
                return
            }
            self.$axios.post('/user/login',{
              username:self.cellPhoneNumber, //账号
              password:md5(self.password), //登录密码二选一
              smsCode:null //登录验证码二选一
            }).then(res =>{
              if(res.code == '000301'){
                self.loginCertification1 = '账号不存在'
                this.DL1 = true
                return
              }
              if(res.code == '000303'){
                  self.loginCertification1 = '密码错误'
                  return
              }
              if(res.code == '000000'){
                if(res.mobile == null){
                  self.dialogVisible1 = true
                  return;
                }
                self.cellPhoneNumber = ''
                self.password = ''
                this.$store.commit('userState',res.userId)
                this.localData.set('web',res)
                global.userId = res.userId;
                sessionStorage.setItem('token',res.userId)
                localStorage.setItem('token',res.userId)
                localStorage.setItem('active',0)
                this.$store.commit('mobile',res.mobile)
								this.$store.commit('active',0)
								
								self.$router.push({path:'/homePage'})
								


              } else {
                self.loginCertification1 = res.message
              }
            })


        },
        //绑定账号的验证码
        BindCaptchaBtn(){
          if(this.yes3){
            return
          }
          let time = 60
          let self = this;
          let myreg=/^1[34578]\d{9}$/;
          if(self.BindingAccount.length > 0){
            if (!myreg.test(self.BindingAccount)){
              self.ee = '手机格式不正确'
              return
            } else {
              self.ee = ''
            }
          } else {
            self.ee = '请输入手机号码'
            return
          }
          self.$axios.post('/sms/evaluationSMS',{mobile:self.BindingAccount,productType:1}).then(res =>{
            if(res.code == '000000'){
              self.ee = '动态码已发送,请查看手机'
              var sendTimer = setInterval(function(){
                self.yes3 = true;
                time--;
                self.Btn3 = "已发送"+time;
                if(time < 0){
                  self.yes3  = false;
                  clearInterval(sendTimer);
                  self.Btn3 = "重新发送";
                }
              },1000)
            }
          })
        },
        //绑定账号提交
        bindingBtn(){
          let self = this;
          let myreg=/^1[34578]\d{9}$/;
          let str = /^[a-z0-9A-Z]{6,18}$/
          if(self.BindingAccount.length > 0){
              if(!myreg.test(self.BindingAccount)){
                self.ee = '手机号码格式不正确'
                return
              } else {
                self.ee = ''
              }
            } else {
              self.ee = '手机号码不能为空'
              return
            }
            if(self.BindCaptcha.length < 1){
              self.ee = '验证码不能为空'
              return
            }
          this.$axios.post('/user/accountBindMobile',{
            mobile : self.BindingAccount,
            account : self.cellPhoneNumber,
            smsCode :self.BindCaptcha,
            password:md5(self.password)
          }).then(res =>{
            if(res.code == '000304'){
              self.ee = '验证码不正确'
            }
            if(res.code == '000304'){
              self.ee = '账号已经绑定'
            }
            if(res.code == '000000'){
              self.TheLoginButton1()
            } else {
              self.ee = res.message
            }
          })
        },
        //忘记密码弹出框
        forgetThePassword(){
          this.dialogVisible = true
        }

    },
    mounted(){
      this.sessionData.delete('token')
      this.localData.delete('token')
      localStorage.removeItem('active')
    },
    updated(){

    }
}
</script>

<style lang='less' scoped>
.Content-area{
    width: 1200px;
    margin: 0 auto;
    background:#f7f7f7;
    position: relative;
    height: 600px;
    .Content-left{
      margin-left: 98px;
      padding-top: 110px;
    }
    .Content-right{
        width: 305px;
        height: 367px;
        padding: 30px;
        background: #fff;
        position: absolute;
        top: 88px;
        right: 56px;
        box-shadow: 0px 0px 15px #efefef;
        .The-login-area{
          height: 183px;
          .Select-input-mode{
            width: 76px;
            height: 41px;
            margin-top: 14px;
            float: left;
          }
          .account{
            float: right;
            width: 220px;
            margin-top: 14px;
          }
          .password{
            margin-top: 14px;
          }
          .forget{
            float:right;
            margin-top: 14px;
            font-size: 14px;
            color: #666666;
            cursor: pointer;
          }
          .account1{
            width: 100%;
            margin-top: 14px;
          }
          .DynamicCode{
            width: 196px;
            float: left;
            margin-top: 14px;
          }
          .GetDynamicCode{
            width: 100px;
            float: right;
            margin-top: 14px;
          }
        }
        .The-login-btn{
          width: 100%;
          height: 42px;
          background-color: #c80032;
          color: #fff;
          border: none;
          margin-bottom: 25px;
          cursor: pointer;
        }
        .register{
          line-height: 49px;
          font-size: 14px;
          float: right;
          color: #666666;
          cursor: pointer;
        }
        .el-input__inner{
          border-radius: 0;
        }
      .el-menu--horizontal{
        .el-menu-item{
          padding-left:2px;
        }
      }
    }
    .Content-right-register{
      height:451px!important;
    }
    .The-login-base{
      height: 87px;
      border-top: 1px solid #f5f5f5;
      margin-top: 120px;
      font-size: 12px;
      p{
        margin-left: 31px;
        color: #999999;
        height:48px; line-height: 48px;
        input{
          vertical-align: middle;
          margin-right:4px;
        }
      }
      span{
        div{
            margin-left: 35px;
        color: #0075f6;
        cursor: pointer;
        }

      }
    }
    .register-immediately{
      width: 100%;
      height: 41px;
      border: none;
      color: #fff;
      background-color: #c80032;
      cursor: pointer;
    }
    .reminder{
      margin-top: 14px;
      font-size: 12px;
      color: #999;
    }
    .Error{
      height: 44px;
      width: 100%;
      display: block;
      line-height: 44px;
      font-size: 12px;
      color: #c80032;
      clear: both;
        text-align: center;
      i{
        width:18px;
        height:18px;
        display:inline-block;
        background: url("../../../assets/image/icon.png");
        background-size: 100% 100%;
        vertical-align: middle;
        margin-right:4px;

      }
      a{
        color: #0075f6;
        cursor: pointer;
      }
    }
    .modal-box{
      width: 323px;
      height: 255px;
      margin: 0 auto;
      .model-forget{
        text-align: center;
        font-size: 14px;
        position: absolute;
        top: 22px;
        left: 45%;
      }
      .modal-mobile{
        margin-right: 20px;
        color: #666666;
        float: left;
        line-height: 36px;
      }
      .modal-area-code{
        float: left;
        height: 36px;
        line-height: 36px;
        width: 35px;
        display: inline-block;
        color: #5a5a5a;
        border-bottom: 1px solid #d9d9d9;
      }
      .modal-ipt-code{
        float: left;
        height: 36px;
        line-height: 36px;
        width: 226px;
        display: inline-block;
        color: #5a5a5a;
        border: none;
        border-bottom: 1px solid #d9d9d9;
      }
      .modal-code{
        color: #666666;
        float: left;
        line-height: 36px;
        margin-top: 18px;
        margin-right: 20px;
      }
      .modal-ipt-code1{
        width: 141px;
        line-height: 36px;
        margin-top: 18px;
        float: left;
        display: inline-block;
        color: #5a5a5a;
        border: none;
        border-bottom: 1px solid #d9d9d9;
        margin-right: 18px;
      }
      .modal-count-down{
        margin-top: 18px;
        width: 98px;
        height: 36px;
        border:1px solid#c80032;
        color: #c80032;
        background-color: #fff;
        cursor: pointer;
        float: left;
      }
      .modal-submit{
        clear: both;
        margin-top: 32px;
        width: 100%;
        height: 42px;
        color: #fff;
        background: #c80032;
        float: left;
        border: none;
        margin-bottom: 5px;
      }
      .new-password{
        float:left;
        line-height: 36px;
        margin-right: 20px;
        margin-top: 18px;
      }
      .new-code{
        float:left;
        height: 36px;
        margin-top: 18px;
        border: none;
        border-bottom: 1px solid #d9d9d9;
        width: 260px;
      }
      .Modal-box-error-message{
        text-align: center;
        position: absolute;
        bottom: 115px;
        width: 100%;
        left: 0;
        color:#c80032;
      }
      .title{
        line-height: 26px;
      }
    }
}
</style>
<style lang='less'>
.Content-area{
  .is-active{
    border-bottom-color:red!important;
  }
  .el-input__inner{
    padding:0 10px;
    border-radius: 0;
  }
  .el-button{
    border-radius: 0;
  }
  .account86 .el-input__inner{
      background: url(../../../../static/img/bookCollege/86.png) 16px 11px no-repeat !important;
      padding-left: 88px;
  }
  .Dynamic .el-input__inner{
      background: url(../../../../static/img/bookCollege/123.png) 16px center no-repeat !important;
      padding-left: 47px;
  }
  .Dynamic1 .el-input__inner{
      background: url(../../../../static/img/bookCollege/Dynamic1.png) 16px center no-repeat !important;
      padding-left: 47px;
  }
  .Dynamic2 .el-input__inner{
      background: url(../../../../static/img/bookCollege/Dynamic2.png) 16px center no-repeat !important;
      padding-left: 47px;
  }
}

</style>

