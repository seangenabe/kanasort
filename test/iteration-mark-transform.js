'use strict'

const test = require('ava')

const TransformedString = require('../dist/transformed-string')
const TransformedCharacter = require('../dist/transformed-character')
const IterationMarkTransform = require('../dist/transforms/iteration-mark-transform')

test('should transform ok by default', t => {
  let x = new TransformedString('あゝイゝ%ゝ', [IterationMarkTransform])
  t.is(x.value, 'ああイイ%ゝ')
  t.same(
    x.items.map(tc => tc.weights.get(IterationMarkTransform)),
    [0, -1, 0, -1, 0, 0]
  )
})

test('should expect null', t => {
  let transform = new IterationMarkTransform()
  let c = new TransformedCharacter(null)
  transform.transform(c)
  t.ok(c.value == null)
  t.is(c.weights.get(IterationMarkTransform), 0)
})
