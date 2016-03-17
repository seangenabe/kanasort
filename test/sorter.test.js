'use strict'

const test = require('ava')
const FS = require('fs')
const shuffle = require('array-shuffle')
const Sorter = require('../lib/sorter')
const VoicedTransform = require('../lib/transforms/voiced-transform')
const HalfVoicedTransform = require('../lib/transforms/half-voiced-transform')

test('constructor', t => {
  let sorter = new Sorter()
})

test('compare', t => {
  let sorter = new Sorter()
  let result = sorter.compare('あ', 'ぁ')
  t.is(result, 1)
})

test('static properties', t => {
  t.ok(Sorter.default === Sorter.default)
  t.ok(Sorter.defaultTransforms === Sorter.defaultTransforms)
})

// Sorting tests
// =============

test('compare voiced forms', t => {
  let sorter = new Sorter()
  let items = 'はひびぴぶぷ'.split('')
  for (let i = 0; i < 20; i++) {
    let testItems = shuffle(items)
    testItems.sort(Sorter.prototype.compare.bind(sorter))
    t.same(testItems, items)
  }
})

test('compare kana-related symbols', t => {
  let sorter = new Sorter()
  let items = 'あー・あぁ・あゝ・ああ'.split('・')
  for (let i = 0; i < 20; i++) {
    let testItems = shuffle(items)
    testItems.sort(Sorter.prototype.compare.bind(sorter))
    t.same(testItems, items)
  }
})

test('compare hiragana < katakana', t => {
  let sorter = new Sorter()
  let items = 'さサしシ'.split('')
  for (let i = 0; i < 20; i++) {
    let testItems = shuffle(items)
    testItems.sort(Sorter.prototype.compare.bind(sorter))
    t.same(testItems, items)
  }
})

test('compare all the things', t => {
  let sorter = new Sorter()
  let items =
    'の・はー・はぁ・はあ・はゝ・ハー・ば・バ・ぱ・パ'.split('・')
  for (let i = 0; i < 20; i++) {
    let testItems = shuffle(items)
    testItems.sort(Sorter.prototype.compare.bind(sorter))
    t.same(testItems, items)
  }
})
