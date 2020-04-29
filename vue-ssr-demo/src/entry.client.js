import { createApp } from './app';

// 客户端特定引导逻辑……

const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

// 这里假定 App.vue 模板中根元素具有 `id="app"`
// app.$mount('#app');

// 当路由组件重用（同一路由，但是 params 或 query 已更改，例如，从 user/1 到 user/2）时，也应该调用 asyncData 函数。
Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options;
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to,
      })
        .then(next)
        .catch(next);
    } else {
      next();
    }
  },
});

// 当路由组件activated时，客户端数据预取 (Client Data Fetching)有两种方式：
// 1.在路由导航之前解析数据：
router.onReady(() => {
  // 添加路由钩子函数，用于处理 asyncData.
  // 在初始路由 resolve 后执行，
  // 以便我们不会二次预取(double-fetch)已有的数据。
  // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);

    // 我们只关心非预渲染的组件
    // 所以我们对比它们，找出两个匹配列表的差异组件
    let diffed = false;
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = prevMatched[i] !== c);
    });

    if (!activated.length) {
      return next();
    }

    // 这里如果有加载指示器 (loading indicator)，就触发

    Promise.all(
      activated.map((c) => {
        if (c.asyncData) {
          return c.asyncData({ store, route: to });
        }
      }),
    )
      .then(() => {
        // 停止加载指示器(loading indicator)

        next();
      })
      .catch(next);
  });
  // 注意这里是客户端激活， 第二个参数表示复用服务端已经渲染了的DOM
  app.$mount('#app', true);
});

// 2.匹配要渲染的视图后，再获取数据：
// Vue.mixin({
//   beforeMount() {
//     const { asyncData } = this.$options;
//     if (asyncData) {
//       // 将获取数据操作分配给 promise
//       // 以便在组件中，我们可以在数据准备就绪后
//       // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
//       this.dataPromise = asyncData({
//         store: this.$store,
//         route: this.$route,
//       });
//     }
//   },
// });
// router.onReady(() => {
//   app.$mount('#app', true);
// });
