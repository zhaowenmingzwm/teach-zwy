<template>
  <div class="buyInsurance" >
    <p class="p1">提分行动保险会以本次测评试卷中所预测的提升分数进行承保</p>
    <div class="ins-con">
      <p class="subject">
        <label for>科目</label>
        <el-button
          class="sub"
        >{{GrandList[paperData.gradeCode]}}{{commonSubject[paperData.subjectCode]}}</el-button>
      </p>
      <p class="code">
        <label for>邀请码</label>
        <el-input v-model="inviteCode" @input="inCode(inviteCode)"></el-input>
        <span class="code-span" v-if="messShow">{{mess}}</span>
      </p>
      <p class="price">
        <label for>支付金额</label>
        <span style="color:#c80032" v-if="paperData.price != 0">￥{{paperData.price}}</span>
      </p>
      <p class="xieyi">
        <el-checkbox label="1" @change="tongyi()">同意遵守提分行动险协议</el-checkbox>
        <span class="xieyi-sapn" @click="showXieYi">《保险协议》</span>
      </p>
    </div>

    <div class="buyBtn">
      <el-button @click="buyIns" :disabled="showBuyBtn" :class="{gray: isGray}">立即购买</el-button>
    </div>
    <el-dialog title="提分行动承保服务协议" class="xieSty" :visible.sync="centerDialogVisible">
      <div :style="{padding: '0 10px'}">
        <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;尊敬的用户： </h3>
        <h3 :style="{marginTop: '10px'}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;欢迎您选择北京易教空间教育科技股份有限公司（以下简称“易教空间”）的提分承保产品及服务，在购买和支付前，请您务必仔细阅读并确认同意本协议全部内容。</h3>
        
        <h3 :style="{marginTop: '10px'}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一、确认和签署本协议</h3>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.您在完成注册程序及购买程序过程中点击“我同意”按钮即表示您已仔细阅读并完全接受《易教空间用户注册使用协议》，以及本协议的全部条款和条件。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.易教空间郑重提醒您注意本协议中的全部条款，请您仔细阅读，自主考虑风险。未成年人应在法定监护人的陪同下阅读并签署本协议。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.本协议中“提分承保产品及服务”，是易教空间联合天安财产保险股份有限公司北京分公司（以下简称“天安保险”）针对高考数学、高考语文两科，为用户推出的“提分承保服务”，用户在购买并参与提分承保产品及服务后，如当年高考成绩未能达到测评报告预测的高考最低达标分数值，天安保险将根据本协议服务条款通过易教空间退还用户相应的费用。</p>
        <h3 :style="{marginTop: '10px'}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;二、相关名词及解释</h3>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. 初始测评分数：是您购买易教空间提分承保产品及服务前，完成定位卷所得的测评成绩。您务必注意，无论您完成了多少次测评，只有当您完成定位卷所得的测评成绩，方可视为您的初始测评分数。此分数将作为易教空间为您提供承保分数的依据。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. 初始测评报告：是您购买易教空间提分承保产品及服务前，完成定位卷所得的成绩分析报告。您务必注意，只有当您完成定位卷后所得出的测评报告，方可视为您的初始测评报告。此报告将作为易教空间为您制定系统化的提分承保方案的依据。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. 承保分数：是以您初始测评分数为依据，由易教空间为您出具的初始测评报告所预测的您高考最低达标分数值。若您最终高考分数未达到此最低达标分数值，则您可按照本协议条款获得相应的理赔金额。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4. 承诺提升分数：是您的承保分数与您的初始测评分数相减之差。</p>
        
        <h3 :style="{marginTop: '10px'}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;三、收费标准及支付</h3>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. 易教空间提分承保产品及服务所列明的标价，均按单人单科计价计算，即4980元/人/科。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. 一旦您选择购买此提分承保产品及服务并支付相应款项，即视为您认可该项承保产品及服务标明之价格以及本协议全部条款和条件。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. 提分承保产品及服务费用将在您点击购买之日按照其标示价格通过以支付宝、微信支付等第三方代收费的方式由易教空间收取。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4. 您可通过登录易教空间网站页面，进入“我的订单”项下，免费查询您消费的提分承保产品及服务详情（包括您购买的提分承保产品及服务名称、标示价格、付款状态等）。</p>

        <h3 :style="{marginTop: '10px'}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;四、承保方式、理赔标准及承保期限</h3>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.承保方式：自您购买提分承保产品及服务之后，如您2020年高考成绩未达到测评报告预测的高考最低达标分数值，天安保险将通过易教空间向您支付提分承保产品及服务的保险赔偿金</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.具体理赔金额计算方式如下：[承诺提升分数-（您最终高考分数-您初始测评分数）]/承诺提升分数*2400元。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.具体理赔金额计算方式如下：[承诺提升分数-（您最终高考分数-您初始测评分数）]/承诺提升分数*2400元。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;示例：您测评报告的初始测评分数为60分，承保分数为90分，则承诺提升分数为30分，若您最终高考分数为80分，实际提升了20分，您的赔偿限额固定为2400元（以“N”指代），则您得到的具体理赔金额为:理赔金额=[30-（80-60）]/30*N</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.承保期限：自您购买易教空间提分承保服务及产品之日起，您享受的承保期限为自您缴纳学费次日0时起至2020年6月11日24时止。凡在承保期限之外购买的提分承保产品及服务，则不再享受本协议所约定的提分承保服务。</p>

        <h3 :style="{marginTop: '10px'}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;五、用户权利限制</h3>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. 自您购买提分承保产品及服务之日起，易教空间将根据您的初始测评报告结果为您制定系统的提分承保方案，您必须严格按照此承保方案完成您的学习任务。若您在提分承保服务期限届满前，未完成的学习任务量超过易教空间提分承保方案总体任务量的15%（含15%），您将不能获得本协议服务条款约定的理赔。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本条规定的“未完成”是指在提分承保期限内，您未严格按照易教空间为您制定的提分承保方案完成您的学习任务，包括但不限于：</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（1）.您未按照易教空间规定的时间内完成易教空间为您推荐的测评卷；</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（2）.您未按照易教空间提分承保方案的要求完成“深度解构题、练习题、以及方案反馈等”；</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(3).您未按照易教空间提分承保方案的要求下载相应学科的WORD习题完成练习并上传您的学习效果图片等</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. 您购买的提分承保产品及服务，所支付的金额均按单人单科计价，仅限您本人使用，不得将您的易教空间账户有偿或无偿提供、转让给任何第三人，并允许他通过您的易教空间账户使用非由其付费购买的提分承保产品及服务。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. 未经许可，不得以任何方式对提分承保产品及服务或其任何部分进行复制、改编、传播、交易、借用、存储或上传至其他平台供他人使用（不论商业或非商业用途）。凡发生前述行为者，均视为侵权行为，易教空间对此等侵权行为保留采取一切法律救济手段之权利，并可视情形对违约用户采取注销或限制其账户功能、产品及服务使用权限等措施。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4. 禁止对易教空间用于保护其提分承保产品及服务的任何安全措施技术进行攻克、反向操作、更改、破坏或其他篡改，或协助他人进行上述行为。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5. 每一个提分承保产品及服务都有限定的使用有效期，您一旦购买并完成支付即视为认可该使用有效期。如您未在有效期内使用，视为自动放弃，易教空间概不退款。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6. 非因法定原因，您在任何情形下无权要求易教空间退回或返还您已经支付的购买款项。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7. 您选择购买提分承保产品及服务并支付相应款项后，如发生使用行为（包括但不限于对相关产品课件或其任何部分进行下载等），您无权要求易教空间退回或返还您已经支付的购买款项。</p>

        <h3 :style="{marginTop: '10px'}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;六、风险及责任</h3>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. 您应自行负责妥善且正确地保管、使用、维护您在易教空间申请取得的账户及账户密码。并对账户密码采取必要和有效的保密措施。任何使用您注册帐号以及密码的行为视为您本人的行为，并由您为此承担一切相关责任和后果。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. 您明确了解并同意，本协议约定的付费方式为代收费运营商托收方式，代收费运营商可通过易教空间查看您提供的相关支付信息。代收费运营商有自己的用户条款和隐私权政策，并自行承担相应的法律责任。除非适用法律有相反的规定，否则易教空间对这些网站和应用程序不承担担保责任或其他任何责任。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. 如您（或任何使用您的账户和密码之行为）违反《易教空间用户注册使用协议》及本协议中的内容，易教空间有权在不通知您的情况下立即终止您已购买的所有服务，以及取消您的易教空间账户和使用权限，但不退还任何您已缴纳的收费费用。</p>

        <h3 :style="{marginTop: '10px'}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;七、免责条款</h3>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. 鉴于网络服务的特殊性，对于因服务器的死机、网络故障、数据库故障、软件升级、服务器维修、调整、升级等问题，或其他不可控事由，包括但不限于政府行为、自然灾害、黑客攻击等造成的服务中断和对您个人数据及资料造成的损失，易教空间不承担由此对您造成的任何损失或退还任何您已缴纳的服务费用。但易教空间应尽可能及时进行通告并采取相应的补救措施。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. 您购买的提分承保产品及服务有效期限中包含解决故障、服务器维修、调整、升级等所需用的合理时间，对上述情况所需用的时间易教空间不予补偿。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. 您将个人密码告知他人或与他人共享注册帐户，由此导致的任何个人资料泄露和其他后果，易教空间不负任何责任。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4. 在某些罕见情况下，如因政府管制、权利授权等问题致使易教空间平台上提分承保服务及产品无法使用。在这种情况下，易教空间可以根据不同情况用其他产品替换方式补偿而无须退费。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5. 您购买的提分承保产品及服务，必须由您本人严格按照易教空间规定的时间节点完成提分承保方案规定的学习任务。每一个阶段的学习任务将按照规定的时间节点进行，如因为您个人原因导致学习任务迟延或者因学习任务量的积压在短时间仓促完成所迟延或积压的学习任务，导致您高考最终分数未能达到最低达标分数的，易教空间不承担任何赔偿责任。</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6. 易教空间对任何间接、偶然、特殊及继起的损害不负责任，不予赔偿。</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkList: [1],
      isShow: false,
      centerDialogVisible: false,
      subject: null,
      inviteCode: null,
      isChoose: false,
      paperData: [],
      showBuyBtn: true,
      isGray: true,
      mess: "",
      messShow: true,
      paramData: {},
      userData: JSON.parse(localStorage.getItem("web"))
    };
  },
  props: {
    params: Object
  },
  created() {
    this.paramData = JSON.stringify(this.params);
    this.getInfo();
  },
  methods: {
    // 用户协议
    showXieYi() {
      this.centerDialogVisible = true;
    },
    // 同意协议
    tongyi() {
      //   this.isChoose == false ? this.isChoose = true : false
      if (this.isChoose == false) {
        this.isChoose = true;
        this.isGray = false;
        this.showBuyBtn = false;
      } else {
        this.isChoose = false;
        this.isGray = true;
        this.showBuyBtn = true;
      }
    },
    // 获取信息
    getInfo() {
      let data = {
        gradeCode: this.params.gradeCode,
        subjectCode: this.params.subjectCode,
        userId: this.params.userCode
      };
      this.$axios
        .post(this.lantianUrl + "member/getPromotionPlanInsurance", data)
        .then(res => {
          this.params.liveCourseCode = res.result.id;
          this.paperData = res.result;
        });
      this.paramData = this.params;
    },
    // 下单
    buyIns() {
      let sendData = {
        userCode: this.userData.userId || null,
        userName: this.userData.realname || null,
        productType: 3,
        liveCourseCode: this.paperData.id,
        evaluationRecordId:
          this.paramData.evaluationRecordId ||
          this.paramData.newevaluationRecordCode ||
          null,
        orderType: 7,
        inviteCode: this.inviteCode || null,
        userMobile: this.userData.mobile || null
      };

      if (!this.inviteCode) {
        this.$message("请输入邀请码");
        return;
      } else if (this.isChoose === false) {
        this.$message("请同意选择保险协议");
        return;
      }
      this.$axios
        .post(this.lantianUrl + "agency/saveOrder", sendData)
        .then(res => {
          if (res.httpCode == "300028") {
            this.$message({
              type: "error",
              message: res.message
            });
            // this.mess = res.message;
          } else if (res.httpCode == "300029") {
            this.$message({ type: "error", message: res.message,duration: 3000 });
            // this.mess = res.message;
          } else if (res.httpCode == "300037") {
            this.$message({ type: "error", message: res.message });
            // this.mess = res.message;
          } else if (res.httpCode == "300038") {
            this.$message({ type: "error", message: res.message });
            // this.mess = res.message;
          } else if (res.httpCode == "300039") {
            this.$message({ type: "error", message: res.message });
            
            // this.mess = res.message;
          } else if (res.httpCode == "300040") {
            this.$message({ type: "error", message: res.message });
            // this.mess = res.message;
          } else if (res.httpCode == "300041") {
            this.$message({ type: "error", message: res.message });
            // this.mess = res.message;
          } else if (res.httpCode == "300042") {
            this.$message({ type: "error", message: res.message });
            // this.mess = res.message;
          } else if (res.httpCode == "500") {
            this.$message({ type: "error", message: res.message });
            // this.mess = res.message;
          } else if (res.httpCode == "200") {
            this.$router.push({
              path: "/paymentPage",
              query: {
                orderId: res.result.orderId || null,
                orderPrice: res.result.orderPrice || null,
                couponFaceValue: res.result.couponFaceValue || null,
                price: res.result.price || null
              }
            });
          }
          this.$emit("hide", false)

        });
    },
    // 优惠码输入
    inCode(i) {
      if (i.length == 0) {
        this.messShow = false;
        this.mess = "";
      } else {
        this.messShow = true;
      }
    }
  }
};
</script>

<style lang="scss">
.buyInsurance {
  .p1 {
    padding: 14px 0;
    background-color: #f5f5f5;
    text-align: center;
    margin-bottom: 40px;
  }
  .ins-con {
    padding-left: 43px;
    label {
      display: inline-block;
      padding: 0 15px;
      border-left: solid 2px #c80032;
      width: 80px;
      font-size: 16px;
      color: #333;
    }
    .subject {
      margin-bottom: 20px;
      .sub {
        background-color: #ececec;
        color: #333;
      }
      .sub:hover {
        border: solid 1px #d9d9d9;
        color: #333;
      }
    }
    .code {
      margin-bottom: 34px;
      .el-input {
        width: 170px;
      }
      .code-span {
        color: #c80032;
        margin-left: 20px;
      }
      label {
      }
    }
    .price {
      margin-bottom: 40px;
    }
    .xieyi {
      margin-bottom: 40px;
      label {
        border: none;
      }
      .xieyi-sapn {
        margin-left: 80px;
        cursor: pointer;
        color: blue;
      }
    }
  }
  .buyBtn {
    padding: 20px 0;
    text-align: center;
    border-top: solid 1px #ccc;

    .el-button {
      background-color: #c80032;
      color: #fff;
    }
  }
  .xieSty {
    z-index: 3000;
    text-align: center;
    height: 90%;
    overflow: hidden;
    .el-dialog {
      height: 100%;
      overflow: auto;
    padding-bottom: 16%;
    }
    // .el-dialog__body {
    //   padding-bottom: 20%;
    // }
    p {
      // padding: 20px;
      // padding-bottom: 50px;
      line-height: 28px;
      margin-top: 20px;
      // height: 520px;
      // overflow-y: scroll;
    }
  }
}
.gray {
  background-color: #ccc !important;
}
.v-modal {
  z-index: 2000 !important;
}
</style>

