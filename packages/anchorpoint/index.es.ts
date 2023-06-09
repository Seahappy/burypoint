import type { OptionsInter, FtElement } from './type'
import vueBP from './vueBP'
import FTBP from './commonBP'

export const buryPoint = {
    install: (app: any, vueRouter: any, options: OptionsInter) => {
        const buryingPoint = new FTBP(options, app, vueRouter)
        vueBP(app, buryingPoint)
        const vueCase = typeof app === 'function' ? app.prototype : app.config.globalProperties
        vueCase.$BPClick = (data: Object, path?: string, url?: string) => {
            buryingPoint.BPClick(data, path, url)
        }
        vueCase.$BPVisits = (data: Object, path?: string, url?: string) => {
            buryingPoint.BPVisits(data, path, url)
        }
        vueCase.$BPTimePage = (cb: Function) => {
            buryingPoint.BPTimePage(cb)
        }
        vueCase.$BPVisiblePage = (el: FtElement, cb: Function) => {
            buryingPoint.BPVisiblePage(el, cb)
        }
        vueCase.$BPUpdateOptions = (options: OptionsInter) => {
            buryingPoint.BPUpdateOptions(options)
        }
    }
}

export default FTBP
