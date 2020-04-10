import React, { useState, useEffect, useContext, useReducer, useRef } from 'react';
import { ThemeContext, themes } from '../../context';

const initialState = { count: 1 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

export default function Counter() {
  let theme = useContext(ThemeContext);
  let [count, setCount] = useState(0);
  let [obj, setObj] = useState({
    a: 1,
    b: {
      c: 1,
      d: 1,
    },
  });
  let [arr, setArr] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputElm = useRef(null);
  const inputRef = React.createRef();
  const inputRef1 = React.createRef();
  const inputElm1 = useRef(inputRef1);
  // 不行 不能有副作用
  // const [state, setState] = useState(async () => {
  //   const initialState = await new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(1);
  //     }, 1000);
  //   });
  //   console.log('initialState');
  //   console.log(initialState);
  //   return initialState;
  // });

  // 这里的x不是响应式的
  let x = 1;
  // this为undefined
  console.log(this);
  // this.y = 1;
  console.log('被执行了');
  // document.title = `You clicked ${count} times`;

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    console.log('useEffect');

    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${arr} times`;
  }, [obj]);

  function change() {
    setCount(++count);
    // 这样处理是不对的，obj地址并未改变
    obj.b.c = 2;
    setObj(obj);
    // setObj({ ...obj, a: obj.a + 1, b: { ...obj.b, c: 2 }, e: obj.e ? obj.e + 1 : 1 });
    x = 2;
    if (arr.length < 4) setArr([...arr, arr.length]);
    // this.y = 2;
  }

  const [c, setC] = useState(1);
  function changeRef() {
    setC(c + 1);
    inputRef.current.focus();
  }

  return (
    <>
      <div style={theme}>theme</div>
      <button onClick={change}>click me {count}</button>
      Count: {count}
      <button onClick={() => setCount(1)}>Reset</button>
      {/* 这里也可以接收函数，第一个参数是之前的状态 */}
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>-</button>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>
      <div>{JSON.stringify(obj)}</div>
      <div>{x}</div>
      State: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>decrement</button>
      <input ref={c % 2 === 0 ? inputElm : inputRef} type="text" />
      <input ref={c % 2 === 1 ? inputElm : inputRef} type="text" />
      <button onClick={changeRef}>focus</button>
      <input ref={inputRef1} type="text" />
      <button
        onClick={() => {
          console.log(inputElm1);
          inputElm1.current.current.focus();
        }}
      >
        focus
      </button>
      {/* <button onClick={() => inputRef.current.focus()}>focus</button> */}
      {/* <div>{state}</div> */}
      {/* <div>{this.y}</div> */}
    </>
  );
}

function ChildComp(props) {}
