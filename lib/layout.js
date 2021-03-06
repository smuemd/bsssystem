// layout
import { addPx, createStyleFn } from './util'

export const maxWidth = createStyleFn({
  prop: 'maxWidth',
  key: 'maxWidths',
  transformValue: addPx
})

export const minWidth = createStyleFn({
  prop: 'minWidth',
  key: 'minWidths',
  transformValue: addPx
})

export const height = createStyleFn({
  prop: 'height',
  key: 'heights',
  transformValue: addPx
})

export const maxHeight = createStyleFn({
  prop: 'maxHeight',
  key: 'maxHeights',
  transformValue: addPx
})

export const minHeight = createStyleFn({
  prop: 'minHeight',
  key: 'minHeights',
  transformValue: addPx
})

// export const sizeWidth = createStyleFn({
//   prop: 'size',
//   cssProperty: 'width',
//   transformValue: addPx
// })
//
// export const sizeHeight = createStyleFn({
//   prop: 'size',
//   cssProperty: 'height',
//   transformValue: addPx
// })

// change width and height at the same time
export const size = createStyleFn({
  prop: 'size',
  cssProperty: [ 'width', 'height' ],
  transformValue: addPx
})

export const ratioPadding = createStyleFn({
  prop: 'ratio',
  cssProperty: 'paddingBottom',
  transformValue: n => (n * 100) + '%'
})

export const ratio = (attrs, theme) => attrs.ratio &&
  Object.assign({ height: 0 }, ratioPadding(attrs, theme))

export const verticalAlign = createStyleFn({
  prop: 'verticalAlign'
})

export const display = createStyleFn({
  prop: 'display'
})
