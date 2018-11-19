import test from 'ava'

import {
  background,
  backgroundImage,
  backgroundPosition,
  backgroundRepeat,
  backgroundSize
} from '../lib/background'

test('background returns background', t => {
  const a = background({ background: 'tomato' })
  t.is(a.background, 'tomato')
})

test('backgroundImage returns backgroundImage', t => {
  const a = backgroundImage({ backgroundImage: 'url(kitten.png)' })
  t.is(a.backgroundImage, 'url(kitten.png)')
})

test('backgroundSize returns backgroundSize', t => {
  const a = backgroundSize({ backgroundSize: 'cover' })
  t.is(a.backgroundSize, 'cover')
})

test('backgroundPosition returns backgroundPosition', t => {
  const a = backgroundPosition({ backgroundPosition: 'center' })
  t.is(a.backgroundPosition, 'center')
})

test('backgroundRepeat returns backgroundRepeat', t => {
  const a = backgroundRepeat({ backgroundRepeat: 'repeat' })
  t.is(a.backgroundRepeat, 'repeat')
})
