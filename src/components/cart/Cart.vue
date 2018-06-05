<!-- 购物车组件 子组件 -->
<template>
<div class="st-viewbox">
	<div class="cart" v-if="cart.contents">
		<div class="initialization on" v-if="cart.contents[0]&&cart.contents[0].loding === 'loding'">
			<div class="loader"></div>
		</div>

		<div v-else-if="cart.contents.length >0">
			<div class="layout" >
				<ul>
					<div class="cart-business">
						<p><mu-checkbox name="group" class="demo-checkbox" :class="{'checkbox-ban': checkeds }" v-model='checked'  @change="checkall"/>
						<i class="st-icon icon-shop"></i>商家</p><span label="dialog"  @click="emptyopen"><i class="st-icon icon-delete"></i></span>
					</div>
					<li v-for="(content,i) in cart.contents" v-if="content&&content.picture">
					<div class="flexbox">
						<div class="checkbox button margin-right-zero">
							<mu-checkbox name="group" :nativeValue="String(content.productId)"  class="demo-checkbox" v-model="checkId" />
						</div>
						<div class="item topalign primary">
							<div class="media medium">
								<img :src="content.picture['200x200']">
							</div>
							<div class="content">
								<div class="props">
									<div class="prop fz-medium">
										<div class="l">
											{{content.title}}
										</div>
										<div class="r">
										<a class="st-icon icon-delete  margin-left-far fg-gray" label="dialog" @click="deleteOpen(i,content.productId)"></a>

										</div>
									</div>
									<div class="prop ">
										<div class="l">
											<small class="fg-gray  fz-medium" v-for=" (value,key) in content.properties" v-if="content.properties.length !== 0">
											{{key}}:<span>{{value}}</span>
											</small>
											<p class="fg-red" v-html="price[i]" v-if="content.properties.length == 0"></p>
										</div>
										<div class="r">
											<input-quantity :max="100" v-model="content.quantity" @cartnum="putnum(cartId=0,content.productId)" @incr="increment" @change="calculatePrice"/>
										</div>
									</div>
									<div class="prop " v-if="content.properties.length !== 0">
										<div class="l">
											<p class="fg-red" v-html="price[i]"></p>
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
					</li>
				</ul>
			</div>
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
										合计：<!-- <span class="price" v-html="totalPrice" v-if="totalPrice"></span><span class="price" v-else><span class="unit">￥</span><span class="price">0.00</span></span> -->
										<span style="display:none">{{chekckedTotalPrice}}</span>
										<span  v-html="totalPrice" v-if="totalPrice" class="fg-red"></span>
										<span v-else><span class="unit">￥</span><span class="price">0.00</span></span>
									</strong>
									<p class="fg-gray fz-small">不含运费</p>
								</div>
							</div>
						</div>
							<a push="order_sublimt" class="button default large fz-18px float-right mw-30per st-auxi-chargebgcolor st-auxi-chargetextcolor" v-show="checkId.length === 0">
							<em>去结算</em>
							</a>
							<a push="order_sublimt" class="button default large fz-18px float-right mw-30per st-auxi-bgcolor st-main-textcolor" @click="settlement" v-show="checkId.length > 0">
							<em>去结算</em>
							</a>
					</div>
				</div>
			</div>
			<sign-kit v-if="signlog" @close="signClose" @updata="updata" class="signlog" action="cartb"/>
		</div>
		<div class="noCart-tip" v-if="cart.contents.length == 0">
				<st-nodata content="购物车里是空的耶~" icon="icon-cart">
					<p><router-link to="/"><a class="button default border-radius-near red mini border-radius-30px">去逛逛</a></router-link></p>
				</st-nodata>
		</div>
	</div>
</div>
</template>
<script>
import Vue from 'vue';
import { Confirm,Toast, } from 'vue-ydui/dist/lib.px/dialog';
import configs from '@/configs/app';
import SignKit from '@/components/sign/Index';
import InputQuantity from '@/components/InputQuantity';
import Auth from '@/Services/Auth';
import Ajaxy from 'ajaxy';
import Data from '@/libs/Data';
import PriceCalculator from '@/Services/PriceCalculator';
import Order from '@/Services/Order';
import {CheckList, CheckListItem} from 'vue-ydui/dist/lib.px/checklist';

Vue.component(CheckList.name, CheckList);
Vue.component(CheckListItem.name, CheckListItem);
Vue.prototype.$dialog = {
    confirm: Confirm,
    toast: Toast,
};
export default{
	props: {
		cartId: {
			type: Number,
			default: 0,
		},
	},
	data(){
		return Data.createMap( {
			current:{
				// 对应 Data 目录下的文件
				subject: 'Cart',
				// 对应其中的具体数据
				entity: 'current',
				// 参数
				params: {
					token: Auth.then(x=>x.token),
				},
			},
			cart: {
				// 对应 Data 目录下的文件
				subject: 'Cart',
				// 对应其中的具体数据
				entity: 'show',
				// 参数
				params: {
					token: Auth.then(x=>x.token),
					cartId: this.cartId,
				},
				// callback:cart=>cart,
				preprocessor:cart=>{
					return this.preprocessor(cart);

				},
			},
		},{
			dialog: false,
			totalPrice: '',
			Cproductid:[],
			number:null,
			signlog:false,
			Auth: Auth.proxy,
			checkId:[],
			checked:"",
			checkeds:false,
			price:[]
		});
	},
	computed:{
		chekckedTotalPrice() {
			var chekckbox = this.cart.contents.filter(a=>{
				return this.checkId.includes(String(a.productId))
			});
			if(chekckbox.length > 0){
				var totalPrice = PriceCalculator.showSumPriceable(chekckbox).then(totalPrice=>this.totalPrice=totalPrice);
			}
			return chekckbox
		},
	},
	watch: {
		cart () {
			if(this.cart[0]){
			this.calculatePrice();
			}
		},
		checkId: {
			handler: function (val, oldVal) {
				if (this.checkId.length === this.cart.contents.length) {
					this.checked=true;
					this.checkeds=false;
					this.calculatePrice();
				}else if(this.checkId.length > 0){
					this.checked=true;
					this.checkeds=true;

				}else if(this.checkId.length < this.cart.contents.length){
					this.totalPrice = false;
					this.checkeds=false;
					this.checked = false;
				}else{
					this.checked=false;

				}
				// this.calculate();
			},
			deep: true
		},
	},
	components : {
		'input-quantity' : InputQuantity,
		'sign-kit': SignKit,
	},
	methods: {
		preprocessor(cart) {
				cart.contents.forEach(content=>{
					if(content.rawPrice){
						PriceCalculator.show(content.rawPrice).then(price=>this.price.push(price))
					}
				});

			return cart
		},
		checkall() {
			var _this = this;
			if (this.checked ) {//实现反选
				_this.checkId = [];
			}else{//实现全选
				_this.checkId = [];
				_this.cart.contents.forEach(function(item) {
					_this.checkId.push('' + item.productId);
				});
			}
		},
		// checkedRadioBtn(content){
		// 	z(content)
		// },
		signClose () {
			this.signlog = false;
			console.log(this.Auth)

		},
		//接收登陆之后的user实现返回是登陆状态
		updata(data){
			this.Auth.user = data;
			z(data)
		},
		deleteOpen(i,q) {
			Confirm({
				title: '提示',
				mes: '确认把此产品从购物车中移除',
				opts:  [
                    {
                        txt: '取消',
                        color: false,
                        callback: () => {
                        	timeout: 1000
                        }
                    },
                    {
                        txt: '确定',
                        color: true,
                        callback: () => {
                        	this.deleteCart(q);
                        	timeout: 1000
                        }
                    }
            	]
			 });
		 },
		 emptyopen() {
			Confirm({
				title: '提示',
				mes: '确认清除购物车所有产品',
				opts:  [
				      {
				          txt: '取消',
				          color: false,
				          callback: () => {
				          	timeout: 1000
				          }
				      },
				      {
				          txt: '确定',
				          color: true,
				          callback: () => {
				          	this.emptyCart();
				          	timeout: 1000;
				          }
				      }
				],
			});

			},
		// 计算价格
		calculatePrice () {
			// this.cart.contents.forEach(content=>{
			// 	console.log(content)
			// 	PriceCalculator.show(content.rawPrice).then(totalPrice=>this.totalPrice=console.log(totalPrice))
			// });
			if(this.chekckedTotalPrice.length > 0){
				PriceCalculator.showSumPriceable(this.chekckedTotalPrice).then(totalPrice=>this.totalPrice=totalPrice);
			}

			// this.cart.contents.forEach(content=>PriceCalculator.show(content.rawPrice).then(price=>content.price=price));
			// this.cart.contents.forEach(content=>PriceCalculator.show(content.rawPrice,content.quantity).then(price=>content.price=price));
		},
		// 删除购物车某个产品
		deleteCart(addid){
			Auth.then( auth=> {
				Ajaxy.DELETE( `${configs.catShop.apiBaseUrl}carts/0/items/${addid}`, { token: auth.token, } )
					.when( 401, response=> Auth.refreshToken().then( token=> this.deleteCart(cart) ) )
					.when( 200, response=> {
						this.response = undefined;
						this.dialog = false;
						this.cart.contents.forEach((cart,i)=>{
							if(cart.productId == addid){
								console.log(i);
								this.cart.contents.splice(i,1);
								PriceCalculator.showSumPriceable(this.cart.contents).then(totalPrice=>this.totalPrice=totalPrice);
							}

						});
					} )

				;
			} );
		},
		//删除购物车所有产品
		emptyCart(){
			Auth.then( auth=> {
				Ajaxy.DELETE( `${configs.catShop.apiBaseUrl}carts/0/items`, { token: auth.token, } )
					.when( 401, response=> Auth.refreshToken().then( token=> this.emptyCart(cart) ) )
					.when( 200, response=> {
						this.cart.contents.splice(0,this.cart.contents.length);
						this.response = undefined;
					} )
				;
			} );
		},

		//结算接口
		settlement() {
			Auth.then( Auth=> {
				if( Auth.user )
				{
					// Order.addcart(0, this.checkId).then( ()=> {

					// } );
					Order.addcart(0,this.checkId,[], p=>{
						return p.when(202,response=>{
							this.$router.push({ name: 'AddressSelect', params: { selname:response.json.needs[0],id:0,checkId:this.checkId} });
						})
					})
				}else if(Auth.logined){
					this.signlog = true;
				}
			} );

		},
		// 修改购物车产品数量
		putnum(a,b) {
			Auth.then( auth=> {
				Ajaxy.put( `${configs.catShop.apiBaseUrl}carts/${a}/items/${b}`, {increment:this.number}, { token: auth.token,} )
					.when( 200, response=> {

					})
				;
			} );
		},
		increment(num) {
			this.number = num;
		},
	},
}
</script>
<style type="text/css">

	.cart .footer {
		z-index: 90;
		position: fixed;
		bottom: 56px;
		width: 100%;
		max-width: 375px;
	}
	.operation-bar {
		background-color: #fff;
		position: relative;
		z-index: 300;
	}
	.cart .operation-bar .wrap {
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
	.cart .operation-bar .wrap .box {
		word-wrap: break-word;
		word-break: break-all;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
	}
	.cart .layout .prop .l small{font-size:12px;}
	.cart .layout .prop .l small span{color:#383838;margin-right: 4px;}
	.cart .mu-checkbox-icon-uncheck{color:#999}
	.cart .cart-business{background: #fff;height: 40px;line-height: 40px;overflow:hidden;border-bottom: 1px solid #eee}
	.cart .cart-business::after{clear: both;display: block;content: ''}
	.cart .cart-business p{float:left;height: 40px;line-height: 40px;}
	.cart .cart-business p label{margin-top: 8px;float: left;margin-left: 10px;}
	.cart .cart-business p i{padding-right: 4px;}
	.cart .cart-business span{text-indent: 10px;float: right;margin-right: 15px;}
	.cart .layout > ul > li:after{display: block;content: '';width: calc(100% - 120px);height: 1px;background:#ddd;position: absolute;bottom:0;right:0;}
	.cart .layout > ul > li:last-child:after{display: none}
	.cart .noCart-tip{padding-bottom: 20%}
	.cart .signlog{position: fixed;top:0;z-index: 100;width: 100%;height: 100%;background:#f1f1f1 ;}

</style>
