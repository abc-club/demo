import { updateComponent } from '../react-dom';

export function createElement(tag, attrs, ...children) {
  return {
    tag,
    attrs,
    children,
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
