<!-- 文章列表子组件 -->
<template>
	<div class="article-item st-warp">
		<div class="initialization on" v-if="articles.articles[0]&&articles.articles[0].loding === 'loding'">
			<div class="loader"></div>
		</div>


		<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" style="width:100%" v-else-if="articles.articles.length > 0">
			<yd-list theme="4" slot="list">
				<yd-list-item v-for="article in articles.articles" :key="article.id"  type="link" :href="{name: 'ArticleShow',params: {id: article.id}}">
						<img slot="img" :src="article.thumb">
						<p slot="title">{{article.title}}</p>
						<div class="article-summary" slot="title">
							<div>
								{{article.summary}}
							</div>
						</div>
					</yd-list-item>
			</yd-list>
				<!-- 数据全部加载完毕显示 -->
				<span slot="doneTip">——— 亲，看完了———</span>
				<!-- 加载中提示 -->
				<img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>

		</yd-infinitescroll>
		<div v-else-if="articles.articles.length === 0" style="width:100%">
			<st-nodata content="暂无相关数据"  :icon="style"></st-nodata>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import copyright from '@/components/compact/Copyright';
import Data from '@/libs/Data';
import configs from '@/configs/app';
import Auth from '@/Services/Auth';
import Ajaxy from 'ajaxy';
import {InfiniteScroll} from 'vue-ydui/dist/lib.px/infinitescroll';
import {ListTheme, ListItem, ListOther} from 'vue-ydui/dist/lib.px/list';
Vue.component(InfiniteScroll.name, InfiniteScroll);
Vue.component(ListTheme.name, ListTheme);
Vue.component(ListItem.name, ListItem);
Vue.component(ListOther.name, ListOther);
export default {
	data(){
		return{
			Auth: Auth.proxy,
			page: 6,
			pageSize: 6,
			Auth: Auth.proxy,
			style:'icon-favor',
			articles:'',
			isFirstEnter:false
		}
	},
	props:{
		cate:Number
	},
	activated() {
		z(!this.$route.meta.isBack)
		z(this.isFirstEnter)
	if(!this.$route.meta.isBack || this.isFirstEnter){
		// 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
		// 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
		this.page= 15;
		this.pageSize=15;
		this.createMap();
		// this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
	}
		this.page= this.page;
		this.pageSize=this.pageSize;
		// 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
		this.$route.meta.isBack=false;
		this.isFirstEnter=false;
	},
	created() {
		this.createMap();
		this.page= 15;
		this.pageSize=15;
		this.isFirstEnter=true;
	  // 只有第一次进入或者刷新页面后才会执行此钩子函数
	  // 使用keep-alive后（2+次）进入不会再执行此钩子函数
	},
	methods: {
		createMap() {
			return this.articles = Data.createMap( {
				articles: {
					// 对应 Data 目录下的文件
					subject: 'Article',
					// 对应其中的具体数据
					entity: 'article',
					// 参数
					params: {
						category:this.cate,
						take: 15,
						skip: 0,
					},
					// preprocessor:refercode=>{
					// 	return this.preprocessor(refercode);

					// },
				},
			},{

			});

		},
		loadList() {
			Ajaxy.get( `${configs.Category.apiBaseUrl}${this.cate}/article`, {take:this.pageSize, skip:this.page,})
				.when( 200, response=> {
					const _articles = response.json;
					this.articles.articles = [...this.articles.articles, ..._articles];
					if (_articles.length < this.pageSize) {
						/* 所有数据加载完毕 */
						this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
						return;
					}
					/* 单次请求数据完毕 */
					this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
					this.page = this.page+this.page;
				} )

			;
		}
	}
};
</script>
<style type="text/css">
	.article-item .yd-list-theme4 .yd-list-item .yd-list-title{    max-height: 68px;-webkit-line-clamp: 1;}
	.article-item .yd-list-theme4 .yd-list-item .article-summary{
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-break: break-all;
		text-overflow: ellipsis;
		line-height: 19px;
		max-height: 47px;
		color:#999;
		font-weight: normal;
	}
	.article-item .yd-list-theme4 .yd-list-item .yd-list-title p{line-height: 30px}
	.article-item  .yd-list-theme4 .yd-list-item .yd-list-img{width: 70px;padding: 34px 0}
</style>
