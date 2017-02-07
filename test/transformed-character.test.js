'use strict'

const test = require('ava')
const TransformedCharacter = require('../lib/transformed-character')

test(t => {
  let c = new TransformedCharacter('a')
  t.is(c.original, 'a')
  t.is(c.value, 'a')
  t.truthy(c.weights.constructor.name === 'Map')
})
