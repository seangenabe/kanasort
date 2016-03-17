'use strict'

const isHiragana = require('./hiragana-block')
const isKatakana = require('./katakana-block')

module.exports = function isKana(char) {
  return isHiragana(char) || isKatakana(char)
}
