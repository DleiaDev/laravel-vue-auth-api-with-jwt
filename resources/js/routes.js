import Welcome from './components/Welcome.vue';
import Login from './components/auth/Login.vue';
import Register from './components/auth/Register.vue';
import Home from './components/Home.vue';

export const routes = [
  // Before login
  { path: '/', name: 'welcome', component: Welcome },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },

  // After login
  { path: '/home', name: 'home', component: Home, meta: { requiresAuth: true } }
];
