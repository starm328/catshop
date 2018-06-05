import configs from '@/configs/app';
import Ajaxy from 'ajaxy';
import Provent from '@/libs/Provent';
import { session as Storage, } from '@/libs/Storage';

import { tokens, refreshToken, addToken, removeTokens, removeToken, } from './TokenManager';

const DifferentUserException= Symbol( 'DifferentUserException' );
const NotLoginException= Symbol( 'NotLoginException' );

class AuthManager
{
	// 放在组件里用的
	proxy= {

		// 是否完成加载
		loaded: false,

		// 是否登录
		logined: false,

		// 平台用户
		user: undefined,

		// 主登录令牌
		token: undefined,

		// 所有登录令牌
		tokens: [],
	};

	provent= new Provent;

	backTries= 0;

	constructor()
	{
		if( tokens.length )
		{
			++this.backTries;

			loadToken.call( this, Promise.raceResolve( tokens ) )

			Promise.all( tokens ).then( tokens=> this.proxy.tokens= tokens );
		}else{
			this.proxy.loaded= true;

			this.provent.dispatch( Promise.reject( NotLoginException ) )
		}
	}

	// 供需要登录的操作调用
	then( got, los )
	{
		return this.provent.then( got, los );
	}

	// 供需要登录的操作调用
	catch( los )
	{
		return this.provent.catch( los );
	}

	// 供需要登录的操作调用
	thenOnce( got, los )
	{
		return this.provent.thenOnce( got, los );
	}

	// 供需要登录的操作调用
	catchOnce( los )
	{
		return this.provent.catchOnce( los );
	}

	// 供需要登录的操作调用
	finallyOnce(los )
	{
		return this.provent.finallyOnce(los);
	}

	// 外部获取令牌
	get token()
	{
		// Auto TODO refresh expired,token
		return this.proxy.token;
	}

	// 外部获取登录情况
	get logined()
	{
		return this.proxy.logined;
	}

	// 尝试刷新令牌
	refreshToken()
	{
		return refreshToken( this.proxy.token )
			.then( token=> this.proxy.token= token )
			.catch( e=> {
				if( this.backTries <= 0 )
				{
					this.logout();
					return Promise.reject( e )
				}

				return this.waitingForBackTries();
			} )
		;
	}

	addBackTries()
	{
		++this.backTries;
	}

	removeBackTries( token )
	{
		--this.backTries;

		if( token )
		{
			this.backTriesWaiter && this.backTriesWaiter.resolve( token );
		}
		if( this.backTries <= 0 )
		{
			this.backTriesWaiter && this.backTriesWaiter.reject();
		}
	}

	waitingForBackTries()
	{
		let resolve, reject;
		const promise= new Promise( ( got, los )=>{
			resolve= got;
			reject= los;
		} );

		promise.resolve= token=>{ this.backTriesWaiter= undefined; resolve( token ); };
		promise.reject= e=>{ this.backTriesWaiter= undefined; reject( e ); };

		this.backTriesWaiter= promise;

		return promise;
	}

	/**
	 * 登录
	 *
	 * @param {Promise} promise 登录的 Promise, 要提供 tokenPack
	 * @param {bool} override 当随后登录的用户不同于原用户，是否覆盖登录。若为否，则此时将得到 reject Promise with DifferentUserException
	 *
	 * @return {promise}
	 */
	login( promise, override=true )
	{
		promise= promise.then( tokenPack=> (
			this.provent
				// 上次登录过程完成，不管是否成功
				.finallyOnce( ()=> {
					return getUser( tokenPack.token )
						.then( user=>{
							let promise;

							this.removeBackTries( tokenPack.token );

							// 新旧用户都不存在
							if( !user && !this.proxy.user )
							{
								this.proxy.token || (this.proxy.token= tokenPack.token);
							}
							else
							// 新旧用户仅有一个存在
							if( !!user ^ !!this.proxy.user )
							{
								if( tokenPack.token && this.proxy.token )
								{
									promise = bindAgent( ...(x=> user? x : x.reverse())( [ tokenPack.token, this.proxy.token, ] ) ).finally(()=>tokenPack);
								}

								if( user )
								{
									this.proxy.user= user;
									this.proxy.token= tokenPack.token
								}
							}
							else
							// 新旧用户不相同
							if( user.id != this.proxy.user.id )
							{
								if(!( override )) return Project.reject( DifferentUserException )

								removeTokens();
								addToken( tokenPack );

								this.proxy.user= user;
							}

							if( promise ){
								promise.then(()=>{
									this.proxy.loaded= true;
									this.proxy.logined= true;
								})
							}else{
								this.proxy.loaded= true;
								this.proxy.logined= true;
							}

							return promise || tokenPack;
						} )
						.catch( e=>(this.removeBackTries(), Promise.reject( e )) )
					;
				} )
				.then( tokenPack=> (addToken( tokenPack ), this.proxy) )
		) );

		this.provent.dispatch( promise );
		return promise;
	}

	/**
	 * 退出登录
	 *
	 */
	logout() {
		this.proxy.loaded= true,
		this.proxy.logined= false,
		this.proxy.user= undefined,
		this.proxy.token= undefined,
		this.proxy.tokens= [],
		removeTokens();
		Storage.clear();
	}

	refreshUser( token )
	{
		this.proxy.loaded= false;

		const promise= getUser( token||this.proxy.token ).then( user=>{
			this.proxy.user= user;
			this.proxy.token= token;
			this.proxy.loaded= true;
			this.proxy.logined= true;

			return this.proxy;
		} ).catch( e=>{
			removeToken( this.proxy.token );

			this.proxy.user= undefined;
			this.proxy.token= undefined;
			this.proxy.loaded= true;
			this.proxy.logined= false;
		} );

		this.provent.dispatch( promise );

		return promise;
	}
}

function getUser( token )
{
	// 基于时间的缓存，缓存未失效时，用任何Token都能拿到此User，以避免429
	// let cachedUser= Storage.get( `User-Until` );

	// if( cachedUser && (new Date( cachedUser.expiredAt ) <= new Date) )
	// {
	// 	return Promise.resolve( cachedUser.user );
	// }

	const storedUser= Storage.get( `User:${token}` );

	if( storedUser )
	{
		return Promise.resolve( storedUser );
	}

	return Ajaxy.GET( configs.catShop.apiBaseUrl+'user', { token, } )
		.when( 200, response=> {
			if(response.json){
				Storage.set( `User:${token}`, response.json );
				// Storage.set( `User-Until`, { user:response.json, expiredAt:`${new Date(new Date() - - 5000)}` } );
			}

			return response.json;
		} )
		.when( 401, response=> refreshToken( token ).then( newToken=> getUser( newToken ) ) )
		.when( 204, response=> null )
		.else( response=> Promise.reject( response ) )
	;
}

function loadToken( promise )
{
	promise= promise
		.then( token=>{
			this.proxy.token= token;
			this.removeBackTries( token );

			return getUser( token );
		} )
		.then( user=>{
			this.proxy.logined= true;
			this.proxy.user= user;
			this.proxy.loaded= true;

			return this.proxy;
		} )
		.catch( ()=> {
			// 标记未登录
			removeToken( this.proxy.token );

			if( this.backTries <= 0 )
			{
				this.proxy.user= undefined;
				this.proxy.token= undefined;
				this.proxy.loaded= true;
				this.proxy.logined= false;
			}

			this.removeBackTries();

			return this.proxy;
		} )
	;

	this.provent.dispatch( promise );
}

function bindAgent( token, agentToken )
{
	return Ajaxy.POST( configs.catShop.apiBaseUrl+'user-agents', agentToken, { token, } )
		.when( 401, response=> refreshToken( token ).then( newToken=> bindAgent( newToken, agentToken ) ) )
	;
}

export default new AuthManager();

export {
	DifferentUserException,
	NotLoginException,
};
