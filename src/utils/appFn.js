import router from '../router'
import bridge from './bridge'
window.statePages = function (state, id) {
    router.replace({ name: '/statePages', query: { state, id } });
}
bridge.registerhandler('statePages', function (res) {
    router.replace({ name: '/statePages', query: { state: res.status, id: res.orderId } });
})

