import test from 'ava'

test(t => {
  t.truthy(typeof Symbol() === 'function')
})
