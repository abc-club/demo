// router.js
import Vue from 'vue';
import Router from 'vue-router';
const Foo = () => import('./components/Foo.vue');

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/foo',
        component: Foo,
      },
      // ...
    ],
  });
}
