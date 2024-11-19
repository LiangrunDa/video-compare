// rollup.config.js
import terser from '@rollup/plugin-terser';
import styles from 'rollup-plugin-styles';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/video-compare.js',
      format: 'iife',
      name: 'VideoCompare'
    },
    {
      file: 'dist/video-compare.min.js',
      format: 'iife',
      name: 'VideoCompare',
      plugins: [terser()]
    },
    {
      file: 'example/js/video-compare.min.js',
      format: 'iife',
      name: 'VideoCompare',
      plugins: [terser()]
    },
    {
      file: 'dist/video-compare.esm.js',
      format: 'es'
    }
  ],
  plugins: [
    babel({
      babelHelpers: 'bundled',
      presets: [
        ['@babel/preset-env', {
          // targets: '> 0.25%, not dead',
          targets: { ie: '11' },
          useBuiltIns: 'usage', 
          corejs: 3, 
        }]
      ]
    }),
    styles({
        inline: true,
    })
  ]
};