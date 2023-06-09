import type { FtHistory, FtEvent } from './type'

class watchRouter {
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
            return function () {
                const rv: Function = orig.apply(this, arguments);
                const e = (new Event(type) as FtEvent);
                e.arguments = arguments;
                window.dispatchEvent(e);
                return rv;
            };
        };
        window.history.pushState = listener('pushState');
        window.history.replaceState = listener('replaceState');
    }
    refresh() {
        const currentLocation = JSON.parse(JSON.stringify(location))
        this.emit(currentLocation, this.lastLocation);
        this.lastLocation = currentLocation
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

export default watchRouter