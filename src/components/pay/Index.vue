<!-- 下单支付组件 -->
<template>
<div class="st-viewbox">
	<v-loged :needUser="true">
		<order-item />
	</v-loged>

</div>

</template>
<script>
import Auth from '@/Services/Auth';
import OrderItem from '@/components/pay/Item';
import Loged from '@/components/compact/Loged';
	export default{
		components: {
			'order-item': OrderItem,
			'v-loged': Loged,
		},
		metaInfo () {
		    const title = this.$route.meta.title;
		    return {
		        title: title,
		        meta: [{content: title }]
		    }
		},
		data(){
			return {
				Auth: Auth.proxy,
				showLoginForm: false,
			};
		},
		methods : {
			closeLoginForm () {
				this.showLoginForm = false;
			},
			openLoginForm ( action ) {
				this.showLoginForm = true;
				this.action = action;
			},

		},
	}
</script>
