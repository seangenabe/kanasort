
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
    if (!kana.has(char)) {
      wc.value = null
    }
    wc.weights.set(LimitComparisonToKanaTransform, 0)
  }

}
