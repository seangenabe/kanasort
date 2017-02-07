'use strict'

const test = require('ava')

const TransformedString = require('../lib/transformed-string')
const KataToHiraTransform = require('../lib/transforms/kata-to-hira-transform')
const TransformedCharacter = require('../lib/transformed-character')
const RemoveBees = require('./remove-bees')

test('should transform ok by default', t => {
  let r = new KataToHiraTransform()
  let x = new TransformedString('アカサタナいハマヤラワヰヱン', [r])
  t.is(x.value, 'あかさたないはまやらわゐゑん')
  t.deepEqual(
    x.items.map(tc => tc.weights.get(r)),
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1]
  )
})

test('should expect null', t => {
  let x = new TransformedString(
    'abc',
    [new RemoveBees(), new KataToHiraTransform()]
  )
  t.is(x.value, 'ac')
})
