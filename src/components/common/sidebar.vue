<template>
  <div class="sidebar">
    <el-menu :default-active="firstUrl" class="el-menu-vertical-demo" theme="dark" unique-opened router @select="select">
      <div>
        <myMenu :resultArray="resultArray">
        </myMenu>
      </div>
    </el-menu>
  </div>
</template>
<script>
import myMenu from "./MenuRecursive.vue";
export default {
  data() {
    return {
      resultArray: [],
      firstUrl:  "/classPlan"
    };
  },
  created() {
    this.resultArray = this.localData.get('resultArray');
    this.firstUrl = this.localData.get('firstUrl');
  },
  methods:{
    select(index){
      this.localData.set('firstUrl',index) 
    }
  },
  mounted() {},
  computed: {
    onRoutes() {
    }
  },
  components: {
    myMenu
  }
};

</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  width: 250px;
  left: 0;
  top: 0px;
  bottom: 0;
  background: #2e363f;
}

.sidebar>ul {
  height: 100%;
}

</style>
