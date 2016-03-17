'use strict'

const KATA_START = 0x30a1 // 'ァ'.codePointAt(0)
const KATA_END = 0x30fa // 'ヺ'.codePointAt(0)

module.exports = function isKatakana(char) {
  var codePoint = char.codePointAt(0)
  return KATA_START <= codePoint && codePoint <= KATA_END
}

module.exports.KATA_START = KATA_START
module.exports.KATA_END = KATA_END
