// NOTE 本节知识点： 交叉类型 联合类型 类型保护 类型别名

interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

class Bird implements Bird {
  fly() {
    console.log('Bird fly');
  }
  layEggs() {
    console.log('Bird layEggs');
  }
}

class Fish implements Fish {
  swim() {
    console.log('Fish fly');
  }
  layEggs() {
    console.log('Fish layEggs');
  }
}
function getSmallPet(type: string): Fish | Bird {
  if (type === 'fish') return new Fish();
  else return new Bird();
}

let pet = getSmallPet('fish');
pet.layEggs(); // okay
pet.swim(); // errors

// 方法一
if ((<Fish>pet).swim) {
  (<Fish>pet).swim();
} else {
  (<Bird>pet).fly();
}

// 方法二： 用户自定义的类型保护
function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined;
}
if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}

// 方法三：instanceof类型保护 (也可以typeof)
if (pet instanceof Fish) {
  pet.swim();
} else {
  pet.fly();
}

// typeof类型保护
let v: number | string = 'ss';
if (typeof v === 'string') {
  console.log(v.length);
} else {
  console.log(v);
}

// 类型保护
function f(sn: string | null): string {
  if (sn == null) {
    return 'default';
  } else {
    return sn;
  }
}

function f(sn: string | null): string {
  return sn || 'default';
}

{
  // 编译器不能够去除 null或 undefined的情况
  function broken(name: string | null): string {
    function postfix(epithet: string) {
      return name.charAt(0) + '.  the ' + epithet; // error, 'name' is possibly null
    }
    name = name || 'Bob';
    return postfix('great');
  }

  function fixed(name: string | null): string {
    function postfix(epithet: string) {
      return name!.charAt(0) + '.  the ' + epithet; // ok
    }
    name = name || 'Bob';
    return postfix('great');
  }
}

// 类型别名
// 下面三个都是类型别名
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') {
    return n;
  } else {
    return n();
  }
}

interface Square {
  kind: 'square';
  size: number;
}
interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}
interface Circle {
  kind: 'circle';
  radius: number;
}
type Shape = Square | Rectangle | Circle;

function assertNever(x: never): never {
  throw new Error('Unexpected object: ' + x);
}
function area(s: Shape) {
  switch (s.kind) {
    case 'square':
      return s.size * s.size;
    case 'rectangle':
      return s.height * s.width;
    default:
      return assertNever(s); // error here if there are missing cases
  }
}

class BasicCalculator {
  public constructor(protected value: number = 0) {}
  public currentValue(): number {
    return this.value;
  }
  public add(operand: number): this {
    this.value += operand;
    return this;
  }
  public multiply(operand: number): this {
    this.value *= operand;
    return this;
  }
  // ... other operations go here ...
}

class ScientificCalculator extends BasicCalculator {
  public constructor(value = 0) {
    super(value);
  }
  public sin() {
    this.value = Math.sin(this.value);
    return this;
  }
  // ... other operations go here ...
}

let val = new ScientificCalculator(2).multiply(5).sin().add(1).currentValue();

function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map((name) => o[name]);
}

function pluck2<T, K extends keyof T>(o: T, names: K[]): K[] {
  return names.filter((name) => o[name]);
}
interface Person {
  name: string;
  age: number;
}
let person: Person = {
  name: 'Jarid',
  age: 35,
};
let stringss: string[] = pluck(person, ['name']); // ok, string[]
pluck(person, ['unknow']);

// TODO: ???keys: string|number
interface MyMap<T> {
  [key: string]: T;
}
let keys: keyof MyMap<number>; // string
let value: MyMap<number>['foo'] = 3; // number

type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

let person2: MyReadonly<Person> = {
  name: 'Jarid',
  age: 35,
};
person2.name = 'xx'; // error 不能被赋值

let person3: MyPartial<Person> = {
  name: 'Jarid',
};
let person4: MyPartial<Person> = {
  age: 35,
};
let person5: MyPartial<Person> = {
  age: 35,
  city: 'beijing', // error 多余的属性
};

// ok 这里的Person是接口
type NullablePerson = { [P in keyof Person]: Person[P] | null };
type PartialPerson = { [P in keyof Person]?: Person[P] };

class CPerson {
  name: string = '';
  age: number = 0;
}
// ok 这里的Person是类
type NullablePerson2 = { [P in keyof CPerson]: CPerson[P] | null };

type ThreeStringProps = Record<'prop1' | 'prop2' | 'prop3', string>;

let threeS: ThreeStringProps = {
  prop1: '',
  prop2: '',
  prop3: '',
};
