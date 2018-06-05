<!-- 产品列表组件父组件 -->
<template>
	<div class="product-list">
		<router-link :to="{name: 'ProductCategory', params: {id: tag.id,name:tag.name}}">
			<div class="title">
				<p>
				<em>
				 {{tag.name}}
				</em>
				</p>
				<span>更多 ></span>
			</div>
		</router-link>
		<main>
			<!-- 			产品item组件		 -->
			<product-item v-for="product in products" :key="product.id" :product="product"></product-item>
		</main>
	</div>
</template>

<script>
import ProductItem from '@/components/product/ProductItem';
// 数据中心
import Data from '@/libs/Data';
export default {
	name: 'product-list',
	components: {
		'product-item': ProductItem,
	},
	props: {
		tag: {},
		number: {
			type: Number,
			default: 4,
		},
	},
	data(){
		// 调用数据
		// 告诉数据中心要哪些数据
			return Data.createMap( {
				products: {
					// 对应 Data 目录下的文件
					subject: 'Product',
					// 对应其中的具体数据
					entity: 'tagged',
					// 参数
					params: {
						tag: this.tag.id,
						take: this.number,
					},
				},
			} );
	},
	methods:{
		product(){
			console.log(Data);
		}
	}
};
</script>

<style>
	.product-list h3{background-color:#CC88FF;color:white;line-height:3em;}
	.product-list>main{display: flex;    flex-wrap: wrap;    align-items: stretch;    padding-right: 5px;    padding-bottom: 5px;max-width: 1020px;margin:0 auto;width: 100%}
	.product-list>main::after{clear: both;display: block;content: '';}
	.product-list>main .product-item-index:only-child{width: 100%}
	.product-list>main .product-item-index:nth-last-of-type(2n+1):nth-child(1){width: 100%}
	.product-list .title {
	    height: 50px;
	    line-height: 50px;
	    text-align: center;
	    display: block;
	    background-color: #fff;
	}
	.product-list .title em {
	    display: inline-block;
	    padding: 0 10px;
	    font-size: 16px;
	    font-weight: bold;
	    color: #333;
	    font-style: normal;
	}
	.product-list .title p{float:left;}
	.product-list .title span{font-size:13px;color:#999;float:right;margin-right: 10px}
	.product-list .title small {
	    display: inline-block;
	    height: 20px;
	    width: 2px;
	    background-color: #333;
	    top: 5px;
	    position: relative;
	    margin-left: 5px;
	    transform:rotate(35deg);
	    -webkit-transform:rotate(35deg); /* Safari 和 Chrome */

	}


</style>
