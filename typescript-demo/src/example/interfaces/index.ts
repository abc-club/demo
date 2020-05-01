{
  let a: number[] = [1, 2, 3, 4];
  let ro: ReadonlyArray<number> = a;
  ro[0] = 12; // error!
  ro.push(5); // error!
  ro.length = 100; // error!
  a = ro; // error!

  a = ro as number[];

  a = <number[]>ro;

  let num: Readonly<number> = 1;
  let obj: Readonly<object> = {
    x: 1,
  };
}

/////////////////////

{
  interface LabelledValue {
    label: string;
  }

  function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
  }

  printLabel({ size: 10, label: 'Size 10 Object' }); // Argument of type '{ size: number; label: string; }' is not assignable to parameter of type 'LabelledValue'.

  // 解决办法一：
  let myObj = { size: 10, label: 'Size 10 Object' };
  printLabel(myObj); // ok

  // 解决办法二：
  let mySquare = printLabel({ size: 10, label: 'Size 10 Object' } as LabelledValue); //ok

  // 解决办法三：
  interface LabelledValue {
    label: string;
    [propName: string]: any;
  }
  printLabel({ size: 10, label: 'Size 10 Object' }); // ok
}

{
  interface SearchFunc {
    (source: string, subString: string): boolean;
  }

  let mySearch: SearchFunc;
  mySearch = function (source: string, subString: string): boolean {
    let result = source.search(subString);
    return result > -1;
  };

  mySearch = function (src, sub) {
    let result = src.search(sub);
    return result > -1;
  };

  mySearch('', '');
}

{
  class Animal {
    name: string = '';
  }
  class Dog extends Animal {
    breed: string = '';
  }

  // 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
  interface NotOkay {
    [x: number]: Animal;
    [x: string]: Dog;
  }

  // 正确
  interface Okay {
    [x: number]: Dog;
    [x: string]: Animal;
  }
}

{
  interface ReadonlyStringArray {
    readonly [index: number]: string;
  }
  let myArray: ReadonlyStringArray = ['Alice', 'Bob'];
  myArray[2] = 'Mallory'; // error!
  myArray[1] = 'Mallory'; // error!
  myArray[2];
  myArray[1];
}

{
  interface ClockInterface {
    currentTime: Date;
    setTime(d: Date): void;
  }

  class Clock implements ClockInterface {
    currentTime: Date = new Date();
    constructor(h: number, m: number) {}
    setTime(d: Date) {
      this.currentTime = d;
    }
  }
}

// 构造函数
{
  class Clock {
    h: number;
    constructor(h: number) {
      this.h = h;
    }
    getHour() {
      return this.h;
    }
  }

  console.log(Clock);
  console.log(Clock.constructor);

  let c = new Clock(10);
  console.log(c);

  console.log((c as any).__proto__ === Clock.prototype);
}

// 如何定义一个方法，此方法含有静态属性的示例
{
  interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
  }

  function getCounter(): Counter {
    let counter = <Counter>function (start: number) {
      return '';
    };
    counter.interval = 123;
    counter.reset = function () {};
    return counter;
  }

  let c = getCounter();
  c(10);
  c.reset();
  c.interval = 5.0;
}
