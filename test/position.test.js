import test from 'ava'

import {
  bottom,
  left,
  position,
  right,
  top,
  zIndex
} from '../lib/position'

test('position returns position', t => {
  const a = position({ position: 'absolute' })
  t.is(a.position, 'absolute')
})

test('zIndex returns zIndex', t => {
  const a = zIndex({ zIndex: 2 })
  t.is(a.zIndex, 2)
})

test('top returns top', t => {
  const a = top({ top: 2 })
  t.is(a.top, '2px')
})

test('right returns right', t => {
  const a = right({ right: 2 })
  t.is(a.right, '2px')
})

test('bottom returns bottom', t => {
  const a = bottom({ bottom: 2 })
  t.is(a.bottom, '2px')
})

test('left returns left', t => {
  const a = left({ left: 2 })
  t.is(a.left, '2px')
})
