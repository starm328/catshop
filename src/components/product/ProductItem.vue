
<!-- 产品列表组件子组件 -->
<template>
<div class="product-item-index">
	<div class="product-item-main" v-if="product && product.main_picture">
		<router-link :to="{ name: 'ProductPage', params: { id:product.id}}">
			<div class="pro_img"><img :src="product.main_picture['400x400']" /></div>
		</router-link>
			<div class="detail">
				<h6 >{{product.title}}<i class="iconfont st-auxi-bgcolor st-main-textcolor"  @click="openBottomSheet('add-to-cart')">&#xe601;</i></h6>
				<p v-html="product.price" class="st-auxi-pricecolor"></p>
			</div>

	</div>
	<!-- 选择规格组件 -->
	<div v-if="bottomSheet" class="product_bottomsheet">
		<div class="product_bottomsheet_bg" @click="closeBottomSheet"></div>
		<product-property :product="product" :product-id="+product.id" @cart-added="timeoutCloseBottomSheet" :action="action"></product-property>
	</div>
</div>
</template>
<script>
import ProductProperty from '@/components/product/ProductProperty';
import configs from '@/configs/app';
	export default {
		name: 'product-item',
		props: [ 'product', ],
		components: {
			'product-property': ProductProperty,
		},
		data(){
			return {
				bottomSheet: false,
				action: null,
				env:configs.env,
			};
		},
		//规格弹框么有关闭，禁止后退
		watch:{
			'bottomSheet': function (newval, oldVal) {
				if (true == newval) {
					history.pushState(null, null, location.href);
				}
			}
		},
		methods: {
			// 关闭选择规格组件
			closeBottomSheet () {
				this.bottomSheet = false;
			},
			// 打开选择规格组件
			openBottomSheet ( action ) {
				this.bottomSheet = true;
				this.action = action;
			},
			// 1000毫秒之后关闭选择规格组件
			timeoutCloseBottomSheet(){
				setTimeout(()=>this.closeBottomSheet(),1000);
			},
		},
	};
</script>

<style>

	.product-item-index{margin-left: 5px;margin-top: 5px;width: calc(50% - 5px);width: -webkit-calc(50% -5px);overflow: hidden;background:#fff;float: left;border-radius: 4px;box-shadow:0);
		-webkit-transition:box-shadow 0.5s ease-out;}
	.product-item-index:hover {
		box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.05);
		-webkit-transition:box-shadow 0.5s ease-out;
	}
	.product-item-index .pro_img{height:0;padding-bottom: 100%;overflow:hidden;}



	.product-item-index img{width: 100%}
	.product-item-index .detail{padding:10px;}
	.product-item-index .detail h6{font-size: 14px;color: #666;display: block;word-wrap: break-word;word-break: break-all;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;height: 30px;line-height: 30px;position:relative;padding-right:15px;}
	.product-item-index .detail h6 i{position:absolute;right:0;top:0;width:24px;height:24px;line-height:24px;border-radius:50%;text-align:center;color:#fff;font-size:14px;}

	.product-item-index .detail p .unit{font-size:15px;}
	.product-item-index .detail p .price{font-size:20px;}
	.product-item-index .detail del {color: #ccc;vertical-align: middle;font-size: 15px;}


	/*弹出规格*/

	.product-item-index .product_bottomsheet .product-property{position:fixed;bottom:0;width:100%;transition: transform 200ms, visibility 200ms;background:#fff;z-index: 1111;max-width: 375px;left:50%;margin-left:-187.5px; -webkit-animation: pro-in 0.3s forwards; }

	.product-item-index .product_bottomsheet  .product_bottomsheet_bg{position:fixed;bottom:0;width:100%;transition: opacity 200ms, visibility 200ms;height: 100%;background:rgba(000,000,000,0.5);max-width: 375px;z-index: 1111;left:50%;margin-left:-187.5px;}

	@-webkit-keyframes pro-in{
	0% {
		opacity: 0;
		transform: translateY(100%);
	}
	100% {
		opacity: 1;
		transform: translateY(0);

	}
}
</style>
