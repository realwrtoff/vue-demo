import Router from 'vue-router'

import login from '@/components/login'
import main from '@/components/main'
import company from '@/components/company/list'
import company_info from '@/components/company/info'

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/main',
    name: 'main',
    component: main,
    children: [
      {
        path: '/company',
        name: 'company',
        component: company,
      },
      {
        path: '/company/info',
        name: 'company_info',
        component: company_info,
      }
    ]
  }
]

const router = new Router({
  routes
})

export default router

