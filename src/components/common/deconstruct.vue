<template>
  <!--解构公共的模板-->
    <div class="deconStructCon">
      <div class="reportTitle"  v-if="abilitys.length">
        <h1>本试卷所考查的认知能力分布情况</h1>
      </div>
      <div class="reportCon" v-if="abilitys.length">
        <div id="abilityModel"></div>
        <div class="desc">
          <p>本试卷卷面满分为{{paperInfo.totalScore}}分，共考查了{{number[abilityNum-1]}}种能力，每种能力所考查的分值如上图所示。<b>（由于四舍五入，这六种能力分数之和应该等于满分100分，但存在1~2分的误差） 。</b></p>
          <p>试卷考查的分析能力、评价能力和创造能力的柱状长度越长说明试卷的难度越大；试卷所考查的记忆能力、理解能力和应用能力的柱状长度越长说明试卷的难度越低 。</p>
        </div>

      </div>
      <div class="reportTitle" v-if="knowledges.length">
        <h1>本试卷所考查的知识模块分布情况</h1>
      </div>
      <div class="reportCon" v-if="knowledges.length">
        <div id="knowledgeModel" style="width: 800px;margin: 0 auto;"></div>
        <div class="desc">
          <p>本试卷卷面满分为{{paperInfo.totalScore}}分，共考查了{{knowledges.length}}个知识模块，各知识模块分数如上图所示，各知识模块分数之和等于试卷满分{{paperInfo.totalScore}}分。<b>（由于四舍五入，可能有1~2分误差）</b></p>
        </div>

      </div>
      <div class="reportTitle" v-if="keyCompetencys.length">
        <h1>本试卷所考查的{{commonSubject[paperInfo.subjectCode]}}核心素养分布情况</h1>
      </div>
      <div class="reportCon" v-if="keyCompetencys.length">
        <div id="keyCompetency" style="width: 1100px;margin: 0 auto;"></div>
        <div class="desc">
          <p>本试卷考查了{{number[keyCompetencys.length-1]}}种{{commonSubject[paperInfo.subjectCode]}}核心素养<span v-for="(val,index) in keyCompetencys" v-if="val.flag" :key="index">没有考察“{{val.keyCompetencyName}}”</span>。</p>
          <p v-for="(i,index) in keyCompetencys" :key="index" v-if='!i.flag' class="fuhao"><samp v-if="index==0">其中</samp>“{{i.keyCompetencyName}}”素养考查了 <span v-for="(j,index2) in i.keyCompetencyLevelList" :key="index2" v-if="j.score">{{j.levelName}}</span></p>
            <p v-if="keyCompetencys.length">每个核心素养各水平考查的分值如上图所示，<span v-for="(val,index) in keyCompetencys[0].keyCompetencyLevelList" v-if="keyCompetencys[0].keyCompetencyLevelList.length">{{colors[index]}}柱状代表水平{{number[index]}}分值 <span v-if="index!=keyCompetencys[0].keyCompetencyLevelList.length-1">，</span></span>。</p>
        </div>

      </div>
    </div>
</template>
<script>
    export default {
        components: {},
        props:['id'],
        created() {
        },
        mounted() {
          console.log(this.id)
            this.getPpaerReport();
        },
        data() {
            return {
              abilityNum:0,
              abilitys:[],//能力分布图
              keyCompetencys:[],//素养
              knowledges:[],//知识点
              paperInfo:{},
              number:['一',"二","三","四","五","六","七","八","九","十"],
              colors:['红色','桔黄色','紫色','绿色','蓝色']
            }
        },
        methods: {
          //获取试卷解构
          getPpaerReport(){
            let that=this;
          //  var paperId = that.$route.query.code; //试卷code
            this.$axios({
              method:'post',
              url:that.baseURL+'/paperReport/createReport',
             // url:'http://assessmentdev.xinguoren.cn/assessment/paperReport/createReport',
              data:{
                "paperId":that.id//"815bcf5c664211e9840300163e08bb95"
              }
            }).then(res=>{
                if (res.code == '000000') {
                  var result=res.result;
                  that.abilitys=result.abilityScoreModel || [];
                  var num=0;
                  that.abilitys.forEach(val=>{
                    console.log(val.score)
                   if(val.score){num++}
                  })
                  that.abilityNum=num;
                  that.keyCompetencys=result.keyCompetencyScoreModel || [];
                  that.knowledges=result.knowledgeScoreModel || [];
                  that.paperInfo=result.paper || {};
                  that.keyCompetencys.forEach(val=>{
                    val.flag=true;
                    val.keyCompetencyLevelList.forEach(val2=>{
                      if(val2.score){
                        val.flag=false
                      }
                    })
                  })
                  //console.log(this.keyCompetencys)
                  that.$nextTick(function () {
                    that.abilityScoreModel();
                    that.keyCompetencyModel();
                    that.knowledgeModel();
                  })

                }
                else {
              this.$message({
                type: 'error',message:res.message,
                 duration: "1500",
                  customClass: "cancelStyle"});
                    }
                  }).catch(err=>{
              console.log(err)
              this.$message({
                type: 'error',
                message: "获取试卷解构信息失败"
              });
            })
          },
          //柱状图
          abilityScoreModel () {
            /*//console.log(JSON.stringify(this.result.subjectAbility));
            let subjectAbility = this.result.subjectAbilityChart;*/

            let myRadar_labelChart = [],myRadar_dataChart = [],that=this,maxNumber=0;
            for (let i = 0; i < that.abilitys.length; i++) {
              if(that.abilitys[i].score>maxNumber){
                maxNumber=that.abilitys[i].score
              }
              myRadar_labelChart.push(that.abilitys[i].abilityName);
              myRadar_dataChart.push(Math.round(that.abilitys[i].score * 10) / 10);
            }
            //console.log(maxNumber,myRadar_labelChart)
            Highcharts.setOptions({
              colors: ['#c07bfd', '#34caae', '#ffba5b', '#ef6969', '#4dace7', '#758acf']
            });
            Highcharts.chart('abilityModel', {
              chart:{
               // width:700
              },
              title: {
                text: ''
              },
              subtitle: {
                text: ''
              },
              xAxis: {
                categories: myRadar_labelChart,
                labels: { style: { fontSize: "14px" } }
              },
              yAxis:{
                title:{text:''},
                max:maxNumber, // 定义Y轴 最大值
                min:0, // 定义最小值
                labels: {
                  style:{
                    fontSize:"16px",
                  }
                },
              },
              series: [{
                type: 'column',
                colorByPoint: true,
                data: myRadar_dataChart,
                showInLegend: false
              }],
              tooltip: {
                style: {
                  fontSize: "14px",
                },
                shared: true,
                pointFormat:
                  '<span style="color:{series.color}">能力：<b>{point.y}</b><br/>'

              },
              plotOptions : {
                series: {
                  dataLabels: {
                    enabled: true,//是否显示值
                  },
                  pointPadding :0,
                  borderWidth:0,
                  maxPointWidth: 50,
                  pointPlacement:0
                }
              },
              legend: {
                verticalAlign: 'top', //垂直方向位置
                itemStyle: {
                  'fontSize': '16px',
                }
              },
              credits: {
                enabled: false//去除版权样式
              },
            });
            /*Highcharts.chart("subjectAbility", {
              //图表展示容器，与 div 的 id 保持一致
              chart: {
                polar: true,
                type: "line"
              },
              credits: {
                enabled: false
              },
              title: {
                text: " "
              },
              pane: {
                size: "90%"
              },
              xAxis: {
                categories: myRadar_labelChart,
                tickmarkPlacement: "on",
                lineWidth: 0
              },
              tooltip: {
                shared: true,
                pointFormat:
                  '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}%</b><br/>'
              },
              yAxis: {
                gridLineInterpolation: "polygon",
                lineWidth: 0,
                min: 0,
                max: 100,
                tickInterval: 10,
                minorTickInterval: 10,
                tickmarkPlacement: "on",
                labels: {}
              },
              legend: {
                align: "right",
                verticalAlign: "top",
                y: 70,
                layout: "vertical"
              },
              series: [
                {
                  name: "能力",
                  type: "area",
                  data: myRadar_dataChart,
                  pointPlacement: "on",
                  showInLegend: false
                }
              ]
            });*/
          },
          //知识分布图
          knowledgeModel(){
            let knowNames = [],scores = [],that=this,maxNumber=0;
            for (let i = 0; i < that.knowledges.length; i++) {
              /*if(that.knowledges[i].score>maxNumber){
                maxNumber=that.knowledges[i].score
              }*/
              knowNames.push(that.knowledges[i].knowLedgeName);
              scores.push(Math.round(that.knowledges[i].score*10)/10);
              
            }
            var teachLevelAveHeight = knowNames.length*50
            teachLevelAveHeight > 1400 ? (teachLevelAveHeight = 1400) : teachLevelAveHeight;
            teachLevelAveHeight < 400 ? (teachLevelAveHeight = 400) : teachLevelAveHeight;
            Highcharts.chart('knowledgeModel', {
              colors:['#4394ff'],
              chart: {
                inverted: true,
                polar: false,
               height:teachLevelAveHeight
              },
              title: {
                text: ''
              },
              subtitle: {
                text: ''
              },
              xAxis: {
                categories: knowNames,
                minorTickInterval:100,
                labels: {
                  style:{
                    fontSize:"14px",

                  }
               },
              },
              yAxis:{
                title:{text:''},
               // max:maxNumber, // 定义Y轴 最大值
                min:0, // 定义最小值
                labels: {
                  style:{
                    fontSize:"14px",
                  }
                },
              },
              series: [{
                type: 'column',
                colorByPoint: true,
                data:scores,
                showInLegend: false
              }],
              tooltip: {
                valueSuffix: '',
                style: {
                  fontSize: "14px",
                },
                pointFormat:
                  '<span style="color:{series.color}">分数：<b>{point.y}</b><br/>'
              },
              plotOptions : {
                series: {
                  dataLabels: {
                    enabled: true,//是否显示值
                    color:"#4394ff"
                  }
                },
                column: {
                  borderWidth: 0,
                  pointWidth: 12,
                  pointPadding:200,
                  dataLabels: {
                    enabled: true,
                    allowOverlap: true
                  }
                }
              },
              legend: {
                verticalAlign: 'top', //垂直方向位置
                itemStyle : {
                  'fontSize' : '14px',
                }
              },
              credits: {
                enabled: false//去除版权样式
              },
            });
          },
          //素养分布情况
          keyCompetencyModel(){
            let sy = [],syName = [],scores=[],that=this,maxNumber=0;
            var a=that.keyCompetencys[0].keyCompetencyLevelList || []
            a.forEach((val,index)=>{
                sy.push({
                  name:'水平'+that.number[index],
                  data:[]
                });
            });

            that.keyCompetencys.forEach((val,index)=>{
              syName.push(val.keyCompetencyName)
              var a=val.keyCompetencyLevelList ||[];
              a.forEach((val2,index2)=>{
                maxNumber=val2.score>maxNumber ? val2.score :maxNumber;
                //console.log(sy[index2],val2.score)
                var num=Math.round(val2.score * 10) / 10;
                sy[index2].data.push(num)
              })
            })
            Highcharts.setOptions({
              colors: ['#ef6969', '#ffba5b', '#c07bfd', '#34caae', '#4dace7', '#758acf']
            });
            Highcharts.chart('keyCompetency', {
              chart: {
                type: 'column'
              },
              title: {
                text: ''
              },
              subtitle: {
                text: ''
              },
              xAxis: {
                categories:syName,
                crosshair: true
              },
              yAxis: {
                min: 0,
                max:maxNumber, // 定义Y轴 最大值
                title: {
                  text: ''
                }
              },
              tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
              },
              plotOptions: {
                series: {
                  dataLabels: {
                    enabled: true,//是否显示值
                  },
                  pointPadding :0,
                  borderWidth:0,
                // maxPointWidth: 50,
                  pointPlacement:0
                },
                column: {
                  pointWidth: 15,  //柱子宽度
                  pointPadding: 0.2,
                  borderWidth: 0,
                }
              },
              series: sy
            });
          }

        },
        computed: {},
        filters: {},
        watch:{
          id(curVal,old){
            if(curVal!=old){
              this.getPpaerReport();
            }
          }
        }
    }
</script>
<style lang="less" scoped>

</style>
<style lang="less">
 .cancelStyle{
  margin-top: 45px;
}
.deconStructCon{
  .reportTitle{
    margin:0 26px;
    border-bottom: 1px solid #d9d9d9;
    height:48px;
    line-height: 48px;
    box-sizing: border-box;
    padding-top:13px;
    h1{
      height:22px;
      border-left:4px solid #3ebce5;
      font-size:16px;
      color:#333;
      text-align: left;
      padding-left:12px;
      line-height:22px;
    }
  }
  .reportCon{
    padding:35px 50px;
    box-sizing: border-box;
    #abilityModel{
      width:700px;
      margin:0 auto;
    }
    .desc{
      margin:20px 80px 0;
      p{
        font-size: 14px;
        color: #55739b;
        line-height: 24px; padding-left:10px ;
        position: relative;
        b{
          color: #de6b6b;
          font-weight: normal;
        }
        &:before{
          content: "";
          width:4px;
          height:4px;
          background-color: #4394ff;
          position: absolute;
          ;
          left:0;
          top:9px;

        }
      }
      .fuhao {
        span{
          position: relative;
          padding-right:8px;
          margin-right:3px;
          &:after{
            content:'、';
            position: absolute;
            right:0;
            top:0;
            line-height: 20px;
            text-align: right;
            width:5px;
          }
          &:last-child:after{
            content:'';
          }
        }

      }
    }
  }
 
}
</style>
