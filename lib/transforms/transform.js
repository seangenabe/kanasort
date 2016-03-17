'use strict'

// Base class for transforms.
module.exports = class WeightedCharacterTransform {

  constructor() {
  }

  // Returns an instruction that instructs how to the specified TransformCharacter:
  // (For weights, the special value 0 means no transformation was done.)
  // * null / undefined - No transformation should be done to the character.
  // * [str: string, weight: number] - The character should be transformed to
  //   `str` with `weight` weight. The special value for `str` `null` means
  //   the character is to be discarded from sorting, in which case `weight`
  //   is optional and will be ignored.
  transform(c) {
  }

} // class
