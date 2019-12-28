<template>
  <div class="insuranceSelect">
    <div class="insuranceSelect_tabs_wrap">
      <div
        class="insuranceSelect_tabs"
        :class="tebleIndex == index ? 'activeClass' : ''"
        v-for="(item, index) in vipMemberList"
        :key="index"
        @click="hadlerSlect(item, index)"
      >
        <span>{{item.stageName}}</span>
      </div>
    </div>
    <div class="insuranceSelect_content">
      <div
        class="insuranceSelect_content_grade"
        v-for="(item, index) in vipMemberList[tebleIndex].gradeList"
        :key="index"
      >
        <!-- {{ item}} -->
        <div class="content_grade_subject">
          <div v-if="item.stageCode != 3 &&  item.stageCode != 5" class="content_grade_subject_tag">
            <i class="el-icon-star-on"></i>
            {{item.gradeName}}
          </div>
          <div class="content_grade_subject_item">
            <div
              v-for="(ele, i) in item.list"
              :key="i"
              class="content_grade_subject_item_tag"
              :class="ele.active ? 'active' : ele.isEleAble ? '' : 'forbidden'"
              @click="ele.isEleAble ? handlerSubject(ele, index, i, item) : null"
              @mouseenter="tagenter(ele, index, i)"
              @mouseleave="tagtoDraw(ele, index, i)"
            >
              <span v-html="ele.subjectName"></span>
              <div v-if="ele.isEleAble" class="new">new</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { learning } from "../page/vipCenter/learningList";
export default {
  name: "insurance",
  props: ["vipMemberList"],
  data() {
    return {
      activeClass: null, // 选择年级
      newVipMemberList: this.vipMemberList, // 初始化数据
      tebleIndex: 4, // 学段下标
      oldName: "" // 记录鼠标移入时的名称
    };
  },
  created() {
    this.activeClass = this.newVipMemberList[0];
    learning.forEach((item, index) => {
      item.gradeList.forEach((ele, i) => {
        if (ele.show.length) {
          ele.show.forEach(y => {
            this.newVipMemberList[index].gradeList[i].list[y].isEleAble = true;
          });
        }
      });
    });
    // 初始化数据，每个科目中增加active字段，判断是否选中
    this.newVipMemberList.forEach(element => {
      element.gradeList.forEach(item => {
        item.list.forEach(ele => {
          ele.active = false;
        });
      });
    });
  },
  mounted() {},
  methods: {
    // 选择学段
    hadlerSlect(item, i) {
      this.activeClass = item;
      this.tebleIndex = i;
    },
    // 选择科目
    handlerSubject(ele, index, i, item) {
      const active = !this.newVipMemberList[this.tebleIndex].gradeList[index]
        .list[i].active;
      this.newVipMemberList[this.tebleIndex].gradeList[index].list[
        i
      ].active = active;

      this.$emit("chooseSubject", ele);
      // 解决数据更新，页面没有及时渲染的问题
      this.$forceUpdate();
    },
    // 鼠标移入
    tagenter(item, index, i) {
      const newI = i + 1;
      this.oldName = item.subjectName;
      const newObj = learning[this.tebleIndex].gradeList[index];
      this.newVipMemberList[this.tebleIndex].gradeList[index].list[
        i
      ].subjectName = newObj[newI];
    },
    // 鼠标移出
    tagtoDraw(item, index, i) {
      this.newVipMemberList[this.tebleIndex].gradeList[index].list[
        i
      ].subjectName = this.oldName;
    }
  }
};
</script>

<style lang="less">
.insuranceSelect {
  margin-top: 35px;
  margin-bottom: 30px;
  display: flex;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  .insuranceSelect_tabs {
    height: 60px;
    width: 112px;
    background: #f7f7f7;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #d9d9d9;
    border-left: 1px solid #d9d9d9;
    cursor: pointer;
  }
  .insuranceSelect_tabs:last-child {
    border-bottom: 1px solid #d9d9d9;
  }
  .activeClass {
    border: 1px solid;
    color: rgb(200, 0, 50);
    background-color: rgb(255, 230, 230);
  }
  .insuranceSelect_tabs:hover {
    // border: 1px solid;
    color: blue;
  }
  .activeClass:last-child {
    border-bottom: 1px solid;
  }
  .activeClass:hover {
    color: rgb(200, 0, 50);
  }
  .insuranceSelect_content {
    background: #f9f9f9;
    border: 1px solid #d9d9d9;
    flex: 1;
    display: flex;
    flex-wrap: wrap;

    padding-right: 40px;
    width: 100%;
    .insuranceSelect_content_grade {
      // flex: 0 0 50%;
      display: flex;
      justify-content: center;
      .content_grade_subject {
        display: flex;
        align-items: center;
        // justify-content: center;

        .content_grade_subject_tag {
          position: relative;
          width: 60px;
          margin-left: 40px;
          min-width: 60px;
          .el-icon-star-on:before {
            content: " ";
            display: block;
            background: #7e7e7e;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: -12px;
          }
        }
        .content_grade_subject_item {
          display: flex;
          margin-left: 40px;
          flex-wrap: wrap;
          .content_grade_subject_item_tag {
            // margin-bottom: 20px;

            margin-top: 10px;
            margin-bottom: 10px;
            position: relative;
            overflow: hidden;
            width: 94px;
            height: 45px;
            background: white;
            border: 1px solid #d9d9d9;
            margin-right: 25px;
            text-align: center;
            line-height: 45px;
          }
          .content_grade_subject_item_tag:last-child {
            margin-right: 0;
          }
          .content_grade_subject_item_tag:hover {
            cursor: pointer;
          }
          .forbidden {
            background: #e9e9e9;
          }
          .forbidden:hover {
            cursor: pointer;
            color: white;
            background: #b8b8b8;
          }
          .active {
            background-color: rgb(255, 230, 230);
            border: 1px solid;
            color: rgb(200, 0, 50);
          }
          .active:hover {
            cursor: pointer;
          }
        }
        min-width: 1044px;
      }
    }
  }
  .new {
    position: absolute;
    height: 12px;
    width: 70px;
    top: 0px;
    right: -23px;
    background: red;
    color: white;
    text-align: center;
    line-height: 12px;
    transform: rotate(45deg);
    font-size: 10px;
    box-sizing: border-box;
    padding-left: 7px;
  }
}
</style>

