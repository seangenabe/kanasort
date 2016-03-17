
const LRUCache = require('lru-cache')
const MultiKeyCache = require('mkc')
const TransformedString = require('./transformed-string')
const EOL = require('os').EOL
const util = require('util')
// transforms
const VoicedTransform = require('./transforms/voiced-transform')
const HalfVoicedTransform = require('./transforms/half-voiced-transform')
const KataToHiraTransform = require('./transforms/kata-to-hira-transform')
const LongSoundMarkTransform = require('./transforms/long-sound-mark-transform')
const SmallToBigTransform = require('./transforms/small-to-big-transform')
const IterationMarkVariationsTransform =
  require('./transforms/iteration-mark-variations-transform')
const IterationMarkTransform = require('./transforms/iteration-mark-transform')

class Sorter {

  constructor() {
    this.transforms = Sorter.defaultTransforms
    this.weightPriority = Sorter.defaultWeightPriority

    this.initializeTransformCache()
    this.compareCache = new MultiKeyCache({
      max: 1E3
    })
  }

  initializeTransformCache(opts = {}) {
    opts.max = opts.max || 1E6
    opts.length = function(tstr) {
      return tstr.original.length * tstr.transforms.length
    }
    this.transformCache = LRUCache(opts)
  }

  _transform(str) {
    if (typeof str !== 'string') { throw new TypeError("str must be a string") }
    return new TransformedString(str, this.transforms)
  }

  // Returns a transformed string with weighted characters.
  transform(str) {
    if (typeof str !== 'string') { throw new TypeError("str must be a string") }
    let cache = this.transformCache
    if (!cache) return this._transform(str)
    let value = cache.get(str)
    if (value) return value
    value = this._transform(str)
    cache.set(str, value)
    return value
  }

  _compare(a, b) {
    if (typeof a !== 'string') { throw new TypeError("a must be a string") }
    if (typeof b !== 'string') { throw new TypeError("b must be a string") }
    let at = this.transform(a),
      bt = this.transform(b)
    return this.compareTransformedStrings(at, bt)
  }

  compare(a, b) {
    if (typeof a !== 'string') { throw new TypeError("a must be a string") }
    if (typeof b !== 'string') { throw new TypeError("b must be a string") }
    if (a === b) return 0
    let cache = this.compareCache
    if (!cache) return this._compare(a, b)
    let value = cache.get([a, b])
    if (value) return value
    value = cache.get([b, a])
    if (value) return -value
    value = this._compare(a, b)
    cache.set([a, b], value)
    return value
  }

  compareTransformedStrings(a, b) {
    if (!(a instanceof TransformedString)) {
      throw new TypeError("a must be a TransformedString")
    }
    if (!(b instanceof TransformedString)) {
      throw new TypeError("b must be a TransformedString")
    }
    let ai = a[Symbol.iterator]()
    let bi = b[Symbol.iterator](),
    let ar, br

    while (true) {
      do {
        ar = ai.next()
      } while (!ar.done && ar.value == null)
      do {
        br = bi.next()
      } while (!br.done && ar.value == null)

      if (ar.done && br.done) {
        return 0 // a = b
      }
      if (ar.done) {
        return -1 // a is shorter than b
      }
      if (br.done) {
        return 1 // b is shorter than a
      }

      let atc = ar.value,
        btc = br.value

      if (atc.value < btc.value) {
        return -1
      }
      if (atc.value > btc.value) {
        return 1
      }

      let compareWeights = this.compareCharacterWeights(
        ar.value.weights, br.value.weights)
      if (compareWeights !== 0) return compareWeights
    }
  }

  compareCharacterWeights(a, b) {
    if (!(a instanceof Map)) { throw new TypeError("a must be a Map") }
    if (!(b instanceof Map)) { throw new TypeError("b must be a Map") }
    for (let transform of this.weightPriority) {
      let aw = a.get(transform) || 0
      let bw = b.get(transform) || 0
      if (aw == null || bw == null) {
        continue
      }
      let compared = aw - bw
      if (compared !== 0) return compared
    }
    return 0
  }

} // class Sorter

Sorter.defineProperty(Sorter, 'default', {
  get: function() {
    const _default = new Sorter()
    return _default
  }
})

Object.defineProperty(Sorter, 'defaultTransforms', {
  value: [
    // JIS X 4061, #2
    SmallToBigTransform,
    VoicedTransform,
    HalfVoicedTransform,
    KataToHiraTransform,
    IterationMarkVariationsTransform,
    // #3
    LongSoundMarkTransform,
    // #4
    IterationMarkTransform
  ]
})

Object.defineProperty(Sorter, 'defaultWeightPriority', {
  value: [
    // #6.1
    VoicedTransform,
    HalfVoicedTransform,
    // #6.2
    LongSoundMarkTransform,
    SmallToBigTransform,
    IterationMarkVariationsTransform,
    IterationMarkTransform,
    // #6.3
    KataToHiraTransform
  ]
})

module.exports = Sorter
