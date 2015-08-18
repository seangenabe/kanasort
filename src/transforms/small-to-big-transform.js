
import splitByTwos from '../util/split-by-twos'
import Transform from './transform'

const smallToBigMap = new Map(splitByTwos('ぁあぃいぅうぇえぉおゎわっつァアィイゥウェエォオッツヵカヶケ'))

// Transforms small kana to their normal variants.
export default class SmallToBigTransform extends Transform {

  constructor() {
    super()
    this.untransformedWeight = 0
    this.transformedWeight = 1
  }

  transform(wc) {
    var value = smallToBigMap.get(wc.value)
    if (value) {
      wc.value = value
      wc.weights.set(SmallToBigTransform, this.transformedWeight)
    }
    else {
      wc.weights.set(SmallToBigTransform, this.untransformedWeight)
    }
  }

}
