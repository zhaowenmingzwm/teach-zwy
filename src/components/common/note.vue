<template>
    <div class="note">
        <el-collapse v-model="activeNames" @change="handleChange" accordion>
            <!-- <span v-for="(item,index) in stepList">{{index+1}}.</span> -->
            <!-- <el-collapse-item v-for="(item,index) in stepList" :title="(index+1)+'. '+item.stepName+'-'+(item.stepContentTime!=null?item.stepContentTime:'')" :name="item.id"> -->
            <el-collapse-item v-for="(item,index) in stepList" :name="item.id+'@'+item.teachStepSort" :key="index">
                <template slot="title">
                    <div class="buchou">
                        <span class="inde">{{index+1}}.</span>
                        <span class="stepName">{{item.stepName}}</span>
                        <i style="margin-left:8px;display:inline-block" v-if="item.stepContentTime!=null" class="">{{item.stepContentTime}}</i>
                        <i v-else style="margin-left:8px;display:inline-block;color:red;fontSize:5px;min-width: 80px" class="">暂无笔迹模块</i>
                    </div>
                </template>
                <div class="getstepnote" v-for="(it,index1) in notemodel" :class="{'active':act===index1}" @click="getStepNote(it,index1);code=it.code">{{it.name}}</div>
            </el-collapse-item>
            <!-- <span  v-for="(item,index) in stepList"></span> -->
        </el-collapse>
        <div v-if="stepList!=null" class="iframe-warp">
            <iframe :src="iframeSrc" frameborder="0" scrolling="no" width="600px" height="100%"></iframe>
        </div>
        <div v-else>暂无笔记！</div>
        <!-- {{activeNames}} -->
    </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      activeNames: "",
      activeNa:[],
      stepList: [],
      notemodel: [],
      iframeSrc: null,
      isactive: false,
      act: "",
      code: "",
      teachStepSort:''
    };
  },
  props: ["notedata"],
  mounted() {
    this.getnote();
  },
  methods: {
    handleChange(val) {
      this.activeNa=(this.activeNames).split('@');
      console.log((this.activeNames).split('@'));
      // console.log(val)
      // console.log(this.activeNames);
      this.getnotemodel();
    },
    selected(index) {
      this.act = index;
    },
    getStepNote(it, index) {
      var urlItem = "";
      console.log('域名')
      console.log(location.hostname)
      if (location.hostname == 'localhost') {
        urlItem = "http://godtest.coolpen.net/";
      }else if(location.protocol=="file:"){
        urlItem = "http://godtest.coolpen.net/";
      }else if(location.hostname == "diagnosismanagertest.e-eduwisdom.com"){
        urlItem = "http://godtest.coolpen.net/";
      }else if(location.hostname == "diagnosismanager.e-eduspace.com"||location.hostname == "xyzl.e-edusky.com"){
        urlItem = "http://god.coolpen.net/";
      }else if(location.hostname == "demo.e-eduwisdom.com"){
        urlItem = "http://goddemo.coolpen.net/";
      }else if(location.hostname == "lantian.e-edusky.com"){
        urlItem = "http://god.coolpen.net/";
      }else{
        alert('请重新配置文件哦');
        return false
      }
      // this.code = it.code;
      console.log("路径")
      console.log(urlItem);
      this.selected(index);
      this.iframeSrc =
        // "http://bluebookmobile.coolpen.net/PCpage/index.html?code=10004";
        urlItem + "PCpage/angencyPen.html?code=" + it.code + "&height=500"
    },
    //获取步骤
    getnote() {
      var contentSectionCode = sessionStorage.getItem("contentSectionCode");
      var userCode = sessionStorage.getItem("studentCode");

      console.log(contentSectionCode);
      let sendData = {
        sectionCode: contentSectionCode,
        resourceId: this.notedata.id,
        userCode: userCode
        // lectureId: this.$route.query.lectureId
      };
      this.$axios
        .post(
          "/agency/getAgencyTeachModelStepsBySectionCodeAndResourceId",
          sendData
        )
        .then(({ httpCode, result }) => {
          console.log(result);
          this.stepList = result;
        })
        .catch();
    },
    //获取笔记模块
    getnotemodel() {
      // console.log(teachStepSort);
      var contentSectionCode = sessionStorage.getItem("contentSectionCode");
      var userCode = sessionStorage.getItem("studentCode");

      if (this.activeNa[0] != "") {
        let sendData = {
          contentSectionCode: contentSectionCode,
          resourceId: this.notedata.id,
          // resourceType: this.notedata.type,
          teachStepSort:this.activeNa[1],
          teachStepId: this.activeNa[0],
          userCode: userCode
        };
        this.$axios
          .post("/agency/getAgencySectionStepPens", sendData)
          .then(({ httpCode, result }) => {
            if (httpCode == 200) {
              console.log(result);
              this.notemodel = result;
            } else {
              console(httpCode);
            }
          })
          .catch(error => {});
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.note {
  display: flex;
  min-width: 860px;
  .el-collapse-item {
    flex-direction: column;
    position: relative;
    .sort {
      position: absolute;
      top: -10px;
      left: 0;
    }
  }
  .getstepnote {
    cursor: pointer;
    margin: 10px 0 0 15px;
  }
  .el-collapse {
    width: 440px;
    height: 750px;
    margin-right: 100px;
    overflow-x: hidden;
  }
  .iframe-warp {
    width: 900px;
  }
  .active {
    color: #1fd094;
  }
}
</style>
<style lang="scss">
.el-collapse-item__header {
  .buchou {
    display: flex;
  }
  .inde {
    display: inline-block;
    line-height: 48px;
  }
  .stepName {
    display: inline-block;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
