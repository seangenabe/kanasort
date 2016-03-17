'use strict'

const Transform = require('../lib/transforms/transform')

module.exports = class Rot1 extends Transform {
  constructor() { super() }
  transform(c) {
    if (c.value) {
      return [String.fromCodePoint(c.value.codePointAt(0) + 1), 7]
    }
  }
}
