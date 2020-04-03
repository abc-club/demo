import React, { Component } from 'react';

export default class LazyComponent extends Component {
  handler() {
    throw new Error('error');
  }
  render() {
    return <div>aaaa Loading......</div>;
  }
}
