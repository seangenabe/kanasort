
import Transform from './transform'
import first from '../util/first'

const map = new Map((function*() {
  var groups = [
    'あかさなたはまやらわ',
    'いきしにちひみりゐ',
    'うくすぬつふむゆる',
    'えけせねてへめれゑ',
    'おこそとのほもよろを',
    'ん'
  ]
  for (let group of groups) {
    var rep = first(group)
    for (let element of group) {
      yield [element, rep]
    }
  }
})())

const CHOUON = 'ー'

// Transforms the katakana-hiragana prolonged sound mark (長音符) to the
// corresponding sound.
// Note: Only processes hiragana. To process katakana also, you might
//       want to include the KataToHiraTransform in your transforms.
export default class LongSoundMarkTransform extends Transform {

  constructor() {
    super()
    this.untransformedWeight = 0
    this.transformedWeight = 1
  }

  transform(wc) {
    var value, weight = this.untransformedWeight, {prevChar} = this
    do {
      if (wc.value === CHOUON && prevChar) {
        value = map.get(prevChar)
        if (value) {
          weight = this.transformedWeight
          wc.value = value
          break
        }
      }
    } while (false)
    wc.weights.set(LongSoundMarkTransform, weight)
  }

} // class LongSoundMarkTransform
