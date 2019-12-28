<template>
  <div>
    <!-- <div class="breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/learningCenter' }">学习中心</el-breadcrumb-item>
        <el-breadcrumb-item>{{paperInfo.paperName}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
    <div class="bookBegin-content">

      <div class="begin-wrap">
        <h1> {{paperInfo.paperName}}</h1>
        <img src="../../../../static/img/bookCollege/img-1.png">
        <h2>测评说明</h2>
        <p>测评系统是通过分析学生的作答结果，在深度学习能力、学科核心素养、知识掌握情况、学习习惯等多维度精确测量的基础上，利用大数据技术和智能化算法精心打造的一套学习能力测评工具。系统基于测评结果，为学生提供定制化的学习方案和能力提升方案，以达到提升学生深度学习能力的效果。</p>
        
        <h2>测评流程说明</h2>

        <div class="begin-wrap_img"></div>
        <span @click="goTest">测评预览</span>
      </div>
    </div>
  </div>

</template>
<script>
export default {
    data() {
        return {
          paperInfo:null,
          useInfo: JSON.parse(localStorage.getItem('paperBox')),
        };
    },
    created() {
      this.paperInfo=this.localData.get("paperBox");
    },
    methods: {
      goTest(){
        const obj = {
          code: this.useInfo.code,
        }
        this.$axios
          .post(this.lantianUrl + "/agency/agencyAssessUserProduct/getAssessUserProductInfo",obj)
          .then((res) => {
            if (res.result.assessStatus == 1) {
               this.$message.error('该试卷已作答，不可重复提交', 3000);
              this.$router.push({ path: "/learningCenter" });
              localStorage.setItem("active", 1);
              this.$store.commit("active", 1);
              return;
            }
            this.$router.push({path: '/onlineTest'})
          })
        // this.$router.push({path: '/onlineTest'})
      },
    },

    components: {
    },
    watch: {

    }
};
</script>
<style lang="less">
  @blue-ss: #36a4c8;
  @blue-s: #3ebce5;
  @blue-q: #e7f9ff;
  @blue-y: #ff9234;
  .bookBegin-content{
    width:1200px;
    margin:0 auto;
    .box-nav{
      line-height:46px;
      color:#000033;
      font-size:14px;
    }
    .begin-wrap{
      background-color:#FFF;
      padding:58px 190px 96px 190px;
      text-align:center;
      .begin-wrap_img {
        margin-top: 30px;
        height: 100px;
        width: 100%;
        background: url('../../../assets/image/testliucheng_03.png') no-repeat;
      }
      h1{
        color:#000033;
        font-size:18px;
        margin-bottom:33px;
      }
      h2{
        color:#333;
        font-size:18px;
        text-align: left;
        margin-top:26px;
      }
      p{
        color:#666;
        font-size:14px;
        text-align: left;
        line-height:24px;
        margin-top:12px;
      }
      span{
        background-color:#c80032;
        color:#FFF;
        display: inline-block;
        width:180px;
        height:46px;
        text-align:center;
        line-height:46px;
        font-size:12px;
        margin-top:113px;
        border-radius: 3px;
        cursor: pointer;
      }
    }
  }
</style>

