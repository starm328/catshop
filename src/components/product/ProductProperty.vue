<!-- 产品选择规格组件 -->
<template>
<div class="product-property-index">

	<div class="product-property" v-if="data">
			<header>
				<!-- 			产品轮播组件		 -->
				<yd-lightbox>
					<yd-lightbox-img :src="picture"></yd-lightbox-img>
				</yd-lightbox>
				<!-- 			产品轮播组件end		 -->
				<div >
					<p v-html="price"></p>
					<div v-if="data.entities.length > 1">
						<span v-if="fullySelected ">
							<span>已选择：</span>
							<span >{{selectedProduct.values.map( x=> `[${x.label}]` ).join( '' )}}</span>
						</span>
						<span v-else>
							<span>请选择：</span>
							<span>{{unSelected}}</span>
						</span>
					</div>
				</div>
			</header>
			<div class="pro-selected">
				<dl v-for="property in properties">
					<dt>{{property.label}}</dt>
					<dd>
						<label v-for="value in property.values">
							<input type="checkbox" v-model="value.selected" @change="select( value )" :disabled="value.disabled">
							<span>{{value.label}}</span>
						</label>
					</dd>
				</dl>
			</div>
			<dl class="layout">
				<dt>数量</dt>
				<dd>
					<em>库存{{stock}}</em>
					<input-quantity :max="0" v-model="quantity" :productId="productId" @incr="increment" v-if="stock === '-'"/>
					<input-quantity :max="Number(stock)" v-model="quantity" :productId="productId" @incr="increment" v-else/>
				</dd>
			</dl>

			<div class="property_button">
				<button class="lake-of-stock" v-if="!stock">库存不足</button>
				<button class="add-to-cart-btn st-auxi-bgcolor st-main-textcolor" @click="addToCart" v-if="stock && 'add-to-cart'=== action || !action">加入购物车</button>
				<button class="buy-btn st-auxi-bgcolor st-main-textcolor" @click="buy" v-if="stock && 'buy'=== action || !action">立即购买</button>
			</div>


		</div>
		<div class="st-pop-loading"  v-if="loading"><div class="yd-loading-icon st-loading"></div></div>
		<tips :contents.sync="tips"  :timeout="1000"><p><i class="iconfont" v-if="cattrue">&#xe64a;</i><i class="iconfont" v-if="catfalse">&#xe674;</i></p></tips>
		<!-- 			注册组件		 -->
		<div class="sing-box"  v-if="dialog"><sign-kit @close="signClose" :action="logaction" :transition="transitionName"/></div>
		<!-- 			登陆组件		 -->
		<div class="login_kit" v-if="login">
			<div class="open_bottomsheet_bg" @click="closeLoginForm"></div>
			<login-kit @close="loginClose" :action="logaction" :transition="transitionName" />
		</div>
</div>
</template>

<script>
import Vue from 'vue';
import configs from '@/configs/app';
import InputQuantity from '@/components/InputQuantity';
import Tips from '@/components/Tips';
import SignKit from '@/components/loginform/Index';
import LoginKit from '@/components/loginform/Index';
import Ajaxy from 'ajaxy';
import Data from '@/libs/Data';
import arraying from '@/libs/arraying';
import Auth from '@/Services/Auth';
import Cart from '@/Services/Cart';
import Order from '@/Services/Order';
import {LightBox, LightBoxImg, LightBoxTxt} from 'vue-ydui/dist/lib.px/lightbox';
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.px/dialog';
Vue.component(LightBox.name, LightBox);
Vue.component(LightBoxImg.name, LightBoxImg);
Vue.component(LightBoxTxt.name, LightBoxTxt);
export default {
	name: 'product-property',
	components: {
		// 数量组件
		'input-quantity': InputQuantity,
		// 提示组件
		'tips': Tips,
		'sign-kit': SignKit,
		'login-kit': LoginKit,
	},
	props: {
		productId: Number,
		product: Object,
		action: String,
	},
	computed: {
		// 处理规格属性
		properties(){
			if(!( this.data )) return null;
			if( this.data.entities.length===1 && this.data.entities[0].values.length ===1)
			{
				// 只有一个规格，不用选了
				this.fullySelected= true;
				this.selectedProduct= this.data.entities[0].product;
				return;
			}
			// 便于通过id快速找到属性
			const propertiesMap= {};
			this.data.properties.forEach( property=> {
				propertiesMap[property.id]= property;
				property.values= {};
			} );
			// 遍历每个实体
			this.data.entities.forEach( entity=> {
				// 遍历实体的每个值
				entity.values= entity.values.map( meta=> {
					let value= propertiesMap[meta.property].values[meta.id];

					if(!( value ))
					{
						// 在属性下建立值表，存储值的字段和状态
						value=
						propertiesMap[meta.property].values[meta.id]=
						{
							id: meta.id,
							property: propertiesMap[meta.property],
							label: meta.label,
							stock: 0,
							disabled: true,
							selected: false,
						};

						// 用数组收录所有值
						this.values.push( value );
					}

					return value;
				} );

				if( entity.product )
				{
					this.products[entity.values.map( x=> x.id ).join()]= entity.product;

					entity.product.values= entity.values;

					this.totalStock = entity.product.stock;

					if(entity.product.stock > 0){
						this.selectedProduct = entity.product
					}

				}
			} );
			// // 自动选取单值属性
			// this.data.properties.forEach( property=> {
			// 	const values= arraying( property.values );

			// 	if( 1===values.length )
			// 	{
			// 		values[0].selected= true;
			// 		z(values[0])
			// 		// this.select( values[0] );
			// 		this.selectedValues[values[0].id]= values[0];
			// 		this.unSelected= this.data.properties.filter( x=> !(x.id in this.selectedValues) ).map( x=> x.label ).join( ' ' );

			// 		this.checkDisabled();
			// 		this.checkFullySelected();
			// 	}

			// } );
			// 自动选取单一实体
			(products=> {
				if( 1===products.length )
				{
					products[0].values.forEach( value=> {
						value.selected= true;
						this.select( value );
					} );
				}
			})( arraying( this.products ) );
			this.unSelected= this.data.properties.map( x=> x.label ).join( ' ' );
			this.checkDisabled();
			return this.data.properties;
		},
		// 自动改变库存
		stock(){
			return this.selectedProduct ? this.selectedProduct.stock : this.totalStock;
		},
		picture(){
			return (this.selectedProduct ? this.selectedProduct.picture : this.product.main_picture)['400x400']
		},
		price(){
			return this.selectedProduct ? this.selectedProduct.price : this.product.price;
		},
	},
	methods: {
		// 选择规格
		select( value ){
			if( value.selected )
			{
				this.selectedValues[value.property.id]= value;
				arraying( value.property.values ).forEach( x=> x!==value && (x.selected= false) );
			}else{
				// this.selectedValues[value.property.id]= value;
				delete this.selectedValues[value.id];
				delete this.selectedValues[value.property.id];
			}

			this.unSelected= this.data.properties.filter( x=> !(x.id in this.selectedValues) ).map( x=> x.label ).join( ' ' );

			this.checkDisabled();
			this.checkFullySelected();

		},
		checkFullySelected(){
			if( this.fullySelected= arraying( this.selectedValues ).length>=this.data.properties.length )
			{
				this.selectedProduct= this.products[arraying( this.selectedValues ).map( x=> x.id ).join()];
			}else{
				this.selectedProduct= undefined;
			}
		},
		checkDisabled(){
			this.data.properties.forEach( property=> {
				const selectedValues= arraying( this.selectedValues ).filter( selectedValue=> selectedValue.property.id!==property.id );

				arraying( property.values ).forEach( value=> {
					value.disabled= !this.data.entities.filter(
						entity=> (
							entity.product
						&&
							entity.values.indexOf( value )>-1
						&&
							selectedValues.map( value=> entity.values.indexOf( value )>-1 ).reduce( ( x, y )=> x&&y, true )
						)
					).length;
				} );
			} );
		},
		// 加入购物车接口
		addToCart(){
			if(!( this.selectedProduct ))
			{
				this.tips= '请选择规格';
				this.catfalse = true
				this.cattrue = false;
				return;
			}

			Auth.then( Auth=> {
				Cart.add( this.selectedProduct.id, this.quantity ).then( ()=> {
					this.tips= "商品已成功加入购物车";
					this.cattrue = true;
					this.catfalse = false;
					this.$emit('newcount', this.quantity);
					this.$emit('cart-added', 1);
					this.login= false;
					document.getElementById('app').className = 'env-' + this.env;
				} );
			} ).catch( e=>{
				this.login= true;
				// this.$router.push({ path: '/login' });
				// TODO show login kit
			} );
		},
		signClose (data) {
			this.dialog = false;
			Auth.proxy.user = data
		},
		loginClose (data) {
			this.login = false;
		},
		closeLoginForm () {
			this.login = false;
		},
		// 立即购买接口
		buy(){
			this.$dialog.loading.open('提交中');
			if(!( this.selectedProduct ))
			{
				this.tips= '请选择规格';
				this.$dialog.loading.close();
				return;
			}
			Auth.then( Auth=> {
				if( Auth.user )
				{

					Order.add(this.selectedProduct.id,this.quantity,'', '',p=>{
						return p.when(202,response=>{
							this.$dialog.loading.close();
							this.$router.push({ name: 'AddressSelect', params: { selname:response.json.needs[0],id:this.selectedProduct.id,quantity:this.quantity} });
						}).when(200,response=>{
							this.$dialog.loading.close();
							this.$router.replace({name: 'Pay', params:{json: response.json}});
						})
					})
				}else{
					this.dialog= true;
					this.$dialog.loading.close();
					this.login =false;
				}
			} ).catch( e=>{
					this.login =true;
					this.$dialog.loading.close();
			})
			// if(!Auth.userAgent ) {
			//
			// }
			// else-if-not( Auth.user ) show sign form;
			// else Shop.buy( this.selectedProduct.id, this.quantity );
		},
		increment(num) {
			this.quantity = num;
		},
	},
	mounted() {
		Ajaxy.get( `${configs.catShop.apiBaseUrl}products/`+ this.productId + '/data')
			.when( 200, response=> {
				this.data = response.json;

			} )
		;
	},
	data(){
		return {
			values: [],
			selectedValues: {},
			products: {},
			fullySelected: false,
			selectedProduct: undefined,
			totalStock: '-',
			quantity: 1,
			tips: undefined,
			unSelected: '',
			dialog: false,
			login: false,
			data:{entities:[],properties:[]},
			transitionName: 'bounce',
			logaction:'add-to-cart',
			cattrue:false,
			catfalse:false,
			loading:false,
		} ;
	},
};
</script>

<style>

	.product-property-index .product-property>header{display:flex;margin:10px 0;}
	.product-property-index .product-property>header>div>img{width:100px;height:100px;margin-top:-35px;background-color:white;margin-left:20px;box-shadow:0 2px 16px hsla(0,0%,50%,0.5);display: block;}
	.product-property-index .product-property>header>div{margin:0 10px;}
	.product-property-index .product-property>header>div p{    display: -webkit-flex;}
	.product-property-index .product-property>header>div p .unit{font-size:13px;margin-top: 4px;}
	.product-property-index .product-property>header>div p .operator{font-size:13px;margin-top: 4px;}
	.product-property-index .product-property>header>div p .price{font-size:20px;}
	.product-property-index .product-property>header>div p del{margin-top: 15px;margin-left: 10px;}

	.product-property-index .product-property dl{padding:0 10px;}
	.product-property-index .product-property dl::after{clear: both;display: block;content:'';}
	.product-property-index .product-property dl>dt{line-height: 28px;display: block;font-size: 14px;color: #555;}
	.product-property-index .product-property dl>dd>label>input[type=checkbox]{display:none;}
	.product-property-index .product-property dl>dd>label>span{color:#000;border-radius:2px;padding:0.6em;margin:0.2em;cursor:pointer;background:#f3f3f3;display: inline-block;}
	.product-property-index .product-property dl>dd>label>input[type=checkbox]:checked+span{background:#FF4E4E;color:#fff;border-color:#FF4E4E;display: inline-block;}
	.product-property-index .product-property dl>dd>label>input[type=checkbox]:disabled+span{color:#CCC;}
	.product-property-index .product-property dl.layout{position: relative;padding: 10px;}
	.product-property-index .product-property dl.layout::after{clear:both;display: block;content:'';}
	.product-property-index .product-property dl.layout:before {position: absolute;left: 0;right: 0;top: -1px;border-top: 1px solid #f1f1f1;content: "";}
	.product-property-index .product-property dl.layout dt{float:left;}
	.product-property-index .product-property dl.layout dd{float: right;line-height: 40px;font-size:14px;}
	.product-property-index .product-property dl.layout dd em{float: left;}
	.product-property-index .product-property .property_button{display: flex;}
	.product-property-index .product-property .property_button button{flex:1;border:0; padding: 0 15px;height: 50px;line-height: 50px;font-size: 15px;outline: none;text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.125);}
	.product-property-index .product-property .property_button .buy-btn{color: #fff;}
	.product-property-index .product-property .pro-selected{max-height: 300px;overflow: auto;box-shadow: inset 0px -1px 5px #ccc;padding-bottom:30px;min-height:60px;}
	.product-property-index .product-property .property_button .lake-of-stock{color: #fff;background-color: #CFCFCF;}
	.product-property-index .login_kit{position:fixed;top:0;z-index:2222;width:100%;height:100%;max-width:375px;left:50%;margin-left: -187.5px;}
	.product-property-index .open_bottomsheet_bg{background:rgba(000,000,000,0.6);width:100%;height:100%;max-width:375px;}
	.product-property-index .user-qrcode header {
	    line-height: 52px;
	    text-align: center;
	}
	.product-property-index .user-qrcode{position: absolute;width: 80%;left: 10%;top: 30%;-webkit-transition: .3s; transition: .3s; z-index: 300;-webkit-animation: scale-in 0.3s forwards;background:#fff;border-radius:5px;text-align:center;}
	.product-property-index .sing-box{position: fixed;width: 100%;height: 100%;background:#f1f1f1;z-index: 999;top:0;}
</style>
