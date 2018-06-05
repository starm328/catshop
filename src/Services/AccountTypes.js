import Ajaxy from 'ajaxy';
import configs from '@/configs/app';

class AccountType{
	constructor(data){
		this.data = data;
	}

	figure( raw )
	{
		if( this.data.figure<0 )
		{
			const padded= `${raw}`.padStart( 1-this.data.figure, '0' );

			return padded.slice( 0, this.data.figure )+'.'+padded.slice( this.data.figure );
		}else{
			return raw!=0? raw+'0'.repeat( this.data.figure ) : raw;
		}
	}
	unfigure( figured )
	{
		return parseInt(figured/(10**this.data.figure));
	}

	get id()
	{
		return this.data.id;
	}

	get unit_before()
	{
		return this.data.unit_before;
	}


	get unit_label()
	{
		return this.data.unit_label;
	}

	get label()
	{
		return this.data.label;
	}

	get frozen()
	{
		return this.data.frozen;
	}
}


export default (local=> (
	(local
		? Promise.resolve( local )
		: Ajaxy.GET( configs.catShop.apiBaseUrl+'account-types' ).when( 200, response=> response.json )
	)
) )( localStorage.getItem( 'AccountTypes' ) ).then(account_types=>account_types.map(account_type=>new AccountType(account_type)));

