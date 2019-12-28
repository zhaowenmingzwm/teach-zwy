<template>
  <div class="footer-wrap">
    <div class="footer">
      <div class="footer-left">
        <p>相关链接</p>
        <p class="goYjkj">
          <a href="http://www.e-eduspace.com" target="_blank">易教空间官网</a>
        </p>
      </div>
       <div class="footer-left">
        <p>服务</p>
        <p class="goYjkj">
          <a href="http://file.resource.e-eduspace.com/易教测评网站使用手册2019.5.14.pdf" target="_blank">帮助中心</a>
        </p>
      </div>
      <div class="footer-center">
        <p>联系我们</p>
        <p>联系电话: 010-82279600</p>
        <p>公司地址: 北京市西城区北三环中路23号燕莎盛世大厦8层</p>
      </div>
      <div class="footer-right">
        <img src="../../../static/img/bookCollege/QRcode.png">
      </div>
      <div class="footer-bottom">
        <div class="footer-bottom-center">
          <p>Copyright©2015</p>
          <p>北京易教空间教育科技股份有限公司版权所有 | 服务协议</p>
          <p>京ICP备14013090号-6</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style lang='less' scoped>
.footer-wrap {
  background: #2d2d2d;
  height: 181px;
  position: relative;
}
.goYjkj a {
  color: #7e7e7e;
}
.goYjkj a:hover {
  color: #c80032;
}
.footer {
  height: 181px;
  width: 1200px;
  margin: 0 auto;
  overflow: auto;
}
.footer-left {
  width: 216px;
  float: left;
  color: #5e5e5e;
  font-size: 12px;
  text-align: left;
  p {
    margin-top: 15px;
    a {
      color: #5e5e5e;
    }
  }
  p:nth-of-type(1) {
    color: #7e7e7e;
    margin-top: 36px;
    font-size: 14px;
  }
}
.footer-center {
  float: left;
  color: #5e5e5e;
  font-size: 12px;
  p {
    margin-top: 15px;
    text-align: left;
  }
  p:nth-of-type(1) {
    color: #7e7e7e;
    margin-top: 36px;
    font-size: 14px;
  }
}
.footer-right {
  width: 260px;
  height: 72px;
  float: right;
  margin-top: 34px;
  border-left: 1px solid #585858;
  img {
    width: 75px !important;
    height: 73px !important;
    float: right;
  }
}
.footer-bottom {
  width: 100%;
  height: 39px;
  line-height: 39px;
  clear: both;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #232323;
  .footer-bottom-center {
    margin: 0 auto;
    width: 1200px;
    p {
      float: left;
      font-size: 12px;
      color: #676767;
    }
    p:nth-of-type(1) {
      margin-left: 278px;
    }
    p:nth-of-type(2) {
      margin-left: 49px;
    }
    p:nth-of-type(3) {
      margin-left: 62px;
    }
  }
}
</style>
