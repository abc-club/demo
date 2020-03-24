import Vue from 'vue';

Vue.filter('capitalize', value => {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter('sum', (value, val1, val2) => {
  if (!value) return 0;
  return value + val1 + val2;
});
