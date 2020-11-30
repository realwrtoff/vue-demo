import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/login'
import main from '@/components/main'
import company from '@/components/company/list'
import company_info from '@/components/company/info'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/main',
      component: main,
      children: [
        {
          path: '/company',
          component: company,
        },
        {
          path: '/company/info',
          component: company_info,
        }
      ]
    }
  ]
})
