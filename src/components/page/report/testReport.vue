<template>
  <!-- 练习题 -->
  <div class="testReport-content">
    <!-- <div class="breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/learningCenter' }">学习中心</el-breadcrumb-item>
        <el-breadcrumb-item >测评报告</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
    <report-nav></report-nav>
    <el-row class="print-btn">
      <el-button @click="printView()">打印</el-button>
    </el-row>
    <div class="report-wrap lf-printTwo" id="print1">
      <div class="covers-content PageNext">
        <div class="logo-img">
          <img src="../../../assets/image/paperReport-img5.png">
        </div>
        <h1 class="title">{{ studentName }}{{ GrandList[resultObj.gradeCode] }}提分行动</h1>
        <h2 class="sub-title" v-if="!resultObj.obviousNceePrediction && extractPoints != 3">({{ resultObj.increaseScoreSpace }}分提升计划)</h2>
        <div class="blue-line"></div>
        <!-- <p class="p-subject">【学科：{{ commonSubject[resultObj.subjectCode] }}】</p> --> 
        <p class="p-subject">【学科：{{newSubjectName}}】</p>

       
        <div class="bottom-detail">
          <!--<p class="p-bottom">所属学校：{{ examDto.schoolName }}</p>-->
          <p
            class="p-bottom"
          >年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级：{{ GrandList[resultObj.gradeCode] }}</p>
          <p class="p-bottom">
            参与测试时间：
            <span>{{ timeObj(resultObj.createTime) }}</span>
          </p>
        </div>
         <!-- 保险预测 -->
        <div v-if="resultObj.obviousNceePrediction">
          <div class="insurance">
            <div>
              <p>
                您本次测评科目是 :
                <span
                  class="ins-gray"
                >{{GrandList[resultObj.nceePrediction.gradeCode]}}{{commonSubject[resultObj.nceePrediction.subjectCode]}}</span>
                总分 :
                <span class="ins-gray">{{resultObj.nceePrediction.totalScore}}分</span>
                得分 :
                <span class="ins-red">{{resultObj.nceePrediction.userScore}}分</span>
                距离高考时间 :
                <span class="ins-gray ins-nobor">{{resultObj.nceePrediction.untilNCEEDays}}天</span>
              </p>
              <p>
                通过AI智能算法进行计算，您通过
                <span class="ins-gray ins-gray2">{{resultObj.nceePrediction.untilNCEEDays}}天</span>的提分行动学习，预计您高考成绩为：
                <span
                  class="ins-red ins-nobor"
                >{{resultObj.nceePrediction.minScore+resultObj.nceePrediction.baseScore}}-{{resultObj.nceePrediction.maxScore+resultObj.nceePrediction.baseScore}}分</span>
              </p>
            </div>
            <!-- <el-button
              v-if="resultObj.insuranceStatus"
              class="ins-btn"
              size="small"
            >购买提分行动</el-button> -->
          </div>
          <!-- <p class="insurance-p">备注：基础分数会以测评总分和得分的比例按照高考总分进行换算。如高考语文150分满分，测评总分100分，得分80分，则基础分为：120分</p> -->
        </div>
      </div>
      <!--小球-->
      <div class="report-title report-knowledge report-item" style=" page-break-after: always;">
        <div class="pageTitle">
          <div class="right">联合国教科文组织ESD中国可持续发展项目<br/>可持续发展素养研究与测评中心</div>
          <h4>测试成绩</h4>
          <p>考试日期：{{ timeObj(resultObj.createTime) }}</p>
          <p>试卷共{{quesNum.totalQuestionNum}}题，学生答对{{quesNum.rightQuestionNum}}题，答错{{quesNum.wrongQuestionNum}}题</p>
        </div>
        <div class="canvas-div">
          <canvas id="canvas"></canvas>
          <img :src="canvasImg" class="canvas-img">
          <p>考试名称：{{resultObj.paperName}}</p>
        </div>
        <div class="name">
          本次测试总分{{ circle.totalScore }}分，学生实际得分{{ circle.score }}分
        </div>
      </div>
      <!--蜘蛛网状图-->
      <div class="report-knowledge report-item printArea PageNext">
        <div class="report-item-body">
          <div class="pageTitle">
            <div class="right">联合国教科文组织ESD中国可持续发展项目<br/>可持续发展素养研究与测评中心</div>
            <h4>本测试卷反映的{{ studentName }}各项认知能力百分比</h4>
            <p>认知能力分为：记忆能力、理解能力、应用能力、分析能力、评价能力和创造能力；</p>
            <p>其中记忆能力、理解能力和应用能力属于基础学习能力；</p>
            <p>分析能力、评价能力和创造能力属于深度学习能力。</p>
          </div>
          <div class="report-knowledge-main">
            <div id="subjectAbility"></div>
          </div>
          <p class="p-zzText">{{ examDto.subjectName }}学科认知能力水平（百分比）</p>
        </div>
      </div>
      <!--蜘蛛网状图文案-->
      <div class="report-knowledge report-item zz-writeText printArea PageNext" v-if="reportDesObj.length!=0">
        <div class="report-item-body">
          <div class="pageTitle">
            <div class="right">联合国教科文组织ESD中国可持续发展项目<br/>可持续发展素养研究与测评中心</div>
            <h4>本测试卷反映的{{ studentName }}各项认知能力百分比</h4>
          </div>
          <div class="zz-wrap">
            <ul>
              <li v-for="(item,index) in reportDesObj">
                <div class="left-wrap">
                  <!--<img :src="abilityImg[item.num]">-->
                  <img src="../../../../static/img/ability-1.png" v-if="item.num==0">
                  <img src="../../../../static/img/ability-2.png" v-if="item.num==1">
                  <img src="../../../../static/img/ability-3.png" v-if="item.num==2">
                  <img src="../../../../static/img/ability-4.png" v-if="item.num==3">
                  <img src="../../../../static/img/ability-5.png" v-if="item.num==4">
                  <img src="../../../../static/img/ability-6.png" v-if="item.num==5">
                </div>
                <div class="right-wrap 123123123123">
                  <h3>{{ item.abilityName }}<span>（{{ parseInt(item.rightRatio*100) }}%）</span></h3>
                  <p>{{ item.representation }}</p>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </div>

        </div>
      </div>
      <!--核心素养-->
      <div class="report-knowledge report-item printArea PageNext sy-content" v-if="KeyCompetency.length>0">
        <div class="report-item-body">
          <div class="pageTitle">
            <div class="right">联合国教科文组织ESD中国可持续发展项目<br/>可持续发展素养研究与测评中心</div>
            <h4>本测试卷反映的{{ studentName }}各项核心素养不同能力的百分比</h4>
            <!--<p>依{{ commonSubject[resultObj.subjectCode] }}学科的核心素养分{{ bigNum[KeyCompetency.length-1] }}个水平：</p>-->
            <!--<div class="sy-text">-->
            <!--<div class="left1">-->
            <!--<p v-for="(item,index) in KeyCompetency">由内向外的第{{ bigNum[index] }}个正{{ bigNum[item.keyCompetencys.length-1] }}角图为水平{{ bigNum[index] }}的满分形状；</p>-->
            <!--</div>-->
            <!--<div class="right1">-->
            <!--<p v-for="(item,index) in KeyCompetency">由内向外的第{{ bigNum[index] }}条线是{{ studentName }}同学水平{{ bigNum[index] }}的得分；</p>-->
            <!--</div>-->
            <!--<div class="clear"></div>-->
            <!--</div>-->
          </div>
          <div class="report-knowledge-main">
            <div class="sy-inset-wrap">
              <div id="subjectAbilitytwo" style="height: 500px"></div>
              <p>{{ examDto.subjectName }}学科核心素养水平（百分比）</p>
            </div>
            <!--核心素养表格-->
            <div class="imp-table PageNext" v-if="KeyCompetency.length>0">
              <!--<table cellspacing="0" cellpadding="0">-->
              <!--<tr class="tr-title">-->
              <!--<td></td>-->
              <!--<td v-for="item in KeyCompetency[0].keyCompetencys">{{ item.keyCompetencyName }}<p v-if="item.isTrue">(未考察)</p><p v-if="!item.isTrue">(满分100)</p></td>-->
              <!--</tr>-->
              <!--<tr v-for="(itemOne,index) in KeyCompetency" class="tr-list" :class="{ trListOne: (index+1)%2==1,trListTwo: (index+1)%2==0}">-->
              <!--<td>水平{{ index+1 }}</td>-->
              <!--<td v-for="itemTwo in itemOne.keyCompetencys"><span v-if="itemTwo.totalCount==0">未考察</span><span v-if="itemTwo.totalCount!=0">{{ itemTwo.percentage }}</span></td>-->
              <!--</tr>-->
              <!--</table>-->
              <p class="p1">依{{ commonSubject[resultObj.subjectCode] }}学科的核心素养分{{ bigNum[KeyCompetency.length-1] }}个水平：</p>
              <div class="sy-text">
                <div class="left1">
                  <p v-for="(item,index) in KeyCompetency">由内向外的第{{ bigNum[index] }}个正{{ bigNum[item.keyCompetencys.length-1] }}角图为水平{{ bigNum[index] }}的满分形状；</p>
                </div>
                <div class="right1">
                  <p v-for="(item,index) in KeyCompetency">由内向外的第{{ bigNum[index] }}条线是{{ studentName }}同学水平{{ bigNum[index] }}的得分；</p>
                </div>
                <div class="clear"></div>
              </div>
            </div>
            <p class="p-zhushi">注：该图体现了学科核心素养的发展情况，应关注分值较低的素养，注意发展的均衡性</p>
            <div class="clear"></div>
          </div>
          <!--<p class="p-zhushi">注：该图体现了学科核心素养的发展情况，应关注分值较低的素养，注意发展的均衡性</p>-->

        </div>
      </div>
      <!--核心素养图文案-->
      <div class="report-knowledge report-item zz-writeText printArea PageNext zz-writeTextYes" v-if="keyDesObj.length!=0">
        <div class="report-item-body">
          <div class="pageTitle">
            <div class="right">联合国教科文组织ESD中国可持续发展项目<br/>可持续发展素养研究与测评中心</div>
            <h4>本测试卷反映的{{ studentName }}各项核心素养不同能力的百分比</h4>
          </div>
          <!--{{keyDesPrintObj}}-->
          <div class="zz-wrap">
            <ul>
              <li v-for="(item,index) in keyDesObj">
                <div class="left-wrap">
                  <div class="num-text">
                    {{ index+1 }}
                  </div>
                </div>
                <div class="right-wrap">
                  <div class="key-list 123123123213123"><b>{{ item.keyCompetencyName }}</b>
                    <span v-for="(itemS,indexS) in item.keyCompetencyCountList"><i :style="{backgroundColor:lineColorsObj[indexS%5]}">{{ indexS+1 }}</i>{{ parseInt(itemS.percentage)}}%</span>
                  </div>
                  <p v-html="item.text"></p>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </div>
          <p class="p-zhushi">注意：由于数学学科素养的表述比较专业，建议咨询学科报告解读专家获取更加通俗易懂的解释！</p>
        </div>
      </div>
      <!--核心素养图文案1-->
      <div class="report-knowledge report-item zz-writeText printArea PageNext zz-writeTextNo" v-for="(itemB,indexB) in keyDesPrintObj" v-if="keyDesObj.length!=0">
        <div class="report-item-body">
          <div class="pageTitle">
            <div class="right">联合国教科文组织ESD中国可持续发展项目<br/>可持续发展素养研究与测评中心</div>
            <h4>本测试卷反映的{{ studentName }}各项核心素养不同能力的百分比</h4>
          </div>
          <!--{{keyDesPrintObj}}-->
          <div class="zz-wrap">
            <ul>
              <li v-for="(item,index) in itemB">
                <div class="left-wrap">
                  <div class="num-text">
                    {{ item.numItem+1}}
                  </div>
                </div>
                <div class="right-wrap">
                  <div class="key-list"><b>{{ item.keyCompetencyName }}</b>
                    <span v-for="(itemS,indexS) in item.keyCompetencyCountList"><i :style="{backgroundColor:lineColorsObj[indexS%5]}">{{ indexS+1 }}</i>{{ parseInt(itemS.percentage)}}%</span>
                  </div>
                  <p v-html="item.text">{{ item.text }}</p>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </div>

        </div>
      </div>
      <!-- 知识掌握情况表 -->
      <div v-if="resultObj.knowledgeGraspChart && resultObj.knowledgeGraspChart.length" class="report-knowledge report-item printArea PageNext">
        <div class="report-item-body">
          <div class="pageTitle">
            <div class="right">联合国教科文组织ESD中国可持续发展项目<br/>可持续发展素养研究与测评中心</div>
            <h4>本测试卷反映的{{ studentName }}各知识掌握情况百分比</h4>
            <p>彩色条表示该学生掌握的各个具体知识内容的百分比，颜色不说明问题，彩色条越长，表示该类知识掌握程度越好；</p>
            <p>灰色区域表示该学生尚未掌握的具体知识内容的百分比，灰色条越长，该类知识掌握程度越差；</p>
            <p>右侧分数的分子表示学生在该类知识的实际得分，分母表示该类知识在本试卷中考查的分值</p>
          </div>
          <div class="report-knowledge-main" style="max-width:700px;margin-bottom:40px;margin-top:20px;">
            <div class="header">
              <div class="ling">
                0%
              </div>
              50%
              <div class="hundred">
                100%
              </div>
            </div>
            <div class="main" style="margin-top:0">
              <div class="line" :style="{left:i*20 + '%'}" v-for="i in 4"></div>
              <div class="dian"></div>
              <div v-for="(know,index) in resultObj.knowledgeGraspChart" class="main-item">
                <div class="main-item-title" style="height:30px;">
                  {{know.baseKnowledgeName}}
                </div>
                <el-tooltip placement="top" effect="light">
                  <div slot="content">{{ parseInt(know.rightRatio*100) + '%'}}
                    <!-- 任何情况下都不显示  -->
                    <!--<span v-if="know.score!=100 && number!=2&&false"> &nbsp;&nbsp;-->
                    <!--<el-button size="small" type="primary" @click="goConquer(know)">去攻克</el-button>-->
                    <!--</span>-->
                  </div>
                  <div class="main-item-body">
                    <span class="num-total" :style="{width:parseInt(know.rightRatio*100) + '%',backgroundColor:colors[index%colors.length]}"></span>
                    <span class="right-num" v-show="know.totalScore==0">{{parseInt(know.rightRatio*100)}}%</span>
                    <span class="right-num" v-show="know.totalScore!=0">{{Math.round(know.rightScore*10) / 10}}/{{ Math.round(know.totalScore*10) / 10}}</span>
                  </div>
                </el-tooltip>
              </div>
            </div>
          </div>
          <div class="knowledgeGrasp-content knowledgeGraspYes">
            <div class="left1">
              <h3>举例说明</h3>
              <div class="line"></div>
              <p v-if="scoreText">{{ studentName }}同学“{{ scoreText.baseKnowledgeName }}”对应的<span>{{ scoreText.rightScore }}/{{ scoreText.totalScore }}</span>，<span>{{ scoreText.rightScore }}</span>表示该学生在考查“{{ scoreText.baseKnowledgeName }}”的试题得分为<span>{{ scoreText.rightScore }}</span> 分，本试卷中考查“{{ scoreText.baseKnowledgeName }}”的分数为<span>{{ scoreText.totalScore }}</span>分，这类知识方面该学生丢了<span>{{ scoreText.wrongScore }}</span>分。</p>
            </div>
            <div class="right1">
              <h3>注意</h3>
              <div class="line"></div>
              <p>彩色条达<span>100%</span>并不表示该学生在所对应的知识内容完全掌握，只说明试卷所考查的该部分知识掌握无误；</p>
              <p>彩色条达<span>0%</span>也不表示该学生在所对应的知识内容掌握程度为<span>0</span>，只说明试卷所考查的该部分知识没有掌握。</p>
            </div>
            <div class="clear"></div>
          </div>
        </div>
      </div>
      <!-- 知识掌握情况表1 -->
      <div v-if="resultObj.knowledgeGraspChart && resultObj.knowledgeGraspChart.length" class="report-knowledge report-item printArea PageNext knowledgeGraspNo">
        <div class="report-item-body">
          <div class="pageTitle">
            <div class="right">联合国教科文组织ESD中国可持续发展项目<br/>可持续发展素养研究与测评中心</div>
            <h4>本测试卷反映的{{ studentName }}各知识掌握情况百分比</h4>
          </div>
          <div class="knowledgeGrasp-content">
            <div class="left1">
              <h3>举例说明</h3>
              <div class="line"></div>
              <p>{{ studentName }}同学“{{ scoreText.baseKnowledgeName }}”对应的<span>{{ scoreText.rightScore }}/{{ scoreText.totalScore }}</span>，<span>{{ scoreText.rightScore }}</span>表示该学生在考查“{{ scoreText.baseKnowledgeName }}”的试题得分为<span>{{ scoreText.rightScore }}</span> 分，本试卷中考查“{{ scoreText.baseKnowledgeName }}”的分数为<span>{{ scoreText.totalScore }}</span>分，这类知识方面该学生丢了<span>{{ scoreText.wrongScore }}</span>分。</p>
            </div>
            <div class="right1">
              <h3>注意</h3>
              <div class="line"></div>
              <p>彩色条达<span>100%</span>并不表示该学生在所对应的知识内容完全掌握，只说明试卷所考查的该部分知识掌握无误；</p>
              <p>彩色条达<span>0%</span>也不表示该学生在所对应的知识内容掌握程度为<span>0</span>，只说明试卷所考查的该部分知识没有掌握。</p>
            </div>
            <div class="clear"></div>
          </div>
        </div>
      </div>
      <!-- 有效增长点结构表 -->
      <div v-if="resultObj.moduleScoreIncreaseChart && resultObj.moduleScoreIncreaseChart.length" class="report-knowledge report-item printArea PageNext inCrease-content">
        <div class="report-item-body">
          <div class="pageTitle">
            <div class="right">联合国教科文组织ESD中国可持续发展项目<br/>可持续发展素养研究与测评中心</div>
            <h4>本测试卷反映的{{ studentName }}在各知识内容存在的提分空间情况</h4>
            <p>蓝色条表示本次测试卷反应的{{ studentName }}各项知识存在的比较容易提分的空间，也就是说这部分知识内容能在短时间内得到修复，相对快速提升分数。</p>
            <p>灰色条表示本次测试卷反应的{{ studentName }}各项知识存在的较难提分的空间，也就是说这部分知识内容不太容易在较短的时间内得到修复，提分需要一定时间，这部分主要涉及学科的核心思想和解决复杂问题的策略。</p>
          </div>
          <div class="report-item-body">
            <div class="report-knowledge-main">
              <div class="header">
                <div v-for="i in 6" :class="{first:i==1,last:i==6}" class="percent-num-item">
                  {{modelMaxTotalScore / 5 * (i - 1)}}
                </div>
              </div>
              <div class="main ge-por" style="margin-top:0">
                <div class="line" :style="{left:i*20 +   '%'}" v-for="i in 4"></div>
                <div class="dian"></div>
                <div v-for="(know,index) in resultObj.moduleScoreIncreaseChart" class="main-item" v-if="know.gray+know.yellow !=0">

                  <div class="main-item-title" style="height:30px;">
                    {{know.baseKnowledgeName}}
                  </div>
                  <div class="main-item-body ge-por" :style="{background:'0 none',cursor:'pointer'}">

                    <el-tooltip placement="top" effect="light" class="num-total" style="background-color:rgb(204, 204, 204);position: absolute;top: 0;left: 0;height: 24px; text-align:right;line-height: 30px;" :style="{width:(know.gray+know.yellow||0)/modelMaxTotalScore*100 + '%'}">
                      <div slot="content">{{'较难提升 '+ Number(know.gray).toFixed(1)+'分'}}</div>
                      <div class="main-item-body">
                      </div>
                    </el-tooltip>

                    <el-tooltip placement="top" effect="light" class="num-total" v-show="know.yellow!=0" style="position: absolute;top: 0;left: 0;height: 24px;background:rgb(123, 123, 241); text-align:right;line-height: 30px;" :style="{width:(know.yellow||0)/modelMaxTotalScore*100 + '%'}">
                      <div slot="content">{{'较易提升 '+ Number(know.yellow).toFixed(1)+'分'}}</div>
                      <div class="main-item-body">
                      </div>
                    </el-tooltip>
                    <span class="lf-text">{{ Number(know.yellow).toFixed(1)}}/{{Number(know.gray).toFixed(1)}}</span>
                    <span class="lf-text1">{{ index+1 }}</span>
                  </div>
                </div>
              </div>
              <div class="left-wrap">
                <div class="left-item">
                  <div class="yuan" style="background: rgb(123, 123, 241);"></div>较易提升部分
                </div>
                <div class="left-item">
                  <div class="yuan" style="background:rgb(204, 204, 204);"></div>较难提升部分
                </div>
              </div>
            </div>

          </div>
          <div class="knowledgeGrasp-content moduleScoreYes">
            <div class="left1">
              <h3>建议</h3>
              <div class="line"></div>
              <p>建议{{ studentName }}同学优先攻克蓝色条对应的知识部分，按照图表左侧的“优先提升顺序”进行后续的复习。</p>
            </div>
            <div class="right1">
              <h3>注意</h3>
              <div class="line"></div>
              <p>此项数据是本次测试最重要的数据之一，建议进一步咨询学科报告解读专家获取更加细致个性化提升方案！</p>
            </div>
            <div class="clear"></div>
          </div>
        </div>
      </div>
      <!-- 有效增长点结构表1 -->
      <div v-if="resultObj.moduleScoreIncreaseChart && resultObj.moduleScoreIncreaseChart.length" class="report-knowledge report-item printArea PageNext inCrease-content moduleScoreNo">
        <div class="report-item-body">
          <div class="pageTitle">
            <div class="right">联合国教科文组织ESD中国可持续发展项目<br/>可持续发展素养研究与测评中心</div>
            <h4>本测试卷反映的{{ studentName }}在各知识内容存在的提分空间情况</h4>
          </div>
          <div class="knowledgeGrasp-content">
            <div class="left1">
              <h3>建议</h3>
              <div class="line"></div>
              <p>建议{{ studentName }}同学优先攻克蓝色条对应的知识部分，按照图表左侧的“优先提升顺序”进行后续的复习。</p>
            </div>
            <div class="right1">
              <h3>注意</h3>
              <div class="line"></div>
              <p>此项数据是本次测试最重要的数据之一，建议进一步咨询学科报告解读专家获取更加细致个性化提升方案！</p>
            </div>
            <div class="clear"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import reportNav from '@/components/page/report/reportNav.vue'
  var lineColors=[ '#e74141','#b954e7','#3183e5','#62b412','#dc8b20'];
  var bgColors=[ '#f9d4d4','#f5e6ff','#caedff','#e1ffe1','#fff2e1'];
  export default {
    data(){
      return {
        resultObj:{}, //报告新数据
        studentName:"", //学生名字
        quesNum:"", //题个数数据
        examDto:"",
        circle:{}, //canvas数据
        canvasImg:"", //canvas转换成图片
        KeyCompetency:[], //核心素养数据
        bigNum:{
          "0":"一",
          "1":"二",
          "2":"三",
          "3":"四",
          "4":"五",
          "5":"六",
          "6":"七",
          "7":"八",
          "8":"九",
          "9":"十",
        },
        colors: [
          "#27ba9bi",
          "#5ac6ba",
          "#99d8ea",
          "#93aed4",
          "#ff8585",
          "#c486d7"
        ],

      reportIdItem: "",
      reportDesObj: [], //蜘蛛图描述文字
      abilityImg: [
        "../../../../static/img/ability-1.png",
        "../../../../static/img/ability-2.png",
        "../../../../static/img/ability-3.png",
        "../../../../static/img/ability-4.png",
        "../../../../static/img/ability-5.png",
        "../../../../static/img/ability-6.png"
      ],
      keyDesObj: [], //核心素养描述文字数据
      keyDesPrintObj: [], //打印核心素养文字数据
      ids: ["print1"], //打印
      lineColorsObj: ["#e74141", "#b954e7", "#3183e5", "#62b412", "#dc8b20"],
      scoreText: "", //举例说明文本拼接\
      newSubjectName: JSON.parse(localStorage.getItem("paperBox")).subjectName,
      extractPoints: JSON.parse(localStorage.getItem("paperBox")).productType,
    };
  },
  components: {
    reportNav
  },
  created() {
    this.routeItem = this.$route.query;
    this.getExamReport();
    this.getReportDescription();
    this.getKeyCompetencyDescription();
  },
  methods: {
    /*获取蜘蛛图描述文字*/
    getReportDescription() {
      var $this = this;
      var paperId = this.routeItem.id; //试卷code
      this.$axios({
        method: "post",
        url: this.baseURL + "/getReportDescription",
        data: {
          evaluationRecordId: paperId
        }
      })
        .then(res => {
          console.log(res);
          if (res.code == "000000") {
            if (res.display) {
              var result = res.productionAbilityCounters;
              for(var i = 0;i<result.length;i++){
                if(result[i].abilityName == "记忆能力"){
                  result[i].num = 0
                }else if(result[i].abilityName == "分析能力"){
                  result[i].num = 1
                }else if(result[i].abilityName == "理解能力"){
                  result[i].num = 2
                }else if(result[i].abilityName == "创造能力"){
                  result[i].num = 3
                }else if(result[i].abilityName == "应用能力"){
                  result[i].num = 4
                }else if(result[i].abilityName == "评价能力"){
                  result[i].num = 5
                }
              }
              $this.reportDesObj = result
            }else{
              $this.reportDesObj = [];
            }

          }else{
            this.$message({
              type: 'info',
              message: "获取学习能力图描述失败"
            });
          }
        }).catch(err=>{
          this.$message({
            type: 'error',
            message: "获取学习能力图描述失败"
          });
        })
      },
      /*获取核心素养描述文字*/
      getKeyCompetencyDescription(){
        var $this = this;
        var paperId =  this.routeItem.id; //试卷code"349dce207e674cfcb500b8e06fc18275"//
        this.$axios({
          method:'post',
          url:this.baseURL +  "/getKeyCompetencyDescription",
          data:{
            "evaluationRecordId":paperId
          }
        }).then(res=>{
          if(res.code == "000000"){
            var result  = res.keyCompetencyCharts;
            if(result){
              for(var i = 0;i<result.length;i++){
                result[i].text = "";

                for (var s = 0; s < result[i].keyCompetencyCountList.length; s++) {
                  var curCount=result[i].keyCompetencyCountList[s];
                  if (s == 0) {
                    if(curCount.covered){
                      result[i].text += $this.studentName + "同学在" + result[i].keyCompetencyName + "水平" + $this.bigNum[s] + "上获得" + parseInt(result[i].keyCompetencyCountList[s].percentage )+ "%,说明该同学" + result[i].keyCompetencyCountList[s].description +"<br/>"
                    }else{
                      result[i].text += $this.studentName + "同学在" + result[i].keyCompetencyName + "水平" + $this.bigNum[s] +  result[i].keyCompetencyCountList[s].description +"<br/>"
                    }
                  } else {
                    if(curCount.covered){
                      result[i].text += "在" + result[i].keyCompetencyName + "水平" + $this.bigNum[s] + "上获得" + parseInt(result[i].keyCompetencyCountList[s].percentage) + "%,说明该同学" + result[i].keyCompetencyCountList[s].description +"<br/>"
                    }else{
                      result[i].text += result[i].keyCompetencyName + "水平" + $this.bigNum[s] + curCount.description +"<br/>"
                    }

                  }
                }
              }
              $this.keyDesObj = result
              // keyDesPrintObj
              if(result.length<=2&&result.length>=0){
                $this.keyDesPrintObj = [[]]
              }else if(result.length>2&&result.length<=4){
                $this.keyDesPrintObj = [[],[]]
              }else if(result.length>4&&result.length<=6){
                $this.keyDesPrintObj = [[],[],[]]
              }else if(result.length>6&&result.length<=8){
                $this.keyDesPrintObj = [[],[],[],[]]
              }
              for(var i = 0;i<result.length;i++){
                result[i].numItem =i
                if(i==0||i==1){
                  $this.keyDesPrintObj[0].push(result[i])
                }else if(i==2||i==3){
                  $this.keyDesPrintObj[1].push(result[i])
                }else if(i==4||i==5){
                  $this.keyDesPrintObj[2].push(result[i])
                }
                else if(i==5||i==6){
                  $this.keyDesPrintObj[3].push(result[i])
                }
              }
            }else{
              $this.keyDesObj =  []
            }

          }else{
            this.$message({
              type: 'info',
              message: "获取学习能力图描述失败"
            });
          }
        }).catch(err=>{
          this.$message({
            type: 'error',
            message: "获取学习能力图描述失败"
          });
        })
      },
      //获取参考诊断报告
      getExamReport(){
        let that=this;
        var paperId = this.routeItem.id; //试卷code
        this.$axios({
          method:'post',
          url:this.staticURL +  "assessment/assessmentReport/createReport",
          data:{
            "evaluationRecordCode":paperId
          }
        }).then(res=>{
          if (res.code == '000000') {
            var result = res.result;
            that.reportIdItem = result.reportId;
            this.circle = {
              totalScore: result.paperScore || 100,
              width: 250 ,
              score: result.userScore || 0
            }
            
            if (this.circle.width) {
              this.generatingCircle();
            }
            // keyCompetencyModelChart
            that.KeyCompetency = result.keyCompetencyModelChart || []; // 核心素养
            setTimeout(function () {
              that.createKeyCompetency();
            })
            for(var i=0;i<result.moduleScoreIncreaseChart.length;i++){
              for(var u=0;u<result.moduleScoreIncreaseChart[i].productionColors.length;u++){
                if(result.moduleScoreIncreaseChart[i].productionColors[u].colorCode=="blue"){
                  result.moduleScoreIncreaseChart[i].blue = result.moduleScoreIncreaseChart[i].productionColors[u].colorScore
                }else if(result.moduleScoreIncreaseChart[i].productionColors[u].colorCode=="gray"){
                  result.moduleScoreIncreaseChart[i].gray = result.moduleScoreIncreaseChart[i].productionColors[u].colorScore
                }else if(result.moduleScoreIncreaseChart[i].productionColors[u].colorCode=="yellow"){
                  result.moduleScoreIncreaseChart[i].yellow = result.moduleScoreIncreaseChart[i].productionColors[u].colorScore
                }
              }
            }
            // for(var i = 0;i<result.moduleScoreIncreaseChart.length;i++){
            //   var num = 1;
            //    for(var s = 0;s<result.moduleScoreIncreaseChart.length;s++){
            //      if(s!=i){
            //        if(result.moduleScoreIncreaseChart[i].productionColors[1].colorScore<result.moduleScoreIncreaseChart[s].productionColors[1].colorScore){
            //          num++
            //        }
            //      }
            //      result.moduleScoreIncreaseChart[i].numLF = num;
            //    }
            // }
            // console.log(JSON.stringify(result.moduleScoreIncreaseChart))
            that.resultObj = result;
            var student=result.student || {}
            that.studentName = student.realname || "";
            that.quesNum = result.evaluationStatistics;

            // that.createHistoricalScore();
            that.createSubjectAbility();
            // that.GetAgencyLevelByReport();
            if(that.resultObj.knowledgeGraspChart[0].totalScore!=0){
              for(var i = 0;i<that.resultObj.knowledgeGraspChart.length;i++){
                console.log(that.resultObj.knowledgeGraspChart[i])
                if(that.resultObj.knowledgeGraspChart[i].baseKnowledgeName!="" && that.resultObj.knowledgeGraspChart[i].baseKnowledgeName!=null){
                  if(that.resultObj.knowledgeGraspChart[i].rightScore<that.resultObj.knowledgeGraspChart[i].totalScore ){
                    that.scoreText = that.resultObj.knowledgeGraspChart[i]
                    break
                  }
                }

              }
            }
            
          }else {
            this.$message({
              type: 'error',message:res.message});
          }
        }).catch(err=>{
          console.log(err)
          this.$message({
            type: 'error',
            message: "获取参考诊断报告失败"
          });
        })
      },
      /*获取报告数据*/
      //画圆
      generatingCircle() {
        var $this = this;
        var circleConfig = this.circle,
          totalnum = circleConfig.score,
          width = circleConfig.width,
          totalScore = circleConfig.totalScore,
          canvas = document.getElementById("canvas"),
          ctx = canvas.getContext("2d"),
          percent = totalnum, // 最终百分比
          circleX = width / 2, // 中心x坐标
          circleY = width / 2, // 中心y坐标
          radius = (width - 20) / 2, // 圆环半径
          lineWidth = 20, // 圆形线条的宽度
          fontSize = 40; // 字体大小
        canvas.width = canvas.height = width;
        // 画圆
        function circle(cx, cy, r) {
          ctx.beginPath();
          ctx.moveTo(cx + r, cy);
          ctx.lineWidth = lineWidth;
          ctx.strokeStyle = '#eee';
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.closePath();
          ctx.stroke();
        }

        // 画弧线
        function sector(cx, cy, r, startAngle, endAngle, anti) {
          ctx.beginPath();
          ctx.lineWidth = lineWidth;
          // 渐变色 - 可自定义
          let linGrad = ctx.createLinearGradient(
            circleX, circleY - radius - lineWidth, circleX, circleY + radius + lineWidth
          );
          linGrad.addColorStop(0.0, '#b690fd');
          linGrad.addColorStop(0.25, '#87a0fe');
          linGrad.addColorStop(0.5, '#3baaff');
          linGrad.addColorStop(0.75, '#578dfe');
          linGrad.addColorStop(1.0, '#3780fb');
          ctx.strokeStyle = linGrad;

          // 圆弧两端的样式
          ctx.lineCap = 'round';
          // 圆弧
          ctx.arc(
            cx, cy, r,
            startAngle * (Math.PI / 180.0) - (Math.PI / 2),
            endAngle * (Math.PI / 180.0) - (Math.PI / 2),
            anti
          );
          ctx.stroke();
        }

        // 刷新
        let process = 0.0; // 进度
        let circleLoading = window.setInterval(function () {
          loading();
        }, 10);

        function loading() {
          if (process >= percent) {
            clearInterval(circleLoading);
          }
          // 清除canvas内容
          ctx.clearRect(0, 0, circleX * 2, circleY * 2);
          ctx.font = fontSize + 'px April';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#609ffd';
          ctx.fillText(parseFloat(process).toFixed(0) + '分', circleX, circleY);
          // 圆形
          circle(circleX, circleY, radius);
          // 圆弧
          sector(circleX, circleY, radius, 0, process / totalScore * 360);
          // 控制结束时动画的速度
          var canvas = document.getElementById("canvas");
          var img = canvas ? canvas.toDataURL("image/png") : '';
          $this.canvasImg = img
          if (process / percent > 0.90) {
            process += 0.30;
          } else if (process / percent > 0.80) {
            process += 0.55;
          } else if (process / percent > 0.70) {
            process += 0.75;
          } else {
            process += 1.0;
          }
        }


      },
      /*蜘蛛图数据*/
      createSubjectAbility() {
        // console.log(JSON.stringify(this.result.subjectAbility));
        // let subjectAbility = this.result.subjectAbility;
        // let myRadar_labelChart = [];
        // let myRadar_dataChart = [];
        // for (let i = 0; i < subjectAbility.length; i++) {
        //   myRadar_labelChart.push(subjectAbility[i].capacityName+"(" + subjectAbility[i].score +")");
        //   myRadar_dataChart.push(parseInt(subjectAbility[i].score));
        // }
        let subjectAbility = this.resultObj.subjectAbilityChart;
        let myRadar_labelChart = [];
        let myRadar_dataChart = [];
        for (let i = 0; i < subjectAbility.length; i++) {
          myRadar_labelChart.push(subjectAbility[i].abilityName + "(" + parseInt(subjectAbility[i].rightRatio*100 )+")");
          myRadar_dataChart.push(parseInt(subjectAbility[i].rightRatio*100));
        }
        Highcharts.chart("subjectAbility", {
          //图表展示容器，与 div 的 id 保持一 致
          chart: {
            polar: true,
            type: "line",
            backgroundColor:'rgba(0,0,0,0)',
            height:320,
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
            lineWidth: 0,
            labels: {
              style:{
                fontSize:"16px",
              },
            },
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
        });
      },
      /*生产核心素养定量蜘蛛图*/
      createKeyCompetency(){
        // 核心素养
        var data = this.KeyCompetency;
        // 没有数据
        if(!data||data.length==0){
          return ;
        }
        var categories = []
        var plotBands = [ ];
        var series = [ ];// 确定圈

        data.forEach((item,i)=>{
          var serie = {
            data:[],
            valueIndex:i,
            pointPlacement: 'on',
            color:lineColors[i%lineColors.length],
            name:"水平"+item.level//item.keyCompetencyName
          };
          item.keyCompetencys.forEach((v,j)=>{
            if(i === 0){
              categories.push(v.keyCompetencyName); //角名称
            }
            serie.data.push({y:i+(v.percentage||0)/100,temRealValue:v.percentage==null?"(未测评)":parseInt(v.percentage)}) //如果是null 按照0算
          });
          plotBands.push({
            color:bgColors[i%bgColors.length],
            from:i,
            to:i+1
          });

          series.push(serie);
        })
        this.subjectHighcharts = new Highcharts.Chart("subjectAbilitytwo", {
          //图表展示容器，与 div 的 id 保持一致
          chart: {
            polar: true,
            type: 'line',
            width:1080,
            backgroundColor:'rgba(0,0,0,0)',
            marginTop:32,
          },
          credits: {
            enabled: false
          },
          title: {
            text: '',
          },
          pane: {
            size: '90%'
          },
          plotOptions: {
            series: {
              connectNulls: true //连接数据为null的前后点
            }
          },
          xAxis: {
            //  categories: ["素养1","b","c","d","e","f","g","h","j"],
            categories: categories,
            tickmarkPlacement: 'on',
            lineWidth: 0,
            gridLineWidth: 3,
            labels: {
              style:{
                fontSize:"20px",

              },
              useHTML:true,
              formatter: function() {
                // console.log(categories)
                // console.log(this.value)
                var labelVal = this.value;
                var reallyVal = labelVal;
                var lvl = labelVal.length;
                if(categories.length==4){
                  if(lvl >=7 && lvl <=8){
                    if(categories[0]==reallyVal){
                      reallyVal = '<p>'+labelVal.substr(0,4)+'</p>'+'<p style="margin-bottom:20px;">'+ labelVal.substring(4,lvl) +'</p>';
                    }else if(categories[2]==reallyVal){
                      reallyVal = '<p style="margin-top:20px;">'+labelVal.substr(0,4)+'</p>'+'<p>'+ labelVal.substring(4,lvl) +'</p>';
                    }else{
                      reallyVal = '<p>'+labelVal.substr(0,4)+'</p>'+'<p>'+ labelVal.substring(4,lvl) +'</p>';
                    }
                  }else if(lvl >=9 && lvl <=10){
                    if(categories[0]==reallyVal){
                      reallyVal = '<p>'+labelVal.substr(0,5)+'</p>'+'<p style="margin-bottom:20px;">'+ labelVal.substring(5,lvl) +'</p>';
                    }else if(categories[2]==reallyVal){
                      reallyVal = '<p style="margin-top:20px;">'+labelVal.substr(0,5)+'</p>'+'<p>'+ labelVal.substring(5,lvl) +'</p>';
                    }else{
                      reallyVal = '<p>'+labelVal.substr(0,5)+'</p>'+'<p>'+ labelVal.substring(5,lvl) +'</p>';
                    }
                  }else if(lvl >=11 && lvl <=13){
                    if(categories[0]==reallyVal){
                      reallyVal = '<p>'+labelVal.substr(0,6)+'</p>'+'<p style="margin-bottom:20px;">'+ labelVal.substring(6,lvl) +'</p>';
                    }else if(categories[2]==reallyVal){
                      reallyVal = '<p style="margin-top:20px;">'+labelVal.substr(0,6)+'</p>'+'<p>'+ labelVal.substring(6,lvl) +'</p>';
                    }else{
                      reallyVal = '<p>'+labelVal.substr(0,6)+'</p>'+'<p>'+ labelVal.substring(6,lvl) +'</p>';
                    }
                  }
                  return reallyVal;
                }
                if(categories.length==5){
                  if(lvl >=7 && lvl <=8){
                    if(categories[0]==reallyVal){
                      reallyVal = '<p>'+labelVal.substr(0,4)+'</p>'+'<p style="margin-bottom:20px;">'+ labelVal.substring(4,lvl) +'</p>';
                    }else{
                      reallyVal = '<p>'+labelVal.substr(0,4)+'</p>'+'<p>'+ labelVal.substring(4,lvl) +'</p>';
                    }
                  }else if(lvl >=9 && lvl <=10){
                    if(categories[0]==reallyVal){
                      reallyVal = '<p>'+labelVal.substr(0,5)+'</p>'+'<p style="margin-bottom:20px;">'+ labelVal.substring(5,lvl) +'</p>';
                    }else{
                      reallyVal = '<p>'+labelVal.substr(0,5)+'</p>'+'<p>'+ labelVal.substring(5,lvl) +'</p>';
                    }
                  }else if(lvl >=11 && lvl <=13){
                    if(categories[0]==reallyVal){
                      reallyVal = '<p>'+labelVal.substr(0,6)+'</p>'+'<p style="margin-bottom:20px;">'+ labelVal.substring(6,lvl) +'</p>';
                    }else{
                      reallyVal = '<p>'+labelVal.substr(0,6)+'</p>'+'<p>'+ labelVal.substring(6,lvl) +'</p>';
                    }
                  }
                  return reallyVal;
                }
                if(categories.length==6){
                  if(lvl >=7 && lvl <=8){
                    if(categories[0]==reallyVal){
                      reallyVal = '<p>'+labelVal.substr(0,4)+'</p>'+'<p style="margin-bottom:20px;">'+ labelVal.substring(4,lvl) +'</p>';
                    }else if(categories[3]==reallyVal){
                      reallyVal = '<p style="margin-top:20px;">'+labelVal.substr(0,4)+'</p>'+'<p>'+ labelVal.substring(4,lvl) +'</p>';
                    }else{
                      reallyVal = '<p>'+labelVal.substr(0,4)+'</p>'+'<p>'+ labelVal.substring(4,lvl) +'</p>';
                    }
                  }else if(lvl >=9 && lvl <=10){
                    if(categories[0]==reallyVal){
                      reallyVal = '<p>'+labelVal.substr(0,5)+'</p>'+'<p style="margin-bottom:20px;">'+ labelVal.substring(5,lvl) +'</p>';
                    }else if(categories[3]==reallyVal){
                      reallyVal = '<p style="margin-top:20px;">'+labelVal.substr(0,5)+'</p>'+'<p>'+ labelVal.substring(5,lvl) +'</p>';
                    }else{
                      reallyVal = '<p>'+labelVal.substr(0,5)+'</p>'+'<p>'+ labelVal.substring(5,lvl) +'</p>';
                    }
                  }else if(lvl >=11 && lvl <=13){
                    if(categories[0]==reallyVal){
                      reallyVal = '<p>'+labelVal.substr(0,6)+'</p>'+'<p style="margin-bottom:20px;">'+ labelVal.substring(6,lvl) +'</p>';
                    }else if(categories[3]==reallyVal){
                      reallyVal = '<p style="margin-top:20px;">'+labelVal.substr(0,6)+'</p>'+'<p>'+ labelVal.substring(6,lvl) +'</p>';
                    }else{
                      reallyVal = '<p>'+labelVal.substr(0,6)+'</p>'+'<p>'+ labelVal.substring(6,lvl) +'</p>';
                    }
                  }
                  return reallyVal;
                }
              }
            },
          },
          yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0,
            max:plotBands.length,
            // ceiling:3,
            tickInterval: plotBands.length,
            minorTickInterval: plotBands.length,
            gridLineWidth: 3,
            offset:20,
            /*  plotBands:[       //区域颜色划分
                {
                color:'#f9d4d4',
                from:0,
                to:1
              },
                {
                color:'#f5e6ff',
                from:1,
                to:2
              },
                {
                  color:'#caedff',
                  from:2,
                  to:3
                },
                {
                  color:'#e1ffe1',
                  from:3,
                  to:4
                },
                {
                  color:'#fff2e1',
                  from:4,
                  to:5
                },
                {
                  color:'#f9d4d4',
                  from:5,
                  to:6
                },
                {
                  color:'#f5e6ff',
                  from:6,
                  to:7
                },
                {
                  color:'#caedff',
                  from:7,
                  to:8
                },
                {
                  color:'#e1ffe1',
                  from:8,
                  to:9
                }
                ],*/
            plotBands:plotBands
          },
          legend: {
            margin: 30,
            itemStyle : {
              'fontSize' : '16px'
            }
          },
          tooltip: {
            shared: true,
            formatter : function (){
              var s = '<b>'+this.x+'</b>';
              $(this.points).each(function(i,v){
                s += '<br />' + this.series.name + '：' + this.point.temRealValue;
              });
              return s;
            },
          },

          /*series: [
            {
            name: '水平一',   //  /100 + 0
            data: [0.7, 0.4, 0.86, 0,0.1 , 0],
            pointPlacement: 'on',
            color:'#e74141',
          } ,
            {
            name: '水平二',
            data: [1.3,1.3, 1.9,1.8, 1, 1.4],
            pointPlacement: 'on',
              color:'#b954e7',
          },
            {  //  0--100     /100+2
              name: '水平三',
              data: [5.6, 2.5,2.8, 2, 2.7,2],
              pointPlacement: 'on',
              color:'#3183e5',
            },
            {
              name: '水平四',
              data: [3.4, 3.9,3.3, 3, 3, 3.2],
              pointPlacement: 'on',
              color:'#62b412',
            },
            {
              name: '水平五',
              data: [4.2, 4, 4.9,4.7, 4, 4.5],
              pointPlacement: 'on',
              color:'#dc8b20',
            },
            {
              name: '水平六',
              data: [5.1, 5.7,5,5.3, 5, 5.4],
              pointPlacement: 'on',
              color:'#e74141',
            },
            {
              name: '水平七',
              data: [6.3, 6.9,6.2, 6.5, 6, 6.7],
              pointPlacement: 'on',
              color:'#b954e7',
            },
            {
              name: '水平八',
              data: [7.8, 7.9,7.3, 7, 7, 7.6],
              pointPlacement: 'on',
              color:'#3183e5',
            },
            {
              name: '水平九',
              data: [8.1,8, 8.8,8.3, 8.5,  8.4],
              pointPlacement: 'on',
              color:'#62b412',
            }
          ]*/
          series:series
        });

      },
      /*时间转换*/
      timeObj(value){
        var a = new Date(value);
        var month = "";
        var dateItem = "";
        var h = "";
        var m = "";
        var s = "";
        if(a.getMonth() + 1<10){
          month = "0" + (a.getMonth() + 1)
        }else{
          month = (a.getMonth() + 1)
        }
        if(a.getDate()<10){
          dateItem = "0" + a.getDate()
        }else{
          dateItem = a.getDate()
        }
        if(a.getHours()<10){
          h = "0" + a.getHours()
        }else{
          h = a.getHours()
        }
        if(a.getMinutes()<10){
          m = "0" + a.getMinutes()
        }else{
          m = a.getMinutes()
        }
        if(a.getSeconds()<10){
          s = "0" + a.getSeconds()
        }else{
          s = a.getSeconds()
        }
        var b  = a.getFullYear() + '.' + month + '.' + dateItem //+ " " + h + ":" + m + ":" + s;
        return b
      },
      /*打印*/
      printView:function(){
        let dom = "";
        for (let i = 0; i < this.ids.length; i++) {
          let domid = this.ids[i];
          dom += document.getElementById(domid).outerHTML
        }
        let newer = window.open(location.href, "_blank");
        let _this = this;
        newer.onload = function () {
          newer.document.getElementsByTagName("body")[0].innerHTML = dom;
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
          newer.close();
        }
      },

    },
    computed:{
      modelMaxTotalScore() {
        let temp = 0;
        this.resultObj &&
        this.resultObj.moduleScoreIncreaseChart &&
        this.resultObj.moduleScoreIncreaseChart.forEach(
          ({ blue, gray, yellow }) => {
            let num = blue + gray + yellow;
            temp = num > temp ? num : temp;
          }
        );
        return Math.ceil(temp / 5) * 5;
      }
    },
    watch:{
    }
  }
</script>

<style lang='scss' scoped>
  .replay-header{
    height: 52px;
    line-height: 52px;
    border-bottom: 1px solid #d9d9d9;
    background: #fff;
    p{
      width: 1200px;
      margin: 0 auto;
      color: #7f7f7f;
    }
  }
  .print-btn{
    width:1200px;
    margin:0 auto;
    text-align: right;
  }
  /*公共头*/
  .pageTitle{
    width:100%;
    /*height:350px;*/
    padding:0 40px;
    box-sizing: border-box;
    color: #333;
    margin-bottom:30px;
    .right{
      width:100%;
      padding-top:30px;
      color: #666;
      line-height: 28px;
      text-align: right;
    }
    h4{
      font-size: 40px;
      line-height: 96px;
      padding-left:80px;
      margin-bottom: 10px;
      background: url("../../../assets/image/bi.png") 0 0 no-repeat;
    }
    p{
      font-size: 20px;
      margin-bottom:12px;
    }
  }
  .report-wrap{
    width:1200px;
    margin: 0 auto;
    .report-item {
      /*padding: {*/
      /*top: 20px;*/
      /*}*/
      margin-bottom:20px;
      .report-item-title {
        padding: {
          left: 40px;
          right: 40px;
        }
        text-align: left;
        height: 80px;
        line-height: 80px;
        background:url("../../../assets/image/paperReport-img3.png") no-repeat 18px 50%;
        background-color:#FFF;
        border: {
          bottom: 1px solid #e1e5ec;
        }
        .main {
          display: inline-block;
          font-size: 24px;
          color: #333;
        }
        .fenge {
          width:2px;
          height:24px;
          display: inline-block;
          vertical-align: -5px;
          background: #333;
          margin: 0 10px;
        }
        .tag {
          display: inline-block;
          font-size: 24px;
          color: #333;
        }
      }
      .charbot{
        margin-left:10%;
        width:80%;
        /*border:solid 1px;*/
        padding-top: 2%;
        ul{
          width:70%;
          /*border: solid #0BB20C 1px;*/
          display:table;
          margin:0 auto;
          li{
            width:10%;
            list-style: none;
            padding-left:2%;
            /*border: solid 1px;*/
            text-align: center;
            float: left;
            span{
              display: inline-block;
              margin-left: 5%;
            }
          }
        }

      }
      .report-item-body {
        background: #fff;
        /*padding: {*/
        /*left: 40px;*/
        /*right: 40px;*/
        /*}*/
        /*padding-top: 15px;*/
        padding-bottom: 80px;
        .title {
          text-align: left;
          padding-bottom: 60px;
          h2 {
            color: #55739b;
            font-size: 24px;
            font-weight:100;
          }
          p {
            line-height: 36px;
            color: #999999;
            font-size: 20px;
          }
          .line-wrap {
            position: relative;
            width: 140px;
            height: 1px;
            margin: 16px 0;
            .line {
              width: 100%;
              border-bottom: 1px dashed #999;
            }
            .dian {
              position: absolute;
              top: -1.5px;
              $h: 6px;
              border-radius: $h/2;
              background-color: #cccccc;
              overflow: hidden;
              &:first-child {
                left: 0;
              }
              &:last-child {
                right: 0;
              }
            }
          }
        }
      }
    }
    /*封面*/
    .covers-content{
      /*height:856px;*/
      margin-bottom:20px;
      text-align:center;
      overflow: hidden;
      /*background:url("../../../../static/img/paperReport-img1.png") no-repeat 100% 100%;*/
      background-color:#FFF;
      margin-top:20px;
      .logo-img{
        text-align: left;
        margin-top:80px;
        img{
          margin-left:40px;
        }
      }
      .title{
        font-size:80px;
        font-weight:100;
        margin-top:50px;
        color:#231815;
      }
      .sub-title {
        font-size:40px;
        margin-top:30px;
        color: #221815;
        font-weight:100;
      }
      .blue-line{
        width:260px;
        height:10px;
        margin:0 auto;
        background-color:#2e6fab;
        margin-top:60px;
        margin-bottom:46px;
      }
      .p-subject{
        color:#2e6fab;
        font-size:35px;
        margin-bottom:80px;
      }
      .bottom-detail {
        margin-bottom:30px;
        .p-bottom{
          color:#231815;
          font-size:28px;
          text-align: left;
          width: 400px;
          margin: 10px auto;
          white-space:nowrap;
        }
      }

    }
    /*小球*/
    .report-title {
      background-color: #FFF;
      position: relative;
      overflow: hidden;
      /*padding-top:70px;*/
      .report-title-top{
        padding-left:40px;
        font-size:30px;
        color:#333;
        background:url("../../../assets/image/paperReport-img3.png") no-repeat 18px 50%;
      }
      .time-answer-wrap {
        text-align: left;
        font-size: 16px;
        color: #666666;
        line-height: 30px;
        position: absolute;
        left: 35px;
        top: 45px;
        .answer{

        }
        .tiem {
        }
      }
      .look-paper {
        position: absolute;
        right: 40px;
        top: 45px;
      }
      .canvas-img{
        text-align: center;
        margin:0 auto;
        display: none;
      }
      .canvas-div{
        text-align: center;
        width:1000px;
        margin:0 auto;
        padding:30px 0;
        border:2px solid #70c6e6;
        /*margin-top:200px;*/
        .canvas {
          /*margin:0 auto;*/
        }
        p{
          font-size:30px;
          color:#2e75b6;
          margin-top:70px;
        }
      }
      .name {
        text-align: center;
        color: #333;
        font-size: 30px;
        padding: {
          top: 36px;
          bottom: 30px;
        }
      }
    }
    /*蜘蛛网图*/
    #subjectAbility{
      padding-top:40px;
      border:2px solid #70c6e6;
    }
    .p-zzText{
      font-size:24px;
      color:#333;
      text-align:center;
      padding-top:36px;
    }
    /*蜘蛛网状图文案*/
    .zz-writeText{
      .p-zhushi{
        margin-left:40px;
        font-size:22px;
        margin-top:20px;
      }
      .zz-wrap{
        margin:0 40px;
        ul{
          display: flex;
          flex-wrap: wrap;
          li{
            /*float: left;*/
            display: flex;
            flex-wrap: wrap;
            margin-bottom:20px;
            width:50%;
            .left-wrap{
              float: left;
              margin-right:26px;
              .num-text{
                height:80px;
                width:80px;
                background-color:#f7f7f7;
                border:1px solid #cfcfcf;
                border-radius:5px;
                text-align:center;
                line-height:80px;
              }
            }
            .right-wrap{
              /*float: left;*/
              width:440px;
              h3{
                font-size:20px;
                color:#333;
                margin-bottom:16px;
                span{
                  font-weight:100;
                  color:#de6b6b;
                  font-size:18px;
                }
              }
              .key-list{
                font-size:20px;
                color:#333;
                margin-bottom:16px;
                span{
                  font-size:16px;
                  margin-right:6px;
                  i{
                    display: inline-block;
                    width:18px;
                    height:18px;
                    background-color:#e74141;
                    margin-right:6px;
                    font-style: inherit;
                    text-align:center;
                    line-height:18px;
                    color:#FFF;
                  }
                }
              }
              p{
                font-size:16px;
                color:#999;
              }
            }
          }
        }
        .clear{
          clear: both;
        }
      }
    }
    /*核心素养*/
    .sy-content{
      .report-knowledge-main{
        max-width:1200px !important;
        position: relative;
        height:480px;
        .sy-inset-wrap{
          height:480px;
          width:576px;
          border:2px solid #70c6e6;
          margin-left:36px;
          #subjectAbilitytwo{
            position: absolute;
            top:40px;
            left:-130px;
            //transform: scale(0.8);
             zoom:0.8;
          }
          p{
            text-align: center;
            font-size:24px;
            margin-top:0!important;
          }
        }

        .imp-table{
          position: absolute;
          top:0;
          left:692px;
          color:#333;
          .p1{
            font-size:20px;
            font-weight:bold;
          }
          .sy-text{
            p{
              font-size:18px;
              line-height:1.5;
            }
            .left1{
              margin-top:14px;
              border-bottom:2px solid #70c6e6;
              padding-bottom:10px;
            }
            .right1{
              margin-top:14px;
              border-bottom:2px solid #70c6e6;
              padding-bottom:10px;
            }
          }

        }
        .p-zhushi{
          margin-left:40px;
          font-size:22px;
          margin-top:20px;
        }
        .clear{
          clear: both;
        }
      }
    }
    .p-textLF{
      font-size:24px;
      color:#333;
      margin-top:12px;
      padding-left:40px;
    }
    .ge-por{
      position: relative;
    }
    .report-item {
      /*padding: {*/
      /*top: 20px;*/
      /*}*/
      margin-bottom:20px;
      .report-item-title {
        padding: {
          left: 40px;
          right: 40px;
        }
        text-align: left;
        height: 80px;
        line-height: 80px;
        background:url("../../../assets/image/paperReport-img3.png") no-repeat 18px 50%;
        background-color:#FFF;
        border: {
          bottom: 1px solid #e1e5ec;
        }
        .main {
          display: inline-block;
          font-size: 24px;
          color: #333;
        }
        .fenge {
          width:2px;
          height:24px;
          display: inline-block;
          vertical-align: -5px;
          background: #333;
          margin: 0 10px;
        }
        .tag {
          display: inline-block;
          font-size: 24px;
          color: #333;
        }
      }
      .charbot{
        margin-left:10%;
        width:80%;
        /*border:solid 1px;*/
        padding-top: 2%;
        ul{
          width:70%;
          /*border: solid #0BB20C 1px;*/
          display:table;
          margin:0 auto;
          li{
            width:10%;
            list-style: none;
            padding-left:2%;
            /*border: solid 1px;*/
            text-align: center;
            float: left;
            span{
              display: inline-block;
              margin-left: 5%;
            }
          }
        }

      }
      .report-item-body {
        background: #fff;
        /*padding: {*/
        /*left: 40px;*/
        /*right: 40px;*/
        /*}*/
        /*padding-top: 15px;*/
        padding-bottom: 80px;
        .title {
          text-align: left;
          padding-bottom: 60px;
          h2 {
            color: #55739b;
            font-size: 24px;
            font-weight:100;
          }
          p {
            line-height: 36px;
            color: #999999;
            font-size: 20px;
          }
          .line-wrap {
            position: relative;
            width: 140px;
            height: 1px;
            margin: 16px 0;
            .line {
              width: 100%;
              border-bottom: 1px dashed #999;
            }
            .dian {
              position: absolute;
              top: -1.5px;
              $h: 6px;
              border-radius: $h/2;
              background-color: #cccccc;
              overflow: hidden;
              &:first-child {
                left: 0;
              }
              &:last-child {
                right: 0;
              }
            }
          }
        }
      }
    }
    .report-knowledge {
      .report-knowledge-main {
        max-width: 1000px;
        margin-left:auto !important;
        margin-right:auto !important;
        .header {
          position: relative;
          height: 40px;
          line-height: 40px;
          text-align: center;
          .ling {
            display: inline-block;
            position: absolute;
            top: 0;
            left: 0;
          }
          .hundred {
            display: inline-block;
            position: absolute;
            top: 0;
            right: 0;
          }
          .percent-num-item {
            width: 20%;
            display: inline-block;
            float: left;
            text-align: center;
            &.first {
              width: 10%;
              text-align: left;
            }
            &.last {
              width: 10%;
              text-align: right;
            }
          }
        }
        .main {
          $color2: #7fcfc6;
          padding: 40px 0;
          position: relative;
          border: {
            top: 3px solid $color2;
            left: 3px solid $color2;
            right: 1px solid $color2;
            bottom: 1px solid $color2;
          }
          .right-num{
            position: absolute;
            width:100px;
            display:inline-block;
            right:-110px;
            top:32px;
            font-size:16px;
            color:#333;
          }
          .left-wrap-dy{
            position: absolute;
            right:-285px;
            width: 200px;
            text-align: left;
            font-size: 16px;
            color: #808080;
            display: none;
            .left-item {
              line-height: 40px;
              .yuan {
                $w: 20px;
                width: $w;
                height: $w;
                background: #ccc;
                margin-right: 6px;
                vertical-align: middle;
                display: inline-block;
                border-radius: $w/2;
                overflow: hidden;
              }
            }
          }
          .left-wrap {
            position: absolute;
            left: 123%;
            width: 200px;
            text-align: left;
            font-size: 16px;
            color: #808080;
            .left-item {
              line-height: 40px;
              .yuan {
                $w: 20px;
                width: $w;
                height: $w;
                background: #ccc;
                margin-right: 6px;
                vertical-align: middle;
                display: inline-block;
                border-radius: $w/2;
                overflow: hidden;
              }
            }
          }
          .line {
            position: absolute;
            height: 100%;
            top: 0;
            width: 1px;
            background: #3ccdfe;
            opacity: 0.2;
          }
          .dian {
            position: absolute;
            $w: 15px;
            left: -$w/2;
            top: -$w/2;
            overflow: hidden;
            border-radius: $w/2;
            background: $color2;
          }
          .main-item {
            position: relative;
            text-align: left;
            &-title {
              line-height: 30px;
              color: #666;
              font-size: 16px;
              padding: 0 10px;
            }
            &-body {
              $h: 24px;
              height: $h;
              width: 100%;
              border-radius: $h/2;
              background: #eaeaea;
              .num-total {
                display: inline-block;
                height: 100%;

                border-radius: $h/2;
                background: #7fcfc6;
                width: 100px;
              }
            }
          }
        }
      }
    }
    .zz-writeTextNo{
      display: none;
    }
    /*知识*/
    .knowledgeGrasp-content{
      margin:0 40px;
      h3{
        font-size:24px;
        color:#333;
      }
      p{
        color:#666;
        font-size:18px;
        line-height:1.5;
      }
      .left1{
        float: left;
        width:500px;
        span{
          color:#de6b6b;
        }
      }
      .right1{
        float: right;
        width:500px;
        span{
          color:#de6b6b;
        }
      }
      .line{
        height:3px;
        width:60px;
        background-color:#21a0ff;
        margin:10px 0;
      }
      .clear{
        clear: both;
      }
    }
    .knowledgeGraspNo{
      display:none;
    }
    /*较难教易提升*/
    .inCrease-content{
      .left-wrap {
        text-align: left;
        font-size: 16px;
        color: #808080;
        margin:0 auto;
        width:300px;
        margin-top:26px;
        .left-item {
          line-height: 40px;
          font-size:14px;
          color:#333;
          display: inline-block;
          margin-right:30px;
          &:last-child{
            margin-right:0;
          }
          .yuan {
            width:20px;
            height:20px;
            border-radius:50%;
            display: inline-block;
            margin-right:6px;
            vertical-align: middle;
          }
        }
      }
      .lf-text{
        position: absolute;
        top:0;
        right:-90px;
        width:80px;
        color:#666;
      }
      .lf-text1{
        position: absolute;
        top:0;
        left:-95px;
        width:80px;
        text-align: right;
        color:#666;
      }
    }
    .moduleScoreNo{
      display:none;
    }
  }


  /*打印样式*/
  .PageNext   {   PAGE-BREAK-AFTER:   always   }
  @media print{
    .report-wrap{
      background-color: #FFF;
    }
    .report-item-body{
      padding-bottom:0 !important;
    }
    .canvas-div{
      #canvas{
        display: none;
      }
      .canvas-img{
        display: block !important;
      }
    }
    .zz-writeTextNo{
      display: block !important;
    }
    .zz-writeTextYes{
      display: none;
    }
    .knowledgeGraspNo{
      display:block !important;
    }
    .knowledgeGraspYes{
      display:none;
    }
    .moduleScoreNo{
      display:block !important;
    }
    .moduleScoreYes{
      display:none;
    }
  }
  .zz-writeTextNo {
    display: block !important;
  }
  .zz-writeTextYes {
    display: none;
  }
  .knowledgeGraspNo {
    display: block !important;
  }
  .knowledgeGraspYes {
    display: none;
  }
  .moduleScoreNo {
    display: block !important;
  }
  .moduleScoreYes {
    display: none;
  }

</style>
<style lang="scss">
.testReport-content{
  .insurance {
  margin: 38px;
  margin-bottom: 20px;
  padding: 35px 20px;
  border: solid 1px #d2d2d2;
  background-color: #f5f5f5;
  color: #666;
  position: relative;
  p{
    text-align: center;
  }
  p:nth-child(1){
    margin-bottom: 20px;
  }
  .ins-gray{
    color: #333;
    display: inline-block;
    padding-right: 15px;
    margin-right: 15px;
    border-right: solid 1px #a6a6a6;
    font-size: 16px;
  }
  .ins-gray2{
    border: none;
    padding: 0;
    padding-left: 10px;
  }
  .ins-red{
    color: #c80032;
    padding-right: 15px;
    border-right: solid 1px #a6a6a6;
    margin-right: 15px;
  }
  .ins-nobor{
    border: none;
  }
  .ins-btn{
    font-size: 16px;
    position: absolute;
    text-align: center;
    top: 47px;
    right: 30px;
    background-color: #ff9b19;
    color: right;
    color: #fff;
  }
}
.insurance-p {
  margin-left: 38px;
  text-align: left;
  color: #999;
}
}
</style>


</style>
