/*
 * @Description: 
 * @Author: Cxy
 * @Date: 2023-05-18 09:22:56
 * @LastEditors: Cxy
 * @LastEditTime: 2023-05-31 15:21:42
 * @FilePath: \futian\pnpmft\vuetwo\src\main.js
 */
/*
 * @Author: Cxy
 * @Date: 2021-02-27 23:02:14
 * @LastEditors: Cxy
 * @LastEditTime: 2022-09-22 10:03:19
 * @FilePath: \ehomes-admind:\giteeBlog\blogWeb\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { buryPoint } from 'ft-burypoint'

Vue.use(buryPoint, router, {
    url: 'http://localhost:1314',
    defaultPath: 'point',
    VisAreaThreshold: 0.2
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
// Axios.defaults.baseURL = '/api'  // 配置后接口开头可不写/api默认全加 本项目有两个后端地址固不可添加

