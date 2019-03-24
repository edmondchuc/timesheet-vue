import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Timesheet from '@/components/Timesheet'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },

    {
        path: '/app',
        name: 'App',
        component: Timesheet
    }
  ]
})