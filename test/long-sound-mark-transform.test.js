'use strict'

const test = require('ava')

const TransformedString = require('../lib/transformed-string')
const LongSoundMarkTransform =
  require('../lib/transforms/long-sound-mark-transform')
const TransformedCharacter = require('../lib/transformed-character')
const RemoveBees = require('./remove-bees')

test('should transform ok by default', t => {
  let r = new LongSoundMarkTransform()
  let x = new TransformedString('ーかーきーくーけーこーサーaー', [r])
  t.is(x.value, 'ーかあきいくうけえこおサアaー')
  t.same(
    x.items.map(tc => tc.weights.get(r)),
    [0, 0, -1, 0, -1, 0, -1, 0, -1, 0, -1, 0, -1, 0, 0]
  )
})

test('should expect null', t => {
  let x = new TransformedString(
    'はbー',
    [new RemoveBees(), new LongSoundMarkTransform()]
  )
  t.is(x.value, 'はあ')
})
