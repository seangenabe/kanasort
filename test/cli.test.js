'use strict'

const test = require('ava')
const kanasort = require('../lib/index')

test.cb('stream', t => {
  let stream = kanasort.stream()
  console.log(stream) // DEBUG
  let data = []
  stream.on('data', x => data.push(x))
  stream.on('end', () => {
    let stringdata = data.join('')
    t.same(stringdata, 'あ\nい\nう\nえ\nお')
    t.end()
  })
  stream.on('error', t.end)
  stream.end('お\nえ\nう\nい\nあ')
})
