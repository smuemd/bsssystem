import { createStyleFn, getWidth } from './util'

export const alignContent = createStyleFn({
  prop: 'alignContent'
})

export const alignItems = createStyleFn({
  prop: 'alignItems'
})

export const alignSelf = createStyleFn({
  prop: 'alignSelf'
})

export const justifyContent = createStyleFn({
  prop: 'justifyContent'
})

export const justifyItems = createStyleFn({
  prop: 'justifyItems'
})

export const justifySelf = createStyleFn({
  prop: 'justifySelf'
})

export const flex = createStyleFn({
  prop: 'flex'
})

export const flexBasis = createStyleFn({
  prop: 'flexBasis',
  transformValue: getWidth
})

export const flexDirection = createStyleFn({
  prop: 'flexDirection'
})

export const flexWrap = createStyleFn({
  prop: 'flexWrap'
})

export const order = createStyleFn({
  prop: 'order'
})

// textAlign ?

export const flexbox = createStyleFn({
  prop: [
    'display',
    'alignContent',
    'alignItems',
    'alignSelf',
    'justifyContent',
    'justifyItems',
    'justifySelf',
    'flex',
    'flexBasis',
    'flexDirection',
    'flexWrap',
    'order'
  ]
})
