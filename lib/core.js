import { addPx, createStyleFn, getWidth } from './util'

// space

export const space = createStyleFn({
  prop: [
    'margin',
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft',
    'mx',
    'my',
    'padding',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    'px',
    'py'
  ],

  cssProperty: [
    'margin',
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft',
    [ 'marginRight', 'marginLeft' ],
    [ 'marginTop', 'marginBottom' ],

    'padding',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    [ 'paddingRight', 'paddingLeft' ],
    [ 'paddingTop', 'paddingBottom' ]
  ],

  key: 'space',

  transformValue: addPx,

  scale: [ 0, 4, 8, 16, 32, 64, 128, 256, 512 ]
})

// width

function intercept (input) {
  const list = Object.keys(input || {})
  let res = {} // Object.assign({}, input)
  for (let i = 0; i < list.length; i++) {
    const k = list[i]
    const ik = input[k]
    if (ik === 'fill') {
      res['flex'] = '1 1 0%'
      res['flexBasis'] = '0%'
    } else if (ik === 'fit') {
      res['flexBasis'] = 'auto'
    } else if (typeof ik === 'object') res[k] = intercept(ik)
    else res[k] = ik
  }
  return res
}

export const widthSimple = createStyleFn({
  prop: 'width',
  transformValue: getWidth
})

export const width = (attrs, opts = {}) => {
  const val = attrs.width
  const fitOrFill = Array.isArray(val)
    ? (val.indexOf('fit') >= 0 || val.indexOf('fill') >= 0) // val.some(x => x === 'fit' || x === 'fill')
    : (val === 'fill' || val === 'fit')
  return fitOrFill ? intercept(widthSimple(attrs, opts)) : widthSimple(attrs, opts)
}

// fontSize

export const fontSize = createStyleFn({
  prop: 'fontSize',
  key: 'fontSizes',
  transformValue: addPx,
  scale: [
    12,
    14,
    16,
    20,
    24,
    32,
    48,
    64,
    72
  ]
})

// color

export const textColor = createStyleFn({
  prop: 'color',
  key: 'colors'
})

export const bgColor = createStyleFn({
  prop: 'backgroundColor',
  cssProperty: 'backgroundColor',
  key: 'colors'
})

export const color = createStyleFn({
  prop: [ 'color', 'backgroundColor' ],
  // cssProperty: [ 'color', 'backgroundColor' ],
  key: 'colors'
})
