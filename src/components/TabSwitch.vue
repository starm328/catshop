<script>

export default {
	name: 'product-page',
	props: {
		page: {
			type: Number,
			default: 0,
		},
	},
	data(){
		return {
			current: this.page,
		};
	},
	render( e ){
		const slots= this.$slots.default.filter( x=> x.tag );
		return e( 'article', { class: 'tab-switch', }, [
			e( 'header', slots.map( ( x, i )=> e( 'a', { class: { current: i===this.current, }, on: { click:()=> this.current= i, }, }, x.data.attrs.label ) ) ),
			e( 'main', slots.map( ( x, i )=> e( 'section', { class: { current: i===this.current, }, }, x.children ) ) ),
		] );
	},
};
</script>

<style>
	.mkd_ui.wx .tab-switch>header{top:0;}
	.tab-switch>header{display:flex;margin-top: 10px;background-color: #fff;font-size:16px;margin-bottom: 1px;position: sticky;top:43px;}
	.tab-switch>header>a{flex:1;color:white;line-height:2em;padding: 10px 15px;color:#000;text-align: center;position: relative;}
	.tab-switch>header>a::after{position: absolute;left: 0;bottom: 0;right: 0;border-top: 1px solid transparent;content: "";color: #999;}
	.tab-switch>header>a.current{    color: #F23030;text-align: center;}
	.tab-switch>header>a.current::after{    border-color: #F23030;}
	.tab-switch>main>*:not(.current){transform:rotateY(0.5turn);visibility:hidden;transition:transform 200ms linear,visibility 0ms 100ms linear;display: none;}
	.tab-switch>main>section{background:#fff;padding:10px;}
	.tab-switch>main>section dl{width:100%;border-bottom:1px dashed #eee;font-size: 0;padding:10px 0;display: flex;}
	.tab-switch>main>section dl:last-child{border:none;}
	.tab-switch>main>section dt,.tab-switch>main>section dd{font-size:14px;padding-left:20px;color:#999;}
	.tab-switch>main>section dd{color: #000;flex: 1;}
</style>
