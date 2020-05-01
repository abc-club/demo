interface Box {
  height: number;
  width: number;
  clone(animal: Animal): Animal;
}

interface Box {
  height: string;
  scale: number;
}

let box: Box = { height: 5, width: 6, scale: 10 };
