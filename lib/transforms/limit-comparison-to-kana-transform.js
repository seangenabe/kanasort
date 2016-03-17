'use strict'

const Transform = require('./transform')

const kana = new Set(
  'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをんゝー'
)

// Removes non-kana, non-iteration mark, non-chouon characters from the
// transformed string.
module.exports = class LimitComparisonToKanaTransform extends Transform {

  constructor() {
    super()
  }

  transform(c) {
    if (!kana.has(c.value)) {
      return [null]
    }
  }

}
