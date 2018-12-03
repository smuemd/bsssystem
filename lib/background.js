import { createStyleFn } from './util'

// background

export const background = createStyleFn({
  prop: 'background'
})

export const backgroundImage = createStyleFn({
  prop: 'backgroundImage'
})

export const backgroundPosition = createStyleFn({
  prop: 'backgroundPosition'
})

export const backgroundRepeat = createStyleFn({
  prop: 'backgroundRepeat'
})

export const backgroundSize = createStyleFn({
  prop: 'backgroundSize'
})

export const backgrounds = createStyleFn({
  prop: [
    'background',
    'backgroundImage',
    'backgroundPosition',
    'backgroundRepeat',
    'backgroundSize'
  ]
})
