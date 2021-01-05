import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register.vue'
import SignIn from '../views/SignIn.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Register',
    component: Register
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
