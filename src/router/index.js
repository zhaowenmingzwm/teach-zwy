import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui'
Vue.use(Router);

let router = new Router({
  scrollBehavior (to, from, savedPosition) {
    //
    if (savedPosition) {
      return savedPosition
    } else {
      $('#scroll').animate({ scrollTop: 0 });
    }
  },
  routes: [
    {
      path: '/',
      redirect: '/homePage',
      name:'homePage'
    },
    {
      path:'/apliy',
      component: resolve => require(['../components/page/paymentPage/apliy.vue'], resolve),
      meta: {
        requireAuth : true
      }
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/login/index.vue'], resolve)
    },
    {
      path: '/goLive',
      component: resolve => require(['../components/page/teamanage/goLive.vue'], resolve),
      name: 'goLive',
      meta: {
        requireAuth: true, //是否需要登录
        roles: [11] //可访问的用户身份
      }
    },
    {
      path: '/home',
      component: resolve => require(['../components/common/home.vue'], resolve),
      children: [
        {
          path: '/LoginEntrance',
          component: resolve => require(['../components/page/LoginEntrance/LoginEntrance.vue'], resolve),
          name:'LoginEntrance',
          meta: {
            requireAuth : true
          }
        },
        {
          path: '/bookList',
          component: resolve => require(['../components/page/bookCollege/bookList.vue'], resolve)
        },
        {
          path: '/demoQues',
          component: resolve => require(['../components/page/bookCollege/demoQues.vue'], resolve)
        },
        {
          path: '/demoQuesAns',
          component: resolve => require(['../components/page/bookCollege/demoQuesAns.vue'], resolve)
        },
        {
          path: '/onlineTest',
          component: resolve => require(['../components/page/bookCollege/onlineTest.vue'], resolve)
        },
        {
          path: '/paperInfo',
          component: resolve => require(['../components/page/bookCollege/testInfo.vue'], resolve)
        },
        {
          path: '/textBegin',
          component: resolve => require(['../components/page/bookCollege/textBegin.vue'], resolve)
        },
        {
          path: '/reportDetail',
          component: resolve => require(['../components/page/bookCollege/reportDetail.vue'], resolve),
          meta: {
            requireAuth : true
          }
        },
        // vip会员
        {
          path: '/vipCenter',
          component: resolve => require(['../components/page/vipCenter/vipCenter.vue'], resolve),
          meta: {
            requireAuth : true
          }
        },
        //个人信息
        {
          path: '/personalInfo',
          component: resolve => require(['../components/page/personalInfo/personalInfo.vue'], resolve)
        },
        {
          path:'/learningCenter',
          component: resolve => require(['../components/page/learningCenter/learningCenter.vue'], resolve)
        },
        {
          path:'/playbackOfReadingReport',
          component: resolve => require(['../components/page/learningCenter/playbackOfReadingReport.vue'], resolve)
        },
        {
          path:'/purchaseOfCourse',
          component: resolve => require(['../components/page/learningCenter/purchaseOfCourse.vue'], resolve),
          meta: {
            requireAuth : true
          }
        },
        {
          path:'/paymentPage',
          component: resolve => require(['../components/page/paymentPage/paymentPage.vue'], resolve)
        },
        {
          path:'/alipayPage',
          component: resolve => require(['../components/page/paymentPage/alipayPage.vue'], resolve),
          meta: {
            requireAuth : true
          }
        },
        // 首页
        {
          path: '/homePage',
          component: resolve => require(['../components/page/personalInfo/homePage.vue'], resolve),
          meta: {
            requireAuth : true,
            show:1
          }
        },
         // 新国人在线
         {
          path: '/collegeOnline',
          component: resolve => require(['../components/page/collegeOnline/collegeOnline.vue'], resolve),
          meta: {
            requireAuth : true
          }
         },
        {
          path: '/appraisal',
          component: resolve => require(['../components/page/appraisal/appraisal.vue'], resolve),
          meta: {
            requireAuth : true
          }
        },
        {
          path:'/readingTraining',
          component: resolve => require(['../components/page/learningCenter/readingTraining.vue'], resolve),
          meta: {
            requireAuth : true
          }
        },
        /*报告模块路由*/
        /*测评报告*/
        {
          path:'/report/testReport',
          component: resolve => require(['../components/page/report/testReport.vue'], resolve),
          meta: {
            requireAuth : true
          }
        },
        /*提分建议*/
        {
          path:'/report/improveScore',
          component: resolve => require(['../components/page/report/improveScore.vue'], resolve),
          meta: {
            requireAuth : true
          }
        },
        /*深度解构题*/
        {
          path:'/report/wordList',
          component: resolve => require(['../components/page/report/wordList.vue'], resolve),
          meta: {
            requireAuth : true
          }
        },
        /*练习题*/
        {
          path:'/report/exercise',
          component: resolve => require(['../components/page/report/exercise.vue'], resolve),
          meta: {
            requireAuth : true
          }
        },
        /*方案反馈*/
        {
          path:'/report/feedBack',
          component: resolve => require(['../components/page/report/feedBack.vue'], resolve),
          meta: {
            requireAuth : true
          }
        },
         /*方案反馈*/
         {
          path:'/report/recommended',
          component: resolve => require(['../components/page/report/recommended.vue'], resolve),
          meta: {
            requireAuth : true
          }
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token') || to.meta.requireAuth ||to.query.token){ //如果token有值，或者是无需验证的页面s
    next()
  } else {
    next({name:'LoginEntrance'})
  }
})


export default router;
