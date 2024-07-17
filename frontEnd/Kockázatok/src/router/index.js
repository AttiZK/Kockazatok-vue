import { createRouter, createWebHistory } from 'vue-router';
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
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/bejelentkezes',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/start',
    name: 'Start',
    component: StartView
  },
  {
    path: '/kereso',
    name: 'Kereso',
    component: KeresoView
  },
  {
    path: '/leltar',
    name: 'Leltar',
    component: LeltarView
  },
  {
    path: '/ertekelo',
    name: 'Ertekelo',
    component: ErtekeloView
  },
  {
    path: '/kezelo',
    name: 'Kezelo',
    component: KezeloView
  },
  {
    path: '/riport',
    name: 'Riport',
    component: RiportView
  },
  {
    path: '/dokumentacio',
    name: 'Doku',
    component: DokuView
  },
  {
    path: '/elofizetes',
    name: 'Elofizetes',
    component: ElofizetesView
  },
  {
    path: '/fiokom',
    name: 'Account',
    component: AccountView
  },
  
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes
});

export default router;
