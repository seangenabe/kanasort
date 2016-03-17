'use strict'

const test = require('ava')

const TransformedString = require('../lib/transformed-string')
const TransformedCharacter = require('../lib/transformed-character')
const IterationMarkVariationsTransform =
  require('../lib/transforms/iteration-mark-variations-transform')
const RemoveBees = require('./remove-bees')

test('should transform ok by default', t => {
  let r = new IterationMarkVariationsTransform()
  let x = new TransformedString('ゝゞヽaヾ', [r])
  t.is(x.value, 'ゝゝゝaゝ')
  t.same(
    x.items.map(tc => tc.weights.get(r)),
    [-1, -1, -1, 0, -1]
  )
})

test('should expect null', t => {
  let x = new TransformedString(
    'abc',
    [new RemoveBees(), new IterationMarkVariationsTransform()]
  )
  t.is(x.value, 'ac')
})
