<!-- 提现组件 -->
<template>
<div class="st-viewbox">
	<div class="withdrawal-index">
		<st-header  :title='$route.meta.title' fixed>
			<mu-icon-button   @click="$router.go(-1)" slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button>
		</st-header>
		<div class="header_mar"></div>
		<div class="st-center">
			<v-loged :needUser="true">
				<!-- 可提现资金列表组件 -->
				<v-withdrawablelist />
			</v-loged>
		</div>
	</div>
	<copyright></copyright>
</div>
</template>

<script>
import copyright from '@/components/compact/Copyright'
import Auth from '@/Services/Auth';
import Loged from '@/components/compact/Loged';
import WithdrawableList from '@/components/account/withdrawal/WithdrawableList';

export default {
	components: {
		'v-loged': Loged,
		'v-withdrawablelist': WithdrawableList,
		'copyright': copyright,
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
		};
	},
};
</script>
<style>
</style>
