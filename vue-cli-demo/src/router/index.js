import Vue from 'vue';
import VueRouter from 'vue-router';
import Animation from '../views/Animation.vue';
import Directive from '../views/Directive.vue';
import 'animate.css';

const User = {
  render(createElement) {
    return createElement('div', [
      this.$route.params.id,
      createElement(
        'router-link',
        {
          props: {
            to: '/user/1',
          },
        },
        'user1',
      ),
      createElement(
        'router-link',
        {
          props: {
            to: '/user/2',
          },
        },
        'user2',
      ),
      createElement('router-view'),
    ]);
  },
  created() {
    console.log('created');
  },
  watch: {
    $route(to, from) {
      console.log(to, from);
    },
  },
  beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter');
    // react to route changes...
    // don't forget to call next()
    next();
  },
  // 导航守卫
  beforeRouteUpdate(to, from, next) {
    console.log('beforeRouteUpdate');
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log('beforeRouteLeave');
    next();
  },
};

const Foo = {
  render(createElement) {
    return createElement('div', 'foooooooo' + this.$route.params.id + JSON.stringify(this.$route.query));
  },
};

const UserEdite = {
  render(createElement) {
    return createElement('div', 'UserEdite' + this.$route.params.id + this.$route.params.post_id);
  },
};

const UserProfile = {
  render(createElement) {
    return createElement('div', 'UserProfile');
  },
};

const NOTFOUND = {
  render(createElement) {
    return createElement('div', '404' + this.$route.params.pathMatch);
  },
};

const NamedView = {
  render(createElement) {
    return createElement('div', [
      'NamedView',
      createElement('router-view'),
      createElement('router-view', {
        props: {
          name: 'a',
        },
      }),
    ]);
  },
};

const NamedViewA = {
  render(createElement) {
    return createElement('div', ['NamedViewaaaaaaaaaa']);
  },
};

const NamedViewB = {
  render(createElement) {
    return createElement('div', ['NamedViewbbbbbbb']);
  },
};

const PassingProps = {
  props: ['id'],
  render(createElement) {
    return createElement('div', this.$props.id + JSON.stringify(this.$route.params) + JSON.stringify(this.$route.query));
  },
};

const Admin = {
  render(createElement) {
    return createElement('div', ['Admin']);
  },
};

const Login = {
  render(createElement) {
    return createElement('div', ['Login']);
  },
};

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Animation',
    component: Animation,
    beforeRouteLeave(to, from, next) {
      const answer = window.confirm('Do you really want to leave? you have unsaved changes!');
      if (answer) {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
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
    path: '/post/:id',
    name: 'post',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "post" */ '../views/Post.vue'),
  },
  {
    path: '/post2/:id',
    name: 'post2',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "post" */ '../views/Post2.vue'),
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
  {
    path: '/user/foo',
    name: 'foo',
    component: Foo,
  },
  {
    path: '/user/:id',
    name: 'user',
    component: User,
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: UserProfile,
      },
      {
        path: 'post/:post_id',
        name: 'user-post',
        component: UserEdite,
      },
    ],
    beforeEnter(to, from, next) {
      console.log('beforeEnter');
      next();
    },
  },
  {
    path: '/namedview',
    name: 'NamedView',
    component: NamedView,
    children: [
      {
        path: '',
        components: {
          default: NamedViewA,
          a: NamedViewB,
        },
      },
    ],
    alias: '/nv',
  },
  {
    path: '/nv1',
    redirect: '/namedview',
  },
  {
    path: '/passingprops/:id',
    name: 'passingprops',
    component: PassingProps,
    props: true,
  },
  {
    // 会匹配所有路径
    path: '*',
    name: 'All',
    component: NOTFOUND,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  console.log(to);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    });
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    // if (!auth.loggedIn()) {
    //   next({
    //     path: '/login',
    //     query: { redirect: to.fullPath }
    //   })
    // } else {
    //   next()
    // }
  } else {
    next(); // 确保一定要调用 next()
  }
});

router.beforeResolve((to, from, next) => {
  console.log('beforeResolve');
  next();
});

router.afterEach((to, from) => {
  console.log('afterEach');
});
export default router;
