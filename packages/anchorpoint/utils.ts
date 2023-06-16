export const getUuid = (): string => {
    if (typeof crypto === 'object') {
        if (crypto?.randomUUID) return crypto.randomUUID();
        if (typeof Uint8Array === 'function') {
            return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c =>
                (Number(c) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> Number(c) / 4).toString(16)
            )
        }
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const useStorage = {
    setStorage(key: boolean | number | any | string, value: boolean | number | any | string | object) {
        return localStorage.setItem(key, JSON.stringify(value))
    },
    getStorage(key: boolean | number | any | string,) {
        return JSON.parse(localStorage.getItem(key) || '')
    }
}

import type { OptionsInter } from './type'
/* 合并对象仅支持两层 */
export const mergeObj = (...objs: any[]): OptionsInter =>
    [...objs].reduce(
        (acc, obj) =>
            Object.keys(obj).reduce((_a, k) => {
                typeof acc[k] === 'object'
                    ? Object.assign(acc[k], obj[k])
                    : acc[k] = obj[k];
                return acc;
            }, {}),
        {}
    );

export const objectToPath = (data = {}) => {
    return Object.entries(data).reduce(
        (prev, [key, val]) => {
            const symbol = prev.length === 0 ? '?' : '&';
            prev += `${symbol}${key}=${val}`;
            return prev;
        },
        ''
    )
};


const queryStringToObject = (url: string) => {
    if (!/\?/g.test(url)) return {}
    return url.split('?')[1].split('&').reduce(
        (prev, c) => {
            const searchData = c.split('=');
            (prev as any)[searchData[0]] = searchData[1]
            return prev
        },
        {}
    );
}

import type { FtLocation } from './type'
export const arrangeRouterObj = (routerObj: FtLocation) => ({ ...routerObj, query: queryStringToObject(routerObj.href) })
