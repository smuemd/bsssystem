import test from 'ava'

import {
  boxShadow,
  opacity
  // overflow
} from '../lib/misc'

// boxShadow

test('boxShadow returns box-shadow styles', t => {
  const a = boxShadow({ boxShadow: '0 0 8px rgba(0, 0, 0, .125)' })
  t.deepEqual(a, { boxShadow: '0 0 8px rgba(0, 0, 0, .125)' })
})

test('boxShadow returns theme value', t => {
  const theme = {
    shadows: [
      '0 0 4px rgba(0, 0, 0, .125)',
      '0 0 8px rgba(0, 0, 0, .125)'
    ]
  }
  const a = boxShadow({ boxShadow: 1 }, theme)

  t.deepEqual(a, { boxShadow: '0 0 8px rgba(0, 0, 0, .125)' })
})

// opacity

test('opacity returns opacity styles', t => {
  const a = opacity({ opacity: 0.5 })
  t.deepEqual(a, { opacity: 0.5 })
})
