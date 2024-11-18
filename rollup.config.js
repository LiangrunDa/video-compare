// rollup.config.js
import terser from '@rollup/plugin-terser';
import styles from 'rollup-plugin-styles';

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
      file: 'dist/video-compare.esm.js',
      format: 'es'
    }
  ],
  plugins: [
    styles({
        inline: true,
    })
  ]
};