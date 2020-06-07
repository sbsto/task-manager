import Vue from 'vue'
import vueRouter from 'vue-router'
import axios from 'axios'

import App from './App.vue'
import Tasks from './components/tasks/Tasks'
import Signup from './components/Signup'
import Login from './components/Login'
import store from './store'
import VueRouter from 'vue-router'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(vueRouter)

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const routes = [{
    path: '/tasklist',
    component: Tasks,
    beforeEnter: (to, from, next) => {
      console.log('AUTHENTICATING')
      if (store.getters['login/isLoggedIn'] === false) {
        console.log('NOT ALLOWED IN')
        next(false);
      } else {
        console.log('ALLOWED IN')
        next();
      }
    }
  },
  {
    path: '/',
    component: Signup
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
}).$mount('#app')