Object.values || (Object.values= object=> { const result= []; for( let key in object ) result.push( object[key] ); return result; });
export default x=> (( x, y )=> x.length>=y.length? x : y)( Array.prototype.slice.call( x ), Object.values( x ) );
