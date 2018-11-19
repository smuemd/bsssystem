const Benchmark = require('benchmark')
const {
  space,
  width,
  fontSize,
  color,
  style
} = require('../dist/index.cjs')

function isEmpty (object) {
  for (let key in object) if ({}.hasOwnProperty.call(object, key)) return false
  return true
}

function mergeStyles (a = {}, b = {}) {
  const list = b != null ? Object.keys(b) : []
  const res = {}
  for (let i = 0; i < list.length; i++) {
    const A = a[list[i]]
    const B = b[list[i]]
    res[list[i]] = (typeof A === 'object') ? Object.assign({}, A, B) : B
  }
  return Object.assign({}, a, res)
}

function handleFns (fns = [], attrs = {}) {
  return isEmpty(fns)
    ? {}
    : fns.reduce((acc, f) => mergeStyles(acc, f(attrs)), {})
}

const suite = new Benchmark.Suite('@V3')

const tests = [
  // v3
  { name: '[@v3.1.11] space', func: () => space({ m: 2 }) },
  { name: '[@v3.1.11] width', func: () => width({ width: 1 / 2 }) },
  { name: '[@v3.1.11] fontSize', func: () => fontSize({ fontSize: 2 }) },
  { name: '[@v3.1.11] color', func: () => color({ color: 'tomato' }) },
  { name: '[@v3.1.11] style', func: () => style({ prop: 'color' })({ color: 'tomato' }) },
  { name: '[@v3.1.11] width array', func: () => width({ width: [ 1, 1 / 2, 1 / 3, 1 / 4 ] }) },
  { name: '[@v3.1.11] width array integer', func: () => width({ width: [ 1, 2, 3, 4 ] }) },
  { name: '[@v3.1.11] space array', func: () => space({ m: [ 0, 1, 2, 3 ] }) },
  { name: '[@v3.1.11] fontSize array', func: () => fontSize({ fontSize: [ 1, 2, 3, 4 ] }) },
  { name: '[@v3.1.11] color array',
    func: () => color({ color: [
      'red',
      'blue',
      'green',
      'cyan'
    ] })
  },
  { name: '[@v3.1.11] downstream consumer fn',
    func: () => handleFns(
      [ space, fontSize, width, color ],
      {
        pb: '17px',
        px: [ 2, 3, 4 ],
        fontSize: [ 3, 4, 5 ],
        width: [ 1, 2 / 3 ],
        color: [ 'red', 'blue', 'green' ]
      }
    )
  }
]

tests.forEach(({ name, func }) => { suite.add(name, func) })

exports.suite =
  suite
    .on('cycle', e => {
      console.log(String(e.target))
    })
    .on('complete', function () {
      const top = this.filter('fastest').map('name')
      console.log(`Fastest is ${top}`)
    })
    // .run({ async: true })
