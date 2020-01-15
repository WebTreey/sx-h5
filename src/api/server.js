import axios from 'axios'
import commular from '../utils'
import { Toast, Indicator } from 'mint-ui';
import Bridge from '../utils/bridge';
import store from '../store'
var { localStorage } = commular;
var isTrue = commular.isIphone();// true为苹果，fasle为安卓

function isLogin() {
    var data = {}
    if (isTrue) {
        Bridge.callhandler('getUserKey', {}, function (data) {
            data = data
        })
    } else {
        try {
            var userKey = window.Androids.getUserKey();
            var name = window.Androids.getUserName();
            data = { userKey, name }
            store.state.userInfo = data
        } catch (err) {
            console.log('获取token失败,请在app端运行')
        }
        return data
    }
    return data
}
var userInfo = store.state.userInfo.userKey = isLogin()
let service = new axios.create({
    timeout: 10000
})
service.interceptors.request.use(function (config) {
    Indicator.open();
    //'8KDJ26_52a634ce7e84b31a371bca481b8ce126' //
    config.headers.userKey = '8KDJ26_52a634ce7e84b31a371bca481b8ce126' // userInfo.userKey || store.state.userInfo.userKey
    return config;
}, error => {  //请求错误处理
    Promise.reject(error)
});
service.interceptors.response.use(response => {  //成功请求到数据
    Indicator.close();

    var response = typeof response == 'string' ? JSON.parse(response) : response;
    if (response.data.success) {
        return response.data;
    } else {
        if (response.data.message == "用户未登录") {
            if (isTrue) {
                Bridge.callhandler('logout', {}, function (data) {
                    console.log('用户未登录')
                })
            } else {
                try {
                    window.Androids.logout();
                } catch (err) {
                    console.log('用户未登录')
                }
            }
            localStorage.remove();
        }
        Toast({
            message: response.data.message || '未知错误',
            position: 'center'
        })
        return Promise.reject(response.data)
    }
    //这里根据后端提供的数据进行对应的处理
    // return response.data;
},
    error => {  //响应错误处理
        console.log(error)
        Indicator.close();
        return Promise.reject(error)
    }

);

export default service;