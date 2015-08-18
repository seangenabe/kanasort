
import Transform from './transform'
import splitByTwos from '../util/split-by-twos'

const map = new Map(splitByTwos('ぱはぴひぷふぺへぽほパハピヒプフペヘポホ'))

// Transforms half-voiced kana to their unvoiced variant.
export default class HalfVoicedTransform extends Transform {

  constructor() {
    super()
    this.untransformedWeight = 0
    this.transformedWeight = 1
  }

  transform(wc) {
    var weight = this.untransformedWeight,
      value = map.get(wc.value)
    if (value) {
      wc.weights.set(HalfVoicedTransform, this.transformedWeight)
      wc.value = value
    }
    else {
      wc.weights.set(HalfVoicedTransform, this.untransformedWeight)
    }
  }

}
