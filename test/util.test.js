import test from 'ava'

import { width } from '../lib/core'
import { display } from '../lib/layout'
import {
  addPx,
  createStyle,
  createStyleFn,
  createResponsiveStyles,
  composeStyleFns,
  createStyleVariantFn,
  defaultBreakpoints,
  get,
  getBorder,
  $valueFrom,
  getWidth,
  I,
  is,
  isEmpty,
  isNum,
  mergeStyles,
  themeGet
} from '../lib/util.js'

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

// themeGet

test('themeGet gets theme values', t => {
  const a = themeGet([ 'colors', 'gray', 0 ])({ theme })
  t.is(a, theme.colors.gray[0])
})

test('themeGet returns a fallback', t => {
  const a = themeGet([ 'colors', 'blue' ], 'tomato')({ theme: {} })
  t.is(a, 'tomato')
})

test('themeGet returns declared 0 rather than undefined', t => {
  const a = themeGet([ 'space', 0 ])({ theme })
  t.is(a, 0)
})

// is

test('is checks for non null values', t => {
  const a = is(null)
  const b = is()
  const c = is(0)
  const d = is('')
  const e = is(false)
  const f = is([])
  t.false(a)
  t.false(b)
  t.true(c)
  t.true(d)
  t.true(e)
  t.true(f)
})

// addPx

test('addPx adds px unit to numbers', t => {
  const a = addPx(1)
  const b = addPx('2em')
  t.is(a, '1px')
  t.is(b, '2em')
})

// isNum

test('isNum checks for a number', t => {
  const a = isNum(1)
  const b = isNum(0)
  const c = isNum('1')
  const d = isNum(null)
  t.true(a)
  t.true(b)
  t.false(c)
  t.false(d)
})

// mergeStyles

test('mergeStyles patches n level children object', t => {
  const a = mergeStyles({
    a: 'hello',
    b: { beep: 'boop' },
    c: {
      d: 2,
      e: 'f',
      g: { drill: 'baby, drill', even: { one: 'level deeper' } } }
  },
  {
    b: { hello: 'hi' },
    c: {
      g: { number: 3, even: { num: 4 } } }
  })

  t.deepEqual(a, {
    a: 'hello',
    b: { beep: 'boop', hello: 'hi' },
    c: {
      d: 2,
      e: 'f',
      g: {
        number: 3,
        drill: 'baby, drill',
        even: {
          one: 'level deeper',
          num: 4
        }
      }
    }
  })
})

test('mergeStyles works as reducer function', t => {
  const a = [
    { a: 'hello', b: { beep: 'boop' } },
    { b: { hello: 'hi' } }
  ].reduce(mergeStyles, { accumulator: 'initial' })

  t.deepEqual(a, {
    a: 'hello',
    accumulator: 'initial',
    b: {
      beep: 'boop',
      hello: 'hi'
    }
  })
})

test('mergeStyles doesn’t throw with null values', t => {
  t.notThrows(() => mergeStyles(null, null))
  t.deepEqual(mergeStyles(null, undefined), {})
})

test('mergeStyles don\'t deep merge arrays', t => {
  const a = mergeStyles({ array: [1, 2, 3] }, { array: 'overwritten' })

  t.is(a.array, 'overwritten')
})

// composeStyleFns

test('composeStyleFns combines style functions', t => {
  const combo = composeStyleFns(display, width)
  const a = combo({ display: 'inline-block', width: 1 / 2 })
  t.deepEqual(a, {
    display: 'inline-block',
    width: '50%'
  })
})

function handleFns (fns = [], attrs = {}) {
  return isEmpty(fns)
    ? {}
    : fns.reduce((acc, f) => mergeStyles(acc, f(attrs)), {})
}

test(
  'style thing \'handleFns\' is a downstream compose alternative',
  t => {
    const a = handleFns([
      display, width
    ], { display: 'inline-block', width: 1 / 2 })
    t.deepEqual(a, {
      display: 'inline-block',
      width: '50%'
    })
  }
)

test('get returns nested values', t => {
  const a = get({ colors: { blue: '#07c' } }, [ 'colors', 'blue' ])
  t.is(a, '#07c')
})

test('isEmpty detects empty object and arrays', t => {
  const a = isEmpty({ colors: { blue: '#07c' } })
  const b = isEmpty([ 1, 2, 3 ])
  const c = isEmpty({})
  const d = isEmpty([])
  const e = isEmpty(undefined)
  const f = isEmpty(null)
  t.false(a)
  t.false(b)
  t.true(c)
  t.true(d)
  t.true(e)
  t.true(f)
})

// createStyleFn / stylFn

test('createStyleFn returns a style function (styleFn)', t => {
  const sx = createStyleFn({
    prop: 'color',
    key: 'colors'
  })
  t.is(typeof sx, 'function')
})

test('styleFn returns a style object', t => {
  const sx = createStyleFn({
    prop: 'color',
    key: 'colors'
  })

  const a = sx({ color: 'tomato' })

  t.is(typeof a, 'object')
  t.deepEqual(a, { color: 'tomato' })
})

test('styleFn returns null or undefined', t => {
  const sx = createStyleFn({
    prop: 'color'
  })
  const a = sx({})
  t.is(a, null || undefined)
})

test('styleFn returns scale values', t => {
  const sx = createStyleFn({
    key: 'colors',
    prop: 'color'
  })
  const a = sx({ color: 'blue' }, { colors: { blue: '#07c' } })
  t.is(a.color, '#07c')
})

test('styleFn returns pixels for number values', t => {
  const sx = createStyleFn({
    prop: 'borderRadius',
    transformValue: addPx
  })
  const a = sx({ borderRadius: 4 }, {}) // no theme
  t.is(a.borderRadius, '4px')
})

test('styleFn returns unitless number values', t => {
  const sx = createStyleFn({ prop: 'borderRadius' })
  const a = sx({
    borderRadius: 4,
    theme: {}
  })
  t.is(a.borderRadius, 4)
})

test('styleFn accepts a transformValue callback', t => {
  const sx = createStyleFn({
    prop: 'width',
    transformValue: n => {
      return (!isNum(n) || n > 1) ? addPx(n) : (n * 100 + '%')
    }
  })
  const a = sx({ width: 1 / 2 })
  const b = sx({ width: 24 })
  t.is(a.width, '50%')
  t.is(b.width, '24px')
})

test('createStyleFn allows property aliases', t => {
  const direction = createStyleFn({
    cssProperty: 'flex-direction',
    prop: 'flexDir'
  })
  const a = direction({ flexDir: 'column' })
  t.deepEqual(a, {
    'flex-direction': 'column'
  })
})

test('styleFn allows array values', t => {
  const sx = createStyleFn({
    cssProperty: 'flex-direction',
    prop: 'flexDir'
  })
  const a = sx({ flexDir: [ 'column', null, 'row' ] })
  t.deepEqual(a, {
    'flex-direction': 'column',
    '@media screen and (min-width: 52em)': {
      'flex-direction': 'row'
    }
  })
})

test('styleFn returns pixel values for number arrays', t => {
  const radius = createStyleFn({
    cssProperty: 'borderRadius',
    prop: 'radius',
    transformValue: addPx
  })
  const a = radius({ radius: [ 4, 5, 6 ] })
  t.deepEqual(a, {
    borderRadius: '4px',
    '@media screen and (min-width: 40em)': {
      borderRadius: '5px'
    },
    '@media screen and (min-width: 52em)': {
      borderRadius: '6px'
    }
  })
})

test('styleFn returns a theme value', t => {
  const sx = createStyleFn({
    prop: 'borderColor',
    key: 'colors'
  })
  const a = sx({
    theme,
    borderColor: [
      'blue',
      'green'
    ]
  })
  const b = sx({ borderColor: [ 'blue', 'green' ] }, theme)

  t.deepEqual(a, {
    borderColor: theme.colors.blue,
    '@media screen and (min-width: 32em)': {
      borderColor: theme.colors.green
    }
  })
  t.deepEqual(a, b)
})

test('styleFn returns a theme number value in px', t => {
  const sx = createStyleFn({
    prop: 'borderRadius',
    key: 'radii',
    transformValue: addPx
  })
  const a = sx({
    theme,
    borderRadius: [ 0, 1 ]
  })
  t.deepEqual(a, {
    borderRadius: theme.radii[0] + 'px',
    '@media screen and (min-width: 32em)': {
      borderRadius: theme.radii[1] + 'px'
    }
  })
})

test('styleFn has a \'withDefaults\' method', t => {
  const sx = createStyleFn({ prop: 'fontSize' })
  const { withDefaults } = sx
  t.is(typeof withDefaults, 'function')
})

test(
  'styleFn.withDefaults(defaults) returns a styleFn with default values',
  t => {
    const sx =
      createStyleFn({
        prop: 'fs',
        cssProperty: 'fontSize',
        transformValue: addPx
      })
        .withDefaults({ fs: 33 })

    const a = sx({})

    t.is(a.fontSize, '33px')
  }
)

test('createStyleFn accepts multiple props passed as an array', t => {
  const borders = createStyleFn({
    prop: [
      'border',
      'borderTop',
      'borderRight',
      'borderBottom',
      'borderLeft'
    ],
    transformValue: getBorder
  })

  const a = borders({
    borderTop: 1,
    borderRight: 2,
    borderBottom: 3,
    borderLeft: 4
  })

  const b = borders({ border: [ 0, '2px dotted pink' ] })

  t.deepEqual(a, {
    borderTop: '1px solid',
    borderRight: '2px solid',
    borderBottom: '3px solid',
    borderLeft: '4px solid'
  })

  t.deepEqual(b, {
    border: 0,
    '@media screen and (min-width: 40em)': { border: '2px dotted pink' }
  })
})

test(
  'createStyleFn allows to alias ' +
  'multiple cssPropperties (key mappings with Arrays)',
  t => {
    const space = createStyleFn({
      prop: [
        'mx',
        'mt',
        'mb'
      ],

      cssProperty: [
        [ 'marginRight', 'marginLeft' ],
        'marginTop',
        'marginBottom'
      ],

      key: 'space',

      transformValue: addPx,

      scale: [ 0, 4, 8, 16, 32, 64, 128, 256, 512 ]
    })

    const a = space({
      mx: [ 2, 3, 4, 5 ],
      mt: [ 2, 3, 4 ],
      mb: [ 4, 3, 'initial' ]
    }, theme)

    const spaceWithDefaults = space.withDefaults({ mx: [ '1em', '4em', 'auto' ] })
    const b = spaceWithDefaults({}, theme)

    t.deepEqual(a, {
      marginTop: '12px',
      marginBottom: '24px',
      marginLeft: '12px',
      marginRight: '12px',
      '@media screen and (min-width: 32em)': {
        marginTop: '18px',
        marginBottom: '18px',
        marginLeft: '18px',
        marginRight: '18px'
      },
      '@media screen and (min-width: 48em)': {
        marginTop: '24px',
        marginBottom: 'initial',
        marginLeft: '24px',
        marginRight: '24px'
      },
      '@media screen and (min-width: 64em)': {
        marginLeft: '5px',
        marginRight: '5px'
      }
    })
    t.is(b['@media screen and (min-width: 48em)'].marginLeft, 'auto')
    t.is(b['@media screen and (min-width: 48em)'].marginRight, 'auto')
  }
)

// theme

test('styleFn can be configured with a theme attr', t => {
  const sx = createStyleFn({ prop: 'm', cssProperty: 'margin' })
  const a = sx({ theme, m: [1, 2, 3, 4] })
  const [b, c, d, e] = Object.keys(a)
  t.is(b, 'margin')
  t.is(c, '@media screen and (min-width: 32em)')
  t.is(d, '@media screen and (min-width: 48em)')
  t.is(e, '@media screen and (min-width: 64em)')
})

// new
test('styleFn accepts theme also as a 2nd argument', t => {
  const sx = createStyleFn({ prop: 'm', cssProperty: 'margin' })
  const a = sx({ m: [1, 2, 3, 4] }, theme)
  const [b, c, d, e] = Object.keys(a)
  t.is(b, 'margin')
  t.is(c, '@media screen and (min-width: 32em)')
  t.is(d, '@media screen and (min-width: 48em)')
  t.is(e, '@media screen and (min-width: 64em)')
})

// new
test('styleFn theme in attrs take precedence', t => {
  const sx = createStyleFn({
    prop: 'p',
    cssProperty: 'padding',
    key: 'space',
    transformValue: addPx
  })

  const a = sx({
    p: 'big',
    theme: { space: { big: 999 } }
  }, { space: { big: 333 } })

  t.is(a.padding, '999px')
})

test('createStyle creates style object for css property', t => {
  const s = createStyle('marginTop', 3, addPx, I)
  t.is(s.marginTop, '3px')
})

test('createStyle creates style object for an array of css propterties', t => {
  const s = createStyle([ 'marginTop', 'marginRight' ], 3, addPx, I)
  t.deepEqual(s, {
    marginTop: '3px',
    marginRight: '3px'
  })
})

test('createResponsiveStyles creates style object ' +
  'from an array of values and a scale array', t => {
  const sr = createResponsiveStyles([ 13, 17, 21 ], defaultBreakpoints, n => createStyle('fontSize', n, addPx, I))

  t.deepEqual(sr, {
    fontSize: '13px',
    '@media screen and (min-width: 40em)': {
      fontSize: '17px'
    },
    '@media screen and (min-width: 52em)': {
      fontSize: '21px'
    }
  })
})

test('getValueFrom takes theme object as argument ' +
  'and returns getCssValue function', t => {
  const gcv = $valueFrom({ gray: [ '#333', '#666', '#999' ] })
  const a = gcv('gray.2')
  const b = gcv([ 'gray', 2 ])
  // const c = gcv([ 'gray.2' ])
  t.is(typeof gcv, 'function')
  t.is(a, '#999')
  t.is(b, a)
  // t.is(c, b)
})

test('getcssValue can be combined with tranformValue functions', t => {
  const gcv = $valueFrom({})
  const a = getWidth(gcv(0))
  const b = getBorder(gcv(1))
  const c = addPx(gcv(3))
  t.is(a, '0%')
  t.is(b, '1px solid')
  t.is(c, '3px')
})

test('styleVariant returns a value from theme', t => {
  const theme = {
    buttons: {
      primary: {
        backgroundColor: 'tomato'
      }
    }
  }
  const a = createStyleVariantFn({ key: 'buttons' })({ theme, variant: 'primary' })

  t.deepEqual(a, theme.buttons.primary)
})

test('styleVariant returns null or undefined', t => {
  const theme = {}
  const a = createStyleVariantFn({
    key: 'buttons'
  })({
    theme, variant: 'primary'
  })
  t.true(a == null)
})
