import { updateComponent } from '../react-dom';

export function createElement(tag, attrs, ...children) {
  return {
    tag,
    attrs,
    children: children.flat(Infinity), // 这里可能有[[1,2,3],4,5]的情况，变换后[1,2,3,4,5]
    key: (attrs && attrs.key) || null,
  };
}

export class Component {
  constructor(props) {
    this.props = props;
    this.state = {};
  }
  setState(changedState) {
    this.state = Object.assign(this.state, changedState);
    updateComponent(this);
  }
}

export default {
  createElement,
  Component,
};
