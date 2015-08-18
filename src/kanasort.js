
import LRUCache from 'lru-cache'
import MultiKeyCache from 'mkc'
import TransformedString from './transformed-string'
import split from 'split'
import {EOL} from 'os'
import util from 'util'
// transforms
export WeightedCharacterTransform from './transforms/transform'
import VoicedTransform from './transforms/voiced-transform'
import HalfVoicedTransform from './transforms/half-voiced-transform'
import KataToHiraTransform from './transforms/kata-to-hira-transform'
import LongSoundMarkTransform from './transforms/long-sound-mark-transform'
import SmallToBigTransform from './transforms/small-to-big-transform'
import IterationMarkVariationsTransform from './transforms/iteration-mark-variations-transform'
import IterationMarkTransform from './transforms/iteration-mark-transform'

export class Sorter {

  constructor() {
    var ぁ = SmallToBigTransform,
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
    this.weightPriority = [
      // #6.1
      ﾞ, ﾟ,
      // #6.2
      ー, ぁ, ゞ, ゝ,
      // #6.3
      カ
    ]
    // #6.2
    ー.transformedWeight = -1
    ぁ.transformedWeight = -1
    ゞ.transformedWeight = -1
    ゝ.transformedWeight = -1

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
    return new TransformedString(str, this.transforms)
  }

  // Returns a transformed string with weighted characters.
  transform(str) {
    var cache = this.transformCache
    if (!cache) return this._transform(str)
    var value = cache.get(str)
    if (value) return value
    value = this._transform(str)
    cache.set(str, value)
    return value
  }

  _compare(a, b) {
    var at = this.transform(a),
      bt = this.transform(b)
    return this.compareTransformedStrings(at, bt)
  }

  compare(a, b) {
    if (a === b) return 0
    var cache = this.compareCache
    if (!cache) return this._compare(a, b)
    var value = cache.get([a, b])
    if (value) return value
    value = cache.get([b, a])
    if (value) return -value
    value = this._compare(a, b)
    cache.set([a, b], value)
    return value
  }

  compareTransformedStrings(a, b) {
    var ai = a[Symbol.iterator](),
      bi = b[Symbol.iterator](),
      ar, br

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

      var compareWeights = this.compareCharacterWeights(
        ar.value.weights, br.value.weights)
      if (compareWeights !== 0) return compareWeights
    }
  }

  compareCharacterWeights(a, b) {
    for (let transform of this.weightPriority) {
      var aw = a.get(transform) || 0
      var bw = b.get(transform) || 0
      if (aw == null || bw == null) {
        continue
      }
      var compared = aw - bw
      if (compared !== 0) return compared
    }
    return 0
  }

  static get default() {
    const _default = new Sorter()
    return _default
  }

}

export function console() {
  var lines = []
  process.stdin.pipe(split())
  .on('data', function(line) {
    lines.push(line)
  })
  .on('end', function() {
    sort(lines)
    process.stdout.write(lines.join(EOL))
  })
}

export function compare(a, b) {
  return Sorter.default.compare(a, b)
}

export default function sort(arr) {
  return Array.prototype.sort.call(arr, compare)
}

if (require && require.main === module) {
  console()
}
