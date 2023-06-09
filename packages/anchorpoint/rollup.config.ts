/*
 * @Description: 
 * @Author: Cxy
 * @Date: 2023-05-19 09:41:46
 * @LastEditors: Cxy
 * @LastEditTime: 2023-06-09 17:27:36
 * @FilePath: \futian\ft-burypoint\packages\anchorpoint\rollup.config.ts
 */
import typescript from "rollup-plugin-typescript2";
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
        input: 'index.es.ts',
        output: {
            file: 'dist/index.es.js',
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
            exports: "named"
        },
        plugins
    }
];

export default config;