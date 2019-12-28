<template>
    <div class="live-box">
      <iframe  id="mainframe" allow="camera;microphone;autoplay" name="mainframe"  frameborder="0"  :src="liveUrl" scrolling=auto  width="100%" height="100%" >
      </iframe>
    </div>
</template>
<script>
    export default {
        components: {},
        props: {},
        mounted() {
          //console.log(this.$route.query.liveUrl)
         // this.liveUrl=this.$toute.query.liveUrl
        },
        data() {
            return {
             liveUrl:this.$route.query.liveUrl,
             /* liveUrl:'https://global.talk-cloud.net/WebAPI/entry/domain/bjyjkj/serial/1151117555/username/00021/usertype/0/ts/1539600924/auth/1c3ac8fc3a0fd85e7a2d5752026ea48f/userpassword/7e2a14125d4304987188a3d3349af0d4',*/
            }
        },
    }
</script>
<style scoped>
.live-box{
  width:100%;height: 100%}
</style>
