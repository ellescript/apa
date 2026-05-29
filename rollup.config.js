import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'index.js',

    output: [
        {
            file: 'dist/index.js',
            format: 'esm',
            sourcemap: true
        },
        {
            file: 'dist/index.cjs',
            format: 'cjs',
            sourcemap: true
        }
    ],

    plugins: [
        resolve(),
        commonjs()
    ],

    external: [
        '@ellescript/collecty',
        'string-strip-html'
    ]
};