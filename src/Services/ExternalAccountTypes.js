// 外部账户类型
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';

class ExternalAccountTypes{
	constructor(data){
		this.data = data;
	}
	get id()
	{
		return this.data.id;
	}
	get label()
	{
		return this.data.label;
	}
	get meta()
	{
		return this.data.meta;
	}
}

export default (local=> (
	(local
		? Promise.resolve( local )
		: Ajaxy.GET( configs.catShop.apiBaseUrl+'external-account-types' ).when( 200, response=> response.json )
	)
) )( localStorage.getItem( 'ExternalAccountTypes' ) ).then(externalaccounttypes=>externalaccounttypes.map(externalaccounttypes=>new ExternalAccountTypes(externalaccounttypes)));

