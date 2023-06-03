import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/a',
        name: 'a',
        component: () => import('../a.vue'),
        meta: { title: '首页', topNavSH: true, bottomNavSH: true }
    },
    {
        path: '/b',
        name: 'b',
        component: () => import('../b.vue'),
        meta: { title: '首页', topNavSH: true, bottomNavSH: true }
    },
    {
        path: '/',
        redirect: '/a'
    }
]

const createRouter = () => new VueRouter({
    mode: 'history',
    routes
    // 跳转页面获取滚动条 但是在本项目中不会生效因为滚动条不是外部滚动
    /*  scrollBehavior(to, from, savedPosition) {
       return {
         x: 0,
         y: 0,
         behavior: 'smooth',
       }
     } */
})

const router = createRouter()

export default router
