<template>
    <div>
        <div class="html" v-html="html">{{html}}</div>
    </div>
</template>

<script>
export default {
	data(){
		return{
			html:this.localData.get('Alipay')
		}
	},
	mounted(){
		this.go();
		this.goPay()
	},
	created(){

	},
	methods:{
		go(){
      this.$message({
        type: 'info',
        message: "正在跳转到支付页面，请稍后"
      });
    },
    goPay(){
      var item = document.getElementsByName('punchout_form')[0];
      item.submit();
    }
	}
}
</script>

<style lang='less' scoped>
.abilityClass-wrap{
    .el-textarea.is-disabled .el-textarea__inner{
      color:#000;
    }
    .el-range-editor.is-disabled input{
      color:#000;
    }
  }
</style>
