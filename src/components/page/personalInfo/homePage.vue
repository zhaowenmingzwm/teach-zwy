<template>
  <div class="homePage">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="@/assets/image/yjcp1.png" alt>
        </div>
        <div class="swiper-slide">
          <img src="@/assets/image/zjzx2.png" alt>
        </div>
        <div class="swiper-slide">
          <img src="@/assets/image/tfxd3.png" alt>
        </div>
        <div class="swiper-slide foot">
          <Footer></Footer>
        </div>
      </div>

      <!-- Add Pagination -->
      <!-- <div class="swiper-pagination"></div> -->
      <div class="pagination"></div>
    </div>
  </div>
</template>

<script>
import Footer from "@/components/common/footer.vue";
export default {
  data() {
    return {};
  },
  mounted() {
    this.$store.commit('active',0)
    this.initInfo();
  },
  components: {
    Footer
  },
  methods: {
    initInfo() {
      var mySwiper = new Swiper(".swiper-container", {
        pagination: ".pagination",
        paginationClickable: true,
        mode: "vertical",
        mousewheelControl : true,
        slidesPerView: "auto",
        autoHeight: !0,
      });
    }
  }
};
</script>

<style lang="less">
.homePage {
  position: relative;
  height: 100%;
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
  .swiper-wrapper {
    width:100%;
  }
  .swiper-container {
    width: 100%;
    height: calc(100vh - 61px)
  }
  .swiper-slide {
    width:100%;
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    img {
      width: 100%;
      height: calc(100vh - 61px)
      // height: 100%;
    }
  }
  .pagination {
    position: absolute;
    z-index: 20;
    right: 10px;
    top: 250px;
  }
  .swiper-pagination-switch {
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background: #555;
    margin: 0 0px 5px;
    opacity: 0.8;
    border: 1px solid #fff;
    cursor: pointer;
  }
  .swiper-active-switch {
    background: #fff;
  }
  .foot {
    width:100%;
    height: 181px !important;
    background-color: #2d2d2d;
  }
}
</style>


