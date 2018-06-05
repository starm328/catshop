const Provent= require('./Provent').default;
const Auth= require('@/Services/Auth').default;
const Storage= require('@/libs/Storage').local;

class Query
{
	constructor( name, compendium, options, params, callback )
	{
		this.name= name;
		this.compendium= compendium;
		this.options= options;
		this.params= params;
		this.callback= callback;

		this.query();
	}

	makeKey( params )
	{
		return this.name+JSON.stringify( params );
	}

	query()
	{
		this.callback( this.compendium.empty );

		if( this.compendium.nonLocalCache )
		{
			this.loadParams().then( params=> this.request( params ) );
		}else{
			this.loadLocalCache();
		}

	}

	loadLocalCache()
	{
		this.loadParams().then( params=>{

			const key= this.makeKey( params );

			let cache= Storage.get( key );

			if( cache )
			{
				this.callback( cache.data );

				if( !cache.expiredAt || new Date( cache.expiredAt ) < new Date() )
				{
					this.request( params, cache.hash );
				}
			}else{
				this.request( params );
			}
		} );


	}

	storeLocalCache( key, hash, data, cacheLife )
	{
		const expiredAt= `${new Date(+new Date() + cacheLife*1000)}`;

		Storage.set( key, { hash, data, expiredAt, } );
	}

	updateLifeTime( key, cacheLife )
	{

		let cache= Storage.get( key );

		if( cache )
		{
			cache.expiredAt= `${new Date(+new Date() + cacheLife*1000)}`;

			Storage.set( key, cache );
		}
	}

	loadParams()
	{
		const promises= [];
		const provents= [];
		const params= {};
		const setValue= ( param, value )=> {
			params[param]= value;
		};

		for( let param in this.compendium.params )
		{
			let value= (param in this.params)? this.params[param] : this.compendium.params[param].default;

			if( value instanceof Promise )
			{
				promises.push( value.then( value=> setValue( param, value ) ) );
			}
			else
			if( value instanceof Provent )
			{
				provents.push( value.then( value=> setValue( param, value ) ) );
			}
			else
			{
				setValue( param, value );
			}
		}

		return Provent.all( provents ).then( ()=>Promise.all( promises ) ).then( ()=> params );
	}

	request( params, hash=null )
	{
		const headers= {};
		const queries= {};
		let url= this.options.baseUrl+this.compendium.url;

		for( let param in params )
		{
			switch( this.compendium.params[param].in )
			{
				case 'path':
				{
					url= url.replace( `{${param}}`, params[param] );
				}break;

				case 'query':
				{
					queries[param]= params[param];
				}break;

				case 'header':
				{
					headers[param]= params[param];
				}break;
			}
		}

		hash && (headers['Cache-Hash']= hash);

		require( 'ajaxy' )
			.get( url, queries, headers )
			.when( 200, response=> {

				const data= response.json;

				this.callback( data );

				if(!( this.compendium.nonLocalCache ))
				{
					const hash= response.getHeader( 'Cache-Hash' );
					const cacheLife= response.getHeader( 'Cache-Life' );

					hash && this.storeLocalCache( this.makeKey( params ), hash, data, cacheLife );
				}
			} ).when( 304, response=> {
				const cacheLife= response.getHeader( 'Cache-Life' );

				cacheLife && this.updateLifeTime( this.makeKey( params ), cacheLife );
			} )
			.when( 401, response=> {
				if( params.token )
				{
					Auth.refreshToken( params.token ).then( token=> {
						params.token= token;
						this.request( params, hash );
					} );
				}
			} )
		;
	}

}

class DataProvider
{

	constructor( name, compendia, options )
	{
		this.name= name;
		this.compendia= compendia;
		this.options= options;
	}

	query( entity, params, callback )
	{
		if(!( entity in this.compendia ))
		{
			throw `entity "${entity}" not exists`;
		}

		new Query( `${this.name}-${entity}`, this.compendia[entity], this.options, params, callback );
	}
}


module.exports= DataProvider;
