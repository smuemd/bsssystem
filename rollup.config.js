import path from 'path'
import buble from 'rollup-plugin-buble'
import filesize from 'rollup-plugin-filesize'
import { uglify } from 'rollup-plugin-uglify'
// import commonjs from 'rollup-plugin-commonjs'
// import resolve from 'rollup-plugin-node-resolve';

export default [

  // background

  {
    external: [
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

  // core

  {
    external: [
      path.resolve(__dirname, 'lib/util.js')
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

  // flexbox

  // gridLayout

  // index
  {
    input: 'lib/index.js',
    output: {
      exports: 'named',
      file: 'dist/systemthing.js',
      format: 'umd',
      name: 'systemthing',
      sourcemap: true
    },
    plugins: [ buble(), filesize() ]
  },

  {
    input: 'lib/index.js',
    output: {
      exports: 'named',
      file: 'dist/systemthing.min.js',
      format: 'umd',
      name: 'systemthing',
      sourcemap: true
    },
    plugins: [
      buble(),
      uglify({ mangle: true, compress: true }),
      filesize()
    ]
  },

  {
    input: 'lib/index.js',
    output: {
      exports: 'named',
      file: 'dist/systemthing.esm.js',
      format: 'esm',
      name: 'systemthing',
      sourcemap: true
    },
    plugins: [ buble(), filesize() ]
  },

  // layout

  {
    external: [
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

  // misc

  {
    external: [
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

  // position

  {
    external: [
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

  // typography

  {
    external: [
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

  // util

  {
    input: 'lib/util.js',
    output: {
      exports: 'named',
      file: 'dist/util.js',
      format: 'umd',
      name: 'util',
      sourcemap: true
    },
    plugins: process.env.TEST
      ? []
      : [ buble(), filesize() ]
  },

  // variants

  {
    external: [
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
  }
]
