import type { OptionsInter } from './type'
import { objectToPath } from './utils'

const request = ({ url, defaultPath, uniqueIDConfig, commonParam }: OptionsInter, path: string = defaultPath, data: Object, hostUrl: string = '') => {
    const interStr = (hostUrl || url) + '/' + path
    const pathStr = objectToPath(Object.assign(data, commonParam))
    const fullUrl = interStr + (pathStr ? pathStr + '&' : '?') + (uniqueIDConfig?.key || 'uuid') + '=' + (uniqueIDConfig?.value)
    if (navigator.sendBeacon) {
        navigator.sendBeacon(fullUrl)
    } else {
        const img = new Image()
        img.src = fullUrl
    }
}

export default request