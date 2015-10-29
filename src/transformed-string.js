
import TransformedCharacter from './transformed-character'
import VoicedTransform from './transforms/voiced-transform'
import HalfVoicedTransform from './transforms/half-voiced-transform'
import KataToHiraTransform from './transforms/kata-to-hira-transform'
import LongSoundMarkTransform from './transforms/long-sound-mark-transform'
import SmallToBigTransform from './transforms/small-to-big-transform'
import IterationMarkVariationsTransform from './transforms/iteration-mark-variations-transform'
import IterationMarkTransform from './transforms/iteration-mark-transform'

export default class TransformedString {

  constructor(value, transforms) {
    if (typeof value !== 'string') throw new TypeError("value is not a string")
    if (!Array.isArray(transforms))
      throw new TypeError("transforms is not an array")

    // The original string
    this.original = value
    // `TransformedCharacter`s
    this.items = []
    // Transform class constructors
    this.transforms = transforms
  }

  _transformCharacter(c) {
    var tc = new TransformedCharacter(c)
    for (let transformConstructor of this.transforms) {
      let transform = new transformConstructor()
      transform.transform(tc)
    }
    return tc
  }

  // Gets the transformed value.
  // Since the transformation is lazily processed via #[Symbol.iterator](),
  // the act of getting #value will process all characters in the string.
  // Cached.
  get value() {
    var value = this._value
    if (!this._value) {
      value = ''
      for (let tc of this) {
        if (tc.value != null) {
          value += tc.value
        }
      }
      this._value = value
    }
    return value
  }

  serialize() {
    var value = this.value
    var ぁ = SmallToBigTransform,
      ﾞ = VoicedTransform,
      ﾟ = HalfVoicedTransform,
      ゞ = IterationMarkVariationsTransform,
      ゝ = IterationMarkTransform,
      ー = LongSoundMarkTransform,
      カ = KataToHiraTransform
    this.transforms = [
      // JIS X 4061, #2
      ぁ, ﾞ, ﾟ, カ, ゞ,
      // #3
      ー,
      // #4
      ゝ
    ]
  }

}

// Transforms each character.
// Each character is lazily processed, allowing long strings to play nice with
// the overall sorting.
TransformedString.prototype[Symbol.iterator] = function*() {
  var index = 0
  for (let char of this.original) {
    var item = this.items[index]
    if (item) {
      yield item
    }
    else {
      item = this._transformCharacter(char)
      this.items[index] = item
      yield item
    }
    index++
  }
}
