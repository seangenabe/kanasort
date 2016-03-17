'use strict'

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
const DEFAULT_CACHE_SIZE = 1024 * 1024 * 50

let _default
let _defaultTransforms

class Sorter {

  // transforms: an object
  //   transformsfn: A factory function that returns an array:
  //     arg: The string.
  //     return value: The transforms that a `TransformString` passes through,
  //                   in order
  //   weights: The weight priority for each, in order. Expressed as an array of
  //      numbers, indexing the transform from the previous array.
  constructor(transforms, opts) {
    opts = opts || {}
    this.transforms = transforms || Sorter.defaultTransforms

    this.transformCache = LRUCache(
      Object.assign({
          max: DEFAULT_CACHE_SIZE,
          length: s => s.transforms.length * s.original.length
        }, opts.transformCache || {}
      )
    )
    this.compareCache = new MultiKeyCache(
      Object.assign(
        { max: DEFAULT_CACHE_SIZE },
        opts.compareCache || {}
      )
    )
  }

  _transform(str) {
    return new TransformedString(str, this.transforms.transformsfn(str))
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
    let at = this.transform(a),
      bt = this.transform(b)
    return this._compareTransformedStrings(at, bt)
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

  _compareTransformedStrings(a, b) {
    let ai = a[Symbol.iterator]()
    let bi = b[Symbol.iterator]()
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

      // compare character weights
      let compareWeights
      cw: {
        for (let index of this.transforms.weights) {
          let aTransform = a.transforms[index]
          let bTransform = b.transforms[index]
          let aw = atc.weights.get(aTransform)
          let bw = btc.weights.get(bTransform)
          if (aw == null || bw == null) {
            continue
          }
          let compared = aw - bw
          if (compared !== 0) {
            compareWeights = compared
            break cw
          }
        }
        compareWeights = 0
      }

      if (compareWeights !== 0) return compareWeights
    }
  }

  static get default() {
    if (!_default) {
      _default = new Sorter()
    }
    return _default
  }

  static get defaultTransforms() {
    if (!_defaultTransforms) {
      _defaultTransforms = {
        transformsfn() {
          return [
            // JIS X 4061, #2
            new SmallToBigTransform(),
            new VoicedTransform(),
            new HalfVoicedTransform(),
            new KataToHiraTransform(),
            new IterationMarkVariationsTransform(),
            // #3
            new LongSoundMarkTransform(),
            new IterationMarkTransform()
          ]
        },
        weights: [
          // #6.1
          2,
          1,
          // #6.2
          5,
          0,
          4,
          // #6.3
          3
        ]
      }
    }
    return _defaultTransforms
  }

} // class Sorter

module.exports = Sorter
