<!--文章列表组件 -->
<template>
	<div class="article-list">
		<st-header  :title='$route.params.name' fixed>
			<mu-icon-button  @click="$router.go(-1)" slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button>
		</st-header>
		<div class="header_mar"></div>
		<st-articleitem/>
	</div>
</template>

<script>
import Vue from 'vue';
import copyright from '@/components/compact/Copyright';
import Data from '@/libs/Data';
import configs from '@/configs/app';
import Auth from '@/Services/Auth';
import Articleitem from '@/components/article/ArticleListitem';
import {ListTheme, ListItem, ListOther} from 'vue-ydui/dist/lib.px/list';
Vue.component(ListTheme.name, ListTheme);
Vue.component(ListItem.name, ListItem);
Vue.component(ListOther.name, ListOther);
export default {

	components: {
		'st-articleitem': Articleitem
	},
	beforeRouteEnter(to, from, next) {
	// 路由导航钩子，此时还不能获取组件实例 `this`，所以无法在data中定义变量（利用vm除外）
	// 参考 https://router.vuejs.org/zh-cn/advanced/navigation-guards.html
	// 所以，利用路由元信息中的meta字段设置变量，方便在各个位置获取。这就是为什么在meta中定义isBack
	// 参考 https://router.vuejs.org/zh-cn/advanced/meta.html
	if(from.name=='ArticleShow'){
		to.meta.isBack=true;
		//判断是从哪个路由过来的，
		//如果是详情过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
	}
		next();
	},
	metaInfo () {
	    const title = this.$route.params.name;
	    return {
	        title: title,
	        meta: [{content: title }]
	    }
	},
	data(){
		return {

		}
	},
};
</script>
<style type="text/css">
</style>
