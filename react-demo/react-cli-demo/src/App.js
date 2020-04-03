import React, { Suspense, Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
// import Loading from './components/Loading';
import BuggyCounter from './components/BuggyCounter';
// const LazyComponent = React.lazy(() => import('./components/Lazy'));
import ContextComp from './components/ContextComp';
import ForwardRef from './components/ForwardRef';
import Fragments from './components/Fragments';

const ref = React.createRef();

// function App() {

//   return (
//     <div className="App">
//       {/* <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
//           Learn React
//         </a>
//       </header> */}
//       {/* <ErrorBoundary>
//         <BuggyCounter />
//       </ErrorBoundary> */}
//       <ContextComp />
//       <FancyButton ref={ref} />
//     </div>
//   );
// }

class App extends Component {
  componentDidMount() {
    console.log(ref);
  }
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </header> */}
        {/* <ErrorBoundary>
          <BuggyCounter />
        </ErrorBoundary> */}
        <ContextComp />
        <ForwardRef ref={ref} />
        <Fragments />
      </div>
    );
  }
}

export default App;
