{
  function identity<T>(arg: T): T {
    return arg;
  }

  let output = identity<string>('myString'); // type of output will be 'string'
  // 利用了类型推论
  let output2 = identity('myString'); // type of output will be 'string'
}

// 泛型接口
{
  function f<T>(arg: T[]): T[] {
    return arg;
  }

  let f1: <T>(arg: T[]) => T[] = f;
  // 注意这里是对象字面量:
  let f2: { <T>(arg: T[]): T[] } = f;

  interface IFF {
    <T>(arg: T[]): T[];
  }
  let f3: IFF = f;

  interface IFT<T> {
    (arg: T[]): T[];
  }
  let f4: IFT<string> = f;
  let f5: IFT<number> = f;
}

// 泛型约束
{
  interface Lengthwise {
    length: number;
  }

  function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length); // Now we know it has a .length property, so no more error
    return arg;
  }
  loggingIdentity(3); // Error, number doesn't have a .length property
  loggingIdentity({ length: 10, value: 3 });
}

// TODO:TK是什么，怎么没报错
{
  function getProperty(obj: T, key: K) {
    return obj[key];
  }

  let x = { a: 1, b: 2, c: 3, d: 4 };

  getProperty(x, 'a'); // okay
  getProperty(x, 'm'); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
}

{
  class BeeKeeper {
    hasMask: boolean;
  }

  class ZooKeeper {
    nametag: string;
  }

  class Animal {
    numLegs: number;
  }

  class Bee extends Animal {
    keeper: BeeKeeper;
  }

  class Lion extends Animal {
    keeper: ZooKeeper;
  }

  function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
  }

  createInstance(Lion).keeper.nametag; // typechecks!
  createInstance(Bee).keeper.hasMask; // typechecks!
}
