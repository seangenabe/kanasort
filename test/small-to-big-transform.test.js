'use strict'

const test = require('ava')

const TransformedString = require('../lib/transformed-string')
const SmallToBigTransform = require('../lib/transforms/small-to-big-transform')
const TransformedCharacter = require('../lib/transformed-character')
const RemoveBees = require('./remove-bees')

test('should transform ok by default', t => {
  let r = new SmallToBigTransform()
  let x = new TransformedString('ぁっaァ', [r])
  t.is(x.value, 'あつaア')
  t.same(
    x.items.map(tc => tc.weights.get(r)),
    [-1, -1, 0, -1]
  )
})

test('should expect null', t => {
  let x = new TransformedString(
    'abc',
    [new RemoveBees(), new SmallToBigTransform()]
  )
  t.is(x.value, 'ac')
})
