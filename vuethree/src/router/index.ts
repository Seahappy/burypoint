import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  // history: createWebHistory(Object.assign(import.meta.env.BASE_URL, { MODE: 'hash' })),
  history: createWebHistory('/'),

  routes: [
    {
      path: '/',
      redirect: '/a',
      component: () => import('@/views/homeView.vue'),
      children: [
        {
          path: 'a',
          component: () => import('@/views/aV.vue')
        },
        {
          path: 'b',
          component: () => import('@/views/bV.vue')
        },
      ]
    },
  ]
})
// html history
// hash: ""
// host: "localhost:5173"
// hostname: "localhost"
// href: "http://localhost:5173/b"
// origin: "http://localhost:5173"
// pathname: "/b"
// port: "5173"
// protocol: "http:"
// search: ""

// hash: "#/3"
// host: "127.0.0.1:5500"
// hostname: "127.0.0.1"
// href: "http://127.0.0.1:5500/pnpmft/html/hash.html#/3"
// origin: "http://127.0.0.1:5500"
// pathname: "/pnpmft/html/hash.html"
// port: "5500"
// protocol: "http:"
// search: ""

export default router
