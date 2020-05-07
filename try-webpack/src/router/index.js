import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const SignIn = () => import('../pages/signin')
const NotFound = () => import('../pages/404')

const router = new Router ({
  routes: [
    {
      path: '/signin',
      name: 'Signin',
      meta: {
        title: '登录界面'
      },
      component: SignIn
    },
    // {
    //   path: '*',
    //   name: 'NotFound',
    //   meta: {
    //     title: '404'
    //   },
    //   component: NotFound
    // }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next()
})

export default router