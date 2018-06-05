<!-- 多资金兑换记录父组件 -->
<template>
<div class="st-viewbox">
	<div class="exchangerate-record-index st-center">
		<st-header  :title='$route.meta.title' fixed>
			<mu-icon-button   @click="$router.go(-1)" slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button>
		</st-header>
		<div class="header_mar"></div>
		<v-loged :needUser="true">
			<v-Record />
		</v-loged>
	</div>
	<copyright></copyright>
</div>
</template>

<script>
import copyright from '@/components/compact/Copyright'
import Auth from '@/Services/Auth';
import Loged from '@/components/compact/Loged';
import Record from '@/components/account/exchangerate/Record';

export default {
	components: {
		'v-loged': Loged,
		'v-Record': Record,
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
