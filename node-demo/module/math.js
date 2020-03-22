const { PI } = Math;

exports.area = r => PI * r ** 2;

exports.circumference = r => 2 * PI * r;

// module.exports = class Square {
//   constructor(width) {
//     this.width = width;
//   }

//   area() {
//     return this.width ** 2;
//   }
// };
