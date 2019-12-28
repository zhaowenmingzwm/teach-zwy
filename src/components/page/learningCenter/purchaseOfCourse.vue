<template>
    <!-- 购买课程 -->
    <div class="Purchase-of-course">
        <!-- <div class="replay-header">
            <p class="breadcrumb">
              <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="cp =='学习中心' ? { path: '/learningCenter' } : {path: '/appraisal'}">{{cp}}</el-breadcrumb-item>
                <el-breadcrumb-item :to="cp =='学习中心' ? { path: '/learningCenter' } : {path: '/appraisal'}">{{list.name}}</el-breadcrumb-item>
                <el-breadcrumb-item>购买专家咨询课程</el-breadcrumb-item>
              </el-breadcrumb>
            </p>
        </div> -->
        <div class="buy-area">
          <div class="buy-left">
            <img :src="list.coverImgUrl" alt="">
          </div>
          <div class="buy-right">
            <h1>{{list.name}}</h1>
            <div class="LearnVisualInformation" v-if="switchover == 'yes'">
              <p>学科：{{subjectCode}}</p>
              <p>年级：{{gradeCode}}</p>
              <!-- 暂时隐藏 -->
              <p :style="{display: 'none'}">教材版本：{{list.bookTypeName}}</p>
              <p>价格：￥<span>{{pitchOn ? list.livePrice : list.price}}</span></p>
            </div>
            <p class="price" v-else>价格：￥<span>{{list.livePrice}}</span></p>
            <div class="cos" v-if="switchover == 'yes'">
                <p>服务类别：</p>
                <!--<span></span>-->
                <p v-if="list.type ==1">测评</p>
                <p v-if="list.type ==2">体验测评</p>
                <label for=""  @click='pitchOnBtn()' style="cursor: pointer;">
                  <span class="check-btn" :class=" pitchOn ? 'pitchOn' : '' " v-if="list.type != 2"></span>
                  <p v-if="list.type != 2">1V1专家咨询服务</p>
                </label>
                <button @click="MentionPointsAction()" v-if="list.type != 2 && isShow == false">购买提分行动服务</button>
            </div>
            <div class="date-selection" v-if="pitchOn">
              <p class="ChooseTime">选择时段</p>
              <el-date-picker
                v-model="value"
                align="right"
                type="date"
                :clearable='false'
                placeholder="选择日期"
                class="picker"
                value-format='yyyy-MM-dd'
                :picker-options="pickerOptions0"
                @change='getList(value)'>
              </el-date-picker>
              <span class="remark">备注：预约专家咨询请选择最近7天内的时段</span>
            </div>
            <ul class="selection-time" v-if="pitchOn">
              <li v-for="(item,index) in time" :key="index"
                :class="active == index ? 'active' : ''"
                @click='TimeBtn(item,index)'
                :style="greyDisplay(item)">
                {{item.courseTimeCodeStr.substring(0,5)}}
              </li>
            </ul>
            <div class="promotion-code"  v-if="list.type != 2">
              <p>兑换码</p>
              <input v-model="couponCode"></input>
              <span v-if="error">{{error}}</span>
              <span @click="getCoupon" class="getCoupon">如何获取?</span>
            </div>
            <button class="buy-btn" @click='buyBtn()' :disabled="isDis">{{list.type == 1?"立即购买":"立即体验"}}</button>
          </div>
          <br style="clear:both"/>
        </div>
        <div class="detailCon">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="商品详情" name="one">
              <div class="image" >
                <div v-html="list.details">
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="试卷解构" name="two">
              <deconstruct :id="paperCode" v-if="paperCode"></deconstruct>
            </el-tab-pane>
          </el-tabs>
        </div>
      <el-dialog title="获取兑换码" :visible.sync="isCoupon"  center width="1200px">
        <coupon></coupon>
      </el-dialog>
    </div>
</template>

<script>
  import deconstruct from '../../common/deconstruct.vue'
  import coupon from '../../common/howToCatch.vue'
export default {
  components:{deconstruct,coupon},
  data(){
    return {
      newWin:'',
      pitchOn: this.$route.query.switchover == 'yes' ? false : true, //对勾默认个选中
      switchover:this.$route.query.switchover, //根据上个页面传过来的信息动态切换标题下面的数据
      value:this.currentTime(1), //日期
      time:{},
      active:null,
      error:'',
      couponCode:'', //优惠码
      productCode:{},
      item:null,
      list:{},
      gradeCode:'',
      subjectCode:'',
      cp:this.$route.query.cp,
      pickerOptions0: {

        disabledDate(time) {
          var that=this;
          let _now = Date.now(),
              seven = 7 * 24 * 60 * 60 * 1000,
              sevenDays = _now + seven;
          return time.getTime() < Date.now() + 60 * 60 * 1000 || time.getTime() > sevenDays;
        }
      },
      activeName:'one',
      paperCode:'',
      isCoupon:false,
      isDis:false,
      isShow: false,  //是否为保险商品  
    }
  },
  computed:{

  },
  created(){
    this.productCode = this.$route.query.code;
    this.ForMoreDetails();
    // this.isInsurance();
  },
  mounted(){
  },
  methods:{
    //如何获取
    getCoupon(){
      this.isCoupon=true
    },
    //点击
    handleClick(tab, event) {
    },
    // 判断是否为保险试卷
    isInsurance(){
      
    // }
    },
    greyDisplay(item){
      if(!this.dateConversionMinutes(item.courseTimeCodeStr.substring(0,5)) && this.currentTime() == item.date  ){
        return {
          background:'#e9e9eb',
          color:'#bcbec2',
          cursor:'not-allowed'
        }
      } else {
        return ''
      }
    },
    //选择具体时间段
    TimeBtn(item,index){
     // debugger;
      if(!this.dateConversionMinutes(item.courseTimeCodeStr.substring(0,5)) && this.currentTime() == item.date){
        return
      }
      this.item = item
      this.active = index
    },
    //立即购买
    buyBtn(){
      let localData = this.localData.get('web') || {};
      if(!localData.userId){
        this.$router.push({path:'/LoginEntrance',query:{}});
        return
      }
      if(this.pitchOn){
        if(!this.value){
         this.$message({
          message: '请选择要购买的时间段',
          type: 'warning'
        });
        return
        }
      }
      this.isDis=true;
      let params = {
          // courseTimeCode:"",
          userCode:localData.userId || '',//buzhidao
          userName:localData.realname || '' ,//buzhidao
          productType:3, //固定值3
          liveCourseCode:this.list.code ,//课程code
          orderType:this.pitchOn ? 3 : 5, //订单类型固定值3
          date:this.pitchOn ?this.value : null,//时间年月日
          courseTimeCode: this.pitchOn && this.item ? this.item.courseTimeCode : null,//时间code
          couponCode:this.couponCode, //优惠码选填   this.couponCode ?this.couponCode:null
          userMobile: localData.mobile//用户手机号
      }
      this.$axios.post(this.lantianUrl+'agency/saveOrder',params).then(res =>{
        this.isDis=false;
        if(res.httpCode == '300029'){
          this.$confirm('您已购买该测评，请前往我的订单查看', {
            confirmButtonText: '前往',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push({path:'/personalInfo',query:{state:2}})
          }).catch(() => {
          });
          return
        }
        if (res.httpCode == '300030') {
            this.$confirm('该商品已下单但还未付款，请前往我的订单进行付款', {
              confirmButtonText: '前往',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$router.push({path:'/personalInfo',query:{state:2}})
            })
            return
        }
        if(res.httpCode == '300028'){
          this.error = '兑换码无效,请重新输入'
          return
        }

        if(res.httpCode == '200'){
          if(res.result.vip == true){
            this.$router.push({path:'learningCenter'})
          } else {
            this.$router.push({path:'/paymentPage',query:{
              orderId:res.result.orderId,
              orderPrice:res.result.orderPrice,
              couponFaceValue:res.result.couponFaceValue,
              price :res.result.price
            }})
          }
        }


      })

    },
    getList(i){
      this.active = null;
      this.item = i;
      this.$axios.post(this.lantianUrl +'agency/agencyAssessLiveTeacherTime/getHaveLiveTeacherTimeList',{
        subjectCode:this.list.subjectCode,
        gradeCode :this.list.gradeCode,
        date :this.value,
        isOccupy:0
      }).then(res =>{
        if(res.httpCode == '200'){
          this.time = res.result.teacherTimeList;
        }
      })
    },
    ForMoreDetails(){
      let self = this
      this.$axios.post(this.lantianUrl + 'agency/agencyAssessProduct/getAssessProductInfo',{code:this.productCode}).then(res =>{
        if(res.httpCode == "200"){
          self.list = res.result;
          self.paperCode=res.result.paperCode
          for(let i in self.GrandList){
            if(self.list.gradeCode == i){
              self.gradeCode = self.GrandList[i]
            }
          }
          for(let i in self.commonSubject){
            if(self.list.subjectCode == i){
              self.subjectCode = self.commonSubject[i]
            }
          }
          self.getList()
          let sendData = {
         gradeCode: res.result.gradeCode || null, //年级code,
          subjectCode: res.result.subjectCode || null, //学科code
      }
      // if(){
      this.$axios.post(this.lantianUrl + "/member/isPromotionPlanInsurance",sendData).then(res =>{
        if(res.result == true){
          this.isShow = true;
        }
      })
          
        }
      })
    },
    pitchOnBtn(){
      this.pitchOn = !this.pitchOn;
    },
    //购买提分行动服务
    MentionPointsAction(){
      localStorage.setItem('active',2);
      this.$store.commit('active',2);
      const {href} = this.$router.resolve({path:'/vipCenter',query:{
                subjectCode:this.list.subjectCode,
                gradeCode : this.list.gradeCode
            }})
      this.newWin=href;
      //window.open(href, '_blank');
     // var tw=window.open('','_blank');
      //tw.location=href;
    }
  },
  watch:{
    newWin(newName,oldName){
        if(newName!=oldName && newName!="")
        // window.open(this.newWin,"_blank");
        var newPage = window.open("_blank");
        newPage.location = this.newWin
        this.$nextTick(function () {
        this.newWin="";
        })

      }
  }
}
</script>

<style lang='less' scoped>
.Purchase-of-course{
  .replay-header{
    height: 52px;
    line-height: 52px;
    border-bottom: 1px solid #d9d9d9;
    background: #fff;
    p{
      width: 1200px;
      margin: 10px auto;
      color: #7f7f7f;
      line-height: 52px;
    }
  }
  .buy-area{
    padding-bottom: 30px;
    border: 1px solid #e6e6e6;
    width: 1200px;
    margin: 20px auto;
    background-color: #fff;
    .buy-left{
      width: 325px;
      float: left;
      height: 100%;
      img{
        margin-left: 25px;
        margin-top: 25px;
        width: 257px;
        height: 223px;
      }
    }
    .buy-right{
      width: 875px;
      height: 100%;
      float: left;
      h1{
        margin-top: 33px;
        margin-bottom: 23px;
        font-size: 24px;
        color:#333333;
      }
      .price{
        line-height: 50px;
        padding-left: 20px;
        background: #f7f7f7;
        font-size: 14px;
        color: #666666;
        clear: both;
        span{
          font-size: 16px;
          font-weight: bold;
          color: #db2d43;
        }
      }
      .LearnVisualInformation{
        height: 70px;
        background: #f7f7f7;
        padding-top: 10px;
        line-height:34px;
        position: relative;
        margin-right:50px;
        p{
          float: left;
          position: absolute;
          font-size: 14px;
          color: #888888;
          span{
            color: #db2d43;
            font-size: 16px;
            font-weight: bold;
          }
        }
        p:nth-of-type(1){
          left: 20px;
        }
        p:nth-of-type(2){
          left: 240px;
        }
        p:nth-of-type(3){
          left: 457px;
        }
        p:nth-of-type(4){
          left: 20px;
          top: 40px;
        }
      }
      .cos{
        height: 45px;
        margin-bottom: 20px;
        p{
          float: left;
          color: #666666;
          font-size: 14px;
          padding-top: 24px;
        }
        button{
          cursor: pointer;
          float: left;
          width: 147px;
          height: 40px;
          color: #fff;
          background: #ff9b19;
          border-radius: 5px;
          border: none;
          margin-left: 71px;
          margin-top: 15px;
        }
        span{
          float: left;
          display: inline-block;
          width: 17px;
          height: 17px;
          border-radius: 3px;
          margin-left: 19px;
          margin-right: 11px;
          margin-top: 24px;
          cursor: pointer;
          background:url(../../../../static/img/bookCollege/check.png) no-repeat;
        }
        .check-btn{
          background: #fff;
          border: 1px solid #d4d4d4;
          box-sizing: border-box;
        }
        .pitchOn{
          background:url(../../../../static/img/bookCollege/check1.png) no-repeat;
          border: none;
        }
        p:nth-of-type(2){
          margin-right: 33px;
        }

      }
      .date-selection{
        line-height: 40px;
        height: 40px;
        clear: both;
        margin-top: 20px;
        .ChooseTime{
          float: left;
          font-size: 14px;
          color: #666666;
          margin-right: 16px;
        }
        .picker{
          float: left;
        }
        .remark{
          float: left;
          font-size: 14px;
          color: #b0b0b0;
          margin-left: 28px;
        }
      }
      .selection-time{
        margin-left: 71px;
        height: 62px;
        clear: both;
        padding-bottom: 22px;
        li{
          text-align: center;
          float: left;
          width: 66px;
          height: 38px;
          line-height: 38px;
          background-color: #f7f7f7;
          color: #666666;
          border: 1px solid #e6e6e6;
          margin-top: 21px;
          margin-right: 17px;
          cursor: pointer;
        }
        .active{
          background-color: #fff0f0;
          color: #c80032;
          border: 1px solid #c80032;
          background:url(../../../../static/img/bookCollege/tick.png) bottom right no-repeat;
        }
      }
      .promotion-code{
        clear: both;
        p{
          font-size: 14px;
          color: #666666;
          margin-right: 30px;
          float: left;
          line-height: 40px;
        }
        input{
          width: 150px;
          height: 38px;
          border: none;
          border: 1px solid #e6e6e6;
          margin-right: 31px;
        }
        span{
          line-height: 40px;
          color: #c80032;
          font-size: 14px;
        }
        .getCoupon{
          color: #67b6ee;
          cursor:pointer;
        }
      }
      .buy-btn{
        width: 103px;
        height: 40px;
        color: #fff;
        background-color: #c80032;
        border: none;
        border-radius: 5px;
        font-size: 14px;
        margin-top: 20px;
        cursor: pointer;
      }
    }
  }
  .detailCon{
    width: 1200px;
    margin: 0 auto 20px;
    border: 1px solid #e6e6e6;
    background-color: #fff;
    padding:24px 0;
    overflow-x: auto;
    .el-tabs__nav{
      margin-left:26px;
    }
    .image{
      width:100%;
      min-height: 300px;
      text-align: center;

      div{
        width: 100%;
        height: 100%;
      }
    }
  }

}
</style>
<style lang="less">
  .Purchase-of-course{
    .detailCon{
      width: 1200px;
      margin: 0 auto 20px;
      border: 1px solid #e6e6e6;
      background-color: #fff;
      padding:24px 0;
      overflow-x: auto;
      .el-tabs__nav{
        margin-left:26px;
      }
      .el-tabs__nav-wrap::after{
        height:1px;
      }
      .el-tabs__item{
        padding:0 23px !important;
        border-top-left-radius:5px;
        border-top-right-radius:5px;
        background-color: #dfdfdf;
        color: #333;
        margin-right:23px;
        font-size: 14px;
        &.is-active{
          background-color: #c80032;
          color: #fff;
        }
      }
      .el-tabs__active-bar{
        display: none !important;
      }
      .image{
        width:100%;
        min-height: 300px;
        text-align: center;

        div{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
