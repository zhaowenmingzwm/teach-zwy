<template>
  <canvas ref="canvas" style="background-color:#FFF;border-radius:50%;display:none;">
    <p>抱歉，您的浏览器不支持canvas</p>
  </canvas>

</template>
<script>
  export default {
    components: {},
    data(){
      return {
      }
    },
    mounted(){
      let circle = this.circle;
      if (circle.width) {
        this.circleIndex()
        this.generatingCircle();
      }
    },
    props: {
      circle: {},
      msg: String,
    },
    methods: {
      circleIndex(){

      },
      //画圆
      generatingCircle() {
        const _this = this;
        var circleConfig = this.circle,
          totalnum = circleConfig.score,
          width = circleConfig.width,
          totalScore = circleConfig.totalScore,
          canvas = this.$refs.canvas,
          ctx = canvas.getContext("2d"),
          percent = totalnum, // 最终百分比
          circleX = width / 2, // 中心x坐标
          circleY = width / 2, // 中心y坐标
          radius = (width - 10) / 2, // 圆环半径
          lineWidth = 8, // 圆形线条的宽度
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
          // let linGrad = ctx.createLinearGradient(
          //   circleX, circleY - radius - lineWidth, circleX, circleY + radius + lineWidth
          // );
          // linGrad.addColorStop(0.0, '#b690fd');
          // linGrad.addColorStop(0.25, '#87a0fe');
          // linGrad.addColorStop(0.5, '#3baaff');
          // linGrad.addColorStop(0.75, '#578dfe');
          // linGrad.addColorStop(1.0, '#3780fb');
          ctx.strokeStyle = "#ffd200";

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

          ctx.clearRect(0, 0, circleX * 2, circleY * 2);
          // 清除canvas内容
          var ax = "";
          var ay = "";
          var ax1 = "";
          var ay1 = "";
          if(process<10){
            ax = circleX;
            ay = circleY;
            ax1 = circleX+23;
            ay1 = circleX+10;
          }
          if(process>=10&&process<=99){
            ax = circleX;
            ay = circleY;
            ax1 = circleX+33;
            ay1 = circleX+10;
          }
          if(process>99){
            ax = circleX-3;
            ay = circleY;
            ax1 = circleX+33;
            ay1 = circleX+20;
          }
          ctx.font = fontSize + 'px April';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#333';
          ctx.fillText(parseFloat(process).toFixed(0), ax, ay);

          ctx.font = 16+ 'px April';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#333';
          ctx.fillText( '分', ax1, ay1);
          // 圆形
          circle(circleX, circleY, radius);
          // 圆弧
          sector(circleX, circleY, radius, 0, process / totalScore * 360);
          // 控制结束时动画的速度var canvas = document.getElementById("canvas");
          var img = canvas ? canvas.toDataURL("image/png") : '';
          // _this.canvasImg = img;
          _this.$emit('update:msg',img);
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
    },
    watch: {
      circle(){
        this.generatingCircle();
      }
    },
    computed: {},
    filters: {}

  }
</script>
<style scoped>
</style>
