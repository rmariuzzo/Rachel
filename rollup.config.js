import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import filesize from 'rollup-plugin-filesize'
import { minify } from 'uglify-es'
import pkg from './package.json';

export default [

  // browser-friendly UMD build
  {
    input: 'src/Rachel.js',
    output: {
      file: pkg.browser,
      format: 'umd',
    },
    name: 'Rachel',
    plugins: [
      babel(),
      uglify({}, minify),
      filesize(),
    ]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: 'src/Rachel.js',
    external: ['ms'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      babel(),
      uglify({}, minify),
      filesize(),
    ]
  }
];
