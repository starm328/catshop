// 分润身份
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';

class CommissionRoles{
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


	get is_default()
	{
		return this.data.is_default;
	}

}


export default (local=> (
	(local
		? Promise.resolve( local )
		: Ajaxy.GET( configs.catShop.apiBaseUrl+'commission-roles' ).when( 200, response=> response.json )
	)
) )( localStorage.getItem( 'CommissionRoles' ) ).then(commission_roles=>commission_roles.map(commission_roles=>new CommissionRoles(commission_roles)));

