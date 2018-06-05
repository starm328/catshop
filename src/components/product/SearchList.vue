<!-- 产品搜索组件 -->
<template>
<div class="st-viewbox">
	<div class="product-category">
		<!-- 			header 					 -->
		<st-header  :title='$route.meta.title' fixed>
			<mu-icon-button  @click="$router.go(-1)" slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button>
		</st-header>
		<div class="header_mar"></div>
		<!-- 			header end					 -->

		<!-- 			没有数据时组件显示					 -->
		<div v-show="tagged.length === 0" style="width:100%">
			<st-nodata content="暂无相关数据" :icon="style"></st-nodata>
		</div>
		<!-- 			没有数据时组件显示 end					 -->



		<!-- 			搜索出来的产品列表					 -->
		<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" style="width:100%">
			<yd-list theme="1" slot="list">
				<div class="product-item">
					<product-item v-for="product in tagged" :key="product.id" :product="product"></product-item>
				</div>
			</yd-list>
			<!-- 数据全部加载完毕显示 -->
			<span slot="doneTip">——— 亲，看完了———</span>
			<!-- 加载中提示 -->
			<img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
		</yd-infinitescroll>
		<!-- 			搜索出来的产品列表end					 -->


		<!-- 			返回顶部组件					 -->
		<yd-backtop></yd-backtop>
	</div>
</div>
</template>
<script>
	import Vue from 'vue';
	import {BackTop} from 'vue-ydui/dist/lib.px/backtop';
	import PriceCalculator from '@/Services/PriceCalculator';
	import {ListTheme, ListItem, ListOther} from 'vue-ydui/dist/lib.px/list';
	import {InfiniteScroll} from 'vue-ydui/dist/lib.px/infinitescroll';
	import ProductItem from '@/components/product/ProductItem';
	import configs from '@/configs/app';
	import Ajaxy from 'ajaxy';
	import Data from '@/libs/Data';

	Vue.component(InfiniteScroll.name, InfiniteScroll);
	Vue.component(ListTheme.name, ListTheme);
	Vue.component(BackTop.name, BackTop);
	export default {
		name: 'product-category',
		components: {
			'product-item': ProductItem,
		},
		metaInfo () {
		    const title = '搜索列表'
		    return {
		        title: title,
		        meta: [{content: title }]
		    }
		},

		data(){
			return Data.createMap( {
				tagged: {
					subject: 'Product',
					entity: 'search',
					params: {
						keyWords:this.$route.params.keyWords,
						take: 6,

					},
				},
			},{
				page: 6,
				pageSize: 6,
				style:'icon-favor'
			});
		},

		methods: {
			loadList() {
				Ajaxy.get( `${configs.catShop.apiBaseUrl}products/search/${this.$route.params.keyWords}`, {take:this.pageSize, skip:this.page,})
					.when( 200, response=> {
						const _tagged = response.json;
						this.tagged = [...this.tagged, ..._tagged];
						if (_tagged.length < this.pageSize) {
							/* 所有数据加载完毕 */
							this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
							console.log(response.json.length+6);
							return;
						}
						/* 单次请求数据完毕 */
						this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
						this.page = this.page+ this.page;
					} )

				;
			}
		}
	};
</script>
<style type="text/css">
.product-item{    display: -webkit-box;display: -ms-flexbox;display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;-webkit-box-align: stretch;-ms-flex-align: stretch;align-items: stretch;padding-right: 5px;padding-bottom: 5px;max-width: 1020px;margin: 0 auto;width: 100%;}
	.product-category::after{clear: both;display: block;content: ''}
	.mkd_main{padding:0 !important;}
	.product-category{
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
		-webkit-box-align: stretch;
		-ms-flex-align: stretch;
		align-items: stretch;
		padding-bottom: 5px;
		max-width: 1020px;
		margin: 0 auto;
		width: 100%;
	}
</style>
