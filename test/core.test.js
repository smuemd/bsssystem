import test from 'ava'
import { space, width, fontSize, color } from '../lib/core'

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

test('exports space, width, and fontSize', t => {
  t.is(typeof space, 'function')
  t.is(typeof width, 'function')
  t.is(typeof fontSize, 'function')
})

test('space returns margin declarations', t => {
  const dec = space({ margin: 1 })
  t.deepEqual(dec, { margin: '4px' })
})

test('space returns non-scalar margins', t => {
  const a = space({ margin: 24 })
  const b = space({ margin: 'auto' })
  t.deepEqual(a, { margin: '24px' })
  t.deepEqual(b, { margin: 'auto' })
})

test('space returns keyed values', t => {
  const a = space({
    theme,
    margin: 'big'
  })
  t.is(a.margin, theme.space.big + 'px')
})

test('space returns negative margins', t => {
  const a = space({ margin: -1 })
  const b = space({ margin: -24 })
  t.deepEqual(a, { margin: '-4px' })
  t.deepEqual(b, { margin: '-24px' })
})

test('space returns directional margins', t => {
  const tp = space({ marginTop: 1 })
  const r = space({ marginRight: 2 })
  const b = space({ marginBottom: 3 })
  const l = space({ marginLeft: 4 })
  const x = space({ mx: 1 })
  const y = space({ my: 2 })
  t.deepEqual(tp, { 'marginTop': '4px' })
  t.deepEqual(r, { 'marginRight': '8px' })
  t.deepEqual(b, { 'marginBottom': '16px' })
  t.deepEqual(l, { 'marginLeft': '32px' })
  t.deepEqual(x, { 'marginLeft': '4px', 'marginRight': '4px' })
  t.deepEqual(y, { 'marginTop': '8px', 'marginBottom': '8px' })
})

test('space returns responsive margins', t => {
  const a = space({ margin: [ 0, 1 ] })
  t.deepEqual(a, {
    margin: '0px',
    '@media screen and (min-width: 40em)': {
      margin: '4px'
    }
  })
})

test('space returns responsive directional margins', t => {
  const a = space({ marginTop: [ 0, 1 ], marginBottom: [ 2, 3 ] })
  t.deepEqual(a, {
    marginBottom: '8px',
    marginTop: '0px',
    '@media screen and (min-width: 40em)': {
      marginBottom: '16px',
      marginTop: '4px'
    }
  })
})

test.skip('space sorts responsive directional margins', t => {
  const a = space({
    marginBottom: 2,
    margin: [ 0, 1 ]
  })
  const keys = Object.keys(a)
  t.deepEqual(keys, [
    'margin',
    '@media screen and (min-width: 40em)',
    'marginBottom'
  ])
})

test('space returns padding declarations', t => {
  const dec = space({ padding: 1 })
  t.deepEqual(dec, { padding: '4px' })
})

test('space returns non-scalar paddings', t => {
  const a = space({ padding: 24 })
  const b = space({ padding: 'auto' })
  t.deepEqual(a, { padding: '24px' })
  t.deepEqual(b, { padding: 'auto' })
})

test('space returns directional paddings', t => {
  const tp = space({ paddingTop: 1 })
  const r = space({ paddingRight: 2 })
  const b = space({ paddingBottom: 3 })
  const l = space({ paddingLeft: 4 })
  const x = space({ px: 1 })
  const y = space({ py: 2 })
  t.deepEqual(tp, { 'paddingTop': '4px' })
  t.deepEqual(r, { 'paddingRight': '8px' })
  t.deepEqual(b, { 'paddingBottom': '16px' })
  t.deepEqual(l, { 'paddingLeft': '32px' })
  t.deepEqual(x, { 'paddingLeft': '4px', 'paddingRight': '4px' })
  t.deepEqual(y, { 'paddingTop': '8px', 'paddingBottom': '8px' })
})

test('space returns responsive paddings', t => {
  const a = space({ padding: [0, 1] })
  t.deepEqual(a, {
    padding: '0px',
    '@media screen and (min-width: 40em)': {
      padding: '4px'
    }
  })
})

test('space returns responsive directional paddings', t => {
  const a = space({ paddingTop: [0, 1], paddingBottom: [2, 3] })
  t.deepEqual(a, {
    paddingBottom: '8px',
    paddingTop: '0px',
    '@media screen and (min-width: 40em)': {
      paddingBottom: '16px',
      paddingTop: '4px'
    }
  })
})

test('space can be configured with a theme', t => {
  const a = space({ theme, margin: 1 })
  const b = space({ theme, margin: 2 })
  const c = space({ theme, margin: 3 })
  const d = space({ theme, margin: 4 })
  t.deepEqual(a, { margin: '6px' })
  t.deepEqual(b, { margin: '12px' })
  t.deepEqual(c, { margin: '18px' })
  t.deepEqual(d, { margin: '24px' })
})

// // new
// test('space takes theme as 2nd argument', t => {
//   const a = space({ m: [ 1, 2, 3 ], p: 'big' }, theme)
//   t.deepEqual(a, {
//     margin: '6px',
//     padding: '64px',
//     '@media screen and (min-width: 32em)': { margin: '12px' },
//     '@media screen and (min-width: 48em)': { margin: '18px' }
//   })
// })
//
// // new
// test('space theme in attrs take precedence', t => {
//   const a = space({
//     p: 'big',
//     theme: { space: { big: 999 } }
//   }, { space: { big: 333 } })
//   t.is(a.padding, '999px')
// })

test('space can accept string values', t => {
  const a = space({ margin: 1, padding: '7em' }, { space: [ '1em', '2em' ] })
  t.deepEqual(a, { margin: '2em', padding: '7em' })
})

test('space can accept string values with negative', t => {
  const a = space({ margin: -1 }, { space: ['1em', '2em'] })
  t.deepEqual(a, { margin: '-2em' })
})

test('space handles null values in arrays', t => {
  const a = space({
    margin: [ 0, null, 2 ]
  }, { space: [ 0, 4, 8, 16 ] })
  t.deepEqual(a, {
    margin: '0px',
    '@media screen and (min-width: 52em)': {
      margin: '8px'
    }
  })
})

// fixes #326
test('space handles mismatch between value and brakpoints array', t => {
  const a = space(
    { margin: [ 0, 2, 3, 4, 5, 6, 7 ] },
    { space: [ 0, 4, 8, 16, 21 ],
      breakpoints: [ '32em', '48em', '64em' ] }
  )
  t.deepEqual(a, {
    margin: '0px',
    '@media screen and (min-width: 32em)': {
      margin: '8px'
    },
    '@media screen and (min-width: 48em)': {
      margin: '16px'
    },
    '@media screen and (min-width: 64em)': {
      margin: '21px'
    }
  })
})

test('space handles alias values', t => {
  const a = space(
    { margin: 'large' },
    { space: { large: 9999 } } // theme
  )
  t.deepEqual(a, { margin: '9999px' })
})

// width

test('width returns percentage widths', t => {
  const a = width({ width: 1 / 2 })
  t.deepEqual(a, { width: '50%' })
})

test('width returns pixel values', t => {
  const a = width({ width: 256 })
  t.deepEqual(a, { width: '256px' })
})

test('width returns string values', t => {
  const a = width({ width: 'auto' })
  t.deepEqual(a, { width: 'auto' })
})

test('width returns responsive values', t => {
  const a = width({ width: [ 1, 1 / 2 ] })
  t.deepEqual(a, {
    width: '100%',
    '@media screen and (min-width: 40em)': { width: '50%' }
  })
})

test('width returns responsive pixel values', t => {
  const a = width({ width: [ 128, 256 ] })
  t.deepEqual(a, {
    width: '128px',
    '@media screen and (min-width: 40em)': { width: '256px' }
  })
})

test('width returns 0 value', t => {
  const a = width({ width: 0 })
  t.deepEqual(a, { width: '0%' })
})

test('width returns null ', t => {
  const a = width({})
  t.is(a, null || undefined)
})

// fontSize

test('fontSize returns scale values', t => {
  const a = fontSize({ fontSize: 0, theme: {} })
  const b = fontSize({ fontSize: 1, theme: {} })
  const c = fontSize({ fontSize: 2 })
  t.deepEqual(a, { 'fontSize': '12px' })
  t.deepEqual(b, { 'fontSize': '14px' })
  t.deepEqual(c, { 'fontSize': '16px' })
})

test('fontSize returns keyed values', t => {
  const a = fontSize({
    theme,
    fontSize: [ 3, 'big' ]
  })
  // t.is(a.fontSize, theme.fontSizes.big + 'px')
  t.deepEqual(a, {
    fontSize: '24px',
    '@media screen and (min-width: 32em)': { fontSize: '128px' }
  }, console.log(a))
})

test('fontSize returns pixel values', t => {
  const a = fontSize({ fontSize: 24 })
  t.deepEqual(a, { 'fontSize': '24px' })
})

test('fontSize returns string values', t => {
  const a = fontSize({ fontSize: '2em' })
  t.deepEqual(a, { 'fontSize': '2em' })
})

test('fontSize returns responsive values', t => {
  const a = fontSize({ fontSize: [1, 2] })
  t.deepEqual(a, {
    fontSize: '14px',
    '@media screen and (min-width: 40em)': {
      fontSize: '16px'
    }
  })
})

test('fontSize can be configured with a theme', t => {
  const a = fontSize({ theme, fontSize: 0 })
  const b = fontSize({ theme, fontSize: 1 })
  const c = fontSize({ theme, fontSize: 2 })
  const d = fontSize({ fontSize: 3 }, theme)
  const e = fontSize({ fontSize: 4 }, theme)
  const f = fontSize({ fontSize: 5 }, theme)
  t.deepEqual(a, { 'fontSize': '12px' })
  t.deepEqual(b, { 'fontSize': '16px' })
  t.deepEqual(c, { 'fontSize': '18px' })
  t.deepEqual(d, { 'fontSize': '24px' })
  t.deepEqual(e, { 'fontSize': '36px' })
  t.deepEqual(f, { 'fontSize': '72px' })
})

test('fontSize returns null or undefined', t => {
  const a = fontSize({})
  t.is(a, null || undefined)
})

// color

test('color returns color and backgroundColor styles', t => {
  const a = color({ color: 'tomato' })
  const b = color({ backgroundColor: 'pink' })
  t.deepEqual(a, { color: 'tomato' })
  t.deepEqual(b, { backgroundColor: 'pink' })
})

test('color returns theme.colors values', t => {
  const a = color({ theme, color: 'blue' })
  const b = color({ backgroundColor: 'green' }, theme)
  t.deepEqual(a, { color: theme.colors.blue })
  t.deepEqual(b, { backgroundColor: theme.colors.green })
})

test('color returns responsive values', t => {
  const a = color({ theme, color: [ 'blue', 'green' ] })
  t.deepEqual(a, {
    color: theme.colors.blue,
    '@media screen and (min-width: 32em)': {
      color: theme.colors.green
    }
  })
})

test('color works with array theme.colors', t => {
  const a = color({ color: 0 }, { colors: [ 'tomato', 'plum' ] })
  const b = color({ color: 1 }, { colors: [ 'tomato', 'plum' ] })
  const c = color({ color: 2 }, { colors: [ 'tomato', 'plum' ] })
  t.is(a.color, 'tomato')
  t.is(b.color, 'plum')
  t.is(c.color, 2)
  t.is(typeof c.color, 'number')
})

test('color keys support dot notation', t => {
  const a = color(
    { color: 'gray.2' },
    { colors: { gray: [ '#333', '#666', '#999' ] } }
  )
  t.is(a.color, '#999')
})
