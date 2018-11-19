import test from 'ava'

import {
  buttonStyle,
  colorStyle,
  textStyle
} from '../lib/variants'

test('textStyle returns a value from theme', t => {
  const theme = {
    textStyles: {
      caps: {
        fontSize: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.2em'
      }
    }
  }

  const a = textStyle({ textStyle: 'caps', theme })

  t.deepEqual(a, theme.textStyles.caps)
})

test('colorStyle returns a value from theme', t => {
  const theme = {
    colorStyles: {
      primary: {
        color: 'white',
        backgroundColor: 'tomato'
      }
    }
  }

  const a = colorStyle({ colors: 'primary' }, theme)

  t.deepEqual(a, theme.colorStyles.primary)
})

test('buttonStyle returns a value from theme', t => {
  const theme = {
    buttons: {
      primary: {
        color: 'white',
        backgroundColor: 'tomato',
        '&:hover': {
          backgroundColor: 'black'
        }
      }
    }
  }

  const a = buttonStyle({ variant: 'primary', theme })

  t.deepEqual(a, theme.buttons.primary)
})
