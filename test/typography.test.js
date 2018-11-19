import test from 'ava'

import {
  fontFamily,
  // fontStyle,
  fontWeight,
  letterSpacing,
  lineHeight,
  textAlign
} from '../lib/typography'

test('fontFamily returns font-family', t => {
  const a = fontFamily({ fontFamily: 'system-ui' })
  t.is(a.fontFamily, 'system-ui')
})

// fontWeight

test('fontWeight returns fontWeight', t => {
  const a = fontWeight({ fontWeight: 'bold' })
  t.deepEqual(a, { fontWeight: 'bold' })
})

test('fontWeight returns a scalar style', t => {
  const a = fontWeight({
    theme: {
      fontWeights: [
        400, 600, 800
      ]
    },
    fontWeight: 2
  })
  t.deepEqual(a, { fontWeight: 800 })
})

// letterSpacing

test('letterSpacing returns letterSpacing', t => {
  const a = letterSpacing({ letterSpacing: 2 })
  t.deepEqual(a, { letterSpacing: '2px' })
})

test('letterSpacing returns a scalar style', t => {
  const a = letterSpacing({
    theme: {
      letterSpacings: [ 1, 2, 3 ]
    },
    letterSpacing: 2
  })
  t.deepEqual(a, { letterSpacing: '3px' })
})

// lineHeight

test('lineHeight returns line-height', t => {
  const a = lineHeight({ lineHeight: 1.23 })
  t.deepEqual(a, { lineHeight: 1.23 })
})

test('lineHeight returns a scalar style', t => {
  const a = lineHeight({
    theme: {
      lineHeights: [
        1, 2, 3
      ]
    },
    lineHeight: 1
  })

  t.deepEqual(a, { lineHeight: 2 })
})

test('lineHeight returns responsive line-height', t => {
  const a = lineHeight({
    theme: {
      lineHeights: [
        1, 2, 3
      ]
    },
    lineHeight: [1, 2]
  })

  t.deepEqual(a, {
    lineHeight: 2,
    '@media screen and (min-width: 40em)': {
      lineHeight: 3
    }
  })
})

// textAlign

test('textAlign returns text-align', t => {
  const a = textAlign({ textAlign: 'center' })
  t.deepEqual(a, { textAlign: 'center' })
})

test('textAlign returns responsive text-align', t => {
  const a = textAlign({ textAlign: [ 'center', 'left' ] })
  t.deepEqual(a, {
    textAlign: 'center',
    '@media screen and (min-width: 40em)': {
      textAlign: 'left'
    }
  })
})
