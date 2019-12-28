<template>
  <div>
    <div class="html" v-html="html">
     <!-- <script>document.forms[0].submit();</script>-->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      html:''
    };
  },
  mounted() {
    this.html= this.localData.get("Alipay");
    this.$nextTick(() => {
      document.forms [0].submit()
    })
    // this.go();
  //  this.goPay();
  },
  created() {
    // document.forms[0].submit();
   // document.forms[0].submit();
  },
  methods: {
    go() {
      this.$message({
        type: "info",
        message: "正在跳转到支付页面，请稍后"
      });
    },
  }
};
</script>
<style lang='less' scoped>

  .html{
      background-color: #fff;
  }
</style>
