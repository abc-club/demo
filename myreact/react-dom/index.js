// import { Component } from '../react';

function render(vnode, container) {
  if (!vnode) return;
  let dom = vnode;

  // 如果vnode是string
  if (typeof vnode === 'string') {
    return container.appendChild(document.createTextNode(vnode));
  }

  let { tag, attrs, children } = vnode;
  // 如果是组件
  if (typeof tag === 'function') {
    // 类组件
    if (tag.prototype && tag.prototype.render) {
      let comp = new tag(attrs);
      vnode = comp.render();
    } else {
      // 函数组件
      vnode = tag(attrs);
    }
  }

  // 这里vnode会更新
  ({ tag, attrs, children } = vnode);
  dom = document.createElement(tag);
  // 处理attrs
  for (var k in attrs) {
    if (k === 'className') {
      dom.setAttribute('class', attrs[k]);
    } else if (/^on\w+/.test(k)) {
      // 处理事件
      dom[k.toLowerCase()] = attrs[k];
    } else if (k === 'style') {
      if (typeof attrs[k] === 'string') {
        dom.style.cssText = attrs[k];
      } else {
        for (var ke in attrs[k]) {
          if (typeof attrs[k][ke] === 'number') dom.style[ke] = attrs[k][ke] + 'px';
          else dom.style[ke] = attrs[k][ke];
        }
      }
    } else {
      dom.setAttribute(k, attrs[k]);
    }
  }

  // 处理子节点
  if (children && children.length > 0) {
    for (var i = 0; i < children.length; i++) {
      render(children[i], dom);
    }
  }
  return container.appendChild(dom);
}

export default {
  render,
};
