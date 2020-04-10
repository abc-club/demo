import React, { useState, useEffect } from 'react';

export default function Counter() {
  let [count, setCount] = useState(0);
  let [obj, setObj] = useState({
    a: 1,
    b: {
      c: 1,
      d: 1,
    },
  });

  console.log('被执行了');
  // document.title = `You clicked ${count} times`;

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    console.log('useEffect');

    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
  });

  function change() {
    setCount(++count);
    setObj({ ...obj, a: obj.a + 1, b: { ...obj.b, c: 2 }, e: obj.e ? obj.e + 1 : 1 });
  }

  return (
    <>
      <button onClick={change}>click me {count}</button>
      <div>{JSON.stringify(obj)}</div>
    </>
  );
}
