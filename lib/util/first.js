'use strict'

module.exports = function first(iterable) {
  for (let element of iterable) {
    return element
  }
}
