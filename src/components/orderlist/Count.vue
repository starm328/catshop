<!-- 订单状态统计组件 -->
<template>
	<div>
		<b class="badge st-auxi-bgcolor" v-if="count > 0">{{count}}</b>
	</div>
</template>
<script>
	import Vue from 'vue';
	import configs from '@/configs/app';
	import Auth from '@/Services/Auth';
	import Ajaxy from 'ajaxy';
	import Data from '@/libs/Data';
		export default{
			props:{
				counts:String
			},
			data() {
				return Data.createMap( {
					count: {
						// 对应 Data 目录下的文件
						subject: 'Orders',
						// 对应其中的具体数据
						entity: 'count',
						// 参数
						params: {
							token: Auth.then(x=>x.token),
							orderStatus:this.counts
						},

					},
				});
			}




		}
</script>
<style type="text/css">
	.order-page-item .order-page-address::after{clear: both;display: block;content: ''}
	.order-page-item .order-page-address{display: flex;align-items: center;background:#fff;padding: 13px 0}
	.order-page-item .order-page-address i{width: 50px;text-align: center;color:#999;}
	.order-page-item .order-page-zhuangtai{background: -webkit-linear-gradient(right, #FF4E4E, #fe974e);margin-bottom: 5px;}
	.order-page-item .order-page-zhuangtai{color:#fff; display: flex;-webkit-box-align: center;padding:20px 0;text-align: center;}
	.order-page-item .order-page-zhuangtai p{text-align: center;}
	.order-page-item .order-page-zhuangtai img{display: block;margin:0 auto;text-align: center;width: 50px}
	.order-page-item .order-page-time{background: #fff;text-indent: 10px;font-size:12px;color:#868686;padding:10px 0;line-height: 18px;}
	.order-page-item  .layout > ul > li .item.topalign {
		-webkit-box-align: flex-start;
		-webkit-align-items: flex-start;
		align-items: flex-start;
		background:#f9f9f9;
	}
	.order-page-item  .layout > ul > li a{color:#000;}
	.order-page-item .order_other_btn{position: fixed;bottom:0;width: 100%;background:#fff;max-width:375px;}
</style>
