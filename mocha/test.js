var assert = require('assert')
var add = require('./add.js');

describe('Array', function() {
  describe('加法函数的测试', function() {
    it('1 加 1 应该等于 2', function() {
      assert.equal(2, add(1,1))
    })
  })
})
