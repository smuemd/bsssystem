import test from 'ava'

import {
  // border,
  // borderBottom,
  borderColor,
  // borderLeft,
  borderRadius,
  borders
  // borderTop,
  // borderRight
} from '../lib/misc'

const theme = {
  breakpoints: [ 32, 48, 64 ].map(n => n + 'em'),
  space: [ 0, 6, 12, 18, 24 ],
  fontSizes: [ 12, 16, 18, 24, 36, 72 ],
  radii: [ 2, 4 ],
  colors: {
    blue: '#07c',
    green: '#1c0',
    gray: ['#ccc', '#555']
  }
}

// aliases
theme.space.big = 64
theme.fontSizes.big = 128

// borderRadius

test('borderRadius returns borderRadius', t => {
  const a = borderRadius({ borderRadius: '4px' })
  t.deepEqual(a, { borderRadius: '4px' })
})

test('borderRadius returns a pixel value', t => {
  const a = borderRadius({ borderRadius: 4 })
  t.deepEqual(a, { borderRadius: '4px' })
})

test('borderRadius returns a pixel value from theme', t => {
  const a = borderRadius({
    borderRadius: 0
  }, theme)
  t.deepEqual(a, { borderRadius: '2px' })
})

// borderColor

test('borderColor returns borderColor', t => {
  const a = borderColor({ borderColor: 'blue' })
  t.deepEqual(a, { borderColor: 'blue' })
})

test('borderColor returns nested borderColor', t => {
  const a = borderColor({ theme, borderColor: 'gray.0' })
  t.deepEqual(a, { borderColor: theme.colors.gray[0] })
})

// borders

test('borders returns a border shorthand style', t => {
  const a = borders({ border: '1px solid' })
  t.is(a.border, '1px solid')
})

test('borders converts numbers to a border shorthand style', t => {
  const a = borders({ border: 1 })
  t.is(a.border, '1px solid')
})

test('borders handles responsive styles', t => {
  const a = borders({ border: [ 0, 1 ] })
  t.is(a.border, 0)
  t.is(a['@media screen and (min-width: 40em)'].border, '1px solid')
})

test('borders converts borderTop shorthand styles', t => {
  const a = borders({ borderTop: '1px solid' })
  t.is(a.borderTop, '1px solid')
})

test('borders converts borderTop number shorthand styles', t => {
  const a = borders({ borderTop: 1 })
  t.is(a.borderTop, '1px solid')
})

test('borders converts borderRight shorthand styles', t => {
  const a = borders({ borderRight: '1px solid' })
  t.is(a.borderRight, '1px solid')
})

test('borders converts borderRight number shorthand styles', t => {
  const a = borders({ borderRight: 1 })
  t.is(a.borderRight, '1px solid')
})

test('borders converts borderBottom shorthand styles', t => {
  const a = borders({ borderBottom: '1px solid' })
  t.is(a.borderBottom, '1px solid')
})

test('borders converts borderBottom number shorthand styles', t => {
  const a = borders({ borderBottom: 1 })
  t.is(a.borderBottom, '1px solid')
})

test('borders converts borderLeft shorthand styles', t => {
  const a = borders({ borderLeft: '1px solid' })
  t.is(a.borderLeft, '1px solid')
})

test('borders converts borderLeft number shorthand styles', t => {
  const a = borders({ borderLeft: 1 })
  t.is(a.borderLeft, '1px solid')
})

test('borders combines multiple border styles', t => {
  const a = borders({
    borderTop: 1,
    borderBottom: 2
  })
  t.is(a.borderTop, '1px solid')
  t.is(a.borderBottom, '2px solid')
})

test('borders combines multiple responsive styles', t => {
  const a = borders({
    borderTop: [ '1px solid', '2px solid' ],
    borderBottom: [ 'none', '2px solid' ]
  })
  t.deepEqual(a, {
    borderTop: '1px solid',
    borderBottom: 'none',
    '@media screen and (min-width: 40em)': {
      borderTop: '2px solid',
      borderBottom: '2px solid'
    }
  })
})
