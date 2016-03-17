'use strict'

const TransformedCharacter = require('./transformed-character')

module.exports = class TransformedString {

  constructor(value, transforms) {
    if (typeof value !== 'string') throw new TypeError("value is not a string")
    if (!Array.isArray(transforms))
      throw new TypeError("transforms is not an array")

    // The original string
    this.original = value
    // `TransformedCharacter`s
    this.items = []
    // Transform instances
    this.transforms = transforms
  }

  _transformCharacter(c) {
    let tc = new TransformedCharacter(c)
    for (let transform of this.transforms) {
      let transformInstruction = transform.transform(tc)
      if (transformInstruction == null) {
        tc.weights.set(transform, 0)
      }
      else if (Array.isArray(transformInstruction)) {
        let value = transformInstruction[0]
        tc.value = value
        if (value == null) {
          tc.weights.set(transform, 0)
        }
        else {
          let weight = transformInstruction[1]
          tc.weights.set(transform, weight)
        }
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
      value = []
      for (let tc of this) {
        if (tc.value != null) {
          value.push(tc.value)
        }
      }
      value = value.join('')
      this._value = value
    }
    return value
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
