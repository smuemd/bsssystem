import { addPx, createStyleFn } from './util'

// position

export const position = createStyleFn({
  prop: 'position'
})

export const zIndex = createStyleFn({
  prop: 'zIndex'
})

export const direction = createStyleFn({
  prop: ['top', 'right', 'bottom', 'left'],
  transformValue: addPx
})

export const top = createStyleFn({
  prop: 'top',
  transformValue: addPx
})

export const right = createStyleFn({
  prop: 'right',
  transformValue: addPx
})

export const bottom = createStyleFn({
  prop: 'bottom',
  transformValue: addPx
})

export const left = createStyleFn({
  prop: 'left',
  transformValue: addPx
})
