import test from 'ava'

import {
  display,
  height,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  ratio,
  // ratioPadding,
  size,
  // sizeWidth,
  // sizeHeight,
  verticalAlign
} from '../lib/layout'

// display

test('display returns display', t => {
  const a = display({ display: 'inline-block' })
  t.is(a.display, 'inline-block')
})

// minWidth

test('minWidth returns minWidth', t => {
  const a = minWidth({ minWidth: 256 })
  t.is(a.minWidth, '256px')
})

// maxWidth

test('maxWidth returns width styles', t => {
  const a = maxWidth({ maxWidth: 234 })
  t.deepEqual(a, { maxWidth: '234px' })
})

test('maxWidth returns null or undefined when blank', t => {
  const a = maxWidth({ maxWidth: null })
  t.is(a, null || undefined)
})

test('maxWidth returns scalar styles', t => {
  const a = maxWidth({
    theme: {
      maxWidths: [
        123, 456, 789
      ]
    },
    maxWidth: 1
  })
  t.deepEqual(a, { maxWidth: '456px' })
})

// height

test('height returns height', t => {
  const a = height({ height: 256 })
  t.is(a.height, '256px')
})

// minHeight

test('minHeight returns minHeight', t => {
  const a = minHeight({ minHeight: 256 })
  t.is(a.minHeight, '256px')
})

// maxHeight

test('maxHeight returns maxHeight', t => {
  const a = maxHeight({ maxHeight: 256 })
  t.is(a.maxHeight, '256px')
})

// size

test('size returns width and height', t => {
  const a = size({ size: 256 })
  t.is(a.width, '256px')
  t.is(a.height, '256px')
})

// ratio

test('ratio returns height and paddingBottom', t => {
  const a = ratio({ ratio: 1 / 2 })
  t.is(a.height, 0)
  t.is(a.paddingBottom, '50%')
})

test('ratio returns null or undefined when undefined', t => {
  const a = ratio({})
  t.is(a, null || undefined)
})

// verticalAlign

test('verticalAlign returns verticalAlign', t => {
  const a = verticalAlign({ verticalAlign: 'middle' })
  t.deepEqual(a, {
    verticalAlign: 'middle'
  })
})
