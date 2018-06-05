import configs from '@/configs/app';
import Ajaxy from 'ajaxy';


export default function(url) {
	Ajaxy.get( `${configs.wechatEnd.apiBaseUrl}oauth/w-${configs.wechatEnd.wxApp}/wrapping`, { "url": url || location.protocol + '//' + location.host + location.pathname + '?' + location.hash } ).when( 200, response=>{
		location.replace(response.json)
	} );
}

