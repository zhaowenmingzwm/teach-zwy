<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { global } from './api/common'
export default {
  name: 'App',
  created() {
    console.log(global);
  },
  watch: {
    'global.userId' : 'refresh'
  },
  methods: {
    refresh() {
       this.hackReset = false
        this.$nextTick(() => {
          this.hackReset = true
        })
    }
  }
  
}
</script>
<style lang="less">
  button{
    outline: none !important;
  }
  .el-pagination.is-background .el-pager li{
    border-radius: 0;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color: #c80032 !important;

  }
  .el-pagination .el-pager li.active{
    background-color: #c80032 !important;
    color: #fff;
  }
  .el-radio__input.is-checked+.el-radio__label {
    color: #c80032;
}
  .el-radio__input.is-checked .el-radio__inner{
    border-color: #c80032;
    background: #c80032;
  }
  .el-radio__inner:hover{
    border: #c80032 solid 1px !important;
    color: #c80032 !important;
  }
  .breadcrumb{
    width:100%;
    border-bottom: 1px solid #d9d9d9;
    background-color: #fff;
    .el-breadcrumb{
      width:1200px;
      margin:0 auto;
      height: 52px;
      line-height: 52px;
      font-size: 14px;


    }
    .el-breadcrumb__inner.is-link{
      font-weight: normal;
    }
  }
</style>

