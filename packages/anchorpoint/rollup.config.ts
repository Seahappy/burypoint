/*
 * @Description: 
 * @Author: Cxy
 * @Date: 2023-05-19 09:41:46
 * @LastEditors: Cxy
 * @LastEditTime: 2023-06-03 18:38:04
 * @FilePath: \pnpmft\packages\anchorpoint\rollup.config.ts
 */
import typescript from "rollup-plugin-typescript2";
import type { RollupOptions } from 'rollup'
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser';

const config: RollupOptions = {
    input: 'index.ts',
    output: [
        {
            file: 'dist/index.es.js',
            format: 'es',
            name: 'FTBP',
            sourcemap: true
        },
        {
            file: 'dist/index.umd.js',
            format: 'umd',
            name: 'FTBP',
            sourcemap: true,
            exports: "named"
        }
    ],
    plugins: [
        typescript(),
        babel({ babelHelpers: 'bundled', extensions: ['.ts'] }),
        terser()
    ]
};

export default config;