'use strict'

// Base class for transforms.
module.exports = class WeightedCharacterTransform {

  constructor() {
  }

  transform(wc) {
    wc.weights.set(WeightedCharacterTransform, 0)
  }

} // class
