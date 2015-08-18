
// Base class for transforms.
export default class WeightedCharacterTransform {

  constructor() {
  }

  transform(wc) {
    wc.weights.set(WeightedCharacterTransform, 0)
  }

} // class
