/*
 * @Author: Rain 1254895072@qq.com
 * @Date: 2022-04-21 19:44:18
 * @LastEditors: Rain 1254895072@qq.com
 * @LastEditTime: 2022-06-10 10:30:43
 * @FilePath: \jpetstore-client-front\src\utils\common.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import $ from "jquery"
import router from '../router/index.js'

const ServerDomain = window.ServerDomain;
const ApiUrl = window.ApiUrl;

const common = {
    ServerDomain: ServerDomain,
    ApiUrl: "http://localhost:8083",
    ajax(obj) {
        if (!obj.headers) obj.headers = {}
        if (localStorage.token) obj.headers.token = localStorage.token
        if (!obj.error) obj.error = function(e) {
            console.log("request fail:", e);
            common.showFailToast();
        }
        obj.url='/api/'+obj.url
        $.ajax(obj)
    },
    showFailToast() {
        common.getApp().toast("无法联网或者服务器异常")
    },
    getWeekday() {
        var now = new Date();
        var day = now.getDay();
        var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
        var week = weeks[day];
        return week;
    },

    getTime() {
        let obj = {}
        let currend_date = new Date()
        let year = currend_date.getFullYear()
        let month = currend_date.getMonth() + 1
        let date = currend_date.getDate()
        let hour = currend_date.getHours()
        let minute = currend_date.getMinutes()
        let second = currend_date.getSeconds()
        let tem = { month, date, hour, minute, second }
        for (let i in tem) {
            tem[i] = tem[i] + ""
            if (tem[i].length <= 1) {
                tem[i] = "0" + tem[i] //低于两位补0
            }
        }

        obj.date = year + "-" + tem.month + "-" + tem.date
        obj.weekday = common.getWeekday()
        obj.time = tem.hour + ": " + tem.minute + ": " + tem.second;
        return obj
    },
    error(code, msg) {
        if (code === undefined) {

            common.getApp().toast("服务器异常")
            return;
        }
        switch (code) {
            case 10005: //未登录
            case 10006: //	登录过期，请重新登录
                common.getApp().toast(msg)
                common.getApp().is_login = false
                common.getRouter().replace({ path: "/login" })
                break;
            default:

                common.getApp().toast('错误:' + msg)
                console.log(msg)
                break;
        }
    },
    getApp() {
        let $app = document.querySelector("#app")
        if (!$app.__vue_app__) {
            console.log("can not get app instance")
            return
        }
        return common.app
    },
    getRouter() {
        return router
    },
}
window.common = common
export default common