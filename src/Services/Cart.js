
import configs from '@/configs/app';
import Ajaxy from 'ajaxy';
import Auth from '@/Services/Auth';
import router from '@/router/index';
export default {
	adding: false,

	add( productId, quantity, cartId=0 ){

		if( this.adding )
		{
			return;
		}

		this.adding= true;

		return  Ajaxy.post( `${configs.catShop.apiBaseUrl}carts/${cartId}/items/${productId}`, {quantity}, { 'token': Auth.token, } )
			.when( 401, response=> Auth.refreshToken().then( token=> this.add( productId, quantity, cartId ) ) )
			.when( 200, response=> {} )
			.else( x=> Promise.reject( x ) )

			.then( x=> (this.adding= false, x) )
		;
	},

	
};
