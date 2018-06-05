Object.values || (Object.values= object=> { const result= []; for( let key in object ) result.push( object[key] ); return result; });
String.prototype.padStart || (String.prototype.padStart= function( targetLength, padString=' ' ){ return this.length>targetLength?this.toString():new Array(targetLength-this.length).fill(padString).join('')+this; });
String.prototype.padEnd || (String.prototype.padEnd= function( targetLength, padString=' ' ){ return this.length>targetLength?this.toString():this+new Array(targetLength-this.length).fill(padString).join(''); });

Promise.prototype.finally || (Promise.prototype.finally= function( callback ){ return this.then( callback, callback ); });
Promise.raceResolve || (Promise.raceResolve= function( promises ){
	let resolve, reject;
	const errors= [];
	const promise= new Promise( ( got, los )=> { resolve= got; reject= los; } );

	promises.forEach( promise=> {
		promise.then( result=> {
			if( resolve )
			{
				let got= resolve;
				resolve= undefined;

				got( result );
			}
		} ).catch( e=> {
			errors.push( z(e) );

			if( errors.length===promises.length )
			{
				reject( errors );
			}
		} );
	} );

	return promise;
});
Promise.resolve= Promise.resolve.bind( Promise );
Promise.reject= Promise.reject.bind( Promise );

window.Symbol || (window.Symbol = require('es6-symbol'));
window.wait= ( time, value )=> new Promise( ( got, loss )=> setTimeout( ()=>got( value ), time ) );

window.z=(...d)=>(console.log(...d),d[0]);
window.q=function(d){alert(d);return d};

export default null;
