import { addPx, createStyleFn, getWidth } from './util'

// space
export const space = createStyleFn({
  prop: [
    'm', 'mt', 'mr', 'mb', 'ml', 'mx', 'my',
    'p', 'pt', 'pr', 'pb', 'pl', 'px', 'py'
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

export const width = createStyleFn({
  prop: 'width',
  transformValue: getWidth
})

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
  prop: 'bg',
  cssProperty: 'backgroundColor',
  key: 'colors'
})

export const color = createStyleFn({
  prop: [ 'color', 'bg' ],
  cssProperty: [ 'color', 'backgroundColor' ],
  key: 'colors'
})
