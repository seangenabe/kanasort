'use strict'

const TransformedCharacter = require('./transformed-character')
const VoicedTransform = require('./transforms/voiced-transform')
const HalfVoicedTransform = require('./transforms/half-voiced-transform')
const KataToHiraTransform = require('./transforms/kata-to-hira-transform')
const LongSoundMarkTransform = require('./transforms/long-sound-mark-transform')
const SmallToBigTransform = require('./transforms/small-to-big-transform')
const IterationMarkVariationsTransform =
  require('./transforms/iteration-mark-variations-transform')
const IterationMarkTransform =
  require('./transforms/iteration-mark-transform')

module.exports = class TransformedString {

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
    let tc = new TransformedCharacter(c)
    for (let transformConstructor of this.transforms) {
      let transform = new transformConstructor()
      let transformInstruction = transform.transform(tc)
      if (transformInstruction == null) {
        tc.weights.set(transformConstructor, 0)
      }
      else if (Array.isArray(transformInstruction)) {
        let value = transformInstruction[0]
        tc.value = value
        if (value == null) {
          tc.weights.set(transformConstructor, 0)
        }
        let weight = transformInstruction[1]
        tc.weights.set(transformConstructor, weight)
      }
    }
    return tc
  }

  // Gets the transformed value.
  // Since the transformation is lazily processed via #[Symbol.iterator](),
  // the act of getting #value will process all characters in the string.
  // Cached.
  get value() {
    let value = this._value
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
    let value = this.value
    let ぁ = SmallToBigTransform,
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

  // Transforms each character.
  // Each character is lazily processed, allowing long strings to play nice with
  // the overall sorting.
  *[Symbol.iterator]() {
    let index = 0
    for (let char of this.original) {
      let item = this.items[index]
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

}
