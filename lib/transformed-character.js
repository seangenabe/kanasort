'use strict'

// Represents a character in the transformation process
module.exports = class TransformedCharacter {

  constructor(c) {
    this.original = c
    this.value = c
    this.weights = new Map()
  }

}
