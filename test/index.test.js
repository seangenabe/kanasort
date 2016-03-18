'use strict'

const test = require('ava')
const kanasort = require('../lib')

test('compare', t => {
  let result = kanasort.compare('あ', 'ぁ')
  t.is(result, 1)
})

test('sort', t => {
  for (let i = 0; i < 20; i++) {
    let items = ['あ', 'ぁ']
    let testItems = shuffle(items)
    kanasort(testItems)
    t.same(items, testItems)
  }
})
