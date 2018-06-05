// 用户信息条目type
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';

class FieldsType{
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
		: Ajaxy.GET( configs.catShop.apiBaseUrl+'user-info-fields' ).when( 200, response=> response.json )
	)
) )( localStorage.getItem( 'FieldsType' ) ).then(fieldstype=>fieldstype.map(fieldstype=>new FieldsType(fieldstype)));

