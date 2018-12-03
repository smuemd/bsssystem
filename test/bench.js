import test from 'ava'
import suite from 'chuhai'
import {
  space,
  width,
  widthSimple,
  fontSize,
  color,
  bgColor,
  createStyleFn
} from '../lib'
import { mergeStyles } from '../lib/util'

export function handleFns (fns = [], attrs = {}, theme) {
  // const res = pipe(...fns)(Object.assign({}, attrs, theme))
  let res = {}
  for (let i = 0; i < fns.length; i++) res = mergeStyles(res, fns[i](attrs, theme))
  return res // isEmpty(res) ? res : parse(res)
}

test('space fn', suite.macro, t => {
  let a
  let b

  t.cycle(() => {
    a && t.deepEqual(a, { margin: '8px' })
    b && t.deepEqual(b, {
      margin: '0px',
      '@media screen and (min-width: 40em)': { margin: '4px' },
      '@media screen and (min-width: 52em)': { margin: '8px' },
      '@media screen and (min-width: 64em)': { margin: '16px' }
    })
  })

  t.bench('[system thing] margin :: Integer', () => {
    a = space({ margin: 2 })
  })

  t.bench('[system thing] margin :: Array Integer', () => {
    b = space({
      margin: [ 0, 1, 2, 3 ]
    })
  })
})

test('widthSimple fn', suite.macro, t => {
  let a
  let b
  let c
  let d

  const expA = { width: '50%' }
  const expB = { width: '100%',
    '@media screen and (min-width: 40em)': { width: '50%' },
    '@media screen and (min-width: 52em)': { width: '33.33333333333333%' },
    '@media screen and (min-width: 64em)': { width: '25%' } }
  const expC = { width: '100%',
    '@media screen and (min-width: 40em)': { width: '2px' },
    '@media screen and (min-width: 52em)': { width: '3px' },
    '@media screen and (min-width: 64em)': { width: '4px' } }
  const expD = { width: 'auto' }

  t.bench('[system thing] widthSimple: width :: Float', () => {
    a = widthSimple({ width: 1 / 2 })
  })

  t.bench('[system thing] widthSimple: width :: Array Float', () => {
    b = widthSimple({ width: [ 1, 1 / 2, 1 / 3, 1 / 4 ] })
  })

  t.bench('[system thing] widthSimple: width :: Array Integer', () => {
    c = widthSimple({ width: [ 1, 2, 3, 4 ] })
  })

  t.bench('[system thing] widthSimple: width :: String', () => {
    d = widthSimple({ width: 'auto' })
  })

  t.cycle(() => {
    a && t.deepEqual(a, expA)
    b && t.deepEqual(b, expB)
    c && t.deepEqual(c, expC)
    d && t.deepEqual(d, expD)
  })
})

test('width (incl. fit and fill) fn', suite.macro, t => {
  let a
  let b
  let c
  let d
  let e
  let f
  let g

  const expA = { width: '50%' }
  const expB = { width: '100%',
    '@media screen and (min-width: 40em)': { width: '50%' },
    '@media screen and (min-width: 52em)': { width: '33.33333333333333%' },
    '@media screen and (min-width: 64em)': { width: '25%' } }
  const expC = { width: '100%',
    '@media screen and (min-width: 40em)': { width: '2px' },
    '@media screen and (min-width: 52em)': { width: '3px' },
    '@media screen and (min-width: 64em)': { width: '4px' } }
  const expD = { width: 'auto' }
  const expE = { flex: '1 1 0%', flexBasis: '0%' }
  const expF = { flexBasis: 'auto' }
  const expG = { width: '100%',
    '@media screen and (min-width: 40em)': { width: '50%' },
    '@media screen and (min-width: 52em)': { flex: '1 1 0%', flexBasis: '0%' },
    '@media screen and (min-width: 64em)': { width: '25%' } }

  t.bench('[system thing] width :: Float', () => {
    a = width({ width: 1 / 2 })
  })

  t.bench('[system thing] width :: Array Float', () => {
    b = width({ width: [ 1, 1 / 2, 1 / 3, 1 / 4 ] })
  })

  t.bench('[system thing] width :: Array Integer', () => {
    c = width({ width: [ 1, 2, 3, 4 ] })
  })

  t.bench('[system thing] width :: String (auto)', () => {
    d = width({ width: 'auto' })
  })

  t.bench('[system thing] width :: String (fill)', () => {
    e = width({ width: 'fill' })
  })

  t.bench('[system thing] width :: String (fit)', () => {
    f = width({ width: 'fit' })
  })

  t.bench('[system thing] width :: Array Float (fill)', () => {
    g = width({ width: [ 1, 1 / 2, 'fill', 1 / 4 ] })
  })

  t.cycle(() => {
    a && t.deepEqual(a, expA)
    b && t.deepEqual(b, expB)
    c && t.deepEqual(c, expC)
    d && t.deepEqual(d, expD)
    e && t.deepEqual(e, expE)
    f && t.deepEqual(f, expF)
    g && t.deepEqual(g, expG)
  })
})

test('fontSize fn', suite.macro, t => {
  let a
  let b

  t.bench('[system thing] fontSize :: Integer -> Object', () => {
    a = fontSize({ fontSize: 2 })
  })

  t.bench('[system thing] fontSize :: Array Integer -> Object', () => {
    b = fontSize({ fontSize: [ 1, 2, 3, 4 ] })
  })

  t.cycle(() => {
    a && t.deepEqual(a, { fontSize: '16px' })
    b && t.deepEqual(b, { fontSize: '14px',
      '@media screen and (min-width: 40em)': { fontSize: '16px' },
      '@media screen and (min-width: 52em)': { fontSize: '20px' },
      '@media screen and (min-width: 64em)': { fontSize: '24px' }
    })
  })
})

test('color fn', suite.macro, t => {
  let a
  let b

  t.bench('[system thing] color :: String -> Object', () => {
    a = color({ color: 'tomato' })
  })

  t.bench('[system thing] color :: Array String -> Object', () => {
    b = color({ color: [
      'red',
      'blue',
      'green',
      'cyan'
      // 'magenta'
    ] })
  })

  t.cycle(() => {
    a && t.deepEqual(a, { color: 'tomato' })
    b && t.deepEqual(b, { color: 'red',
      '@media screen and (min-width: 40em)': { color: 'blue' },
      '@media screen and (min-width: 52em)': { color: 'green' },
      '@media screen and (min-width: 64em)': { color: 'cyan' }
    })
  })
})

test('createStyleFn', suite.macro, t => {
  const f = createStyleFn({ prop: 'color' })
  let a

  t.bench('[system thing] create style fn', () => {
    createStyleFn({ prop: 'color' })
  })

  t.bench('[system thing] call style fn', () => {
    a = f({ color: 'tomato' })
  })

  t.cycle(() => {
    a && t.deepEqual(a, { color: 'tomato' })
  })
})

test('color bundle', suite.macro, t => {
  let a

  t.bench('bg color', () => {
    a = bgColor({ backgroundColor: 'black' })
  })

  t.bench('color (single prop)', () => {
    a = color({
      backgroundColor: 'black'
    })
  })

  t.cycle(() => {
    t.is(a.backgroundColor, 'black')
  })
})

test('downstream fns handler', suite.macro, t => {
  let a
  const expectA = {
    color: 'red',
    fontSize: '20px',
    paddingBottom: '17px',
    paddingLeft: '8px',
    paddingRight: '8px',
    width: '100%',
    '@media screen and (min-width: 40em)': {
      color: 'blue',
      fontSize: '24px',
      paddingLeft: '16px',
      paddingRight: '16px',
      width: '50%'
    },
    '@media screen and (min-width: 52em)': {
      color: 'green',
      fontSize: '32px',
      paddingLeft: '32px',
      paddingRight: '32px'
    },
    '@media screen and (min-width: 64em)': { color: 'magenta' }
  }

  t.cycle(() => {
    t.deepEqual(a, expectA)
  })

  t.bench('[style thing] handleFns mock', () => {
    a = handleFns(
      [ space, fontSize, width, color ],
      {
        paddingBottom: '17px',
        px: [ 2, 3, 4 ],
        fontSize: [ 3, 4, 5 ],
        width: [ 1, 1 / 2 ],
        color: [ 'red', 'blue', 'green', 'magenta' ]
      }
    )
  })
})
