'use strict'

const Transform = require('./transform')
const first = require('../util/first')

const map = new Map((function*() {
  let groups = [
    'あかさなたはまやらわ',
    'いきしにちひみりゐ',
    'うくすぬつふむゆる',
    'えけせねてへめれゑ',
    'おこそとのほもよろを',
    'ん',
    'アカサナタハマヤラワ',
    'イキシニチヒミリヰ',
    'ウクスヌツフムユル',
    'エケセネテヘメレヱ',
    'オコソトノホモヨロヲ',
    'ン'
  ]
  for (let group of groups) {
    let rep = first(group)
    for (let element of group) {
      yield [element, rep]
    }
  }
})())

const CHOUON = 'ー'

// Transforms the katakana-hiragana prolonged sound mark (長音符) to the
// corresponding sound.
module.exports = class LongSoundMarkTransform extends Transform {

  constructor() {
    super()
    this.transformedWeight = -1
  }

  transform(c) {
    let ret
    let prevChar = this.prevChar
    if (c.value === CHOUON && prevChar) {
      let columnSound = map.get(prevChar)
      if (columnSound) {
        ret = [columnSound, this.transformedWeight]
      }
    }
    if (c.value) {
      this.prevChar = c.value
    }
    return ret
  }

} // class LongSoundMarkTransform
