
import TransformedCharacter from './transformed-character'

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
