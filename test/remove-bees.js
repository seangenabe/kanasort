'use strict'

const Transform = require('../lib/transforms/transform')

module.exports = class RemoveBees extends Transform {

  constructor() {
    super()
  }

  transform(c) {
    if (c.value === 'b') {
      return [null]
    }
  }

}
