const Farmer = () => import(/* webpackChunkName:'Farmer' */ '@/views/farmer/index.vue');
const Trade = () => import(/* webpackChunkName:'Farmer' */ '@/views/farmer/trade.vue');
const routes = [
    {
        path: '/',
        name: 'Farmer',
        component: Farmer,
        meta: {
            title: 'Farmer',
            key: 'farmer'
        }
    },
    {
        path: '/farm',
        name: 'Farmer',
        component: Farmer,
        meta: {
            title: 'Farmer',
            key: 'farmer'
        }
    },
    {
        path: '/trade',
        name: 'Trade',
        component: Trade,
        meta: {
            title: 'Trade',
            key: 'trade'
        }
    }
]


export default routes;
