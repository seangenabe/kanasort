'use strict'

const test = require('ava')

const TransformedString = require('../dist/transformed-string')
const HalfVoicedTransform = require('../dist/transforms/half-voiced-transform')
const TransformedCharacter = require('../dist/transformed-character')

test('should transform ok by default', t => {
  let x = new TransformedString('あがはばぱ', [HalfVoicedTransform])
  t.is(x.value, 'あがはばは') // transformed hira PA -> HA
  t.same(
    x.items.map(tc => tc.weights.get(HalfVoicedTransform)),
    [0, 0, 0, 0, 1]
  )
})

test('should expect null', t => {
  let transform = new HalfVoicedTransform()
  let c = new TransformedCharacter(null)
  transform.transform(c)
  t.ok(c.value == null)
  t.is(c.weights.get(HalfVoicedTransform), 0)
})
