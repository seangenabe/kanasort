'use strict'

const Transform = require('./transform')
const splitByTwos = require('../util/split-by-twos')

const voicedMap = new Map(splitByTwos(
  'ゔうがかぎきぐくげけごこざさじしずすぜせぞそだたぢちづつでてどとばはびひぶふべへぼほヴウガカキキククゲケゴコザサジシズスゼセゾソダタヂチヅツデテドトバハビヒブフベヘボホヷワヸヰヹヱヺヲ'
))

// Transforms voiced kana to their voiced variant.
module.exports = class VoicedTransform extends Transform {

  constructor() {
    super()
    this.transformedWeight = 1
  }

  transform(wc) {
    let value = voicedMap.get(wc.value)
    if (value) {
      return [value, this.transformedWeight]
    }
  }

}
