const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/counter',
        component: (resolve) => require(['./views/Counter.vue'], resolve)
    }
];
export default routers;