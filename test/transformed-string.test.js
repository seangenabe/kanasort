'use strict'

const test = require('ava')
const TransformedString = require('../lib/transformed-string')
const RemoveBees = require('./remove-bees')
const Rot1 = require('./rot1')

test('throw if value is not a string', t => {
  t.throws(() => new TransformedString(Infinity, []), TypeError)
  t.throws(() => new TransformedString(/abc/, []), TypeError)
})

test('throw if transforms is not an array', t => {
  t.throws(() => new TransformedString('', NaN), TypeError)
  t.throws(() => new TransformedString('', ''), TypeError)
})

test('constructor', t => {
  let b = new RemoveBees()
  let str = new TransformedString('foo', [b])
  t.is(str.original, 'foo')
  t.deepEqual(str.items, [])
  t.deepEqual(str.transforms, [b])
})

test('iterator and transformation order', t => {
  let b1 = new RemoveBees()
  let r = new Rot1()
  let b2 = new RemoveBees()
  // abc => ac => bd => d
  let str = new TransformedString('abc', [b1, r, b2])
  let i = str[Symbol.iterator]()

  // iteration *not run yet*
  t.same(str.items, [])

  // iteration 0
  let iteration
  let tc
  iteration = i.next()
  t.false(iteration.done)
  t.is(str.items[0], tc = iteration.value)
  t.is(str.items[1], undefined)
  t.is(tc.original, 'a')
  t.is(tc.weights.get(b1), 0)
  t.is(tc.weights.get(r), 7)
  t.is(tc.weights.get(b2), 0)
  t.truthy(tc.value == null)

  // iteration 1
  iteration = i.next()
  t.false(iteration.done)
  t.is(str.items[1], tc = iteration.value)
  t.is(tc.original, 'b')
  t.is(tc.weights.get(r), 0)
  t.truthy(tc.value == null)

  // iteration 2
  iteration = i.next()
  t.false(iteration.done)
  t.is(str.items[2], tc = iteration.value)
  t.is(tc.original, 'c')
  t.is(tc.weights.get(r), 7)
  t.is(tc.value, 'd')

  // iteration 3
  iteration = i.next()
  t.true(iteration.done)
})
