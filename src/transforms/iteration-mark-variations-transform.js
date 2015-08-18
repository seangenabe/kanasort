
import Transform from './transform'

const iterationMarks = new Set('ゝゞヽヾ')
const HIRAGANA_ITERATION_MARK = 'ゝ'

// Transforms variations of the iteration mark.
export default class IterationMarkVariationsTransform extends Transform {

  constructor() {
    super()
    this.untransformedWeight = 0
    this.transformedWeight = 1
  }

  transform(wc) {
    if (iterationMarks.has(wc.value)) {
      wc.value = HIRAGANA_ITERATION_MARK
      wc.weights.set(IterationMarkVariationsTransform, this.transformedWeight)
    }
    else {
      wc.weights.set(IterationMarkVariationsTransform, this.untransformedWeight)
    }
  }

}
