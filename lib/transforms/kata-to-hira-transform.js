'use strict'

const Transform = require('./transform')

const HIRA_START = require('../util/hiragana-block').HIRA_START
const KATA_START = require('../util/katakana-block').KATA_START
// The katakana block and the corresponding hiragana block must have
// one-to-one correspondence.
const KATA_END = 0x30f4 // 'ヴ'.codePointAt(0)

// Transforms katakana into hiragana.
module.exports = class KataToHiraTransform extends Transform {

  constructor() {
    super()
    this.transformedWeight = 1
  }

  transform(c) {
    if (!c.value) { return }

    let codePoint = c.value.codePointAt(0)
    if (KATA_START <= codePoint && codePoint <= KATA_END) {
      return [
        String.fromCodePoint(codePoint - KATA_START + HIRA_START),
        this.transformedWeight
      ]
    }    
  }

}
