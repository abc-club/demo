import Vue from 'vue';
import VueRouter from 'vue-router';
import Animation from '../views/Animation.vue';
import Directive from '../views/Directive.vue';
import 'animate.css';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Animation',
    component: Animation,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
  },
  {
    path: '/Directive',
    name: 'Directive',
    component: Directive,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
