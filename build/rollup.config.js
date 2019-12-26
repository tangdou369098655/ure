import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

import { name, version, author, homepage } from '../package.json';

const banner = `
/**
 * ${name}
 * version: ${version}
 * author: ${author},
 * homepage: ${homepage}
 */
`;

const plugins = [
  json(),
  resolve(),
  commonjs(),
  babel({
    exclude: 'node_modules/**',
    runtimeHelpers: true,
    extensions: ['.js']
  })
];

export default {
  input: 'src/index.js',
  output: [
    {
      name,
      banner,
      file: `dist/${name}.js`,
      format: 'umd',
    },
    {
      name,
      banner,
      file: `dist/${name}.min.js`,
      format: 'iife',
      plugins: [terser({
        output: {
          comments(node, comment) {
            if (comment.type === 'comment2') {
              return /version/i.test(comment.value);
            }
          }
        }
      })]
    }
  ],
  plugins
};
