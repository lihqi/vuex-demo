import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Vuex from 'vuex';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';


Vue.use(VueRouter);
Vue.use(Vuex);

Vue.use(iView);



// 路由配置
const RouterConfig = {
    //mode: 'history',
    mode: 'hash',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});


const store = new Vuex.Store({
    //数据
    state: {
        count: 0,
        thisIndex: 0,
        arr: [0, 1, 2]
    },
    getters: {
        evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
    },
    mutations: {
        increment(state) {
            state.count++;
            console.log('mutation')
        },
        decrement(state) {
            state.count--
        },
        showWhich(state, item) {
            state.thisIndex = item;
        },
        setArr(state, newArr) {
            state.arr = newArr;
        }
    },
    actions: {
        increment: ({ commit }) => commit('increment'),
        decrement: ({ commit }) => commit('decrement'),
        incrementIfOdd({ commit, state }) {
            if ((state.count + 1) % 2 === 0) {
                commit('increment')
            }
        },
        incrementAsync({ commit }) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit('increment')
                    resolve()
                }, 1000)
            })
        },
        setArrAsync({ commit }, newArr) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit('setArr', newArr)
                    resolve()
                }, 2000)
            })
        }
    }
});


new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});