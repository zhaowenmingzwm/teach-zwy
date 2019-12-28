<template>
    <div style="height:100%;width:100%;overflow-y:auto;" id="scroll">
                <header class="Header">
                    <vHead @cutBtn='cutBtn'></vHead>
                </header>
                <div class="main">
                    <router-view></router-view>
                </div>
                <footer class="footer" v-if="isTrue">
                    <vFooter ></vFooter>
                </footer>
    </div>

</template>

<script>
import vHead from "./header.vue";
import vFooter from './footer.vue'
import { global } from '../../api/common'
import reportDetailVue from '../page/bookCollege/reportDetail.vue';
export default {
    data(){
        return {
          isTrue:true
        }
    },
    components: {
        vHead, 
        vFooter
    },
  created() {
      if(this.$route.meta.show == 1){
          this.isTrue  = false
      }
  },
  methods: {
    cutBtn(res){
        this.isTrue = res
    }
  }
};
</script>
<style type="text/css">
body,html{
    height: 100%;
    width: 100%;
}
.Header{
    background-color: #FFF;
    box-shadow:1px 1px 15px #cccccc;
    width: 100%;
    height: 60px;
    position: absolute;
    top: 0;
    z-index: 999;
}
.main{
    min-height: calc(100% - 238px);
    margin-top: 58px;
    z-index: 1;
}
.footer{
    height: 181px;
}


/* 全局分页按钮变为红色 */
.el-pagination.is-background .el-pager li{
      border-radius: 0;
}
.el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color: #c80032 !important;
}

.el-header {
    background-color: #FFF;
    border-bottom:1px solid #cccccc;
}
.wrapper {
    position: relative;
    height: 100%;
}
.wrapper > .el-container {
    height: 100%;;
    width: 100%;
}
.el-main{
    background: #f3f7fd;
    padding:0;
}
.contentBox{
    padding: 0px 50px;
    height: calc( 100% - 56px);
    overflow: auto;
    width: 100%;
    box-sizing: border-box;
}
.el-message{
    margin-top: 45px;
}
</style>
