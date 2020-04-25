for (let i = 0; i < 10; i++) {
  console.log('outer', i);
  for (let i = 0; i < 10; i++) {
    console.log('inner', i);
  }
}
