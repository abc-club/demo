import Vue from 'vue';

function printBinding(el, binding, vnode) {
  const s = JSON.stringify;
  el.innerHTML =
    'name: ' +
    s(binding.name) +
    '<br>' +
    'value: ' +
    s(binding.value) +
    '<br>' +
    'expression: ' +
    s(binding.expression) +
    '<br>' +
    'argument: ' +
    s(binding.arg) +
    '<br>' +
    'modifiers: ' +
    s(binding.modifiers) +
    '<br>' +
    'vnode keys: ' +
    Object.keys(vnode).join(', ');
}

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted(el) {
    // 聚焦元素
    el.focus();
  },
});

Vue.directive('demo', {
  bind: printBinding,
  update: printBinding,
});

Vue.directive('tack', {
  bind(el, binding, vnode) {
    printBinding(el, binding, vnode);
    el.style.position = 'fixed';
    const s = binding.arg === 'left' ? 'left' : 'top';
    el.style[s] = binding.value + 'px';
  },
});

// 在 bind 和 update 时触发相同行为
Vue.directive('color-swatch', (el, binding) => {
  el.style.backgroundColor = binding.value;
});
