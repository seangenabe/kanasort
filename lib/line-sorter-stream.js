'use strict'

const Transform = require('stream').Transform
const kanasort = require('./index')

module.exports = class LineSorterStream extends Transform {

  constructor(opts) {
    super(Object.assign({
      decodeStrings: false
    }, opts))
  }

  _transform(chunk, enc, callback) {
    if (Buffer.isBuffer(chunk)) {
      chunk = chunk.toString('utf8')
    }
    if (!this.data) { this.data = [] }
    this.data.push(chunk)
    callback()
  }

  _flush(callback) {
    kanasort(this.data)
    this.push(this.data.join('\n'))
    callback()
  }

}
