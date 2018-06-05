// 手机用户名登录
import Auth, { NotLoginException, } from './Auth';
import configs from '@/configs/app';
import Ajaxy from 'ajaxy';
import queryPaser from 'query-string';
export default {
	mobile(mobile,code,callback){
		let promise = Ajaxy.post( `${configs.MobileEnd.apiBaseUrl}a-${configs.MobileEnd.app}/login`,{mobile,code})

		callback && (promise = callback(promise));

		promise.else && (promise = promise.else( x=> Promise.reject( x ) ));


		return Auth.login( promise );
	},
	username(username,password,callback){
		let promise = Ajaxy.post(`${configs.catShop.apiBaseUrl}auth`,{username,password})
		.when( 200, response=>  {return response.json})

		;
		callback && (promise = callback(promise));

		promise.else && (promise = promise.else( x=> Promise.reject( x ) ));


		return Auth.login( promise );
	}
}
