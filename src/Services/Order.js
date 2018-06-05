// 下单选择地址跳转
import configs from '@/configs/app';
import Ajaxy from 'ajaxy';
import Auth from '@/Services/Auth';
import router from '@/router/index';

export default {
	adding: false,

	add( product_id, quantity,receiver_type='',receiver_id='',callback=null){

		if( this.adding )
		{
			return;
		}
		this.adding= true;
		let promise =  Ajaxy.post( `${configs.catShop.apiBaseUrl}orders`, {product_id,quantity,receiver_type,receiver_id}, { 'token': Auth.token, } )
			.when( 401, response=> Auth.refreshToken().then( token=> this.add( product_id, quantity,receiver_type,receiver_id) ) )

		;
		callback && (promise = callback(promise));
		promise.else && (promise = promise.else( x=> Promise.reject( x ) ));
		promise.then && (promise = promise.then( x=> (this.adding= false, x) ));


		return promise;
	},
	addcart( cart_id, product_ids=[], receivers=[], callback=null){

		if( this.adding )
		{
			return;
		}
		this.adding= true;
		z(product_ids)
		let promise =  Ajaxy.post( `${configs.catShop.apiBaseUrl}order-from-cart`, {cart_id,product_ids,receivers}, { 'token': Auth.token, } )
			.when( 401, response=> Auth.refreshToken().then( token=> this.addcart(cart_id,product_ids,receivers) ) )

		;
		callback && (promise = callback(promise));
		promise.else && (promise = promise.else( x=> Promise.reject( x ) ));
		promise.then && (promise = promise.then( x=> (this.adding= false, x) ));

		return promise;
	},
	continuees:null,
	continue:null,

};
