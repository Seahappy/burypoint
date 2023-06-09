import type { OptionsInter } from './type'

const request = ({ url, defaultPath, uniqueIDConfig }: OptionsInter, path: string = defaultPath, data: Object, hostUrl: string = '') => {
    const interStr = (hostUrl || url) + '/' + path
    const pathStr = objectToPath(data)
    const fullUrl = interStr + (pathStr ? pathStr + '&' : '?') + (uniqueIDConfig.key || "uuid") + "=" + (uniqueIDConfig.value)
    if (navigator.sendBeacon) {
        navigator.sendBeacon(fullUrl)
    } else {
        const img = new Image()
        img.src = fullUrl
    }
}

export default request

const objectToPath = (data = {}) => {
    return Object.entries(data).reduce(
        (prev, [key, val]) => {
            const symbol = prev.length === 0 ? '?' : '&';
            prev += `${symbol}${key}=${val}`;
            return prev;
        },
        ''
    )
};