import { Component } from '../react';

export function render(vnode, container) {
  if (vnode === undefined || vnode === null || vnode === false) return;
  let dom = update(vnode);

  return container.appendChild(dom);
}

export function update(vnode) {
  let dom = vnode;
  var nodetype = typeof vnode;
  // 如果vnode是string
  if (nodetype === 'string' || nodetype === 'number' || vnode === true) {
    return document.createTextNode(vnode);
  }

  let { tag, attrs, children } = vnode;
  // 如果是组件
  let inst;
  if (typeof tag === 'function') {
    var comp = createComponent(vnode);
    return updateComponent(comp);
  }
  return _render(vnode);
}

// 创建组件
function createComponent(vnode) {
  let { tag, attrs, children } = vnode;
  // 类组件
  let inst;
  if (tag.prototype && tag.prototype.render) {
    inst = new tag(attrs);
  } else {
    // 函数组件
    inst = new Component();
    inst.constructor = tag;
    inst.render = function () {
      return tag(attrs);
    };
  }
  return inst;
}

// 更新组件
export function updateComponent(comp) {
  let vnode = comp.render();
  let base = _render(vnode);

  if (comp.base && comp.base.parentNode) {
    comp.base.parentNode.replaceChild(base, comp.base);
  }
  comp.base = base;
  return comp.base;
}

// 渲染
function _render(vnode) {
  let { tag, attrs, children } = vnode;
  let dom = document.createElement(tag);
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
  return dom;
}

export default {
  render,
  updateComponent,
};
