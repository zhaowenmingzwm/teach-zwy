<template>
  <!-- 练习题 -->
  <div class="wordList-content">
    <!-- <div class="breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/learningCenter' }">学习中心</el-breadcrumb-item>
        <el-breadcrumb-item>深度解构题</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
    <report-nav></report-nav>
    <div class="word-content">
      <div v-if="wordListObj.length==0">暂无深度解构题</div>
      <ul v-if="wordListObj.length!=0">
        <li v-for="(item,index) in wordListObj" :key="index">
          <img src="../../../assets/image/pdf-bg.png">
          <p>{{ item.title }}</p>
          <div class="black-bg">
            <span @click="downLoad(item.url)">下载</span>
          </div>
        </li>
      </ul>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
import reportNav from "@/components/page/report/reportNav.vue";
export default {
  data() {
    return {
      wordListObj: [], //文档列表数据
      productType: this.$route.query.productType || null
    };
  },
  components: {
    reportNav
  },
  created() {
    this.routeItem = this.$route.query;
    this.getWordList();
  },
  mounted() {},
  methods: {
    /*点击下载*/
    downLoad: function(url) {
      location.href = url;
      let newPage = window.open("_blank");
      newPage.location = href;
    },
    /*获取文档列表数据*/
    getWordList: function() {
      var $this = this;
      var obj = {
        evaluationRecordCode: $this.routeItem.id
      };
      this.$axios
        .post(this.baseURL + "/promotionPlan/getDocuments", obj)
        .then(({ code, documents }) => {
          if (code == "000000") {
            if (this.productType != 2) {
              $this.wordListObj = documents || [];
            } else {
              $this.wordListObj = documents.splice(0,1) || [];
            }
          } else {
            this.$message("获取数据列表失败");
          }
        });
    }
  },

  watch: {}
};
</script>

<style lang='less' scoped>
.wordList-content {
  .replay-header {
    height: 52px;
    line-height: 52px;
    border-bottom: 1px solid #d9d9d9;
    background: #fff;
    p {
      width: 1200px;
      margin: 0 auto;
      color: #7f7f7f;
    }
  }
  .word-content {
    width: 1110px;
    margin: 0 auto;
    padding: 45px;
    border: 1px solid #dadada;
    background-color: #fff;
    margin-bottom: 50px;
    li {
      float: left;
      width: 156px;
      height: 130px;
      margin: 30px 18px;
      position: relative;
      text-align: center;
      border-radius: 10px;
      padding: 8px 12px;
      img {
        margin-top: 6px;
      }
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 14px;
        color: #666;
        line-height: 1.5;
        margin-top: 6px;
        /*text-align: left;*/
      }
      &:hover {
        .black-bg {
          display: block;
          box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
        }
      }
      .black-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.1);
        top: 0;
        left: 0;
        display: none;
        border-radius: 10px;
        span {
          width: 88px;
          height: 34px;
          line-height: 34px;
          text-align: center;
          border-radius: 5px;
          background-color: #c80032;
          display: inline-block;
          color: #fff;
          font-size: 16px;
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          margin-top: 52px;
        }
      }
    }
  }
  .clear {
    clear: both;
  }
}
</style>
