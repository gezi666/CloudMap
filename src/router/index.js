import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index.vue'
import entBase from '@/pages/entBase.vue'
import businessRouter from '@/pages/business-info/router'
import courtRouter from '@/pages/court-info/router'
import internetRouter from '@/pages/internet-info/router'
import environmentalRouter from '@/pages/ep-info/router'
import taxRouter from '@/pages/tax-info/router'
import foodRouter from '@/pages/fda-info/router'
import financialRouter from '@/pages/finance-info/router'
import customsRouter from '@/pages/customs-info/router'
import qualityRouter from '@/pages/quality-info/router'
import intangibleAssetsRouter from '@/pages/intangibleAssets-info/router'
import opStatusRouter from '@/pages/opStatus-info/router'
import listedCompanyRouter from '@/pages/listedCompany-info/router'
Vue.use(Router)
export default new Router({
  routes: [
        {
          path: '/',
          name: 'index',
          component: index
        },
       {
          path: '/entBase',
          name: 'entBaseNoName',
          component: index
       },
      {
          path: '/entBase/:entName',
          name: 'entBase',
          component: entBase,
          children:[].concat(businessRouter,courtRouter,internetRouter,environmentalRouter,taxRouter,foodRouter,financialRouter,customsRouter,qualityRouter,intangibleAssetsRouter,opStatusRouter,listedCompanyRouter)
      }
  ]
})
