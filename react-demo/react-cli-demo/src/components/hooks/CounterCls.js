import React, { Component } from 'react';

class CounterCls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      obj: {
        a: 1,
        b: {
          c: 1,
          d: 1,
        },
      },
    };
  }

  static getDerivedStateFromProps(props, state) {
    console.log(props, state);
    if (state.count === 3) {
      return {
        count: 10,
      };
    }
    return null;
  }

  componentDidMount() {
    console.log('componentDidMount');
    // document.title = `You clicked ${this.state.count} times`;
  }

  getSnapshotBeforeUpdate(preProps, preState) {
    return null;
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
    // document.title = `You clicked ${this.state.count} times`;
  }

  change() {
    let { count, obj } = this.state;

    this.setState({
      count: count + 1,
      obj: { ...obj, a: obj.a + 1, b: { ...obj.b, c: 2 }, e: obj.e ? obj.e + 1 : 1 },
    });
  }

  render() {
    let { count, obj } = this.state;
    // document.title = `You clicked ${this.state.count} times`;
    return (
      <>
        <button onClick={this.change.bind(this)}>click me {count}</button>
        <div>{JSON.stringify(obj)}</div>
      </>
    );
  }
}

export default CounterCls;
