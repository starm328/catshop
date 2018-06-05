// 资金变动原因type
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';

class Reasons{
	constructor(data){
		this.data = data;
	}
	get id()
	{
		return this.data.id;
	}

	get label()
	{
		return this.data.unit_before;
	}
}


export default (local=> (
	(local
		? Promise.resolve( local )
		: Ajaxy.GET( configs.catShop.apiGlobalUrl+'account/reasons' ).when( 200, response=> response.json )
	)
) )( localStorage.getItem( 'Reasons' ) ).then(reason=>reason.map(reason=>new Reasons(reason)));

