import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import { ADDARR } from './mutation-types';
import moduleA from './modules/moduleA';
import moduleB from './modules/moduleB';
import plugin from './plugins';

Vue.use(Vuex);

export const actions = {
  incrementAsync(context, payload) {
    context.commit('addProps');
    // setTimeout(() => {
    //   context.commit('increment', payload);
    // }, 1000);
  },
  actionA(context) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        context.commit(ADDARR);
        resolve(context.state.arr);
      }, 1000);
    });
  },
  async actionB(context) {
    await context.dispatch('actionA');
    context.commit('increment', {
      amount: 1,
    });
  },
};

export default new Vuex.Store({
  state: {
    count: 0,
    obj: {
      a: 1,
    },
    arr: [0, 1],
  },
  mutations: {
    increment(state, payload) {
      console.log('11111');
      state.count += payload.amount;
    },
    addProps(state) {
      state.obj = { ...state.obj, newProp: 123 };
    },
    [ADDARR](state) {
      state.arr.push(state.arr.length);
    },
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
    doubleAddOne(state, getters) {
      return getters.doubleCount + 1;
    },
    // 传参示例
    sum(state) {
      return num => state.count + num;
    },
  },
  actions,
  modules: {
    a: moduleA,
    b: moduleB,
  },
  plugins: process.env.NODE_ENV !== 'production' ? [plugin, createLogger()] : [],
  strict: process.env.NODE_ENV !== 'production',
});

// TODO: 为什么没有热重载
if (module.hot) {
  // 使 action 和 mutation 成为可热重载模块
  module.hot.accept(['./modules/moduleA'], () => {
    // 获取更新后的模块
    // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
    // const newMutations = require('./mutations').default
    const newModuleA = require('./modules/moduleA');
    // 加载新模块
    store.hotUpdate({
      // mutations: newMutations,
      modules: {
        a: newModuleA,
      },
    });
  });
}
