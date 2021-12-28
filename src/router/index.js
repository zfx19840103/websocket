import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/ima',
            name: 'ima',
            meta: { title: 'ima' },
            component: () =>
                import ( /* webpackChunkName: "ima" */ '../components/ima.vue'),
        },
        {
            path: '/imc',
            name: 'imc',
            meta: { title: 'imc' },
            component: () =>
                import ( /* webpackChunkName: "imc" */ '../components/imc.vue'),
        },
    ]
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}