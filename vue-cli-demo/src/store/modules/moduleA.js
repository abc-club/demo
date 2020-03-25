import { ADDARR } from '../mutation-types';

export default {
  state: {
    count: 0,
    obj: {
      a: 1,
    },
    arr: [0, 1],
  },
  mutations: {
    increment(state, payload) {
      console.log('222');
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
    // doubleCount(state) {
    //   return state.count * 2;
    // },
    sumWithRootCount(state, getters, rootState) {
      return state.count + rootState.count;
    },
  },
  actions: {
    incrementIfOddOnRootSum({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment');
      }
    },
  },
  modules: {},
};
