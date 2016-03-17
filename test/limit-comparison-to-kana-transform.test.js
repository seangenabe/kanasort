'use strict'

const test = require('ava')

const TransformedString = require('../lib/transformed-string')
const LimitComparisonToKanaTransform =
  require('../lib/transforms/limit-comparison-to-kana-transform')
const TransformedCharacter = require('../lib/transformed-character')
const RemoveBees = require('./remove-bees')

test('should transform ok by default', t => {
  let r = new LimitComparisonToKanaTransform()
  let x = new TransformedString('あa%^ん', [r])
  t.is(x.value, 'あん')
  t.same(
    x.items.map(tc => tc.weights.get(r)),
    [0, 0, 0, 0, 0]
  )
})

test('should expect null', t => {
  let x = new TransformedString('あbん', [
    new RemoveBees(),
    new LimitComparisonToKanaTransform()]
  )
  t.is(x.value, 'あん')
})
