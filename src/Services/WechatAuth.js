import Auth from './Auth';
import configs from '@/configs/app';
import Ajaxy from 'ajaxy';
import queryPaser from 'query-string';

const code= ensureUnused( queryPaser.parse( location.search ).code );
const wxLogin = (
	code
	?
		Auth.finallyOnce( ()=>{
			const promise= Ajaxy.POST( `${configs.wechatEnd.apiBaseUrl}oauth/w-${configs.wechatEnd.wxApp}/a-${configs.wechatEnd.app}/login-with-code/${code}` )
				.when( 200, response=> response.json )
				.else( x=> Promise.reject( x ) )
			;
			return Auth.login( promise );
		} )
	: Promise.resolve()
);


export {wxLogin};


function ensureUnused( code )
{
	return (
		!code? null :
		sessionStorage.getItem( 'Wechat-Code:'+code ) ? null :
		(sessionStorage.setItem( 'Wechat-Code:'+code, 1 ), Auth.addBackTries(), code)
	)
}
