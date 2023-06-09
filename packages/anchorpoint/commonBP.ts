import request from './request'
import type { OptionsInter, SubVisiblePageInter, FtElement } from './type'
import watchRouter from './watchRouter'
import { mergeObj, useStorage, getUuid } from './utils'

class FTBP {
    app: any
    options: OptionsInter = {
        url: "",
        defaultPath: "",
        uniqueIDConfig: { value: "" }
    }
    storageName = 'bpuuid'
    subVisits: Array<{ data: Object; path?: string; url?: string }> = []
    subTimePage: Array<Function> = []
    timeRecorder: number = Date.now()
    interOb: IntersectionObserver | undefined
    subVisiblePage: SubVisiblePageInter = {}
    vueRouter: any
    constructor(options: OptionsInter, app: any, vueRouter: any) {
        this.BPUpdateOptions(options)
        this.app = app
        app && (this.vueRouter = vueRouter)
        app ? this.watchVueRouter() : this.watchHtmlRouter()
        this.watchPosiEvent()
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
                this.options.uniqueIDConfig.value = uuidData[options.accountNumber]
            } else {
                if (!uuidData['temporUuid']) {
                    uuidData['temporUuid'] = getUuid()
                    useStorage.setStorage(storageName, uuidData)
                }
                this.options.uniqueIDConfig.value = uuidData['temporUuid']
            }
        }
        this.options = mergeObj(this.options, options)
    }

    BPClick(data: object, path?: string, url?: string) {
        request(this.options, path, data, url)
    }

    watchVueRouter() {
        this.vueRouter.afterEach((to: any, from: any) => {
            this.subVisits.forEach(({ path, data, url }) => {
                request(this.options, path, data, url)
            })
            this.loopTimePage(to, from)
        })
        window.addEventListener('beforeunload', () => {
            this.loopTimePage(null, history.state)
        })
    }

    watchHtmlRouter() {
        const router = new watchRouter();
        router.on((to: any, from: any) => {
            this.subVisits.forEach(({ path, data, url }) => {
                request(this.options, path, data, url)
                this.loopTimePage(to, from)
            })
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

    loopTimePage(to: any, from: any) {
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