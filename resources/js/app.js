require('./bootstrap');

import Vue from 'vue';
import MainComp from './components/MainComp.vue';

import Vuex from 'vuex';
import Store from './store';

import VueRouter from 'vue-router';
import {routes} from './routes';

import {Form, HasError, AlertError} from 'vform';

import swal from 'sweetalert2';

// Vuex
Vue.use(Vuex);
const store = new Vuex.Store(Store);

// Router
Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  routes
});
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const currentUser = store.getters.currentUser;
  if (requiresAuth && $.isEmptyObject(currentUser)) {
    next('/login');
  } else if (!requiresAuth && !$.isEmptyObject(currentUser)) {
    next('/home');
  } else {
    next();
  }
});

// vForm
window.Form = Form;
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);

// Sweet alert
window.toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 4000
});

// Axios
if (store.getters.currentUser) {
  var access_token = store.getters.currentUser.access_token;
  window.axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
} else {
  window.axios.defaults.headers.common['Authorization'] = null;
}
axios.interceptors.response.use(null, error => {
  if (error.response.data.message == 'Token has expired') {
    store.commit('logout');
    router.push('/login');
  }
  if (error.response.status == 401) {
    if (window.location.pathname == '/login') {
      $('.error').html('Oops. Wrong credentials.');
    } else {
      store.commit('logout');
      router.push('/login');
    }
  }

  return Promise.reject(error);
});

// App
const app = new Vue({
  el: '#app',
  components: { MainComp },
  router,
  store
});
