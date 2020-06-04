import React, { useState, useEffect, useContext, useReducer, useRef, useCallback, useMemo, useImperativeHandle,useLayoutEffect, } from 'react';
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

function Counter(props, ref) {
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

  // 在componentDidMount 和 componentDidUpdate之前执行
  useLayoutEffect(() => {
    console.log('useLayoutEffect：在componentDidMount 和 componentDidUpdate之前执行');
  }, [obj]);
  // 在componentDidMount 和 componentDidUpdate之后执行
  useEffect(() => {
    console.log('useEffect：在componentDidMount 和 componentDidUpdate之后执行');

    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${arr} times`;
  }, [obj]);
  

  function change() {
    setCount(++count);
    // 这样处理是不对的，obj地址并未改变
    // obj.b.c = 2;
    // setObj(obj);
    setObj({ ...obj, a: obj.a + 1, b: { ...obj.b, c: 2 }, e: obj.e ? obj.e + 1 : 1 });
    x = 2;
    if (arr.length < 4) setArr([...arr, arr.length]);
    // this.y = 2;
  }

  const [c, setC] = useState(1);
  function changeRef() {
    setC(c + 1);
    inputRef.current.focus();
  }


  const inputRef2 = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef2.current.focus();
    }
  }));

  const [name, setName] = useState('名称')
  const [content,setContent] = useState('内容')

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
      <input ref={inputRef2} type="text" />
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
      <hr/>
      <button onClick={() => setName(new Date().getTime())}>name</button>
      <button onClick={() => setContent(new Date().getTime())}>content</button>
      <ChildComp name={name}>{content}</ChildComp>
    </>
  );
}

export default React.forwardRef(Counter)
function ChildComp({name, children}) {
  const [count, setCount] = useState(1);

  // 我们希望只在count改变时才执行
  const getNum = useCallback(() => {
    console.log('useCallback')
    return Array.from({length: count * 100}, (v, i) => i).reduce((a, b) => a+b)
  }, [count])
  // 我们希望只在name改变时才执行
  function changeName(name) {
    console.log('11')
    return name + '改变name的方法'
  }

  // 参考https://www.cnblogs.com/jianxian/p/12533264.html
  const otherName =  useMemo(()=>changeName(name),[name])
  return (
      <>
        <div>{otherName}</div>
        <div>{children}</div>
        <button onClick={() => setCount(count + 1)}>+1</button>
        <Child getNum={getNum} />
      </>

  )
}

const Child = React.memo(function ({ getNum }) {
  return <h4>总和：{getNum()}</h4>
})
