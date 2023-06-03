## burypoint 埋点工具包

### HTML
```javascript
// 初始化埋点
const buryPoint = new FTBP.default({
    url: 上报地址,
    defaultPath: 默认接口,
    visAreaThreshold: 内容可见比例
})
// 点击上报
buryPoint.BPClick(上报内容, 接口)
// 浏览次数
buryPoint.BPVisits(上报内容, 接口)
// 浏览时间
buryPoint.BPTimePage((dp, cb) => {
    cb({上报内容, time: dp.time }, 接口)
})
// 内容可见上报
buryPoint.BPVisiblePage(dom, ({ time }, cb) => {
    cb({ time, 上报内容 }, 接口)
})
```

### VUE2
```javascript
// main
import { buryPoint } from 'ft-burypoint'
Vue.use(buryPoint, router, {
    url: 上报地址,
    defaultPath: 默认接口,
    visAreaThreshold: 内容可见比例
})
// 点击上报
this.$BPClick(上报内容, 接口)
// 浏览次数
this.$BPVisits(上报内容, 接口)
// 浏览时间
this.$BPTimePage((dp, cb) => {
    cb({上报内容, time: dp.time }, 接口)
})
// 内容可见上报
this.$BPVisiblePage(dom, ({ time }, cb) => {
    cb({ time, 上报内容 }, 接口)
})

// 指令
// 点击上报
<button v-BPClick:接口="上报内容"></button>
// 内容可见上报
<div v-BPVisiblePage:接口="上报内容"></div>
```

### VUE3
```javascript
// main
import { buryPoint } from 'ft-burypoint'
Vue.use(buryPoint, router, {
    url: 上报地址,
    defaultPath: 默认接口,
    visAreaThreshold: 内容可见比例
})

// 组合式API
import { getCurrentInstance } from 'vue'
const buryPoint = getCurrentInstance()?.appContext.config.globalProperties
// 点击上报
buryPoint.$BPClick(上报内容, 接口)
// 浏览次数
buryPoint.$BPVisits(上报内容, 接口)
// 浏览时间
buryPoint.$BPTimePage((dp, cb) => {
    cb({上报内容, time: dp.time }, 接口)
})
// 内容可见上报
buryPoint.$BPVisiblePage(dom, ({ time }, cb) => {
    cb({ time, 上报内容 }, 接口)
})

// 选项API 与VUE2 一致
// 指令 与VUE2 一致
```