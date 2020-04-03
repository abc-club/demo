import React, { Component } from 'react';

class Fragments extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      // <React.Fragment>
      //   <p>1</p>
      //   <p>2</p>
      //   <p>3</p>
      // </React.Fragment>
      <>
        <p>1</p>
        <p>2</p>
        <p>3</p>
      </>
    );
  }
}

export default Fragments;
