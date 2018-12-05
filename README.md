# System Thing

Responsive, theme-based style props for building design systems in ~~React~~ JavaScript

```sh
npm i systemthing
```

System Thing is a fork of the [styled-system libary](https://github.com/jxnblk/styled-system).

As with styled-system, this package contains a collection of css-style yielding functions that support the development of responsive and theme-based design systems in JavaScript

Unlike styled-system, this library is geared to also work with virtual dom libraries other than React.

## Features
System Thing provides pretty much the same functionality as the orignal [styled-system libary](),

plus:
+ Works with any virtual DOM view layer (e. g. [Mithril]())
+ works great in tandem with [bss]() and [Style-Thing](), two additional css-in-js utilities.

minus:
+ not used in [Rebass](https://rebassjs.org) et al.

### Table of Contents

- [Notable Differences](#notable-differences)
- [Usage](#usage)
- [Docs](#docs)
- [Related](#related)
<!-- TODO
- [Getting Started](#getting-started)
- [Further Reading](#further-reading)
-->

## Notable differences

While this fork tries to stay as close as possible to styled-system's original API, the following changes have been made:

### non-contextual themeing
Style yielding functions can be instrumented with a custom theme by passing a theme-object as a second argument.

```js
import { space, fontSize, color } from 'systemthing'

const theme = {
 breakpoints: [ '32em', '48em', '64em' ],
 space: [ 0, 6, 12, 18, 24 ],
 fontSizes: [ 12, 16, 18, 24, 36, 72 ],
 radii: [ 2, 4 ],
 colors: {
   blue: '#07c',
   green: '#1c0',
   gray: ['#ccc', '#555']
 }
}
                       
// aliases
theme.space.big = 64
theme.fontSizes.big = 128

const blue = color({ color: 'blue' }, theme) // yields { color: '07c' }
const big = fontSize({ fontSize: 'big' }, theme) // yields { fontSize: '128px' }
const butAlso = space({ padding: 'big', theme }) // yields { padding: '64px' }
```
Passing a theme as 2nd argument bypasses the dependency on [React `context`](https://reactjs.org/docs/context.html) and allows this fork to work in concert with any virtual DOM based view layer.

It is still possible however to also use `theme` as a prop on the first argument. Prop based themes take precedence. [Styled-system's]() original interface remains intact.

### No prop abbreviations
Mapping of popular style prop abbreviations to the corresponding css properties (e. g. `mt` to `marginTop`) is delegated downstream. 

The only exceptions are `mx`, `my`, `px` and `py` within the `space` function. For there are no css equivalents to these props. 

### Default values
It is possible to directly instrument all style yielding functions with default values as a fallback for when there are no corresponding style props present at call time.

```js
import { space } from 'systemthing'

const spaceWithDefaults = space.withDefaults({ padding: '1em' })

const spaced = spaceWithDefaults({ foo: 'bar' }) // { padding: '1em' }
```
Defaults are useful when defining responsive styles that do not require expensive re-computations down the line.

### Prop bundling
To minimize the number of downstream function calls, style props are bundled into a single function where possible.

```js
import { flexbox } from 'systemthing'

const flexing = flexbox({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'row-reverse'
})
```

The following prop function bundles are available:

#### 1. `backgrounds`
bundled props:
`background`,`backgroundImage`, `backgroundPosition`, `backgroundRepeat`, `backgroundSize`

#### 2. `borders`
bundled props:
`border`, `borderTop`, `borderRight`, `borderBottom`, `borderLeft`

#### 3. `color`
bundled props: 
`color`, `backgroundColor`

#### 4. ` direction`
bundled props:
`top`, `right`, `bottom`, `left`

#### 5. `flexbox`
bundled props:
`display`, `alignContent`, `alignSelf`, `justifyContent`, `justifyItems`, `justifySelf`,`flex`, `flexBasis`, `flexDirection`, `flexWrap`, `order`

#### 6. `gridLayout`
bundled props: 
`gridArea`, `gridAutoColumns`, `gridAutoFlo`', `gridAutoRows`, `gridRow`, `gridRowGap`, `gridTemplateAreas`, `gridTemplateColumns`, `gridTemplateRows`

#### 7. `gridGaps`
bundled props:
`gridColumnGap`,
`gridGap`,
`gridRow`,
`gridRowGap`,


#### 8. `space`
bundled props: 
`margin`, `marginTop`, `marginRight`, `marginBottom`, `marginLeft`, `mx`, `my`,
`padding`, `paddingTop`, `paddingRight`, `paddingBottom`, `paddingLeft`, `px`, `py`

### No PropTypes
This fork ships without external dependencies. Facebook's [`prop-types`](https://github.com/facebook/prop-types) have been removed. Instead type declaration is delegated downstream. Users need to be prepared to properly type out their components themselves, if necessary.

### low level changes

#### `get`
`get` accepts excactly two arguments `obj :: Object` and `path :: Array`. Destructuring of `get`'s `path` argument is not supported.

Hence, instead of writing:
```js
// wrong
let bingo = get({ path: { in: { obj: 'Bingo' } } }, 'path', 'in', 'obj')
```
you'd have to write:
```js
// correct
let bingo = get({ path: { in: { obj: 'Bingo' } } }, [ 'path', 'in', 'obj' ])
```

Secondly, dot notation in `path` strings is not supported out of the box.

The following statement will fail to produce the desired result:
```js
// wont work
let bingo = get({ path: { in: { obj: 'Bingo' } } }, [ 'path.in.obj' ])
```

Note: that refactoring the `get` get function apparently resulted in significant performance improvements for some style functions.

#### `num`
The `num` utility is renamed to `isNum`.

#### `px`
The `px` transformation utility is renamed to `addPx`.

#### `cloneFunc`
The `cloneFunc` utility has been removed together with the `prop-types` dependency.

#### `merge`
The `merge` utility is renamed to `mergeStyles`.

#### `compose`
The `compose` utility is renamed to `composeStyleFns`. (may be removed entirely, as it is only used in a benchmarking script)

#### `style`
The `style` utility function is renamed to `createStyleFn`.
Enabling prop bundling, the original function was refactored to also process array values provided as `prop` and `cssProptery` arguments.

```js
import { util } from 'systemthing'

const custom = util.createStyleFn({
  prop: [ 'display', 'overflow', 'opacity' ]
})

const result = custom({ display: 'none', overflow: 'hidden' })
```

#### `mixed`
The `mixed` utility has been removed entirely. No substitute / alternative is available at this point.

## Usage

This fork maintains most of [styled-system's original API]().
The library is meant to be used like this:

```js
// import style yielding functions and the utility functions
import { space, fontSize, util } from 'systemthing'

const props = {
  fontSize: [ 3, 4, 5 ],
  px: [ 1, 2, 3 ]
}

// pass style props into the style functions and merge their return values
const result = util.mergeStyles(
  space(props),
  fontSize(props))

// creates a responsively themed css style object that
// can then be processed downstream by many css-in-js libraries
console.log(result)

// > {
//   fontSize: '20px',
//   marginLeft: '4px',
//   marginRight: '4px',
//   '@media screen and (min-width: 40em)': {
//     fontSize: '24px',
//     marginLeft: '8px',
//     marginRight: '8px',
//   },
//   '@media screen and (min-width: 52em)': {
//     fontSize: '32px',
//     marginLeft: '16px',
//     marginRight: '16px',
//   }
// }

```

Usage in combination with downstream css-in-js libraries such as `styled-components` or `emotion` should also work [as advertised in styled-stystem's documentation]() (not tested).

```js
// Example uses styled-components, but systemthing works with most other css-in-js libraries as well
import styled from 'styled-components'
import { space, width, fontSize, color } from 'systemthing'

// Add styled-system functions to your component
const Box = styled.div`
  ${space}
  ${width}
  ${fontSize}
  ${color}
`
```
Please refer to the [styled-system's documentation]() for more details.

This fork also definitely works well in tandem with the more exotic [stylething]() utility: 

```js
import React from 'react'
import b from 'bss'
import { createStyler } from 'stylething'
import { space, width, fontSize, color } from 'systemthing'

const styled = createStyler(React, b, { mode: 'react', output: 'class' }) 

const Box = styled('.Box', space, width, fontSize, color)
``` 

Please refer to [Stylething's documentation]() for more details.

<!-- link shims for previous readme -->
<a name='getting-started'></a>
<a name='how-it-works'></a>
<a name='responsive-styles'></a>
<a name='api'></a>
<a name='system-components'></a>
<a name='default-theme'></a>
<a name='troubleshooting'></a>
<a name='cleanelement'></a>

## Docs

_TODO_

<!--
- [Getting Started](docs/getting-started.md)
- [Responsive Styles](docs/responsive-styles.md)
- [How it Works](docs/how-it-works.md)
- [API](docs/api.md)
  - [Core](docs/api.md#core)
    - [space](docs/api.md#space) (margins & paddings)
    - [width](docs/api.md#width)
    - [fontSize](docs/api.md#fontsize)
    - [color](docs/api.md#color) (and background-color)
  - [Typography](docs/api.md#typography)
  - [Layout](docs/api.md#layout)
  - [Flexbox](docs/api.md#flexbox)
  - [Borders](docs/api.md#borders)
  - [Position](docs/api.md#position)
  - [Misc](docs/api.md#misc)
  - [Variants](docs/api.md#variant)
  - [Utilities](docs/api.md#utilities)
    - [get](docs/api.md#get)
  - [Customize](docs/api.md#customize)
    - [style](docs/api.md#style)
    - [variant](docs/api.md#variant)
- [Table of Style Functions](docs/table.md)
- [Custom Props](docs/custom-props.md)
- [Troubleshooting](docs/troubleshooting.md)
-->

<!--

todo: react-scripts is borked

## Try It Out

Try the [examples](examples) on CodeSandbox

- [Basic](https://codesandbox.io/s/github/jxnblk/styled-system/tree/master/examples/basic)
- [Emotion](https://codesandbox.io/s/github/jxnblk/styled-system/tree/master/examples/emotion)
- [Theme Aliases](https://codesandbox.io/s/github/jxnblk/styled-system/tree/master/examples/theme-aliases)



## Further Reading

- [Component Based Design System With Styled-System][varun-post]

-->

## Related

- [styled-system]()
- [styled-components](https://github.com/styled-components/styled-components)
- [emotion]()https://github.com/emotion-js/emotion)
- [bss]()
- [stylething]()

[MIT License](LICENSE.md)
