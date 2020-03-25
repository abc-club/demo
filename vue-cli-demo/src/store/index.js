import Vue from 'vue';
import Vuex from 'vuex';
import { ADDARR } from './mutation-types';

Vue.use(Vuex);

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
  actions: {
    incrementAsync(context, payload) {
      setTimeout(() => {
        context.commit('increment', payload);
      }, 1000);
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
  },
  modules: {},
});
