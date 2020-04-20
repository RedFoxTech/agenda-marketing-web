import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _8b6adf70 = () => interopDefault(import('../pages/Calendar.vue' /* webpackChunkName: "pages/Calendar" */))
const _67c69ba6 = () => interopDefault(import('../pages/Forgot.vue' /* webpackChunkName: "pages/Forgot" */))
const _6985892d = () => interopDefault(import('../pages/Register.vue' /* webpackChunkName: "pages/Register" */))
const _4e2fa435 = () => interopDefault(import('../pages/Reset.vue' /* webpackChunkName: "pages/Reset" */))
const _2dfb1658 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/Calendar",
    component: _8b6adf70,
    name: "Calendar"
  }, {
    path: "/Forgot",
    component: _67c69ba6,
    name: "Forgot"
  }, {
    path: "/Register",
    component: _6985892d,
    name: "Register"
  }, {
    path: "/Reset",
    component: _4e2fa435,
    name: "Reset"
  }, {
    path: "/",
    component: _2dfb1658,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
