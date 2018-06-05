import Init from './libs/Init';
import '@/Services/WechatAuth';
import Auth from '@/Services/Auth';
import Vuestui from './Assembly';
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// import vuet from './vuet/';
import 'vue-ydui/dist/ydui.base.css';
//muse部分 开始-------------------------------
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import 'muse-ui/dist/theme-light.css'; // 使用 carbon 主题

// ydui组价弹框加载全局
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.px/dialog';

// 自定义组件
import StCellItem from '@/components/compact/StCellItem';


import VueLazyload from 'vue-lazyload' //引入这个懒加载插   件

import img from '@/assets/images/loading10.svg' //懒加载 图片
Vue.use(Vuestui);

Vue.use(MuseUI);
//muse部分 结束-------------------------------

Vue.config.productionTip = false;

// 自定义组件
Vue.component('st-cellitem', StCellItem)

// ydui组价弹框加载全局
Vue.prototype.$dialog = {
	confirm: Confirm,
	alert: Alert,
	toast: Toast,
	notify: Notify,
	loading: Loading,
};


// 或者添加VueLazyload 选项
Vue.use(VueLazyload, {
	preLoad: 1.3,
	loading: img,
	attempt: 1
})

const FastClick = require('fastclick');

document.addEventListener('DOMContentLoaded', function () {
	FastClick.attach(document.body);
}, false);

/* eslint-disable no-new */
new Vue({
	el: '#app',
	// vuet,
	router,
	template: '<App/>',
	components: { App, },
});
// router.beforeEach((to, from, next) => {
// 	console.log(to,localStorage.getItem('token'))
//     if (z(to.meta.requiresAuth)) {  // 判断该路由是否需要登录权限

//         if (localStorage.getItem('token')) {  // 通过vuex state获取当前的token是否存在
//             next();
//         }
//         else {
//         	console.log('1')
//             next({
//                 path: '/login',
//                 query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//             })
//         }
//     }
//     else {
//         next();
//     }
// })
