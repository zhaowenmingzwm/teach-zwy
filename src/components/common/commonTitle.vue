<template>
  <div class="goBackBox">
      <slot>
      </slot> 
      <el-button v-if="ifBack" class="goBack" type="primary" @click="goBack">返回</el-button> 
         
  </div>
</template>
<script>
export default {
  name:"goBack",
  data() {
    return {
    };
  },
  props:{
    ifBack:false
  },
  methods: {
    goBack(){
      this.$router.go(-1)
    }
  },
  mounted(){

/*      this.$axios({
      method:"post",
      url:"/api/haveUser",
      data:{
          name:123,
          password:456
      }
      }).then((res)=>{
      })


      this.$axios.post('/user222', {
          firstName: 'Fred',
          lastName: 'Flintstone'
        })
        .then(function (response) {
        })
        .catch(function (error) {
        });*/
  }

};

</script>
<style type="text/css" scoped>
  .goBackBox{
    font-size: 16px;
    border-bottom: 1px solid #d6e1f1;
    padding: 16px 0px;
    margin-bottom: 20px;
    padding-left: 20px;
    margin-left: -20px;
  }
    .goBackBox .el-breadcrumb{
          font-size: 16px;
    }
  .goBack{
      margin: -7px 0px;
      float: right;
    }
    
</style>
<style type="text/css">
    .goBackBox .el-breadcrumb__inner.is-link{
      font-weight: normal;
      color: #606266;
    }
  .goBackBox .el-breadcrumb__inner.is-link:hover {
    color: #409EFF;
    cursor: pointer;
  }
</style>