<template>
  <!-- 练习题 -->
  <div class="improveScore-content">
    <!-- <div class="breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/learningCenter' }">学习中心</el-breadcrumb-item>
        <el-breadcrumb-item >提分建议</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
    <report-nav></report-nav>
    <!--提升方案&建议-->
    <div class="report-knowledge report-item improveWay-content PageNext">
      <div class="report-item-body">
        <!--<div class="pageTitle" style="height:290px">-->
          <!--<div class="right">联合国教科文组织ESD中国可持续发展项目<br/>可持续发展素养研究与测评中心</div>-->
          <!--<h4>提分建议</h4>-->
          <!--<p>依据提分空间的数据，设置阶段学习目标，并进行学习行为监督及管理，具体行动方案如下:</p>-->
        <!--</div>-->
        <div class="improveWay-wrap">
          <el-table
            :data="improveResultObj.list"
            style="max-width: 1200px;margin:0 auto"
            :header-row-class-name="getRowClass"
            :span-method="objectSpanMethod">
            <el-table-column
              type="index"
              label="优先提升顺序"
              width="100">
            </el-table-column>
            <el-table-column label="优先提升项">
              <el-table-column
                prop="knowledgeName"
                label="知识点"
                width="200">
              </el-table-column>
              <el-table-column
                prop="capacityList"
                label="认知能力"
                width="200">
                <template slot-scope="scope">
                  <span v-for="(item,index) in scope.row.capacityList"><span v-show="index!=0">、</span>{{ item.abilityName }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="keyCompetencyList"
                label="学科核心素养"
                width="200">
                <template slot-scope="scope">
                  <span v-for="(item,index) in scope.row.keyCompetencyList"><span v-show="index!=0">、</span>{{ item.keyCompetencyName }}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              prop="productionList"
              label="命题点"
            >
              <template slot-scope="scope">
                <span v-for="(item,index) in scope.row.productionList"><span v-show="index!=0">、</span>{{ item.productionName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              v-if="proposal"
              prop="score"
              label="可提升分值"
              width="100">
            </el-table-column>
            <el-table-column
              prop="timeRequired"
              label="所需天数"
              width="80">
            </el-table-column>
            <el-table-column
              prop="isLF"
              label="所需资料"
              width="120">
            </el-table-column>
          </el-table>
          <!--<p>提升建议：根据本次测评的结果，建议学生按照上面的表格知识点顺序进行学习和练习。根据本次测评的结果，建议学生按照上面的表格知识点顺序进行学习和练习。</p>-->
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import reportNav from '@/components/page/report/reportNav.vue'
  export default {
    data(){
      return {
        improveResultObj: {list:[]}, //提升方案数据
        days:0,
        scoreTop:0,
        proposal: true,
      }
    },
    components: {
      reportNav
    },
    created(){

      const userInfo = localStorage.getItem("paperBox") ? JSON.parse(localStorage.getItem("paperBox")) : JSON.parse(localStorage.getItem("paperBox"));
      this.proposal = userInfo.productType != 2 && userInfo.gradeCode == 33 && (userInfo.subjectCode == 1 || userInfo.subjectCode == 2) ? false : true;
      this.routeItem = this.$route.query;
      this.improveResult()
    },
    mounted(){
    },
    methods:{
      /*获取提升方案数据*/
      improveResult:function(){
        var $this = this;
        var obj = {
          "evaluationRecordId":this.routeItem.id
        }
        this.$axios
          .post(this.baseURL + "/getPromotionSuggestion",obj)
          .then(({ code, promotionPlans }) => {
            if (code == "000000") {
              // $this.improveResultObj.list =promotionPlans;
              for(var u =0;u<promotionPlans.length;u++){
                $this.improveResultObj.list.push(JSON.parse(promotionPlans[u].suggestion))
                $this.days +=$this.improveResultObj.list[u].timeRequired
                $this.scoreTop += $this.improveResultObj.list[u].score
                $this.improveResultObj.list[u].isLF = "解题行为模式、解题速度提升"
              }
              $this.days = Math.ceil($this.days)
              // this.getPointResult() //获取知识点结构数据
            }else {
              this.$message("获取提升方案失败");
            }
          });
      },
      /*给表头加class*/
      getRowClass({ row, column, rowIndex, columnIndex }) {
        return 'table-th'
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        var $this = this;
        if (columnIndex===7) {
          if (rowIndex % $this.improveResultObj.list.length == 0) {//合并多少行
            return {
              rowspan: $this.improveResultObj.list.length,  //要合并的行数
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },


    },

    watch:{
    }
  }
</script>

<style lang='less' scoped>
  .improveScore-content{
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
    .improveWay-content{
      margin-bottom:50px;
      .improveWay-wrap{
        /*background-color:#FFF;*/

        p{
          margin:40px 40px 0 40px;
          font-size:26px;
          color:#333;
        }
        .el-table thead.is-group th{
          background-color:#000;
        }
      }
    }
  }
</style>
<style lang="scss">
  .improveScore-content .improveWay-wrap .table-th th{
    background-color:#2e75b6;
    color:#FFF;
    text-align:center;
    font-weight:100;
    font-size:20px;
  }
</style>
