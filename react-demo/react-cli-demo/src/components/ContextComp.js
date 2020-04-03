import React, { Component } from 'react';

const ThemeContext = React.createContext('light');
ThemeContext.displayName = 'MyDisplayName'; // 设置名字

class ContextParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'dark',
    };
  }

  handler() {
    let { theme } = this.state;
    this.setState({
      theme: theme === 'dark' ? 'red' : 'dark',
    });
  }

  // shouldComponentUpdate() {
  //   return false;
  // }

  render() {
    return (
      <div>
        <button onClick={this.handler.bind(this)}>change</button>
        {/* <ContextMid /> */}
        <ThemeContext.Provider value={this.state.theme}>
          <ContextMid />
        </ThemeContext.Provider>
      </div>
    );
  }
}

function ContextMid() {
  return (
    <div>
      <ContextChild />
      {/* <ContextChild2 /> */}
    </div>
  );
}

class ContextChild extends Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  constructor(props) {
    super(props);
    this.state = {
      theme: 'dark',
    };
  }

  handler() {
    let { theme } = this.state;
    this.setState({
      theme: theme === 'dark' ? 'red' : 'dark',
    });
  }
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div>
        <button onClick={this.handler.bind(this)}>change</button>
        <p>自身的theme:{this.state.theme}</p>
        <p>context的theme:{this.context}</p>
      </div>
    );
  }
}

function ContextChild2() {
  return <ThemeContext.Consumer>{value => <p>{value}</p>}</ThemeContext.Consumer>;
}

export default ContextParent;
