import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './directives';
import './filters';

Vue.config.productionTip = false;

// store.commit('increment', {
//   amount: 2,
// });

store.commit({
  type: 'increment',
  amount: 3,
});

console.log(store.state.count);

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    // You'll need this for renderAfterDocumentEvent.
    document.dispatchEvent(new Event('render-event'));
  },
}).$mount('#app');
