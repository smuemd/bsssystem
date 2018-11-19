import { mergeStyles } from './util'
import {
  space,
  // spaceExperimental,
  fontSize,
  color,
  bgColor,
  textColor,
  width
} from './core'

import {
  fontFamily,
  fontStyle,
  fontWeight,
  letterSpacing,
  lineHeight,
  textAlign
} from './typography'

import {
  display,
  height,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  size,
  sizeHeight,
  sizeWidth,
  ratio,
  ratioPadding,
  verticalAlign
} from './layout'

import {
  alignContent,
  alignItems,
  alignSelf,
  justifyContent,
  justifyItems,
  justifySelf,
  flex,
  flexBasis,
  flexDirection,
  flexWrap,
  order
} from './flexbox'

import {
  gridArea,
  gridAutoColumns,
  gridAutoFlow,
  gridAutoRows,
  gridColumn,
  gridColumnGap,
  gridGap,
  gridRow,
  gridRowGap,
  gridTemplateAreas,
  gridTemplateColumns,
  gridTemplateRows
} from './gridLayout'

import {
  background,
  backgroundImage,
  backgroundPosition,
  backgroundRepeat,
  backgroundSize
} from './background'

import {
  border,
  borderBottom,
  borderColor,
  borderLeft,
  borderRadius,
  borderRight,
  borders,
  borderTop,
  boxShadow,
  opacity,
  overflow
} from './misc'

import {
  bottom,
  left,
  top,
  right,
  // direction,
  position,
  zIndex
} from './position'

import {
  textStyle,
  colorStyle,
  buttonStyle
} from './variants'

const styles = {
  space,
  width,
  fontSize,
  textColor,
  bgColor,
  color,
  fontFamily,
  textAlign,
  lineHeight,
  fontWeight,
  fontStyle,
  letterSpacing,
  display,
  maxWidth,
  minWidth,
  height,
  maxHeight,
  minHeight,
  sizeWidth,
  sizeHeight,
  size,
  ratioPadding,
  ratio,
  verticalAlign,
  alignItems,
  alignContent,
  justifyItems,
  justifyContent,
  flexWrap,
  flexBasis,
  flexDirection,
  flex,
  justifySelf,
  alignSelf,
  order,
  gridGap,
  gridColumnGap,
  gridRowGap,
  gridColumn,
  gridRow,
  gridAutoFlow,
  gridAutoColumns,
  gridAutoRows,
  gridTemplateColumns,
  gridTemplateRows,
  gridTemplateAreas,
  gridArea,
  // borders
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  borders,
  borderColor,
  borderRadius,
  boxShadow,
  opacity,
  overflow,
  background,
  backgroundImage,
  backgroundPosition,
  backgroundRepeat,
  backgroundSize,
  position,
  zIndex,
  top,
  right,
  bottom,
  left,
  textStyle,
  colorStyle,
  buttonStyle
}

// mixed

// mixed
const omit = (obj, blacklist) => {
  const next = {}
  for (let key in obj) {
    if (blacklist.indexOf(key) > -1) continue
    next[key] = obj[key]
  }
  return next
}

const funcs = Object.keys(styles)
  .map(key => styles[key])
  .filter(fn => typeof fn === 'function')

const blacklist = funcs.reduce((acc, fn) => [
  ...acc,
  ...Object.keys(fn.propTypes || {})
], [ 'theme' ])

export const mixed = props => funcs
  .map(fn => fn(props))
  .reduce(mergeStyles, omit(props, blacklist))
