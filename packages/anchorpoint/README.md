## burypoint 埋点工具包

### CDN
Using jsDelivr CDN (ES5 UMD browser module):
```html
<script src="https://cdn.jsdelivr.net/npm/ft-burypoint@2.0.0/index.umd.js"></script>
```
Using unpkg CDN:
```html
<script src="https://unpkg.com/ft-burypoint@2.0.0/index.umd.js"></script>
```

### 参数
> new FTBP(config)
```js
new FTBP({
    url: string  // ip
    defaultPath: string // 默认接口
    visAreaThreshold?: number // 可视DOM阈值
    accountNumber?: string // 账号
    uniqueIDConfig?: { 
        key?: string // 唯一值key
        value?: string // 值
    }
    commonParam?: object // 通用参数
})
```

### 方法
- BPClick(data, interface)：事件
- BPVisits(data, interface)：页面浏览
- BPTimePage((data, callback) => { callback(data, interface) })：页面浏览时间
- BPVisiblePage((data, callback) => { callback(data, interface) })：内容可见

### 例子
```javascript
// HTML
const buryPoint = new FTBP(config)
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

// VUE2 实例挂在了vue原型上
import { buryPoint } from 'ft-burypoint'
Vue.use(buryPoint, router, config)
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

// VUE3 实例挂在了globalProperties上
import { buryPoint } from 'ft-burypoint'
app.use(buryPoint, router, config)
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

// 指令
// 点击上报
<button v-BPClick:接口='上报内容'></button>
// 内容可见上报
<div v-BPVisiblePage:接口='上报内容'></div>
```
