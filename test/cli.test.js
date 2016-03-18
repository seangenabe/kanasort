'use strict'

const test = require('ava')
const kanasort = require('../lib/index')

test.cb('stream', t => {
  try {
    let stream = kanasort.stream()
    let data = []
    stream.on('data', x => data.push(x))
    stream.on('end', () => {
      let stringdata = data.join('')
      t.same(stringdata, 'あ\nい\nう\nえ\nお')
      t.end()
    })
    stream.on('error', t.end)
    stream.end('お\nえ\nう\nい\nあ')
  }
  catch (err) {
    t.end(err)
  }
})
