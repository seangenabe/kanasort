'use strict'

const splitByTwos = require('../util/split-by-twos')
const Transform = require('./transform')

const smallToBigMap = new Map(splitByTwos('ぁあぃいぅうぇえぉおゎわっつゃやゅゆょよァアィイゥウェエォオッツャヤュユョヨヵカヶケ'))

// Transforms small kana to their normal variants.
module.exports = class SmallToBigTransform extends Transform {

  constructor() {
    super()
    this.untransformedWeight = 0
    this.transformedWeight = -1
  }

  transform(wc) {
    let value = smallToBigMap.get(wc.value)
    if (value) {
      wc.value = value
      wc.weights.set(SmallToBigTransform, this.transformedWeight)
    }
    else {
      wc.weights.set(SmallToBigTransform, this.untransformedWeight)
    }
  }

}
