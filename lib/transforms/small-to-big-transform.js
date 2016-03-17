'use strict'

const splitByTwos = require('../util/split-by-twos')
const Transform = require('./transform')

const smallToBigMap = new Map(splitByTwos('ぁあぃいぅうぇえぉおゎわっつゃやゅゆょよァアィイゥウェエォオッツャヤュユョヨヵカヶケ'))

// Transforms small kana to their normal variants.
module.exports = class SmallToBigTransform extends Transform {

  constructor() {
    super()
    this.transformedWeight = -1
  }

  transform(c) {
    let small = smallToBigMap.get(c.value)
    if (small) {
      return [small, this.transformedWeight]
    }
  }

}
