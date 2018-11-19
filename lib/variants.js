import { createStyleVariantFn } from './util'

export const textStyle = createStyleVariantFn({
  prop: 'textStyle',
  key: 'textStyles'
})

export const colorStyle = createStyleVariantFn({
  prop: 'colors',
  key: 'colorStyles'
})

export const buttonStyle = createStyleVariantFn({
  key: 'buttons'
})
