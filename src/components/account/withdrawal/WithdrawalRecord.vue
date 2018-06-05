<!-- 提现记录组件 -->
<template>
<div class="st-viewbox">
	<div class="withdrawal-record-index">
		<st-header  :title='$route.meta.title' fixed>
			<mu-icon-button   @click="$router.go(-1)" slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button>
		</st-header>
		<div class="header_mar"></div>
		<div class="st-center">
			<v-loged :needUser="true">
				<v-recorditem />
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
import Recorditem from '@/components/account/withdrawal/Recorditem';

export default {
	components: {
		'v-loged': Loged,
		'v-recorditem': Recorditem,
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
}
</script>
<style>
</style>
