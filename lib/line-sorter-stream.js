'use strict'

const Transform = require('stream').Transform
const kanasort = require('./index')

module.exports = class LineSorterStream extends Transform {

  constructor() {
    this.data = []
  }

  _transform(chunk, enc, callback) {
    this.data.push(chunk)
    callback()
  }

  _flush(callback) {
    kanasort(this.data)
    for (let element of this.data) {
      this.push(element + '\n')
    }
    callback()
  }

}
