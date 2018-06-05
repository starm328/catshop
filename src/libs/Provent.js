export default class Provent
{
	nexts= [];

	got;
	los;

	history;
	promise;

	constructor( got, los )
	{
		got && (this.got= got);
		los && (this.los= los);

		const temp={}

		this.promise= new Promise( ( resolve, reject )=>{
			temp.resolve= resolve;
			temp.reject= reject;
		} );
		this.promise.resolve= temp.resolve;
		this.promise.reject= temp.reject;
	}

	then( got, los )
	{
		const next= new Provent( got, los );

		this.nexts.push( next );

		this.history && next.dispatch( this.history )

		return next;
	}

	catch( los )
	{
		return this.then( undefined, los );
	}

	finally( callback )
	{
		return this.then( callback, callback );
	}

	thenOnce( got, los )
	{
		return (this.history||this.promise).then( got, los );
	}

	catchOnce( los )
	{
		return this.thenOnce( undefined, los );
	}

	finallyOnce( callback )
	{
		return this.thenOnce( callback, callback );
	}

	dispatch( promise )
	{
		promise= promise.then( this.got||Promise.resolve, this.los||Promise.reject );

		promise
			.then( x=>{
				this.nexts.forEach( next=>next.dispatch( Promise.resolve( x ) ) );
			} )
			.catch( e=>{
				this.nexts.forEach( next=>next.dispatch( Promise.reject( e ) ) )
			} )
		;

		promise
			.then(
				x=> this.history || this.promise.resolve( x )
			,
				e=> this.history || this.promise.reject( e )
			)
			.finally( ()=>{
				this.history= promise;
			} )
		;
	}
}

Provent.all= ( provents )=>{
	const all= new Provent();

	Promise.all( provents.map( x=>x.promise ) ).then( xes=>{
		provents.forEach( ( provent, i )=>{
			const agent= new Provent(
				x=>{
					xes[i]=x;

					all.dispatch( Promise.resolve( xes ) );
				}
			,
				e=>{
					all.dispatch( Promise.reject( e ) );
				}
			);

			provent.nexts.push( agent );

			agent.dispatch( provent.history )
		} );
	} );


	if(!( provents.length ))
	{
		all.dispatch( Promise.resolve( [] ) );
	}

	return all;
};
