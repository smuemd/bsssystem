// import PropTypes from 'prop-types'

// helper prop types
const numberOrString = x => x /* PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string
]) */

const responsive = x => x /* PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
  PropTypes.array
]) */

export const propTypes = {
  numberOrString, responsive
}

// defaultBreakpoints :: Array String
export const defaultBreakpoints = [ '40em', '52em', '64em' ]

// Identity :: a -> a
export function I (x) { return x }

// TODO redundant!!! rm from test
export function is (x) { return x != null }

// isNum :: Number -> Boolean
export function isNum (n) { return typeof n === 'number' }

// isEmpty a -> Boolean
export function isEmpty (object) {
  for (let key in object) if ({}.hasOwnProperty.call(object, key)) return false
  return true
}

// get :: (Object, Array) -> Object | void 0
export function get (object, path) {
  // const path = typeof aOrS === 'string' ? aOrS.split('.') : aOrS // .join('.').split('.')
  return path.reduce((obj, key) => obj == null ? undefined : obj[key], object)
}

export function themeGet (path, fallback) {
  return function ({ theme }) {
    const res = get(theme, path)
    return res != null ? res : fallback
  }
}

// clone :: f -> ...a -> f(...a)
export function cloneFn (f) { return (...a) => f(...a) }

// // mergeStyles :: (a :: Object, b :: Object) -> c :: Object
// export function mergeStyles (a = {}, b = {}) {
//   return Object.assign({}, a, b,
//     Object.keys(b || {}).reduce((acc, k) =>
//       Object.assign(acc, {
//         [k]: (a[k] != null && typeof a[k] === 'object')
//           ? Object.assign(a[k], b[k])
//           : b[k]
//       })
//     , {})
//   )
// }

export function mergeStyles (a = {}, b = {}) {
  const list = b != null ? Object.keys(b) : []
  const res = {}
  for (let i = 0; i < list.length; i++) {
    const A = a[list[i]]
    const B = b[list[i]]
    res[list[i]] = (typeof A === 'object') ? Object.assign({}, A, B) : B
  }
  return Object.assign({}, a, res)
}

// composeStyleFns :: Function -> (a :: Object, b :: Object?) -> Object
export const composeStyleFns = (...fns) => {
  function fn (attrs, theme = {}) {
    return fns.map(f => f(attrs, theme))
      .filter(Boolean)
      .reduce(mergeStyles, {})
  }

  fn.propTypes = fns
    .map(f => f.propTypes)
    .reduce(mergeStyles, {})

  return fn
}

// addPx :: a -> String | a
export function addPx (n) { return isNum(n) ? n + 'px' : n }

// getBorder :: a -> String | a
export function getBorder (n) { return n > 0 ? n + 'px solid' : n }

// getWidth :: a -> String
export function getWidth (n) { return (n > 1 || typeof n !== 'number') ? addPx(n) : (n * 100 + '%') }

// createStyle :: (a, b, c, d) -> Object<{ [a]: c(d(b)) }>
export function createStyle (cssProp, n, transform = I, getCssValue = I) {
  // if (Array.isArray(cssProp)) {
  //   let result = {}
  //   for (let item = 0; item < cssProp.length; item++) if (cssProp[item] != null) result[cssProp[item]] = transform(getCssValue(n))
  //   return result
  // } else return (cssProp != null) ? { [cssProp]: transform(getCssValue(n)) } : {}
  if (typeof cssProp === 'string') return { [cssProp]: transform(getCssValue(n)) }
  else {
    const result = {}
    for (let item = 0; item < cssProp.length; item++) result[cssProp[item]] = transform(getCssValue(n))
    return result
  }
}

// createResponsiveStyles :: (a, b c) -> Object
export function createResponsiveStyles (
  value = [],
  breakpoints = defaultBreakpoints,
  callCreateStyle = () => {}
) {
  const $media = breakpoints.map(n => `@media screen and (min-width: ${addPx(n)})`)
  let res = {}
  for (let i = 0; i < value.length; i++) {
    if (value[i] == null) continue
    if (i - 1 === -1) { res = callCreateStyle(value[i]); continue }
    if ($media[i - 1] != null) res[$media[i - 1]] = callCreateStyle(value[i])
  }

  // // reduce version
  // return value.reduce((acc, n, i) => {
  //   if (i-1 === -1) return callCreateStyle(n)
  //   else if ($media[i-1] != null) acc[$media[i-1]] = callCreateStyle(n)
  //   return acc
  // }, {})

  return res
}

export function $valueFrom (scale = {}) {
  // let V
  return function getCssValue (n) {
    // if (Array.isArray(n)) V = get(scale, n) || n
    // else if (typeof n === 'string') V = get(scale, n.split('.')) || n
    // else V = get(scale, [ (n < 0) ? Math.abs(n) : n ]) || n
    const V = Array.isArray(n)
      ? get(scale, n) || n
      : get(scale, typeof n === 'string' ? n.split('.') : [ (n < 0) ? Math.abs(n) : n ]) || n
    if (n < 0) return !isNum(V) ? '-' + V : -1 * Math.abs(V)
    return V
  }
}

export function createStyleFn ({
  prop, // customPropName
  cssProperty,
  key, // theme key
  transformValue,
  scale: defaultScale = {}
}) {
  function withDefaults (dfaults = {}) {
    const cssProp = cssProperty || prop
    const transform = transformValue || I

    function styleFn (attrs, opts = {}) {
      const theme = attrs.theme || opts
      const scale = get(theme, [key]) || defaultScale
      const $cssValue = $valueFrom(scale)

      if (!Array.isArray(prop)) {
        const value = (attrs[prop] != null) ? attrs[prop] : dfaults[prop]

        if (value == null) return undefined

        return !Array.isArray(value)
          ? createStyle(cssProp, value, transform, $cssValue)
          : createResponsiveStyles(
            value,
            get(theme, ['breakpoints']),
            n => createStyle(cssProp, n, transform, $cssValue))
      } else {
        const args = isEmpty(attrs) ? dfaults : attrs
        const list = Object.keys(args) // .sort() // has neg perf impact
        let result = {}

        for (let item = 0; item < list.length; item++) {
          const key = list[item]
          let index = null
          const value = args[prop.find((p, i) => { index = i; return p === key })]

          if (value == null) continue
          result = !Array.isArray(value)
            ? Object.assign(result, createStyle(cssProp[index], value, transform, $cssValue))
            : mergeStyles(result, createResponsiveStyles(
              value,
              get(theme, ['breakpoints']),
              n => createStyle(cssProp[index], n, transform, $cssValue)))
        }

        return result
      }
    }

    // styleFn.propTypes = !Array.isArray(prop)
    //   ? { [prop]: cloneFn(responsive) }
    //   : prop.reduce((acc, p) => {
    //     acc[p] = cloneFn(responsive)
    //     return acc
    //   }, {})
    //
    // Object.keys(styleFn.propTypes)
    //   .forEach(k => {
    //     styleFn.propTypes[k].meta = {
    //       prop: k,
    //       themeKey: key,
    //       styleType: 'responsive'
    //     }
    //   })

    styleFn.withDefaults = withDefaults

    if (!isEmpty(dfaults)) styleFn.defaultProps = dfaults

    return styleFn
  }

  return withDefaults()
}

export function createStyleVariantFn ({
  prop = 'variant',
  key
}) {
  return function styleVariant (attrs, opts) {
    return get(attrs.theme || opts, [key, attrs[prop]]) || undefined
  }

  // styleVariant.propTypes = { [prop]: numberOrString }

  // return styleVariant
}
