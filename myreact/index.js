// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import React, { Component } from './react';
import ReactDOM from './react-dom';

const app = document.getElementById('app');

function handler() {
  console.log('click');
}
// const Home = (
//   <div className="p1 red" style={{ fontSize: 16, background: 'blue' }} key="1" onClick={handler}>
//     hello world
//     <p style="border: 1px solid red">child</p>
//   </div>
// );

// console.log(Home);
// ReactDOM.render(Home, app);

// const Home = function (props) {
//   return (
//     <div className="p1 red" style={{ fontSize: 16, background: 'blue' }} key="1" onClick={handler}>
//       hello world
//       <p style="border: 1px solid red">child</p>
//     </div>
//   );
// };

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      count: [1, 2, 3, 4, 5],
    };
  }
  // static getDerivedStateFromProps() {

  // }

  addNum() {
    this.setState({
      num: this.state.num + 1,
    });
  }

  addCount() {
    let count = [...this.state.count, this.state.num];

    this.setState({
      count,
    });
  }

  delCount() {
    let count = this.state.count.slice(1);

    this.setState({
      count,
    });
  }
  render() {
    return (
      <div className="p1 red" style={{ fontSize: 16, background: 'blue' }} key="1">
        hello world
        <p style="border: 1px solid red">child</p>
        <p style="color: #ff0" onClick={this.addNum.bind(this)}>
          {this.state.num}
        </p>
        <ul>
          {this.state.count.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
        <button onClick={this.addCount.bind(this)}>addCount</button>
        <button onClick={this.delCount.bind(this)}>delCount</button>
      </div>
    );
  }
}

console.log(<Home />);

ReactDOM.render(<Home />, app);
