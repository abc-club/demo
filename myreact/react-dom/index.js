import { Component } from '../react';
import { diff, diffNode } from './diff';

export function render(vnode, container, dom) {
  diff(dom, vnode, container);
  // return container.appendChild(_render(vnode));
}

export function _render(vnode) {
  if (vnode === undefined || vnode === null || vnode === false) return;
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
  return updateAttribute(vnode);
}

// 创建组件
export function createComponent(vnode) {
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
  // let base = updateAttribute(vnode);
  let base = diffNode(comp.base, vnode);
  // if (comp.base && comp.base.parentNode) {
  //   comp.base.parentNode.replaceChild(base, comp.base);
  // }
  comp.base = base;
  return comp.base;
}

// 渲染
function updateAttribute(vnode) {
  let { tag, attrs, children } = vnode;
  let dom = document.createElement(tag);
  setComponentProps(dom, attrs);

  // 处理子节点
  if (children && children.length > 0) {
    for (var i = 0; i < children.length; i++) {
      render(children[i], dom);
    }
  }
  return dom;
}

export function setComponentProps(dom, attrs) {
  // 处理attrs
  for (var key in attrs) {
    setAttribute(dom, key, attrs[key]);
  }
}

// 处理attribute
export function setAttribute(dom, key, value) {
  if (key === 'className') {
    dom.setAttribute('class', value);
  } else if (/^on\w+/.test(key)) {
    // 处理事件
    dom[key.toLowerCase()] = value;
  } else if (key === 'style') {
    if (typeof value === 'string') {
      dom.style.cssText = value;
    } else {
      for (var ke in value) {
        if (typeof value[ke] === 'number') dom.style[ke] = value[ke] + 'px';
        else dom.style[ke] = value[ke];
      }
    }
  } else {
    dom.setAttribute(key, value);
  }
}

export default {
  render,
  updateComponent,
};
