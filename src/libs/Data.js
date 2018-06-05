module.exports= {

	createMap( querys, rawData, result={} )
	{
		for( let key in querys )
		{
			const query= querys[key];

			require( '@/Data/'+query.subject ).query( query.entity, query.params||{}, data=> {

				result[key]= query.preprocessor? query.preprocessor( data ) : data;

				query.callback && query.callback( data );
			} );
		}

		for( let key in rawData )
		{
			if( key in querys ) continue;

			const value= rawData[key];

			if( value instanceof Promise )
			{
				result[key]= undefined;

				value.then( x=> result[key]= x );
			}else{
				result[key]= value;
			}
		}

		return result;
	},

};
