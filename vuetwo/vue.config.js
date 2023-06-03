/*
 * @Author: Cxy
 * @Date: 2021-03-04 16:39:19
 * @LastEditors: Cxy
 * @LastEditTime: 2023-05-18 09:20:30
 * @FilePath: \futian\pnpmft\vuetwo\vue.config.js
 */
const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: '/',
    assetsDir: 'assets',
    indexPath: 'index.html',
    runtimeCompiler: true, // 关键点在这
    lintOnSave: true, // 设置是否在开发环境下每次保存代码时都启用 eslint验证。
    productionSourceMap: process.env.NODE_ENV === 'developmen', // 不需要生产环境的设置false可以减小dist文件大小，加速构建
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
        if (process.env.NODE_ENV === 'production') {
            config.plugin('CompressionPlugin')
                .use(new CompressionPlugin({
                    algorithm: 'gzip', // 压缩算法/函数。
                    test: /\.html$|\.css$|\.js$/, // 匹配所有对应的文件。
                    filename: '[path].gz[query]',
                    threshold: 1024, // 只处理比这个值大的资源。按字节计算
                    minRatio: 1, // 压缩率比   压缩大小 / 原始大小
                    deleteOriginalAssets: false
                }))
        }
    },
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') { // 为生产环境修改配置...
            config.mode = 'production'
            config['performance'] = { // 这些选项可以控制 webpack 如何通知「资源(asset)和入口起点超过指定文件限制」
                'hints': 'warning',
                'maxEntrypointSize': 1048576,
                'maxAssetSize': 10485760
            }
        }
    },
    devServer: {
        open: true,  // npm run serve后自动打开页面
        host: '0.0.0.0', // 匹配本机IP地址(默认是0.0.0.0)
        // port: 1314, // 本地启动端口
    }
}

