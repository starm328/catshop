
import configs from '@/configs/app';
import Ajaxy from 'ajaxy';
import Auth from '@/Services/Auth';

export default {
	acting: false,

	delete( address_id ){

		if( this.acting )
		{
			return;
		}

		this.acting= true;

		return  Ajaxy.post( `${configs.catShop.apiBaseUrl}addresses/${address_id}`,{address_id}, { 'token': Auth.token, } )
			.when( 401, response=> Auth.refreshToken().then( token=> this.delete( address_id) ) )
			.when( 200, response=> undefined )
			.else( x=> Promise.reject( x ) )

			.then( x=> (this.acting= false, x) )
		;

	},
};
