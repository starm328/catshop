<template>
<div class="st-viewbox">
	<div class="cart_index st-center">
		<st-header  :title='$route.meta.title' fixed>
		</st-header>
		<div class="header_mar"></div>
		<v-loged :needUser="false">
			<v-cart />
		</v-loged>
	</div>
	<copyright></copyright>
</div>

</template>

<script>
import copyright from '@/components/compact/Copyright'
import Auth from '@/Services/Auth';
import Cart from '@/components/cart/Cart';
import Loged from '@/components/compact/Loged';
export default {

	components: {
		'v-cart': Cart,
		'copyright': copyright,
		'v-loged': Loged,
	},
	metaInfo () {
	    const title = '购物车';
	    return {
	        title: title,
	        meta: [{content: title }]
	    }
	},

	data(){
		return {
			Auth: Auth.proxy,
		};
	},


};
</script>

<style type="text/css">
	.cart_index > .copyright{margin-bottom: 50px;}
</style>
