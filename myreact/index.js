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

const Home = function (props) {
  return (
    <div className="p1 red" style={{ fontSize: 16, background: 'blue' }} key="1" onClick={handler}>
      hello world
      <p style="border: 1px solid red">child</p>
    </div>
  );
};

// class Home extends Component {
//   render() {
//     return (
//       <div className="p1 red" style={{ fontSize: 16, background: 'blue' }} key="1" onClick={handler}>
//         hello world
//         <p style="border: 1px solid red">child</p>
//       </div>
//     );
//   }
// }

console.log(<Home />);

ReactDOM.render(<Home />, app);
