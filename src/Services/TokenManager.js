import configs from '@/configs/app';
import Ajaxy from 'ajaxy';
import { local as Storage, } from '@/libs/Storage';

////////////////////////////////////////////////////////////////

let tokenPacks= getTokensFromCache();
let dirty= false;
const tokenMap= {};

tokenPacks= tokenPacks.map( tokenPag=>{

	if( new Date( tokenPag.expiredAt ) <= new Date )
	{
		dirty= true;

		return refreshTokenWithoutUpdate( token );
	}else{
		return Promise.resolve( tokenPag );
	}
} );

dirty && Promise.all( tokenPacks ).then( tokenPacks=>setTokensCache( tokenPacks.filter( x=>x ) ) );

var tokens= tokenPacks.map( tokenPack=> tokenPack.then( tokenPack=> tokenPack.token ) );

////////////////////////////////////////////////////////////////

function getTokensFromCache()
{
	return Storage.get( 'Tokens', [] );
}

function setTokensCache( tokenPacks )
{
	if(!( tokenPacks instanceof Array ))
	{
		throw 'tokenPacks must be an array';
	}

	return Storage.set( 'Tokens', tokenPacks );
}

function removeTokens()
{
	Storage.del( 'Tokens' );
}

function addToken( newTokenPack )
{
	setTokensCache( [ ...getTokensFromCache(), newTokenPack, ] );
}

function updateToken( token, newTokenPack )
{
	setTokensCache(
		getTokensFromCache().map( tokenPack=> token==tokenPack.token? newTokenPack : tokenPack ).filter( x=>x )
	);

	return newTokenPack&&newTokenPack.token;
}

function removeToken( token )
{
	setTokensCache(
		getTokensFromCache().map( tokenPack=> token==tokenPack.token? undefined : tokenPack ).filter( x=>x )
	);
}

function checkToken( token )
{
	return Ajaxy.GET( `${configs.catShop.apiBaseUrl}token/${token}/check` )
		.when( 200, response=> Promise.resolve( token ) )
		.when( 204, response=> refreshTokenWithoutRetry( token ) )
	;
}

function refreshTokenWithoutUpdate( token )
{
	return Ajaxy.POST( `${configs.catShop.apiBaseUrl}token/${token}` );
}

function refreshTokenWithoutRetry( token )
{
	return refreshTokenWithoutUpdate( token )
		.when( 200, response=> updateToken( token, response.json ) )
		.else( response=> (updateToken( token, undefined ), Promise.reject()) )
	;
}

const tried= {};

function refreshToken( token )
{
	return tried[token] || (
		tried[token]= (
			refreshTokenWithoutRetry( token )
			.catch( response=> {
				const tokens= getTokensFromCache();

				return (
					tokens.length
					? Promise.raceResolve( z(getTokensFromCache().map( tokenPack=> checkToken( tokenPack.token ) )) )
					: Promise.reject()
				);
			} )
		)
	);
}

////////////////////////////////////////////////////////////////

export {
	tokens,
	refreshToken,
	addToken,
	removeToken,
	removeTokens,
}
