declare const wx: any;
declare const getCurrentPages: any;

class wxRouter {
    handlers: Function = () => { }
    constructor() {
        wx.onAppRoute(() => {
            const pages = getCurrentPages();
            this.refresh(pages.slice(-1), pages.slice(-2, -1))
        })
    }
    refresh({ route: toRoute }: any, { route: fromRoute }: any) {
        this.emit({ path: toRoute }, { path: fromRoute });
    }
    on(listener: Function) {
        this.handlers = listener;
    }
    emit(...args: object[]) {
        const handler = this.handlers;
        if (handler) {
            handler(...args);
        }
    }
}

export default wxRouter

