import request from './request'
import type { OptionsInter, SubVisiblePageInter, FtElement } from './type'
import htmlRouter from './watchRouter/htmlRouter'
import vueRouter from './watchRouter/vueRouter'
import wxRouter from './watchRouter/wxRouter'
import { mergeObj, useStorage, getUuid } from './utils'
import vueBP from './vueBP'
declare const wx: any;

class FTBP {
    options: OptionsInter = {
        url: '',
        defaultPath: '',
        uniqueIDConfig: { value: '' }
    }
    storageName = 'bpuuid'
    subVisits: Array<{ data: Object; path?: string; url?: string }> = []
    subTimePage: Array<Function> = []
    timeRecorder: number = Date.now()
    interOb: IntersectionObserver | undefined
    subVisiblePage: SubVisiblePageInter = {}
    constructor(options: OptionsInter, app: any, routes: any) {
        this.BPUpdateOptions(options)
        this.watchRouter(app, routes)
        this.watchPosiEvent()
    }

    static buryPoint = {
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

    BPUpdateOptions(options: OptionsInter) {
        const { storageName } = this
        if (!options.uniqueIDConfig?.value) {
            let uuidData = useStorage.getStorage(storageName)
            if (!uuidData) {
                uuidData = { temporUuid: getUuid() }
                useStorage.setStorage(storageName, uuidData)
            }
            if (options.accountNumber) {
                if (!uuidData[options.accountNumber]) {
                    if (uuidData['temporUuid']) {
                        const mergeUuid = JSON.stringify(uuidData).replace(/temporUuid/, options.accountNumber)
                        uuidData = JSON.parse(mergeUuid)
                    } else {
                        uuidData[options.accountNumber] = getUuid()
                    }
                }
                useStorage.setStorage(storageName, uuidData)
                this.options.uniqueIDConfig && (this.options.uniqueIDConfig.value = uuidData[options.accountNumber])
            } else {
                if (!uuidData['temporUuid']) {
                    uuidData['temporUuid'] = getUuid()
                    useStorage.setStorage(storageName, uuidData)
                }
                this.options.uniqueIDConfig && (this.options.uniqueIDConfig.value = uuidData['temporUuid'])
            }
        }
        this.options = mergeObj(this.options, options)
    }

    BPClick(data: object, path?: string, url?: string) {
        request(this.options, path, data, url)
    }

    watchRouter(app: any, routes: any) {
        let router;
        if (typeof wx === 'object') {
            router = new wxRouter()
        } else if (app) {
            router = new vueRouter(routes)
        } else {
            router = new htmlRouter();
        }
        router.on((to: any, from: any) => {
            this.loopVisTimePage(to, from)
        });
    }

    BPVisits(data: Object, path?: string, url?: string) {
        this.subVisits.push({ data, path, url })
    }

    BPTimePage(cb: Function) {
        this.subTimePage.push(cb)
    }

    resetVTP() {
        this.subVisits = []
        this.subTimePage = []
    }

    loopVisTimePage(to: any, from: any) {
        this.subVisits.forEach(({ path, data, url }) => {
            request(this.options, path, data, url)
        })
        const currentTime = Date.now()
        this.subTimePage.forEach(cb => {
            cb({ to, from, time: currentTime - this.timeRecorder }, (data: Object, path?: string, url?: string) => {
                request(this.options, path, data, url)
            })
        })
        this.timeRecorder = currentTime
        this.resetVTP()
    }

    watchPosiEvent() {
        this.interOb = new IntersectionObserver(c => {
            c.forEach(cc => {
                if (cc.intersectionRatio > 0) {
                    this.subVisiblePage[(cc.target as FtElement)['BPVEId']](
                        { time: cc.time }, (data: Object, path: string, url?: string) => {
                            request(this.options, path, data, url)
                        }
                    )
                    this.interOb?.unobserve(cc.target)
                }
            })
        }, {
            threshold: this.options.visAreaThreshold || 0.5
        })
    }

    BPVisiblePage(el: FtElement, cb: Function) {
        const curT = Date.now()
        el['BPVEId'] = curT
        this.interOb?.observe(el);
        this.subVisiblePage[curT] = cb
    }
}

export default FTBP