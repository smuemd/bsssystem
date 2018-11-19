import { addPx, createStyleFn, getBorder } from './util'

// borders

export const border = createStyleFn({
  prop: 'border',
  key: 'borders',
  transformValue: getBorder
})

export const borderTop = createStyleFn({
  prop: 'borderTop',
  key: 'borders',
  transformValue: getBorder
})

export const borderRight = createStyleFn({
  prop: 'borderRight',
  key: 'borders',
  transformValue: getBorder
})

export const borderBottom = createStyleFn({
  prop: 'borderBottom',
  key: 'borders',
  transformValue: getBorder
})

export const borderLeft = createStyleFn({
  prop: 'borderLeft',
  key: 'borders',
  transformValue: getBorder
})

// export const borders = compose(
//   border,
//   borderTop,
//   borderRight,
//   borderBottom,
//   borderLeft
// )

export const borders = createStyleFn({
  prop: [ 'border', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft' ],
  key: 'borders',
  transformValue: getBorder
})

export const borderColor = createStyleFn({
  prop: 'borderColor',
  key: 'colors'
})

export const borderRadius = createStyleFn({
  prop: 'borderRadius',
  key: 'radii',
  transformValue: addPx
})

export const boxShadow = createStyleFn({
  prop: 'boxShadow',
  key: 'shadows'
})

export const opacity = createStyleFn({
  prop: 'opacity'
})

export const overflow = createStyleFn({
  prop: 'overflow'
})
