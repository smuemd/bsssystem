# A System Thing

Responsive, theme-based style props for building design systems in ~~React~~ JavaScript

```sh
npm i systemthing
```

This repository is a fork of the [styled-system](https://github.com/jxnblk/styled-system).

As with styled-system, this fork presents a collection of css-style yielding functions that support the development of responsive and theme-based design systems in JavaScript.

Unlike styled-system, this implementation is geared to also work with virtual dom libraries other than React.

## Features

This fork provides the same core functionality found in the [orignal styled-system libary](https://github.com/jxnblk/styled-system#features),

plus:
+ Works with any virtual DOM view layer (e. g. [Mithril](https://mithril.js.org/)
+ Works great in tandem with [bss](https://github.com/porsager/bss) and [stylething](https://github.com/smuemd/stylething).

minus:
+ Social proof, i. e. not used in [Rebass](https://rebassjs.org) et al.

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

While this implementation tries to stay as close as possible to [styled-system's original API](https://github.com/jxnblk/styled-system/blob/master/docs/api.md), the following changes were made:

### non-contextual theming

Style yielding functions can be called with a custom theme by passing a theme-object as a second argument.

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
Passing a theme as 2nd argument bypasses [React `context`](https://reactjs.org/docs/context.html) and allows this implementation to work in concert with any virtual DOM based view layer.

It is still possible however to also use `theme` as a prop on the first argument. Prop based themes take precedence. [styled-system's original theming mechanism](https://github.com/jxnblk/styled-system/blob/master/docs/theming.md) remains intact.

### No prop abbreviations

Mapping of popular style prop abbreviations to corresponding css properties (e. g. `mt` to `marginTop`) is delegated downstream. 

The only exceptions are `mx`, `my`, `px` and `py` within the `space` function. For there are no css equivalents to these props. 

### Default values

It is possible to directly instrument style yielding functions with default values as a fallback in case no corresponding style props are present at call time.

```js
import { space } from 'systemthing'

const spaceWithDefaults = space.withDefaults({ padding: '1em' })

const spaced = spaceWithDefaults({ foo: 'bar' }) // { padding: '1em' }
```
Responsive default styles may be useful for defining components that do not require expensive style re-computations down the line.

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
The following prop bundles are available:

#### 1. `backgrounds`
bundled props:
`background`,
`backgroundImage`,
`backgroundPosition`,
`backgroundRepeat`,
`backgroundSize`

#### 2. `borders`
bundled props:
`border`,
`borderTop`,
`borderRight`,
`borderBottom`,
`borderLeft`

#### 3. `color`
bundled props: 
`color`,
`backgroundColor`

#### 4. ` direction`
bundled props:
`top`,
`right`,
`bottom`,
`left`

#### 5. `flexbox`
bundled props:
`display`,
`alignContent`,
`alignSelf`,
`justifyContent`,
`justifyItems`,
`justifySelf`,
`flex`,
`flexBasis`,
`flexDirection`,
`flexWrap`,
`order`

#### 6. `gridLayout`
bundled props: 
`gridArea`,
`gridAutoColumns`,
`gridAutoFlo`',
`gridAutoRows`,
`gridRow`,
`gridRowGap`,
`gridTemplateAreas`,
`gridTemplateColumns`,
`gridTemplateRows`

#### 7. `gridGaps`
bundled props:
`gridColumnGap`,
`gridGap`,
`gridRow`,
`gridRowGap`,

#### 8. `space`
bundled props: 
`margin`,
`marginTop`,
`marginRight`,
`marginBottom`,
`marginLeft`,
`mx`,
`my`,
`padding`,
`paddingTop`,
`paddingRight`,
`paddingBottom`,
`paddingLeft`,
`px`,
`py`

### No PropTypes
This fork ships without external dependencies. Facebook's [`prop-types`](https://github.com/facebook/prop-types) has been removed. Instead type declaration is delegated downstream. Users of this fork have to be prepared to properly type out components themselves, if necessary.

### Width fit & fill
The `width` style yielding function accepts two additional prop values:
- `{ width: 'fit }` - Make an element shrink wrap its content with `flex-basis`.
- `{ width: 'fill}` - Make an element fill the remaining space. Distribute space evenly on multiple elements.

### low level changes

#### `get`
The `get` utility function accepts excactly two arguments `obj :: Object` and `path :: Array`. `get`'s `path` argument is not being destructured.

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
Secondly, dot notation in `path` strings is not supported out of the box. The following statement will fail to produce the desired result:
```js
// wont work
let bingo = get({ path: { in: { obj: 'Bingo' } } }, [ 'path.in.obj' ])
```
Note: Refactoring the `get` function apparently resulted in significant performance improvements for some style functions.

#### `num`
The `num` utility is renamed to `isNum`.

#### `px`
The `px` transformation utility is renamed to `addPx`.

#### `cloneFunc`
The `cloneFunc` utility has been removed together with the `prop-types` dependency.

#### `merge`
The `merge` utility is renamed to `mergeStyles`.

#### `compose`
The `compose` utility is renamed to `composeStyleFns`. (may be removed entirely, as it is only used in a benchmarking script right now)

#### `style`
The `style` utility function is renamed to `createStyleFn`.
The original function was refactored to also process arrays when passed as `prop` and `cssProptery` arguments. This enables the prop bundling functionality described above.

```js
import { util } from 'systemthing'

const custom = util.createStyleFn({
  prop: [ 'display', 'overflow', 'opacity' ]
})

const result = custom({ display: 'none', overflow: 'hidden' })
```

#### `mixed`
The `mixed` utility has been removed entirely.

## Usage

This implementation maintains most of [styled-system's original API](https://github.com/jxnblk/styled-system/blob/master/docs/api.md).

Here is an idiomatic usage example:
```js
// Usage in tandem with compatible css-in-js lib is recommended
// Example uses bss, but systemthing works with most other css-in-js libraries as well
import b from 'bss'
import { color, fontSize, util } from 'systemthing'

// custom theme
const theme = {
 breakpoints: [ '32em', '48em', '64em' ],
 space: [ 0, 6, 12, 18, 24 ],
 fontSizes: [ 12, 16, 18, 24, 36, 72 ],
 colors: {
   blue: '#07c',
   green: '#1c0',
   grays: [ '#ccc', '#555', '#ddd' ]
 }
}

// define style props
const props = {
  // responsive background-color (theme.colors)
  backgroundColor: [ 'blue', 'green', 'grays.1', 'grays.2' ],
  // responsive font-size of 24px, 36px or 72px (theme.fontSizes)
  fontSize: [ 3, 4, 5 ],
  // theme passed as prop
  theme
}

// pass style props into the style functions and merge their return values
const result = util.mergeStyles(color(props), fontSize(props))

// result is a responsively themed css style object that
// can then be processed downstream by many css-in-js libraries
const classy = b(result).class

document.body.classList.add(classy)
document.body.appendChild(
  document.createTextNode(
    'Responsively themed! (resize the window!)'))

```
A live version of this script is [available on flems](https://flems.io/#0=N4IgtglgJlA2CmIBcBWAjAOhQFgDQgGMB7AOwGciFlDLYBDABzPihHwDMIEzkBtUEnTCIkIDAAsALmFhsaJSfAXUAPFAgA3AATQAvAHIyATzKKwk8RBIBzALTwAHkIYJ9APhUB6dRrdzmCASSEKQ8ogAMSACctpEATAAcIAC+uAJCIiDGpvDmljYYAFY8+MQKSpLUABTsAK4kQSEkWlXWsEQARnSwuFrsdEFEAE5GAJRawAA6zVqSRgzwROxajgzDkmRautta+p2F8EH6WgBkJ7Pzi8tgRFC1CFoAhDv69VDwnCQsxwD8fQOSYZGKqrdZkcZIaZaC4LJZad6feBbF51BrBUjHM7wj5WeAYIRQLR-BG4qq8fSgoYbfQAXV6-UGIwhUJaDMBIyqrXaXVgGGyZgsVmsWwmyVG4oA3NNklVBWRejV6o1SC1KRtxsBdrVmFpTEMIEcpSQWRo6EMtAB9DqwEgAawA8h1CiLgMkjSzPJ5sf17pIAEJDeB0W1rKwbLRIJBaACCQyGdCMWgAypJ9TYTWbvXRfQGgyGiGHNrotLxdthwrl9L19Cg4pXqwA2bCVrQ090zT1aACS7wUEDmEajdC0tjcWjoLNRyuaXZaDg1WkDklqQ2aDi0yWmHq9EDIADlamBB1oD2AOvBzaOtH6iJQg8aZlP0c1d6eWiQF0uV805rDls1tmLfQSEPc8hmOTcH2hJ8mh0MgAFEwAYAcqn2DUWWhTt2GGFoEEkLRbXgRMrC0fZDkkcYIGWKpxDoMh7QAdxIDACG6WBUKdcjekIsZxi-Vd-lgZgMK0Tt+J-IZangETTXNBhAxFWN4yMDBdyUhMOMKUYROhP59h0iMtEdA4ggwHiyE0p5ixA2BYCJUinUMq0bQdJ1RiNaFoXErR5LxBAbAsZFi3CFlIO3LRrHgfDIxaYyuJjOME3GK84qCLQAB8tA0AtCRCx8lWfCKopaMigl6Bg6AsdCZkwr0ylMHzKvEEVfyucd7SGJMgt2PUhV+drOr5Fx+yqfQMH0CEBq6zsigLEhRvG0YhtgEaxomkTvIqiwMEDO4CHgRU0VgzTuKIz8ou-BznR2Gy7L+N4cS+Qko32XgeLbDdelKijQq3fKjpVCxcngABxYqqi28R6TYroCFtarPMXC6BJglUqkDdgEcRrLMyB4QRQxjA8fgdtsZx81AyLIrJFlcRgfKpr3IM7zKasrRbvs1mo36WzYdtETIOhMKOzq9ovmPZYrwwaXhyvdgqml-FtJFlYHDWKk+gK2CCDF+AADFmhqc7lwEhWZfGXQx3lxW6HGYXap0MAwFqSQ6GtJFUskfEyDICBrB-Wj8K2gg6c2ZoEA0eA7JDrgoEDKDRK9YQhkilMjG4Y8qjoXoOmSsdPcnLWVWT1O5gzrOc6x6EqJacduuy6AtHCLRxmHYtnLtYyPM8muqi0Dp65ypuW-7kUO9cwpSc82StBWhri09syiIsgf0sy8fjKZmryaRqnF7o33-aqV1elt7uHew80qnq-DbR0Zpc4mETL5aGeIBFcIJR0LQVFn3cvf8tYCwX8IAAGpQFV2npmO+xY56SF4BANsBkZ7BhFHQN6SDt7Qhnh0GB-cMHn08pTDBIpZSXDhKgwCuxvqYnOI8dSKk1KJWBMGcU9kS7wDTtwLOtoc7w0MrgwhgsiHI2aJTX6CdOx0BgAABXXDFWWY4UxpmFJlCc-1pzjlkeuKoH4JhIxNi+fch5dHjD+M0UBuwGAOGOFGZo9tE7UxvEMd45oFEjiUamIUGVxyFwBs0SK-phiuPfMbS6zQxzN3MVoSx+hrG6koNAWx7MNx-QdoEgA6tAQK7irzKKFH4zRmTsnNVMfo7yuitBjjQBlTKrU4TNGeEBECZ4LwTXstIqAciylRkqQAKi0GgcIzdYkAFJ2kOM7AQQMlVOFlyRDFCu-degEF6FAPORlOJBBUJqXgdAaRRgIFUKAVRc52zcIUwq0ygyKC4Uia+PsZFDCIAwXoJBeipjoOQS+YBeiBIAMI+wAGrdCkpAme+wp7V2orMeM3zhhHioQ3XKI9PnwqGIi7shDe7U0BWQEFsApKD0bs3cYALgWgqRMWLshDOy9wYapMgDCHlkCeS8thUxt6dmhHhXevoXTCIdtBHCVReX9lyB-EBZgf5aAII855DAMCAOAToMw4DKLUTlayhVCCzA0jZrdPi8AyC+l4FqtlDBdW5BpPq4saKyA-NaFFPFBKpKmOVojblBjLqU19CJTsyQVhCSRBU81CqDX3FgGY-RZr5UvIObCr5DqEVOskC6yl7qNyGVdCJXu9Tlhhped1QwXibDtM1BUq6AqvpOljdq+NLU4XJoxam9NhKDoflGDW50dsRJRx1JysmM9fWwHwsWV0hDhVXzftK4KUqJW-0LYq5V4h51gHVeU41pql1WrADaxtSbHXkvxRmztX9BUiMMXy0dAsJHhWubMgASsatY5BNBzPTsazO2dR4EA2QXDRVyZmKGfWQV9vtI53M2FUGSlLcAiQ6DM-MhZ4Pb1YrZf5wGP0IBZJAnFpp23EpReMAjRLiy8EwYjHFiG8yhgUEWHYyLh7jBo8GOj4ZiwImzKO3MbG5obGxTC9DsBMM3Ow1SxjQ9SWyrYqJ2ZdyRSo0NhqN0aSoHmgACTCHUG3fuSH2NkAwGARgh1NFlIraIlokwQAAAFtMQGHGQa5ShxwkEJFUSAJBbAMRKVGazMSWidO6Z2gL1ntIgHchuLeiNh1fvHap7eL8qhv0ld-X+pG-JKCAaunQG7B3Y17hlhBtrrKRoXGUYIIEkQXuhS0d+thBndVsGgc6VNhNydufM5LlLiuRYq1YIlNWdDUS0ywBzCCRyDP1c8dmZXN1kF4KNnTE2GtoH3cWdrWG7ndfbb189t6E4OzEiwWo+0soXl9qQf1XpvIZZ2id-anIBirPZr0CAFsxz5aFcNurzWmste9QJTbYntsfmu55ftSJe5LfGxAZr03Su2VbgQAgi37PoLh2t21MmMNba62DrlXovKWee+D1IoplYbUs+ImYDilNaA0xlvWzyjxVCc90eAeGYXs4eEiqTI8edUtFFCxxvKgVU6vfT49rr7l6K+55Ol1EGVMOUpmoFIpAls-Q-AN54w17swMp2SHP2yF-hSVQktKj2nq+LJrwXbzlqrUWnrzKh2FdemNzb6mWuOe9FLJU3+4Ro0AFkmr4g6BZPRdjWwu4N1gneXvldMuYaYgyulvf2-ZrHt3iMox2+1x88h-5i29TLfZZiYGVo0zWpNf3zRA8h7D27SPk1mg0mz5Ok39em5hIEo8V8JigXRv0LYY4lj1dRj+wM0P21m9VCH6k+P3lxfb2EXTouzQH2dc-QbFoGNwWZnkkW4shMj8MEITPJdF4Bwn4+CxONCwqRGAv9AoiBM788Rf+ae1PyZfv-YETE2r-pSl-lmL6EmNrv-nyNriAjClxuAZAXziSiPPAaOhARzgKiLvTj5hYAACIfDcbhjHI+ijrghPzx44pQAkEcaSbIHjBUGEFUwTpqYxaZhLoihX5P61I+QKqd4zw-4IoHropgB-7640osGeT06mA76GyVSpjyikTIRkHy5UYwovI0HFhMbSbqFMEJZp47zExoKSDyFEx0z4z646Gd7YKZiC4a5RS0z0wljvSx6oGSDoEIBWE7waZap-7FiM6UrM5EBgA+4IBbz6G9z0LMKMrMpn4cr6HWHmgZakJyFDALZn4I6zZI4dLGGpG8DpGGQMG+hpEKqYLxEm5JE3RzYWZXoPSIiEgOJkzE5XqRHKTREp4ZYeqNGIx-Bb7iYsoWq9AZYfJAEIq9DeEUrtqdFdHQiHJYagbgbvpQYwbx5dFDFlGIya7Ex+67CsbIb0bHDt6obTHYz07maA6b546fr9EKpvLDGHqjEM4+GUqRZij6GBrG4qHYwoIpxUy7iITIQsI5FkHEjUGbBDhAmeEJF-zzybImRezmRZw-HcGuiRYzQUBUhVDjCdi0RhzwDCiP7LAQBIQAhlEzxwIAAyWWgUsC-8SqVJq6pJmYI6Y6wuEhQ6mY7Qx+ms-itc78kCZMWEIqvKd8JEZo1gyh6xjiN8BEIocCxWkpnYYqbmjgCpdUoQ+EFR44PxeRCqGAnwJyEMb2H2+iVg7w64xYEAX8m03Ud8YoNIkpb8yp5pPBLyqkTp9o8scpiC0WxxO8GWGmNSxYYpxRLyCCTpNqIuXRhWlKAZyImRUam6V6DR0xzJIoLRCYbRqu-pLWkp6eFJ9JVSgyuZnkfwHCSxzJKylxCA1xoZppjgdIOM7aAZdxwhYxTxkxUxvpMxsqVZB0O6dZDgDZ2ZLZzavyjxExYKxZUY+ZAUzU1SxZ6eZZ8yFkFZPZYm8xoQixy5yxXZ7JTZaARxu5Gx9hWxJY+guxBmtIXaC5khG+oSiZl0vR22-Z4ZtxiarZ45J6kx564oN5sx65L6m5kG25N51h+5h5R50ImxZhOuZ5F5-GZAV5EFkFpxcu5xa58mXWL5ZpDZ7y75o5bZE5nOP5kJG4kZJxIqKWc6aW0JAC9JICG6nJDAfcfJ5FiMLMW6N6Kxi+ZMyZ0I0hCABsGAOB4g+BoJIoIlYljBne3kAl+sbuyZ3kklBBRRmJd6gG2svZIK+oXykgu+6MHwB+ck4at+ABZ+sBtcZ+RGzGLpDAIo+gskDmCg+goBPEUBn+Eh3kUh8y2lTl+EWcQJX0Sh-J6FmuKRhmhhFhShfuPEp8QJOp8a7e3BtRuIUAB2QsamnYYGAw0kCcM82VZ2G2vZBsx8IkZ+UYvABk+gxmKcVgVYVVNV1gVgAAKi8vVfHtVWKVYI+n7FIO1WTJ1bVSQDeMYUEf1djINU1SQJSewJIONYjNVTYshdCNVUYPNZ5HEp0n1MtVYltTYK1QwOtStRVDAEKD1dYH1TtZtadTYCNYCGAEdbtTddYDNXNVddYo9XEmtSJHSBIZwXMBVQ1V1SQJ9Y1S1W1VdWDSQOdZdUDUNXdWNZDcDa9Y9aWJNd1b1W9bsFDSja2DtWjVDQdVWNjcDQjQ9XjWyU9eoGWu9XtdYETbTc9TDW9VVSddTdYGTZ9WzUKCjfjVTWdZjcTddezbjb9fHmjdzftRDfzbdUQKNeTfadvGLSJDxFGIYBVPtO1SJAIRijLkONoqhiJILhVU3L0HgFoAkL0GgA2L0AAMxxC9BNhW2JC9BxAoA21aDoBxCtihRhEqw+ZQAWBqb05hgXj7TIR1YkAMAuxGW0UiiLwIlWDR34T64omgGszxZfydj7w+x+zzQnz3zJ2dlJZUVNwgIypwJ0mzkMUQLkHsnmh4JemUZfGZgQB4JJ0uwEIGS9xt3FqcC2Tlr6HEL6DsAIA2LY76A1I1LhDjKeHD2j2OB+h0S7i0j2Uz0uUGTvHBom690W6cBzUhXE4LYj1j1L2+yIUT3ZiAgb3x5b06h5pF46AwIvA0KtYkIWnlBDDh00xt0vEGQfG7zv1P37ar4S4+rGrqVQkB0WBJhEkuBC5PnzIlXy7lW7DQPiDrU60iGUp55RRZKB3iC+1TwzzoOKZ3kBXyFBXqh109xqFKHWXaH0OZ0SEzwEZGEmHoOgH70dR6xcB2TFhJ7MoEadnp47ZulmkemjT73tJuDBTcEEbiOOCSMj18MyPBRYlegKMUDCBVDmljjmkoj9jHD64GNAT92wDrTx69JsN72qPyPdB91GM+lNGXTcNDC8O2T2Sh1f3wDIRVDoOwNITVnhVUPgiTQBNwPBOBWKHqihRTyCkKCwMABeuVGY5o2EiTEAKTHBxV+dZVCqatGTbhWT8A61qtuwRTyTxqmDIxutODWiXSDgyFxtJYBkaADtbTeAbTNtBkcQ4QO1cQXT8e9tO12AltBkTtBkAA7HED9UQ5lWqe0EMGpvwY4GmpQDhEVSDkg3k9vKg-oMQEs2U0RGrYc8MIhfM3lZmB0NYP8hs+aFs5hTIaVXswUzsQMLaNYM8m8Hc0c8hf9UYGrXzF80QD8-c8c4C7sGc6kfoJc2k7Kvczk9s88yg282jdC0LcC9825r88MAcchVMg-tfpC+i+C9WFi6Czi+CxTdvOUwc-cxc7Tn7VCUU3rEIFwImI89voJbs4jPs6y+y7AGtchXS0U4y0LMyzvEUxkvAJjUi08zyy83y28yPaQJIDK4LSKycxU2qxqxddSHCzMGSVFIoJ1Brd4ly+Jsg-ky8mrXhKa0mOazTSrdq-oPaxeI6wMEKIhchVg3rQ03Ioa1CStF8AABKyv6vyvcvyVKueT7MhvwDhuasuuQtuu4hJv6vitRbEOZiVPzJRtWu8txsqt5ufqwtMs5vf5rPRgrT+wFt3LWuvO2u7CKAOCSA1t53lsSvxNej0BGCguSArOZjGYOD4PUkYXRuNvKvNudWjslIQtq0jtjviA+va21PYPtr62NNBs7yebLv1s7OxvQj7N7vztaupunsEOrvbx+v1NBYOA7szx0xyuWsNtFvHsqvPv6sLu7BftSDXuIy3ubsBsPsVtDvmgjsZtSAHsos2sMCLt0AOBQcs20uuuQcRv-s1P3F1PAf3uPvDtWDIcweKuoszuebIc-vVWEcYfUi+vrv+t4dgeSIe5qzrAIvkD4S+wpP7uvuHv5Zer7NcelOHleoAtq3oPjVepAdSRbuBsqyvEizhRqjscNRCdEe8ewcqwfsztCeSdE6ypEtP5q1-soffbSfwCyegcOwKf3q0Q2BIikNfKEgmfjj4RAy6gZCzBEm5VQlCfEcxukfwc9QlPrViclhoNnu-s0f4trvYcbsycgf4cUyVQhAyJ03+dTvFszvxjoiheGcA0y0c1y33VYfCH+uoW96GzNADJDJB4Bb6Cz08XZvgeLgpdEBkM8kUOpEfIwWVeucmE5chCnAnAiQ52Hz51aAmdRjNzk6DdEBpfPVdcKHEyShkUteRxUgGjdAdt1sackdwdq0bfBDoY7cg1Jfwi7guAJgZfvu2Vq3qCV4JhdvNdXPmjdB513PlAKA3dHt3e7Dvf+yfeKDOXncA8kBdhmBta5O-f7Ng8Q+5BZtiiVvji1skBJhRzLB7cBcHf-eo-o+wDsDPdI8teFDajBDsBGBA8VA-eBdq2k+mBUSU9qsVBE+Sszz0-k9GDw9gBQ-Iv7dNtBf6Ac+M-c+I9s+ZjC8U-4+Y8TuFsw8quS9GDS+s-I8L3OmIOafTuC9q8q8tdq9n27g0848n2L3L0AeeTme4PqslLndq+4EQCBiaJY+Zfafa9j32+O-Pi6+vd9Bj0ZLxh2XO+3f8t+8B-e-wvBIXhG8C9q2R-gQ7uditvtuo9Eh69j0dBEDq-Q+0+tMdVg9U-OVXVw+Q+fVg-K9XWK8F+mcTWK+i+fWK-l9VU69XX69m+fV28O-kRNDt+h+MCfVx-PfQiK3dsLMRT6hpU+9fPQCxhBjR9a9q1T9QAz90Dh9GuZiL-RguxEC-OHjkBz9ZeC8b9b879gDkCr9QlH+Ah6ztAMT7+u8L-j+b9X83-n87yX9ECPpEAMS88KvY8x+7Dv9P+3-V-jPEX4n8AIsvN9vLxnZgDKAu-EAev3H7NVcgV3RQMvx-6Ttg+KrRfsgKCazJ0BCA80DgJQH0BFA4AjAXLxz76BiBeAsgXANP5i9keNA1AfACAEUCoBVA5gaQNYFf9GBLXRfuSQTADs7+f3Sqh1Q34zJPq7-cgVIMf5b9r+X-WQdPy35sClBUAIAWoKAEgw++V1LgfgJmTm8FqegugYSgYFqDcBLA1QXMyY7wtYBpgkgNoMD6QC+OxvOwbv0cGldRyDHA2imzVoFVSm53Rfo4JEH7MghOg2LmVzvY+DUOqbfwYQLH7QAgBIQ7AePw0GBDUhX-YIUH2gGH8MhDEDwXRzi7eDGm57PwRrQCE2C1+RA8fo4PYEuD-+Yggam4NP4FCqqYQw6roLyGaDMhffH6oUMiG4dohiMOlnEIT5egKWbwFrhMLczJCZ20wqAPEPmFdhjMkUWYYLyWErCKhI-H3vMJkREBfYhUbIVQN2H7D+w3fc7vMOfQLBKoawoFh8xBZvArhNyRYfcOxZQAqmtw95nDAeFuYqmLw74W8LqGa8D+gNDqvMM+obC6AkUCEa8MpZdJThXvK6pcN8bPCkRsIt4H8OsHbDwoGfFxBdimFx9Ph55AfqUJ2Jx9DB+FYAsB0CTOJXEFwuPgdSJG4jXEDNXwWSLxEwt+hXg+pjSLj70iORzNJkXH2ZqUdmRF2TwVSIS68iOR-I1xGTSFEcjOapI4kRyIpGW8nEfIyoVCTFFDBXqCo1xLzTZEqjXEao+jjyKii0iLwYw1WOrHwjSkdRbWIImsGYA7lHE0IHUSJ3046iDqnozyDqOZq+j3RcfMmoGP7hx9Xq4USnFULDGqjPhaNHUZiwZHS1jRF4EUeS2DHFdEa7Ig0R8Dmo0thhrrB0RKIRT+tpRdIrUTvB1G4sHmzg4Eff2zEXhqxlHaFnwJ2HCjpEEAbUPqNTEdjtQlHeMOoAgDFicOCXRjtiOjEZ8HASYWiFAC-5CipxM4xQcqLICLjgB53F5F6xvy1j+e8-ahOazmDxCiAG3UenOKOHG8jxF4E8QxFf6dhnRZwq7D70BBOCNeO4kES2whoRDuRgw7dhWOHQvttxf-XcfoH1DfsuRkoizol1-HXNMxmKF8YBLfHEj5aw4+LhBLHEvd4WCAWakSMwnV9oQ6otCcTx97qBPesEM8Q0P0BPihaIEy6mSKQnVgcJtIMCSWKiE-jxxUJO8YcIAku8-ucSBEecKgnmgkmXYJ0kSKElOl4hSfBTFj18q6VuJ+zSSfMko4KTP0rY+FtCykkASZJCgOSSqxbHNj7mUGRYS7EBBo9820ks0H5W4l0sOgxk0IPEJdhcAXQIkVwrxj2IbAowLk-TAhWQr3tLOyFMsReCt6Wihg-kvBr5mpjLtfWMFMGJICjDEwYpyFJcipKjBJTuA-zXJv+V-4Gx0pfPeAFpL0okBMp0bfKQbDiZqY1QhmByfwy0BVTu4FUoaDlRFD+C6prHKkIZkqYlNFMarKpi1NtGGZoWHBe5r1LBAYAbm1YkUGNKGksh6pSfcaXajWbVjhpbU4SiUgkolIlpGwFaQQ0CbwM1p20yJiTGmmtTNpArSAEKy6naTBWz+I6X1L1LdSzJfQe6Z+g2ntTdWNHC6eqxo4vS6SxhD1k62FCwITWf0r1jYG+kJt1Of8MNl9JukjSk+p3FqNW1R7fSXOxYEzt9PQ7-iMZ+rdGYhx45aAl260mGctPI7vTiwJMzGujKsB4zL2wCImZtL87FghO30ubgTDa7fSjuW3WAPDM0LX5OZp3b6Q9yu6csLuj3a6TMHqlq9JximdPpn2+kCChBLsDXOP0EH9sXYcsmoYwCpjtCyA30+YVTD1m6zyRE08kYbI5FzSYxriRaXTMMz+jex+s9seoG1CGyFx0iU8WGJdmziGI30jcQQH7DCyfZfs72ceJv4igLxQwK8QLM75O8LuJE0gN9I4mkSfIfEuOdbIwBiSzSIodOY4G+nKTecswNZncm+nqSHpxc56anJsmjVTJn6CabZKrkeE1Mi8EkF8AtTEsQQx0hQvoAtAWhjUweW4PcGE76IMscUySNVj9pihJQ0wT0AAGIEkK4faKHgYAMAhQAAVUfTkldA-IXIIKAKDFAjMjAaYP4Cjhd9Qg1ASIOEFsBTMEgcQJAOEBSBpAQAggYQNQCKAlB5AwPSoKIE8ADI2gnQBxhHgUKby8g3iPpJ4D+jSlNQ0LekN1JKa9AqpWaRmSYAFD5BrAf0KZGTyCKzAYK0waUoYXHRQh4KhYE2voHtr1gywCQUhfoCbAtgxauocoSbX6ZaAPa7TK2pbS0CDN8xHUlJmQBNrMLBkTC1hYMztoe0Zm+YlsVGC+zWgEu+gKeeECmYEB5qXzeAEoDVpTy0ABAcIAouUjcLwu0ilHPIurBTyUARioWlPJgALCfa9iaUKgq9BNykQclWymQGwXqkHFTklWJTAWKRx+46ItzLYAGkOFhALEBlp0XmHViiFkigedQMDBKAhaXzBMIZjQAxKtFGAOIDFzcWAU30nioprYD85whBm1iIRfEhwgzN4k-ivEJwuNSdFylJtW2mbV6AoB8xjiQwhVB9gsBxwmwM-CyGJhWKHwt4g+LqHzZn5NgYYdru53sVKZNgTnfGReFWFAwHe6FDLI4oaDOLUyxYKqUZmmXiYLI0LCGAqnBBQLMmKTHZS8jCbWLr0+EQ3sOHcVAUo4iYYmISC1T9Lq530TBZVEnl1QvkmClzOeBdL7QWlhIT2RxxmRHgOgiYYzCQETBapbAVgWwMUD-iIYLJEDJZRx1lT0AfYwsjoAZRNSjoloOsA+H9FnEEBDwFQUabcBUi4qfY5JWkp0mviorjAysAlUSoUAkqoAKkRgAsBxaWBYAJyFkAyuEBMreiyAttnuFuAHQRI+gDchkpuWfLtMjwPfMak6nucfMbmL-o8FGATRlYh8wIM+DCAgBbaUzG+XfPSBPzRA9+V+RVgqDUAUgdIEACG1tBhB+AD8jINQH-lyAVwsgUQFIEkBMAkAnoeoAwE+aBKwAngF1fgFajUAnM+oZCFauSBAA).

### Usage within the React ecosystem

Usage in combination with React and React-focused css-in-js libraries such as [styled-components](https://github.com/styled-components/styled-components) or [emotion](https://github.com/emotion-js/emotion) should work [as advertised in styled-stystem's documentation](https://github.com/jxnblk/styled-system/blob/master/docs/getting-started.md) (not tested, YMMV).

```jsx
// Example uses react and styled-components, but systemthing works with most other vdom and css-in-js libraries as well
import React from 'react'
Import ReactDOM from 'react-dom' // virtual DOM libary
import styled from 'styled-components' // css-in-js layer / component factory
import { space, width, fontSize, color } from 'systemthing'

// custom theme
const theme = {
 breakpoints: [ '32em', '48em', '64em' ],
 space: [ 0, 6, 12, 18, 24 ],
 fontSizes: [ 12, 16, 18, 24, 36, 72 ],
 colors: {
   blue: '#07c',
   green: '#1c0',
   grays: ['#ccc', '#555']
 }
}

// Add style yielding functions to your component
const Box = styled.div`
  ${space}
  ${width}
  ${fontSize}
  ${color}`

ReactDOM.render(  
  <Box
    // width: 50%
    width={1 / 2}
    // responsive font-size of 24px, 36px or 72px (theme.fontSizes)
    fontSize={[ 3, 4, 5 ]}
    // margin: 12px (theme.space[2])
    margin={2}
    // padding: 18px (theme.space[3])
    padding={3}
    // color: #ccc (theme.colors.grays[0])
    color='grays.0'
    // responsive background-color (theme.colors)
    backgroundColor={[ 'blue', 'green', 'grays.0', 'grays.1' ]}
    // theme passed as prop
    theme={theme}>Hello React!</Box>
, document.body)
```
A live version of the script is [available on flems.](https://flems.io/#0=N4IgtglgJlA2CmIBcBWADAOgCwHYA0IAZhAgM7IDaoAdgIZiJIgYAWALmLCAQMYD21NvEHIQAHigQAbgAJoAXgA6IWgAdVygHxiA9JKmaQAXzw16jEKQCepIWDYsI1AOYYAVuV4ChIpgApCAFdqHjYIARk-Z1g+ACNaWDwZQlpQvgAnKwBKGWBFahkZNitVeD5CGXgAD1UMtlIZeSaZAHI4t3hQlpkAMh6ikrKKsD4oQIQZAEJmluCoeGJqeChugH5k1LYMqz9q2vT6nKR8wuLS8pl5xfhGmaCQsIFuvsuFp3gMeigZdav3vwoLT2dVILQAukkUmlMkcTpEoVtMn4ojF4rAMNZbPB7I4XI1ckYskSANz5Ix+BwQUhJALBULhAq7GognLAVqBUg3WzpCBdUnUOFSWjpGQAfVisGoAGsAPKxNz44BGflwnQ6V4pcZsABC6XgtCltSc9RkSCQMgAgul0rQrDIAMpsHkuQXCjW0LW6-WGvjGhryGQUVpYNDYlpJFooABMYYjADYsGGZGCVQUZGqZABJeaCCDFU3m2gyAC0mhktDh93pEUzkSqrJkerYgXSBSqMiM+VV6qpADlAmACzJ+2BYvARaWZNq+HwELQBWmq48Cn2B5FqA2my2CmchjICk0Ay1qAOx+lup2F4Ulwy5KQAKJgVT5vztVlwwoZwgZSIINgyKV4DtJwZHaTo2ByCAKj8FhaFIGUAHdqAwHgElgV95XApJAOyHIt1bDZYE5D903VfCd3SQJ4BIoURVUPV8StG0rAwKkmNtDC3CyEjCnWdoeNNGQ5Q6UIMBw0hOKmAMT1gWAflA+VBPFSVZXlLJ+UKQpyJkeiPgQFwHFuAM0DhS9uxkZx4H-M1ImErDLWtW0cknOzQhkAAfGQpF9b4TMXOllwsqzIjA0IklUWgHHfNNP3VfhqFsHTIpYfFdwuWgZXSe0jNabknGcNZy0y+0MVUWA8z8FoMBaI4iqy0iZHcX1qEq6qslK8q2FamqSO0iKHAwPUxh4eBaQeW9OOwoDNys7cFIVZoZLk9Y5jeJZvnNdoKBwlMOySUKINMrt-PGiIHGxeAAHFgr8fqWEhND4h4KVos0xtZoIm8Ij8PVCFet6vLdc6GHxX6MGB+BUwBwGRT1f0gq6iHwuS9SBO0uGpP3cZlvehpzRSWSnqlEjL0KMy0wzHgYiWIcKknDAGaLSdCD8BnPm4in1WBA5kgC28qYEeAADFGT+3J3ubAjWcZnJ5DLFm2doHJydiuQwDAQI2FoCUblcthPlIUgIGcHdYP-fqeBYeAGgKBApHgOTLZIKA9SvBqGHSSzHSsMghz8WgkliZyyz1ys+YiD2veKX3-cD-7CigyJyxy7zoBkNAZByIsA2U6VhI0zTE78GRYhTnz08zkv8Vz1S3ChzTaJkcrEoDPWxKAiTS-czya+E1GYph3H8TbuCjZNvwlSSJWC9V78RT8eLEqlOQCiD3ISLnyJG4gfE0GJOQZDEJuqX1-TnAcfeIAAaiv+OG7dZeA2btgKAgFMBMbg18Vobb34HwpG6xEfiXX+M9NJw1-viCkgx0qPxmAdZ4-RJjsRYmxRyOwDREnkpHeA3syD+ylIHF6gkgFgNJuAj6BQ4ZHTdhmWgMAAAK7YbJMzLI6Z0zgPLljDqdAo9CoBMPXDNSWK5SAjj8BueSBQr6tFUFUbo5oCgqwapZHUGR5gihYSWNhTp8pcIrCdasBRVHTnSBooR4ttIFDLBndY0jZHtlILOaACj9wdmOqrVRAB1aAhktGTnYflHhRiEY+KgIZCRwi5oSJkGWAAjB5TyaUKgFGmEeE8o5xw1XkvwphkTBIxIAFQyDiWgDOMiWgAFJsnKMpnqSKuDo43BsrHEuSQeBJCgMHISmFQhiDZBQWgYJzQ8D8FAPwQdlaaGCYFHg9ShB4JuAvQ2DD0h8FUEkagSQnTzlIHPMASRVEAGFDYADUEhUTvo3do9cE7QSKDaBK+yy5pwzjkHZTyMiDgDJmMBRcEYnNIOc2AVEXm+Urscs5Fybg-LARmIuKDWKkBQcs0gqz1lYLyAPDMhQ-y4y1Iqchqtrw-j8HivM2Jd6XzsIfGQPAVlrNUBgM+F85B2BvpBaC9K0WMtfnYMEmMlp4WtlqCg3L0WqD5diMEAqAwfL2V8qIVlAXAqopEjmb0cUSzmnDLUJEMxGEqERG42lUUSsFdjHI6wBnisZcMh5uz9lKrYCq6F6qOyCSVCRIuyS6UMvWTlFoeUXDZLZKa+ahL9ryjFf61QsqHWfPSGAZ1rqQWjQ3FkKNCplYkQdpyde-9B66tgP+AMSowEkvntvGlxlqWUqPra9ZzLhDnxYHWsAHLLEipLTGnl6ypVgBlalR5Cqk0pqhWm9V+8iUUJEfiktJMaHmTmfqIQAAla2tQErSEaT7a2fsA5Vx4N00OhjZnzPgBu0gW6jb20WQ0PwNFoV4BIrEepPo-QvoHqhWSRyL2LLhHff5Qo01gorjkEDoKAwUD-m9f5b7vRGkEP6ZoqdwU5AQwaJDJoAxXA9CWr0WHmr1D+fcn9sA-2rt3RMQ8Xly5vLpWhSjDTFn4i+oyVkyoPH3xFAAEgYJIbOJd33YdIBgMAagxohPyWGyhkRlAAAEBMQCLKQFdwhyzUG+H4SA1BiwIV8Swc0ygZAyP9owqo7qZHKG4iAdSHZ+5vUbhjMtXGB6bz8NvKlB8j6Qb0i21l19b4FuhkXPzr9ZXSUteLeKYQTw3BnXcyIO9iwlJysWOJM14bkeYwsppnnoURfs7FpwoLEtyGgvx5YKnX4lhKQK6YWNZJZYoFVwTtXUtxKHQGHL-78vhbfvZmdyjVYZiGoEEaXlxxGwEPqsicm-ODWWBN0a-seAdP3EkCAssyxYs1eqJLfgIAZfS5l7VBFetUcWZEubmk803CLm1mrx2usWua+WdbrXlM-xe91xjv6+t7pu9ig752+HrduyYAkHNepyeoWmZR7GZC8b80LNZg4-BqYSPAID9ysc0dQ-Ryu+OYUEluQ1PFpzYdzqR5CoF0KLF7YBvC6CiK0HMXdac-EqjMc-vgJsnI3d9wCQzPdirkRfUHhmMGgqOQucBh5yTzZHUKpVRqoLzybt9tGvzfLhGvPsdJCDDEo+aArUyAALLJU+LECSkjFHJg18Lwtjc9ds+Reg4H0NeL66V-uJ3WuAbmkV3z7ZMCUmBpl4VZC17OrdVqsbgopvzdW4GtrO3tUChggDxW8XJv05RIIpMVcybTnm5aMWboMiufmhO8U1PLAbcSTL+4wt2kqcD3IYj8OBQV0saaSLSIv0rlunogGgMYMx+qDAY3RtpQDh2gnwsFCsbxzFBnw-ICoNl84Q3yKeV+zVWk7Bgfr5R+9-ui1PaPn2-CAYj55fe5eGr839o2h8Dl+S3X+x4S8nSODMOAAAiCw+GJoYymoJapAd8h2lwEBOGhOrylcUAcB8M5a3GTmboc++Ic+a+doQuU+uejcp+Saw6jqZ+DOQuvy6BmkSOtge6g+-sbATo1IoEz4UBIW3u-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-JKfefX4CA1-U+HMUg5ZVAbVOY9-VY3ccg1AaZPXF+N4F-QAF7eWugijfiCBeO-2BUAMDyhWtD+NsCBOtVc3hMeMQDeOgjrXgPQoi0CJVDrUS2BgCRG0vVxIy3ZNK0CRRhoAvVRj5OFqq0vVYDy0CQa0CQ4BRi7XQPuVxSzgZDcZEHVAuptMigBUln0EhNvRhMtD8AxDnjrUxMjM9OgjNM+VuixDOBHI9PYHBPBWhNAMDGpBSjOBrJzBLNjOtUHXFDc1Ew7N8B7M9PRNATc2jMZAzMI5m0uG3O9O9n94DNrNDMbOfXPMU2nO7Nab7MZAjHrWUyr6HX9FTMHMRh-PnMAuXMw0DyTPPP3NkyPODwRNCz0AkCL6vPFFEWDOaTDMYtYuwAtUTPXOxPDGzO+PJDeBeLwA-UrP9P4sfOEsbN110sMvjVY2IsUscuCD0s-UosOYwNuh-hCBZS816J9NvMssMnDPivjj2hSshrktWDc2KuSupD5SJMC2VHkFpqpNMLUtphwnvAAASXL7ATLsrDFrLhQCrFrVrPLb0kz5USwlrQrLQJrLhETrGMreLdr8r7LfrTS3rDzor++XTFo5UJsNrgbQVwb6y3NQgVQbAMbEd4bqLbj6osAto5zOFczIoEmVQYShkAba5ibgDybf1pbhmVz6rtbZbLAurA8yThr5YFmPrg8umzb8blbBLDr7Lvb9bar3NI7Vtrbb07bVERrvJEbHTboVsjLFbiyVb6zNbLQy73LDb3N277AU7mkM78Ac73bjcJbnr3L-ba7g7klm7F7zru7tbl7B7YD+rSaEDuS872bi7xbTgL7OJf97zSbqg47-7j7Y7r14HXrST77QtKTnbaT3bouzIPMi8-4Rs3jfbq7-9rLWqwzmH8ApVWqRzjbLQIDxHoOx7p75thI3Y5k3M-46HBF8T8AAH17uHTO+H7LhHlHmkpHe7EH5kpwcHn7XbtHMO5tls84lkFthmmm3w+7-4kURQVsBF5gRQUJ3lLhhHHHwH1boHuUrHhzYLxzELFHEYSnwLeryx8HHbX7Z7WJkU4QDChNencrBn3NNojwJnfa8+ZnlNuNUNb7tnEDi5iR64MgxSpSZupmrQ7dreP7RbjYznfA8D0m1jEMEXplg0qXvQPQJEYdY8kdMgSn5oGcUO3nLnhNelLBWXQ2kbU2BwvICQGbcbOH+nG7hnLQ9szXP6bXp1jnIokgseto7nQbnnrQI3ZUtoWbIrv75Ysb1ASzggwggHqzIH3NCQEdK3PgNVQ3i3EdmYdg2WG3k3LQ23Jsx32IwrhIjXl31A9oDsFQHXHnXXW3S3T3sAhAc3d3C3bgHIYQhAVgu3a34367nzm7APtgUEIP3ga3v3aLjc0PQPVg13YAp3zLE373rQKPsP6Pt3SPboePwPX3L3uLA79rd73XJPVgZPiPjXC94Pt7RLDdDPC3C9S9VIzPVPrP3dvdh7InoXCH3iUDC7yXC9gBEAeoISr32PkP3Xkv0v4EDI7PEvDdXiNoRJcvEPbLm7C9mvagavNL6i44PPm3B9ZiWSyH6oqb6bS3PwHPDdsQfAEjFPN7vPXzEVD3oPiliND3BPi1D39PiNtPvvLrZVtPgfofgPsPIfEVC9i1nPAvSfDdUvMvy4qf1Qhvg1iNpv54TT4v5kOz0AC3JfUAVo+o5v535flftAxvprbotfmsfA+zA4CU1fOPLQzfWwbfYACUDfLhPffAQsMQCEnfCv3Nw-o-fACEg-g8w-a6s-mPtruvQ7m7i-y-8-jc5fffB47vnHNfPIUAe-2-Tfx-iV2IM3QgdfK-CbLP7L5fl-ljDSt-Z-IoT-V-ebQge-d-lPFv3fC-l-waS-93+FkIAS-3XTL8J+evbrp-0gGXot+B3cvvCXzb+0deD-GtuFTSq196ki1YfqAMRrT8x++A4-haBb5L8EIgvNquX0oGkDoAlAy6EbyIEQDr+8AN-iwOgDP82BhAiKvALYGUDhWhQNmklxpa79Zw7fJgdrwP6ddJ+rQcQSCn75SCQu2ZMTmk0g480vKYA8vlIJgHr84Bx-ZQbB2F72dRanNPln5SI7IDj+lAvQdTyn42DZ+2gxwQhF0EYDPeG-FwUYJs6qCEOX7DQZYOcHQApBf-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).

### Usage with other vdom libaries

This fork definitely also works well in concert with the more exotic [bss](https://github.com/porsager/bss) and [stylething](https://github.com/smuemd/stylething) utilities, as well as vdom libaries other than React. 

```js
// Example illustrates usage with mithril, bss and stylething 
import m from 'mithril' // virtual DOM libary
import b from 'bss' // css-in-js layer
import { createStyler } from 'stylething' // component factory
import { space, width, fontSize, color } from 'systemthing'

// custom theme
const theme = {
 breakpoints: [ '32em', '48em', '64em' ],
 space: [ 0, 6, 12, 18, 24 ],
 fontSizes: [ 12, 16, 18, 24, 36, 72 ],
 colors: {
   blue: '#07c',
   green: '#1c0',
   grays: [ '#ccc', '#555', '#ddd' ]
 }
}

// instrument stylething's component factory with the vdom lib and bss css-in-js package
// note custom theme passed as a config option
const styled = createStyler(m, b, { mode: 'mithril', output: 'class', theme })

// Add a custom class name and style yielding functions to your component
const Box = styled('.Box', space, width, fontSize, color)

m.mount(document.body, {
 view: () =>
  m(Box, {
    // widthL 50%
    width: 1 / 2,
    // responsive font-size of 24px, 36px or 72px (theme.fontSizes)
    fontSize: [ 3, 4, 5 ],
    // margin: 12px (theme.space[2])
    margin: 2,
    // padding: 18px (theme.space[3])
    padding: 3,
    // color: #ccc (theme.colors.grays[0])
    color: 'grays.0',
    // responsive background-color (theme.colors)
    backgroundColor: [ 'blue', 'green', 'grays.1', 'grays.2' ]
  }, 'Hello Mithril!')
})
``` 
A live version of this script is [available on flems](https://flems.io/#0=N4IgtglgJlA2CmIBcAWAnAOgBwoDQgEMBXAFwHsAleWMgqZAMwNgGd58GIEXkBtUAHYEwiJCAwALEmFgh8AYzICS8ZchAgAvrkHDRIFgE8WKsCQkQBAcwwArHgqUq1YgBQMiA+SQhKABK5WNABGzLh+TN5kAE6GAJR+wAA6An5+JIYADvBkDH7wAB6ZMSQsfgC8lX4A5GTBtvDe1X4AZC3pWTl5YGRQRAh+AIRV1Z5Q8JwC8FDNAPwRBFGxroXF0aUJSClpGdm5fuOT8BUjHl4+Ss1tBxOW8BjCUH7zh3euvNWrJSzVALrhkXIsU22wCgJihlcgRCzAwRhM8DMFmsFUSmjiGIA3ClNK5zBAWOF3J5vL5Uisit8EsAakQ2H4TNEIE1sQJQQA3AjRPwAfWCsAEAGsAPL1VHATSs0EAemlNyY-RIACFovACILipZSn4kEg-ABBaLRAiGPwAZRITOsHK58uIsGVqvVmuUZXKfl4NRQAAZEdVwtUAKwAJj9AYAbCg-X5flLUn5ZX4AJLjZQQDI6vUEPwAWgAfH4CKCzqT-EmAgVqX5VSQiNFUgU-JoUjK5QSAHJEMCZvydsDBeDc-N+JVkMgIAhs+Mli6pDtdgICKs1uupXZdPypSru6oCLsD6LNZtTtIzsl+AkAUTAmQzrjqtmpoLSiYYMQCCBIfkF8FNlj8D6NCQCQQHkrgSAQLDCgA7gIGDyMwsD3vUQHhD+8QJCu9YLKw8DPgmcpYWu0REHh8ZpJy3KZKqqKGsahgYASdEmshj74Wk8wPuxOp+KKDTeBg6EsKxQzunusCwM8AFinqfICiK9RxKyaRpERfjUfcCDWOYJzut6oLHq2fhWPAX66gEfGoQaRomgkw6Wd4fgAD5+OyZDQH4+nTiSs7GaZASAd44SZAQ5hPuRBF+IoAgmOpoUSKi677AQwrRGauk1IylhWHMhapWacKZLA6auNUGDVJseVpZFdjuQIpXlXEhXFSQDUVfhakheYGCqn08jwMS5znqxaG-supmrtJtgnJu-SSfMYy3FMTx6g+vDobGTbhIFwEGS23lDf45iIvAADi-muF1EgAohoTyIK4UqdWE3YWe-iuKqDCPU9rm2sdIiop9GD-fAcY-b93Kqm6fmtSDwXxUp3FqVDomzRJUko3qTASXdgr4ceaSGfGibyDQUw9nkw4YNT2bDgwrjUw8cRGV86wRD556k0o8AAGLkl9iTPbW2EMzTCTlAW9OMwQCREy+bZgGApAEPyxwOSQDwsCwEBWGuEFfl18gSPAZSpAg7LUFFFiwFAqonpFIjRCZFqGNwPauAQ4TBHZBbq8WHP+I7zsZG7Hte99aSgQEhYZW5Hnen4CTZu6clCnxykqVHrh+MEsfuU8CcJLnKf8mn9RgyplF+MVsXuurgm-sJudOS5qcKY+GcUbaKN1yhAmQdruuuBK4Qy53kVvtyrjRbFgoXqk3uJPhk8BFXECot6mIXn4AA81cEhrWlWOYW8QAA1GfEeV7ac-ujXJC8BAsbcVX6qogQ63PxFXfcsEt855-ceqkTaf1RHiToyVb4jB2lcdogxmIMSYjZSE6oMRSSDvAF23APaCi9g9Hif9x4ExUsjE2e17aJjoFAAACo2cytMCwWitFYZyhZ-aHVSFQ2hi5xrCznCwPsrglxSVSGfGomQCjND1KkOWkUTLKhiOMbk9DcyMMtNlVhRYDqllSPI0c0QlE8MFmpVIBYE7zFEeIxsLBxzQCkZuJs+15YwwAOrQB0io4cTDsrsJ0a49xCUhG8MmkIvwBYACMzkXJJTyKkYYO49z9kHBVKSXCChBJ4qEgAVH4cJ3oE5iOqAAUhSbIkmToVBYOOOZMOOdwjyHCFAH2vE+4kB3jSXgBBfh6nkK4KArhvayzzL43y8gKmYJDscaeWtqHRDIJkcIAhwiWknCwSeYBwjyIAMJawAGrMFIlfKuD4K6RzAukY0MV1l53jonC5qzrnuiTOPLOMMdksH2bAUiNyC53O2Xsg5xwnnj0TFnBBjEWAIOmSwWZ8y0HJAiomNIn5nosEVOKYhzjTzvlcCi9MiIN6n1MLvKKMy5mZAwEfE+F5TAXxAmBeQZL5mP1ML8VG4lYCYRNoqXgjKYXkpZYiX4bL3QrKuTEMAgRTLvM+aRIJzNEVymAXw1Fip8KJk0PkXCQsQl8thZkdlc0EjzA6Xq8l3T7niuiJK-5HzAXyqbDxCU+Es4xNJfy+ZGVqhZWsCkmkals4PgxdteovKmWZBFZatZEqpUkBlfapccQQ3TVlvhag9IEXgyrlDdF7oJRAIiDitexK9JEoJXvM18zKWqGPhIMtYA6XGO5Q6MNHrMiCrAMKxKlzo3WtjfGr5A1E1b0xSQl6qQc0OnxuQoyYy1QqCoCwYoMUIAWyqWUGpnsc5RWaX7bRozxmLuXdrNdkyyiuHwpyQduB8LBCdBqOqpQb0RQQhJLZ4yqmgivq8q93ztyuXzp5O5v6gUei-k9V5d61QPq1G6KocdflF3vS6bU7pDj2kdNBlDLAXnnNfbAd986JmuyBfBwDhcoqIUI6FYjAx3RvXJNSSUTjr7cgACQiCgBAZOOdkOPpYBgMABBMiDT8Rk-146AhJBAAAAU49xhkc7VCFgEE8VwkABA5mggEvU0m-BiI9jAWhDqxHSeZiAJSTZEYRWzSbDF48V6uDXoS7ee8QPVu0nWi8jbM0-SziBx+IqxJGsFtFHwe5jijrOQEdeOZckZRzOE8a0N8PUcqZMpzgLAuWbC5Yb5UWLxgQ49Mbjj9cy5LZcMNGnKm0sF4MVrjH9YsVcjalj9GWAtP0s6O2RzjEy9SIP1Vyg5tZKHVYRST7mBv9ShIsBpm5wgQHFgWXzWLCsxcSwlpLOrsJtaI1UoJ42VLpuOFnBrpWICJcq8FiSSd5DyHq-JprV3WtUfayRw7iqx0qrm0d7QaIFUdUk1DGd+7zxsZAzzOZ3ZXAsFffAb95y4fMFI+6BDQGEjI7o2iU5kUUW7KByqhjbyAWDqMatlSoKwLgqQfRB1uzUTyNh-DxZCQW6bm4omE763wF7FiV6n1OUEgM-dEzrH7BNzNRKmVCqbOXL2yelz7VIuYbM5R+ET0oS97emNX4AAsvFB4wRhLCOkTGOXHPv4Qz8CrmnkLkGffBhxVX4vWdRMt07niYuWcdD5w4-93r1G+pEVL1qMvKqa9SNr3XBvuoqxN5VVIvwLcCALVnKPnlgnYUGPOSVuzdfVBzM0MRDO9SbZybHiQRvhL58cVbtSBOIrENkcTudNGql8wCJ9I5tpqKevdEDPvmRx5V0rdkdYpoB8THguGwcGQR831-IDaf6EF-cjFb2sAsrQNAw3+s7fa+7SKjNPD5fDA4Tw9Puc9Dx-T--vRxRm-DoT8o-syx08AdUjafMAAEQmBh89KABUB0FgK+aLbOIAgAn5DHA4YA1DHHd-Vjd1fVVEMfOfU0dnIfAtKuPfCVbtB5CVbfd3Z5RAj-DhBkSZTvD2EgS0QkACW8UApeK3cA+g1DMjW5BIeZeA-NUgpAkGd+Gg6IATfg9nLgnDbiH+RTV-UXUyPEY2EQDXDaC3J-EgF-BAAtSQtjPlIg90CHQFKHMgSVcXazCQnneBZBCFKFIfeFUwyQkDMBUKWg3gIfa7arXXRwoQ5w81HiSAxUOrFw3HcGfzQFGaDlLPVIRaI4J4XrJ3NScw+iSwh3EDBVT3J6eYNvdLD7MfcIEDZZHtdZcILQ0nQ5WwlSHpQ9E2Y9VdWjE2C9Zgp3XI0op6JnOGD0GoKDZ0fjZoZPZ9VIn6YncTHbVIDImo6FfVRZPIgg61Qo7QwFbrFIp3TVbnCnLNW0LkKwaGK8G8DIag2g3XXwkAniDw8Q+oyQ++VEeuISD2J2ModnCUSzRMOEEoVwBIRMCCU2eAFhcfPICAG8RYEgUoque+AAGRrR0jvgPg81rQ0KQMnS-DzWYwVwaNtBoH73ZnIOznXjAJ+lfBxRRTnn-HWMYJWKdxJiUFnlRHvkCyaLx38ksHGAKBpLJJii-HsPdCJK8KrUmH6UukW2W0FnpMKFRAgC3k6gyjnnRF+BpLXlUyFPdCH0YllIKGFHpipK6xhKeirhAzY0iXZJuM5PbUFIKGFUCKd2CMHR1NCJCwkxVRiM9zhNRHiJNESLp21KSxpOdxBLBISgiQ9JUnmAwXXQ+mbRIHqXewQDGIFSNP+F+gtPCUmKtQ2T8CKLtUHQxD9LSHKP2wyzH0fiVJjLdITM3xmOKIRz9L1C9M8zCVyQzPQUHGDhI2EjhLDKIyPXJOqKDNrK7jjN6L6KdxaPkIlw+A6Jg1dD+CTS7PRLE2ERtMmhGIO1zOjImKjQKOTNmLTJHXTNOKdyzJozbJXVPUbLqL7ORJ7MnIHJOg12qBHOw3HN7JPKegGJnKGKinDIGkXPzOXNwOmLXNLPmI1KbFNMfKLVtHXlLVc33hMChOpXPkvmrjHBE23hMO3NITRSnXqIKztIoJIz5gwG-wkD-zgOhnwsIoAILTUhMBwqRJiLUhIv-z8JeNBzIL8XnMmX2SZEnBICoO7yYM1N73JTPwwCwJ53UgEvv3IzuSH1RGqEom42UGqEP3QkEtX0QLUmJ0ooQHYrkq-F2KEO2gYOxLUiZ2OOBkHPdzEMUN-FHkEP8PNWT3d0iLuCgGnXjDKTlCXUWDIhtG5A8qG3dFYqouHnwiHz1F4G4mqCEydksH9HCsiqsEsAABV5kYqrcIr1jLAKAdYpAUrwY0qoqBBRwaDDCcqfo8r4qBBQSGASASqnoIrJF7yVIIrDAarGqQoYBsoWq0hqg2quNrAkrMhOrxEqFspMqrBsqGquqerspCryAwBBrurhrrBKrqqJqrF5rMhmr8J-hEC0CJ9QrYr0qBB5q4rErkrVqyqMqsqVqDr8qZrirzqTqKqJhrqrdPQLqBBRrxqahHrlrujVq3rHr+r-RvrDq7q5qYxn1wqprfVzroarAgbYbFqrBPqXrcq4awb1qkbfr-qhr2rrAUbgaFq8arBfqIbuI3q4aEbcbeqrAMaYwtrIaIp0I9RvUQp+oUr8Jvyt9AUswjMChGanpxdQrPJwg8A-AsBwhwlwxwgABmYMcISMSW4MCWvwYMQMaWvwQMcJYMem1y5C5xbTKAcwFjYnLUQcfqW8GLAQTIUgHvbkc43ufiDWK4ywG2r8O49EQ-HuHHSKeuAeHWeqEeeeN2hY7FKeZzcC9ePee+aCrzWC7Equf+NU8DH6Nef+V20gQBbiLOCAKBHcTgCSP1UwqGD4BgBASRSNaoSJSJb0EpGEku6oMuwoJUSCAkP4aS2uhS7iJY7VHOvOmoTgaq7E4BOrRu8ulu7WH4Su4gcgLuq3Hu+kV1CBH4-u2oVpP1VFUBd0M26IC21qXO7rbiZYzewUSNXOkdFyp6VCpi63Q28wM0X4oqUDAKhAPmIKiKEKmoO+iQFqrm7fPUeRNxI2iQAyfW2+gJVEAY44-SjYXizOc5MQ6AijRBhE3HLU5gAQ2gvCgJQ-Qe1KHmLgSSd0O3KFK9UO-01eWEI0lU0qQelJPMPSd3K9RUhkmhxuwh+hvSV4uUZhmxEQVwRsCWPwQR04dMZodnER-Ojh8hzMyhoh0RwuphjBgPOh6zK+yTPB6IAh9GeYHeve1wb+h+m8CM6B1g0AyqQxx+kxmymB0AgyCuXE5QB+gALy8vjCrjfCcYgFcdQLfLfop0-sbqcBcfgBauZoHuCe8ZNl-vyMIJ5sLD5oaqFo9G4m1tWvCTwFSelu4mDG9FWuDEyatzltWpQAlu4kVu4gAHZgwtrQGHG5RFAaBogWMcDCg41xx3x-K-HA7gryUWbGmYgwnfx+mOmhDqg6mWnbRggrAtlRnfHszAqAm+n2jFhBQrA5kxhZmmmWrdqMgWbcZ1myBNnRmhnDARmmmfgJn7ZR85mumFnX6emP7lm3qBnDwAwDmNnVMtnBmyavtdmzm2jqhXnCaPmjmvmTnfmnpwmgXRnLm9aK4PGnAeZhAuBJ9Xz7neZHmnpAnPGuKUXYBmqGroXcW4XCYwHEXlAXF4Arr5n29KCsWVIcWnAqWrrTmWbcWWWxrShxn4XJn7bTIVA0o2aNE7m6XFnen5kWbPxBWzRhWYb8JoXpXBxZXFhsofgGq-74m0krnvL94pgAAJalrl2lzIh59+7F5Z6oYqA1o18ahV4Zmoa1+AQ1q60lqzBF20XFqpE1mo-xiVzIdl4JyZHlslj19fNp-UYqXWH1jvBltIQJlQAoEgSNgOkN91ljRMWAE0I5gE6520ITAoIB8E9FsVs1pZyVkGwtgJNlytotiQdVzm2J61f+hJmhRk3lvN7kDTOtmN+l81xly17t6tolh1iKywOthtiKTVwdXmttnV9x20Y2Gl0V01zF-t+Ny1pdrlmt6oLdqQSdp6ad0iWd2hedyQgtl141ld31uN0SittKgoS9u1pm0di9217ljVpt7mmd1t09jt3VjTJ9+Ekt1dv1p5+9wD99ndyD11mJqY7949399t0NjNuUVmL8GeL8bWVxnt692N-tpFO9gNzKKJkqwj-5lm7+sjpVFcuJn97V4mOUdEVsFmSkNmTDhkKJoD3t8Vxjgd+97D0J3s8j2fPamoPd1GyKHYL9lthj5xZjihBpiCawY4b+lTJ4CTwsL8Y6BkPQdIX4siSQwTnjst-1lmwTnZ0TvZwFqjgMCTv6xt+D2Tvms963Y0C4ahJGkztd8t4j6odz3wSzttdAlm9GsgIquaz9pz+Jp88IxcPwHJPJHXfTGoOuuvFDzt6sUKXwSBz-AIUxkGOLkygLsgVoFofCP2rWAO4ePwCTvUBOf7Erzz4m3Sugwr7rMN4bdYZkZgFN6NvDvt3zlmi2br19Pro61zquLjJdLNtFl+nzszmoaboqE0NNz2vlwsKNgQWZ5QVQYD+bsDi1+95gAOnb5waqybtYrbpMUwFLbp9dojlmk73WG7xEN19bzL57gQM0agPIAb3jo7vzr7n72ABgNb8l20WwOkHwBgQwM7vb7zw7-jvzqHkwUCOHpwPb8Hzr1HmHwwV7sAO7jFpHjd+93H9Hgn97iH7kcn2HkHv7kDm9h7wJ2nwwen7HjbpuwRxn-Dobge8ujnzLrniegkRH29nF8e1ug9lSI9+AAB0yOty77kLnn-CAVUPxf70z8DvzlXtXoCMkQX3VrnlxY0A1TXhb7X9l8uk34TQ3hd7kRRQcMX5ny1x3w8VzxMRN5Nrb54Tn8u4IMgbng78X558Kr7+H+S86r7yn+a4H37+a1niPyT2q1nmP861n9n86rn+a4XqXnP8u1X9X2cfPwoG3ga86t3tNtIKU-9vj9Z6ADb+vqAQ0NUZ3vn6oJvlvggO3yQzv0gMgLZrsGKNvxbjvpkZv-vwfsAGKHv63Pv8gHmGgaCEfy3moefsgRfsgaCWfqudfigLfon0ti3wHlmvfg-nf20JvqfrcHnwb0fq-8cIfi-7kJvhKxEFblQLvw-0DkP+91-9-rNp-ydBU9Ou--YxjRmv7f8me7fMAR-3gCQDn+xkcfm-3AELoD+K-E-mv2QEAC9y5-JXkgOgDAls2pADAcj32qpVO+ToeauvwQHnV1+m-bfnQPH76h+++-aCNL1qpN82B1A8fmwNOi28mB0AFAXAK-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-Y2r618qW1gO4AILgMXP7rcHBrgzwb4MCGhDIh-RWPVoDoTCpXgUKCaLSDObjAvODcO2PkBdgEeAeRystCr4UMNFDmq3FjCgMBI+kZAGIyIGUCOzsjsR5QJeAQC5GNYu8rcuDBWlcBBWQibA7gfwMkBCDtaRuYp1Fn5Spyvkd4u8n1TnoHwwUclMCQPjfRCOzJWKA7WsgJFDVkIeTR5pkgtInaDcCI7Zr47OJHMeKFzFHUgqHxvSp8RtFnCHyDGoKFB3FAfGyzVlkupm2uUZDDofh-IUlVTYpB5wHHISxx6wuca5Qqpk91xl8tjGM18dZEVcYoDbSzYbqKclCErTUEghBd+meCpJpMnM5sT8Inu-plnp2aF69AKJgeEXpEAtUwABQFmnidxMmCwAhLYKvibWoNUNqoXUkxFGmZnCgRaw3MQLRUgEAIAT3a7rdxarBBCRKE29PIHpNrNGTJzBqneljHli1ZXJiE7iJbFaydm5zQZg1SgAs0yZNJx8lbwCMtUGASp-noUEL7zzNTDAQNpNLGmqmVIDAKU5lNcYtUJALNezg1VsD8magifTHpH3wiwApWz1FqrABtOOtTpUHBqqwA9M0FDpu0nKG5IJOHVcT3JkGrdXC6zVcT7pmM+VXlERQwA0QCM-lQZH4QzAGZ8qgjXwhkAWaJs00-G1C5I0WqmQaM0TRpr8jgqiZ6s9lBTMWsyzxNLMx-ScnU1so+ZiKOmZqCITk+6QFmvBM5qxqag10rbr-W1NwS2mf+RQCVyOoasOz05pNglS-YtVoIlHatvYxYOPL3D3B3g9Qh5DCglQ2ansOrAkPMJHlXcgCGxvRh8p1D3XOzEJELD3YNhKgJ4MEFNA6d7zQS9dQEAgW+LaVra4ADtFcNVw9znhw88edPPugILB57w8IYKjTYBoUDe7P0bhRwM0gc2A0pGmEpqRfsrlYKPMn6BcgwGvq1g2EuvMcbnzn556AwEHCqAhs+wJQ-lNUM-nyUGhqEXYbYPhKBtY+2-Qys+joHRNj+pw5Mh6PSqTAc2oVQttSA2J1g+oXva12lUMA+IiOaONdvEocEx9qIFI7YFwzRwhLYoLS4hjouaLYLnB-c3waPMnm0GtoXeT0Zu2wkTYwHHgjZhRIHwLirSRY8JGu3s49LYDG45lm5BgUFVEFGOqqt2NwUSSidSkqcafjYE1iCezBp4VPqJXIYEwFXEZdsBZ0rcWcVelCY91OA8skWbOmBE+gM43N1pbCggB6O8AKrEehPXbuOzaoJMJgLelp2iC7JmrNFR-TVfgA9Gpt4l8lHQShgdmxrAespFPp4sEgxh5es860lUQjgxwE4RjX4FV5o9rAoCwcX4FzXaqTQZQBgOlpW6qabYu19KDtC4s37+tQmlLd4Af0qpgA4m1a64dGNfhZrZAea+6F03eB+SkR-YBxoDxPzrgTpRBPbjpxqa7lCYaa2Eq8luxN04cJa4vp4vdClYE2-kKaHGAbD3p9ZY4CQGgildLrTa+w3xasU8W6Vd+4IA9cmggXWkrh4nHDbsy1JggbGHUupezjJx2CplnjHpYMvZwWblpEyzAQFu6leQ3m9OIgSBKeXHaQEHywMlZuRJ-L4txSF7XO3zHZb-tIeEHTHhHZHMHHAkgvFlUgUQrGxklBFZ2PeZorGq7kEnXiuy7rcb8dkrldWK-x-4It52z9BLqn0wEbqR29AnXrPzQbLpFiKgl1yM3fLuCHOPglUWCgiEnq7CCDlco7n-VlgJ1k8Hrii9igBLAupJHICFh0cwC0BcwnWVopHYZQQcV0vSBLsHesEKFcVtK3jALYNAcfIJjIDONCGBADADECsDShVAOYXuXmuiNmGqWx+7NeUoIAn5st0oKgPRbtj9RpQp0GELACPOtIzD6saUASBkurG8uovARuEFvm+YRjcoM0HoCILMArAMQDNWAG+Nc4WAfagdQSCHXwAR1bTHMOOqwM1Lfu4yw0VyEM6miA0kjPwLfPmCNhP5CcdnKaDAfu5IkcoQBzA6Ac8RQHVQRsNcEgdVBDARkKaxRZyTUIbZEqXjSApO4ZhaL+KALiiGq1HMxq34RuABE4SpAONk4J4ERA0S-G-7YSu7YCoECmglK7xCHXZju3MgEov9idVh3UTeBxp8AQh5JAHD430VesY4OsUKMFTHlVAPhGUGT1+AOH8jvh2UFkOSRnzwjgRSQAkdSPIV-i7tUZHUoQQJIW-S8FI4Cj1B9QyaJUMMZo451hID4Jx1NBccfHJoXxlY1qkXrU7l6U0fUKJB3BPzRCjjjKO5qT0hOHwSocJzUEicuQEnMTkLIZtwgscAn+txuGE5lsCQrinjhYuRx1HUPjAiTgp87Rc0JOSn3atbPlbyeBbP5QkJULHV8evQjNf92UDfblBv9YoK8fUN6nKdlAuMDAWewjyOuGERwZjtbGsbpKm294QkfULHSiuuO-MYEQYJprgj4ZWISoUaMYH1BnH2cOeDx44-Wh5PAsMZBJxc8OdXODNGjLp98eISEdLj5m-46hxuAKSpD2isp1M63x9LtZNQXgP89ciAukAvwNNuRceXthhQPIfUAlQSoUAuDZoJFzFskPE3ybwFwXGBdtCwv4XiL5FzyFRcUBUQua4UO2GoXMJ0ew8D7qFv9UaU8WOMVZgtadqYuwlDhgncAHG2D7ptY+vUBKGkvmOl1IcJl94pZd5oh9VgZU4dq70QmJQzBihDDaY3jIqtmargLMxvDuweYn+cIOrGaRqus1mr5dHt3ZcBK+L3YOLIa9UmWATAk4fqAJe7DFzGX5WXebQooLZd5AdFhi14DYfmvbrri0gMcDixuv95BwQwFvOZD9XipN4ZWK-s-zU3sIwABjMPGOLbqEu9Sa2LbFUDpvolcQAV70v6V6hOFSgF4nqCyRxAhX1i+px0c5iquC1Grw0VzpUubbnXorwSm29dgkAr80cTtw6CQZ3I+3wHRl8i2Zf3RD8gblQIJUncp7XkM7gdwkHnfApJbtoBCMxvMsIEX0De+AHxF4D4uEXSLlF0i8jRDuHgNlXHMTmNdd4Jg-2rjb3qnzn5ji6Vq2FwGzc38gYRsV93bFNK2YGAgtnjdeAo2tddcCrqbSUEUu0FgPz7hyyNbPw6lqFJGHo8+4msPv4PY16D8NfmQsAmEKUzDzzKkjkvKXguGlzB6w+VR93hLo9xQGfdaFt3Twfytu93ekeeZTCe2zc1jfvnUQtH5jU8HZwzvYceH0AgWjesGh736t-uFVyHhjX6khooN00l4JZxBg3H42E0lCyMfQ0zH7D5aFayyf3zOOpGI-tMKFuNztb96CauVSTRJUJlSCO7lPd7a9X3lzW-VAmse0ZPHH6YDcs-c2w7YoBwmN3Q9URRjXCH-tynB5CMvccakY1z6uVeM8qA-xK9zUnVgOenazSOL94GNfcxlA0cEQD0BLfCJALN1u-Wl6-BxZiv88O1768de8gwv7bkNzQrDd2usZ3rue3694sBvdPwb-q+66gARuUWXr3eTG7dpozPFCbkS49eiVb3TPwxCovF6beuBivLbzC9biHcduavXbnt9nBW9C2KMW3mq2K9xgTuOv07jrxt8G9BuF3Z3qd8u6RKj46Pjl1Bkibu8jW93cLg90S5Jcnu1vDoM97QRBQNMyna7lT8UehjOp3LXbREKV3dDFePgOXsgO3XmDQ+IqEP9unqBII3fbQV790LD7y9+BivV7y6CNexKjH6NlKMgFYFKi6hKfVP6n1T9x9qhHIEStraGpp8s+qf7UK3MT4QCk-yf-z3ZIC4DCA+d3YoAcJPErmC+1LnOf7xsqHxaeN1hHql9lBpcy-QDVOAIIL6gDA+DSsv+ympHV+a+ZfrH3gr+5SngebKBPsjxh8Q+weH3wXgayNeQ8uXBK6H62-1Z6M4f3Q8v4j7DwE9W+LfLv5T6oYY88e6rmn1j8+5nf0e1ydH93Px80++bwdEH-UVU81iDxnPLltz24qaR6rNnAf1TzSHV8h-BPrHg0e56gD6eOfUvmxFz5oA8-ocfP-pQGHZBYHxgP3sZnK5V+V+SfNf9wHX-5+ZQVDTwDwnZk0-A04-kvku137J89-DC9f6CAGHkucfrtY14GmNY78T-q-U-3n33+qC5-XfsHgn8cBndxBgauftfzPEn+1+Z-2-iP3v6w-A0I-Z-8khf+n8AuG-Y568SZAMTPQZ3swQaoR13--oN-vMDVA+BvYjVAAAJrRMj-jFDP+W-m-7sMQgJJCJ+6rKJ57E4-uf4b+l-q-5z+ruup7TQBAFVTJI9SHgFr+nPppCb+vfvAFN+vQPcBeeb7vf5ZuPnrwRqQxXvBDjIxRidDKA5vjzKawtnl94aw9nqgFCEZ-nR76+I1sX7ugxRuP5qQUgU3iBWfgEF4uuoXuF6qUkmFF5J2mXHpb-ublpIS6KRoPoop0VcDyDRGGcJaCmgNIMYHZGqINpiqYW-PkY5Ge3COiUYPOgEAI4gsJYFeukriMQcBpRqj6AUIWnxzjA3zrOh-O0OFgjAcjdOlqMuSADyz0ufKs3oxA9esxqsuQEEBaOGgrpN5VwCQdEBJBxsFopxBPFspxwA8AOEixQm6KwjBA9SLugJa-qkUEDAnAEISiOJGFxpOwSjma5ted+kEqmuhXgypsY0Rom6pAT+pN7E4dQSUGxQl0L-bKAhRNEbs2cUHbDwkXNjARdBWXjuBcY7IEdoI62cH0FWB23ncjbBngbyAmBiBPjobgywV+Bo6guEXT14kmBMHzBwXgsHVY7uLJqQgZwfcEVGTuCahSuMrusFyuArv9geKEJgYp96T0HqCvBjLgF7g63tNkG5B8AM4STBJAGyh8eSWstqvatwXtzyBZgUt5pA+wWwFEYPgXtzBkwhK8Lx+fmiLDQh27nCHzBkaFDDkMmqAhAuBKwEaCGUkmOSHMaSiodqIhLkD9orqQIDCHsh6wTp43gEWitpLAsiodrvBfnhoEFBYSqMHBgLQuUHmQ55i5CxaLCC5A6uHCF7A9g6oTojVBbLv6r6sjDgMBsA0UE8C7yLQVYBtB3Fhy58WtClV6-mnXhArleE2pV5jeNNhN7CuslrVyGh8AHKFqYtCvDAhqswe667BCQMGFi2aBvUA6kfNnMH0gIYTGGgYaiiu4hWWnl26JQ+8v-qEaHFjIqB4XbrboWa3IF0bomAMKKghOtCgXpYmxeiMCXBh+IWEDwiUKWHphnugLiSGGwZITvEPEqc6AeOxGWEDeSeo2FawSkImDgQkEN0YjWchNlC2+6FpkAz2FuF0bhowkGWF8oU4TOFQ2ziO642e55ghBe6GejFgphDoHFwKuo6FnC1hWsM-LthkyHFw9hUkvMDuuArlFBZ6zko2FZ64QLvKPhE4feaaoR4WBAnhAiHpzXA54SRjMhj1qYTImbRIuFFhEuPaHjhY8r2HRI-YaATlhp4b8C1QlgJXoVQq1GkCvhVdhOGwR2EWPJ8o-nk3g7hw4SwBbIWeu7g-h2Jm4GzkSbveEDwb4fhHkRfYe+EQRjqF+EaakEFUhkGa6gNBXh80sxH4RA4QEGK4coKMF4RLCIqGLWLkOIbKhGLl9j2hahv+CmAcAhQTMIZQIw7RuhwHdalA+Yaig+2DYRoho6DGEgpuo7rhcEth3DOaBWM6PLMCLI4XAyB1gp2HkDsKDIBIBHMZ1gpFbCiEHZrxh0EVYAoGm7uowqonYdsSQgUMLb6gG8wInbgwxbqZFhuAeJcHPyZkdHqB2rIY3q0K9lGST9ATwEwBcAphJ8GgR7rgViyMoPpKHShOSKMF8wG6MW7Zg5kNqGzgmoWIYgq9UWSD1IKQUFAHA7UcBBI2NQXypiRUMFUQWw-Vodaf4V1mwZ2hPEVV4AhVXscRVeIMAMGJA7odW7SaqQJVHD8twWwAAgMUHK7LIg5LMEKRcYQdE5w0YQCEXep0SXDyQdENGGaWiwRRiaW4YWXC2AUYYgQie3tD3LZAOygCFnqlXKn60uO0VXYnQEoW5xq2P0dVza2NlCSFyqoFIs4RARypFaW2yWH9K42QZFDBbRdWE-DKWAMSIBYgfempDPBhIbriYwvkTSE+qDTOMiiU1AL8R0+aFLmySEfGoYDIBulsrZPR4SA4wxeIxLMiUxYAIujuwtUU5qtIjUfzFO0bUXVG6unUU1H0QfgC1FKA4QNUhCxVkHkDmQKobqGpBVof66dB8IRNEhqUAAlT7yWsfSBxYjoba7OhDrj0Hdg00WbFYxrXhTYMqObG7QLR3LkO4Cu7ehm6wxEJlki-B4niQD-YGkMVBgAVbmwY1ureOMicxfsTzFohUwfGE6x+8gGGbRbsbtGXkAEKQAh0S3q8h2xJAnGHpxEQZ7pz0ukWcGMx8pPCGt+txK3DMxz0WD4Ux72tMBVRwpCwBdhkIF9FSQWgZEhxq3oVVEbREuACGyxoUcgEJx2MXZZUQqoH7FOW4BFnHNhJGFcHgwvsb8S2+SMU7A1EwkPnH56u8uEDh2HcdHE4RkyP0YDWPEVABVREUSSHxs8IcgGIRv4QDDXAB-n7GnxVEaiBLxWDJ7pURJIbapYhFMVfEPxxeikz1ErwSZTvxChKYT2hG8YxEDwGEZXG7x+8Z7rcQyEQXQ1GUDEVyGo6MNcDZgaOkwbogKEfVDNAeYURHo+3ILt4kkLsa8H2e3EACFYw20dxDHEnksjFnoEccmw2Mr8b8S0hEXn1ZOx1Xoy7bxfsaCFDxVMRPpKu2DhTFbImQO568xXUYLFSxYsV64SxJoKIkah4sfLEdRcsRebZQzSNLHkgR-naGcJ19pbH2hU0TFBzRg5FV5ZxDsSm4-qlbsMF5cGkMa7nel8b8SxxncdtFWx20MnG20qcecgHRt0ZJQ8RVUidHD8cYedEPRgoFdHERScTCoZxbiZwSOJ2caiYDxVqiPHW4WBjXHb0dcaFHuAeyrjjQu38ExpHeCobIndR8WnqE-QFFuTak2NlOxABKkSqBYlJNbhZ6vQeXPO7AeL8a8g3RaOBJRJwYns3E-uSVrQQ8SP8aeHs4JlLvLPuxxGRF1hquvfFMRLkD-EQRz7tAkMWkfqDFa2-2McTyB4BIMljJY+lxEvxkhKir3Q4xg8KpEOYQgCDUtVHyiHJjVDnEgJXVL-FDCTuPbZBW8qpvAQUWyYKDm2nmGs6Cw4wJ+DuK1RjMm8AjycnSbQmFEb62gcSV8m9QtcfXHuAIKR57Pu7xFXHN8YnrUY1xINsCkOgMyYfHW4MKWAneJAQIMBxJw-Eikb8kKVn6ApVELvEFxXoTCikpvevMBQR0yb1CVQOganS94mKdDAYp2sTXHzAa0YvE8RaMQCCEpfcW4F-Bz7gAnIB7yClZ7hxwNSk8RrXOsmCpCnmBBjxCUcGxi69lpMii2WzpBCwpjMdSnqJs8RQnzxQZNPFgAk4VHEnx5RjCRZBkyDrTug6qRSlspw-PMC7yLcTjb6pVCY6k2Je8UcpmpxdCGSzx1qccTesDqZak8Qa8bvLy0JqTZTvIEUeandwJsEMmnhF2nQlGplyXK5xpZQFAkgpOPh7BwJVVggntASCdHqbkaCWhFopI9KmnPyhIY6qXJy+KRFZ6aKc-H2q1uKTAsAaqaylsAcKbQRSQhqdfF6cHCVzHdpAMNql9pVaYUg1AKXMKn56TYaCGUpoyQPDRpJ2qwBWpQwK2nVx9qfeHNpPEE2mRI6RKwCRII6cXhRx4CeRFTpdqQJie6c6Wuky0jpCsl1h26SwA60PSAulSQTaTrR7pKXNemnhPerQSpp9dD6lVpfqTZQBpF6RumsAl6bemXpr6WIjjpX6VrCnxPEFBlCEkaWemER4MKhRqoWCWVHEw7MW+TKINUVqF5cC+gLHboosdIniJ2SUomje11iTa3W5+vrGDgVXtFCcAPzvYaRKDGLi4na2GblwYk5+jYnRAMngICMZ+0TxEZioSfGEbqiYRFBzuSgIxkXeDGTrDig70jQEEmDbrADA0WcQlSdAmJngqKuukW-LP0UmTrCt24wO7hjs9WiplbwiYOzj+c9PgcLg6amYDqxy-GQZl2ZBOpZk5x5mXKDvg+yVcmSE-BA5mMZplCdCpJMNjxZmhvMfMBKxkhqwhKhUiTohew4WXqAqhUWVJExZDUVFDxZExpIlqhn+CrGOQWWRwglJJSR0EMqZNlRmU2hWTbHdg8gOVmRKS0U9BZIlST8Z5coWczYK2t7lFAGB4QFpDvwrQaUYCYqquVjBgBaAI4DA2cFpA5gcWGYh3ID2NXDKYEej1l7cdWDNmWIOtF-Au+ZwaiCjBpQa1DZglmWsGYJLtlHG6xIrJKoWhvWTnq5IuuLKGqY8tjqQ8ZlUFdn9IW6PaHRAaKR4xYpoqsGYCA4qvVCegrwV3GFgXsArZtRMZAYpNQtKZmmVgTaJ8YhOgDo3SIKz8gUAfAjLu3RVAHKJuTtJGVgzwcx6iYujUJ7qUdnWAPGTyn2JQSW7TqZ2QK9mWaw8Tb6Gpz7rt5AwQ7uH5He8pKqAWJKgFYlJkz2cTmtEzmWzqRQlgE7QQm38bQkAJBOT87oBT-pgGlQF8DLmy5cuRfA1WpoRNAGoNfvpjy56uRfDs+4MGQHc+pUBpRPA+GKobQQcoIo69ZhNKOY1Ao8OEAAABpEZ6gbGONohOBAOiDW50AVX7kB5Ps0APkfZCCx6gluXUh+AtueuD25juX7jBALuW7nP+Xud7l7JAvn7n3+NuXbnJkoeRuDyAEeRLkwBUuf87hBAYKbkLZsdMDR55roO04Z57ubrnZ5orgGBnBMQQGHohpebAFhBleQPQxQLNMTnVA2cCFFAeX0b-7hAneTsSNxI6cf6kBnflnmN5XblXm7xYucDSi5+8pHmj5hhDnlDU2sWLm2+reYdnph5RvXnz5YAIvkLUy+U+H0R-uTPksRA8HPke5L-rvmGpi6GvmGpZ+eXlj5DoEXLI54QEO5353fhXnj5ruh15QApFIqDA0p7osnMBNwbpleoToE0C+eT6TN7pehoicaVB7gfwGyQ-ARn5BuPSEd4KcnuCFLWuBGDAXcZ8BdEEsJTeTO6oFgiegUqQzeBXCJS83BupUFFcNnKYKgBgXLfARciXIsAZcu-KVyNINXIXI+WPXJ-arIC3JtydYP1BdyPctYD9yg8qG4Th9gIJjCY08vgDN6ZIDwBiA4YJUwy0q8uvK6A28mIDjyR8i6YkA6gL6rGQS9u9JewL4fV7ZQL4cYAjyYbvVn7QHHPn4cZmqIjLmFKIImC7yBuYaKZeX4H-IYOXgGU40grguEDf0AIDlIS4rzI6iIyVhYiC2hU4CTDQ80zvNF+FGyr5m8UN5NpKAsctGGBegWAFkXVAkYNGAYSrgsLR5MfgBrRpMuSCrQFMkLJaYmwwtOUVS0ktJUVi0MtBrTVMkLPmICuz4PyCIc1QM3LeglTPIA1U6zHI4s0zcuEjyA3oEMX0QgITUDNy92IMUBgzcoGDLFhNM3IwAMwLrR14RMKCgskJEKUZde+8sM4TKUwFl4+FmjhmoAxrkO2Ldg5+upw5wp4XyjDKmmPYBxQ90HvpNycoFgZTuMRiYAJFZlCFCM6g-upHrK0mVwRkgKQBxzuF3nNEDqYphYLC6ZSmaZmqZ4SZpkoB-BApwfFBoDAAxwPxbNR0Rp4VvIKOLQgN6GAfSjbAsOo0ekClcjMnWCDeXhRCVlOo4NzzuFDUEyWj+cQkEUBIIRV4yuMMnk0yeiRqT0CeArUNEZKO5Ur0CGA4QJmjGexbstiggkqEyVSlR2N-TAkmtLXT4Q39HqDwO8tCZqVE7ZENG4sNSllL7ABTBIiy04YBIicafgNUyWlchCdArSoRXYwRQNRcLQy0otOECBgkLJThygj1FqXBgtpSDBJS-ULDrJ42ZodR6gOpfJFI0WpVgABlg5EGWwh-OuQxw0eoG6VHYrzHqBzF92Ijrxl+YhgDrMB1oLqhlL6KMyn80xRgCTFDVP1h6lB5McDtC39k0w5l9pfmLkM7QumLC015IOiE0wxaoDdl5ZeEh9lB1hgDBg3RAZABghrDY764ymYMDs+6IDPIKF5JOoDBgahWvLaAmhfoAz4DgCADHyLgBoCaA-wCADWsgoEoX8Am8noDqAkAKZkzydYLIBiAOhqVqeAmQGsypql5eq6wAMmOEgYAn5eGB1ab5ToX4A64DvL1q+hWuVnlWhSAAQK15dEC3lIAPeWygj5c+XIqECh+UYAgYBWWmG-5SACAVYgF1q3gWgL8CaAQAA).

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

- [styled-system](https://github.com/jxnblk/styled-system)
- [styled-components](https://github.com/styled-components/styled-components)
- [emotion](https://github.com/emotion-js/emotion)
- [bss](https://github.com/porsager/bss)
- [stylething](https://github.com/smuemd/stylething)

[MIT License](LICENSE.md)
