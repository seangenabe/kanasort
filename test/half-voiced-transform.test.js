'use strict'

const test = require('ava')

const TransformedString = require('../lib/transformed-string')
const HalfVoicedTransform = require('../lib/transforms/half-voiced-transform')
const TransformedCharacter = require('../lib/transformed-character')
const RemoveBees = require('./remove-bees')

test('should transform ok by default', t => {
  let r = new HalfVoicedTransform()
  let x = new TransformedString('あがはばぱ', [r])
  t.is(x.value, 'あがはばは') // transformed hira PA -> HA
  t.deepEqual(
    x.items.map(tc => tc.weights.get(r)),
    [0, 0, 0, 0, 1]
  )
})

test('should expect null', t => {
  let x = new TransformedString(
    'abc',
    [new RemoveBees(), new HalfVoicedTransform()]
  )
  t.is(x.value, 'ac')
})
