<!-- 数字加减组件 -->
<template>
	<span class="input-quantity">
		<button @click="decrease"><i class="st-icon icon-move"></i></button>
		<input type="tel" min="1" :value="computedValue" @input="input" @change="change">
		<button @click="increase"><i class="st-icon icon-add"></i></button>
	</span>
</template>

<script>
import arraying from '@/libs/arraying';
import Auth from '@/Services/Auth';
import configs from '@/configs/app';
import Ajaxy from 'ajaxy';
export default {
	name: 'input-quantity',
	props: {
		value: {
			type: Number,
			default: 1,
		},
		max: {
			type: Number,
			default: 0,
		},
		productId:Number,
	},
	computed: {
		computedValue(){
			return this.v= Math.floor( Math.max( Math.min( this.max, isNaN( this.v )? 1 : - -this.v ), 1 ) );
		},
	},
	methods: {
		increase(){
			++this.v>this.max&&--this.v;
			this.input();
			this.$emit( 'change', this.computedValue );
			this.$emit('incr', this.computedValue )
			this.$emit('cartnum', this.computedValue )
		},
		decrease(){
			--this.v<1&&++this.v;
			this.input();
			this.$emit( 'change', this.computedValue );
			this.$emit('incr', this.computedValue )
			this.$emit('cartnum', this.computedValue )
		},
		input(){
			this.normalize();

			this.$emit( 'input', this.computedValue );
		},
		change(){
			this.$emit( 'change', this.computedValue );
		},
		normalize(){
		},
	/*
		cartnum(cartId=0,productId=this.productId) {
			Auth.then( auth=> {
				Ajaxy.put( `${configs.catShop.apiBaseUrl}carts/${cartId}/items/${productId}`, {increment:this.v}, { token: auth.token,} )
					.when( 200, response=> {

					})
					.when( 403, response=> {
						alert('用户未注册')
					} )

				;
			} );
		}*/


	},
	data(){
		return {
			v: this.value,

		};
	},
};
</script>

<style>
.input-quantity{float: left;margin-top: 4px;margin-left: 10px;}
.input-quantity button{width: 30px;height: 28px;border:0;float:left;line-height: 28px;outline:none;background:#F5F5F5;}
.input-quantity input{width: 30px;height: 28px;border:0;text-align: center;line-height: 28px;float:left;}
</style>
