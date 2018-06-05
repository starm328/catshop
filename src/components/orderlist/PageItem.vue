<!-- 订单详情组件子组件 -->
<template>
	<div class="order-page-item">
		<st-header  :title='$route.meta.title' fixed>
			<mu-icon-button  @click="$router.go(-1)" slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button>
		</st-header>

		<div class="header_mar"></div>
		<div class="order-page-zhuangtai">
				<!--		closed	订单关闭	 -->
				<mu-flexbox v-if="ordershow.status.id == 'closed'">
					<mu-flexbox-item class="flex-demo">
							<p>{{ordershow.status.label}}</p>
						</mu-flexbox-item>
						<mu-flexbox-item class="flex-demo">
							<img src="./images/closed-img.png">
						</mu-flexbox-item>
				</mu-flexbox>
				<!--		closed	订单待支付	 -->
				<mu-flexbox v-if="ordershow.status.id == 'new'">
					<mu-flexbox-item class="flex-demo">
							<p>{{ordershow.status.label}}</p>
						</mu-flexbox-item>
						<mu-flexbox-item class="flex-demo">
							<img src="./images/new-img.png">
						</mu-flexbox-item>
				</mu-flexbox>
				<!--		closed	订单待待发货	 -->
				<mu-flexbox v-if="ordershow.status.id == 'payed'">
					<mu-flexbox-item class="flex-demo">
							<p>{{ordershow.status.label}}</p>
						</mu-flexbox-item>
						<mu-flexbox-item class="flex-demo">
							<img src="./images/payed-img.png">
						</mu-flexbox-item>
				</mu-flexbox>
				<!--		closed	订单发货中	 -->
				<mu-flexbox v-if="ordershow.status.id == 'sending'">
					<mu-flexbox-item class="flex-demo">
							<p>{{ordershow.status.label}}</p>
						</mu-flexbox-item>
						<mu-flexbox-item class="flex-demo">
							<img src="./images/sending-img.png">
						</mu-flexbox-item>
				</mu-flexbox>
				<!--		closed	订单已签收	 -->
				<mu-flexbox v-if="ordershow.status.id == 'sended'">
					<mu-flexbox-item class="flex-demo">
							<p>{{ordershow.status.label}}</p>
						</mu-flexbox-item>
						<mu-flexbox-item class="flex-demo">
							<img src="./images/sended-img.png">
						</mu-flexbox-item>
				</mu-flexbox>
				<!--		closed	订单已成交	 -->
				<mu-flexbox v-if="ordershow.status.id == 'done'">
					<mu-flexbox-item class="flex-demo">
							<p>{{ordershow.status.label}}</p>
						</mu-flexbox-item>
						<mu-flexbox-item class="flex-demo">
							<img src="./images/sended-img.png">
						</mu-flexbox-item>
				</mu-flexbox>
		</div>
		<div class="order-page-address fg-86"  v-if="ordershow.receiver && ordershow.receiver.type === 'user/address'">
			<i class="st-icon icon-locationfill"></i>
			<div style="width:100%;padding-right:10px;">
				<mu-flexbox>
					<mu-flexbox-item class="flex-demo">
					    收货人：{{ordershow.receiver.consignee}}
					  </mu-flexbox-item>
					  <mu-flexbox-item class="flex-demo">
					   {{ordershow.receiver.phone}}
					  </mu-flexbox-item>
				</mu-flexbox>
				<mu-flexbox class="mt8" orient="vertical" style="margin-top:8px;">
					<mu-flexbox-item class="flex-demo">
					    收货地址：{{ordershow.receiver.area.long_label.join('')}}{{ordershow.receiver.address}}
					  </mu-flexbox-item>
				</mu-flexbox>
			</div>
		</div>
		<div class="layout">
			<ul>

				<div class="order-business"><p><i class="st-icon icon-shop"></i>商家</p></div>
				<li v-for="order in ordershow.items">
					<router-link to="">
					<div class="flexbox">
						<div class="item topalign primary">
							<div class="media medium">
								<img :src="order.picture['200x200']">
							</div>
							<div class="content">
								<div class="props">
									<div class="prop fz-medium">
										<div class="l">
											{{order.product_title}}
										</div>
										<div class="r">
										</div>
									</div>
									<div class="prop ">
										<div class="l">
											<small class="fg-gray  fz-medium"  v-for=" (value,key) in order.product_properties">
													{{key}}:<span>{{value}}</span>
											</small>
										</div>
										<div class="r">
										</div>
									</div>
									<div class="prop ">
										<div class="l">
											<span class="fg-gray price fz-1-5rem" v-html="order.proPrice"></span>
										</div>
										<div class="r numclass">
										X{{order.quantity}}
										</div>
									</div>
								</div>
							</div>
							<div class="other">
								<div class="r" style="text-align: right;">
								</div>
							</div>
						</div>
					</div>
					</router-link>
				</li>
				<div class="summary"><!--共1件商品--><b><i>价格合计:</i><span v-html="totalPrice" class="st-auxi-pricecolor"></span></b></div>
			</ul>
		</div>
		<div class="order-page-time">
			<p> 订单编号：{{ordershow.code}}</p>
			<p> 创建时间：<Sttime  :time="ordershow.created_at"/></p>
			<p  v-if="ordershow.payed_at !== null">支付时间：<Sttime :time="ordershow.payed_at"/></p>
			<p v-if="ordershow.comment"> 订单留言：{{ordershow.comment}}</p>
		</div>
		<!-- 提示 -->
		<div class="st-user-prompt st-mt5">
			<h5 class="fg-gray">温馨提示：</h5>
			<i class="iconfont">&#xe60c;</i>不要相信任何人通过短信、QQ等发送的所谓“退款等链接”
		</div>
		<div class="bottom_mar"></div>
		<!-- 订单操作组件 -->
		<v-status :statu="ordershow" :num="0" :totalPrice="totalPrice" :length="ordershow.items.length"  @deletorder="delet"></v-status>
	</div>
</template>
<script>
	import Vue from 'vue';
	import configs from '@/configs/app';
	import Auth from '@/Services/Auth';
	import Ajaxy from 'ajaxy';
	import Data from '@/libs/Data';
	import PriceCalculator from '@/Services/PriceCalculator';
	import Status from '@/components/orderlist/Status';
		export default{
			data(){
				return Data.createMap( {
					ordershow: {
						// 对应 Data 目录下的文件
						subject: 'Orders',
						// 对应其中的具体数据
						entity: 'ordercode',
						// 参数
						params: {
							token: Auth.then(x=>x.token),
							orderCode: this.$route.params.id,
						},


					},
				},{
					totalPrice:'',
					proPrice:'',
					tips: '',
					show2: false,
					pay:{},
				});
			},
			metaInfo () {
		    const title = '订单详情';
		    return {
			        title: title,
			        meta: [{content: title }]
			    }
			},
			components: {
				'v-status': Status,
			},
			watch: {
				ordershow () {
					this.calculatePrice();
				},
			},

			methods: {
				calculatePrice () {
					PriceCalculator.show(this.ordershow.rawPrice).then(totalPrice=>this.totalPrice=totalPrice);
					this.ordershow.items.forEach(item=>{
						PriceCalculator.show(item.rawPrice).then(proPrice=>{
							item.proPrice=proPrice,this.proPrice=item.proPrice;
						});
					})
				},
				delet(i) {
					window.history.go(-1)
				}
			},



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
	.order-page-item .order_other_btn{position: fixed;bottom:0;width: 100%;background:#fff;max-width:375px;z-index: 99}
</style>
