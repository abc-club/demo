const target = Object.defineProperties(
  {},
  {
    foo: {
      value: 123,
      writable: true,
      configurable: false,
    },
  },
);

Object.defineProperty(target, 'foo', {
  writable: false,
});
