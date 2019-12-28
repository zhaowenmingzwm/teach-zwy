// The Vue build version to load with the `import` command987654321
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import Vuex from 'vuex'
import commonTitle from "./components/common/commonTitle.vue";
import '../static/css/main.css'
// import './assets/css/reportDETAIL.css'
import store from './store'
import breadCrumb from "./components/common/breadCrumb.vue";
import Print from 'vue-print-nb'
import { global } from './api/common'
Vue.component('breadCrumb', breadCrumb)

window.addEventListener("visibilitychange",function(){ //这个方法是监测浏览器窗口发生变化的时候执行
  // console.log(global.userId);
  const userId = global.userId;
  if (document.hidden == false && userId !=  JSON.parse(localStorage.getItem('web')).userId) {
    global.userId = localStorage.getItem('userId') //只有当初始创建的userId不等于localStorage里面的userId的时候去覆盖掉这个userId
  }
});

// import Swiper from 'swiper';      //引入swiper
// import 'swiper/dist/css/swiper.css';
// Vue.use(Swiper)

import VueHtmlToPaper from 'vue-html-to-paper';
import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(Vuex)
Vue.use(VueQuillEditor)
Vue.use(Print);
const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
  ]
}

Vue.use(VueHtmlToPaper, options);


Vue.config.productionTip = true
Vue.use(ElementUI);

Vue.component('commonTitle', commonTitle)

import * as vuePrototype from '../src/api/index.js';
for (let key in vuePrototype) {
  Vue.prototype[key] = vuePrototype[key];
}



/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
})
