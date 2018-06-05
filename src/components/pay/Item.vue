<!-- 需要支付的列表组件 -->
<template>

	<div class="order">
		<st-header  :title='$route.meta.title' fixed>
			<router-link :to="{name: 'User'}"  slot="right"><a class="button"><i class="iconfont" >&#xe675;</i></a></router-link>
		</st-header>
		<div class="header_mar"></div>
		<div class="layout"  v-for="order in ordercode.orders">

			<ul>
				<div class="order-business"><p><i class="st-icon icon-shop"></i>订单号：{{order.code}}</p></div>
				<li>
					<div class="flexbox" v-for="item in order.items">
						<div class="checkbox button margin-right-zero">
								<!--<mu-checkbox name="group" nativeValue="checkbox1"  class="demo-checkbox"/>-->
						</div>
						<div class="item topalign primary">
							<div class="media medium">
								<img :src="item.picture['200x200']">
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
											<small class="fg-gray  fz-medium" v-for=" (value,key) in item.product_properties">
													{{key}}:<span>{{value}}</span>
											</small>
										</div>
										<div class="r">
										</div>
									</div>
									<div class="prop ">
										<div class="l">
											<span class="price fz-1-5rem" v-html="item.proPrice"></span>
										</div>
										<div class="r numclass">
										X{{item.quantity}}
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
				</li>
				<div class="summary"><b><i>合计:</i><span v-html="order.totalPrice"></span></b></div>
			</ul>

			<div class="footer">

				<div class="operation-bar">
					<div class="wrap">
						<div class="box">
							<div class="flexbox">
								<div class="margin-left-far">
									<!-- <mu-checkbox name="group" nativeValue="checkbox1"  class="demo-checkbox"/> -->
								</div>
								<div class="primary">
									<strong>
										总计：<span class="price fg-red " v-html="totalPrice"></span>
									</strong>
									<p class="fg-gray fz-small">不含运费</p>
								</div>
							</div>
						</div>
							<a class="button default st-auxi-bgcolor st-main-textcolor large fz-18px float-right mw-30per" @click="sub_order">
							<em>确认支付</em>
						</a>
					</div>
				</div>
			</div>
			<tips :contents.sync="tips"  :timeout="1000"/>
			<yd-popup v-model="show2" position="bottom" height="60%" class="paypopup">
				<pay-item :pay="payment" :totalPrice="totalPrice" :ordercode="ordercode" :show="show2" @showclose="closeshow" @child-say="state"></pay-item>
			</yd-popup>
		</div>
	</div>
</template>
<script>
import Vue from 'vue';
import configs from '@/configs/app';
import Auth from '@/Services/Auth';
import Ajaxy from 'ajaxy';
import Data from '@/libs/Data';
import PriceCalculator from '@/Services/PriceCalculator';
import {Popup} from 'vue-ydui/dist/lib.px/popup';
import PayItem from '@/components/pay/Pay';
import Tips from '@/components/Tips';
Vue.component(Popup.name, Popup);
	export default{
		data(){
			this.$nextTick(()=>{
				this.calculatePrice();
			});
			return {
				ordercode:this.$route.params.json,
				totalPrice:'',
				proPrice:'',
				totalProprice:'',
				tips: '',
				show2: false,
				payment:{},
				code:[],

			};
		},
		components: {
			'tips': Tips,
			'pay-item': PayItem,
		},
 		methods: {
			// 此事件是修复ydui popup组件跳转页面之后，在苹果手机上不能滚动的BUG
			closeshow(){
				this.show2 = false;

			},
			sub_order(){
				this.$dialog.loading.open('请稍等');
				this.code = [];
				this.ordercode.orders.forEach(id=>{

						this.code.push(id.code);
				});

				Auth.then( auth=> {
					Ajaxy.patch( `${configs.catShop.apiBaseUrl}orders/multi-pay`,{order_codes:this.code} ,{ token: auth.token, } )
						.when( 401, response=> Auth.refreshToken().then( token=> this.patch(address) ) )
						.when( 402, response=>{
							this.tips= '资金不足，支付失败';
							setTimeout(()=>this.payrouterfail(),1000);
							this.show2 = false;
							this.$dialog.loading.close();
						})
						.when( 404, response =>{
							this.$dialog.loading.close();
							this.tips= '订单不存在';
						})
						.when( 409, response =>{
							this.$dialog.loading.close();
							this.tips= '订单已支付，无需重复支付';
						})
						.when( 507, response =>{
							this.tips= '支付失败';
							this.show2 = false;
							this.$dialog.loading.close();
							setTimeout(()=>this.payrouterfail(),1000);
						})
						.when( 200, response=> {
							this.tips= '支付成功';
							this.$dialog.loading.close();
							setTimeout(()=>this.closeBottomSheet(),1000);

						})
						.when( 202, response=> {
							this.show2= true;
							this.$dialog.loading.close();
							// this.tips= '需要抵扣确认或第三方支付';
							this.payment= response.json;
						} )

					;
				} );
			},
			state(data) {
				this.tips =data
			},
			closeBottomSheet () {
				this.$router.replace({name:'Payment', params:{payod: true, money: this.totalPrice, order: this.ordercode}});
			},
			payrouterfail() {
				// alert(this.show === false);
				// this.show === false;
				this.$router.replace({name:'Payment', params:{payod: false}});
			},
			calculatePrice () {
				this.ordercode.orders.forEach(order=>{
					order.totalPrice='';
					PriceCalculator.show(order.rawPrice).then(totalPrice=>{
						order.totalPrice=totalPrice,this.totalPrice=order.totalPrice;
							// console.log(order.totalPrice)
					});

					order.items.forEach(price=>{
						PriceCalculator.show(price.rawPrice).then(proPrice=>{
							price.proPrice=proPrice,this.proPrice=price.proPrice;
							console.log(price.proPrice)

						});
					})
				});
				PriceCalculator.showSumPriceable(this.ordercode.orders).then(totalPrice=>this.totalPrice=totalPrice);
			},
		},


	}
</script>
<style type="text/css">
	.order .footer {
		z-index: 90;
		position: fixed;
		bottom: 0;
		width: 100%;
		max-width: 375px;
	}
	.operation-bar {
		background-color: #fff;
		position: relative;
		z-index: 300;
	}
	.order .operation-bar .wrap {
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
	.order .operation-bar .wrap .box {
		word-wrap: break-word;
		word-break: break-all;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
	}
	.order .layout .prop .l small{font-size:12px;}
	.order .layout .prop .l small span{color:#383838;margin-right: 4px;}
	.order .mu-checkbox-icon-uncheck{color:#999}
 </style>
