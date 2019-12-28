<template>
  <div class="pain-box">
    <iframe  frameborder=0 name="showHere" :src="PainUrl" scrolling=auto  width="100%" height="100%" >
    </iframe>
  </div>
</template>
<script>
  export default {
    components: {},
    props: {},
    mounted() {
    },
    data() {
      return {
        PainUrl: this.localData.get('PainUrl'),
      }
    },
  }
</script>
<style scoped>
  .pain-box{
    width:100%;height: 100%}
</style>
