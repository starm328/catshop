// 时间组件
import Sttime from './time/time'
// 头部组件
import StHeader from './header'
// 异常流组件
import StNodata from './nodata'

var components = {
	Sttime,
	'st-header': StHeader,
	'st-nodata': StNodata,
}


export default {
	install (Vue) {
		Object.keys(components).forEach((key) => Vue.component(key, components[key]))
	}
}
