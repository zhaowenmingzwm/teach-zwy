<template>
  <div class="reportNav">
    <div class="report-nav">
      <ul>
        <li :class="{active:url=='/report/testReport'}" @click="goPath(0)">测评报告</li>
        <li :class="{active:url=='/report/improveScore'}" @click="goPath(1)">提分建议</li>
        <li :class="{active:url=='/report/wordList'}" @click="goPath(2)">深度解构题</li>
        <li :class="{active:url=='/report/exercise'}" @click="goPath(3)">练习题</li>
        <li :class="{active:url=='/report/feedBack'}" @click="goPath(4)">方案反馈</li>
        <li v-if="show.insurance" :class="{active:url=='/report/recommended'}" @click="goPath(5)">推荐测评</li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    props: [""],
    data() {
      return {
          url:"",
          urlObj:['/report/testReport','/report/improveScore','/report/wordList','/report/exercise','/report/feedBack','/report/recommended'],
          show: JSON.parse(localStorage.getItem("paperBox")) || JSON.parse(localStorage.getItem("paperBox")),
          proposal: true,

      };
    },
    created(){
      const userInfo = JSON.parse(localStorage.getItem("paperBox")) ||  JSON.parse(localStorage.getItem("paperBox"));
      // this.proposal = userInfo.productType != 2 && gradeCode == 33 && (subjectCode == 1 || subjectCode == 2) ? false : false;
      this.url = this.$route.path;
    },
    mounted() {
    },
    methods: {
      goPath:function (num) {
        var id = this.$route.query.id
        this.$router.push({path:this.urlObj[num],query:{id:id,productType: this.$route.query.productType}})
      }
    }
  };
</script>
<style lang="scss"scoped>
  .reportNav{
    margin:74px 0 20px 0;
    .report-nav{
      width:1200px;
      height:47px;
      border-bottom:1px solid #dadada;
      margin:0 auto;
      ul{
        margin-left:28px;
        li{
          width:160px;
          float: left;
          border:1px solid #dadada;
          border-right:none;
          height:46px;
          text-align:center;
          line-height:46px;
          font-size:14px;
          color:#333;
          background-color:#eaeaea;
          cursor:pointer;
          border-radius:8px 8px 0 0;
          &:last-child{
            border-right:1px solid #dadada;
          }
          &:hover{
            background-color:#f7f7f7;
            border-bottom:1px solid #f7f7f7;
          }
        }
        .active{
          background-color:#f7f7f7;
          border-bottom:1px solid #f7f7f7;
        }
      }
    }
  }
</style>

