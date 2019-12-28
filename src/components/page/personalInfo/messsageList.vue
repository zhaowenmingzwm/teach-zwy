<template>
  <div class="messageDeatis">
    <p class="messageTitle">消息中心</p>
<!--    消息列表-->
    <ul class="messageContain" v-for="(item ,index) in messageList" :key="index">
      <li>
        <div class="con">
          <div class="imgsty">
            <img src="@/assets/image/mess.png" alt>
          </div>
          <div class="con-div">
            <p class="p1">
              <label>系统通知</label>
              <span>{{item.createTime}}</span>
              <img class="dele" src="@/assets/image/delete.png" alt @click="deleteBtn($event,item.id)">
            </p>
            <p class="p2">{{ item.body }}</p>
          </div>
        </div>
      </li>
    </ul>
<!--    分页器-->
    <div class="pagination">
      <div class="block">
        <el-pagination
          style="text-align: center;margin: 20px"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-size="10"
          layout="total,prev, pager,next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userId: localStorage.getItem('token'),
        messageList: [],
        total:0
      };
    },
    created() {
      this.getData(1)
    },
    methods: {
      //删除
      deleteBtn(e,id){
        // console.log(id);
        this.$axios.post('message/deleteMessage',{
          id:id
        }).then(()=>{
          this.messageList = this.messageList.filter((item)=>{
            return item.id !==id
          })
        })
      },

      //页码变化
      handleCurrentChange(val) {
        this.getData(val)
      },

      getData(pageNum, pageSize = 10) {
        this.$axios.post('/message/getMessagesByUserId', {
          pageNum: pageNum,
          pageSize: pageSize,
          userId:this.userId
        }).then(res => {
          this.messageList = res.messages
          this.total = res.totalRows
        })
      }
    }
  };
</script>

<style lang="scss">
  .messageDeatis {
    .messageTitle {
      padding: 30px;
      font-size: 16px;
      color: #333;
      border-bottom: solid #e4e4e4 1px;
    }

    .messageContain {
      padding: 0 30px;
      font-size: 14px;

      .con {
        position: relative;
        border-bottom: solid #e4e4e4 1px;
        padding: 25px 0;
        display: flex;

        .imgsty {
          margin-right: 20px;
          padding-top: 5px;
        }

        .con-div {
          .p1 {
            color: #b2b2b2;
            margin-bottom: 15px;

            .dele {
              position: absolute;
              right: 0

            }
          }

          .p2 {
            color: #666;
          }
        }
      }
    }
  }

  .el-pagination__editor.el-input .el-input__inner {
    width: 30px;
    border: 1px solid #c0c4cc;
    border-radius: 0;
  }
</style>


