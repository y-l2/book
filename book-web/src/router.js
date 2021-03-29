import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./views/Home.vue'),
            children: [
                {
                    path: '',
                    name: 'home',
                    component: () => import('./components/Home/home.vue'),
                },
                {
                    path: 'list',
                    name: 'list',
                    component: () => import('./components/Home/list.vue'),
                },
                {
                    path: 'detail',
                    name: 'detail',
                    component: () => import('./components/Home/detail.vue'),
                }
            ]
        },
        {
            path: '/user',
            name: 'user',
            component: () => import('./views/User.vue'),
            children: [
                {
                    path: '',
                    name: 'login',
                    component: () => import('./components/User/login.vue'),
                },
                {
                    path: 'register',
                    name: 'register',
                    component: () => import('./components/User/register.vue')
                }
            ]
        },
        {
            path: '/personal',
            name: 'personal',
            component: () => import('./components/Personal'),
            children: [
                {
                    path: '',
                    name: 'Address',
                    component: () => import('./components/Personal/address.vue'),
                },
                {
                    path: 'myorder',
                    name: 'MyOrder',
                    component: () => import('./components/Personal/myOrder.vue')
                }
            ]
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import('./components/Admin'),
            children: [
                {
                    path: '',
                    name: 'classify',
                    component: () => import('./components/Admin/classify.vue'),
                },
                {
                    path: 'commodity',
                    name: 'commodity',
                    component: () => import('./components/Admin/commodity.vue'),
                },
                {
                    path: 'order',
                    name: 'order',
                    component: () => import('./components/Admin/order.vue')
                },
            ]
        }
    ]
})
