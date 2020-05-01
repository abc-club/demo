// TODO: 没有提供用函数定义类的类型定义？？？
// 怎么把this指向构造函数？？？
function F(this: any) {
  this.a = 1;
}

{
  // 函数定义的方法
  // 第一种
  function f(a: number, b: number): number {
    return a + b;
  }
  function f2(a: number, b: number) {
    return a + b;
  }

  // 第二种
  let f3 = function (a: number, b: number): number {
    return a + b;
  };
  let f4 = function (a: number, b: number) {
    return a + b;
  };

  // 第三种
  let f5: (a: number, b: number) => number = function (a: number, b: number): number {
    return a + b;
  };
  // let f6:(a:number,b:number)=>number = function (a,b:number):number{
  //   return a+b
  // }
  // let f6:(a:number,b:number)=>number = function (a,b):number{
  //   return a+b
  // }
  let f6: (a: number, b: number) => number = function (a, b) {
    return a + b;
  };

  // 第四种
  interface IF7 {
    (a: number, b: number): number;
  }
  let f7: IF7 = function (a: number, b: number): number {
    return a + b;
  };
}

{
  // 改变this
  class Handler {
    info: number = 0;
    // NOTE 这里this编译后不会保存了
    onClickBad(this: Handler, e: MouseEvent) {
      // oops, used this here. using this callback would crash at runtime
      this.info = e.clientX;
    }
  }
  let h = new Handler();
}

// 函数重载
let suits = ['hearts', 'spades', 'clubs', 'diamonds'];
function pickCard(x: { suit: string; card: number }[]): number;
function pickCard(x: number): { suit: string; card: number };

function pickCard(x: any): any {
  // Check to see if we're working with an object/array
  // if so, they gave us the deck and we'll pick the card
  if (typeof x == 'object') {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  }
  // Otherwise just let them pick the card
  else if (typeof x == 'number') {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}

let myDeck = [
  { suit: 'diamonds', card: 2 },
  { suit: 'spades', card: 10 },
  { suit: 'hearts', card: 4 },
];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert('card: ' + pickedCard1.card + ' of ' + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert('card: ' + pickedCard2.card + ' of ' + pickedCard2.suit);

let pickedCard3 = pickCard('');
