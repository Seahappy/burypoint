import request from './request'
import type { OptionsInter, SubVisiblePageInter, FtElement } from './type'
import watchRouter from './watchRouter'

class FTBP {
    app: any
    options: OptionsInter
    subVisits: Array<{ data: Object; path?: string; url?: string }> = []
    subTimePage: Array<Function> = []
    timeRecorder: number = Date.now()
    interOb: IntersectionObserver | undefined
    subVisiblePage: SubVisiblePageInter = {}
    vueRouter: any
    constructor(options: OptionsInter, app: any, vueRouter: any) {
        this.options = options;
        this.app = app
        app && (this.vueRouter = vueRouter)
        app ? this.watchVueRouter() : this.watchHtmlRouter()
        this.watchPosiEvent()
    }

    BPClick(data: object, path?: string, url?: string) {
        request(this.options, path, data, url)
    }

    watchVueRouter() {
        this.vueRouter.afterEach((to: any, from: any) => {
            this.subVisits.forEach(({ path, data, url }) => {
                request(this.options, path, data, url)
            })
            this.loopTimePage(from, to)
            this.resetVTP()
        })
        window.addEventListener('beforeunload', () => {
            this.loopTimePage(history.state)
        })
    }

    watchHtmlRouter() {
        const router = new watchRouter();
        router.on((to: any, from: any) => {
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

    loopTimePage(from: any, to: any = null) {
        const currentTime = Date.now()
        this.subTimePage.forEach(cb => {
            cb({ to, from, time: currentTime - this.timeRecorder }, (data: Object, path: string, url?: string) => {
                request(this.options, path, data, url)
            })
        })
        this.timeRecorder = currentTime
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