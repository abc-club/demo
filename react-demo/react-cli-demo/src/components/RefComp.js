import React, { Component } from 'react';

class RefChild extends Component {
  constructor(props) {
    super(props);
    this.blueInput = React.createRef();
  }
  componentDidMount() {
    // this.blueInput.current.focus();
  }
  focus() {
    this.blueInput.current.focus();
  }
  render() {
    return <input ref={this.blueInput} type="text" style={{ background: 'blue' }} />;
  }
}

class Ref1Child extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // this.blueInput.current.focus();
  }

  render() {
    return <input ref={this.props.ref1} type="text" style={{ background: 'green' }} />;
  }
}

function RefFun(props) {
  return <input ref={props.ref1} type="text" style={{ background: 'orange' }} />;
}

export default class RefComp extends Component {
  constructor(props) {
    super(props);
    this.redInput = React.createRef();
    this.blueInput = React.createRef();
    this.greenInput = React.createRef();
    this.orangeInput = React.createRef();
  }

  componentDidMount() {
    console.log(this.cbRef);
    // this.redInput.current.focus();
    // this.blueInput.current.focus();
    // this.greenInput.current.focus();
    // this.orangeInput.current.focus();
    this.cbRef.focus();
  }

  render() {
    return (
      <div>
        <input ref={this.redInput} type="text" style={{ background: 'red' }} />
        <RefChild ref={this.blueInput} />
        <Ref1Child ref1={this.greenInput} />
        <RefFun ref1={this.orangeInput} />
        <input type="text" ref={(el) => (this.cbRef = el)} style={{ background: '#ff0' }} />
      </div>
    );
  }
}
