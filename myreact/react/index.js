export function createElement(tag, attrs, ...children) {
  return {
    tag,
    attrs,
    children,
  };
}

export class Component {}

export default {
  createElement,
  Component,
};
