<!-- 产品详细组件 -->
<template>
<div class="st-viewbox">
	<div class="product-page" :class="{'overhidden': overhidden}" v-if="products">
		<!-- 			header 组件		 -->
		<st-header  :title='$route.meta.title' fixed>
			<mu-icon-button  @click="$router.go(-1)"  slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button>
			<!-- <mu-icon-button  @click="$router.isBack=true;$router.replace('/')" v-else slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button> -->
		</st-header>
		<div class="header_mar"></div>
		<main class="product-page-main" >
			<v-swiper :product="products"></v-swiper>
			<div class="layout">
				<ul>
				<!-- 标题价格 -->
					<li>
						<div class="item topalign">
							<div class="content">
								<div class="props">
									<div class="prop">
										<div class="l">
											<em class="fz-16px">
												{{products.title}}
											</em>
										</div>
										<div class="r">
											<div class="like" @click.stop='$refs.share.toggle()'>
												<i class="st-icon icon-sharefill fg-gray">
												</i>
												<p>
													分享
												</p>
											</div>
										</div>
									</div>
									<div class="prop">
										<div class="l">
											<span class="price st-auxi-pricecolor fz-1-5rem" v-html="products.price">

											</span>
										</div>
										<div class="r">

										</div>
									</div>
								</div>
							</div>
							<div class="other">

							</div>
						</div>
						<!-- 特权(start) -->
						<!-- <div class="items">
							<ul>
								<li>
								</li>
								<li>
									<small>库存100</small>
								</li>
							</ul>
						</div> -->
						<!-- 特权(end) -->
					</li>
					<!-- 标题价格end -->
					<li>
						<div class="vip">
							<ul>
								<li>
									<i class="st-icon icon-roundcheck st-auxi-textcolor"></i>
									<small>质量检测</small>
								</li>
								<li>
									<i class="st-icon icon-roundcheck st-auxi-textcolor"></i>
									<small>担保交易</small>
								</li>
								<li>
									<i class="st-icon icon-roundcheck st-auxi-textcolor"></i>
									<small>企业认证</small>
								</li>
							</ul>
						</div>
					</li>
				</ul>
			</div>
			<!-- 图文组件 -->
			<tab-switch>
				<section label="图文详情" :class="{current: 5, }" class="propage">
					<div class="data_none" v-show="info.length === 0" style="width:100%">
						<i class="st-icon icon-favor"></i>
						<em>商家太懒，未上传图文</em>
					</div>
					<div v-html="info.article" class="pro-pageimg"></div>
				</section>
				<section label="产品参数">
					<dl v-for="attribute in info.attributes">
						<dt>{{attribute.key}}</dt>
						<dd>{{attribute.value}}</dd>
					</dl>
				</section>
			</tab-switch>
			<!-- 提示 -->
			<div class="st-user-prompt st-mt5">
				<h5 class="fg-gray">温馨提示：</h5>
				<i class="iconfont">&#xe60c;</i>不要相信任何人通过短信、QQ等发送的所谓“退款等链接”
			</div>
			<div class="of_sale" v-if="products&&products.on_sale === 0">此商品已下架</div>
		</main>
		 <!-- 分享组件 -->
		<my-share ref="share"/>
		<!-- 回到顶部 -->
		<yd-backtop></yd-backtop>
		<!-- 底部购买条 -->
		<div class="footer">
			<div class="operation-bar topline">
				<div class="wrap">
					<div class="box" style="max-width:40%;">
						<div class="tools small splitline">
							<ul>
								<li>
									<router-link to="/">
										<a class="button prevent ">
											<i class="iconfont">&#xe656;</i>
											<small>进店</small>
										</a>
									</router-link>
								</li>
								<li>
								<router-link to="/cart">
									<a class="button prevent">
										<i class="iconfont">
											&#xe66e;
											<b class="badge bounce-transition st-auxi-bgcolor" v-if="count">
												{{count}}
											</b>
										</i>
										<small>购物车</small>
									</a>
								</router-link>
								</li>
							</ul>
						</div>
					</div>
					<div class="box buttons margin-left-near">
						<a class="button prevent large fz-16px fz-nothing st-auxi-virtualbgcolor st-main-textcolor"  v-if="products.on_sale === 0">加入购物车</a>
						<a class="button prevent large fz-16px st-auxi-virtualbgcolor st-main-textcolor"  v-else @click="openBottomSheet('add-to-cart')">加入购物车</a>
						<a class="button prevent  large fz-16px fz-nothing st-auxi-bgcolor st-main-textcolor" v-if="products.on_sale === 0">立即购买</a>
						<a class="button prevent  large fz-16px st-auxi-bgcolor st-main-textcolor" v-else @click="openBottomSheet('buy')">立即购买</a>
					</div>
				</div>
			</div>
		</div>
		<!-- 规格 -->
		<div :open="bottomSheet" :class="{product_bottomsheet:1,show: bottomSheet}">
			<div class="product_bottomsheet_bg" @click="closeBottomSheet"></div>
			<product-property :product="products" :product-id="+$route.params.id" @cart-added="timeoutCloseBottomSheet" :action="action" @newcount="newcount"></product-property>
		</div>
	</div>
</div>
</template>

<script>
import Vue from 'vue';
import ProductProperty from '@/components/product/ProductProperty';
import TabSwitch from '@/components/TabSwitch';
import Data from '@/libs/Data';
import Auth from '@/Services/Auth';
import Vswiper from '@/components/swiper/Index';
import Myshare from '@/components/share/Index';
import Refercode from '@/Services/ReferCode';
import Sdk from '@/Services/Sdk';
import {BackTop} from 'vue-ydui/dist/lib.px/backtop';
import configs from '@/configs/app';
import Ajaxy from 'ajaxy';
Vue.component(BackTop.name, BackTop);
export default {
	name: 'product-page',
	components: {
		'product-property': ProductProperty,
		'tab-switch': TabSwitch,
		'v-swiper': Vswiper,
		'my-share':Myshare,
	},
	metaInfo () {
	    const title = this.product.title;
	    return {
	        title: title,
	        meta: [{content: title }]
	    }
	},
	// mounted() {
	// 	var _this =this;
	// 	pushHistory();
	// 	window.addEventListener("popstate", function(e) {
	// 		if(_this.url){
	// 			// _this.$router.go(-1);

	// 		}else if(!_this.url){
	// 			_this.$router.push({name: 'Index'})
	// 			// _this.$router.go(-1);
	// 		}
	// 	}, false);
	// 	function pushHistory() {
	// 	var state = {
	// 	title: "title",
	// 	url: location.hash
	// 	};
	// 	window.history.pushState(state, "title",location.hash);
	// 	}
	// },
	computed:{
		products(){
			if(!( this.product )) return null;
				Auth.then( Auth=> Auth.user? Refercode : Promise.reject()).then(Refercode=>{
					new Sdk().share({
						title: this.product.title, // 分享标题
						link: 'http://' + location.hostname + location.pathname + '?' + (Refercode ? 'relation='+ Refercode : '') +  location.hash, //  分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: this.product.main_picture['200x200'], // 分享图标
						desc: this.product.title,
					})
				}).catch(e=>{});
	　　　　return this.product
	　　}

	},
	watch:{
		// 'bottomSheet': function (newval, oldVal) {
		// 	if (true == newval) {
		// 		history.pushState(null, null, location.href);
		// 	}
		// }
	},
	beforeRouteEnter(to, from, next){
		// if(from.name=='ProductPage'){
		// 	to.meta.isBack=true;
		// 	//判断是从哪个路由过来的，
		// 	//如果是详情过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
		// }
		next(vm=>{
			vm.url = from.name
		});
	},
	data(){
		return Data.createMap( {
			product: {
				subject: 'Product',
				entity: 'product',
				params: {
					product: this.$route.params.id,
				},
			},
			info: {
				subject: 'Product',
				entity: 'info',
				params: {
					product: this.$route.params.id,
				},
			},
			count: {
				subject: 'Cart',
				entity: 'count',
				params: {
					token: Auth.then(x=>x.token),
				},
			}
		},{
			bottomSheet: false,
			action: null,
			url:null,
			env:configs.env,
			overhidden:false,
			data:''
		});
	},
	methods: {

		closeBottomSheet () {
			this.bottomSheet = false;
			this.overhidden = false

		},
		openBottomSheet ( action ) {
			this.bottomSheet = true;
			this.action = action;
			this.overhidden = true

		},
		timeoutCloseBottomSheet(){
			setTimeout(()=>this.closeBottomSheet(),1000);
		},
		openshare () {
			this.$refs.share.toggle()
		},
		newcount(o) {
			this.count = parseInt(this.count) + o
		}
	},
};
</script>
<style>
	.product-page{ width:100%;overflow:hidden;max-width: 375px}
	.product-page .st-user-prompt{margin-bottom: 55px;}
	.product-page .layout > ul:before {
		position: absolute;
		left: 0;
		right: 0;
		top: -1px;
		border-top: 1px solid #f1f1f1;
		content: "";
	}
	.product-page .layout > ul > li {
		background-color: #fff;
		position: relative;
	}
	.product-page .detail .product-page .layout .item {
		padding: 10px;
	}
	.product-page .layout > ul > li .item.topalign {
		-webkit-box-align: flex-start;
		-webkit-align-items: flex-start;
		align-items: flex-start;
	}
	.product-page .layout > ul > li .item {
		min-height: 44px;
		padding: 10px 4px;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		position: relative;
	}
	.product_show .detail .product-page .layout .content {
		padding-right: 50px;
	}
	.product-page .layout > ul > li .item .content {
		word-wrap: break-word;
		word-break: break-all;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
	}
	.product-page .layout .props:last-child {
		padding-bottom: 0;
	}
	.product-page .layout .prop {
		display: flex;
		box-sizing: border-box;
		justify-content: space-between;
		margin-bottom: .25rem;
	}
	.product-page .layout .prop .l {
	word-wrap: break-word;
	word-break: break-all;
	-webkit-box-flex: 1;
	-webkit-flex: 1;
	-ms-flex: 1;
	flex: 1;
	}

	.product-page .layout .props:last-child .prop:last-child {
	margin-bottom: 0;
	}

	.product-page .like {
		position: relative;
		right: 5px;
		top: 5px;
		padding-left: 15px;
		padding-right: 5px;
		text-align: center;
		color: #999
	}
	.product-page .like:after {
		position: absolute;
		left: 4px;
		top: 5px;
		bottom: 5px;
		content: "";
		border-left: 1px solid #eee;
		color: #999;
	}
	.product-page .layout  .items ul {
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		padding: 0 10px 10px 10px;
	}
	.product-page .layout  .items ul li {
		height: 20px;
		line-height: 20px;
	}
	.product-page .layout  .vip {
	background-color: #f9f9f9;
	}
	.product-page .layout  .vip ul {
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-webkit-justify-content: space-between;
		justify-content: space-between;
	}
	.product-page .layout  .vip ul li {
		word-wrap: break-word;
		word-break: break-all;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
		height: 35px;
		line-height: 35px;
		text-align: center;
	}
	.product-page .layout  .vip ul li i {
		vertical-align: middle;
		font-size: 17px;
		margin-right: .25px;
	}
	.product-page .layout  .vip ul li small {
		font-size: 12px;
		color: #999;
		vertical-align: middle;
	}

	/*底部购买条*/
	.product-page .footer {
		z-index: 90;
		position: fixed;
		bottom: 0;
		width: 100%;
		max-width: 374px;
	}
	.product-page .operation-bar.topline {
		border-top: 1px solid #f1f1f1;
	}
	.product-page .operation-bar {
		background-color: #fff;
		position: relative;
		z-index: 300;
	}
	.product-page .operation-bar .wrap {
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-webkit-justify-content: space-between;
		justify-content: space-between;
	}
	.product-page .operation-bar .wrap .box {
		word-wrap: break-word;
		word-break: break-all;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
	}
	.product-page .tools.small {
		height: 50px;
	}
	.product-page .tools {
		background-color: #fff;
	}
	.product-page .operation-bar .tools ul {
		padding: 0;
	}
	.product-page .tools ul {
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		min-height: 44px;
		position: relative;
		padding: 10px 10px;
	}
	.product-page .tools ul li {
		word-wrap: break-word;
		word-break: break-all;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
		text-align: center;
		position: relative;
	}
	.product-page .tools ul li .button {
		padding: 0;
		margin: 0;
		height: 50px;
		-webkit-transition: .3s;
		transition: .3s;
	}
	.product-page .tools ul li .button.active i {
			-webkit-transform: scale(1.15);
			transform: scale(1.15);
	}
	.product-page 	.tools ul li .button {
		display: block;
		z-index: 1;
		cursor: pointer;
		position: relative;
	}
	.product-page .tools.small i {
		height: 20px;
		margin-top: 4.5px;
		font-size: 20px;
	}
	.product-page .tools i {
		-webkit-transition: .15s;
		transition: .15s;
		display: inline-block;
		width: 30px;
		height: 30px;
		margin-top: 4px;
		font-family: "iconfont";
		position: relative;
		font-size: 1.5rem;
		color: #333;
	}
	.product-page .tools i .badge {
		position: absolute;
		right: -18px;
		top: -7px;
		/* background: #000; */
		display: block;
		color: #fff;
		border-radius: 50%;
		padding: 0;
		width: 24px;
		height: 24px;
		overflow: hidden;
		line-height: 24px;
		text-align: center;
		font-family: 'arial';
		font-size: 13px;
	}
	.product-page .tools small {
			display: block;
			font-size: 12px;
			color: #000
	}
	.product-page .operation-bar .buttons {
			display: -webkit-box;
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-align: center;
			-webkit-align-items: center;
			align-items: center;
			box-sizing: border-box;
			-webkit-box-sizing: border-box;
			-webkit-justify-content: space-between;
			justify-content: space-between;
	}
	.product-page .operation-bar .wrap .box {
			word-wrap: break-word;
			word-break: break-all;
			-webkit-box-flex: 1;
			-webkit-flex: 1;
			-ms-flex: 1;
			flex: 1;
	}
	.product-page .margin-left-near {
			margin-left: 5px;
	}
	.product-page .operation-bar .buttons .button {
			word-wrap: break-word;
			word-break: break-all;
			-webkit-box-flex: 1;
			-webkit-flex: 1;
			-ms-flex: 1;
			flex: 1;
			text-align: center;
	}

	.product-page .button.lightyellow {
			background-color: #FFC324;
			color: #fff;
	}
	.product-page .button.large {
			padding:0;
			height: 50px;
			line-height: 50px;
			font-size: 15px;
			text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.125);
	}
	.product-page .button.red {
			color: #fff;
			background-color: #FF4E4E;
	}
	.product-page .pro-pageimg img{max-width: 353px;width: 100%;vertical-align: top}

	/*下架*/
	.product-page  .of_sale{position: fixed;bottom:50px;height: 40px;line-height: 40px;background:rgba(106, 106, 106,1);color:#fff;text-align: center;width:100%;max-width: 375px; z-index: 999}
	/*弹出规格*/

	.product-page .product_bottomsheet .product-property{position:fixed;bottom:0;width:100%;transition: transform 200ms, visibility 200ms;background:#fff;z-index: 99;max-width: 375px;}
	.product-page .product_bottomsheet:not(.show) .product-property{transform: translateY(100%);visibility:hidden;}

	.product-page .product_bottomsheet  .product_bottomsheet_bg{position:fixed;bottom:0;width:100%;transition: opacity 200ms, visibility 200ms;height: 100%;background:rgba(000,000,000,0.5);max-width: 375px;z-index: 99}
	.product-page .product_bottomsheet:not(.show) .product_bottomsheet_bg{opacity: 0;visibility:hidden;}


</style>
