import type { FtLocation } from '../type'
import { arrangeRouterObj } from '../utils'

class vueRouter {
    lastLocation: FtLocation
    handlers: Function = () => { }
    constructor(vueRouter: any) {
        this.lastLocation = JSON.parse(JSON.stringify(location))
        vueRouter.afterEach((to: any, from: any) => this.refresh(to, from))
        window.addEventListener('beforeunload', this.refresh, false);
    }
    refresh(to?: any, from?: any) {
        const currentLocation = JSON.parse(JSON.stringify(location))
        this.emit(arrangeRouterObj({ ...currentLocation, path: to.path }), arrangeRouterObj({ ...this.lastLocation, path: from.path }));
        this.lastLocation = currentLocation
    }
    on(listener: Function) {
        this.handlers = listener;
    }
    emit(...args: FtLocation[]) {
        const handler = this.handlers;
        if (handler) {
            handler(...args);
        }
    }
}

export default vueRouter

