'use strict'

const Sorter = require('./sorter')

function compare(a, b) {
  return Sorter.default.compare(a, b)
}

function sort(arr) {
  return Array.prototype.sort.call(arr, compare)
}

function stream() {
  const combine = require('stream-combiner')
  const split = require('split')
  const LineSorterStream = require('./line-sorter-stream')
  return combine(
    split(),
    new LineSorterStream()
  )
}

module.exports = sort
module.exports.Sorter = Sorter
module.exports.stream = stream
module.exports.compare = compare
