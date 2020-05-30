import vue from 'rollup-plugin-vue'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import less from 'rollup-plugin-less'

const esm = process.env.esm
let plugins = [
  resolve(),
  commonjs(),
  less({
    insert: true,
    output: false,
    option: {
      strictMath: 'on'
    }
  }),
  vue({
    template: {
      isProduction: true
    }
  })
], file = 'dist/name.js', format = 'iife', name = 'name'

if (esm) {
  format = 'esm'
  file = 'dist/name.esm.js'
  name = undefined
}

export default {
  input: 'src/index.js',
  output: {
    format,
    file,
    name,
    globals: {
      vue: 'Vue'
    },
    preferConst: true,
    exports: 'named'
  },
  external: ['vue'],
  plugins
}
