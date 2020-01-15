let m_commular = {
    verifyUtils: {
        isNull: function (val) {//验证输入内容是否为空
            let reg = /\S/;
            if (!reg.test(val)) {
                return true;
            }
            return false;
        },
        isLetter: function (val) {//验证输入内容是否是英文字母
            let reg = /^[a-zA-Z]+$/;
            if (reg.test(val)) {
                return true
            }
            return false
        },
        isInt: function (val) {//验证输入内容是否是数字
            let reg = /^[+-]?\d+$/g;
            if (reg.test(val)) {
                return true;
            }
            return false
        },
        isChinese: function (val) {//验证输入内容是否是中文
            var reg = /^[\u0391-\uFFE5]+$/;
            if (reg.test(val)) {
                return true;
            }
            return false;
        },
        isEamil: function (val) {//验证输入内容是否是邮箱地址
            let reg = /^\w+@\w+\.[a-zA-Z]{2,6}$/;
            if (reg.test(val)) {
                return true;
            }
            return false;
        },
        isPhone: function (val) {//验证输入内容是否是手机号码
            var reg = /^1[3-9]\d{9}$/;
            if (reg.test(val)) {
                return true;
            }
            return false;
        },
        isIdCord: function (val) {//验证输入内容是否是身份证号码
            var reg = /^\d{6}(18|19|20)\d{9}(\d|x|X)$/;
            if (reg.test(val)) {
                return true;
            }
            return false;
        },
        isLength: function (val) {
            var reg = /^(\w){6,}$/;
            if (reg.test(val)) {
                return true;
            }
            return false;
        },
        isLength15: function (val) {
            var reg = /(^\w{15}$)|(^\w{18}$)/;
            if (reg.test(val)) {
                return true;
            }
            return false;
        },
        clearChinese: function (value) {
            var reg = /([\u0391-\uFFE5]|\s)/g;
            return value.replace(reg, '');
        },
        pureInt: function (value) {
            var reg = /[^\d]/ig;
            var result = value.replace(reg, '');
            return result
        }
    },
    localStorage: {
        get: function (key) {
            var value = localStorage.getItem(key);
            if (value) {
                try {
                    var value_json = JSON.parse(value);
                    if (typeof value_json === 'object') {
                        return value_json;
                    } else if (typeof value_json === 'number') {
                        return value_json;
                    }
                } catch (e) {
                    return value;
                }
            } else {
                return false;
            }
        },
        set: function (key, value) {
            localStorage.setItem(key, value);
        },
        remove: function (key) {
            localStorage.removeItem(key);
        },
        clear: function () {
            localStorage.clear();
        }
    },
    timeDown: function (time, type) {
        var days = Math.floor(time / (60 * 60 * 24));
        var modulo = time % (60 * 60 * 24);
        var hours = Math.floor(modulo / (60 * 60));
        modulo = modulo % (60 * 60);
        var minutes = Math.floor(modulo / 60);
        var seconds = modulo % 60;
        if (type == 's') {
            return time + "";
        } else {
            return "还剩:" + dateFormat(minutes) + "分钟" + dateFormat(seconds) + "秒"; //days + "天" + hours + "小时" + 
        }

        function dateFormat(n) {
            return n > 9 ? n : '0' + n;
        }


    },
    timeFormat: function (time, fmStr) {
        let weekCN = '一二三四五六日';
        let weekEN = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let day = time.getDate();
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let seconds = time.getSeconds();
        let milliSeconds = time.getMilliseconds();
        let week = time.getDay();

        month = month >= 10 ? month : ('0' + month);
        day = day >= 10 ? day : ('0' + day);
        hours = hours >= 10 ? hours : ('0' + hours);
        minutes = minutes >= 10 ? minutes : ('0' + minutes);
        seconds = seconds >= 10 ? seconds : ('0' + seconds);

        if (fmStr.indexOf('yyyy') !== -1) {
            fmStr = fmStr.replace('yyyy', year);
        } else {
            fmStr = fmStr.replace('yy', (year + '').slice(2));
        }
        fmStr = fmStr.replace('mm', month);
        fmStr = fmStr.replace('dd', day);
        fmStr = fmStr.replace('hh', hours);
        fmStr = fmStr.replace('MM', minutes);
        fmStr = fmStr.replace('ss', seconds);
        fmStr = fmStr.replace('SSS', milliSeconds);
        fmStr = fmStr.replace('W', weekCN[week - 1]);
        fmStr = fmStr.replace('ww', weekEN[week - 1]);
        fmStr = fmStr.replace('w', week);

        return fmStr;
    },
    isIphone: function () {
        let u = window.navigator.userAgent;
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isiOS) {
            return true
        } else {
            return false
        }
    },
    backTop: function () {
        let app = document.getElementById('app')
        let top = app.scrollTop;
        if (top > 0) {
            var currentScroll =
                app.scrollTop || app.scrollTop;
            if (currentScroll > 0) {
                app.scrollTo(0, currentScroll - currentScroll / 5);
                return window.requestAnimationFrame(m_commular.backTop);

            }
        }
    }
}

export default m_commular;

