'use strict'

const test = require('ava')
const kanasort = require('../lib')
const shuffle = require('array-shuffle')

test('compare', t => {
  let result = kanasort.compare('ぁ', 'あ')
  t.is(result, -1)
})

test('sort', t => {
  const items = 'の・はー・はぁ・はあ・はゝ・ハー・ば・バ・ぱ・パ'.split('・')
  for (let i = 0; i < 20; i++) {
    let testItems = shuffle(items)
    kanasort(testItems)
    t.same(items, testItems)
  }
})
