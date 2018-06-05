
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';
import Auth from '@/Services/Auth';

export default {
	sign( FormData ){
		Auth.then( auth=> Ajaxy.post( `${configs.catShop.apiBaseUrl}user`, FormData ).when( 200 ) );
		;
	},
};
