
import Transform from './transform'

import {HIRA_START} from '../util/hiragana-block'
import {KATA_START} from '../util/katakana-block'
// The katakana block and the corresponding hiragana block must have
// one-to-one correspondence.
const KATA_END = 0x30f4 // 'ヴ'.codePointAt(0)

// Transforms katakana into hiragana.
export default class KataToHiraTransform extends Transform {

  constructor() {
    super()
    this.untransformedWeight = 0
    this.transformedWeight = 1
  }

  transform(wc) {
    var codePoint = wc.value.codePointAt(0)
    if (KATA_START <= codePoint && codePoint <= KATA_END) {
      wc.value = String.fromCodePoint(codePoint - KATA_START + HIRA_START)
      wc.weights.set(KataToHiraTransform, this.transformedWeight)
    }
    else {
      wc.weights.set(KataToHiraTransform, this.untransformedWeight)
    }
  }

}
