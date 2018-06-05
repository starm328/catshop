<template>
<div class="st-viewbox">
	<div class="sales-index st-center">
		<st-header  :title='$route.meta.title' fixed>
			<mu-icon-button   @click="$router.go(-1)" slot="left">
				<i class="st-icon icon-back"></i>
			</mu-icon-button>
		</st-header>
		<div class="header_mar"></div>
		<v-loged :needUser="true">
			<v-showitem />
		</v-loged>
	</div>
	<copyright></copyright>
</div>
</template>

<script>
import copyright from '@/components/compact/Copyright'
import Auth from '@/Services/Auth';
import Loged from '@/components/compact/Loged';
import Showitem from '@/components/account/reward/Showitem';

export default {
	components: {
		'v-loged': Loged,
		'v-showitem': Showitem,
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
	methods : {

	},
};
</script>
<style>
</style>
