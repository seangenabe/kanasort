'use strict'

module.exports = function* splitByTwos(str) {
  let buf = []
  for (let char of str) {
    buf.push(char)
    if (buf.length === 2) {
      yield buf
      buf = []
    }
  }
  if (buf.length) { yield buf }
}
