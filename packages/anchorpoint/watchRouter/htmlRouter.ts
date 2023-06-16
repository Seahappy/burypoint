import type { FtHistory, FtEvent } from '../type'
import { arrangeRouterObj } from '../utils'

class htmlRouter {
    lastLocation: Location
    handlers: Function = () => { }
    constructor() {
        this.lastLocation = JSON.parse(JSON.stringify(location))
        this.refresh = this.refresh.bind(this);
        this.addStateListener();
        window.addEventListener('hashchange', this.refresh, false);
        window.addEventListener('pushState', this.refresh, false);
        window.addEventListener('replaceState', this.refresh, false);
        window.addEventListener('beforeunload', this.refresh, false);
    }
    addStateListener() {
        const listener = (type: string) => {
            const orig = (history as FtHistory)[type];
            return (...args: any) => {
                const rv: Function = orig.apply(history, args);
                const e = (new Event(type) as FtEvent);
                e.arguments = args;
                window.dispatchEvent(e);
                return rv;
            };
        };
        window.history.pushState = listener('pushState');
        window.history.replaceState = listener('replaceState');
    }
    refresh() {
        const currentLocation = JSON.parse(JSON.stringify(location))
        this.emit(arrangeRouterObj({ ...currentLocation, path: this.InterceptRout(currentLocation.href) }),
            arrangeRouterObj({ ...this.lastLocation, path: this.InterceptRout(this.lastLocation.href) }));
        this.lastLocation = currentLocation
    }
    InterceptRout(url: string) {
        const path = url.match(/(?<=#).*(?=\?)|(?<=#).*/g)
        return path ? path[0] : ''
    }
    on(listener: Function) {
        this.handlers = listener;
    }
    emit(...args: Location[]) {
        const handler = this.handlers;
        if (handler) {
            handler(...args);
        }
    }
}

export default htmlRouter