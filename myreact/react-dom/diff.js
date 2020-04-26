import { setAttribute, setComponentProps, createComponent, updateComponent } from './index';
import { unmountComponentAtNode } from 'react-dom';

export function diff(dom, vnode, container) {
  const ret = diffNode(dom, vnode);
  if (container) {
    container.appendChild(ret);
  }
  return ret;
}

export function diffNode(dom, vnode) {
  if (vnode === undefined || vnode === null || vnode === false) return;
  var nodetype = typeof vnode;
  // 如果vnode是string
  if (nodetype === 'string' || nodetype === 'number' || vnode === true) {
    if (dom && dom.nodeType === 3) {
      if (dom.textContent !== vnode) {
        dom.textContent = vnode;
      }
    } else {
      if (!dom) dom = document.createTextNode(vnode);
      else if (dom && dom.parentNode) {
        dom.parentNode.replaceChild(document.createTextNode(vnode), dom);
      }
    }
    return dom;
  }

  // 如果是组件
  if (typeof vnode.tag === 'function') {
    return diffComponent(dom, vnode);
  }

  // 如果vnode不是文本节点
  if (!dom) {
    dom = document.createElement(vnode.tag);
  }

  // 处理组件或者子节点
  if ((dom.children && dom.children.length > 0) || (vnode.children && vnode.children.length > 0)) {
    diffChildren(dom, vnode.children);
  }
  diffAttribute(dom, vnode);
  return dom;
}

function diffComponent(dom, vnode) {
  let comp = dom;
  if (comp && comp.constructor === vnode.tag) {
    setComponentProps(dom, vnode.attrs);
  } else {
    if (dom) {
      unmountComponentNode(dom);
      dom = null;
    }
    comp = createComponent(vnode);
    updateComponent(comp);
    dom = comp.base;
  }
  return dom;
}

function unmountComponentNode(dom) {
  if (dom && dom.parentNode) dom.parentNode.removeChild(dom);
}

function diffChildren(dom, vChildren) {
  const domChildren = dom.childNodes;
  const children = []; // 存放没有key的节点
  const keyed = {}; // 存放有key的节点
  // 缓存dom
  if (domChildren && domChildren.length > 0) {
    Array.from(domChildren).forEach((item) => {
      let attributes = (item.attributes && Array.from(item.attributes)) || [];
      let flag = true;
      for (var index in attributes) {
        if (attributes[index].name === 'key') {
          flag = false;
          keyed[attributes[index].value] = item;
        }
      }
      if (flag) {
        children.push(item);
      }
    });
  }
  if (vChildren && vChildren.length > 0) {
    let min = 0;
    let childrenLen = children.length;
    vChildren.forEach((vChild, i) => {
      const key = typeof vChild === 'object' && vChild.key;
      let child;
      // 如果key存在，就从keyed里面找看看有没有
      if (key) {
        if (keyed[key]) {
          child = keyed[key];
          keyed[key] = undefined; // 清理
        }
      } else if (childrenLen > min) {
        // 如果没有key则优先找类型相同的节点
        for (let i = min; i < childrenLen; i++) {
          let c = children[i];
          if (c) {
            child = c;
            children[i] = undefined;
            if (i === min) min++;
            if (i === childrenLen - 1) childrenLen--;
            break;
          }
        }
      }
      // 对比
      child = diffNode(child, vChild);
      const f = domChildren[i];
      if (child && child !== dom && child !== f) {
        // 如果更新前对应位置为空，则说明是新增节点
        if (!f) {
          dom.appendChild(child);
        } else if (child === f.nextSibling) {
          // 如果和对应位置下一个节点相同，则删除对应位置的节点
          dom.removeChild(f);
        } else {
          dom.insertBefore(child, f);
        }
      }
    });
    // 删除多余的旧的节点
    children.forEach((child) => {
      if (child !== undefined && child.parentNode) {
        child.parentNode.removeChild(child);
      }
    });
    Object.keys(keyed).forEach((key) => {
      let child = keyed[key];
      if (child !== undefined && child.parentNode) {
        child.parentNode.removeChild(child);
      }
    });
  }
}

function diffAttribute(dom, vnode) {
  let oldAttrs = {};
  let newAttrs = vnode.attrs;
  Array.from(dom.attributes).forEach((item) => {
    oldAttrs[item.name] = item.value;
  });

  // 删除不在新属性中的属性
  for (let key in oldAttrs) {
    if (!(key in newAttrs)) {
      setAttribute(dom, key, undefined);
    }
  }

  // 更新属性
  for (let key in newAttrs) {
    if (oldAttrs[key] !== newAttrs[key]) {
      setAttribute(dom, key, newAttrs[key]);
    }
  }
}
