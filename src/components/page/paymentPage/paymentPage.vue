<template>
  <!-- 微信支付宝支付页面 -->
  <div class='payment-page'>
    <div class="header">
      <p>确认订单信息</p>
      <span>请在30分钟内完成支付，否则订单将会被自动取消</span>
    </div>
    <div class="mode-of-payment">
      <div class="payment-left">
        <div  @click='confirm()'  :class='active == 0 ? "active": ""'><img src="../../../../static/img/bookCollege/zhifubao.png" alt=""></div>
        <div  @click='NWeChat()' :class='active == 3 ? "active": ""'><img src="../../../../static/img/bookCollege/weixing.png" alt=""></div>
      </div>
      <div class="payment-right">
        <img :src="imgUrl" alt="">
        <p>打开{{way}}扫一扫付款</p>
      </div>
    </div>
    <div class="footer">
      <p>应付金额： <span>{{price}}</span> 元</p>
      <!-- <span class="couponFaceValue">优惠券已抵扣{{couponFaceValue}}元</span> -->
    </div>
  </div>
</template>

<script>
  import QRCode from 'qrcode'

  export default {
    data(){
      return{
        active:3,
        imgUrl:'', //二维码
        way:'微信 ',
        orderPrice:this.$route.query.orderPrice, //实际的金额
        couponFaceValue:this.$route.query.couponFaceValue, //优惠金额
        price :this.$route.query.price,  //优惠后的金额
        interval:'',//轮询
        newWin:''
      }
    },
    methods:{
      //支付宝支付
      Alipay(){
        this.active = 0;

        this.way = '支付宝'
        let self = this;
        var data = {
          orderId: self.$route.query.orderId,
          payType: self.active,
          productType : 3
        };
        self.$axios.post(self.lantianUrl + 'agency/getNotifyPayParam',data).then(res =>{
          if(res.httpCode == '200'){
            this.localData.set('Alipay',res.result.sign)
            const {href} = this.$router.resolve({
              path: "/alipayPage",
              query:"",
            });
           // var tw=window.open('','_blank');
           // tw.location=href;
            self.newWin=href;
           // window.open(href, '_blank');
          }
        })
      },
      //微信支付
      NWeChat(){
        this.active = 3
        this.way = '微信 '
        this.paymentMethod()
      },
      paymentMethod(){
        let self = this;
        var data = {
          orderId: self.$route.query.orderId,
          payType: self.active,
          productType : 3
        };
        self.$axios.post(self.lantianUrl + 'agency/getNotifyPayParam',data).then(res =>{
          let sty = QRCode.toDataURL(JSON.parse(res.result.sign).qrCode,(err,url) =>{
            self.imgUrl = url;
          })
        })
      },
      confirm(){
        this.$confirm('此操作将跳到第三方支付', '是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          window.clearInterval(this.interval)
          this.Alipay()
        }).catch(() => {
        });
      },
      polling(){
        this.$axios.get(this.lantianUrl + "/agency/getOrder" , {params:{
          orderId:this.$route.query.orderId
        }}).then(res =>{
          if(res.httpCode == '200'){
            if(res.result.status == 2){
              this.$message({
                message: '成功支付正在跳转',
                type: 'success'
              });
              window.clearInterval(this.interval);
              this.$router.push({path:'/learningCenter'})
            }
          }
        })
      },
      polledOrderInfo(){
        this.interval = setInterval(this.polling, 3000)
      },
      setTime(){
        var time = 1000 * 60 * 30
        var set = setTimeout(() =>{
          this.$router.go(0)
          window.clearTimeout(set)
        },time)
      }

    },
    mounted(){
      this.paymentMethod()
    },
    created(){
      this.polledOrderInfo()
      this.setTime()

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
    },
    beforeDestroy(){
      window.clearInterval(this.interval);
    }
  }
</script>

<style lang='less' scoped>
  .payment-page{
    width: 1200px;
    margin: 0 auto;
    .header{
      height: 80px;
      font-size: 14px;
      p{
        float: left;
        margin-right: 43px;
        margin-top: 45px;
        color: #666666;
      }
      span{
        float: left;
        margin-top: 44px;
        color: #c80032;
      }
    }
    .mode-of-payment{
      height: 217px;
      padding-top: 40px;
      background-color: #fff;
      border: 1px solid #e6e6e6;
      .payment-left{
        float: left;
        div{
          width: 208px;
          height: 76px;
          margin-left: 50px;
          margin-bottom: 20px;
          border: 1px solid #e6e6e6;
          cursor: pointer;
          img{
            margin-left: 25px;
            margin-top: 5px;
          }
        }
        .active{
          border-color: #c80032;
          background: url(../../../../static/img/bookCollege/tick.png) right bottom no-repeat;
          background-size: 25px;
        }
      }
      .payment-right{
        float: right;
        img{
          float: left;
          border: 1px solid #cc1140;
        }
        p{
          float: left;
          margin-top: 75px;
          margin-right: 146px;
          margin-left: 29px;
          width: 70px;
          font-size: 14px;
        }
      }
    }
    .footer{
      height: 75px;
      border: 1px solid#e6e6e6;
      margin-top: 15px;
      background: #fff;
      color: #8a8a8a;
      line-height: 75px;
      p{
        margin-left: 50px;
        float: left;
        span{
          color: #c80032;
          font-size: 18px;
          font-weight: bold;
        }
      }
      .couponFaceValue{
        float: left;
        margin-left: 41px;
        font-size: 14px;
        color: #67b6ee;
      }
    }
  }

</style>
