
import Transform from './transform'

const kana = new Set(
  'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをんゝー'
)

// Removes non-kana, non-iteration mark, non-chouon characters from the
// transformed string.
export default class LimitComparisonToKanaTransform extends Transform {

  constructor() {
    super()
  }

  transform(wc) {
    if (!kana.has(wc.value)) {
      wc.value = null
    }
    // weight does not matter anymore even if the character is removed
    wc.weights.set(LimitComparisonToKanaTransform, 0)
  }

}
