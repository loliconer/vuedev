import store from './store'

import Login from './view/Login.vue'
import Main from './view/Main.vue'
import Home from './view/Home.vue'
import Users from './view/Users.vue'
import Feedback from './view/Feedback.vue'
import ImageUpload from './view/ImageUpload.vue'

const routes = [
  {
    path: '/login.html', component: Login,
    meta: { skipAuth: true }
  },
  { path: '/', redirect: '/index.html' },
  {
    path: '/', component: Main,
    children: [
      { path: '/index.html', component: Home }
    ]
  },
  {
    path: '/user', component: Main,
    children: [
      { path: 'users.html', component: Users },
    ]
  },
  {
    path: '/sys', component: Main,
    children: [
      { path: 'feedback.html', component: Feedback }
    ]
  },
  {
    path: '/company', component: Main,
    children: [
      { path: 'image-upload.html', component: ImageUpload }
    ]
  },
  {
    path: '*',
    component: {
      render(h) {
        return h('div', {}, 'Page not found')
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/admin',
  linkActiveClass: 'focus',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { selector: to.hash }
    return { y: 0 }
  },
  routes
})

export function hook(userPromise) {
  router.beforeEach((to, from, next) => {
    if (to.path === '/login.html') return next()

    userPromise.then(() => {
      if (store.state.user.admin) return next()

      next({ path: '/login.html' })
    })
  })
}

export default router

