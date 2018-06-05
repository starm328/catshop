// 资金状态type
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';

class Statuses{
	constructor(data){
		this.data = data;
	}

	get id()
	{
		return this.data.id;
	}
	get comment()
	{
		return this.data.comment;
	}


}

export default (local=> (
	(local
		? Promise.resolve( local )
		: Ajaxy.GET( configs.catShop.apiGlobalUrl+'account/statuses' ).when( 200, response=> response.json )
	)
) )( localStorage.getItem( 'Statuses' ) ).then(statuses=>statuses.map(statuses=>new Statuses(statuses)));

