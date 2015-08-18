
// Represents a character in the transformation process
export default class TransformedCharacter {

  constructor(c) {
    this.original = c
    this.value = c
    this.weights = new Map()
  }

}
