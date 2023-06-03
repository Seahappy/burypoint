import type { OptionsInter } from './type'

const request = ({ url, defaultPath = '' }: OptionsInter, path: string = defaultPath, data: Object, hostUrl: string = '') => {
    const interStr = (hostUrl || url) + '/' + path
    const pathStr = objectToPath(data)
    if (navigator.sendBeacon) {
        navigator.sendBeacon(interStr + pathStr)
    } else {
        const img = new Image()
        img.src = interStr + pathStr
    }
}

export default request

const objectToPath = (data: Object) => {
    return data
        ? Object.entries(data).reduce(
            (prev, [key, val]) => {
                const symbol = prev.length === 0 ? '?' : '&';
                prev += `${symbol}${key}=${val}`;
                return prev;
            },
            ''
        )
        : '';
};