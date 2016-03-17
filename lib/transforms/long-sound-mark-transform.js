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
    this.untransformedWeight = 0
    this.transformedWeight = -1
  }

  transform(wc) {
    let prevChar = this.prevChar
    let weight = this.untransformedWeight
    if (wc.value === CHOUON && prevChar) {
      let columnSound = map.get(prevChar)
      if (columnSound) {
        weight = this.transformedWeight
        wc.value = columnSound
      }
    }
    wc.weights.set(LongSoundMarkTransform, weight)
  }

} // class LongSoundMarkTransform
