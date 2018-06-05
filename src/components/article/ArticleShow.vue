<!-- 文章详情组件 -->
<template>
<div class="st-viewbox">
	<div class="article-show-index">
		<st-header  :title='$route.meta.title' fixed>
			<mu-icon-button  @click="$router.go(-1)" slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button>
		</st-header>
		<div class="header_mar"></div>
		<div class="article-show-item">
			<div class="artice-show">
				<div class="artice-show-tit" v-if="detail">
					<h5>{{detail.title}}</h5>
					<p>时间：{{detail.created_at}}</p>
				</div>
				<div class="artice-show-content" v-html="detail.content">
				</div>
				<div class="bg_line"></div>
			</div>
			<div style="display:none">{{share}}</div>
		</div>
		<copyright/>
	</div>
</div>
</template>

<script>
import Vue from 'vue';
import copyright from '@/components/compact/Copyright';
// import ArticleShowitem from '@/components/article/ArticleShowitem';
import Auth from '@/Services/Auth';
import Refercode from '@/Services/ReferCode';
import Sdk from '@/Services/Sdk';
import Data from '@/libs/Data';
export default {
	components: {
		'copyright': copyright,
		// 'st-articleshowitem':ArticleShowitem
	},
	data(){
		return Data.createMap( {
			detail: {
				// 对应 Data 目录下的文件
				subject: 'Article',
				// 对应其中的具体数据
				entity: 'detail',
				// 参数
				params: {
					article:this.$route.params.id
				},
				// preprocessor:refercode=>{
				// 	return this.preprocessor(refercode);

				// },
			},
			// attachs: {
			// 	// 对应 Data 目录下的文件
			// 	subject: 'Article',
			// 	// 对应其中的具体数据
			// 	entity: 'attach',
			// 	// 参数
			// 	params: {
			// 		article:this.$route.params.id
			// 	},
			// 	// preprocessor:refercode=>{
			// 	// 	return this.preprocessor(refercode);

			// 	// },
			// },

		},{
			Auth: Auth.proxy,
		});
	},
	computed:{
		share(){
			if(!( this.detail )) return null;
			Auth.then( Auth=> Auth.user? Refercode: Promise.resolve()).then(Refercode=>{
				new Sdk().share({
					title:this.detail.title, // 分享标题
					link: 'http://' + location.hostname + location.pathname + '?' + (Refercode ? 'relation='+ Refercode : '') + location.hash,// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: '', // 分享图标
					desc:this.detail.summary,
				})
			});
	　　　　return this.detail
	　　}

	},

};
</script>
<style type="text/css">
	.article-show-item .artice-show .artice-show-tit{background: #fff;font-size: 12px;overflow: hidden;padding: 0 10px 10px;border-bottom: 1px solid #eee;}
	.article-show-item .artice-show .artice-show-tit h5{ color: #000;font-size: 20px;font-weight: bold;padding: 20px 0;}
	.article-show-item .artice-show .artice-show-tit p{ color: #999;}
	.article-show-item .artice-show .artice-show-content{min-height: 450px;position: relative;color: #333;font-size: 18px !important;line-height: 30px;padding:10px;background: hsla(0, 0%, 98%, 1)}
	.article-show-item .artice-show .artice-show-content img{width: 100%;vertical-align: top;}
	.article-show-item .recommend{
		width: 100%;
		position: relative;
		padding-top:10px;
		background: #fff;
		padding-bottom: 10px;
	}
	.article-show-item .comment_title .Line {
		position: relative;
		width:90px;
		margin: 0 auto;
		text-align: center;
	}
	.article-show-item   .comment_title .Line:before {
		content: "";
		border-top: 2px solid #aaa;
		display: block;
		position: absolute;
		width: 10px;
		top: 50%;
		left: 0;
	}
	.article-show-item   .comment_title .Line:after {
		content: "";
		border-top: 2px solid #aaa;
		display: block;
		position: absolute;
		width: 10px;
		top: 50%;
		right: 0;
	}
	.article-show-item .comment_title {
		position: relative;
	}
	.article-show-item .yd-list-title span {
	    font-weight: normal;
	    color: #999;
	}
	.article-show-item .bg_line {
	    height: 3px;
	    background: hsla(0, 0%, 93%, 1);
	}
	.article-show-item .yd-list-theme4 .yd-list-item:after {
	    content: "";
	    position: absolute;
	    z-index: 0;
	    bottom: 0;
	    left: 0;
	    width: 100%;
	    border-bottom: 1px solid #d9d9d9;
	    -webkit-transform: scaleY(.5);
	    transform: scaleY(.5);
	    -webkit-transform-origin: 0 0;
	    transform-origin: 0 0;
	}
	.article-show-item .arcilefrom{background-color: #fff}
</style>
