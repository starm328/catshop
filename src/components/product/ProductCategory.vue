<!-- 产品分类列表组件 -->
<template>
<div class="st-viewbox">
	<div class="product-category">
		<!-- 			header 组件		 -->
		<st-header  :title='$route.meta.title' fixed>
			<mu-icon-button  @click="$router.go(-1)" slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button>
		</st-header>
		<div class="header_mar"></div>
		<!-- 			header 组件end		 -->
		<div class="initialization on" v-if="tagged.tagged[0]&&tagged.tagged[0].loding === 'loding'">
			<div class="loader"></div>
		</div>

		<!-- 			产品列表 组件		 -->
		<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" style="width:100%" v-else-if="tagged.tagged.length > 0">
			<yd-list theme="1" slot="list">
				<div class="product-item">
					<product-item v-for="product in tagged.tagged" :key="product.id" :product="product"></product-item>
				</div>
			</yd-list>

			<!-- 数据全部加载完毕显示 -->
			<span slot="doneTip">——— 亲，看完了———</span>
			<!-- 加载中提示 -->
			<img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>

		</yd-infinitescroll>
		<!-- 			产品列表 组件end		 -->

		<!-- 			没有数据 组件		 -->
		<div v-else-if="tagged.tagged.length == 0" style="width:100%">
			<st-nodata content="暂无相关数据" :icon="style"></st-nodata>
		</div>
		<!-- 			没有数据 组件end		 -->


		<!-- 			返回顶部 组件		 -->
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
	import Auth from '@/Services/Auth';
	import Refercode from '@/Services/ReferCode';
	import Sdk from '@/Services/Sdk';
	Vue.component(InfiniteScroll.name, InfiniteScroll);
	Vue.component(ListTheme.name, ListTheme);
	Vue.component(BackTop.name, BackTop);
	export default {
		name: 'product-category',
		components: {
			'product-item': ProductItem,
		},
		metaInfo () {
		    const title = this.$route.params.name
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
			if(from.name=='ProductPage'){
				to.meta.isBack=true;
				//判断是从哪个路由过来的，
				//如果是详情过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
			}
			next();
		},
		activated() {
		if(!this.$route.meta.isBack || this.isFirstEnter){
			// 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
			// 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
			this.page= 6;
			this.pageSize=6;
			this.createMap();
			this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
		}
			this.page= this.page;
			this.pageSize=this.pageSize;
			// 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
			this.$route.meta.isBack=false;
			this.isFirstEnter=false;
		},
		created() {
			this.createMap();
			this.page= 6;
			this.pageSize=6;
			this.isFirstEnter=true;
		  // 只有第一次进入或者刷新页面后才会执行此钩子函数
		  // 使用keep-alive后（2+次）进入不会再执行此钩子函数
		},
		mounted() {
			Auth.then( Auth=> Auth.user? Refercode: Promise.resolve()).then(Refercode=>{
				new Sdk().share({
					title:this.$route.params.name, // 分享标题
					link: 'http://' + location.hostname + location.pathname + '?' + (Refercode ? 'relation='+ Refercode : '') + location.hash,
					 // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: '', // 分享图标
					desc:this.$route.params.name,
				})
			});
			// 回到之前滚动条滚动到的位置
			(function scroll(pro){
			if(pro){
				wait(200).then(() => {
					window.scrollBy(0,pro);
					window.scrollY || scroll(pro);
				})
			}
		})(parseInt(sessionStorage.getItem(this.$route.name)));

		},

		data(){
			return {
				page: 6,
				pageSize: 6,
				style:'icon-favor',
				isFirstEnter:false,
				tagged:''
			}
		},

		methods: {
			createMap(){
				return this.tagged =  Data.createMap( {
					tagged: {
						subject: 'Product',
						entity: 'tagged',
						params: {
							tag: this.$route.params.id,
							take: 6,
							skip:0
						},
					},
				},{

				});
			},
			loadList() {
				Ajaxy.get( `${configs.catShop.apiBaseUrl}products/tagged?`, {tag:this.$route.params.id, take:this.pageSize, skip:this.page,})
					.when( 200, response=> {
						const _tagged = response.json;
						this.tagged.tagged = [...this.tagged.tagged, ..._tagged];
						if (_tagged.length < this.pageSize) {
							/* 所有数据加载完毕 */
							this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
							console.log(response.json.length+6);
							return;
						}
						/* 单次请求数据完毕 */
						this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
						this.page = this.page+6;
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
