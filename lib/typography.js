import { addPx, createStyleFn } from './util'

export const fontFamily = createStyleFn({
  prop: 'fontFamily',
  key: 'fonts'
})

export const fontWeight = createStyleFn({
  prop: 'fontWeight',
  key: 'fontWeights'
})

export const letterSpacing = createStyleFn({
  prop: 'letterSpacing',
  key: 'letterSpacings',
  transformValue: addPx
})

export const lineHeight = createStyleFn({
  prop: 'lineHeight',
  key: 'lineHeights'
})

export const fontStyle = createStyleFn({
  prop: 'fontStyle'
})

export const textAlign = createStyleFn({
  prop: 'textAlign'
})
