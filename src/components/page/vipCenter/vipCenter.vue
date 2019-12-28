<template>
  <div class="vipCenter">
    <!-- 轮播图 -->
    <div class="vip-head">
      <div>
        <el-carousel>
          <el-carousel-item>
            <div class="img1"></div>
            <!-- <img src="@/assets/image/VIP/banner1-1.png" alt> -->
          </el-carousel-item>
          <el-carousel-item>
            <div class="img2"></div>
            <!-- <img src="@/assets/image/VIP/banner2-2.png" alt> -->
          </el-carousel-item>
            <el-carousel-item>
            <div class="img1"></div>
            <!-- <img src="@/assets/image/VIP/banner1-1.png" alt> -->
          </el-carousel-item>
           <el-carousel-item>
            <div class="img2"></div>
            <!-- <img src="@/assets/image/VIP/banner2-2.png" alt> -->
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!-- 保险切换按钮 -->
    <div class="insuranceBtn">
      <el-radio-group v-model="radio1" fill="#c80032" @change="chooseType(radio1)">
        <el-radio-button label="action" class="actSty">提分行动</el-radio-button>
        <el-radio-button label="insurance">提分承保服务</el-radio-button>
      </el-radio-group>
    </div>
    <div v-if="radio1 == 'action' && vipType == 3">
      <!-- 会员权益 -->
      <div class="huiyuan">
        <div>
          <img src="@/assets/image/VIP/logo1.png">
          <p>免费测评+报告服务</p>
          <p class="p2">购买提分行动可享受单学科免费测评+报告服务</p>
        </div>
        <div>
          <img src="@/assets/image/VIP/logo2.png">
          <p>个性化学习资料</p>
          <p class="p2">每个提分方案都附带深度解构试题（可下载打印）和针对性练习题</p>
        </div>
        <div class="huiyuan-div3">
          <img src="@/assets/image/VIP/logo3.png">
          <p>学科专家思维引导</p>
          <p class="p2">还原学科专家解题思维逻辑，给学生最高效的学习方法和路径</p>
        </div>
      </div>
    </div>
    <div v-if="radio1 == 'insurance' " class="insSty">
      <img src="@/assets/image/VIP/banner612.png">
    </div>
    <!-- 提分行动 -->
    <div v-if="radio1 == 'action' && vipType == 3" class="actBtn">
      <el-button @click="goAction">立即购买</el-button>
    </div>
    <!-- 保险科目 -->
    <div v-if="radio1 == 'insurance'  " class="actBtn insBtn">
      <el-radio-group v-model="radio2"  @change="goMeasurement(radio2)">
        <!-- 暂时置灰 @click.native="chooseSub(i)" -->
        <el-radio-button
          :label="i.subjectCode"
          v-for="(i,ind) in subData"
          :key="ind"
          disabled
          @mouseenter.native="insuranceenter(ind)"
          @mouseleave.native="insuranceleave(ind)"
        
        >{{insuranceHide === ind ? '敬请期待' : `高考${i.subjectName}测评`}}</el-radio-button>
      </el-radio-group>
    </div>
    <div class="contain" v-if="vipType == 1">
      <!-- 选择学科 -->
      <div class="chooseSubjectStyle">
        <p class="choose-title">选择学科 (已选择{{subjectNumber}}科)</p>
        <!-- <div class="choose-contain">
          <div class="stageName">
            <label>小学</label>
            <el-checkbox-group v-model="checkArr1" text-color="#c80032" fill="#ffe6e6">
              <el-checkbox-button
                :disabled="!item.isEleAble ? isDisable = true : false"
                :class="item.isEleAble ? 'newSty' : ''"
                @change="chooseSubject(item,i)"
                v-for="(item,i) in data.xiaoxue.subjects"
                :label="item.subjectCode"
                :key="i"
                @mouseenter.native="enter(item)"
                @mouseleave.native="toDraw(item)"
              >
                <span v-html="item.subjectName"></span>
                 <div class="new" v-if="item.isEleAble">
                  new
                </div>
              </el-checkbox-button>
            </el-checkbox-group>
          </div>
          <div class="stageName">
            <label>初中</label>
            <el-checkbox-group v-model="checkArr2" text-color="#c80032" fill="#ffe6e6">
              <el-checkbox-button
                :disabled="!item.isEleAble ? isDisable = true : false"
                :class="item.isEleAble ? 'newSty' : ''"
                @mouseenter.native="enter(item)"
                @mouseleave.native="toDraw(item)"
                @change="chooseSubject(item,i)"
                v-for="(item,i) in data.chuzhong.subjects"
                :label="item.subjectCode"
                :key="i"
              >
                <span v-html="item.subjectName"></span>
                 <div class="new" v-if="item.isEleAble">
                  new
                </div>
              </el-checkbox-button>
            </el-checkbox-group>
          </div>
          <div class="stageName">
            <label>中考</label>
            <el-checkbox-group v-model="checkArr3" text-color="#c80032" fill="#ffe6e6">
              <el-checkbox-button
                :disabled="!item.isEleAble ? isDisable = true : false"
                :class="item.isEleAble ? 'newSty' :  '' "
                @mouseenter.native="enter(item)"
                @mouseleave.native="toDraw(item)"
                @change="chooseSubject(item,i)"
                v-for="(item,i) in data.zhongkao.subjects"
                :label="item.subjectCode"
                :key="i"
                border
              >
                <span v-html="item.subjectName"></span>
                <div class="new" v-if="item.isEleAble">
                  new
                </div>
              </el-checkbox-button>
            </el-checkbox-group>
          </div>
          <div class="stageName">
            <label>高中</label>
            <el-checkbox-group v-model="checkArr4" text-color="#c80032" fill="#ffe6e6">
              <el-checkbox-button
                :disabled="!item.isEleAble ? isDisable = true : false"
                :class="item.isEleAble ? 'newSty' : ''"
                @mouseenter.native="enter(item)"
                @mouseleave.native="toDraw(item)"
                @change="chooseSubject(item,i)"
                v-for="(item,i) in data.gaozhong.subjects"
                :label="item.subjectCode"
                :key="i"
                border
              >
                <span v-html="item.subjectName"></span>
                 <div class="new" v-if="item.isEleAble">
                  new
                </div>
              </el-checkbox-button>
            </el-checkbox-group>
          </div>

          <div class="stageName">
            <label>高考</label>
            <el-checkbox-group v-model="checkArr5" text-color="#c80032" fill="#ffe6e6">
              <el-checkbox-button
                :disabled="!item.isEleAble ? isDisable = true : false"
                :class="item.isEleAble ? 'newSty' : ''"
                @mouseenter.native="enter(item)"
                @mouseleave.native="toDraw(item)"
                @change="chooseSubject(item,i)"
                v-for="(item,i) in data.gaokao.subjects"
                :key="i"
                :label="item.subjectCode"
                border
              >
                <span v-html="item.subjectName"></span>
                 <div class="new" v-if="item.isEleAble">
                  new
                </div>
              </el-checkbox-button>
            </el-checkbox-group>
          </div>
        </div> -->
        <insuranceSelect v-if="data.length" :vipMemberList="data" @chooseSubject="chooseSubject"></insuranceSelect>
      </div>
      <!-- 周期金额优惠码 -->
      <div class="choose-other">
        <div>
          <p class="choose-title choose-month">
            <label class="choose-name">选择周期</label>
            <el-radio-group v-model="checkArr6" text-color="#c80032" fill="#ffe6e6">
              <div
                v-for="(item,i) in dataChoose"
                :key="i">
                <el-radio-button
                  v-if="item.dateTime != 3"
                  @change.native="chooseMonth(item,i)"
                  :label="item.dateTime"
                  border
                >{{item.dateTime}}个月</el-radio-button>
              </div>
            </el-radio-group>
          </p>
        </div>
        <!-- 支付金额 -->
        <div>
          <p class="choose-title">
            <label class="choose-name">支付金额</label>
            <span class="price" v-show="allTotalPrice!=0">￥{{allTotalPrice}}</span>
          </p>
        </div>
        <!-- 优惠码 -->
        <div>
          <p class="choose-title">
            <label class="choose-name">兑换码</label>
            <el-input
              @focus="delText"
              style="width:300px"
              v-model="coupon"
              @input="changeCoupon(coupon)"
            >{{coupon}}</el-input>

            <!-- <span class="catch">如何获取?</span> -->

            <el-button type="text" class="catch" @click="catch2">如何获取?</el-button>
            <!-- @click="dialogTableVisible = true" -->
            <span class="ineffective">{{messageIfo}}</span>

            <el-dialog title="获取兑换码" :visible.sync="dialogTableVisible" class="catchCoupon">
              <!-- <p class="zhushi">注: 本平台为在线教育服务,为保证服务质量,请联系一下服务机构获取兑换码完成首单支付,以及与服务机构的绑定,后续服务可直接在线支付 !</p>
              <el-table :data="gridData" border>
                <el-table-column type="index" label="序号" min-width="20%"></el-table-column>
                <el-table-column property="area" label="地区" min-width="40%"></el-table-column>
                <el-table-column property="phone" label="电话" min-width="40%"></el-table-column>
              </el-table>-->
              <howToCatch></howToCatch>
            </el-dialog>
          </p>
        </div>
      </div>
      <!-- 立即购买 -->
      <div class="buy">
        <!-- <el-button @click="buyNow" style="background:#c80032;color:#fff;marginTop:60px">立即购买</el-button> -->
        <el-button
          @click="buyNow"
          :class="{buyButton: isColor}"
          style="background:#ccc;color:#fff;marginTop:60px"
          :disabled="dis"
        >立即兑换</el-button>
      </div>
      <!-- <footer></footer> -->
    </div>
  </div>
</template>

<script>
import howToCatch from "@/components/common/howToCatch";
import insuranceSelect from "@/components/common/insurance";
import { learning } from "./learningList";
var newSubName;
export default {
  data() {
    return {
      insuranceHide: '',
      data: [],
      overSty: "",
      // xi: learning.xiaoxue,
      isDisable: false,
      vipType: 3,
      radio1: "action",
      radio2: 1,
      subData: [],
      subject: null,
      gradeCode: null,
      checkArr1: [],
      checkArr2: [],
      checkArr3: [],
      checkArr4: [],
      checkArr5: [],
      dataChoose: [{ dateTime: 3 }, { dateTime: 12 }],
      checkArr6: 12, //选择月份
      messageIfo: "", //购买提示信息
      subjectNumber: 0, //选课科目数量
      num: 1,
      idData: [], //默认12月
      idData6: [], //6个月集合
      idData3: [], //3个月集合
      allTotalPrice: 0,
      totalPrice: 0, //商品总价
      goodPrice: 0, //商品单价
      defaultPrice: 0, //默认价格
      totalPrice6: 0, //商品总价
      goodPrice6: 0, //商品单价
      defaultPrice6: 0, //默认价格
      totalPrice3: 0, //商品总价
      goodPrice3: 0, //商品单价
      defaultPrice3: 0, //默认价格
      sendIdData: [], //发请求传的集合
      coupon: "",
      uesrCode: null,
      userId: null,
      userName: null,
      userMobile: null,
      isBuyCoupon: null,
      defaultSubject: null,
      gridData: [],
      type: "",
      subj: "",
      dialogTableVisible: false,
      isColor: false,
      dis: true,
      newWin: "",
      oldName: ""
    };
  },
  created() {
    this.getUserInfo();
    this.getSubjectList();
    this.beforeBuy();
    this.idData = [];
    this.idData6 = [];
    this.idData3 = [];
  },
  components: {
    howToCatch,
    insuranceSelect
  },
  watch: {
    newWin(newName, oldName) {
      if (newName != oldName && newName != "")
        var newPage = window.open( "_blank");
        newPage.location = this.newWin;
      this.$nextTick(function() {
        this.newWin = "";
      });
    }
  },
  methods: {
    // 提分承保服务，测评按钮移入事件
    insuranceenter(val) {
      this.insuranceHide = val;
    },
    // 提分承保服务，测评按钮移出事件
    insuranceleave(val) {
      
      this.insuranceHide = ''
    },
    // 获取用户信息
    getUserInfo() {
      this.userId = localStorage.getItem("token");
      let sendData = {
        appKey: null,
        token: null,
        userId: this.userId
      };
      this.$axios
        .post(this.baseURL + "/user/getAssessmentAuthenticatedInfo", sendData)
        .then(res => {
          if (res.code == "000000") {
            this.uesrCode = res.userId;
            this.userName = res.realname;
            this.userMobile = res.mobile;
          }
        });
      if (this.$route.query.subjectCode && this.$route.query.gradeCode) {
        this.$route.query.subjectCode = null;
        this.$route.query.gradeCode = null;
        this.vipType = 1;
      }
    },


    // 鼠标划入事件
    // enter(i) {
      // this.overSty = i.subjectcode;

    //   if (i.type == 1) {
    //     this.oldName = i.subjectName;
    //     i.subjectName = learning.xiaoxue[i.subjectCode];
    //   }
    //   if (i.type == 2) {
    //     this.oldName = i.subjectName;
    //     i.subjectName = learning.chuzhong[i.subjectCode];
    //   }
    //   if (i.type == 3) {
    //     this.oldName = i.subjectName;
    //     i.subjectName = learning.zhongkao[i.subjectCode];
    //   }
    //   if (i.type == 4) {
    //     this.oldName = i.subjectName;
    //     i.subjectName = learning.gaozhong[i.subjectCode];
    //   }
    //   if (i.type == 5) {
    //     this.oldName = i.subjectName;
    //     i.subjectName = learning.gaokao[i.subjectCode];
    //   }
    // },

    // 鼠标划出事件
    // toDraw(i) {
    //   i.subjectName = this.oldName;
    // },

    // 获取学科列表接口
    getSubjectList() {
      this.$axios
        .get(this.lantianUrl + "member/getVipMemberList?productType=3")
        .then(res => {
          if (res.httpCode == "200") {
            this.data = res.result;
            let sub;
            let grade;
            // let type;
            sub = parseInt(this.$route.query.subjectCode); //学科
            grade = parseInt(this.$route.query.gradeCode); //年级
          }
        });
    },
    // 展示提分行动按钮
    goAction() {
      this.vipType = 1;
    },
    // 切换保险类型
    chooseType(i) {
      i == "action" ? (this.vipType = 3) : (this.vipType = 2);
      this.getSubject();
    },
    // 保险调测评中心
    goMeasurement(i) {
    },
    chooseSub(i) {
      localStorage.setItem("active", 1);
      this.$store.commit("active", 1);
      const { href } = this.$router.resolve({
        path: "/appraisal",
        query: {
          sub: i.subjectCode,
          grade: i.gradeCode
        }
      });
      this.newWin = href;
    },
    // 获取科目接口
    getSubject() {
      this.$axios(this.lantianUrl + "member/getPromotionPlanInsurances").then(
        res => {
          if (res.httpCode == "200") {
            this.subData = res.result || [];
          }
        }
      );
    },
    // 点击科目接口
    clickSub() {
      // 12个月
      let sendData = {
        productType: 3,
        subjectCode: this.subj,
        type: this.type,
        validityPeriod: 12
      };
      this.$axios
        .post(this.lantianUrl + "member/getVipMember", sendData)
        .then(res => {
          if (!res.result) {
            return;
          }
          if (res.httpCode == "200") {
            this.defaultPrice = res.result.price * 100;
            if (this.idData.indexOf(res.result.id) <= -1) {
              this.idData.push(res.result.id);
              this.subjectNumber = this.idData.length || 0;
            }
            this.totalPrice = this.defaultPrice / 100;
          }
          // 默认12个月
          if (this.checkArr6 == 12) {
            this.sendIdData = this.idData;
            this.allTotalPrice = this.totalPrice;
          }
        });
      // 6个月
      // let sendData6 = {
      //   productType: 3,
      //   subjectCode: this.subj,
      //   type: this.type,
      //   validityPeriod: 6
      // };
      // this.$axios
      //   .post(this.lantianUrl + "member/getVipMember", sendData6)
      //   .then(res => {
      //     if (res.httpCode == "200") {
      //       this.defaultPrice6 = res.result.price * 100;
      //       if (this.idData6.indexOf(res.result.id) <= -1) {
      //         this.idData6.push(res.result.id);
      //         this.subjectNumber = this.idData6.length || 0;
      //       }
      //       this.totalPrice6 = this.defaultPrice6 / 100;

      //       if ((this.checkArr6 == 6)) {
      //         this.sendIdData = this.idData6;
      //         this.allTotalPrice = this.totalPrice6;
      //       }
      //     }
      //   });
      // 3个月
      let sendData3 = {
        productType: 3,
        subjectCode: this.subj,
        type: this.type,
        validityPeriod: 3
      };
      this.$axios
        .post(this.lantianUrl + "member/getVipMember", sendData3)
        .then(res => {
          if (!res.result) {
            return;
          }
          if (res.httpCode == "200") {
            this.defaultPrice3 = res.result.price * 100;
            if (this.idData3.indexOf(res.result.id) <= -1) {
              this.idData3.push(res.result.id);
              this.subjectNumber = this.idData3.length || 0;
            }
            this.totalPrice3 = this.defaultPrice3 / 100;

            if (this.checkArr6 == 3) {
              this.sendIdData = this.idData3;
              this.allTotalPrice = this.totalPrice3;
            }
          }
        });
    },
    // 选择学科及计算金额
    chooseSubject(ele) {
      // 12个月
      let sendData = {
        productType: 3,
        subjectCode: ele.subjectCode || sub,
        type: ele.type,
        validityPeriod: 12
      };
      let sendId;
      // this.$axios
      //   .post(this.lantianUrl + "member/getVipMember", sendData)
      //   .then(res => {
      //     if (res.httpCode == "200") {
            
      //     }
      //   });

        sendId = ele.id || '';
        if (this.idData.length == 0) {
          this.idData.push(sendId);
          this.defaultPrice = 0;
          this.goodPrice = ele.price * 100;
          this.subjectNumber = this.idData.length || 0;
        } else {
          this.idData.forEach((item, ind, arr) => {
            if (item == sendId) {
              arr.splice(ind, 1);
              this.goodPrice -= ele.price * 100;
              this.subjectNumber = this.idData.length || 0;
            } else {
              if (this.idData.indexOf(sendId) == -1) {
                this.idData.push(sendId);
                this.goodPrice += ele.price * 100;
                this.subjectNumber = this.idData.length || 0;
              }
            }
          });
        }
        this.totalPrice = (this.goodPrice + this.defaultPrice) / 100;
        this.subjectNumber = this.idData.length || 0;

        if (this.checkArr6 == 12) {

          this.sendIdData = this.idData;
          this.allTotalPrice = this.totalPrice;
        }
      // 6个月
      // let sendData6 = {
      //   productType: 3,
      //   subjectCode: i.subjectCode || sub,
      //   type: i.type,
      //   validityPeriod: 6
      // };
      // let sendId6;
      // this.$axios
      //   .post(this.lantianUrl + "member/getVipMember", sendData6)
      //   .then(res => {
      //     if (res.httpCode == "200") {
      //       if (res.result) {
      //         sendId6 = res.result.id || null;
      //         if (this.idData6.length == 0) {
      //           this.idData6.push(sendId6);
      //           this.defaultPrice6 = 0;
      //           this.goodPrice6 = res.result.price * 100;
      //           this.subjectNumber = this.idData6.length || 0;
      //         } else {
      //           this.idData6.forEach((item, ind, arr) => {
      //             if (item == sendId6) {
      //               arr.splice(ind, 1);
      //               this.goodPrice6 -= res.result.price * 100;
      //               this.subjectNumber = this.idData6.length || 0;
      //             } else {
      //               if (this.idData6.indexOf(sendId6) == -1) {
      //                 this.idData6.push(sendId6);
      //                 this.goodPrice6 += res.result.price * 100;
      //                 this.subjectNumber = this.idData6.length || 0;
      //               }
      //             }
      //           });
      //         }
      //         this.totalPrice6 = (this.goodPrice6 + this.defaultPrice6) / 100;
      //         this.subjectNumber = this.idData6.length || 0;

      //         if (this.checkArr6 == 6) {
      //           this.sendIdData = this.idData6;
      //           this.allTotalPrice = this.totalPrice6;
      //         }
      //       }
      //     }
      //   });
      // 3个月
      // let sendData3 = {
      //   productType: 3,
      //   subjectCode: i.subjectCode || sub,
      //   type: i.type,
      //   validityPeriod: 3
      // };
      // let sendId3;
      // this.$axios
      //   .post(this.lantianUrl + "member/getVipMember", sendData3)
      //   .then(res => {
      //     if (res.httpCode == "200") {
      //       if (res.result) {
      //         sendId3 = res.result.id || null;
      //         if (this.idData3.length == 0) {
      //           this.idData3.push(sendId3);
      //           this.defaultPrice3 = 0;
      //           this.goodPrice3 = res.result.price * 100;
      //           this.subjectNumber = this.idData3.length || 0;
      //         } else {
      //           this.idData3.forEach((item, ind, arr) => {
      //             if (item == sendId3) {
      //               arr.splice(ind, 1);
      //               this.goodPrice3 -= res.result.price * 100;
      //               this.subjectNumber = this.idData3.length || 0;
      //             } else {
      //               if (this.idData3.indexOf(sendId3) == -1) {
      //                 this.idData3.push(sendId3);
      //                 this.goodPrice3 += res.result.price * 100;
      //                 this.subjectNumber = this.idData3.length || 0;
      //               }
      //             }
      //           });
      //         }
      //         this.totalPrice3 = (this.goodPrice3 + this.defaultPrice3) / 100;
      //         this.subjectNumber = this.idData3.length || 0;

      //         if (this.checkArr6 == 3) {
      //           this.sendIdData = this.idData3;
      //           this.allTotalPrice = this.totalPrice3;
      //         }
      //       }
      //     }
      //   });
    },
    // 选择月份
    chooseMonth(i) {
      if (i.dateTime == 12) {
        this.sendIdData = this.idData;
        this.allTotalPrice = this.totalPrice;
      } else if (i.dateTime == 6) {
        this.sendIdData = this.idData6;
        this.allTotalPrice = this.totalPrice6;
      } else if (i.dateTime == 3) {
        this.sendIdData = this.idData3;
        this.allTotalPrice = this.totalPrice3;
      }
    },
    // 默认选中的科目
    // defaultSubject() {

    // },
    // 购买前判断
    beforeBuy() {
      let sendData = {
        productType: 3,
        userCode: this.userId
      };
      this.$axios
        .post(this.lantianUrl + "member/checkUserVipMemberRecord", sendData)
        .then(res => {
          if (res.httpCode == "200") {
            this.isBuyCoupon = res.result;
          }
        });
    },
    // 输入优惠码
    changeCoupon(e) {
      if (e.length > 0) {
        this.isColor = true;
        this.dis = false;
      } else {
        this.isColor = false;
        this.dis = true;
        this.messageIfo = "";
      }
    },
    // 获取焦点清空消息
    delText() {
      this.messageIfo = "";
    },
    // 立即购买
    buyNow() {
      this.userId = localStorage.getItem("token");
      if (this.userId == null) {
        this.$router.push({ path: "/LoginEntrance" });
      } else {
        let sendData = {
          userCode: this.uesrCode,
          userName: this.userName,
          payType: null,
          liveCourseCode: null,
          productType: 3,
          orderType: 8,
          couponCode: this.coupon,
          userMobile: this.userMobile,
          vipMemberCodeList: this.sendIdData,
          price: this.allTotalPrice
        };
        if (this.isBuyCoupon == false && this.coupon.length == 0) {
          this.$message("请前往代理商购买兑换码");
        } else if (this.checkArr6 == 0 && this.sendIdData.length) {
          this.$message("请选择周期");
        } else if (this.sendIdData.length) {
          this.$axios
            .post(this.lantianUrl + "agency/saveOrder", sendData)
            .then(res => {
              if (res.httpCode == "300028") {
                this.messageIfo = res.message;
              } else if (res.httpCode == "300029") {
                this.messageIfo = res.message;
              } else if (res.httpCode == "300037") {
                this.messageIfo = res.message;
              } else if (res.httpCode == "500") {
                // this.$message.error(res.message);
                this.$message({
                  type: "error",
                  message: res.message,
                  duration: "1500",
                  customClass: "cancelStyle"
                });
              } else if (res.httpCode == "200") {
                if (res.result.vip == true) {
                   this.$confirm(
                      "您已成功购买提分行动，您可以前往测评列表免费购买该学科的测评商品，或者在学习中心查看提分行动方案",
                      {
                        confirmButtonText: "去学习",
                        cancelButtonText: "去测评",
                        type: "info"
                      }
                    )
                    .then(() => {
                        this.$router.push({ path: "/learningCenter" });
                    })
                    .catch(() => {
                      
                      localStorage.setItem("active", 1);
                      this.$store.commit("active", 1);
                      this.$router.push({ path: "/appraisal" });
                    })
                }
                // else {
                //   this.$router.push({
                //     path: "/paymentPage",
                //     query: {
                //       orderId: res.result.orderId,
                //       orderPrice: res.result.orderPrice,
                //       price: res.result.price,
                //       couponFaceValue: res.result.couponFaceValue
                //     }
                //   });
                // }
              }
            });
        } else {
          this.$message("请选择商品");
        }
      }
    },
    // 获取代理商列表
    catch2() {
      this.dialogTableVisible = true;
      this.$axios
        .post(
          this.lantianUrl + "agency/assessAreaInfoList/getAssessAreaInfoList",
          {}
        )
        .then(res => {
          if (res.httpCode == "200") {
            this.gridData = res.result.areaInfoList;
          }
        });
    }
  }
};
</script>

<style lang="less">
.vipCenter {
  // background-color: #fff;
  .banner {
    min-width: 1200px;
    width: 100%;
    height: 256px;
    background: #fff;
  }
  .contain {
    width: 1200px;
    margin: 0 auto;
  }
  // 会员权益图
  .huiyuan {
    // width: 1200px;
    margin: 46px auto 90px auto;
    // background: #fff;
    color: #333;
    font-size: 14px;
    text-align: center;
    overflow: hidden;
    display: flex;
    justify-content: center;
    div {
      height: 340px;
      width: 340px;
      float: left;
      border: solid 1px #d9d9d9;
      margin:0 20px;
      img {
        margin-top: 45px;
      }
    }
    p {
      margin-top: 8px;
    }
    .p2 {
      color: #999;
      width: 225px;
      margin: 0 auto;
      margin-top: 20px;
    }
  }
  .chooseSubjectStyle {
    margin-top: 50px;
    .choose-title {
      color: #333;
      font-size: 16px;
      height: 18px;
      line-height: 18px;
      padding-left: 10px;
      border-left: 2px solid #c80032;
      // margin-bottom: 45px;
    }
    .choose-contain {
      width: 1200px;
      padding: 40px 0;
      // padding-left: 44px;
      padding-bottom: 0;
      .stageName {
        margin-bottom: 30px;
        padding-left: 44px;
        position: relative;
        display: flex;
        label {
          margin-right: 33px;
          line-height: 40px;
        }
        .new {
          width: 65px;
          height: 20px;
          line-height: 20px;
          color: #fff;
          background-color: #c80032;
          transform: rotate(45deg);
          position: absolute;
          top: 4px;
          right: -18px;
          .top-sanjiao {
            position: absolute;
            top: -18px;
            left: -18px;
            width: 0;
            height: 0;
            border-width: 17px;
            border-style: solid;
            transform: rotate(45deg);
            border-color: transparent #f7f7f7 transparent transparent;
          }
          .bottom-sanjiao {
            position: absolute;
            top: -19px;
            left: 50px;
            width: 0;
            height: 0;
            border-width: 17px;
            border-style: solid;
            -webkit-transform: rotate(45deg);
            transform: rotate(135deg);
          }
        }
      }
      .el-checkbox-group {
        .el-checkbox-button {
          border: 1px solid #dcdfe6;
          background-color: #e9e9e9;
          .el-checkbox-button__inner {
            border: none;
            border-radius: 0 !important;
            box-shadow: none !important;
            width: 86px;
            height: 50px;
            background-color: #e9e9e9;
            overflow: hidden;
            span {
              height: 100%;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
        .is-checked {
          border: #c80032 solid 1px !important;
        }
        .el-checkbox-button__inner:hover {
          // color: #c80032;
        }
      }
      .subject {
        margin-left: 40px;
      }
    }
  }

  .choose-other {
    .choose-title {
      margin-bottom: 40px;
      .el-radio-group {
        display: inline;
        .el-radio-button {
          border: 1px solid #dcdfe6;
          .el-radio-button__inner {
            border: none;
            border-radius: 0 !important;
            box-shadow: none !important;
            width: 86px;
          }
        }
        .is-active {
          border: #c80032 solid 1px !important;
        }
        &:hover {
          color: #000;
        }
      }
      .el-radio-button {
        margin-right: 33px;
      }
      .el-radio-button__inner {
        width: 91px;
        height: 40px;
      }

      .ineffective {
        display: block;
        position: relative;
        left: 115px;
        top: 20px;
        color: #f00;
      }
    }
    .choose-month {
      display: flex;
      align-items: center;
      margin-bottom: 40px;
      label {
        margin-right: 5px;
      }
    }
    .choose-name {
      display: inline-block;
      width: 91px;
      height: 18px;
      line-height: 18px;
      padding-left: 10px;
      border-left: 2px solid #c80032;
    }
    .monthNum {
      border-left: solid #dcdfe6 1px;
      height: 40px;
      margin-left: 2px;
    }
    .price {
      color: #c80032;
    }
    .catch {
      display: inline-block;
      margin-left: 30px;
      color: #67b6ee;
    }
  }
  .buy {
    width: 1200px;
    // text-align: center;
    margin-bottom: 64px;
  }

  footer {
    width: 100%;
    height: 200px;
  }
  .catchCoupon {
    .zhushi {
      width: 90%;
      font-size: 14px;
      color: #c80032;
      margin-bottom: 30px;
    }
    .el-dialog__body {
      padding-top: 10px;
    }
    .el-dialog__header {
      border-top: 0;
    }
  }
  .buyButton {
    background-color: #c80032 !important;
  }
}
</style>

<style lang="scss">
.vipCenter {
  .insuranceBtn {
    text-align: center;
    .actSty {
      span {
        width: 154px;
      }
    }
    .el-radio-button__inner {
      background-color: #eee;
      color: #333;
    }
    .is-active {
      .el-radio-button__inner {
        background-color: #c80032;
        color: #fff;
      }
    }
  }
  .actBtn {
    width: 100%;
    text-align: center;
    padding-bottom: 140px;
    .el-button {
      width: 170px;
      height: 50px;
      background-color: #c80032;
      border-radius: 25px;
      color: #fff;
    }
  }
  .insSty {
    text-align: center;
    margin: 50px 0 100px 0;
    img {
      padding: 10px;
      border-top: solid 1px #eee;
      border-bottom: solid 1px #eee;
    }
  }
  .insBtn {
    .el-radio-button {
      margin-right: 55px;
      .el-radio-button__inner {
        
    width: 135px;
        border: none;
        border: solid 1px #eee;
        border-radius: 25px;
        // background-color: #ff9000;
        background-color:#cdcdcd;
        color: #fff;
      }
    }
    .is-active {
      .el-radio-button {
        // border: solid 1px #c80032;
        border: solid 1px #cdcdcd;
      }
    }
  }

  .newSty {
    background-color: #fff !important;
    span {
      // color: #c80032;
      background-color: #fff !important;
    }
  }
  .newSty {
    background-color: white !important;

    span:hover {
      color: #c80032;
      background-color: white !important;
    }
  }

  .is-checked {
    background-color: #fde8ee !important;
    span {
      background-color: #fde8ee !important;
    }

    border: #c80032 solid 1px !important;
  }
  .styGray {
    // background-color: blue!important;
    span {
      // background-color: blue!important;
    }
  }
  .el-checkbox-button__inner:hover {
    background-color: #b8b8b8 !important;
    color: #fff;
  }
}
.vip-head{
  // img{width:100%;}
  .img1{
    // width: 1902px;
    height: 260px;
    background: url("../../../assets/image/VIP/banner1-1.png") no-repeat center center;
    background-position: center center;
  }
  .img2{
    //  width: 1902px;
    height: 260px;
    background: url("../../../assets/image/VIP/banner2-2.png") no-repeat center center;
    // background-position: 
  }
}
</style>
