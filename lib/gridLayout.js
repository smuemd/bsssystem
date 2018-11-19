import { addPx, createStyleFn } from './util'

// grid

export const gridArea = createStyleFn({
  prop: 'gridArea'
})

export const gridAutoColumns = createStyleFn({
  prop: 'gridAutoColumns'
})

export const gridAutoFlow = createStyleFn({
  prop: 'gridAutoFlow'
})

export const gridAutoRows = createStyleFn({
  prop: 'gridAutoRows'
})

export const gridColumn = createStyleFn({
  prop: 'gridColumn'
})

export const gridColumnGap = createStyleFn({
  prop: 'gridColumnGap',
  transformValue: addPx,
  key: 'space'
})

export const gridGap = createStyleFn({
  prop: 'gridGap',
  transformValue: addPx,
  key: 'space'
})

export const gridRow = createStyleFn({
  prop: 'gridRow'
})

export const gridRowGap = createStyleFn({
  prop: 'gridRowGap',
  transformValue: addPx,
  key: 'space'
})

export const gridTemplateAreas = createStyleFn({
  prop: 'gridTemplateAreas'
})

export const gridTemplateColumns = createStyleFn({
  prop: 'gridTemplateColumns'
})

export const gridTemplateRows = createStyleFn({
  prop: 'gridTemplateRows'
})
