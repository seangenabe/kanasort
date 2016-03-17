'use strict'

const Transform = require('./transform')
const isKana = require('../util/is-kana')

const HIRAGANA_ITERATION_MARK = 'ゝ'

// Transforms the iteration mark to the corresponding sound.
module.exports = class IterationMarkTransform extends Transform {

  constructor() {
    super()
    this.untransformedWeight = 0
    this.transformedWeight = -1
  }

  transform(wc) {
    console.log(wc)
    if (wc.value === HIRAGANA_ITERATION_MARK &&
      this.prevChar &&
      isKana(this.prevChar)) {

      wc.value = this.prevChar
      wc.weights.set(IterationMarkTransform, this.transformedWeight)
      console.log()
    }
    else {
      wc.weights.set(IterationMarkTransform, this.untransformedWeight)
    }
    if (wc.value) {
      this.prevChar = wc.value
    }
  }

}
