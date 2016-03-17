'use strict'

const Transform = require('./transform')
const isKana = require('../util/is-kana')

const HIRAGANA_ITERATION_MARK = 'ゝ'

// Transforms the iteration mark to the corresponding sound.
module.exports = class IterationMarkTransform extends Transform {

  constructor() {
    super()
    this.transformedWeight = -1
  }

  transform(c) {
    let ret
    if (c.value === HIRAGANA_ITERATION_MARK &&
      this.prevChar &&
      isKana(this.prevChar)) {

      ret = [this.prevChar, this.transformedWeight]
    }
    if (c.value) {
      this.prevChar = c.value
    }
    return ret
  }

}
