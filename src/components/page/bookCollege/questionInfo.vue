<template>
    <div id="questionInfo">
      <!--题干-->
      <div class="ques-stem">
        <p class="p-stem">
         {{c!=undefined  ?c+1 : num}}. <span v-html="strToUrl(q.stem)"></span>
        </p>
      </div>
      <!--单选题-->
      <div class="ques-opt" v-if="q.smallType==1">
        <div class="opt-list" v-for=" (item,index) in strToObj(q.quesOption)" v-if="papertype==2">
            <span @click="chooseOptOne(item)" :class="{active: item.optionKey==q.userAnswer }" class="span-ques">
                  {{item.optionKey}}. <i v-html="strToUrl(item.optionValue)"></i>
            </span>
        </div>
        <div class="opt-list" v-for=" (item,index) in strToObj(q.quesOption)" v-if="papertype==1">
            <span @click="chooseOptOne(item)" :class="{active: item.optionKey==q.userAnswer }">
                  {{item.optionKey}}. <i v-html="strToUrl(item.optionValue)"></i>
            </span>
        </div>
      </div>
      <!--多选题-->
      <div class="ques-opt" v-if="q.smallType==2">
        <div class="opt-list" v-for=" (item,index) in strToObj(q.quesOption)" v-if="papertype==2">
            <span @click="chooseOptTwo(item)" :class="{active: item.isChoose }" class="span-ques">
                  {{item.optionKey}}. <i v-html="strToUrl(item.optionValue)"></i>
            </span>
        </div>
        <div class="opt-list" v-for=" (item,index) in strToObj(q.quesOption)" v-if="papertype==1">
            <span @click="chooseOptTwo(item)" :class="{active: item.isChoose }">
                  {{item.optionKey}}. <i v-html="strToUrl(item.optionValue)"></i>
            </span>
        </div>
      </div>
      <!--判断题-->
      <div class="ques-optPD" v-if="q.smallType==3&&papertype==2">
        <div class="opt-list">
          <span class="correct" @click="chooseOptThree('1')" :class="{active: q.userAnswer==1 }"></span>
          <span class="wrong" @click="chooseOptThree('0')" :class="{active: q.userAnswer==0 }"></span>
        </div>
      </div>
      <!--填空题-->
      <div class="ques-optTK" v-if="q.smallType==4&&papertype==2">
        <div class="opt-list" v-for=" (item,index) in strToObj(q.answerKeys)" :key="index">
          <span>{{ index+1 }}</span>
          <input type="text" placeholder="请输入答案" @blur="changeInput(item)" v-model.lazy="q.userAnswer[index]">
        </div>
      </div>
      <!--主观题-->
      <div class="ques-optZG" v-if="q.smallType==5&&papertype==2">
        <div class="opt-list">
          <textarea class="textItem" placeholder="请在此处作答" v-model="q.userAnswer"></textarea>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  data() {
      return {

    }
  },
  props:["q","a","b","c","papertype","num"],
  created() {
     //动态绑定src地址
    if(this.q.smallType==4){
      if(this.q.userAnswer){

      }else{
        this.dataTKObj()
      }
    }
    if(this.q.smallType==5){
      if(this.q.userAnswer){

      }else{
        this.dataZGObj()
      }
    }
  },
  mounted () {
  },
  methods:{
    /*单选题点击*/
    chooseOptOne:function (item) {
      var $this = this;
      $this.$set($this.q,"userAnswer", item.optionKey)
      this.$emit('changeques', $this.a,$this.b)
    },
    /*多选题点击*/
    chooseOptTwo:function (item) {
      var $this = this;
      var obj = JSON.parse($this.q.quesOption);
      var str = "";
      for(var i = 0;i<obj.length;i++){
        if(item.optionKey == obj[i].optionKey){
          obj[i].isChoose = !obj[i].isChoose;
        }
      }
      for(var o = 0;o<obj.length;o++){
        if(obj[o].isChoose){
          str+=obj[o].optionKey
        }
      }
      $this.$set($this.q,"quesOption", JSON.stringify(obj));
      $this.$set($this.q,"userAnswer", str)
      this.$emit('changeques', $this.a,$this.b)
    },
    /*判断题点击*/
    chooseOptThree:function(num){
      var $this = this;
      $this.$set($this.q,"userAnswer", num)
      this.$emit('changeques', $this.a,$this.b)
    },
    /*填空题渲染选项数据结构*/
    dataTKObj:function(){
      var $this = this;
      var obj = JSON.parse($this.q.answerKeys);
      for(var i =0;i<obj.length;i++){
        $this.$set(obj[i],"answerValue", '');
      }
      var ary=[];
      obj.forEach(val=>{
        ary.push(val.answerValue)
      })
      $this.$set($this.q,"userAnswer", ary);
    },
    /*主观题渲染选项数据结构*/
    dataZGObj:function(){
      var $this = this;
      $this.$set($this.q,"userAnswer", "")
    },
    /*改变填空题input触发*/
    changeInput:function(item){
      var $this = this;
      // $this.$set($this.q,"userAnswer","");
      this.$emit('changeques', $this.a,$this.b,$this.c)
    },

    //字符串转换为数组
    strToObj(str){
      if(!str){return []};
      return JSON.parse(str)
    },
  },

  watch:{

  },
  components: {

  },

}
</script>

<style lang="less" scoped>

</style>
<style lang="less">
  #questionInfo{
    height:100%;
    overflow-y: auto;
    /*题干 start*/
    i{
      font-style: normal;
    }
    .ques-stem{
      .p-stem{
        color:#333;
        font-size:14px;
        line-height:23px;
      }
  }
    /*题干 end*/
    /*题的选项 start*/
    .ques-opt{
      margin-top:20px;
      .opt-list{
        display: block!important;
        // min-width:25%;
        margin-bottom:16px;
        box-sizing: border-box;
        padding-right:20px;
        .span-ques{
          display: inline-block;
          padding:6px 18px;
          border:1px solid #c6c6c6;
          border-radius:5px;
          min-width: 100px!important;
          cursor:pointer;
          background-color:#fff;
          &:last-child{
            margin-right:0;
          }
          &:hover{
            // border:1px solid #a3d5e5;
            // background-color:#eefbff;
          }

        }
        .span-ques.active{
          border:1px solid #3ebce5;
          background-color:#3ebce5;
          color:#FFF;
          &:hover{
            border:1px solid #3ebce5;
            background-color:#3ebce5;
            color:#FFF;
          }
        }
      }

    }
    .ques-optTK{
        margin-top:20px;
        .opt-list{
          display: inline-block;
          margin-right:60px;
          margin-bottom:20px;
          span{
            display: inline-block;
            width:38px;
            height:38px;
            background-color:#3ebce5;
            color:#FFF;
            border-radius:5px 0 0 5px;
            text-align:center;
            font-size:14px;
            line-height:38px;
            vertical-align: top;
          }
          input{
            width:199px;
            height:36px;
            border:1px solid #3ebce5;
            border-radius:0 5px 5px 0;
            margin-left:-5px;
            outline:none;
            padding:0 12px;
            font-size:14px;
            /*font-weight:bold;*/
          }
        }
    }
    .ques-optPD{
      margin-top:20px;
      .opt-list{
        span{
          display: inline-block;
          width:273px;
          height:36px;
          border-radius:5px;
          cursor:pointer;
          margin-right:58px;
          &:last-child{
            margin-right:0;
          }
        }
        .correct{
          border: 1px solid #7ac858;
          background:url("../../../../static/img/bookCollege/correct.png") no-repeat;
          background-position:50% 50%;
        }
        .wrong{
          border: 1px solid #f57665;
          background:url("../../../../static/img/bookCollege/wrong.png") no-repeat;
          background-position:50% 50%;
        }
        span.correct.active{
          background:url("../../../../static/img/bookCollege/correct-b.png") no-repeat;
          background-color:#7ac858;
          background-position:50% 50%;
        }
        span.wrong.active{
          background:url("../../../../static/img/bookCollege/wrong-b.png") no-repeat;
          background-color:#f57665;
          background-position:50% 50%;
        }
      }
    }
    .ques-optZG{
      margin-top:20px;
      .opt-list{
        .textItem{
          box-sizing:border-box;
          width:100%;
          height:300px;
          resize:none;
          outline:none;
          border:1px solid #d9d9d9;
          border-radius:5px;
          padding:10px;
          font-size:14px;
          color:#333;
        }
      }
    }
    /*题的选项 end*/
  }

</style>

