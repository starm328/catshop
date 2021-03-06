(( global, mod )=> (module && module.exports)? module.exports = mod() : (global.define && global.define.amd)? global.define( mod ) : global.Ajax= mod() )( this, ()=> {
	"use strict";

	const httpRequest= ( method, url, headers, body )=> {
		const listeners= {};

		const promise= new Promise(
			( resolve, reject )=> {
				const xhr= new XMLHttpRequest;
				xhr.onreadystatechange= ()=> {
					if( xhr.readyState==4 )
					{
						const response= {
							status: xhr.status,
							statusText: xhr.statusText,
							content:xhr.responseText,
							getHeader: name=> xhr.getResponseHeader( name ),
						};

						try{
							response.json= JSON.parse( xhr.responseText );
						}
						catch( e )
						{
							response.json= null;
						}

						resolve( response );
					}
				};

				xhr.open( method, url, true );

				for( let name in headers )
				{
					xhr.setRequestHeader( name, headers[name] );
				}

				xhr.send( body );
			}
		);

		return bindMethod( promise.then( response=> {
			if( response.status in listeners ){
				return listeners[response.status]( response );
			}else if( 0 in listeners ){
				return listeners[0]( response );
			}
		} ) );

		function bindMethod( promise )
		{
			promise.when= ( status, callback )=> {
				if( status in listeners )
				{
					throw `Http status ${status} has already been listeners.`;
				}

				listeners[status]= callback;

				return promise;
			};

			promise.else= ( callback )=> (listeners[0]= callback, promise);

			return promise;
		}
	};

	return {

		OPTIONS( url, headers={} )
		{
			return httpRequest( 'OPTIONS', url, headers, null );
		},

		HEAD( url, headers={} )
		{
			return httpRequest( 'HEAD', url, headers, null );
		},

		GET( url, headers={} )
		{
			return httpRequest( 'GET', url, headers, null );
		},

		DELETE( url, headers={} )
		{
			return httpRequest( 'DELETE', url, headers, null );
		},

		POST( url, body, headers={} )
		{
			return httpRequest( 'POST', url, headers, body );
		},

		PUT( url, body, headers={} )
		{
			return httpRequest( 'PUT', url, headers, body );
		},

		PATCH( url, body, headers={} )
		{
			return httpRequest( 'PATCH', url, headers, body );
		},

		get( url, params={}, headers={} )
		{
			crossOrigin( url ) || (headers['X-Requested-With']= "XMLHttpRequest");

			return httpRequest( 'GET', buildQuery( params, url ), headers );
		},

		post( url, params={}, headers={} )
		{
			crossOrigin( url ) || (headers['X-Requested-With']= "XMLHttpRequest");
			headers['Content-Type']= "application/x-www-form-urlencoded";

			return httpRequest( 'POST', url, headers, buildQuery( params ) );
		},

		put( url, params={}, headers={} )
		{
			crossOrigin( url ) || (headers['X-Requested-With']= "XMLHttpRequest");
			headers['Content-Type']= "application/x-www-form-urlencoded";

			return httpRequest( 'PUT', url, headers, buildQuery( params ) );
		},

		patch( url, params={}, headers={} )
		{
			crossOrigin( url ) || (headers['X-Requested-With']= "XMLHttpRequest");
			headers['Content-Type']= "application/x-www-form-urlencoded";

			return httpRequest( 'PATCH', url, headers, buildQuery( params ) );
		},

	};

	function buildQuery( parameters, url='' )
	{
		let delimiter= url? (url.indexOf('?')+1? '&' : '?') : '';

		for( let key in parameters )
		{
			url+= delimiter+key+'='+encodeURIComponent( parameters[key] );
			delimiter= '&';
		}

		return url;
	}

	function crossOrigin( url )
	{
		var anchor= document.createElement( 'a' );
		anchor.href= url;

		return url.origin !== location.origin;
	}
} );
