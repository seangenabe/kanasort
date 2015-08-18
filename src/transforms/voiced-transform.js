
import Transform from './transform'
import splitByTwos from '../util/split-by-twos'

const voicedMap = new Map(splitByTwos(
  'ゔうがかぎきぐくげけごこざさじしずすぜせぞそだたぢちづつでてどとばはびひぶふべへぼほヴウガカキキククゲケゴコザサジシズスゼセゾソダタヂチヅツデテドトバハビヒブフベヘボホヷワヸヰヹヱヺヲ'
))

// Transforms voiced kana to their voiced variant.
export default class VoicedTransform extends Transform {

  constructor() {
    super()
    this.untransformedWeight = 0
    this.transformedWeight = 1
  }

  transform(wc) {
    var value = voicedMap.get(wc.value)
    if (value) {
      wc.value = value
      wc.weights.set(VoicedTransform, this.transformedWeight)
    }
    else {
      wc.weights.set(VoicedTransform, this.untransformedWeight)
    }
  }

}
