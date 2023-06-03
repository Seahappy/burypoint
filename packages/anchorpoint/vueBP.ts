import type { BindInter } from './type'

const BPClick = (el: Element, bind: BindInter, FTBP: any) => {
    el.addEventListener('click', () => {
        FTBP.BPClick(bind.value, bind.arg, bind.value.url)
    })
}

const BPVisiblePage = (el: Element, bind: BindInter, FTBP: any) => {
    FTBP.BPVisiblePage(el, ({ time }: any, cb: Function) => {
        cb({ time, ...bind.value }, bind.arg, bind.value.url)
    })
}

const vueBP = (app: any, FTBP: any) => {
    const keyVD = typeof app === 'function' ? 'bind' : 'mounted'
    app.directive('BPClick', {
        [keyVD]: (el: Element, bind: BindInter) => BPClick(el, bind, FTBP)
    })

    app.directive('BPVisiblePage', {
        [keyVD]: (el: Element, bind: BindInter) => BPVisiblePage(el, bind, FTBP)
    })
}

export default vueBP