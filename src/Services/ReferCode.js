// 分享推荐码
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';
import Auth from '@/Services/Auth';

function getReferCode(token) {
	return Ajaxy.GET( configs.catShop.apiBaseUrl+'relations/refer-code', { 'token': token } )
		.when( 200, response=> response.json)
		.when( 401, response=> Auth.refreshToken().then( token=> getReferCode(token) ) )
	;
}

export default (local=> (
	(local
		? Promise.resolve( local )
		: Auth.then(auth=> auth.user && getReferCode(auth.token) )
	)
) )( localStorage.getItem( 'Refer' ) );

