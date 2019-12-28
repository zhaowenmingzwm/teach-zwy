<template>
  <div class="howToCatch">
    <div title="获取兑换码" class="catchCoupon">
      <p class="zhushi">注: 为保证服务质量,请通过以下电话联系您所在地区的服务机构,获取兑换码后到本平台享受服务.</p>
      <el-table :data="gridData" border>
        <el-table-column type="index" label="序号" min-width="20%"></el-table-column>
        <el-table-column property="area" label="地区" min-width="40%"></el-table-column>
        <el-table-column property="phone" label="电话" min-width="40%"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        gridData: [],
    };
  },
  created() {
    this.catch();
  },
  methods: {
    // 获取代理商列表
    catch() {
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
.howToCatch {
     .catchCoupon {
    .zhushi{
      width: 90%;
      font-size: 14px;
        color: #c80032;
        margin-bottom: 30px;
      }
      .el-dialog__body{
        padding-top: 10px;
      }
    .el-dialog__header {
      border-top: 0;
      
    }
  }
}
</style>


