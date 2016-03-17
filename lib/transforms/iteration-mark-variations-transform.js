'use strict'

const Transform = require('./transform')

const iterationMarks = new Set('ゝゞヽヾ')
const HIRAGANA_ITERATION_MARK = 'ゝ'

// Transforms variations of the iteration mark.
module.exports = class IterationMarkVariationsTransform extends Transform {

  constructor() {
    super()
    this.transformedWeight = -1
  }

  transform(c) {
    if (iterationMarks.has(c.value)) {
      return [HIRAGANA_ITERATION_MARK, this.transformedWeight]
    }
  }

}
