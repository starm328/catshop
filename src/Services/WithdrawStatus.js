// 提现申请状态type
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';

class WithdrawStatu{
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
}


export default (local=> (
	(local
		? Promise.resolve( local )
		: Ajaxy.GET( configs.catShop.apiGlobalUrl+'manual-withdraw/statuses' ).when( 200, response=> response.json )
	)
) )( localStorage.getItem( 'WithdrawStatu' ) ).then(WithdrawStatus=>WithdrawStatus.map(withdrawstatu=>new WithdrawStatu(withdrawstatu)));

