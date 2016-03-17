'use strict'

const test = require('ava')

const TransformedString = require('../lib/transformed-string')
const TransformedCharacter = require('../lib/transformed-character')
const IterationMarkTransform =
  require('../lib/transforms/iteration-mark-transform')
const RemoveBees = require('./remove-bees')

test('should transform ok by default', t => {
  let r = new IterationMarkTransform()
  let x = new TransformedString('あゝイゝ%ゝ', [r])
  t.is(x.value, 'ああイイ%ゝ')
  t.same(
    x.items.map(tc => tc.weights.get(r)),
    [0, -1, 0, -1, 0, 0]
  )
})

test('should expect null', t => {
  let x = new TransformedString(
    'あbゝ',
    [new RemoveBees(), new IterationMarkTransform()]
  )
  t.is(x.value, 'ああ')
})
