import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const SignIn = () => import('../pages/signin')

const router = new Router ({
  routes: [
    {
      path: '/signin',
      name: 'Signin',
      meta: {
        title: '登录界面'
      },
      component: SignIn
    }
  ]
})

export default router