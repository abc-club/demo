import React, { Component } from 'react';

class C2 extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    console.log('C2');
    return (
      <div>
        <C4 />
        <C5 />
      </div>
    );
  }
}

class C3 extends Component {
  // shouldComponentUpdate() {
  //   return false;
  // }
  constructor(props) {
    super(props);
    this.state = {
      a: 'c3',
    };
  }

  changeA() {
    this.setState({
      a: this.state.a + '3',
    });
  }

  render() {
    console.log('C3');
    return (
      <div onClick={this.changeA.bind(this)}>
        {this.state.a}
        <C6 a={this.state.a} />
        <C7 />
        <C8 />
      </div>
    );
  }
}

class C4 extends Component {
  // shouldComponentUpdate() {
  //   return false
  // }

  render() {
    console.log('C4');
    return <div>c4</div>;
  }
}

class C5 extends Component {
  // shouldComponentUpdate() {
  //   return false
  // }

  render() {
    console.log('C5');
    return <div>c5</div>;
  }
}

class C6 extends Component {
  shouldComponentUpdate() {
    return false;
  }
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     a: 'c6',
  //   };
  // }

  // changeA() {
  //   this.setState({
  //     a: this.state.a + '6',
  //   });
  // }

  render() {
    console.log('C6');
    return <div>{this.props.a}</div>;
    // return <div onClick={this.changeA.bind(this)}>{this.state.a}</div>;
  }
}

class C7 extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    console.log('C7');
    return <div>c7</div>;
  }
}

class C8 extends Component {
  // shouldComponentUpdate() {
  //   return false
  // }

  render() {
    console.log('C8');
    return <div>c8</div>;
  }
}

class SCU extends Component {
  shouldComponentUpdate() {}

  render() {
    return (
      <div>
        <C2 />
        <C3 />
      </div>
    );
  }
}

export default SCU;
