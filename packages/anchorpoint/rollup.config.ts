/*
 * @Description: 
 * @Author: Cxy
 * @Date: 2023-05-19 09:41:46
 * @LastEditors: Cxy
 * @LastEditTime: 2023-06-16 10:54:37
 * @FilePath: \futian\ft-burypoint\packages\anchorpoint\rollup.config.ts
 */
import typescript from 'rollup-plugin-typescript2';
import type { RollupOptions } from 'rollup'
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser';

const plugins = [
    typescript(),
    babel({ babelHelpers: 'bundled', extensions: ['.ts'] }),
    terser()
]

const config: RollupOptions[] = [
    {
        input: 'index.ts',
        output: {
            file: 'dist/index.js',
            format: 'es',
            name: 'FTBP',
            sourcemap: true
        },
        plugins
    },
    {
        input: 'index.umd.ts',
        output: {
            file: 'dist/index.umd.js',
            format: 'umd',
            name: 'FTBP',
            sourcemap: true,
            exports: 'default'
        },
        plugins
    }
];

export default config;