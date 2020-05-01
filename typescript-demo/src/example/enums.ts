enum Direction {
  UP,
  RIGHT,
  DOWN,
  LEFT,
}
// 等价于
// var Direction;
// (function (Direction) {
//   Direction[(Direction['UP'] = 0)] = 'UP';
//   Direction[(Direction['RIGHT'] = 1)] = 'RIGHT';
//   Direction[(Direction['DOWN'] = 2)] = 'DOWN';
//   Direction[(Direction['LEFT'] = 3)] = 'LEFT';
// })(Direction || (Direction = {}));

enum Direction2 {
  UP = f(),
  RIGHT,
  DOWN,
  LEFT,
}
enum Direction3 {
  RIGHT,
  DOWN,
  LEFT,
  UP = f(),
}
function f() {
  return 3;
}

enum Direction4 {
  UP = 'UP',
  RIGHT,
  DOWN,
  LEFT,
}
enum Direction5 {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}
enum Direction6 {
  Up = 'UP',
  Down = 0,
}

enum Direction7 {
  Down,
  Up = 'UP',
}

// number和enum互相兼容，不同类型的enum不兼容
{
  enum Status {
    Ready,
    Waiting,
  }
  enum Color {
    Red,
    Blue,
    Green,
  }
  let statuss = Status.Ready;
  statuss = Color.Green; // Error
  statuss = 1;
  statuss = Status.Waiting;
  let a: number = Status.Ready;
}
