'use strict'

const Transform = require('./transform')
const splitByTwos = require('../util/split-by-twos')

const map = new Map(splitByTwos('ぱはぴひぷふぺへぽほパハピヒプフペヘポホ'))

// Transforms half-voiced kana to their unvoiced variant.
module.exports = class HalfVoicedTransform extends Transform {

  constructor() {
    super()
    this.transformedWeight = 1
  }

  transform(c) {
    let unvoiced = map.get(c.value)
    if (unvoiced) {
      return [unvoiced, this.transformedWeight]
    }
    else {
      return undefined
    }
  }

}
