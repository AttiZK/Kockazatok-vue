// router.js

import { createRouter, createWebHistory } from 'vue-router';
import { is_authenticated } from '../auth';
import HomeView from '@/views/HomeView.vue';
import LoginPage from '@/views/LoginPage.vue';
import StartView from '@/views/StartView.vue';
import KeresoView from '@/views/KeresoView.vue';
import LeltarView from '@/views/LeltarView.vue';
import KezeloView from '@/views/KezeloView.vue';
import ErtekeloView from '@/views/ErtekeloView.vue';
import RiportView from '@/views/RiportView.vue';
import DokuView from '@/views/DokuView.vue';
import AccountView from '@/views/AccountView.vue';
import ElofizetesView from '@/views/ElofizetesView.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/bejelentkezes', name: 'login', component: LoginPage },
  { path: '/start', name: 'Start', component: StartView, meta: { requiresAuth: true } },
  { path: '/kereso', name: 'Kereso', component: KeresoView, meta: { requiresAuth: true } },
  { path: '/leltar', name: 'Leltar', component: LeltarView, meta: { requiresAuth: true } },
  { path: '/ertekelo', name: 'Ertekelo', component: ErtekeloView, meta: { requiresAuth: true } },
  { path: '/kezelo', name: 'Kezelo', component: KezeloView, meta: { requiresAuth: true } },
  { path: '/riport', name: 'Riport', component: RiportView, meta: { requiresAuth: true } },
  { path: '/dokumentacio', name: 'Doku', component: DokuView },
  { path: '/elofizetes', name: 'Elofizetes', component: ElofizetesView },
  { path: '/fiokom', name: 'Account', component: AccountView, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes
});

router.beforeEach(async (to, from) => {
  try {
    const authenticated = await is_authenticated();
    
    console.log('Checking authentication status:', authenticated);
    if (to.meta.requiresAuth && !authenticated) {
      // User is not authenticated, redirect to login
      return { path: "/bejelentkezes" };
    }
    if ((to.path === "/bejelentkezes" || to.path === "/elofizetes") && authenticated) {
      // User is authenticated and trying to access login, redirect to dashboard
      return { path: "/fiokom" };
    }
  } catch (err) {
    alert('server is down');
  }
});

export default router;
