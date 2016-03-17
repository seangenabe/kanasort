'use strict'

/** The code point of hiragana A */
const HIRA_START = 0x3041 // 'ぁ'.codePointAt(0)

/** The code point of hiragana VU */
const HIRA_END = 0x3094 // 'ゔ'.codePointAt(0)

/**
* Returns whether the specified character is hiragana.
*/
module.exports = function isHiragana(char) {
  var codePoint = char.codePointAt(0)
  return HIRA_START <= codePoint && codePoint <= HIRA_END
}

module.exports.HIRA_START = HIRA_START
module.exports.HIRA_END = HIRA_END
