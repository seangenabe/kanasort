
import Transform from './transform'
import isKana from '../util/is-kana'

const HIRAGANA_ITERATION_MARK = 'ゝ'

// Transforms the iteration mark to the corresponding sound.
export default class IterationMarkTransform extends Transform {

  constructor() {
    super()
    this.untransformedWeight = 0
    this.transformedWeight = 1
  }

  transform(wc) {
    if (wc.value === HIRAGANA_ITERATION_MARK &&
      this.prevChar &&
      isKana(this.prevChar)) {

      wc.value = prevChar
      wc.weights.set(IterationMarkTransform, this.transformedWeight)
    }
    else {
      wc.weights.set(IterationMarkTransform, this.untransformedWeight)
    }
  }

}
