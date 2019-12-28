<template>
    <div id="questionInfo" class="questionInfo">
      <!--题干-->
      <div class="ques-stem">
        <p class="p-stem">
          {{c!=undefined  ?c+1 : num}}. <span v-html="strToUrl(q.stem)"></span>
        </p>
      </div>
      <!--单选题-->
      <div class="ques-opt" v-if="q.type==1">
        <div class="opt-list" v-for=" (item,index) in strToObj(q.quesOption)">
            <span :class="{correct: item.isTrueStatus=='cor',err:item.isTrueStatus=='err' }" class="span-ques">
                  {{item.optionKey}}. <i v-html="strToUrl(item.optionValue)"></i>
            </span>
        </div>
      </div>
      <!--多选题-->
      <div class="ques-opt" v-if="q.type==2">
        <div class="opt-list" v-for=" (item,index) in strToObj(q.quesOption)">
            <span :class="{correct: item.isTrueStatus=='cor',err:item.isTrueStatus=='err' }" class="span-ques">
                  {{item.optionKey}}. <i v-html="strToUrl(item.optionValue)"></i>
            </span>
        </div>
      </div>
      <!--判断题-->
      <!--<div class="ques-optPD" v-if="q.type==3">-->
        <!--<div class="opt-list">-->
          <!--<span class="correct" @click="chooseOptThree('1')" :class="{active: q.userAnswer==1 }"></span>-->
          <!--<span class="wrong" @click="chooseOptThree('2')" :class="{active: q.userAnswer==2 }"></span>-->
        <!--</div>-->
      <!--</div>-->
      <!--填空题-->
      <!--<div class="ques-optTK" v-if="q.type==4">-->
        <!--<div class="opt-list" v-for=" (item,index) in strToObj(q.answer)" :key="index">-->
          <!--<span>{{ index+1 }}</span>-->
          <!--<input type="text" placeholder="请输入答案" v-on:input="changeInput" v-model="q.userAnswer[index].answerValue">-->
        <!--</div>-->
      <!--</div>-->
      <!--主观题-->
      <!--<div class="ques-optZG" v-if="q.type==5">-->
        <!--<div class="opt-list">-->
          <!--<textarea class="textItem" placeholder="请在此处作答" v-model="q.userAnswer"></textarea>-->
        <!--</div>-->
      <!--</div>-->

      <!--我的作答,答案及解析-->
      <div class="quesAns-content">
        <div class="quesAns-list">
          <!--判断题我的作答-->
          <div class="myAnswer" v-if="q.type==3">
            <span v-show="q.userAnswer==1">我的作答：<img src="../../../../static/img/bookCollege/correct-a1.png"></span>
            <span v-show="q.userAnswer==0">我的作答：<img src="../../../../static/img/bookCollege/wrong-a1.png"></span>
          </div>
          <!--填空题我的作答-->
          <div class="myAnswer" v-if="q.type==4">
            我的作答：
            <span v-for="(item,index) in JSON.parse(q.userAnswer)">{{index+1}}. <i>{{ item }}</i></span>
          </div>
          <!--主观题我的作答-->
          <div class="myAnswer" v-if="q.type==5">
            <span>我的作答：{{q.userAnswer}}</span>
          </div>
          <!--单选多选主观题答案-->
          <div class="answerItem" v-if="q.type==1||q.type==2||q.type==5">
            <span>答案：{{ q.answer }}</span>
          </div>
          <!--判断答案-->
          <div class="answerItem" v-if="q.type==3">
            <span v-show="q.answer==1">答案：<img src="../../../../static/img/bookCollege/correct-a1.png"></span>
            <span v-show="q.answer==0">答案：<img src="../../../../static/img/bookCollege/wrong-a1.png"></span>
          </div>
          <div class="answerItem" v-if="q.type==4">
            答案：
            <span v-for="(item,index) in strToObj(q.answerKeys)">{{index+1}}. <span v-for="(val,index) in item.answerKeys"><i v-html="strToUrl(val)"></i></span> </span>
          </div>
          <!--答案解析-->
          <div class="answerAns">
            解析：
            <span  v-for=" (item,index) in strToObj(q.quesAnalyze)" v-if="strToObj(q.quesAnalyze).length>1">
                 {{item.analyzeKey}} <i v-html="strToUrl(item.analyzeValue)"></i>
            </span>
            <span v-if="strToObj(q.quesAnalyze).length==1">
              <span v-if="!strToObj(q.quesAnalyze)[0].analyzeValue">请按照解构思路自行完成解析（可参考命题点）</span>
              <span v-else>{{strToObj(q.quesAnalyze)[0].analyzeKey}} <i v-html="strToUrl(strToObj(q.quesAnalyze)[0].analyzeValue)"></i></span>

            </span>
          </div>
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
  props:["q","a","b","c",'num'],
  created() {
    this.init();
  },
  mounted () {

  },
  methods:{
    init:function(){
      var $this = this;
      if($this.q.type==1){  //单选题
        var obj = JSON.parse($this.q.quesOption);
        if($this.q.userAnswer){ //选择了答案
          if($this.q.userAnswer==$this.q.answer){ //选对了答案
            for(var i =0;i<obj.length;i++){
              if(obj[i].optionKey==$this.q.userAnswer){
                obj[i].isTrueStatus = 'cor'
              }
            }
          }else{  //选错了答案
            for(var i =0;i<obj.length;i++){
              if(obj[i].optionKey==$this.q.userAnswer){
                obj[i].isTrueStatus = 'err'
              }
            }
          }
        }else{
          // for(var i =0;i<obj.length;i++){
          //   if(obj[i].optionKey==$this.q.answer){
          //     obj[i].isTrueStatus = 'err'
          //   }
          // }
        }
        // console.log(obj)
        $this.$set($this.q,"quesOption", JSON.stringify(obj))
      }else if($this.q.type==2){
        var obj = JSON.parse($this.q.quesOption);
        var userItem = $this.q.userAnswer.split("");
        var answerItem = $this.q.answer.split("");
        for(var i = 0;i<userItem.length;i++){
          for(var o = 0;o<answerItem.length;o++){
            if(userItem[i]==answerItem[o]){
              console.log('1')
              for(var i1 =0;i1<obj.length;i1++){
                if(obj[i1].optionKey==userItem[i]){
                  obj[i1].isTrueStatus = 'cor'
                }
              }
            }
          }
        }
        for(var i = 0;i<userItem.length;i++){
              for(var i1 =0;i1<obj.length;i1++){
                if(obj[i1].optionKey==userItem[i]&&!obj[i1].isTrueStatus){
                  obj[i1].isTrueStatus = 'err'
                }
              }
        }
        // console.log(obj)
        $this.$set($this.q,"quesOption", JSON.stringify(obj))
      }
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
    i{
      font-style: normal;
    }
    /*题干 start*/
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
        min-width:25%;
        margin-bottom:16px;
        box-sizing: border-box;
        padding-right:20px;
        .span-ques{
          display: inline-block;
          padding:6px 18px;
          border:1px solid #c6c6c6;
          border-radius:5px;
          cursor:pointer;
          min-width: 100px;
          background-color:#fff;
          &:last-child{
            margin-right:0;
          }
          &:hover{
            // border:1px solid #a3d5e5;
            // background-color:#eefbff;
          }
          i{

          }
        }
        .span-ques.correct{
          border:1px solid #7ac858;
          background-color:#7ac858;
          color:#FFF;
        }
        .span-ques.err{
          border:1px solid #f57665;
          background-color:#f57665;
          color:#FFF;
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
    /*解析 start*/
    .quesAns-content{
      .quesAns-list{
        .myAnswer{
          font-size: 14px;
          color:#333;
          margin-bottom:12px;
          span{
            margin-right:10px;
          }
        }
        .answerItem{
          font-size: 14px;
          color:#333;
          margin-bottom:12px;
          span{
            margin-right:10px;
          }
        }
        .answerAns{
          font-size: 14px;
          color:#333;
        }
      }
    }
    /*解析 end*/
  }

</style>

