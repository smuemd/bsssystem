import path from 'path'
import buble from 'rollup-plugin-buble'
import filesize from 'rollup-plugin-filesize'
import { uglify } from 'rollup-plugin-uglify'
// import commonjs from 'rollup-plugin-commonjs'
// import resolve from 'rollup-plugin-node-resolve';

export default [
  {
    external: [
      'prop-types',
      path.resolve(__dirname, 'lib/util.js')
    ],
    input: 'lib/background.js',
    output: {
      exports: 'named',
      file: 'dist/background.cjs.js',
      format: 'cjs',
      name: 'background',
      sourcemap: true
    },
    plugins: process.env.TEST
      ? []
      : [ buble(), filesize() ]
  },
  {
    external: [
      'prop-types',
      path.resolve(__dirname, 'lib/util.js')
    ],
    input: 'lib/background.js',
    output: {
      exports: 'named',
      file: 'dist/background.esm.js',
      format: 'esm',
      name: 'background',
      sourcemap: true
    },
    plugins: [ buble(), filesize() ]
  },

  // core

  {
    external: [
      'prop-types'
      // path.resolve(__dirname, 'lib/util.js')
    ],
    input: 'lib/core.js',
    output: {
      exports: 'named',
      file: 'dist/core.cjs.js',
      format: 'cjs',
      name: 'core',
      sourcemap: true
    },
    plugins: process.env.TEST
      ? []
      : [ buble(), filesize() ]
  },
  {
    external: [
      'prop-types'
      // path.resolve(__dirname, 'lib/util.js')
    ],
    input: 'lib/core.js',
    output: {
      exports: 'named',
      file: 'dist/core.esm.js',
      format: 'esm',
      name: 'core',
      sourcemap: true
    },
    plugins: [ buble(), filesize() ]
  },

  // flexbox

  // gridLayout

  // index

  {
    external: 'prop-types',
    input: 'lib/index.js',
    output: {
      exports: 'named',
      file: 'dist/bsssystem.cjs.js',
      format: 'cjs',
      name: 'system',
      sourcemap: true
    },
    plugins: process.env.TEST
      ? []
      : [ buble(), filesize() ]
  },
  {
    external: 'prop-types',
    input: 'lib/index.js',
    output: {
      exports: 'named',
      file: 'dist/bsssystem.esm.js',
      format: 'esm',
      name: 'system',
      sourcemap: true
    },
    plugins: [ buble(), filesize() ]
  },
  {
    external: 'prop-types',
    input: 'lib/index.js',
    output: {
      exports: 'named',
      file: 'dist/bsssystem.js',
      format: 'umd',
      name: 'bsssystem',
      sourcemap: true
    },
    plugins: [ buble(), filesize() ]
  },
  {
    external: 'prop-types',
    input: 'lib/index.js',
    output: {
      exports: 'named',
      file: 'dist/bsssystem.min.js',
      format: 'umd',
      name: 'bsssystem',
      sourcemap: true
    },
    plugins: [
      buble(),
      uglify({ mangle: true, compress: true }),
      filesize()
    ]
  },

  // layout

  {
    external: [
      'prop-types',
      path.resolve(__dirname, 'lib/util.js')
    ],
    input: 'lib/layout.js',
    output: {
      exports: 'named',
      file: 'dist/layout.cjs.js',
      format: 'cjs',
      name: 'layout',
      sourcemap: true
    },
    plugins: process.env.TEST
      ? []
      : [ buble(), filesize() ]
  },
  {
    external: [
      'prop-types',
      path.resolve(__dirname, 'lib/util.js')
    ],
    input: 'lib/layout.js',
    output: {
      exports: 'named',
      file: 'dist/layout.esm.js',
      format: 'esm',
      name: 'layout',
      sourcemap: true
    },
    plugins: [ buble(), filesize() ]
  },

  // misc

  {
    external: [
      'prop-types',
      path.resolve(__dirname, 'lib/util.js')
    ],
    input: 'lib/misc.js',
    output: {
      exports: 'named',
      file: 'dist/misc.cjs.js',
      format: 'cjs',
      name: 'misc',
      sourcemap: true
    },
    plugins: process.env.TEST
      ? []
      : [ buble(), filesize() ]
  },
  {
    external: [
      'prop-types',
      path.resolve(__dirname, 'lib/util.js')
    ],
    input: 'lib/misc.js',
    output: {
      exports: 'named',
      file: 'dist/misc.esm.js',
      format: 'esm',
      name: 'misc',
      sourcemap: true
    },
    plugins: [ buble(), filesize() ]
  },

  // todo mixed

  // position

  {
    external: [
      'prop-types',
      path.resolve(__dirname, 'lib/util.js')
    ],
    input: 'lib/position.js',
    output: {
      exports: 'named',
      file: 'dist/position.cjs.js',
      format: 'cjs',
      name: 'position',
      sourcemap: true
    },
    plugins: process.env.TEST
      ? []
      : [ buble(), filesize() ]
  },
  {
    external: [
      'prop-types',
      path.resolve(__dirname, 'lib/util.js')
    ],
    input: 'lib/position.js',
    output: {
      exports: 'named',
      file: 'dist/position.esm.js',
      format: 'esm',
      name: 'position',
      sourcemap: true
    },
    plugins: [ buble(), filesize() ]
  },

  // typography

  {
    external: [
      'prop-types',
      path.resolve(__dirname, 'lib/util.js')
    ],
    input: 'lib/typography.js',
    output: {
      exports: 'named',
      file: 'dist/typography.cjs.js',
      format: 'cjs',
      name: 'typography',
      sourcemap: true
    },
    plugins: process.env.TEST
      ? []
      : [ buble(), filesize() ]
  },
  {
    external: [
      'prop-types',
      path.resolve(__dirname, 'lib/util.js')
    ],
    input: 'lib/typography.js',
    output: {
      exports: 'named',
      file: 'dist/typography.esm.js',
      format: 'esm',
      name: 'typography',
      sourcemap: true
    },
    plugins: [ buble(), filesize() ]
  },

  // util

  {
    external: 'prop-types',
    input: 'lib/util.js',
    output: {
      exports: 'named',
      file: 'dist/util.cjs.js',
      format: 'cjs',
      name: 'util',
      sourcemap: true
    },
    plugins: process.env.TEST
      ? []
      : [ buble(), filesize() ]
  },
  {
    external: 'prop-types',
    input: 'lib/util.js',
    output: {
      exports: 'named',
      file: 'dist/util.esm.js',
      format: 'esm',
      name: 'util',
      sourcemap: true
    },
    plugins: [ buble(), filesize() ]
  },

  // variants

  {
    external: [
      'prop-types',
      path.resolve(__dirname, 'lib/util.js')
    ],
    input: 'lib/variants.js',
    output: {
      exports: 'named',
      file: 'dist/variants.cjs.js',
      format: 'cjs',
      name: 'variants',
      sourcemap: true
    },
    plugins: process.env.TEST
      ? []
      : [ buble(), filesize() ]
  },
  {
    external: [
      'prop-types',
      path.resolve(__dirname, 'lib/util.js')
    ],
    input: 'lib/variants.js',
    output: {
      exports: 'named',
      file: 'dist/variants.esm.js',
      format: 'esm',
      name: 'variants',
      sourcemap: true
    },
    plugins: [ buble(), filesize() ]
  }
]
