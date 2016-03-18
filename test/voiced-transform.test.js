'use strict'

const test = require('ava')

const TransformedString = require('../lib/transformed-string')
const VoicedTransform = require('../lib/transforms/voiced-transform')
const TransformedCharacter = require('../lib/transformed-character')
const RemoveBees = require('./remove-bees')

test('should transform ok by default', t => {
  let r = new VoicedTransform()
  let x = new TransformedString('あがはばぱ', [r])
  t.is(x.value, 'あかははぱ') // transformed hira BA -> HA
  t.same(
    x.items.map(tc => tc.weights.get(r)),
    [0, 1, 0, 1, 0]
  )
})

test('should expect null', t => {
  let x = new TransformedString(
    'abc',
    [new RemoveBees(), new VoicedTransform()]
  )
  t.is(x.value, 'ac')
})
