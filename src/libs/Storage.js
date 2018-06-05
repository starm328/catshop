import configs from '@/configs/app';

const prefix= `[${configs.catShop.shopName}][${configs.env}]`;

function makeStorage( nativeStorage )
{

	return {

		has( key )
		{
			const wrappedKey= wrapKey( key );

			for( let i= nativeStorage.length-1; i>=0; --i )
				if( wrappedKey===nativeStorage.key( i ) )
					return true;

			return false;
		},

		get( key, defaults=null )
		{
			return (
				this.has( key )
				? JSON.parse( nativeStorage.getItem( wrapKey( key ) ) )
				: defaults
			);
		},

		set( key, value )
		{
			try{
				nativeStorage.setItem( wrapKey( key ), JSON.stringify( value ) );
			}
			catch(e){
				if(e.constructor===DOMException){
					nativeStorage.clear();
				}
			}

			return value;
		},

		del( key )
		{
			nativeStorage.removeItem( wrapKey( key ) );
		},

		clear()
		{
			for( let i= nativeStorage.length-1; i>=0; --i )
			{
				let key= nativeStorage.key( i );

				if( isValidKey( key ) )
					nativeStorage.removeItem( key );
			}
		},
	};

	function wrapKey( key )
	{
		return ''+prefix+key;
	}

	function isValidKey( key )
	{
		return (''+key).slice( 0, prefix.length ) === prefix;
	}
}

export const local = makeStorage( localStorage );
export const session = makeStorage( sessionStorage );

export default {
	local,
	session,
};
