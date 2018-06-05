<!-- 订单组件，全部订单组件 -->
<template>
	<div class="order_item_main">
		<div v-show="orders.length === 0" style="width:100%">
			<st-nodata content="暂无订单~" :icon="style"></st-nodata>
		</div>
		<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" v-show="orders.length > 0">
		<yd-list theme="1" slot="list">
		<div class="order_item">
			<div  v-for="(order,i) in orders" v-if="orders">
					<div class="order_zhuangt">
						<p>{{order.code}}</p>
						<span class="st-auxi-statecolor">{{order.status.label}}</span>
					</div>
					<div class="layout">
						<ul>
							<li v-for="item in order.items">
								<router-link :to="{ name: 'OrderPage', params: { id:order.code}}">
									<div class="flexbox">
										<div class="item topalign primary">
											<div class="media medium">
												<img v-lazy="item.picture['200x200']" class="lazy-img-fadein">
											</div>
											<div class="content">
												<div class="props">
													<div class="prop fz-medium">
														<div class="l">
															{{item.product_title}}
														</div>
														<div class="r">
														</div>
													</div>
													<div class="prop ">
														<div class="l">
															<small class="fg-gray  fz-medium" v-for=" (value,key) in item.product_properties" v-if="item.product_properties&&item.product_properties.length !== 0">
															{{key}}:<span>{{value}}</span>
															</small>
															<p class="fg-gray " v-html="item.proPrice" v-if="item.product_properties&&item.product_properties.length === 0"></p>
														</div>
														<div class="r numclass" v-if="item.quantity">
														X{{item.quantity}}
														</div>
													</div>
													<div class="prop" v-if="item.product_properties&&item.product_properties.length !== 0">
														<div class="l">
															<p class="fg-gray " v-html="item.proPrice"></p>
														</div>
														<div class="r">
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
							<div class="summary " v-if="order.totalPrice"><!--共<span v-for="item in order.items">{{item.quantity}}</span> 件商品--><b>小计:<span v-html="order.totalPrice" class="st-auxi-pricecolor"></span></b></div>
							<!-- 订单操作组件 -->
							<v-status :statu="order" :num="i" :totalPrice="order.totalPrice" @deletorder="delet"></v-status>
						</ul>
					</div>
			</div>
		</div>
		</yd-list>
		<!-- 数据全部加载完毕显示 -->
		<span slot="doneTip">——— 亲，看完了———</span>
		<!-- 加载中提示 -->
		<img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
	</yd-infinitescroll>

	</div>
</template>

<script type="text/babel">
import Vue from 'vue';
import Auth from '@/Services/Auth';
import configs from '@/configs/app';
import Ajaxy from 'ajaxy';
import Data from '@/libs/Data';
import PriceCalculator from '@/Services/PriceCalculator';
import {ListTheme, ListItem, ListOther} from 'vue-ydui/dist/lib.px/list';
import {InfiniteScroll} from 'vue-ydui/dist/lib.px/infinitescroll';
import Status from '@/components/orderlist/Status';
Vue.component(InfiniteScroll.name, InfiniteScroll);
Vue.component(ListTheme.name, ListTheme);

	export default {
		components:{
			'v-status': Status,
		},
		data(){
			return Data.createMap( {
				orders: {
					// 对应 Data 目录下的文件
					subject: 'Orders',
					// 对应其中的具体数据
					entity: 'orders',
					// 参数
					params: {
						token: Auth.then(x=>x.token),
						take: 6,
					},
					// callback:orders=>orders,
					preprocessor:orders=>{
						return this.preprocessor(orders);

					},
				},
			},{
				page: 6,
				pageSize: 6,
				totalPrice:'',
				proPrice:'',
				tips: '',
				style:'icon-favor',
			});
		},

		methods: {
			preprocessor(orders) {
				orders.forEach(order=>{
					order.totalPrice='';
					PriceCalculator.show(order.rawPrice).then(totalPrice=>{
						order.totalPrice=totalPrice,this.totalPrice=order.totalPrice;
					});

					order.items.forEach(price=>{
						PriceCalculator.show(price.rawPrice).then(proPrice=>{
							price.proPrice=proPrice,this.proPrice=price.proPrice;
						});
					})
				})
				if(orders.length > 0 && !orders[0].code){
					this.$dialog.loading.open('加载中');
				}else{
					this.$dialog.loading.close();
				}
				return orders;
			},
			loadList() {
				Auth.then( auth=> {
					Ajaxy.get( `${configs.catShop.apiBaseUrl}orders?`, {take:this.pageSize, skip:this.page,} ,{token: auth.token} )
						.when( 401, response=> Auth.refreshToken().then( token=> this.get(orders) ) )
						.when( 200, response=> {
							const _list = response.json;
							console.log(_list.length);
							this.orders = [...this.orders, ...this.preprocessor(_list)];
							if (_list.length < this.pageSize) {
								/* 所有数据加载完毕 */
								this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
								return;
							}
							/* 单次请求数据完毕 */
							this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
							this.page = this.page + 6
						} )

					;
				})
			},
			delet(i) {
				this.orders.splice(i,1);
			}
		}
	}
</script>
<style type="text/css">
	.order_item_main .order_item {border-top:1px solid #eee;}
	.order_item_main .order_item .order_zhuangt{padding:0 10px;height: 40px;line-height: 40px;background:#fff;}
	.order_item_main .order_item .order_zhuangt p{float: left}
	.order_item_main .order_item .order_zhuangt span{float: right;}
	.order_item_main .order_item  .layout > ul > li a{color:#000;}
	.order_item_main .order_item  .layout > ul > li .item.topalign {
		-webkit-box-align: flex-start;
		-webkit-align-items: flex-start;
		align-items: flex-start;
		background:#f9f9f9;
	}
	.order_item_main .order_item .m-popup-mask{background-color: rgba(0,0,0,.1);}

	.order_item_main .yd-list-theme1{padding:0;}
</style>
