<!-- 订单详情组件父组件 -->
<template>
<div class="st-viewbox">
	<v-loged :needUser="true">
			<order-item />
	</v-loged>
</div>
</template>
<script>
import Auth from '@/Services/Auth';
import OrderItem from '@/components/orderlist/PageItem';
import Loged from '@/components/compact/Loged';
	export default{
		components: {
			'order-item': OrderItem,
			'v-loged': Loged,
		},
		data(){
			return {
				Auth: Auth.proxy,
			};
		},

	}
</script>
<style>

</style>
