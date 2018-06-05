// 价格按照资金的类型转换
import Ajaxy from 'ajaxy';
import configs from '@/configs/app';
import accountTypes from '@/Services/AccountTypes';


export default {

	add( x, y ){
		if(!( x instanceof Promise )) x= Promise.resolve( x );
		if(!( y instanceof Promise )) y= Promise.resolve( y );

		return Promise.all( [ x, y, accountTypes ] ).then( ( [ x, y, types ] )=> {
			const result= {};

			(types
				.map( type=> [ (x[type.id]||0)- -(y[type.id]||0), type, ] )
				.filter( ( [ x, ] )=> x>0 )
				.forEach( ( [ x, type, ] )=> result[type.id]=x )
			);

			return result;
		} );
	},

	showAdd( x, y ){
		return this.show( this.add( x, y ) );
	},

	mul( price, time ){
		if(!( price instanceof Promise )) price= Promise.resolve( price );

		return Promise.all( [ price, accountTypes, ] ).then(
			( [ price, types, ] )=> {
				const result= {};

				(types
					.map( type=> [ price[type.id]||0, type, ] )
					.filter( ( [ x, ] )=> x>0 )
					.forEach( ( [ x, type, ] )=> result[type.id]=x*time )
				);

				return result;
			}
		);
	},

	showMul( price, time ){
		return this.show( this.mul( price, time ) );
	},

	sum( prices ){
		if( prices instanceof Promise )
		{
			return prices.then( prices=> this.sum( prices ) );
		}

		return prices.reduce( this.add );
	},

	showSum( prices ){
		return this.show( this.sum( prices ) );
	},

	sumPriceable( priceables ){
		if( priceables instanceof Promise )
		{
			return priceables.then( priceables=> this.sumPriceable( priceables ) );
		}

		return priceables.map( priceable=> this.mul( priceable.rawPrice, priceable.quantity||1 ) ).reduce( this.add );
	},

	showSumPriceable( priceables ){
		return this.show( this.sumPriceable( priceables ) );
	},

	show( price ){
		if(!( price instanceof Promise )) price= Promise.resolve( price );
		return (Promise.all( [ price, accountTypes, ] )
			.then(
				( [ price, types, ] )=> (
					(types
						.map( type=> [ price[type.id]||0, type, ] )
						.filter( ( [ x, ] )=> x>0 )
						.map( ( [ x, type, ] )=> this.showAmount(x,type) )
						.join( '<span class="operator">+</span>' )
					)
				)
			)

		);
	},

	showAmount(amount,type) {
		return (type.unit_before
			? `<span class="unit">${type.unit_label}</span><span class="price">${type.figure( amount )}</span>`
			: `<span class="price">${type.figure( amount )}</span><span class="unit">${type.unit_label}</span>`
		);
	}

}
