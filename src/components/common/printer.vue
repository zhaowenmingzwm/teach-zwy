<template>
  <el-button class="printer" @click="prepare">打印</el-button>
</template>

<script>
  export default {
    name: "printer",
    props: ["ids","async"],  // id-绑定的html的id属性数组；async-是否需要触发父组件prepare事件,不传或者为false直接打印
    data() {
      return {
      }
    },
    created() {
    },
    methods: {
      prepare(){
        if(!this.async){
          this.print();
        }else{
          this.$emit("prepare",this.ids)
        }
      },
      print() {
        let dom = "";
        for (let i = 0; i < this.ids.length; i++) {
          let domid = this.ids[i];
          dom += document.getElementById(domid).outerHTML
        }
        let newer = window.open("_blank");
        newer.location = location.href;
        let _this = this;
        newer.onload = function () {
          newer.document.getElementsByTagName("body")[0].innerHTML = dom;
          //console.log(newer.document.getElementsByTagName("body")[0].style)
          newer.document.getElementsByTagName("body")[0].style.overflow = "visible";
          dom = null;
          for (let i = 0; i < _this.ids.length; i++) {
            let ndom = newer.document.getElementById(_this.ids[i]);
            let nclss = ndom.getAttribute("class");
            nclss += " printpager";
            ndom.setAttribute("class", nclss);
            ndom = null;
          }
          newer.print();
          // newer.close();
        }
      }
    }
  }
</script>

<style lang='scss'>

</style>
