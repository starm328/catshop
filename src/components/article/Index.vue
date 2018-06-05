<!-- 文章首页 -->
<template>
<div class="st-viewbox">
	<div class="article-index st-center">
		<st-header  :title='$route.meta.title' fixed>
			<mu-icon-button @click="$router.go(-1)" v-if="url !== '/'" slot="left"><i class="st-icon icon-back"></i></mu-icon-button>
			<mu-icon-button @click="$router.replace('/')" v-else slot="left"><i class="st-icon icon-back"></i></mu-icon-button>
		</st-header>
		<div class="header_mar"></div>
		<div class="initialization on" v-if="categorys[0]&&categorys[0].loding === 'loding'">
			<div class="loader"></div>
		</div>
		<div v-else-if="categorys.length > 0">
			<div class="about-upnav" >
				<ul>
					<li><router-link  :to="{name: 'ArticleCate'}" replace>首页</router-link></li>
					<li v-for="category in categorys"><router-link  :to="{name: 'Article',params: {id: category.id}}" replace class="sta">{{category.name}}</router-link></li>
				</ul>
			</div>
			<st-main />
			<st-articleitem/>
		</div>

		<div v-else-if="categorys.length === 0" style="width:100%">
			<st-nodata content="暂无相关数据" :icon="style"></st-nodata>
		</div>
	</div>
	<copyright></copyright>
</div>

</template>

<script>
import Vue from 'vue';
import copyright from '@/components/compact/Copyright';
import Data from '@/libs/Data';
import configs from '@/configs/app';
import Auth from '@/Services/Auth';
import Main from '@/components/article/Main';
import Refercode from '@/Services/ReferCode';
import Sdk from '@/Services/Sdk';
import Articleitem from '@/components/article/Articleitem';
export default {

	components: {
		'copyright': copyright,
		'st-main': Main,
		'st-articleitem': Articleitem
	},
	metaInfo () {
	    const title = '文章';
	    return {
	        title: title,
	        meta: [{content: title }]
	    }
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
	data(){
			return Data.createMap({
				categorys: {
					// 对应 Data 目录下的文件
					subject: 'Article',
					// 对应其中的具体数据
					entity: 'category',
					// 参数
					params: {
						apply: configs.Category.app,
					},
				},
			},{
				Auth: Auth.proxy,
				url:null,
				style:'icon-favor',
			})

	},
};
</script>

<style type="text/css">

.article-index .about-upnav ul{    display: -webkit-box;display: -ms-flexbox;display: flex;background: #fff;line-height: 40px;background: #fff;font-size: 16px;position: relative;box-sizing: border-box;display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-orient: horizontal;-webkit-box-direction: normal;-ms-flex-direction: row;flex-direction: row;z-index: 0;-webkit-box-flex: 1;-ms-flex: 1 1 0%;flex: 1 1 0%;overflow-x: scroll;overflow-y: hidden;}
.article-index .about-upnav ul li{    position: relative;box-sizing: border-box;display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-orient: vertical;-webkit-box-direction: normal;-ms-flex-direction: column;flex-direction: column;-webkit-box-flex: 0;-ms-flex: 0 0 auto;flex: 0 0 auto;margin-left: 0px;text-align: center;padding:0 10px;}
.article-index .about-upnav ul li:nth-child(2){display: none;}
.article-index .about-upnav ul li.active{border-bottom: 1px solid #ff002a;}
.article-index .about-upnav ul li.active a{color: #ff002a}
.article-index .about-upnav ul li a{color:#666666;}


.article-index .about-upnav ul li a{    color: #666;}
.article-index .about-upnav ul li a.router-link-active{color: #ff002a;border-bottom: 2px solid #ff002a}
</style>
