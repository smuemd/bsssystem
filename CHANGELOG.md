
# Changelog

## v1.74 2018-12-07 

- Style yielding functions can be called with a custom theme by passing a theme-object as a second argument.
- Mapping of popular style prop abbreviations to corresponding css properties (e. g. `mt` to `marginTop`) is delegated downstream. The only exceptions are `mx`, `my`, `px` and `py` within the `space` function.
- Directly instrument style yielding functions with default values as a fallback in case no corresponding style props are present at call time.
- `backgrounds`, `borders`, `color`, `direction`, `flexbox`, `gridLayout`, `gridGaps`, and `space` functions bundle multiple style props each.
- remove [`prop-types`](https://github.com/facebook/prop-types) dependency.
-  the `width` function now accepts 'fit' and 'fill' prop values
- refactor of `get` utility function to accept excactly two arguments `obj :: Object` and `path :: Array`. No more destructuring. Dot notation in `path` strings is no longer supported out of the box.
- `num` utility renamed to **`isNum`**
- `px` transformation utility renamed to **`addPx`**
- removed `cloneFunc` utility
- `merge` utility renamed to **`mergeStyles`**
- `compose` utility is renamed to **`composeStyleFns`**
- `style` utility function renamed to **`createStyleFn`**
- `style` utility function refactored to now also accept arrays when passed as `prop` and `cssProptery` arguments.
- Removed `mixed` utility function

## v3.1.10 2018-10-10

- Convert numbers to pixels with keyed space values

## v3.1.9 2018-10-10

- Allow `getTheme` to return falsy values

## v3.1.8 2018-10-10

- Use Babel runtime

## v3.1.7 2018-10-10

- Fix for `breakpoints` numbers not being converted to pixels

## v3.1.6 2018-09-23

- Fix `.npmignore`

## v3.1.5 2018-09-23

- Update docs

## v3.1.4 2018-09-19

- Fix for passing falsy value as first item in array values

## v3.1.3 2018-09-14

- Add `module` field to package.json

## v3.1.2 2018-09-14

- Fix missing `styles` object keys

## v3.1.1 2018-09-14

- Patch to debug broken release

## v3.1.0 2018-09-11

- Upgrade to Babel 7

## v3.0.0

- Performance rewrite
- Simplified API
- Faster
- Smaller

### Added

- `variant`
- `compose`
- `css`

### Changed

- `style` utility is now responsive by default
- All built-in style functions now support responsive array values
- `backgroundImage` no longer wraps values with `url()`
- `buttonStyle` prop has been renamed to `variant`
- The `style` utility `getter` argument has beend renamed to `transformValue`
- `util.get` no longer supports a fallback argument

### Removed

- `propTypes[prop].meta` (temporarily removed)
- `responsiveStyle` use `style` instead
- `complexStyle` use `variant` instead
- `complexStyle` (`variant`) boolean props are no longer supported
- `pseudoStyle`
- `hover`
- `focus`
- `active`
- `disabled`
- `fontSize` and `width` no longer support shorthand props
- `alias` option
- `numberToPx` option (pass `util.px` to the `transformValue` argument instead)
- `util.media`
- `util.neg`
- `util.arr`
- `util.getWidth`
- `util.mq`
- `util.fallbackTheme`
- `util.breaks`
- `util.dec`
- `util.getValue`

## 2.3.0

### Added

- Metadata for supporting system-docs package

## 2.2.0

### Added

- CSS Grid utilities

## 2.1.0

### Changed

- Reorganized code base

## 2.0.0

### Added

- More utilities for CSS properties
- `fontFamily`
- `display`
- `minWidth`
- `height`
- `maxHeight`
- `minHeight`
- `size` (width & height)
- `alignContent`
- `order`
- `borders` utility that normalizes the API with other styled-system utilities
- `backgroundImage`
- `backgroundSize`
- `backgroundPosition`
- `zIndex`
- `top`
- `right`
- `bottom`
- `left`

### Changed

- Uses verbose naming convention for `textAlign`, `alignItems`, `justifyContent`, `flexWrap`, and other CSS properties
- `style`, `responsiveStyle`, and `pseudoStyle` utilities now accept `getter` and `getters` arguments for converting values
- Rewritten with ES module syntax
- DRYer code base for utilities like `fontSize`, `width`, and `color`
- The repo has been reorganized as a monorepo
- The `flexWrap` utility now expects a string value for its prop (previously a boolean)
- The `borderTop`, `borderRight`, `borderBottom`, and `borderLeft` props no longer accept boolean props, but follow the same convention as other utilities
- The default spacing scale has changed to `[ 0, 4, 8, 16, 32, 64, 128, 256, 512 ]` (this only affects usage without a custom `theme.space` provided
- Number values for breakpoints are now converted to px instead of ems to better match the rest of the library
- The `theme` utility has been renamed to `themeGet` (alternative names under consideration)
- The `pseudoStyle` arguments API has changed to more closely align with `style` and `responsiveStyle`

### Removed

- The `cleanElement` utility is now a separate package, removing the `react` dependency from the core library
- The `borderWidth` utility has been replaced with the `borders` utility
- The `theme` utility has been renamed to `themeGet` (alternative names under consideration)
- `removeProps` utility
- `idx` utility
- Legacy `responsiveStyle` arguments API


