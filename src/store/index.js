import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex);

const store = new vuex.Store({
    state: {
        title: false,
        userInfo: {},
        BASE_IMG: process.env.IMG_URL,
        homeScroll: 0
    },
    getters: {

    },
    mutations: {
        setTitle(state, val) {
            state.title = val;
        },
        setUserInfo(state, val) {
            state.userInfo = val
        },
        setHomeScroll(state, val) {
            state.homeScroll = val
        }
    },
    actions: {

    }
});
export default store;